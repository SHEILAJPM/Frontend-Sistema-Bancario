import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react'
import { useState } from 'react'
import styles from './AlertBanner.module.css'

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
}

export default function AlertBanner({ type = 'info', message, dismissible = true }) {
  const [visible, setVisible] = useState(true)
  if (!visible || !message) return null
  const Icon = ICONS[type]
  return (
    <div className={`${styles.banner} ${styles[type]}`}>
      <Icon size={16} />
      <span className={styles.msg}>{message}</span>
      {dismissible && (
        <button className={styles.close} onClick={() => setVisible(false)}><X size={14} /></button>
      )}
    </div>
  )
}