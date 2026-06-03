import styles from './CounterBadge.module.css'

export default function CounterBadge({ count, max = 99 }) {
  if (!count || count === 0) return null
  return (
    <span className={styles.badge}>
      {count > max ? `${max}+` : count}
    </span>
  )
}