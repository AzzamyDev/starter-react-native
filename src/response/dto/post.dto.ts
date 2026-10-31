export type PostDto = {
    id: number
    title: string
    body: string
    tags?: string[]
    reactions?: { likes?: number; dislikes?: number }
    views?: number
    userId?: number
}

export type PostListDto = {
    posts: PostDto[]
    total: number
    skip: number
    limit: number
}
