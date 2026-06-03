import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'
import styles from './ChartsSection.module.css'

const PIE_COLORS = ['#0ea5e9', '#ef4444', '#22c55e']

function formatSoles(v) {
  if (v >= 1000) return `S/${(v / 1000).toFixed(0)}k`
  return `S/${Number(v).toFixed(0)}`
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>
        S/ {Number(payload[0].value).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
      </p>
    </div>
  )
}

export default function ChartsSection({ metricas, flujoCaja, flujoCajaLoading }) {
  const pieData = metricas
    ? [
        { name: 'Activos',  value: Number(metricas.prestamosActivos) },
        { name: 'En mora',  value: Number(metricas.prestamosEnMora)  },
        { name: 'Pagados',  value: Number(metricas.prestamosPagados) },
      ].filter(d => d.value > 0)
    : []

  const barData = flujoCaja.map(d => ({ mes: d.mes, total: Number(d.total) }))

  return (
    <div className={styles.grid}>
      {/* Donut — distribución */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <h3 className={styles.cardTitle}>Distribución de préstamos</h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%" cy="50%"
                innerRadius={58} outerRadius={88}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [v, 'préstamos']} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className={styles.empty}>Sin préstamos registrados aún</div>
        )}
      </motion.div>

      {/* Bar — cobros últimos 6 meses */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62, duration: 0.4 }}
      >
        <h3 className={styles.cardTitle}>Cobros — últimos 6 meses</h3>
        {flujoCajaLoading ? (
          <div className={styles.skeleton} />
        ) : barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 8, right: 4, left: -14, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatSoles} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="total" fill="url(#barGrad)" radius={[5, 5, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className={styles.empty}>Sin pagos registrados aún</div>
        )}
      </motion.div>
    </div>
  )
}