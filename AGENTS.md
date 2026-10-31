# AGENTS.md

Starter kit Expo (SDK 58, React Native 0.88) dengan Expo Router, NativeWind v4, Zustand, Axios, Zod + React Hook Form. Berisi contoh lengkap: login, daftar post (paginasi), detail, form di bottom sheet.

## Perintah

```bash
pnpm install
cp .env.example .env.local
pnpm start          # Metro untuk dev client
pnpm ios:sim        # build + jalankan di simulator (butuh Xcode)
pnpm android
pnpm typecheck && pnpm lint && pnpm test && pnpm format   # gerbang sebelum merge
pnpm format:fix     # rapikan dengan Prettier
```

Build EAS lokal: `pnpm build:{dev,preview,prod}[:ios]` → `scripts/build-helper.js` (hasil di `artifacts/`).

Tidak ada Expo Go: app memakai dev client (`expo-dev-client`). Jangan edit `ios/` atau `android/` kecuali diminta; folder itu dibuat ulang oleh prebuild.

## Struktur `src/`

| Folder                             | Isi                                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `app/`                             | Rute Expo Router. Guard rute lewat `Stack.Protected` di `_layout.tsx`, area dihitung `utils/route-guard.ts` |
| `components/`                      | UI generik (Button, TextField, Screen, Glass, AppSheet, StateView, …)                                       |
| `hooks/`                           | Hook React (mis. `use-bottom-sheet`)                                                                        |
| `services/api/clients/`            | Satu Axios client per domain API (`app.client`, `auth.client`)                                              |
| `services/api/interceptors/`       | Token + refresh 401 (`auth`), normalisasi error (`error`)                                                   |
| `services/api/*.api.ts`            | Fungsi endpoint; mengembalikan model domain, bukan DTO                                                      |
| `stores/<fitur>/`                  | Satu store Zustand per fitur                                                                                |
| `response/dto`, `response/mappers` | Payload mentah API → model domain                                                                           |
| `validation/`                      | Skema Zod per form                                                                                          |
| `types/`                           | Tipe domain                                                                                                 |
| `utils/`                           | Fungsi murni + `env`, `haptics`, `secure-storage`                                                           |

Alias impor: `@/*` → `src/*`.

## Aturan

- UI tidak memanggil Axios langsung: layar → store/handler → `services/api/*.api.ts` → client.
- Tiap endpoint baru: DTO di `response/dto`, mapper di `response/mappers`, tipe domain di `types/`. UI hanya melihat tipe domain.
- Error API selalu `ApiError` (lihat `services/api/api-error.ts`); tampilkan `errorMessage(e)` / `error.message`.
- Domain API baru → client baru di `services/api/clients/` dengan baseURL dan interceptor sendiri.
- Store per fitur, tanpa store global besar. Store tidak memanggil toast; toast dipicu dari handler di layar dengan `useToast()` dari `@azzamydev/react-native-toast`. Jangan pakai `Alert` untuk umpan balik biasa.
- Panel filter, daftar aksi, dan form pendek memakai `AppSheet` (`@gorhom/bottom-sheet`) + `useBottomSheet`, bukan modal buatan sendiri.
- Form: React Hook Form + `zodResolver`; skema di `validation/`.
- Styling: `className` NativeWind dengan token tema `tailwind.config.js` (`dusk`, `ink`, `ember`, `ok`, `warn`, `danger`; font `display`/`body*`). Hindari style inline dan hex baru di komponen.
- Konfigurasi runtime hanya lewat `utils/env.ts` (dari `app.config.js` → `extra`). Jangan hardcode URL atau key. Nilai klien-aman memakai prefiks `EXPO_PUBLIC_`.
- Token disimpan di `expo-secure-store` lewat `utils/secure-storage.ts`.
- Logika bisnis jangan di komponen layar; taruh di store atau util murni.
- Tes `*.spec.ts` berdampingan dengan kodenya (Jest + `jest-expo`). Util, mapper, skema, dan interceptor wajib bertes.
- Prettier: 4 spasi, tanpa titik koma, kutip tunggal. Komentar dan teks UI berbahasa Indonesia.

## Menambah fitur (urutan)

1. `types/<fitur>.ts` dan `response/dto/<fitur>.dto.ts`
2. `response/mappers/<fitur>.mapper.ts` + spec
3. `services/api/<fitur>.api.ts` (pakai client domain yang tepat)
4. `validation/<fitur>.ts` + spec bila ada form
5. `stores/<fitur>/<fitur>.store.ts`
6. Komponen di `components/`, layar di `app/`
7. Jalankan gerbang: typecheck, lint, test, format

Contoh acuan: fitur `posts` (`stores/posts`, `services/api/posts.api.ts`, `app/index.tsx`, `app/post/[id].tsx`).

## Auth

`stores/auth/auth.store.ts` menyimpan user + token, hidrasi dari secure store saat start, dan mendaftarkan `configureSession` supaya interceptor bisa membaca token dan me-refresh saat 401 (satu refresh untuk banyak request). Gagal refresh → logout otomatis → guard mengarahkan ke `login`. Store lain yang menyimpan data per akun harus reset saat logout (lihat `posts.store.ts`).

Demo memakai https://dummyjson.com (`emilys` / `emilyspass`). Ganti `EXPO_PUBLIC_API_BASE_URL` dan sesuaikan DTO/mapper untuk backend sendiri.

## Menjadikan proyek baru dari starter

Ganti di `app.config.js`: `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`; ganti ikon di `src/assets/images/`; sesuaikan nama di `package.json`.
