import InfoRow from '../common/InfoRow'
import { formatFecha } from '../../utils/format'

export default function ClienteDetalle({ cliente }) {
  if (!cliente) return null
  return (
    <div>
      <InfoRow label="Nombre completo" value={`${cliente.nombre} ${cliente.apellido}`} />
      <InfoRow label="DNI"       value={cliente.dni} />
      <InfoRow label="Teléfono"  value={cliente.telefono} />
      <InfoRow label="Email"     value={cliente.email} />
      <InfoRow label="Dirección" value={cliente.direccion} />
      <InfoRow label="Préstamos" value={cliente.totalPrestamos ?? '—'} />
      <InfoRow label="Registrado" value={formatFecha(cliente.createdAt)} />
    </div>
  )
}