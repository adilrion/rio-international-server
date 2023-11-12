"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
exports.UserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z
            .object({
            firstName: zod_1.z
                .string({ required_error: 'First name is required!' })
                .min(1, { message: 'First name is required!' })
                .max(20, { message: 'Role cannot exceed 20 characters!' })
                .refine(value => value.trim() !== '', {
                message: 'First name is required!',
            }),
            lastName: zod_1.z
                .string({ required_error: 'Last name is required!' })
                .min(1, { message: 'Last name is required!' })
                .max(50, { message: 'Last name cannot exceed 50 characters!' })
                .refine(value => value.trim() !== '', {
                message: 'Last name is required!',
            }),
            gender: zod_1.z
                .string({ required_error: 'Gender is required!' })
                .min(1, { message: 'Gender is required!' })
                .max(10, { message: 'Gender cannot exceed 10 characters!' })
                .refine(value => value.trim() !== '', {
                message: 'Gender is required!',
            }),
            email: zod_1.z
                .string({ required_error: 'Email required!' })
                .email('Invalid email format!')
                .min(1, { message: 'Email is required!' })
                .max(100, { message: 'Email cannot exceed 100 characters!' })
                .refine(value => value.trim() !== '', {
                message: 'Email is required!',
            }),
            password: zod_1.z
                .string({ required_error: 'Password is required!' })
                .min(1, { message: 'Password is required!' })
                .max(20, { message: 'Password cannot exceed 20 characters!' })
                .refine(value => value.trim() !== '', {
                message: 'Role is required!',
            }),
            role: zod_1.z
                .string({ required_error: 'Role is required!' })
                .min(1, { message: 'Role is required!' })
                .max(20, { message: 'Role cannot exceed 20 characters!' })
                .refine(value => value.trim() !== '', {
                message: 'Role is required!',
            }),
            contactNumber: zod_1.z
                .string({ required_error: 'Contact number is required!' })
                .min(1, { message: 'Contact number is required!' })
                .max(20, { message: 'Contact number cannot exceed 20 characters!' })
                .refine(value => value.trim() !== '', {
                message: 'Contact number is required!',
            }),
        })
            .refine(value => Object.keys(value).length > 0, {
            message: 'User details are required!',
        }),
    }),
});
