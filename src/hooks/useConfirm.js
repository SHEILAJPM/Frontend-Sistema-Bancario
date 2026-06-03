import { useState } from 'react'

export function useConfirm() {
  const [state, setState] = useState({ open: false, message: '', onConfirm: null })

  const confirm = (message) => new Promise((resolve) => {
    setState({ open: true, message, onConfirm: resolve })
  })

  const handleConfirm = () => {
    state.onConfirm?.(true)
    setState({ open: false, message: '', onConfirm: null })
  }

  const handleCancel = () => {
    state.onConfirm?.(false)
    setState({ open: false, message: '', onConfirm: null })
  }

  return { ...state, confirm, handleConfirm, handleCancel }
}