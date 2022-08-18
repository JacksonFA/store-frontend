import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://app:3000/api'
})