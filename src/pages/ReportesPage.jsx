import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import ActionButton from '../components/common/ActionButton'
import SectionCard from '../components/common/SectionCard'
import StatRow from '../components/common/StatRow'
import { formatSoles, formatFecha } from '../utils/format'
import styles from './ReportesPage.module.css'

export default function ReportesPage() {
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [resumen, setResumen] = useState(null)
  const [loading, setLoading] = useState(false)

  const buscar = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await import('../api/reporteApi').then(m => m.resumenPeriodo(desde, hasta))
      setResumen(data)
    } catch {
      setResumen(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <PageHeader title="Reportes" subtitle="Genera resúmenes por período" />
      <SectionCard title="Filtros de período">
        <form onSubmit={buscar} className={styles.filtros}>
          <div className={styles.fechas}>
            <div>
              <label className={styles.label}>Desde</label>
              <input type="date" className="input" value={desde} onChange={e => setDesde(e.target.value)} required />
            </div>
            <div>
              <label className={styles.label}>Hasta</label>
              <input type="date" className="input" value={hasta} onChange={e => setHasta(e.target.value)} required />
            </div>
          </div>
          <ActionButton type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Generar reporte'}
          </ActionButton>
        </form>
      </SectionCard>
      {resumen && (
        <SectionCard title="Resultados del período">
          <StatRow label="Período"         value={`${formatFecha(resumen.desde)} — ${formatFecha(resumen.hasta)}`} />
          <StatRow label="Pagos cobrados"  value={resumen.pagosTotales} />
          <StatRow label="Monto cobrado"   value={formatSoles(resumen.montoCobrado)} color="#15803d" />
          <StatRow label="Préstamos nuevos" value={resumen.prestamosNuevos} />
          <StatRow label="Capital desembolsado" value={formatSoles(resumen.capitalDesembolsado)} color="#0369a1" />
        </SectionCard>
      )}
    </div>
  )
}