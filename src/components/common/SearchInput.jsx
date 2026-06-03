import { Search } from 'lucide-react'
import styles from './SearchInput.module.css'

export default function SearchInput({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className={styles.wrapper}>
      <Search size={16} className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  )
}