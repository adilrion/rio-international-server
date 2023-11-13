import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, UserModel } from './user.interface'
import config from '../../../config'

const userSchema = new Schema<IUser, UserModel>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

userSchema.statics.isUserExist = async function (email: string): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { email: email },
    { email: 1, password: 1, firstName: 1, lastName: 1, userId: 1 },
  )
}

userSchema.statics.isPasswordMatch = async function (givenPassword: string, savedPassword: string): Promise<boolean> {
  
    return await bcrypt.compare(givenPassword, savedPassword)
  
}

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcryptSaltRound),
    )
  
  next();
})



export const User = model<IUser, UserModel>('User', userSchema)
