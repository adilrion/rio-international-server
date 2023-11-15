import { RequestHandler } from "express"
import { TryCatchHandler } from "../../../shared/tryCatchHandler"
import { authService } from "./auth.service";
import { ApiResponse } from "../../../shared/apiResponse";
import {ILoginResponse, IRefreshTokenResponse } from "./auth.interface";
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

const refreshToken: RequestHandler = TryCatchHandler(async (req, res) => {
  const { refreshToken } = req.cookies



  const result = await authService.refreshTokenGenerator(refreshToken)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  ApiResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    body: result,
  })
})




export const authController = {
  loginUser,
  refreshToken,
}