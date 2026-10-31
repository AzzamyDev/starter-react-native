export default {
    expo: {
        name: 'Starter Kit',
        slug: 'expo-starter-kit',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './src/assets/images/app-icon.png',
        scheme: 'starterkit',
        userInterfaceStyle: 'dark',
        newArchEnabled: true,
        splash: {
            image: './src/assets/images/splash-icon-light.png',
            resizeMode: 'contain',
            backgroundColor: '#0e0f24'
        },
        ios: {
            supportsTablet: false,
            bundleIdentifier: 'com.example.starterkit',
            appleTeamId: process.env.APPLE_TEAM_ID,
            infoPlist: {
                // API dev lokal lewat HTTP; dilepas untuk build production
                NSAppTransportSecurity: {
                    NSAllowsLocalNetworking: true,
                    ...(process.env.APP_VARIANT !== 'production' && {
                        NSAllowsArbitraryLoads: true
                    })
                }
            }
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './src/assets/images/adaptive-icon.png',
                backgroundColor: '#0e0f24'
            },
            package: 'com.example.starterkit',
            usesCleartextTraffic: process.env.APP_VARIANT !== 'production'
        },
        web: {
            bundler: 'metro',
            favicon: './src/assets/images/favicon.png'
        },
        plugins: [
            'expo-router',
            'expo-font',
            'expo-secure-store',
            ['expo-build-properties', {}]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
            appVariant: process.env.APP_VARIANT
        }
    }
}
