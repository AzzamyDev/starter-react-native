import { ActivityIndicator, Pressable, Text } from 'react-native'
import { haptics } from '@/utils/haptics'

type Props = {
    title: string
    onPress: () => void
    variant?: 'primary' | 'secondary' | 'danger'
    loading?: boolean
    disabled?: boolean
    compact?: boolean
}

const container = {
    primary: 'bg-ember-500',
    secondary: 'bg-white/[0.07] border border-white/15',
    danger: 'bg-danger/15 border border-danger/40'
}
const label = {
    primary: 'text-dusk-950',
    secondary: 'text-ink',
    danger: 'text-danger'
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    loading,
    disabled,
    compact
}: Props) {
    const inactive = disabled || loading
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !!inactive }}
            disabled={inactive}
            onPress={() => {
                haptics.tap()
                onPress()
            }}
            className={`items-center justify-center rounded-2xl active:opacity-75 ${compact ? 'h-11 px-4' : 'h-[52px] px-6'} ${container[variant]} ${inactive ? 'opacity-50' : ''}`}>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? '#0b0c1e' : '#ece9ff'}
                />
            ) : (
                <Text
                    className={`font-body-semibold text-[16px] ${label[variant]}`}>
                    {title}
                </Text>
            )}
        </Pressable>
    )
}
