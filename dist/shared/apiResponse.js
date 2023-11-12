"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const ApiResponse = (res, data) => {
    res.status(data.statusCode).json(Object.assign(Object.assign({ success: data.success, message: (data === null || data === void 0 ? void 0 : data.message) || null }, ((data === null || data === void 0 ? void 0 : data.meta) && { meta: data.meta })), { body: (data === null || data === void 0 ? void 0 : data.body) || null }));
};
exports.ApiResponse = ApiResponse;
