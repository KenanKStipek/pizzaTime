"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrders = void 0;
require("dotenv/config");
const postgres_1 = require("../../services/postgres");
const crypto_js_1 = __importDefault(require("crypto-js"));
const constants_1 = require("../../constants");
const getOrders = (params) => __awaiter(void 0, void 0, void 0, function* () {
    if (params === null || params === void 0 ? void 0 : params.id) {
        const orderId = +params.id;
        const order = yield postgres_1.prisma.order.findFirst({ where: { id: orderId } });
        const decryptedOrderInfo = decryptOrder(order);
        return decryptedOrderInfo;
    }
    else {
        const orders = yield postgres_1.prisma.order.findMany();
        const decryptedOrdersInfo = orders.map((order) => decryptOrder(order));
        return decryptedOrdersInfo;
    }
});
exports.getOrders = getOrders;
const createOrder = (orderInfo) => {
    // validate data
    const invalid = validateOrder(orderInfo);
    if (invalid)
        return invalid;
    // encrypt sensitive customer data
    const encryptedOrderInfo = encryptOrder(orderInfo);
    // Store order
    const order = postgres_1.prisma.order.create({
        data: encryptedOrderInfo
    });
    return order;
};
exports.createOrder = createOrder;
const updateOrder = (id, updatedOrder) => __awaiter(void 0, void 0, void 0, function* () {
    // validate data
    const invalid = validateOrder(updatedOrder);
    if (invalid)
        return invalid;
    // encrypt sensitive customer data
    const encryptedOrderInfo = encryptOrder(exports.updateOrder);
    // Store order
    const orderId = +id;
    const order = yield postgres_1.prisma.order.update({
        where: { id: orderId },
        data: encryptedOrderInfo
    });
    return order;
});
exports.updateOrder = updateOrder;
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = +id;
    const order = yield postgres_1.prisma.order.delete({
        where: { id: orderId }
    });
    return order;
});
exports.deleteOrder = deleteOrder;
//////////////////////
// Helper functions //
//////////////////////
const encrypt = (data) => {
    const key = process.env.ENCRYPTION_KEY;
    return crypto_js_1.default.AES.encrypt(data, key).toString();
};
const decrypt = (data) => {
    const key = process.env.ENCRYPTION_KEY;
    const bytes = crypto_js_1.default.AES.decrypt(data, key);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
const encryptOrder = (order) => (Object.assign(Object.assign({}, order), { customerName: encrypt(order.customerName), customerAddress: encrypt(order.customerAddress), customerPhone: encrypt(order.customerPhone) }));
const decryptOrder = (order) => (Object.assign(Object.assign({}, order), { customerName: decrypt(order.customerName), customerAddress: decrypt(order.customerAddress), customerPhone: decrypt(order.customerPhone) }));
// I would normally setup a more sophisticated 
// validation process, but for this use case
// I decided to keep it simple.
const validateOrder = (order) => {
    let errors = '';
    errors += order.pizzaType &&
        !constants_1.PIZZA_TYPES.includes(order.pizzaType) &&
        'Invalid Pizza Type' || '';
    errors += order.pizzaType &&
        !constants_1.PIZZA_SIZES.includes(order.size) &&
        ' Invalid Pizza Size' || '';
    errors += order.pizzaType &&
        !constants_1.STATUSES.includes(order.status) &&
        ' Invalid Order Status' || '';
    return errors.length > 0 && errors || false;
};
