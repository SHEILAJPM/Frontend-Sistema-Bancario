import api from './axiosConfig'

export const listarUsuarios  = ()           => api.get('/usuarios')
export const obtenerUsuario  = (id)         => api.get(`/usuarios/${id}`)
export const crearUsuario    = (data)       => api.post('/usuarios', data)
export const toggleActivo    = (id)         => api.patch(`/usuarios/${id}/toggle-activo`)