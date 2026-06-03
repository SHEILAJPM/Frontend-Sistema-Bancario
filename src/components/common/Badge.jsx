import styles from './Badge.module.css'

const variants = {
  success: styles.success,
  danger:  styles.danger,
  warning: styles.warning,
  info:    styles.info,
  default: styles.default,
}

export default function Badge({ label, variant = 'default' }) {
  return (
    <span className={`${styles.badge} ${variants[variant] ?? styles.default}`}>
      {label}
    </span>
  )
}