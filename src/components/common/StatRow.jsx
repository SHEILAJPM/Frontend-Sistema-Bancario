import styles from './StatRow.module.css'

export default function StatRow({ label, value, color = '#111827' }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value} style={{ color }}>{value}</span>
    </div>
  )
}