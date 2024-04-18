import { z } from 'zod'

export const FormDataSchema = z.object({
    username:z
    .string()
    .nonempty('Username is required')
    .min(3, {message: 'Title Should have at least 2 characters'}),
    email: z
    .string()
    .nonempty('Email is required')
    .email({ message: "Invalid email address."}),
    password: z
    .string()
    .nonempty('Password is required')
    .min(4, {message: 'Password must have at least 4 characters'})
})
