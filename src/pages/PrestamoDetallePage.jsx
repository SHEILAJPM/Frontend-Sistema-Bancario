import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, FileDown } from 'lucide-react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getPrestamo, registrarPago } from '../api/prestamoApi'
import { exportarCronogramaPDF } from '../utils/exportPDF'
import styles from './PrestamoDetallePage.module.css'

function formatMoney(v) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(v ?? 0)
}

const ESTADO_ICONS = {
  PENDIENTE: <Clock size={14} color="var(--sky-600)" />,
  PAGADO:    <CheckCircle2 size={14} color="var(--green-500)" />,
  VENCIDO:   <AlertTriangle size={14} color="var(--red-500)" />,
}

export default function PrestamoDetallePage() {
  const { id } = useParams()
  const [prestamo, setPrestamo] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [pagando, setPagando]   = useState(null) // cuotaId en proceso de pago
  const [montos, setMontos]     = useState({})

  const cargar = () => {
    setLoading(true)
    getPrestamo(id)
      .then(r => setPrestamo(r.data))
      .catch(() => toast.error('Error al cargar préstamo'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargar() }, [id])

  const handlePagar = async (cuota) => {
    const monto = montos[cuota.id]
    if (!monto || +monto <= 0) { toast.error('Ingresa un monto válido'); return }
    setPagando(cuota.id)
    try {
      await registrarPago({ cuotaId: cuota.id, montoRecibido: +monto })
      toast.success(`Pago de ${formatMoney(monto)} registrado`)
      setMontos(p => ({ ...p, [cuota.id]: '' }))
      cargar()
    } catch (err) {
      toast.error(err.response?.data?.detail ?? 'Error al registrar pago')
    } finally {
      setPagando(null)
    }
  }

  if (loading) return <div className={styles.loadingPage}>Cargando...</div>
  if (!prestamo) return null

  const progreso = prestamo.cuotas.filter(c => c.estado === 'PAGADO').length
  const pct = Math.round((progreso / prestamo.numeroCuotas) * 100)

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/prestamos" className={styles.backLink}>
          <ArrowLeft size={16} /> Volver a préstamos
        </Link>
        <motion.button
          className={styles.btnExport}
          onClick={() => exportarCronogramaPDF(prestamo)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FileDown size={15} /> Exportar PDF
        </motion.button>
      </div>

      {/* Encabezado del préstamo */}
      <motion.div
        className={styles.summaryCard}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className={styles.summaryTop}>
          <div>
            <h1 className={styles.clienteNombre}>{prestamo.clienteNombre}</h1>
            <p className={styles.prestamoId}>Préstamo #{prestamo.id}</p>
          </div>
          <span className={`${styles.estadoPrestamo} ${styles[prestamo.estado.toLowerCase().replace('_','')]}`}>
            {prestamo.estado.replace('_',' ')}
          </span>
        </div>

        <div className={styles.summaryGrid}>
          <div><p className={styles.metaLabel}>Capital</p><p className={styles.metaValue}>{formatMoney(prestamo.capital)}</p></div>
          <div><p className={styles.metaLabel}>Total a cobrar</p><p className={styles.metaValue}>{formatMoney(prestamo.montoTotal)}</p></div>
          <div><p className={styles.metaLabel}>Tasa interés</p><p className={styles.metaValue}>{(prestamo.tasaInteres * 100).toFixed(1)}%</p></div>
          <div><p className={styles.metaLabel}>Frecuencia</p><p className={styles.metaValue}>{prestamo.frecuencia}</p></div>
          <div><p className={styles.metaLabel}>Fecha inicio</p><p className={styles.metaValue}>{format(new Date(prestamo.fechaInicio + 'T00:00:00'), 'dd MMM yyyy', { locale: es })}</p></div>
          <div><p className={styles.metaLabel}>Cuotas</p><p className={styles.metaValue}>{progreso}/{prestamo.numeroCuotas} pagadas</p></div>
        </div>

        {/* Barra de progreso */}
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressBar}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className={styles.progressLabel}>{pct}% completado</p>
      </motion.div>

      {/* Cronograma de cuotas */}
      <h2 className={styles.cronTitle}>Cronograma de cuotas</h2>
      <div className={styles.cuotasList}>
        {prestamo.cuotas.map((c, i) => (
          <motion.div
            key={c.id}
            className={`${styles.cuotaCard} ${styles[c.estado.toLowerCase()]}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <div className={styles.cuotaLeft}>
              <span className={styles.cuotaNum}>#{c.numeroCuota}</span>
              <div>
                <p className={styles.cuotaFecha}>
                  {ESTADO_ICONS[c.estado]} {format(new Date(c.fechaVencimiento + 'T00:00:00'), 'dd MMM yyyy', { locale: es })}
                </p>
                <p className={styles.cuotaMontos}>
                  {formatMoney(c.montoCuota)}
                  {c.montoPagado > 0 && ` · Pagado: ${formatMoney(c.montoPagado)}`}
                  {c.saldoPendiente > 0 && ` · Saldo: ${formatMoney(c.saldoPendiente)}`}
                </p>
              </div>
            </div>

            {c.estado !== 'PAGADO' && (
              <div className={styles.pagoInline}>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder={formatMoney(c.saldoPendiente)}
                  value={montos[c.id] ?? ''}
                  onChange={e => setMontos(p => ({ ...p, [c.id]: e.target.value }))}
                  className={styles.montoInput}
                />
                <motion.button
                  className={styles.btnPagar}
                  onClick={() => handlePagar(c)}
                  disabled={pagando === c.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {pagando === c.id ? <span className="spinner" style={{ width: 14, height: 14 }} /> : 'Cobrar'}
                </motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
