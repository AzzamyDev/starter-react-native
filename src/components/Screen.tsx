import { LinearGradient } from 'expo-linear-gradient'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'

type Props = { children: ReactNode; edges?: Edge[] }

// Latar senja: langit ungu-biru pekat dengan cahaya jingga tipis di ufuk bawah
export function Screen({ children, edges = ['top', 'bottom'] }: Props) {
    return (
        <View className="flex-1 bg-dusk-900">
            <LinearGradient
                colors={['#241d66', '#14153b', '#0b0c1e']}
                locations={[0, 0.55, 1]}
                style={StyleSheet.absoluteFill}
            />
            <LinearGradient
                pointerEvents="none"
                colors={['rgba(255,148,104,0)', 'rgba(255,148,104,0.14)']}
                style={styles.horizon}
            />
            <SafeAreaView className="flex-1" edges={edges}>
                {children}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    horizon: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '38%'
    }
})
