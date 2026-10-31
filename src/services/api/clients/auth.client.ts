import axios from 'axios'
import { env } from '@/utils/env'
import { attachErrorNormalizer } from '../interceptors/error.interceptor'

// Domain autentikasi: tanpa header token dan tanpa refresh otomatis
// (dipakai login & refresh, jadi tidak boleh memicu dirinya sendiri)
export const authClient = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 15_000
})

attachErrorNormalizer(authClient)
