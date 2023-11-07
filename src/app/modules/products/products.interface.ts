import { SortOrder } from "mongoose";

export type IProduct = {

  productId?: string;
  name: string;
  image: string;
  price: number;
  features: string[];
  status: boolean;
    rating: number;
  category: string;
}


export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  totalProducts?: number;
  skip?: number
}



export type IProductResponse<T> = {
  meta: IPaginationOptions
  data: T
}

