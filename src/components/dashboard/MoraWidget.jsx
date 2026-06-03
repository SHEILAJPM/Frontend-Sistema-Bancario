import { AlertTriangle } from 'lucide-react'
import { formatSoles } from '../../utils/format'
import styles from './MoraWidget.module.css'

export default function MoraWidget({ enMora = 0, montoMora = 0 }) {
  return (
    <div className={styles.widget}>
      <AlertTriangle size={20} className={styles.icon} />
      <div>
        <p className={styles.count}>{enMora} préstamos en mora</p>
        <p className={styles.monto}>{formatSoles(montoMora)} pendiente</p>
      </div>
    </div>
  )
}