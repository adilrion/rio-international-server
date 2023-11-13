import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from './user.interface'
import config from '../../../config'

const userSchema = new Schema<IUser>(
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



userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcryptSaltRound),
    )
  
  next();
})


export const User = model<IUser>('User', userSchema)
