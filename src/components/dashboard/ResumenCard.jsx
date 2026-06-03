import styles from './ResumenCard.module.css'

export default function ResumenCard({ titulo, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>{titulo}</h3>
      <div className={styles.contenido}>{children}</div>
    </div>
  )
}