import axios, { AxiosAdapter, AxiosError } from 'axios'
import { toApiError } from '../api-error'
import { configureSession } from '../session'
import { attachAuth } from './auth.interceptor'
import { attachErrorNormalizer } from './error.interceptor'

function clientWith(adapter: AxiosAdapter) {
    const client = axios.create({ baseURL: 'http://test', adapter })
    attachAuth(client)
    attachErrorNormalizer(client)
    return client
}

const ok = (config: Parameters<AxiosAdapter>[0]) =>
    Promise.resolve({
        data: { auth: config.headers.Authorization },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
    })

const fail = (config: Parameters<AxiosAdapter>[0], status: number) =>
    Promise.reject(
        new AxiosError('fail', 'ERR', config, null, {
            data: { message: `status ${status}` },
            status,
            statusText: '',
            headers: {},
            config
        })
    )

describe('auth interceptor', () => {
    it('sends the access token', async () => {
        configureSession({
            getAccessToken: () => 'tok',
            refresh: async () => null
        })
        const res = await clientWith(ok).get('/x')
        expect(res.data.auth).toBe('Bearer tok')
    })

    it('refreshes once on 401 and retries with the new token', async () => {
        let token = 'old'
        const refresh = jest.fn(async () => {
            token = 'new'
            return token
        })
        configureSession({ getAccessToken: () => token, refresh })
        const adapter: AxiosAdapter = (config) =>
            config.headers.Authorization === 'Bearer old'
                ? fail(config, 401)
                : ok(config)

        const client = clientWith(adapter)
        const [a, b] = await Promise.all([client.get('/a'), client.get('/b')])

        expect(a.data.auth).toBe('Bearer new')
        expect(b.data.auth).toBe('Bearer new')
        expect(refresh).toHaveBeenCalledTimes(1)
    })

    it('rejects with a normalized error when refresh fails', async () => {
        configureSession({
            getAccessToken: () => 'old',
            refresh: async () => null
        })
        await expect(
            clientWith((c) => fail(c, 401)).get('/x')
        ).rejects.toMatchObject({ name: 'ApiError', status: 401 })
    })
})

describe('toApiError', () => {
    it('flags a missing response as a network error', () => {
        const error = toApiError(new AxiosError('boom'))
        expect(error.kind).toBe('network')
    })

    it('reads the server message', async () => {
        await expect(
            clientWith((c) => fail(c, 400)).get('/x')
        ).rejects.toMatchObject({ message: 'status 400', kind: 'http' })
    })
})
