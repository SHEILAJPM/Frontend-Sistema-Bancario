import api from './axiosConfig'

export const login = (credentials) => api.post('/auth/login', credentials)
