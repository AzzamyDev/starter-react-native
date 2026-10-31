export type User = {
    id: number
    username: string
    email: string
    fullName: string
    avatarUrl?: string
}

export type AuthTokens = {
    accessToken: string
    refreshToken: string
}
