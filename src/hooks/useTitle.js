import { useEffect } from 'react'

export function useTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} — Sistema de Préstamos` : 'Sistema de Préstamos'
    return () => { document.title = prev }
  }, [title])
}