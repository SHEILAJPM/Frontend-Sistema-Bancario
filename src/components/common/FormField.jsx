import styles from './FormField.module.css'

export default function FormField({ label, error, children, required }) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}