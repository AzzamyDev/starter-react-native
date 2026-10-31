import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string().trim().min(3, 'Username minimal 3 karakter'),
    password: z.string().min(6, 'Kata sandi minimal 6 karakter')
})

export type LoginForm = z.infer<typeof loginSchema>
