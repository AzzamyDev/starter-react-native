import { useToast } from '@azzamydev/react-native-toast'
import { useEffect } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View
} from 'react-native'
import { AppSheet } from '@/components/AppSheet'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { PlusIcon } from '@/components/icons'
import { PostCard } from '@/components/PostCard'
import { PostForm } from '@/components/PostForm'
import { Screen } from '@/components/Screen'
import { ScreenHeader } from '@/components/ScreenHeader'
import { StateView } from '@/components/StateView'
import { useBottomSheet } from '@/hooks/use-bottom-sheet'
import { errorMessage } from '@/services/api/api-error'
import { useAuthStore } from '@/stores/auth/auth.store'
import { usePostsStore } from '@/stores/posts/posts.store'
import { env } from '@/utils/env'
import { haptics } from '@/utils/haptics'
import { PostForm as PostFormValues } from '@/validation/post'

export default function Home() {
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const { items, loading, loadingMore, error, load, loadMore, create } =
        usePostsStore()
    const { show } = useToast()
    const profile = useBottomSheet()
    const compose = useBottomSheet()

    useEffect(() => {
        void load()
    }, [load])

    async function publish(values: PostFormValues) {
        try {
            await create(values)
            haptics.success()
            compose.close()
            show({
                type: 'success',
                title: 'Terbit',
                message: 'Post ditambahkan.'
            })
        } catch (e) {
            haptics.warning()
            show({
                type: 'error',
                title: 'Gagal menerbitkan',
                message: errorMessage(e)
            })
        }
    }

    return (
        <Screen>
            <ScreenHeader
                title={`Halo, ${user?.fullName.split(' ')[0] ?? ''}`}
                action={
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Profil"
                        onPress={profile.open}>
                        <Avatar
                            name={user?.fullName ?? ''}
                            uri={user?.avatarUrl}
                        />
                    </Pressable>
                }
            />

            <FlatList
                data={items}
                keyExtractor={(p) => String(p.id)}
                renderItem={({ item }) => <PostCard post={item} />}
                contentContainerClassName="gap-3 px-5 pb-28"
                refreshing={loading && items.length > 0}
                onRefresh={() => void load()}
                onEndReached={() => void loadMore()}
                onEndReachedThreshold={0.4}
                ListEmptyComponent={
                    loading ? (
                        <StateView loading />
                    ) : error ? (
                        <StateView
                            title="Gagal memuat"
                            message={error}
                            onRetry={() => void load()}
                        />
                    ) : (
                        <StateView title="Belum ada post" />
                    )
                }
                ListFooterComponent={
                    loadingMore ? (
                        <ActivityIndicator color="#ff9468" className="py-4" />
                    ) : undefined
                }
            />

            <View className="absolute bottom-8 right-5">
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Tulis post"
                    onPress={() => {
                        haptics.press()
                        compose.open()
                    }}
                    className="h-14 w-14 items-center justify-center rounded-full bg-ember-500 active:opacity-80">
                    <PlusIcon size={24} />
                </Pressable>
            </View>

            <AppSheet
                sheetRef={compose.ref}
                title="Tulis post"
                snapPoints={['75%']}>
                <PostForm onSubmit={publish} />
            </AppSheet>

            <AppSheet
                sheetRef={profile.ref}
                title="Profil"
                snapPoints={['45%']}>
                <View className="flex-row items-center gap-3">
                    <Avatar
                        name={user?.fullName ?? ''}
                        uri={user?.avatarUrl}
                        size={56}
                    />
                    <View className="flex-1">
                        <Text className="font-body-semibold text-[17px] text-ink">
                            {user?.fullName}
                        </Text>
                        <Text className="font-body text-[14px] text-ink-muted">
                            {user?.email}
                        </Text>
                    </View>
                </View>
                <Text className="font-body text-[13px] text-ink-faint">
                    v{env.appVersion} · {env.appVariant}
                </Text>
                <Button
                    variant="danger"
                    title="Keluar"
                    onPress={() => {
                        haptics.warning()
                        profile.close()
                        void logout()
                    }}
                />
            </AppSheet>
        </Screen>
    )
}
