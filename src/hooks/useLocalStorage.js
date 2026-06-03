import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initialValue }
    catch { return initialValue }
  })
  const set = (value) => {
    setStored(value)
    localStorage.setItem(key, JSON.stringify(value))
  }
  const remove = () => {
    setStored(initialValue)
    localStorage.removeItem(key)
  }
  return [stored, set, remove]
}