"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const products_route_1 = require("../modules/products/products.route");
const router = express_1.default.Router();
const allRoutes = [
    {
        path: '/users/',
        route: user_route_1.userRoutes,
    },
    {
        path: '/product/',
        route: products_route_1.productRoute,
    },
];
allRoutes.forEach(route => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
