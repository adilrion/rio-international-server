import { Response } from 'express'

type ResponseType<T> = {
  statusCode: number
  success: boolean
  message?: string
  body: T | null
}

export const ApiResponse = <T>(res: Response, data: ResponseType<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    body: data.body,
  })
}
