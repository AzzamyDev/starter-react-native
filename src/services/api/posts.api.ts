import { PostDto, PostListDto } from '@/response/dto/post.dto'
import { mapPost, mapPostPage } from '@/response/mappers/post.mapper'
import { NewPost, Page, Post } from '@/types/post'
import { appClient } from './clients/app.client'

export const postsApi = {
    async list(params: { limit: number; skip: number }): Promise<Page<Post>> {
        const { data } = await appClient.get<PostListDto>('/posts', { params })
        return mapPostPage(data)
    },

    async get(id: number): Promise<Post> {
        const { data } = await appClient.get<PostDto>(`/posts/${id}`)
        return mapPost(data)
    },

    // dummyjson hanya mensimulasikan: respons berisi data baru tapi tidak disimpan
    async create(input: NewPost & { userId: number }): Promise<Post> {
        const { data } = await appClient.post<PostDto>('/posts/add', input)
        return mapPost({ ...data, ...input })
    }
}
