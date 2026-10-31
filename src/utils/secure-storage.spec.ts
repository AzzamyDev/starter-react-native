import { storageKey } from './secure-storage'

describe('storageKey', () => {
    it('joins parts with dots', () => {
        expect(storageKey('auth', 'session')).toBe('auth.session')
    })

    it('replaces characters SecureStore rejects', () => {
        expect(storageKey('a b', 'c/d')).toBe('a_b.c_d')
    })
})
