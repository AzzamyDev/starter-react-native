import { BlurView } from 'expo-blur'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
    children: ReactNode
    className?: string
    intensity?: number
}

// Lapisan kaca buram: blur + tint putih tipis + garis tepi halus
export function Glass({ children, className = '', intensity = 30 }: Props) {
    return (
        <View
            className={`overflow-hidden rounded-3xl border border-white/10 ${className}`}>
            <BlurView
                intensity={intensity}
                tint="dark"
                style={StyleSheet.absoluteFill}
            />
            <View
                pointerEvents="none"
                className="absolute inset-0 bg-white/[0.06]"
            />
            {children}
        </View>
    )
}
