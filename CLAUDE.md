@AGENTS.md

## Catatan untuk Claude Code

- Balas dalam bahasa Indonesia; identifier dan istilah teknis tetap bahasa Inggris.
- Sebelum menyatakan selesai, jalankan `pnpm typecheck && pnpm lint && pnpm test && pnpm format` dan laporkan hasil sebenarnya.
- Setelah mengubah rute di `src/app/`, tipe rute (`.expo/types`) dibuat ulang oleh `expo start`; sebelum itu `router.push` bisa gagal typecheck. Jangan menyiasatinya dengan `as any`.
- Untuk menambah layar atau komponen, tiru pola di fitur `posts`; jangan membuat arsitektur alternatif.
- Jangan menyentuh `ios/`, `android/`, `.env.local`, atau `pnpm-lock.yaml` secara manual.
