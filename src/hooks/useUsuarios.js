import { useState, useEffect } from 'react'
import { listarUsuarios } from '../api/usuarioApi'

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const cargar = async () => {
    setLoading(true)
    try {
      const { data } = await listarUsuarios()
      setUsuarios(data)
    } catch {
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  return { usuarios, loading, error, recargar: cargar }
}