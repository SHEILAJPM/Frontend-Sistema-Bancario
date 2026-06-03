import styles from './NumberInput.module.css'

export default function NumberInput({ value, onChange, min, max, step = '0.01', prefix, placeholder }) {
  return (
    <div className={styles.wrapper}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className={`${styles.input} ${prefix ? styles.withPrefix : ''}`}
      />
    </div>
  )
}