import { useState, useEffect } from 'react'
import { getMetricas, getAlertasHoy, getAlertasSemana } from '../api/dashboardApi'

export function useDashboard() {
  const [metricas, setMetricas]       = useState(null)
  const [alertasHoy, setAlertasHoy]   = useState([])
  const [alertasSemana, setAlertasSemana] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    const cargar = async () => {
      try {
        const [m, h, s] = await Promise.all([
          getMetricas(), getAlertasHoy(), getAlertasSemana()
        ])
        setMetricas(m.data)
        setAlertasHoy(h.data)
        setAlertasSemana(s.data)
      } catch {
        setError('Error al cargar el dashboard')
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  return { metricas, alertasHoy, alertasSemana, loading, error }
}