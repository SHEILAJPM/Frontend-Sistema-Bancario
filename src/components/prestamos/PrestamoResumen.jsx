import InfoRow from '../common/InfoRow'
import StatusBadge from '../common/StatusBadge'
import ProgressBar from '../common/ProgressBar'
import { formatSoles, formatFecha } from '../../utils/format'

export default function PrestamoResumen({ prestamo }) {
  if (!prestamo) return null
  const avance = prestamo.numeroCuotas > 0
    ? (prestamo.cuotasPagadas / prestamo.numeroCuotas) * 100
    : 0
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <StatusBadge estado={prestamo.estado} />
      </div>
      <InfoRow label="Capital"        value={formatSoles(prestamo.capital)} accent />
      <InfoRow label="Interés proy."  value={formatSoles(prestamo.interesProyectado)} />
      <InfoRow label="Total"          value={formatSoles(prestamo.montoTotal)} accent />
      <InfoRow label="Cuotas"         value={`${prestamo.numeroCuotas} × ${prestamo.frecuencia}`} />
      <InfoRow label="Inicio"         value={formatFecha(prestamo.fechaInicio)} />
      <div style={{ marginTop: '1rem' }}>
        <ProgressBar value={prestamo.cuotasPagadas} max={prestamo.numeroCuotas} label={`Cuotas pagadas: ${prestamo.cuotasPagadas}/${prestamo.numeroCuotas}`} />
      </div>
    </div>
  )
}