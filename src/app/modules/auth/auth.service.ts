import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { ApiError } from '../../../Errors/apiError'
import config from '../../../config'
import { jwtHelper } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'
import { ILogin, ILoginResponse } from './auth.interface'

const loginService = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)


  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user Not Found!')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, '🔑🔑 password mismatch')
  }

  const { userId, email: userEmail } = isUserExist

  const accessToken = jwtHelper.createToken(
    { userId, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )



  const refreshToken = jwtHelper.createToken(
    { userId, userEmail },
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string, // Use the correct configuration property
  )


    return {
      accessToken,
      refreshToken
    }
}

export const authService = {
  loginService,
}
