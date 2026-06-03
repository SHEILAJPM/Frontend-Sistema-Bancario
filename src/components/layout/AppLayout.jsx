import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Building2 } from 'lucide-react'
import Sidebar from './Sidebar'
import GlobalSearch from '../common/GlobalSearch'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <header className={styles.mobileHeader}>
        <div className={styles.mobileBrand}>
          <Building2 size={20} color="white" strokeWidth={1.8} />
          <span>PréstamOS</span>
        </div>
        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={22} />
        </button>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <main className={styles.main}>
        <Outlet />
      </main>
      <GlobalSearch />
    </div>
  )
}
