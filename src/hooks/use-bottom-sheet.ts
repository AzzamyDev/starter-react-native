import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useRef } from 'react'

// Ref + buka/tutup untuk AppSheet; state utama tetap di store atau layar induk
export function useBottomSheet() {
    const ref = useRef<BottomSheetModal>(null)
    const open = useCallback(() => ref.current?.present(), [])
    const close = useCallback(() => ref.current?.dismiss(), [])
    return { ref, open, close }
}
