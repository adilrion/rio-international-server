import { IPaginationOptions } from "../app/modules/products/products.interface"

const paginationFields = (option: IPaginationOptions):IPaginationOptions => {
  const pageNumber = Number(option.page || 1)
    const limit = Number(option.limit || 10)
  const sortBy = option.sortBy || 'created_at'
  const sortOrder = option.sortOrder || 'desc'
  const search = option.search || ''

  const skip = (pageNumber - 1) * limit

  return {
    page: pageNumber,
    limit,
    sortBy,
    sortOrder,
    skip,
    search
  }
}



export const paginationHelper = {
  paginationFields,
}