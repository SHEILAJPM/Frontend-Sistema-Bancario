import { useAuth } from '../../context/AuthContext'
import { LogOut, User } from 'lucide-react'
import styles from './TopBar.module.css'

export default function TopBar() {
  const { user, logout } = useAuth()
  return (
    <header className={styles.bar}>
      <div className={styles.user}>
        <User size={16} />
        <span>{user?.username}</span>
        <span className={styles.rol}>{user?.rol}</span>
      </div>
      <button className={styles.logout} onClick={logout} title="Cerrar sesión">
        <LogOut size={16} />
      </button>
    </header>
  )
}