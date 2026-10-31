import { mapTokens, mapUser } from './auth.mapper'
import { mapPost, mapPostPage } from './post.mapper'

describe('mapUser', () => {
    it('joins the name and drops an empty avatar', () => {
        const user = mapUser({
            id: 1,
            username: 'emilys',
            email: 'e@x.id',
            firstName: 'Emily',
            lastName: 'Johnson',
            image: ''
        })
        expect(user).toEqual({
            id: 1,
            username: 'emilys',
            email: 'e@x.id',
            fullName: 'Emily Johnson',
            avatarUrl: undefined
        })
    })
})

describe('mapTokens', () => {
    it('keeps only the two tokens', () => {
        const tokens = mapTokens({
            id: 1,
            username: 'u',
            email: 'e',
            firstName: 'a',
            lastName: 'b',
            accessToken: 'at',
            refreshToken: 'rt'
        })
        expect(tokens).toEqual({ accessToken: 'at', refreshToken: 'rt' })
    })
})

describe('mapPost', () => {
    it('falls back to safe defaults for missing fields', () => {
        expect(mapPost({ id: 5, title: 't', body: 'b' })).toEqual({
            id: 5,
            title: 't',
            body: 'b',
            tags: [],
            likes: 0,
            views: 0
        })
    })

    it('maps a page with its total', () => {
        const page = mapPostPage({
            posts: [{ id: 1, title: 't', body: 'b', views: 9 }],
            total: 30,
            skip: 0,
            limit: 1
        })
        expect(page.total).toBe(30)
        expect(page.items[0].views).toBe(9)
    })
})
