export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

export const pct = (parte, total) => total > 0 ? round2((parte / total) * 100) : 0

export const sumar = (...args) => args.reduce((acc, n) => acc + Number(n || 0), 0)