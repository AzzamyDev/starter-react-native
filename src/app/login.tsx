import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@azzamydev/react-native-toast'
import { LinearGradient } from 'expo-linear-gradient'
import { Controller, useForm } from 'react-hook-form'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View
} from 'react-native'
import { Button } from '@/components/Button'
import { Glass } from '@/components/Glass'
import { Screen } from '@/components/Screen'
import { TextField } from '@/components/TextField'
import { errorMessage } from '@/services/api/api-error'
import { useAuthStore } from '@/stores/auth/auth.store'
import { haptics } from '@/utils/haptics'
import { LoginForm, loginSchema } from '@/validation/auth'

export default function Login() {
    const login = useAuthStore((s) => s.login)
    const { show } = useToast()
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: '', password: '' }
    })

    async function submit(values: LoginForm) {
        try {
            await login(values)
            haptics.success()
        } catch (e) {
            haptics.warning()
            show({
                type: 'error',
                title: 'Gagal masuk',
                message: errorMessage(e)
            })
        }
    }

    return (
        <Screen>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerClassName="flex-grow justify-center gap-8 px-6 py-10">
                    <View className="gap-3">
                        <LinearGradient
                            colors={['#ffb086', '#f0744c']}
                            style={{ width: 56, height: 56, borderRadius: 18 }}
                        />
                        <Text className="font-display text-[40px] leading-[44px] text-ink">
                            Selamat{'\n'}datang kembali
                        </Text>
                        <Text className="font-body text-[16px] text-ink-muted">
                            Masuk untuk melanjutkan.
                        </Text>
                    </View>

                    <Glass className="gap-4 p-5">
                        <Controller
                            control={control}
                            name="username"
                            render={({ field }) => (
                                <TextField
                                    label="Username"
                                    textContentType="username"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    error={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <TextField
                                    label="Kata sandi"
                                    secureTextEntry
                                    textContentType="password"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    error={errors.password?.message}
                                />
                            )}
                        />
                        <Button
                            title="Masuk"
                            loading={isSubmitting}
                            onPress={handleSubmit(submit)}
                        />
                    </Glass>

                    <Text className="text-center font-body text-[13px] text-ink-faint">
                        Demo (dummyjson.com): emilys / emilyspass
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    )
}
