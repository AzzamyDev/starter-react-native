import '../global.css'
import {
    BricolageGrotesque_500Medium,
    BricolageGrotesque_700Bold
} from '@expo-google-fonts/bricolage-grotesque'
import {
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    useFonts
} from '@expo-google-fonts/figtree'
import { ToastContainer, ToastProvider } from '@azzamydev/react-native-toast'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { selectIsAuthenticated, useAuthStore } from '@/stores/auth/auth.store'
import { resolveArea } from '@/utils/route-guard'

void SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const hydrated = useAuthStore((s) => s.hydrated)
    const authenticated = useAuthStore(selectIsAuthenticated)
    const hydrate = useAuthStore((s) => s.hydrate)
    const area = resolveArea({ authenticated })
    const [fontsLoaded, fontError] = useFonts({
        BricolageGrotesque_500Medium,
        BricolageGrotesque_700Bold,
        Figtree_400Regular,
        Figtree_500Medium,
        Figtree_600SemiBold
    })
    const ready = hydrated && (fontsLoaded || !!fontError)

    useEffect(() => {
        void hydrate()
    }, [hydrate])

    useEffect(() => {
        if (ready) void SplashScreen.hideAsync()
    }, [ready])

    // Tunggu token dari secure store dan font supaya tidak ada kilatan layar yang salah
    if (!ready) return null

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0e0f24' }}>
            <SafeAreaProvider>
                <ToastProvider>
                    <BottomSheetModalProvider>
                        <StatusBar style="light" />
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                animation: 'fade',
                                contentStyle: { backgroundColor: '#0e0f24' }
                            }}>
                            <Stack.Protected guard={area === 'app'}>
                                <Stack.Screen name="index" />
                                <Stack.Screen name="post/[id]" />
                            </Stack.Protected>
                            <Stack.Protected guard={area === 'auth'}>
                                <Stack.Screen name="login" />
                            </Stack.Protected>
                        </Stack>
                        <ToastContainer />
                    </BottomSheetModalProvider>
                </ToastProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}
