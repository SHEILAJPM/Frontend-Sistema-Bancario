import { User, Phone, MapPin } from 'lucide-react'
import styles from './ClienteCard.module.css'

export default function ClienteCard({ cliente, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick?.(cliente)}>
      <div className={styles.avatar}>
        <User size={20} />
      </div>
      <div className={styles.info}>
        <p className={styles.nombre}>{cliente.nombre} {cliente.apellido}</p>
        <p className={styles.dni}>DNI: {cliente.dni}</p>
        {cliente.telefono && (
          <p className={styles.detail}><Phone size={12} /> {cliente.telefono}</p>
        )}
        {cliente.direccion && (
          <p className={styles.detail}><MapPin size={12} /> {cliente.direccion}</p>
        )}
      </div>
      <span className={`${styles.status} ${cliente.activo ? styles.activo : styles.inactivo}`}>
        {cliente.activo ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  )
}