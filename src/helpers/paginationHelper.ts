import { IPaginationOptions } from "../app/modules/products/products.interface"

const paginationFields = (option: IPaginationOptions):IPaginationOptions => {
  const pageNumber = Number(option.page || 1)
    const limit = Number(option.limit || 10)
  const sortBy = option.sortBy || 'created_at'
  const sortOrder = option.sortOrder || 'desc'


  const skip = (pageNumber - 1) * limit

  return {
    page: pageNumber,
    limit,
    sortBy,
    sortOrder,
    skip,

  }
}



export const paginationHelper = {
  paginationFields,
}