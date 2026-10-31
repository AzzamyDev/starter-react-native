import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { PostForm as PostFormValues, postSchema } from '@/validation/post'

type Props = {
    onSubmit: (values: PostFormValues) => Promise<void>
}

// Contoh form: React Hook Form + Zod; hasil/toast ditangani pemanggil
export function PostForm({ onSubmit }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: { title: '', body: '' }
    })

    return (
        <View className="gap-4">
            <Controller
                control={control}
                name="title"
                render={({ field }) => (
                    <TextField
                        label="Judul"
                        autoCapitalize="sentences"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.title?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="body"
                render={({ field }) => (
                    <TextField
                        label="Isi"
                        multiline
                        autoCapitalize="sentences"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.body?.message}
                    />
                )}
            />
            <Button
                title="Terbitkan"
                loading={isSubmitting}
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    )
}
