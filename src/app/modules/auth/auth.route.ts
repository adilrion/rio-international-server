import express from 'express';
import { authController } from './auth.controller';
import { zodValidationHandler } from '../../middleware/zodValidationHandler';
import authValidation from './auth.validation';

const router = express.Router();


router.post("/login",zodValidationHandler(authValidation), authController.loginUser)


export const authRoute = router;