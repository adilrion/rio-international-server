/* eslint-disable no-unused-vars */
import { Model } from "mongoose"

export type IUser = {
  userId?: string
  firstName: string
  lastName: string
  gender: string
  email: string
  password: string
  contactNumber: string
}


export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>
  isPasswordMatch(givenPassword: string, savedPassword: string): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>