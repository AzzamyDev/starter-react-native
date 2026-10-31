import { router } from 'expo-router'
import { ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BackIcon } from '@/components/icons'

type Props = { title: string; back?: boolean; action?: ReactNode }

export function ScreenHeader({ title, back, action }: Props) {
    return (
        <View className="flex-row items-center gap-3 px-5 pb-3 pt-2">
            {back ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Kembali"
                    hitSlop={10}
                    onPress={() => router.back()}
                    className="h-11 w-11 items-center justify-center rounded-full bg-white/[0.07] active:opacity-70">
                    <BackIcon />
                </Pressable>
            ) : null}
            <Text
                numberOfLines={1}
                className="flex-1 font-display text-[28px] text-ink">
                {title}
            </Text>
            {action}
        </View>
    )
}
