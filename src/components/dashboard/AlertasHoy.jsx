import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MapPin, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import styles from './AlertasHoy.module.css'

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  }),
}

function formatMoney(value) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value)
}

export default function AlertasHoy({ alertas = [], loading }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <AlertCircle size={18} color="var(--amber-500)" />
          <h2 className={styles.title}>Cobros para hoy</h2>
        </div>
        <span className={styles.badge}>{alertas.length}</span>
      </div>

      {loading && (
        <div className={styles.skeletonList}>
          {[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      )}

      {!loading && alertas.length === 0 && (
        <p className={styles.empty}>Sin cobros programados para hoy.</p>
      )}

      <AnimatePresence>
        <ul className={styles.list}>
          {alertas.map((alerta, i) => (
            <motion.li
              key={alerta.cuotaId}
              className={`${styles.item} ${alerta.estado === 'VENCIDO' ? styles.vencido : ''}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <div className={styles.itemLeft}>
                <p className={styles.clienteNombre}>{alerta.clienteNombre}</p>
                <p className={styles.cuotaInfo}>
                  Cuota {alerta.numeroCuota} · Vence {format(new Date(alerta.fechaVencimiento + 'T00:00:00'), 'dd MMM', { locale: es })}
                </p>
                <div className={styles.contactRow}>
                  {alerta.clienteTelefono && (
                    <span className={styles.contact}>
                      <Phone size={11} /> {alerta.clienteTelefono}
                    </span>
                  )}
                  {alerta.clienteDireccion && (
                    <span className={styles.contact}>
                      <MapPin size={11} /> {alerta.clienteDireccion}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.itemRight}>
                <p className={styles.monto}>{formatMoney(alerta.saldoPendiente)}</p>
                <span className={`${styles.estadoBadge} ${styles[alerta.estado.toLowerCase()]}`}>
                  {alerta.estado}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  )
}
