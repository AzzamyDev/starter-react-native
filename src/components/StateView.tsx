import { ActivityIndicator, Text, View } from 'react-native'
import { Button } from '@/components/Button'

type Props = {
    loading?: boolean
    title?: string
    message?: string
    onRetry?: () => void
}

// Satu tampilan untuk memuat / kosong / gagal
export function StateView({ loading, title, message, onRetry }: Props) {
    return (
        <View className="flex-1 items-center justify-center gap-3 px-8 py-16">
            {loading ? (
                <ActivityIndicator color="#ff9468" />
            ) : (
                <>
                    {title ? (
                        <Text className="text-center font-display text-[22px] text-ink">
                            {title}
                        </Text>
                    ) : null}
                    {message ? (
                        <Text className="text-center font-body text-[15px] text-ink-muted">
                            {message}
                        </Text>
                    ) : null}
                    {onRetry ? (
                        <Button
                            compact
                            variant="secondary"
                            title="Coba lagi"
                            onPress={onRetry}
                        />
                    ) : null}
                </>
            )}
        </View>
    )
}
