import { useState } from 'react'

export function usePagination(initialPage = 0, initialSize = 10) {
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  const goToPage = (p) => setPage(p)
  const nextPage = () => setPage(p => p + 1)
  const prevPage = () => setPage(p => Math.max(0, p - 1))
  const reset = () => setPage(0)

  return { page, size, setSize, goToPage, nextPage, prevPage, reset }
}