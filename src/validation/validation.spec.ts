import { loginSchema } from './auth'
import { postSchema } from './post'

describe('loginSchema', () => {
    it('accepts valid credentials', () => {
        expect(
            loginSchema.safeParse({
                username: 'emilys',
                password: 'emilyspass'
            }).success
        ).toBe(true)
    })

    it('rejects short username and password', () => {
        const res = loginSchema.safeParse({ username: 'ab', password: '123' })
        expect(res.success).toBe(false)
        expect(res.error?.issues.map((i) => i.path[0])).toEqual([
            'username',
            'password'
        ])
    })
})

describe('postSchema', () => {
    it('trims and validates length', () => {
        expect(
            postSchema.safeParse({ title: '  Halo  ', body: 'isi yang cukup' })
                .success
        ).toBe(true)
        expect(
            postSchema.safeParse({ title: 'ab', body: 'pendek' }).success
        ).toBe(false)
    })
})
