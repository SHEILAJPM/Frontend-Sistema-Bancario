import { useState } from 'react'
import styles from './InlineInput.module.css'

export default function InlineInput({ value: initial, onSave, type = 'text' }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal]         = useState(initial)

  const commit = () => { onSave?.(val); setEditing(false) }
  const cancel = () => { setVal(initial); setEditing(false) }

  if (!editing) {
    return (
      <span className={styles.display} onDoubleClick={() => setEditing(true)} title="Doble clic para editar">
        {val}
      </span>
    )
  }
  return (
    <span className={styles.editRow}>
      <input type={type} className={styles.input} value={val} onChange={e => setVal(e.target.value)} autoFocus
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') cancel() }} />
      <button className={styles.ok} onClick={commit}>✓</button>
      <button className={styles.cancel} onClick={cancel}>✕</button>
    </span>
  )
}