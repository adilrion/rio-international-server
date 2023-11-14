import Jwt, { Secret } from 'jsonwebtoken'

const createToken = (payload: object, secret: Secret, options: string): string => {
  return Jwt.sign(payload, secret, {
    expiresIn: options,
  })
}


export const jwtHelper = {
    createToken
}