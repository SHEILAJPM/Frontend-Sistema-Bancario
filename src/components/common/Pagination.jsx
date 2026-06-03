import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.css'

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null
  return (
    <div className={styles.wrapper}>
      <button onClick={onPrev} disabled={page === 0} className={styles.btn}>
        <ChevronLeft size={16} />
      </button>
      <span className={styles.info}>{page + 1} / {totalPages}</span>
      <button onClick={onNext} disabled={page >= totalPages - 1} className={styles.btn}>
        <ChevronRight size={16} />
      </button>
    </div>
  )
}