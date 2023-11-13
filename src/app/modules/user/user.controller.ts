import { RequestHandler } from 'express'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { createUser } from './user.service'
import { ApiResponse } from '../../../shared/apiResponse'
import { IUser } from './user.interface'

export const createNewUser: RequestHandler = TryCatchHandler(
  async (req, res) => {

    const { user } = req.body
    const result = await createUser(user)
    ApiResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'User Created Successfully',
      body: result,
    })
  },
)
