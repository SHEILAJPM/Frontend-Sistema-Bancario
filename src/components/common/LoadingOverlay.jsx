import Spinner from './Spinner'
import styles from './LoadingOverlay.module.css'

export default function LoadingOverlay({ loading, children }) {
  return (
    <div className={styles.wrapper}>
      {children}
      {loading && (
        <div className={styles.overlay}>
          <Spinner size="lg" />
        </div>
      )}
    </div>
  )
}