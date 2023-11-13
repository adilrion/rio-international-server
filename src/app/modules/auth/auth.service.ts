import httpStatus from "http-status";
import { ApiError } from "../../../Errors/apiError";
import { User } from "../user/user.model";
import { ILogin } from "./auth.interface"
import bcrypt from 'bcrypt'

const loginService = async (payload: ILogin) => {
    const { email, password } = payload;

    // console.log(email, password);
    const isUserExist = await User.findOne({ email: email }, { email: 1, password: 1, firstName: 1, lastName: 1, userId: 1 }).lean();

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!')
    }


    const isPasswordMatch = await bcrypt.compare(password, isUserExist?.password)
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, '🔑 password mismatch')
    }

    return {}
}

export const authService = {
    loginService
}