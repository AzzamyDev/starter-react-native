// Bentuk mentah payload API; UI tidak boleh bergantung langsung padanya
export type LoginRequestDto = {
    username: string
    password: string
    expiresInMins?: number
}

export type UserDto = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    image?: string
}

export type LoginResponseDto = UserDto & {
    accessToken: string
    refreshToken: string
}

export type RefreshResponseDto = {
    accessToken: string
    refreshToken: string
}
