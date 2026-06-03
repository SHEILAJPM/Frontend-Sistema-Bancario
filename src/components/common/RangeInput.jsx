import styles from './RangeInput.module.css'

export default function RangeInput({ value, onChange, min = 0, max = 100, step = 1, label }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.header}><span>{label}</span><span className={styles.val}>{value}</span></div>}
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={styles.range}
        style={{ background: `linear-gradient(to right, #0ea5e9 ${pct}%, #e5e7eb ${pct}%)` }}
      />
    </div>
  )
}