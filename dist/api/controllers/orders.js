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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_jwt_1 = require("express-jwt");
const orders_1 = require("../models/orders");
// Simple API boilerplate
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('combined'));
const tokenConfig = {
    secret: process.env.SHARED_SECRET,
    algorithms: ["HS256"]
};
// API Routes
app.get("/protected", (0, express_jwt_1.expressjwt)(tokenConfig), function (req, res) {
    req.auth
        ? res.sendStatus('You are authorized')
        : res.sendStatus(401);
});
app.get("/", (_, res) => {
    res.sendStatus("Welcome to the Pizza Time API!");
});
app.get("/pizza/", (0, express_jwt_1.expressjwt)(tokenConfig), (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, orders_1.getOrders)();
    res.send(orders);
}));
app.get("/pizza/:id", (0, express_jwt_1.expressjwt)(tokenConfig), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const order = yield (0, orders_1.getOrders)({ id });
    res.send(order);
}));
app.post("/pizza", (0, express_jwt_1.expressjwt)(tokenConfig), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const order = yield (0, orders_1.createOrder)(body);
    res.send(order);
}));
app.put("/pizza/:id", (0, express_jwt_1.expressjwt)(tokenConfig), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const order = yield (0, orders_1.updateOrder)(id, body);
    res.send(order);
}));
app.delete("/pizza/:id", (0, express_jwt_1.expressjwt)(tokenConfig), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, orders_1.deleteOrder)(id);
    res.sendStatus(200);
}));
exports.default = app;
