import styles from './SelectField.module.css'

export default function SelectField({ value, onChange, options = [], placeholder = 'Seleccionar...', name }) {
  return (
    <select className={styles.select} value={value} onChange={onChange} name={name}>
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}