import styles from './RadioGroup.module.css'

export default function RadioGroup({ options = [], value, onChange, name }) {
  return (
    <div className={styles.group}>
      {options.map(o => (
        <label key={o.value} className={styles.option}>
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className={styles.input}
          />
          <span className={styles.label}>{o.label}</span>
        </label>
      ))}
    </div>
  )
}