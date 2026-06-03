import { useState, useEffect, useCallback } from 'react'
import { listarClientes } from '../api/clienteApi'
import { useDebounce } from './useDebounce'

export function useClientes() {
  const [clientes, setClientes]  = useState([])
  const [loading, setLoading]    = useState(false)
  const [error, setError]        = useState(null)
  const [search, setSearch]      = useState('')
  const [page, setPage]          = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const debouncedSearch = useDebounce(search, 400)

  const cargar = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await listarClientes(debouncedSearch, page)
      setClientes(data.content)
      setTotalPages(data.totalPages)
    } catch {
      setError('Error al cargar clientes')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, page])

  useEffect(() => { cargar() }, [cargar])

  return { clientes, loading, error, search, setSearch, page, setPage, totalPages, recargar: cargar }
}