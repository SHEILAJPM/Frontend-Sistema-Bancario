import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import styles from './CollapseSection.module.css'

export default function CollapseSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={styles.section}>
      <button className={styles.header} onClick={() => setOpen(o => !o)}>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>{title}</span>
      </button>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  )
}