import { AxiosInstance } from 'axios'
import { toApiError } from '../api-error'

export function attachErrorNormalizer(client: AxiosInstance) {
    client.interceptors.response.use(undefined, (error) =>
        Promise.reject(toApiError(error))
    )
}
