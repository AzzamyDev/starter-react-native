import Svg, { Path } from 'react-native-svg'

type IconProps = { size?: number; color?: string }

type StrokeProps = IconProps & { d: string; width?: number; join?: boolean }

// Dasar semua ikon garis 24×24; tambah ikon baru cukup dengan satu path
function Stroke({
    size = 22,
    color = '#ece9ff',
    d,
    width = 2.2,
    join
}: StrokeProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d={d}
                stroke={color}
                strokeWidth={width}
                strokeLinecap="round"
                strokeLinejoin={join ? 'round' : undefined}
            />
        </Svg>
    )
}

export const BackIcon = (p: IconProps) => (
    <Stroke {...p} d="M15 5l-7 7 7 7" join />
)
export const ChevronIcon = (p: IconProps) => (
    <Stroke size={18} color="#8785b3" {...p} d="M9 5l7 7-7 7" join />
)
export const PlusIcon = (p: IconProps) => (
    <Stroke size={20} color="#0b0c1e" width={2.4} {...p} d="M12 5v14M5 12h14" />
)
export const CheckIcon = (p: IconProps) => (
    <Stroke size={18} color="#7fe3c4" {...p} d="M5 12.5l4.5 4.5L19 7.5" join />
)
export const CloseIcon = (p: IconProps) => (
    <Stroke
        size={16}
        color="#a09ec8"
        width={2}
        {...p}
        d="M6 6l12 12M18 6L6 18"
    />
)
export const SearchIcon = (p: IconProps) => (
    <Stroke
        size={18}
        color="#8785b3"
        width={2}
        {...p}
        d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4"
    />
)
export const LogoutIcon = (p: IconProps) => (
    <Stroke
        {...p}
        width={2}
        d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4M15 8l4 4-4 4M19 12H9"
        join
    />
)

export function MoreIcon({ size = 22, color = '#ece9ff' }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <Path d="M6 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </Svg>
    )
}
