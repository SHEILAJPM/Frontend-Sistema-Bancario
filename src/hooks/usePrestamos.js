import { useState, useEffect, useCallback } from 'react'
import { listarPrestamos } from '../api/prestamoApi'

export function usePrestamos(clienteId = null) {
  const [prestamos, setPrestamos] = useState([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [page, setPage]           = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const cargar = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = clienteId
        ? await listarPrestamos(page, clienteId)
        : await listarPrestamos(page)
      setPrestamos(data.content)
      setTotalPages(data.totalPages)
    } catch {
      setError('Error al cargar préstamos')
    } finally {
      setLoading(false)
    }
  }, [clienteId, page])

  useEffect(() => { cargar() }, [cargar])

  return { prestamos, loading, error, page, setPage, totalPages, recargar: cargar }
}