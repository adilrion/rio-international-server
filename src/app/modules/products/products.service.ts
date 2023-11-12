import { SortOrder } from 'mongoose'
import { ApiError } from '../../../Errors/apiError'
import { searchableFields } from '../../../constants/paginationFields'
import { paginationHelper } from '../../../helpers/paginationHelper'
import {
  IFilterOptions,
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


/* -------- Update Single Product -------- */

const updateSingleProduct = async (id: string, product: Partial<IProduct>) => {
  const updatedProduct = await productModel.findByIdAndUpdate({ _id: id }, product, { new: true })
  
  return updatedProduct;
}

/* -------- Get All Product -------- */

const getProduct = async ( paginationOption: IPaginationOptions, filterFields:IFilterOptions): Promise<IProductResponse<IProduct[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelper.paginationFields(paginationOption)
  // Sort by Query Functionality
  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const andCondition = []
  // Search Functionality
   const { search, ...filtrateData } = filterFields
  if (search) {
    andCondition.push({
      $or: searchableFields?.map(field => ({
        [field]: {
          $regex: new RegExp(search, 'i'),
        },
      })),
    })
  }
  // Filter Functionality
  if (Object.keys(filtrateData).length) {
    andCondition.push({
      $and: Object.entries(filtrateData).map(([key, value]) => ({
        [key]: value
      }))
    })
  }
  // get data
  const data = await productModel
    .find(andCondition.length > 0 ? { $and: andCondition } : {})
    .sort(sortCondition)
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



/* -------- Get Single Product -------- */

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await productModel.findById(id)
  return result
}



export const productService = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateSingleProduct,
}
