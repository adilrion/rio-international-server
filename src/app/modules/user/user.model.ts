import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, UserModel } from './user.interface'
import config from '../../../config'
import { ENUM_USER_ROLE } from '../../../enums/user'

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
      unique: true,
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
    role: {
      type: String,
      enum: ENUM_USER_ROLE,
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Exclude the 'password' field from the response
        delete ret.password
        return ret
      },
    },
  },
)

userSchema.statics.isUserExist = async function (email: string): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { email: email },
    { email: 1, password: 1, firstName: 1, lastName: 1, userId: 1, role: 1 },
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
