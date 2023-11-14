import { RequestHandler } from "express"
import { TryCatchHandler } from "../../../shared/tryCatchHandler"
import { authService } from "./auth.service";
import { ApiResponse } from "../../../shared/apiResponse";
import {ILoginResponse } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../../config";

const loginUser: RequestHandler = TryCatchHandler(async (req, res) => {
    const { ...loginUser } = req.body;
    const {refreshToken, ...result} = await authService.loginService(loginUser)

  
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true
  }
  
  
  res.cookie('refreshToken', refreshToken, cookieOptions)
  
  ApiResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    body: result,
  })
    
})




export const authController = {
  loginUser,
}