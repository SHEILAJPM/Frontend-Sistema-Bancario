export const extractErrorMessage = (err) => {
  if (err?.response?.data?.detail) return err.response.data.detail
  if (err?.response?.data?.message) return err.response.data.message
  if (err?.message) return err.message
  return 'Error inesperado. Intenta de nuevo.'
}

export const isUnauthorized = (err) => err?.response?.status === 401
export const isForbidden    = (err) => err?.response?.status === 403
export const isNotFound     = (err) => err?.response?.status === 404