import CuotaRow from './CuotaRow'
import styles from './CronogramaTable.module.css'

export default function CronogramaTable({ cuotas = [], onPagar }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>N°</th>
            <th className={styles.th}>Vencimiento</th>
            <th className={styles.th}>Cuota</th>
            <th className={styles.th}>Pagado</th>
            <th className={styles.th}>Saldo</th>
            <th className={styles.th}>Estado</th>
            {onPagar && <th className={styles.th}>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {cuotas.map(c => (
            <CuotaRow key={c.id} cuota={c} onPagar={onPagar} />
          ))}
        </tbody>
      </table>
    </div>
  )
}