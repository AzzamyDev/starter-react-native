import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Screen } from '@/components/Screen'
import { ScreenHeader } from '@/components/ScreenHeader'
import { StateView } from '@/components/StateView'
import { errorMessage } from '@/services/api/api-error'
import { usePostsStore } from '@/stores/posts/posts.store'
import { Post } from '@/types/post'

export default function PostDetail() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const getPost = usePostsStore((s) => s.getPost)
    const [post, setPost] = useState<Post>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        getPost(Number(id)).then(setPost, (e) => setError(errorMessage(e)))
    }, [id, getPost])

    return (
        <Screen>
            <ScreenHeader title="Detail" back />
            {post ? (
                <ScrollView contentContainerClassName="gap-4 px-5 pb-10">
                    <Text className="font-display text-[30px] leading-9 text-ink">
                        {post.title}
                    </Text>
                    <View className="flex-row gap-4">
                        <Text className="font-body-medium text-[13px] text-ok">
                            {post.likes} suka
                        </Text>
                        <Text className="font-body-medium text-[13px] text-ink-faint">
                            {post.views} dilihat
                        </Text>
                    </View>
                    <Text className="font-body text-[17px] leading-7 text-ink-soft">
                        {post.body}
                    </Text>
                </ScrollView>
            ) : error ? (
                <StateView title="Gagal memuat" message={error} />
            ) : (
                <StateView loading />
            )}
        </Screen>
    )
}
