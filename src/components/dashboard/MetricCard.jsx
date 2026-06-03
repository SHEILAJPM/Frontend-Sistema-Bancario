import { motion } from 'framer-motion'
import styles from './MetricCard.module.css'

export default function MetricCard({ title, value, subtitle, icon: Icon, color = 'sky', delay = 0 }) {
  return (
    <motion.div
      className={`${styles.card} ${styles[color]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, boxShadow: '0 12px 28px -4px rgba(14,165,233,0.22)' }}
    >
      <div className={styles.top}>
        <div className={styles.iconWrap}>
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <span className={styles.title}>{title}</span>
      </div>
      <p className={styles.value}>{value}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  )
}
