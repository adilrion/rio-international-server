"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationFields = (option) => {
    const pageNumber = Number(option.page || 1);
    const limit = Number(option.limit || 10);
    const sortBy = option.sortBy || 'created_at';
    const sortOrder = option.sortOrder || 'desc';
    const skip = (pageNumber - 1) * limit;
    return {
        page: pageNumber,
        limit,
        sortBy,
        sortOrder,
        skip,
    };
};
exports.paginationHelper = {
    paginationFields,
};
