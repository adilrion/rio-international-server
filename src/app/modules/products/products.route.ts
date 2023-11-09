import express from 'express';
import { productController } from './products.controller';
const route = express.Router()

route.post('/add-product', productController.addedNewProduct)
route.get('/:id', productController.getSingleProduct)
route.get('/', productController.getAllProduct)

export const productRoute = route;