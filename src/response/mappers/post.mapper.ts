import { Page, Post } from '@/types/post'
import { PostDto, PostListDto } from '../dto/post.dto'

export function mapPost(dto: PostDto): Post {
    return {
        id: dto.id,
        title: dto.title,
        body: dto.body,
        tags: dto.tags ?? [],
        likes: dto.reactions?.likes ?? 0,
        views: dto.views ?? 0
    }
}

export function mapPostPage(dto: PostListDto): Page<Post> {
    return { items: dto.posts.map(mapPost), total: dto.total }
}
