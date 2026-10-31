export type AppArea = 'auth' | 'app'

// Satu sumber kebenaran untuk Stack.Protected di _layout.tsx
export function resolveArea(input: { authenticated: boolean }): AppArea {
    return input.authenticated ? 'app' : 'auth'
}
