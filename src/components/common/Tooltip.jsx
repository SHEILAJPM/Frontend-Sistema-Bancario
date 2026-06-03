import styles from './Tooltip.module.css'

export default function Tooltip({ text, children }) {
  return (
    <span className={styles.wrapper}>
      {children}
      <span className={styles.tip}>{text}</span>
    </span>
  )
}