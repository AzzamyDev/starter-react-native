import { create } from 'zustand'
import { postsApi } from '@/services/api/posts.api'
import { errorMessage } from '@/services/api/api-error'
import { useAuthStore } from '@/stores/auth/auth.store'
import { NewPost, Post } from '@/types/post'

export const PAGE_SIZE = 10

type PostsState = {
    items: Post[]
    total: number
    loading: boolean
    loadingMore: boolean
    error?: string
    details: Record<number, Post>
}

type PostsActions = {
    load: () => Promise<void>
    loadMore: () => Promise<void>
    getPost: (id: number) => Promise<Post>
    create: (input: NewPost) => Promise<Post>
    reset: () => void
}

const initial: PostsState = {
    items: [],
    total: 0,
    loading: false,
    loadingMore: false,
    details: {}
}

export const selectHasMore = (s: PostsState) => s.items.length < s.total

export const usePostsStore = create<PostsState & PostsActions>()((set, get) => {
    // data milik satu akun: kosongkan saat logout
    useAuthStore.subscribe((state, prev) => {
        if (prev.user && !state.user) get().reset()
    })

    return {
        ...initial,

        load: async () => {
            if (get().loading) return
            set({ loading: true, error: undefined })
            try {
                const page = await postsApi.list({ limit: PAGE_SIZE, skip: 0 })
                set({ items: page.items, total: page.total })
            } catch (e) {
                set({ error: errorMessage(e) })
            } finally {
                set({ loading: false })
            }
        },

        loadMore: async () => {
            const { loading, loadingMore, items, total } = get()
            if (loading || loadingMore || items.length >= total) return
            set({ loadingMore: true })
            try {
                const page = await postsApi.list({
                    limit: PAGE_SIZE,
                    skip: items.length
                })
                set((s) => ({
                    items: [...s.items, ...page.items],
                    total: page.total
                }))
            } catch (e) {
                set({ error: errorMessage(e) })
            } finally {
                set({ loadingMore: false })
            }
        },

        getPost: async (id) => {
            const cached =
                get().details[id] ?? get().items.find((p) => p.id === id)
            if (cached) return cached
            const post = await postsApi.get(id)
            set((s) => ({ details: { ...s.details, [id]: post } }))
            return post
        },

        create: async (input) => {
            const userId = useAuthStore.getState().user?.id ?? 0
            const post = await postsApi.create({ ...input, userId })
            set((s) => ({ items: [post, ...s.items], total: s.total + 1 }))
            return post
        },

        reset: () => set(initial)
    }
})
