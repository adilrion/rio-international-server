import httpStatus from 'http-status'
import { JwtPayload, Secret, decode } from 'jsonwebtoken'
import { ApiError } from '../../../Errors/apiError'
import config from '../../../config'
import { jwtHelper } from '../../../helpers/jwtHelper'
import { User } from '../user/user.model'
import { ILogin, ILoginResponse } from './auth.interface'
import jwt from 'jsonwebtoken'

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



const refreshTokenGenerator = async (token: string) => {

  let decoded: JwtPayload;
  try {
     // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  decoded = jwt.verify(token, config.jwt.refreshSecret as string) as JwtPayload
   
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }
const { userEmail } = decoded

  const isUserExist = await User.isUserExist(userEmail);
  if (!isUserExist) {
   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
 }
  
}

export const authService = {
  loginService,
  refreshTokenGenerator,
}
