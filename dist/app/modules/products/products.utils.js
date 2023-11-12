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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUtil = void 0;
const products_model_1 = require("./products.model");
const findLastProductId = () => __awaiter(void 0, void 0, void 0, function* () {
    const LastProductId = yield products_model_1.productModel.findOne({}, { productId: 1, _id: 0 }).sort({ created_at: -1 }).lean();
    return LastProductId === null || LastProductId === void 0 ? void 0 : LastProductId.productId;
});
const createProductId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastProductId = yield findLastProductId();
    return (parseInt(lastProductId || '0') + 1).toString().padStart(4, '0');
});
exports.productUtil = {
    createProductId
};
