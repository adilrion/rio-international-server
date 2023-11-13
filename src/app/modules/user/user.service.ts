import { IUser } from './user.interface'
import { generateUserId } from './user.utils'
import { User } from './user.model'
import { ApiError } from '../../../Errors/apiError'


export const createUser = async (user: IUser): Promise<IUser | null> => {
  if (user) {
    user.userId = await generateUserId()
  }

 


  const createUser = await User.create(user)

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!')
  }

  return createUser
}
