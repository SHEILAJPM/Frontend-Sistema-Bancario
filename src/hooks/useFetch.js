import { useState, useEffect, useCallback } from 'react'

export function useFetch(fetchFn, deps = []) {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchFn()
      setData(res.data)
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }, deps)

  useEffect(() => { cargar() }, [cargar])

  return { data, loading, error, recargar: cargar }
}