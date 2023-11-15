import express from 'express';
import { productController } from './products.controller';
import authorizationService from '../../middleware/authorizationService';
import { ENUM_USER_ROLE } from '../../../enums/user';
const route = express.Router()

route.post('/add-product',authorizationService(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN), productController.addedNewProduct)
route.get('/:id', productController.getSingleProduct)
route.patch('/:id', productController.updateNewProduct)
route.get('/', productController.getAllProduct)

export const productRoute = route;