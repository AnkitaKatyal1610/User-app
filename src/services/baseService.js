import axios from 'axios';

let baseUrl = 'http://192.168.200.133:4001'
export const baseService = axios.create({
    baseURL: baseUrl
})