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
exports.createUser = void 0;
const user_utils_1 = require("./user.utils");
const user_model_1 = require("./user.model");
const apiError_1 = require("../../../Errors/apiError");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user) {
        user.userId = yield (0, user_utils_1.generateUserId)();
    }
    const createUser = yield user_model_1.User.create(user);
    if (!createUser) {
        throw new apiError_1.ApiError(400, 'Failed to create user!');
    }
    return createUser;
});
exports.createUser = createUser;
