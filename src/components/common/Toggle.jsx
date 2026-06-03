import styles from './Toggle.module.css'

export default function Toggle({ checked, onChange, label }) {
  return (
    <label className={styles.label}>
      <input type="checkbox" className={styles.input} checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.text}>{label}</span>}
    </label>
  )
}