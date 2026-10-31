import axios from 'axios'
import { env } from '@/utils/env'
import { attachAuth } from '../interceptors/auth.interceptor'
import { attachErrorNormalizer } from '../interceptors/error.interceptor'

// Domain utama: token otomatis + refresh saat 401.
// API domain lain (mis. payments) → buat client baru di folder ini.
export const appClient = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 15_000
})

attachAuth(appClient)
attachErrorNormalizer(appClient)
