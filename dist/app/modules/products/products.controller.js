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
exports.productController = void 0;
const tryCatchHandler_1 = require("../../../shared/tryCatchHandler");
const products_service_1 = require("./products.service");
const apiResponse_1 = require("../../../shared/apiResponse");
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationFields_1 = require("../../../constants/paginationFields");
/* -------- Add New Product -------- */
const addedNewProduct = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product } = req.body;
    const result = yield products_service_1.productService.createProduct(product);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Created Successfully',
        body: result,
    });
}));
/* -------- Update  New Product -------- */
const updateNewProduct = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const id = req.params.id;
    const result = yield products_service_1.productService.updateSingleProduct(id, product);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User update Successfully',
        body: result,
    });
}));
/* -------- Get All Product -------- */
const getAllProduct = (0, tryCatchHandler_1.TryCatchHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOption = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const filterOptions = (0, pick_1.default)(req.query, paginationFields_1.filterFields);
    const result = yield products_service_1.productService.getProduct(paginationOption, filterOptions);
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'product retrieved Successfully',
        meta: result.meta,
        body: result.data,
    });
}));
/* -------- Get Single Product -------- */
const getSingleProduct = (0, tryCatchHandler_1.TryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield products_service_1.productService.getSingleProduct(id);
        (0, apiResponse_1.ApiResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'product retrieved Successfully',
            body: result,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.productController = {
    addedNewProduct,
    getAllProduct,
    getSingleProduct,
    updateNewProduct,
};
