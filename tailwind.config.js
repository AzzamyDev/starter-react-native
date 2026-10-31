/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            // Senja Tenang: ungu-biru pekat saat petang, satu aksen jingga dari ufuk
            colors: {
                dusk: {
                    950: '#0b0c1e',
                    900: '#0e0f24',
                    800: '#15163a',
                    700: '#1d1e4d',
                    600: '#2b2c68'
                },
                ink: {
                    DEFAULT: '#ece9ff',
                    soft: '#c9c6ee',
                    muted: '#a09ec8',
                    faint: '#8785b3'
                },
                ember: {
                    300: '#ffcaa6',
                    400: '#ffb086',
                    500: '#ff9468',
                    600: '#f0744c'
                },
                ok: '#7fe3c4',
                warn: '#ffc46b',
                danger: '#ff7f93'
            },
            fontFamily: {
                display: ['BricolageGrotesque_700Bold'],
                'display-medium': ['BricolageGrotesque_500Medium'],
                body: ['Figtree_400Regular'],
                'body-medium': ['Figtree_500Medium'],
                'body-semibold': ['Figtree_600SemiBold']
            }
        }
    },
    plugins: []
}
