import { RequestHandler } from 'express'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { productService } from './products.service'
import { ApiResponse } from '../../../shared/apiResponse'
import { IProduct } from './products.interface'
import pick from '../../../shared/pick'
import { filterFields, paginationFields } from '../../../constants/paginationFields'


/* -------- Add New Product -------- */
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

/* -------- Update  New Product -------- */
const updateNewProduct: RequestHandler = TryCatchHandler(async (req, res) => {
  const product  = req.body
   const id = req.params.id
  const result = await productService.updateSingleProduct(id, product)
  ApiResponse<IProduct>(res, {
    statusCode: 200,
    success: true,
    message: 'User update Successfully',
    body: result,
  })
})

/* -------- Get All Product -------- */
const getAllProduct: RequestHandler = TryCatchHandler(async (req, res) => {
  const paginationOption = pick(req.query, paginationFields)
  const filterOptions = pick(req.query, filterFields)


 

  const result = await productService.getProduct(paginationOption, filterOptions)
  ApiResponse<IProduct[]>(res, {
    statusCode: 200,
    success: true,
    message: 'product retrieved Successfully',
    meta: result.meta,
    body: result.data,
  })
})

/* -------- Get Single Product -------- */

const getSingleProduct: RequestHandler = TryCatchHandler(async (req, res, next) => {
  try {
     const id = req.params.id

     const result = await productService.getSingleProduct(id)

     ApiResponse<IProduct>(res, {
       statusCode: 200,
       success: true,
       message: 'product retrieved Successfully',
       body: result,
     })
  } catch (error) {
  
      next(error)
  

  }

 
})

export const productController = {
  addedNewProduct,
  getAllProduct,
  getSingleProduct,
  updateNewProduct,
}
