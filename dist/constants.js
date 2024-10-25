"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PIZZA_SIZES = exports.STATUSES = exports.PIZZA_TOPPINGS = exports.PIZZA_TYPES = exports.SECRET_KEY = void 0;
require("dotenv/config");
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.PIZZA_TYPES = [
    'Neapolitan',
    'Detroit',
    'Chicago',
    'New York'
];
exports.PIZZA_TOPPINGS = [
    'Pepperoni',
    'Sausage',
    'Ham',
    'Bacon',
    'Mushrooms',
    'Green peppers',
    'Onions',
    'Black olives',
    'Pineapple',
    'Tomatoes',
    'Mozzarella cheese'
];
exports.STATUSES = [
    'Preparing',
    'Baked',
    'Delivered'
];
exports.PIZZA_SIZES = [
    'Small',
    'Medium',
    'Large',
    'Extra Large'
];
