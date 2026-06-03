import styles from './TextArea.module.css'

export default function TextArea({ value, onChange, name, placeholder, rows = 3 }) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      rows={rows}
    />
  )
}