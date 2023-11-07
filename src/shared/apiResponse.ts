import { Response } from 'express'
import { ApiResponseType } from '../interfaces/apiResponse'



export const ApiResponse = <T>(res: Response, data: ApiResponseType<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data?.message || null,
    meta: data?.meta || null,
    body: data?.body || null,
  })
}
