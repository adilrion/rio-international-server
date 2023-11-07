import { ApiError } from '../../../Errors/apiError'
import {
  IPaginationOptions,
  IProduct,
  IProductResponse,
} from './products.interface'
import { productModel } from './products.model'
import { productUtil } from './products.utils'

const createProduct = async (product: IProduct): Promise<IProduct | null> => {
  if (product) {
    product.productId = await productUtil.createProductId()
  }
  const createdProduct = await productModel.create(product)

  if (!createdProduct) {
    throw new ApiError(400, 'Failed to create Product!')
  }
  return createdProduct
}

const getProduct = async (
  paginationOption: IPaginationOptions,
): Promise<IProductResponse<IProduct[]>> => {
  const { page = 1, limit = 10 } = paginationOption

  const skip = (page - 1) * limit

  const data = await productModel.find().sort().skip(skip).limit(limit)
  const totalProducts = await productModel.countDocuments()

  return {
    meta: {
     
        page,
        limit,
        totalProducts,
     
    },
    data,
  }
}

export const productService = {
  createProduct,
  getProduct,
}
