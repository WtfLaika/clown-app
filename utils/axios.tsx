import axios from 'axios'

const apiUrl = process.env.EXPO_PUBLIC_API_URL
const apiVersion = `v${process.env.EXPO_PUBLIC_API_VERSION}`
const baseUrl = `${apiUrl}${apiVersion}`

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})
