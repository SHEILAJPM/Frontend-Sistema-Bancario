import styles from './DatePicker.module.css'

export default function DatePicker({ value, onChange, name, min, max, label }) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type="date"
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        name={name}
        min={min}
        max={max}
      />
    </div>
  )
}