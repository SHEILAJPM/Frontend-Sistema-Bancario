import styles from './Divider.module.css'

export default function Divider({ label }) {
  if (label) {
    return (
      <div className={styles.withLabel}>
        <div className={styles.line} />
        <span className={styles.text}>{label}</span>
        <div className={styles.line} />
      </div>
    )
  }
  return <hr className={styles.hr} />
}