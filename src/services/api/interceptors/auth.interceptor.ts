import { AxiosInstance, InternalAxiosRequestConfig, isAxiosError } from 'axios'
import { session } from '../session'

type Retriable = InternalAxiosRequestConfig & { _retried?: boolean }

let refreshing: Promise<string | null> | null = null

// Banyak request 401 bersamaan hanya memicu satu refresh
function refreshOnce() {
    refreshing ??= session.refresh().finally(() => {
        refreshing = null
    })
    return refreshing
}

// Pasang SEBELUM attachErrorNormalizer: di sini error masih berupa AxiosError
export function attachAuth(client: AxiosInstance) {
    client.interceptors.request.use((config) => {
        const token = session.getAccessToken()
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    })

    client.interceptors.response.use(undefined, async (error: unknown) => {
        if (!isAxiosError(error)) throw error
        const original = error.config as Retriable | undefined
        if (error.response?.status !== 401 || !original || original._retried) {
            throw error
        }
        original._retried = true
        const token = await refreshOnce()
        if (!token) throw error
        original.headers.Authorization = `Bearer ${token}`
        return client(original)
    })
}
