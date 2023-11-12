"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const zodValidationHandler_1 = require("../../middleware/zodValidationHandler");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-user', (0, zodValidationHandler_1.zodValidationHandler)(user_validation_1.UserValidationSchema), user_controller_1.createNewUser);
exports.userRoutes = router;
