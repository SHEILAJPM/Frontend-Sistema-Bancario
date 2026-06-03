import Badge from './Badge'

const ESTADO_MAP = {
  ACTIVO:    { label: 'Activo',    variant: 'success' },
  PAGADO:    { label: 'Pagado',    variant: 'info'    },
  EN_MORA:   { label: 'En Mora',   variant: 'danger'  },
  CANCELADO: { label: 'Cancelado', variant: 'default' },
  PENDIENTE: { label: 'Pendiente', variant: 'warning' },
  VENCIDO:   { label: 'Vencido',   variant: 'danger'  },
}

export default function StatusBadge({ estado }) {
  const config = ESTADO_MAP[estado] ?? { label: estado, variant: 'default' }
  return <Badge label={config.label} variant={config.variant} />
}