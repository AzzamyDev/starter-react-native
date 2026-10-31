import { isAxiosError } from 'axios'

export class ApiError extends Error {
    constructor(
        message: string,
        readonly status?: number,
        readonly kind: 'network' | 'http' | 'unknown' = 'unknown'
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

// Satu bentuk error untuk seluruh app: fitur cukup membaca `error.message`
export function toApiError(error: unknown): ApiError {
    if (error instanceof ApiError) return error
    if (isAxiosError(error)) {
        if (!error.response) {
            return new ApiError(
                'Tidak ada koneksi. Periksa jaringan Anda.',
                undefined,
                'network'
            )
        }
        const data = error.response.data as { message?: unknown } | undefined
        const message =
            typeof data?.message === 'string'
                ? data.message
                : `Permintaan gagal (${error.response.status})`
        return new ApiError(message, error.response.status, 'http')
    }
    return new ApiError(
        error instanceof Error ? error.message : 'Terjadi kesalahan',
        undefined,
        'unknown'
    )
}

export function errorMessage(error: unknown): string {
    return toApiError(error).message
}
