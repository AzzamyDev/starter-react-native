# Expo Starter Kit

Starter kit React Native: Expo SDK 58, Expo Router, NativeWind v4, Zustand, Axios (multi-client + refresh token), Zod + React Hook Form, bottom sheet, dan toast. Tema "Senja Tenang" (gelap, aksen jingga).

Sudah termasuk contoh jalan: login → daftar post (paginasi, tarik untuk refresh) → detail → tulis post lewat bottom sheet → keluar. Backend demo: [dummyjson.com](https://dummyjson.com) (`emilys` / `emilyspass`).

## Mulai

```bash
pnpm install
cp .env.example .env.local
pnpm ios:sim        # atau: pnpm android
pnpm start          # Metro untuk dev client
```

Butuh Xcode (iOS) atau Android Studio. Memakai dev client, bukan Expo Go.

## Skrip

| Perintah | Fungsi |
| --- | --- |
| `pnpm typecheck` / `lint` / `test` / `format` | Gerbang kualitas sebelum merge |
| `pnpm format:fix` | Rapikan dengan Prettier |
| `pnpm build:dev` / `build:preview` / `build:prod` | Build EAS lokal Android (tambah `:ios` untuk iOS) |

## Struktur

Lihat [AGENTS.md](AGENTS.md) untuk peta folder, aturan arsitektur, dan langkah menambah fitur.

## Jadikan proyek sendiri

1. Ubah `name`, `slug`, `scheme`, `bundleIdentifier`, `package` di `app.config.js`.
2. Ganti ikon dan splash di `src/assets/images/`.
3. Set `EXPO_PUBLIC_API_BASE_URL`, lalu sesuaikan DTO/mapper di `src/response/` dan `src/services/api/`.
