export type Post = {
    id: number
    title: string
    body: string
    tags: string[]
    likes: number
    views: number
}

export type NewPost = {
    title: string
    body: string
}

export type Page<T> = {
    items: T[]
    total: number
}
