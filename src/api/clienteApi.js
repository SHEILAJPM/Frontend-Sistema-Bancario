import api from './axiosConfig'

export const listarClientes  = (q, page = 0, size = 20) => api.get('/clientes', { params: { q, page, size, sort: 'apellido' } })
export const getClientes     = ({ q, page = 0, size = 20 } = {}) => api.get('/clientes', { params: { q, page, size, sort: 'apellido' } })
export const getCliente      = (id)          => api.get(`/clientes/${id}`)
export const crearCliente    = (data)        => api.post('/clientes', data)
export const editarCliente   = (id, data)    => api.put(`/clientes/${id}`, data)
export const eliminarCliente = (id)          => api.delete(`/clientes/${id}`)
export const contarClientes  = ()            => api.get('/clientes/count')
