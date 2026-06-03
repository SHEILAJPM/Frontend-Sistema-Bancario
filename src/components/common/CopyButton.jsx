import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import styles from './CopyButton.module.css'

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className={styles.btn} onClick={handleCopy} title="Copiar">
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}