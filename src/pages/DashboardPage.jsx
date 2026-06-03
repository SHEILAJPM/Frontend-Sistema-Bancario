import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet, TrendingUp, CheckCircle2,
  AlertTriangle, Activity, Calendar, Banknote,
  FileText, CircleCheck, Clock,
} from 'lucide-react'
import MetricCard from '../components/dashboard/MetricCard'
import AlertasHoy from '../components/dashboard/AlertasHoy'
import ChartsSection from '../components/dashboard/ChartsSection'
import { getMetricas, getAlertasHoy, getFlujoCaja } from '../api/dashboardApi'
import styles from './DashboardPage.module.css'

function formatMoney(value) {
  if (value == null) return '—'
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value)
}

export default function DashboardPage() {
  const [metricas, setMetricas]         = useState(null)
  const [alertas, setAlertas]           = useState([])
  const [flujoCaja, setFlujoCaja]       = useState([])
  const [loading, setLoading]           = useState(true)
  const [alertLoading, setAlertLoading] = useState(true)
  const [flujoLoading, setFlujoLoading] = useState(true)

  useEffect(() => {
    getMetricas()
      .then(r => setMetricas(r.data))
      .finally(() => setLoading(false))

    getAlertasHoy()
      .then(r => setAlertas(r.data))
      .finally(() => setAlertLoading(false))

    getFlujoCaja()
      .then(r => setFlujoCaja(r.data))
      .catch(() => setFlujoCaja([]))
      .finally(() => setFlujoLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      {/* Encabezado */}
      <motion.div
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Resumen financiero en tiempo real</p>
        </div>
        <div className={styles.dateChip}>
          <Calendar size={14} />
          {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </motion.div>

      {/* Tarjetas de métricas */}
      <div className={styles.metricsGrid}>
        <MetricCard
          title="Capital en la calle"
          value={loading ? '...' : formatMoney(metricas?.capitalEnLaCalle)}
          subtitle={`${metricas?.prestamosActivos ?? 0} préstamos activos`}
          icon={Wallet}
          color="sky"
          delay={0}
        />
        <MetricCard
          title="Intereses pendientes"
          value={loading ? '...' : formatMoney(metricas?.interesesPendientes)}
          subtitle="Por cobrar en cuotas activas"
          icon={TrendingUp}
          color="blue"
          delay={0.08}
        />
        <MetricCard
          title="Intereses líquidos"
          value={loading ? '...' : formatMoney(metricas?.interesesLiquidos)}
          subtitle="Interés ya cobrado en efectivo"
          icon={Banknote}
          color="green"
          delay={0.12}
        />
        <MetricCard
          title="Total recuperado"
          value={loading ? '...' : formatMoney(metricas?.totalRecuperado)}
          subtitle="Flujo de caja acumulado"
          icon={CheckCircle2}
          color="green"
          delay={0.16}
        />
        <MetricCard
          title="Rendimiento global"
          value={loading ? '...' : `${metricas?.rendimientoGlobalPct ?? 0}%`}
          subtitle="Retorno sobre capital"
          icon={Activity}
          color="sky"
          delay={0.24}
        />
        <MetricCard
          title="En mora"
          value={loading ? '...' : String(metricas?.prestamosEnMora ?? 0)}
          subtitle="Préstamos con cuotas vencidas"
          icon={AlertTriangle}
          color="red"
          delay={0.32}
        />
        <MetricCard
          title="Préstamos pagados"
          value={loading ? '...' : String(metricas?.prestamosPagados ?? 0)}
          subtitle="Cancelados completamente"
          icon={CheckCircle2}
          color="green"
          delay={0.4}
        />
      </div>

      {/* Resumen de intereses */}
      <motion.div
        className={styles.interestSection}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 className={styles.interestTitle}>Resumen de intereses</h2>
        <div className={styles.interestGrid}>
          <div className={`${styles.interestCard} ${styles.interestBlue}`}>
            <div className={styles.interestIcon}><FileText size={20} /></div>
            <div>
              <p className={styles.interestLabel}>Interés proyectado total</p>
              <p className={styles.interestValue}>{loading ? '...' : formatMoney(metricas?.interesProyectadoTotal)}</p>
            </div>
          </div>
          <div className={`${styles.interestCard} ${styles.interestGreen}`}>
            <div className={styles.interestIcon}><CircleCheck size={20} /></div>
            <div>
              <p className={styles.interestLabel}>Interés líquido cobrado</p>
              <p className={styles.interestValue}>{loading ? '...' : formatMoney(metricas?.interesesLiquidos)}</p>
            </div>
          </div>
          <div className={`${styles.interestCard} ${styles.interestAmber}`}>
            <div className={styles.interestIcon}><Clock size={20} /></div>
            <div>
              <p className={styles.interestLabel}>Interés por cobrar</p>
              <p className={styles.interestValue}>
                {loading ? '...' : formatMoney(
                  (metricas?.interesProyectadoTotal ?? 0) - (metricas?.interesesLiquidos ?? 0)
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gráficos */}
      <ChartsSection
        metricas={metricas}
        flujoCaja={flujoCaja}
        flujoCajaLoading={flujoLoading}
      />

      {/* Sección inferior */}
      <div className={styles.bottomGrid}>
        <AlertasHoy alertas={alertas} loading={alertLoading} />

        {/* Mini-resumen de cuotas próximas */}
        <motion.div
          className={styles.summaryCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <h2 className={styles.summaryTitle}>Próximos 7 días</h2>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Cobros pendientes</span>
            <span className={styles.summaryValue}>{metricas?.cuotasProximas7Dias ?? '—'}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Cobros hoy</span>
            <span className={`${styles.summaryValue} ${styles.urgent}`}>
              {metricas?.cuotasVencenHoy ?? '—'}
            </span>
          </div>
          <div className={styles.divider} />
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Total préstamos</span>
            <span className={styles.summaryValue}>
              {(metricas?.prestamosActivos ?? 0) + (metricas?.prestamosEnMora ?? 0) + (metricas?.prestamosPagados ?? 0)}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
