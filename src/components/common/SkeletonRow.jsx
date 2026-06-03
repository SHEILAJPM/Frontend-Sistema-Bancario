import styles from './SkeletonRow.module.css'

export default function SkeletonRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className={styles.td}>
          <div className={styles.pulse} />
        </td>
      ))}
    </tr>
  )
}