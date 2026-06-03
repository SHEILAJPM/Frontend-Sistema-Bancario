import styles from './InfoRow.module.css'

export default function InfoRow({ label, value, accent }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${accent ? styles.accent : ''}`}>{value ?? '—'}</span>
    </div>
  )
}