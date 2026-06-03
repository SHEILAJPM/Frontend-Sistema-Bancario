import api from './axiosConfig'

export const listarPrestamos       = (page = 0, clienteId, estado) =>
  api.get('/prestamos', { params: { page, size: 20, ...(clienteId && { clienteId }), ...(estado && { estado }) } })
export const getPrestamos          = ({ page = 0, size = 20, clienteId, estado } = {}) =>
  api.get('/prestamos', { params: { page, size, ...(clienteId && { clienteId }), ...(estado && { estado }) } })
export const getPrestamo           = (id)        => api.get(`/prestamos/${id}`)
export const getPrestamosByCliente = (clienteId, page = 0) =>
  api.get(`/prestamos/cliente/${clienteId}`, { params: { page, size: 20 } })
export const crearPrestamo         = (data)      => api.post('/prestamos', data)
export const registrarPago         = (data)      => api.post('/prestamos/pagar', data)
export const historialPagos        = (prestamoId) => api.get(`/pagos/prestamo/${prestamoId}`)
