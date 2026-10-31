import { useState } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'

type Props = TextInputProps & { label: string; error?: string }

export function TextField({ label, error, onFocus, onBlur, ...input }: Props) {
    const [focused, setFocused] = useState(false)
    return (
        <View className="gap-1.5">
            <Text className="font-body-medium text-[14px] text-ink-muted">
                {label}
            </Text>
            <TextInput
                placeholderTextColor="#8785b3"
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor="#ff9468"
                onFocus={(e) => {
                    setFocused(true)
                    onFocus?.(e)
                }}
                onBlur={(e) => {
                    setFocused(false)
                    onBlur?.(e)
                }}
                className={`${input.multiline ? 'min-h-[52px] py-3' : 'h-[52px]'} rounded-2xl border bg-white/[0.06] px-4 font-body text-[16px] text-ink ${error ? 'border-danger/60' : focused ? 'border-ember-400' : 'border-ember-400/40'}`}
                {...input}
            />
            {error ? (
                <Text className="font-body text-[13px] text-danger">
                    {error}
                </Text>
            ) : null}
        </View>
    )
}
