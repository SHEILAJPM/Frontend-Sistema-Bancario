import styles from './ProgressBar.module.css'

export default function ProgressBar({ value = 0, max = 100, color = '#0ea5e9', height = 8, label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div>
      {label && <div className={styles.label}>{label} <span>{Math.round(pct)}%</span></div>}
      <div className={styles.track} style={{ height }}>
        <div className={styles.fill} style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}