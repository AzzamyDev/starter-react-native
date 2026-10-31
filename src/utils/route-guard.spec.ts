import { resolveArea } from './route-guard'

describe('resolveArea', () => {
    it('sends signed-out users to auth', () => {
        expect(resolveArea({ authenticated: false })).toBe('auth')
    })

    it('sends signed-in users to app', () => {
        expect(resolveArea({ authenticated: true })).toBe('app')
    })
})
