import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Sistema de Préstamos v1.0</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  )
}