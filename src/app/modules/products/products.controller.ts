import { RequestHandler } from 'express'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { productService } from './products.service'
import { ApiResponse } from '../../../shared/apiResponse'
import { IProduct } from './products.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

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

const getAllProduct: RequestHandler = TryCatchHandler(async (req, res) => { 


 

  const paginationOption = pick(req.query, paginationFields)

  const result = await productService.getProduct(paginationOption)
ApiResponse<IProduct[]>(res, {
  statusCode: 200,
  success: true,
  message: 'product retrieved Successfully',
  meta: result.meta,
  body: result.data,
})

})



export const productController = {
  addedNewProduct,
  getAllProduct
}
