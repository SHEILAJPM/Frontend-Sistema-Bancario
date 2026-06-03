import api from './axiosConfig'

export const getMetricas       = ()  => api.get('/dashboard/metricas')
export const getAlertasHoy     = ()  => api.get('/dashboard/alertas/hoy')
export const getAlertasSemana  = ()  => api.get('/dashboard/alertas/proxima-semana')
export const getAlertasProximas = () => api.get('/dashboard/alertas/proxima-semana')
export const contarAlertasHoy  = ()  => api.get('/dashboard/alertas/count')
export const evictCache        = ()  => api.post('/dashboard/cache/evict')
export const getFlujoCaja      = ()  => api.get('/dashboard/flujo-caja')
