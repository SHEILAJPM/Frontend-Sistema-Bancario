import FilterSelect from '../common/FilterSelect'
import { ESTADOS_PRESTAMO } from '../../utils/constants'
import styles from './PrestamosFilter.module.css'

export default function PrestamosFilter({ estado, onEstadoChange }) {
  return (
    <div className={styles.bar}>
      <FilterSelect
        value={estado}
        onChange={onEstadoChange}
        options={ESTADOS_PRESTAMO}
        placeholder="Todos los estados"
      />
    </div>
  )
}