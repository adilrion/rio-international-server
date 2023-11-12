"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castError = void 0;
const castError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];
    return {
        statusCode: 400,
        message: 'Cast Error!',
        errorMessage: errors,
    };
};
exports.castError = castError;
