export const formatSoles = (amount) =>
  `S/ ${Number(amount ?? 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`

export const formatFecha = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const formatPorcentaje = (value) =>
  `${Number(value ?? 0).toFixed(1)}%`

export const formatEstado = (estado) => {
  const MAP = {
    ACTIVO:    'Activo',
    PAGADO:    'Pagado',
    EN_MORA:   'En Mora',
    CANCELADO: 'Cancelado',
    PENDIENTE: 'Pendiente',
    VENCIDO:   'Vencido',
    ADMIN:     'Administrador',
    COBRADOR:  'Cobrador',
  }
  return MAP[estado] ?? estado
}