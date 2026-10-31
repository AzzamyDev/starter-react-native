import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { ReactNode, RefObject, useCallback } from 'react'
import { Text, View } from 'react-native'

type Props = {
    sheetRef: RefObject<BottomSheetModal | null>
    title: string
    action?: ReactNode
    children: ReactNode
    snapPoints?: string[]
}

// Bottom sheet bergaya Senja Tenang dengan judul, aksi di kanan, dan isi yang bisa digulir
export function AppSheet({
    sheetRef,
    title,
    action,
    children,
    snapPoints = ['70%']
}: Props) {
    const backdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={0.55}
            />
        ),
        []
    )
    return (
        <BottomSheetModal
            ref={sheetRef}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            backdropComponent={backdrop}
            backgroundStyle={{ backgroundColor: '#15163a' }}
            handleIndicatorStyle={{ backgroundColor: '#8785b3', width: 40 }}>
            <View className="flex-row items-center justify-between px-5 pb-3 pt-1">
                <Text className="font-display text-[24px] text-ink">
                    {title}
                </Text>
                {action}
            </View>
            <BottomSheetScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 40,
                    gap: 12
                }}>
                {children}
            </BottomSheetScrollView>
        </BottomSheetModal>
    )
}
