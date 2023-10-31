import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { productRoute } from '../modules/products/products.route'

const router = express.Router()

const allRoutes = [
  {
    path: '/users/',
    route: userRoutes,
  },
  {
    path: '/product/',
    route: productRoute,
  },
]

allRoutes.forEach(route => router.use(route?.path, route?.route))

export default router
