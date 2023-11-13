import { z } from "zod";

const authValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email required!' })
      .email('Invalid email format!')
      .min(1, { message: 'Email is required!' })
      .max(100, { message: 'Email cannot exceed 100 characters!' })
      .refine(value => value.trim() !== '', {
        message: 'Email is required!',
      }),
    password: z
      .string({ required_error: 'Password is required!' })
      .min(1, { message: 'Password is required!' })
      .max(20, { message: 'Password cannot exceed 20 characters!' })
      .refine(value => value.trim() !== '', {
        message: 'Password is required!',
      }),
  }),
})


export default authValidation;