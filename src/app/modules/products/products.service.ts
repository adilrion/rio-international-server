import { SortOrder } from 'mongoose'
import { ApiError } from '../../../Errors/apiError'
import { paginationHelper } from '../../../helpers/paginationHelper'
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
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelper.paginationFields(paginationOption)

 const sortSystem: { [key: string]: SortOrder} = {}

 if (sortBy && sortOrder) {
   sortSystem[sortBy] = sortOrder
 }
  const data = await productModel
    .find()
    .sort(sortSystem)
    .skip(Number(skip))
    .limit(Number(limit))

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
