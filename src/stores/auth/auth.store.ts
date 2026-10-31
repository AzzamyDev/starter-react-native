import { create } from 'zustand'
import { authApi } from '@/services/api/auth.api'
import { configureSession } from '@/services/api/session'
import { AuthTokens, User } from '@/types/user'
import { secureStorage, storageKey } from '@/utils/secure-storage'
import { LoginForm } from '@/validation/auth'

const TOKENS_KEY = storageKey('auth', 'tokens')

type AuthState = {
    hydrated: boolean
    user: User | null
    tokens: AuthTokens | null
}

type AuthActions = {
    hydrate: () => Promise<void>
    login: (form: LoginForm) => Promise<void>
    logout: () => Promise<void>
}

export const selectIsAuthenticated = (s: AuthState) => s.user !== null

async function readTokens(): Promise<AuthTokens | null> {
    const raw = await secureStorage.get(TOKENS_KEY)
    if (!raw) return null
    try {
        const parsed = JSON.parse(raw) as Partial<AuthTokens>
        return parsed.accessToken && parsed.refreshToken
            ? (parsed as AuthTokens)
            : null
    } catch {
        return null
    }
}

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => {
    async function saveTokens(tokens: AuthTokens) {
        set({ tokens })
        await secureStorage.set(TOKENS_KEY, JSON.stringify(tokens))
    }

    // Dipanggil interceptor saat 401; gagal berarti sesi berakhir
    configureSession({
        getAccessToken: () => get().tokens?.accessToken ?? null,
        refresh: async () => {
            const current = get().tokens
            if (!current) return null
            try {
                const next = await authApi.refresh(current.refreshToken)
                await saveTokens(next)
                return next.accessToken
            } catch {
                await get().logout()
                return null
            }
        }
    })

    return {
        hydrated: false,
        user: null,
        tokens: null,

        hydrate: async () => {
            const tokens = await readTokens()
            if (!tokens) {
                set({ hydrated: true })
                return
            }
            set({ tokens })
            try {
                set({ user: await authApi.me(), hydrated: true })
            } catch {
                await get().logout()
                set({ hydrated: true })
            }
        },

        login: async (form) => {
            const { user, tokens } = await authApi.login(form)
            await saveTokens(tokens)
            set({ user })
        },

        logout: async () => {
            set({ user: null, tokens: null })
            await secureStorage.remove(TOKENS_KEY)
        }
    }
})
