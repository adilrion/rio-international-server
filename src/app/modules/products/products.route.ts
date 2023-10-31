import express from 'express';
import { productController } from './products.controller';
const route = express.Router()

route.post('/add-product', productController.addedNewProduct)

export const productRoute = route;