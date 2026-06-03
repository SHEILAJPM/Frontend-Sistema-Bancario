export const omit = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))

export const pick = (obj, keys) =>
  Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]))

export const isEmpty = (obj) =>
  obj === null || obj === undefined || (typeof obj === 'object' && Object.keys(obj).length === 0)

export const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)