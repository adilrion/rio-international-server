"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const route = express_1.default.Router();
route.post('/add-product', products_controller_1.productController.addedNewProduct);
route.get('/:id', products_controller_1.productController.getSingleProduct);
route.patch('/:id', products_controller_1.productController.updateNewProduct);
route.get('/', products_controller_1.productController.getAllProduct);
exports.productRoute = route;
