import { RequestHandler } from 'express'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { productService } from './products.service'
import { ApiResponse } from '../../../shared/apiResponse'
import { IProduct } from './products.interface'

const addedNewProduct: RequestHandler = TryCatchHandler(async (req, res) => {
  const { product } = req.body

  const result = await productService.createProduct(product)
  ApiResponse<IProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'User Created Successfully',
    body: result,
  })
})

export const productController = {
  addedNewProduct,
}
