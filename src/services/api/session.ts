// Jembatan antara lapisan HTTP dan auth store supaya keduanya tidak saling impor
type SessionHandlers = {
    getAccessToken: () => string | null
    // mengembalikan access token baru, atau null bila sesi tidak bisa diperpanjang
    refresh: () => Promise<string | null>
}

let handlers: SessionHandlers = {
    getAccessToken: () => null,
    refresh: async () => null
}

export function configureSession(next: SessionHandlers) {
    handlers = next
}

export const session = {
    getAccessToken: () => handlers.getAccessToken(),
    refresh: () => handlers.refresh()
}
