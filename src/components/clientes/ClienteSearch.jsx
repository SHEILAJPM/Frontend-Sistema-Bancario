import SearchInput from '../common/SearchInput'
import styles from './ClienteSearch.module.css'

export default function ClienteSearch({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder="Buscar por nombre, apellido o DNI..."
      />
    </div>
  )
}