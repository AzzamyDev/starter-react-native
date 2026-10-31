import { Image, Text, View } from 'react-native'

type Props = { name: string; uri?: string; size?: number }

export function Avatar({ name, uri, size = 44 }: Props) {
    const style = { width: size, height: size, borderRadius: size / 2 }
    if (uri) return <Image source={{ uri }} style={style} />
    return (
        <View
            style={style}
            className="items-center justify-center bg-ember-500/20">
            <Text className="font-display text-[18px] text-ember-300">
                {name.trim().charAt(0).toUpperCase() || '?'}
            </Text>
        </View>
    )
}
