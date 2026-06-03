export const getErrorMsg = (err) => {
  if (!err) return null
  if (err.response?.data?.detail)  return err.response.data.detail
  if (err.response?.data?.message) return err.response.data.message
  if (err.response?.status === 401) return 'Sesión expirada. Por favor inicia sesión nuevamente.'
  if (err.response?.status === 403) return 'No tienes permisos para realizar esta acción.'
  if (err.response?.status === 404) return 'El recurso solicitado no fue encontrado.'
  if (err.response?.status >= 500)  return 'Error del servidor. Intenta de nuevo más tarde.'
  return err.message ?? 'Ocurrió un error inesperado.'
}