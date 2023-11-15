/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import ApiError from '../../Errors/apiError'
import { validationError } from '../../Errors/validationError'
import { zodErrorHandler } from '../../Errors/zodErrorHandler'
import config from '../../config'
import { IErrorInterface } from '../../interfaces/errorInterface'
import { ZodError } from 'zod'
import { castError } from '../../Errors/castError'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  config.env === 'development' && console.log(`🐱 globalErrorHandler ~~`, { error })
  
  let statusCode = 400
  let message = 'Something went wrong !'
  let errorMessage: IErrorInterface[] = []
  
   


  if (error?.name === 'ValidationError') {
    const responseError = validationError(error)
    statusCode = responseError.statusCode
    message = responseError.message
    errorMessage = responseError.errorMessage
  } else if (error instanceof ZodError) {
    const responseError = zodErrorHandler(error)
    statusCode = responseError.statusCode
    message = responseError.message
    errorMessage = responseError.errorMessage
  } else if (error?.name === 'CastError') {
    const responseError = castError(error)
    statusCode = responseError.statusCode
    message = responseError.message
    errorMessage = responseError.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: error?.message }] : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: error?.message }] : []
  }

   res.status(statusCode).json({
     success: false,
     message,
     errorMessage,
     stack: config.env !== 'production' ? error?.stack : undefined,
   })
  next()
}
export default globalErrorHandler
