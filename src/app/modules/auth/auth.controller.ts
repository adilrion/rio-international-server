import { RequestHandler } from "express"
import { TryCatchHandler } from "../../../shared/tryCatchHandler"
import { authService } from "./auth.service";
import { ApiResponse } from "../../../shared/apiResponse";
import { ILogin } from "./auth.interface";
import httpStatus from "http-status";

const loginUser: RequestHandler = TryCatchHandler(async (req, res) => {
    const { ...loginUser } = req.body;
    const result = await authService.loginService(loginUser)

  ApiResponse<ILogin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    body: result,
  })
    
})




export const authController = {
  loginUser,
}