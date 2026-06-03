import { AlertCircle } from 'lucide-react'
import styles from './ErrorMessage.module.css'

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null
  return (
    <div className={styles.box}>
      <AlertCircle size={16} className={styles.icon} />
      <span className={styles.text}>{message}</span>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>Reintentar</button>
      )}
    </div>
  )
}