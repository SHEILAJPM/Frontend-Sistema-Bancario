import StatusBadge from '../common/StatusBadge'
import styles from './PrestamoCard.module.css'

export default function PrestamoCard({ prestamo, onClick }) {
  const avance = prestamo.numeroCuotas > 0
    ? Math.round((prestamo.cuotasPagadas / prestamo.numeroCuotas) * 100)
    : 0

  return (
    <div className={styles.card} onClick={() => onClick?.(prestamo)}>
      <div className={styles.top}>
        <span className={styles.id}>#{prestamo.id}</span>
        <StatusBadge estado={prestamo.estado} />
      </div>
      <p className={styles.cliente}>{prestamo.clienteNombre}</p>
      <p className={styles.capital}>S/ {prestamo.capital}</p>
      <div className={styles.progreso}>
        <div className={styles.barra} style={{ width: `${avance}%` }} />
      </div>
      <p className={styles.cuotas}>{prestamo.cuotasPagadas ?? 0}/{prestamo.numeroCuotas} cuotas</p>
    </div>
  )
}