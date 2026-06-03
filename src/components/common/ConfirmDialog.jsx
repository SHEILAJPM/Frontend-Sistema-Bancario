import { motion, AnimatePresence } from 'framer-motion'
import styles from './ConfirmDialog.module.css'

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = 'Confirmar', danger = false }) {
  return (
    <AnimatePresence>
      {open && (
        <div className={styles.overlay} onClick={onCancel}>
          <motion.div
            className={styles.dialog}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>
            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={onCancel}>Cancelar</button>
              <button className={`${styles.confirmBtn} ${danger ? styles.danger : ''}`} onClick={onConfirm}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}