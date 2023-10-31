import { User } from './user.model'

const findsLastUserId = async () => {
  const lastUser = await User.findOne({}, { userId: 1, _id: 0 })
    .sort({ created_at: -1 })
    .lean()

  return lastUser?.userId
}

export const generateUserId = async () => {
  const lastUserId = await findsLastUserId()

  return (parseInt(lastUserId || '0') + 1).toString().padStart(4, '0')
}
