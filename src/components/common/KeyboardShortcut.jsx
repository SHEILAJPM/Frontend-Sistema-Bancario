import styles from './KeyboardShortcut.module.css'

export default function KeyboardShortcut({ keys = [] }) {
  return (
    <span className={styles.combo}>
      {keys.map((k, i) => (
        <span key={i}>
          {i > 0 && <span className={styles.plus}>+</span>}
          <kbd className={styles.key}>{k}</kbd>
        </span>
      ))}
    </span>
  )
}