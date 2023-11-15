import { NextFunction, Request, Response } from 'express'
import ApiError from '../../Errors/apiError'
import httpStatus from 'http-status'
import { jwtHelper } from '../../helpers/jwtHelper'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const authorizationService =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are not Authorized')
      let verifiedUser
      // eslint-disable-next-line prefer-const
      verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret)
      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'user unauthorized!')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default authorizationService
