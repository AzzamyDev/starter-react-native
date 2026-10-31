import { AuthTokens, User } from '@/types/user'
import { LoginResponseDto, RefreshResponseDto, UserDto } from '../dto/auth.dto'

export function mapUser(dto: UserDto): User {
    return {
        id: dto.id,
        username: dto.username,
        email: dto.email,
        fullName: [dto.firstName, dto.lastName].filter(Boolean).join(' '),
        avatarUrl: dto.image || undefined
    }
}

export function mapTokens(
    dto: LoginResponseDto | RefreshResponseDto
): AuthTokens {
    return { accessToken: dto.accessToken, refreshToken: dto.refreshToken }
}
