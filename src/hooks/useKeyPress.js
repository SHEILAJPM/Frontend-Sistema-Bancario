import { useEffect } from 'react'

export function useKeyPress(key, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (e.key === key) handler(e)
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [key, handler])
}