import Constants from 'expo-constants'

type Extra = { apiBaseUrl?: string; appVariant?: string }

const extra = (Constants.expoConfig?.extra ?? {}) as Extra

// Satu-satunya pintu baca konfigurasi runtime; jangan hardcode URL di fitur
export const env = {
    apiBaseUrl: extra.apiBaseUrl ?? 'https://dummyjson.com',
    appVariant: extra.appVariant ?? 'development',
    appVersion: Constants.expoConfig?.version ?? '0.0.0'
}

export const isProduction = env.appVariant === 'production'
