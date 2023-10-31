import { Schema, model } from 'mongoose'
import { IProduct } from './products.interface'

const productSchema = new Schema<IProduct>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export const productModel = model<IProduct>('Product', productSchema)
