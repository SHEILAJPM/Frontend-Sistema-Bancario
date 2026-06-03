import { Pencil, Trash2, Eye } from 'lucide-react'
import Tooltip from './Tooltip'
import styles from './TableActions.module.css'

export default function TableActions({ onVer, onEditar, onEliminar }) {
  return (
    <div className={styles.actions}>
      {onVer && (
        <Tooltip text="Ver detalle">
          <button className={styles.btn} onClick={onVer}><Eye size={14} /></button>
        </Tooltip>
      )}
      {onEditar && (
        <Tooltip text="Editar">
          <button className={styles.btn} onClick={onEditar}><Pencil size={14} /></button>
        </Tooltip>
      )}
      {onEliminar && (
        <Tooltip text="Eliminar">
          <button className={`${styles.btn} ${styles.danger}`} onClick={onEliminar}><Trash2 size={14} /></button>
        </Tooltip>
      )}
    </div>
  )
}