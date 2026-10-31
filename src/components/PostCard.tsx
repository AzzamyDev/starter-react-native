import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { Glass } from '@/components/Glass'
import { ChevronIcon } from '@/components/icons'
import { Post } from '@/types/post'
import { haptics } from '@/utils/haptics'

export function PostCard({ post }: { post: Post }) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={() => {
                haptics.tap()
                router.push(`/post/${post.id}`)
            }}
            className="active:opacity-80">
            <Glass className="gap-2 p-4">
                <View className="flex-row items-start gap-3">
                    <Text
                        numberOfLines={2}
                        className="flex-1 font-body-semibold text-[17px] leading-6 text-ink">
                        {post.title}
                    </Text>
                    <ChevronIcon />
                </View>
                <Text
                    numberOfLines={2}
                    className="font-body text-[14px] leading-5 text-ink-muted">
                    {post.body}
                </Text>
                <View className="flex-row flex-wrap gap-2 pt-1">
                    {post.tags.slice(0, 3).map((tag) => (
                        <Text
                            key={tag}
                            className="rounded-full bg-ember-500/15 px-2.5 py-1 font-body-medium text-[12px] text-ember-300">
                            #{tag}
                        </Text>
                    ))}
                </View>
            </Glass>
        </Pressable>
    )
}
