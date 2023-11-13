import httpStatus from "http-status";
import { ApiError } from "../../../Errors/apiError";
import { User } from "../user/user.model";
import { ILogin } from "./auth.interface"


const loginService = async (payload: ILogin) => {
    const { email, password } = payload;

    const user = new User()
    const isUserExist =  await user.isUserExist(email)
  
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'user Not Found!')
    }
  
    if ( isUserExist.password && !user.isPasswordMatch(password,  isUserExist?.password)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, '🔑 password mismatch')
    } else {
        console.log("log in successful")
    }


    return {}
}

export const authService = {
    loginService
}