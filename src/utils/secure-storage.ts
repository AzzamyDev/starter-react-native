import * as SecureStore from 'expo-secure-store'

// SecureStore hanya menerima [A-Za-z0-9._-]
export function storageKey(...parts: string[]): string {
    return parts.map((p) => p.replace(/[^A-Za-z0-9._-]/g, '_')).join('.')
}

// Pembungkus aman: kegagalan baca/tulis tidak boleh menjatuhkan app
export const secureStorage = {
    async get(key: string): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(key)
        } catch {
            return null
        }
    },
    async set(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value)
    },
    async remove(key: string): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(key)
        } catch {
            // sudah tidak ada: abaikan
        }
    }
}
