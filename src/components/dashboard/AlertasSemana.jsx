import { Calendar } from 'lucide-react'
import styles from './AlertasSemana.module.css'

export default function AlertasSemana({ alertas = [] }) {
  if (!alertas.length) return (
    <div className={styles.vacio}>Sin alertas para la próxima semana</div>
  )
  return (
    <div className={styles.lista}>
      {alertas.map(a => (
        <div key={a.cuotaId} className={styles.item}>
          <Calendar size={14} className={styles.icon} />
          <div className={styles.info}>
            <p className={styles.nombre}>{a.clienteNombre}</p>
            <p className={styles.detalle}>Cuota #{a.numeroCuota} — S/ {a.saldoPendiente}</p>
          </div>
          <span className={styles.fecha}>{a.fechaVencimiento}</span>
        </div>
      ))}
    </div>
  )
}