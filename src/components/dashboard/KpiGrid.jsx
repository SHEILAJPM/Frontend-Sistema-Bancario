import MetricCard from './MetricCard'
import styles from './KpiGrid.module.css'
import { formatSoles, formatPorcentaje } from '../../utils/format'
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

export default function KpiGrid({ metricas }) {
  if (!metricas) return null
  return (
    <div className={styles.grid}>
      <MetricCard
        titulo="Capital en la calle"
        valor={formatSoles(metricas.capitalEnLaCalle)}
        icono={<DollarSign size={20} />}
        color="#0369a1"
      />
      <MetricCard
        titulo="Rendimiento"
        valor={formatPorcentaje(metricas.rendimiento)}
        icono={<TrendingUp size={20} />}
        color="#15803d"
      />
      <MetricCard
        titulo="Préstamos en mora"
        valor={metricas.enMora}
        icono={<AlertTriangle size={20} />}
        color="#b91c1c"
      />
      <MetricCard
        titulo="Préstamos pagados"
        valor={metricas.pagados}
        icono={<CheckCircle size={20} />}
        color="#6b7280"
      />
    </div>
  )
}