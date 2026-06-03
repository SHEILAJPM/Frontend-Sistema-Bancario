import StatusBadge from '../common/StatusBadge'
import styles from './CuotaRow.module.css'

export default function CuotaRow({ cuota }) {
  const saldo = (cuota.montoCuota - cuota.montoPagado).toFixed(2)
  return (
    <tr className={styles.row}>
      <td className={styles.td}>#{cuota.numeroCuota}</td>
      <td className={styles.td}>{cuota.fechaVencimiento}</td>
      <td className={styles.td}>S/ {cuota.montoCuota}</td>
      <td className={styles.td}>S/ {cuota.montoPagado}</td>
      <td className={styles.td}>S/ {saldo}</td>
      <td className={styles.td}><StatusBadge estado={cuota.estado} /></td>
    </tr>
  )
}