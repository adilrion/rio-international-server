import httpStatus from 'http-status'
import { JwtPayload, Secret } from 'jsonwebtoken'
import ApiError from '../../../Errors/apiError'
import config from '../../../config'
import { jwtHelper } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'
import { ILogin, ILoginResponse, IRefreshTokenResponse } from './auth.interface'

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

  const { userId, email: userEmail, role } = isUserExist


  const accessToken = jwtHelper.createToken(
    { userId, userEmail, role},
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string,
  )

  const refreshToken = jwtHelper.createToken(
    { userId, userEmail, role },
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshTokenGenerator = async (token: string): Promise<IRefreshTokenResponse> => {
  let decoded: JwtPayload
  try {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    decoded = jwtHelper.verifyToken( token, config.jwt.refreshSecret as Secret)
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
  const { userEmail } = decoded

  const isUserExist = await User.isUserExist(userEmail)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }


const {userId, email, role} = isUserExist

  const newAccessToken = jwtHelper.createToken(
    { userId, email, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string, // Use the correct configuration property
  )



  return {
    accessToken: newAccessToken,
  }

}

export const authService = {
  loginService,
  refreshTokenGenerator,
}
