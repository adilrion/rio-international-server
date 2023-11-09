import { ErrorRequestHandler } from 'express'
import { ApiError } from '../../Errors/apiError'
import { validationError } from '../../Errors/validationError'
import { zodErrorHandler } from '../../Errors/zodErrorHandler'
import config from '../../config'
import { IErrorInterface } from '../../interfaces/errorInterface'
import { ZodError } from 'zod'
import { castError } from '../../Errors/castError'

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {

  console.log(error)
  let statusCode = 400
  let message = error?.message
  let errorMessage: IErrorInterface[] = error?.message
    ? [{ path: '', message: error?.message }]
    : []

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
    stack: config.env !== 'production' ? error?.stack : 'undefined',
  })
  next()
}
