import { z } from 'zod'

export const postSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, 'Judul minimal 3 karakter')
        .max(120, 'Judul maksimal 120 karakter'),
    body: z
        .string()
        .trim()
        .min(10, 'Isi minimal 10 karakter')
        .max(1000, 'Isi maksimal 1000 karakter')
})

export type PostForm = z.infer<typeof postSchema>
