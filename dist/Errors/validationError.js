"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = void 0;
const validationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        return {
            path: el.path,
            message: el.message,
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error!',
        errorMessage: errors,
    };
};
exports.validationError = validationError;
