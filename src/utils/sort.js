export const compareStr = (a, b) => String(a ?? '').localeCompare(String(b ?? ''), 'es', { sensitivity: 'base' })

export const compareNum = (a, b) => Number(a ?? 0) - Number(b ?? 0)

export const compareDate = (a, b) => new Date(a ?? 0) - new Date(b ?? 0)

export const compareBool = (a, b) => (a === b ? 0 : a ? -1 : 1)