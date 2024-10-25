"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = __importDefault(require("./controllers/orders"));
orders_1.default.listen(3000, () => console.log("Server ready on port 8000."));
exports.default = orders_1.default;
