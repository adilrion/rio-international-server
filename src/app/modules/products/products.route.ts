import express from 'express';
import { productController } from './products.controller';
const route = express.Router()

route.post('/add-product', productController.addedNewProduct)
route.get('/get-product', productController.getAllProduct)

export const productRoute = route;