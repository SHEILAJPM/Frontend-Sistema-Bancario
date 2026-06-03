import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import styles from './Modal.module.css'

export default function Modal({ open, onClose, title, children, width = 500 }) {
  return (
    <AnimatePresence>
      {open && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div
            className={styles.panel}
            style={{ maxWidth: width }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <button className={styles.close} onClick={onClose} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
            <div className={styles.body}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}