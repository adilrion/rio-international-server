import { z } from 'zod'

export const UserValidationSchema = z.object({
  body: z.object({
    user: z
      .object({
        firstName: z
          .string({ required_error: 'First name is required!' })
          .min(1, { message: 'First name is required!' })
          .max(20, { message: 'Role cannot exceed 20 characters!' })
          .refine(value => value.trim() !== '', {
            message: 'First name is required!',
          }),
        lastName: z
          .string({ required_error: 'Last name is required!' })
          .min(1, { message: 'Last name is required!' })
          .max(50, { message: 'Last name cannot exceed 50 characters!' })
          .refine(value => value.trim() !== '', {
            message: 'Last name is required!',
          }),
        gender: z
          .string({ required_error: 'Gender is required!' })
          .min(1, { message: 'Gender is required!' })
          .max(10, { message: 'Gender cannot exceed 10 characters!' })
          .refine(value => value.trim() !== '', {
            message: 'Gender is required!',
          }),
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
        contactNumber: z
          .string({ required_error: 'Contact number is required!' })
          .min(1, { message: 'Contact number is required!' })
          .max(20, { message: 'Contact number cannot exceed 20 characters!' })
          .refine(value => value.trim() !== '', {
            message: 'Contact number is required!',
          }),
        role: z
          .string({ required_error: 'Role is required!' }).optional()
      })
      .refine(value => Object.keys(value).length > 0, {
        message: 'User details are required!',
      }),
  }),
})
