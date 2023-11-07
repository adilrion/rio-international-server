import { IPaginationOptions } from "../app/modules/products/products.interface"

export type ApiResponseType<T> = {
  statusCode: number
  success: boolean
  message?: string
  meta?: IPaginationOptions
  body: T | null
}
