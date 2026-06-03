import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import styles from './BreadCrumb.module.css'

export default function BreadCrumb({ items = [] }) {
  return (
    <nav className={styles.nav} aria-label="Ruta de navegación">
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {i > 0 && <ChevronRight size={14} className={styles.sep} />}
          {item.to
            ? <Link to={item.to} className={styles.link}>{item.label}</Link>
            : <span className={styles.current}>{item.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}