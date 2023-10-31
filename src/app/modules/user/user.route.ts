import express from 'express'
import { createNewUser } from './user.controller'
import { zodValidationHandler } from '../../middleware/zodValidationHandler'
import { UserValidationSchema } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  zodValidationHandler(UserValidationSchema),
  createNewUser,
)

export const userRoutes = router
