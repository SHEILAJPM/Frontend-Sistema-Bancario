import styles from './ActionButton.module.css'

export default function ActionButton({ children, onClick, variant = 'primary', disabled = false, type = 'button', size = 'md' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
    >
      {children}
    </button>
  )
}