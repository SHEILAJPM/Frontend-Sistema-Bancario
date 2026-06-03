import styles from './ChipGroup.module.css'

export default function ChipGroup({ options = [], value, onChange }) {
  return (
    <div className={styles.group}>
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          className={`${styles.chip} ${value === o.value ? styles.active : ''}`}
          onClick={() => onChange(o.value === value ? '' : o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}