import {
    LoginRequestDto,
    LoginResponseDto,
    RefreshResponseDto,
    UserDto
} from '@/response/dto/auth.dto'
import { mapTokens, mapUser } from '@/response/mappers/auth.mapper'
import { AuthTokens, User } from '@/types/user'
import { appClient } from './clients/app.client'
import { authClient } from './clients/auth.client'

export const authApi = {
    async login(
        credentials: LoginRequestDto
    ): Promise<{ user: User; tokens: AuthTokens }> {
        const { data } = await authClient.post<LoginResponseDto>(
            '/auth/login',
            { expiresInMins: 30, ...credentials }
        )
        return { user: mapUser(data), tokens: mapTokens(data) }
    },

    async refresh(refreshToken: string): Promise<AuthTokens> {
        const { data } = await authClient.post<RefreshResponseDto>(
            '/auth/refresh',
            { refreshToken, expiresInMins: 30 }
        )
        return mapTokens(data)
    },

    async me(): Promise<User> {
        const { data } = await appClient.get<UserDto>('/auth/me')
        return mapUser(data)
    }
}
