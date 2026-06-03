import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard,
  Users,
  Banknote,
  LogOut,
  Building2,
  UserCog,
  Search,
  X,
} from 'lucide-react'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clientes',  icon: Users,           label: 'Clientes'  },
  { to: '/prestamos', icon: Banknote,        label: 'Préstamos' },
  { to: '/usuarios',  icon: UserCog,         label: 'Usuarios', adminOnly: true },
]

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/* Marca */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <Building2 size={22} color="white" strokeWidth={1.8} />
        </div>
        <div>
          <p className={styles.brandName}>PréstamOS</p>
          <p className={styles.brandSub}>Gestión financiera</p>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar menú">
          <X size={18} />
        </button>
      </div>

      {/* Búsqueda rápida */}
      <button
        className={styles.searchBtn}
        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))}
      >
        <Search size={14} />
        <span>Buscar...</span>
        <kbd>Ctrl K</kbd>
      </button>

      {/* Navegación */}
      <nav className={styles.nav}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className={styles.activeBg}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer del sidebar */}
      <div className={styles.footer}>
        <div className={styles.userChip}>
          <div className={styles.avatar}>
            {user?.username?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <p className={styles.userName}>{user?.username}</p>
            <p className={styles.userRol}>{user?.rol}</p>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} />
          <span>Salir</span>
        </button>
      </div>
    </aside>
  )
}
