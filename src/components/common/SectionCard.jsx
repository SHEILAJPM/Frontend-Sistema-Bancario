import styles from './SectionCard.module.css'

export default function SectionCard({ title, children, padding = true }) {
  return (
    <section className={styles.card}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={padding ? styles.body : ''}>{children}</div>
    </section>
  )
}