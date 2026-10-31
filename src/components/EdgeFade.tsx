import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'

// Panjang gradasi yang memudarkan konten di tepi bilah yang melayang
export const FADE = 32
// Warna latar senja di bagian atas dan bawah layar (lihat Screen.tsx)
const TOP = (a: number) => `rgba(36,29,102,${a})`
const BOTTOM = (a: number) => `rgba(40,28,44,${a})`

// Latar bilah melayang (header atau bilah bawah) yang memudar ke arah konten
export function EdgeFade({ edge }: { edge: 'top' | 'bottom' }) {
    const top = edge === 'top'
    return (
        <LinearGradient
            pointerEvents="none"
            colors={
                top
                    ? [TOP(0.97), TOP(0.88), TOP(0)]
                    : [BOTTOM(0), BOTTOM(0.88), BOTTOM(0.97)]
            }
            locations={top ? [0, 0.62, 1] : [0, 0.4, 1]}
            style={[
                StyleSheet.absoluteFill,
                top ? { bottom: -FADE } : { top: -FADE }
            ]}
        />
    )
}
