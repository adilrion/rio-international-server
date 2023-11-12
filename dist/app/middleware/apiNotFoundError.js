"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiNotFoundError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiResponse_1 = require("../../shared/apiResponse");
const ApiNotFoundError = (req, res) => {
    (0, apiResponse_1.ApiResponse)(res, {
        statusCode: http_status_1.default.NOT_FOUND,
        success: false,
        message: 'API Not Found',
        body: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
};
exports.ApiNotFoundError = ApiNotFoundError;
