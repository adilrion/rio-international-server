import express from 'express';
import { authController } from './auth.controller';
import { zodValidationHandler } from '../../middleware/zodValidationHandler';
import { authValidation } from './auth.validation';

const router = express.Router();


router.post("/login",zodValidationHandler(authValidation.loginValidation), authController.loginUser)
router.post("/create-refresh-token",zodValidationHandler(authValidation.refreshTokenValidation), authController.refreshToken)


export const authRoute = router;