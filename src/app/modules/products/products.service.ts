import { ApiError } from '../../../Errors/apiError'
import { IProduct } from './products.interface'
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

export const productService = {
  createProduct,
}
