

import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { AxiosRequestParams } from '~~/modules/_types'
import { getErrorMessage } from '~~/utils/utils'

const baseURL = '/api/'
const apiClient: AxiosInstance = axios.create({ baseURL })



const buildTheRequest = async ({method, url, payload, token}: AxiosRequestParams) => {
    if (method !== 'post' && method !== 'get') { throw new Error('Metodo API non consentito!') }
    if (!url) { throw new Error('API URL non trovato!') }

    const config: [string, any?, { headers: { authorization: string } }?] = [url];

    const tokenIndex = payload ? 2 : 1
    if (payload) {  config[1] = payload  }
    if (token) {  config[tokenIndex] = {headers: {authorization: `Bearer ${token}`}} }
    try {
        const response: AxiosResponse<any> = await apiClient[method](...config)
        return response.data
    } catch (error) {
        console.log('❌ buildTheRequest - error', error)
        throw getErrorMessage(error)
    }
}

const api = {
    async getNFT (payload: any) {
        return buildTheRequest({method: 'post', url: '/getNFT', payload})
    }
}

export default api