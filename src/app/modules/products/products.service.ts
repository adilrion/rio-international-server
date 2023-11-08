import { SortOrder } from 'mongoose'
import { ApiError } from '../../../Errors/apiError'
import { searchableFields } from '../../../constants/paginationFields'
import { paginationHelper } from '../../../helpers/paginationHelper'
import {
  IPaginationOptions,
  IProduct,
  IProductResponse,
} from './products.interface'
import { productModel } from './products.model'
import { productUtil } from './products.utils'

/* ---------------- Create New Product ----------------*/
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

/* -------- Get All Product -------- */

const getProduct = async (
  paginationOption: IPaginationOptions,
): Promise<IProductResponse<IProduct[]>> => {
  const { skip, limit, page, sortBy, sortOrder, search } =
    paginationHelper.paginationFields(paginationOption)
  // Sort by Query Functionality
  const sortSystem: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortSystem[sortBy] = sortOrder
  }

  // Search Functionality
  const searchTerm = []

if (search) {
  searchTerm.push({
    $or: searchableFields?.map(field => ({
      [field]: {
        $regex: new RegExp(search, 'i'), // Use RegExp for case-insensitive search
      },
    })),
  })
}

  // get data
  const data = await productModel
    .find({$and: searchTerm })
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
