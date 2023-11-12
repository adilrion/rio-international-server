"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const apiError_1 = require("../../Errors/apiError");
const validationError_1 = require("../../Errors/validationError");
const zodErrorHandler_1 = require("../../Errors/zodErrorHandler");
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const castError_1 = require("../../Errors/castError");
const globalErrorHandler = (error, req, res, next) => {
    console.log(error);
    let statusCode = 400;
    let message = error === null || error === void 0 ? void 0 : error.message;
    let errorMessage = (error === null || error === void 0 ? void 0 : error.message)
        ? [{ path: '', message: error === null || error === void 0 ? void 0 : error.message }]
        : [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const responseError = (0, validationError_1.validationError)(error);
        statusCode = responseError.statusCode;
        message = responseError.message;
        errorMessage = responseError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const responseError = (0, zodErrorHandler_1.zodErrorHandler)(error);
        statusCode = responseError.statusCode;
        message = responseError.message;
        errorMessage = responseError.errorMessage;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const responseError = (0, castError_1.castError)(error);
        statusCode = responseError.statusCode;
        message = responseError.message;
        errorMessage = responseError.errorMessage;
    }
    else if (error instanceof apiError_1.ApiError) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message) ? [{ path: '', message: error === null || error === void 0 ? void 0 : error.message }] : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message) ? [{ path: '', message: error === null || error === void 0 ? void 0 : error.message }] : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : 'undefined',
    });
    next();
};
exports.globalErrorHandler = globalErrorHandler;
