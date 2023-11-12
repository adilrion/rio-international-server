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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const apiError_1 = require("../../../Errors/apiError");
const paginationFields_1 = require("../../../constants/paginationFields");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const products_model_1 = require("./products.model");
const products_utils_1 = require("./products.utils");
/* ---------------- Create New Product ----------------*/
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    if (product) {
        product.productId = yield products_utils_1.productUtil.createProductId();
    }
    const createdProduct = yield products_model_1.productModel.create(product);
    if (!createdProduct) {
        throw new apiError_1.ApiError(400, 'Failed to create Product!');
    }
    return createdProduct;
});
/* -------- Update Single Product -------- */
const updateSingleProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield products_model_1.productModel.findByIdAndUpdate({ _id: id }, product, { new: true });
    return updatedProduct;
});
/* -------- Get All Product -------- */
const getProduct = (paginationOption, filterFields) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = paginationHelper_1.paginationHelper.paginationFields(paginationOption);
    // Sort by Query Functionality
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const andCondition = [];
    // Search Functionality
    const { search } = filterFields, filtrateData = __rest(filterFields, ["search"]);
    if (search) {
        andCondition.push({
            $or: paginationFields_1.searchableFields === null || paginationFields_1.searchableFields === void 0 ? void 0 : paginationFields_1.searchableFields.map(field => ({
                [field]: {
                    $regex: new RegExp(search, 'i'),
                },
            })),
        });
    }
    // Filter Functionality
    if (Object.keys(filtrateData).length) {
        andCondition.push({
            $and: Object.entries(filtrateData).map(([key, value]) => ({
                [key]: value
            }))
        });
    }
    // get data
    const data = yield products_model_1.productModel
        .find(andCondition.length > 0 ? { $and: andCondition } : {})
        .sort(sortCondition)
        .skip(Number(skip))
        .limit(Number(limit));
    const totalProducts = yield products_model_1.productModel.countDocuments();
    return {
        meta: {
            page,
            limit,
            totalProducts,
        },
        data,
    };
});
/* -------- Get Single Product -------- */
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.productModel.findById(id);
    return result;
});
exports.productService = {
    createProduct,
    getProduct,
    getSingleProduct,
    updateSingleProduct,
};
