export const capitalize = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : ''

export const initials = (nombre, apellido) =>
  `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()

export const truncate = (s, max = 40) =>
  s && s.length > max ? s.slice(0, max) + '...' : s

export const normalizar = (s) =>
  s?.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() ?? ''