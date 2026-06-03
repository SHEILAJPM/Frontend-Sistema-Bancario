import styles from './FilterSelect.module.css'

export default function FilterSelect({ value, onChange, options = [], placeholder = 'Todos' }) {
  return (
    <select className={styles.select} value={value} onChange={e => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}