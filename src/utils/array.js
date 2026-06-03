export const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key]
    ;(acc[k] = acc[k] || []).push(item)
    return acc
  }, {})

export const sortBy = (arr, key, asc = true) =>
  [...arr].sort((a, b) => {
    const va = a[key], vb = b[key]
    return asc ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0)
  })

export const unique = (arr, key) => {
  const seen = new Set()
  return arr.filter(item => {
    const k = key ? item[key] : item
    return seen.has(k) ? false : (seen.add(k), true)
  })
}