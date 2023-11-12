"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodErrorHandler = void 0;
const zodErrorHandler = (error) => {
    var _a;
    const result = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1].toString(),
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error!',
        errorMessage: result,
    };
};
exports.zodErrorHandler = zodErrorHandler;
