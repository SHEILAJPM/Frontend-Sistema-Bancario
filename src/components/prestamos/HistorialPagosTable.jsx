import { formatSoles, formatFecha } from '../../utils/format'
import EmptyState from '../common/EmptyState'
import styles from './HistorialPagosTable.module.css'

export default function HistorialPagosTable({ pagos = [] }) {
  if (!pagos.length) return <EmptyState title="Sin pagos registrados" />
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cuota</th><th>Monto</th><th>Fecha</th><th>Cobrador</th><th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map(p => (
            <tr key={p.id} className={styles.row}>
              <td>#{p.numeroCuota}</td>
              <td className={styles.monto}>{formatSoles(p.montoRecibido)}</td>
              <td>{formatFecha(p.timestampPago)}</td>
              <td>{p.registradoPor ?? '—'}</td>
              <td className={styles.obs}>{p.observacion ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}