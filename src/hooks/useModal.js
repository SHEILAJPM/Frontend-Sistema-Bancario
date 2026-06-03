import { useState } from 'react'

export function useModal(defaultData = null) {
  const [open, setOpen]   = useState(false)
  const [data, setData]   = useState(defaultData)

  const abrir  = (item = null) => { setData(item); setOpen(true) }
  const cerrar = ()            => { setOpen(false); setData(null) }

  return { open, data, abrir, cerrar }
}