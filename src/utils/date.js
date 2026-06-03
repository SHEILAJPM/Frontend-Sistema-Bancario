export const hoy = () => new Date().toISOString().split('T')[0]

export const inicioMes = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0]
}

export const finMes = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0]
}

export const diasRestantes = (fechaVencimiento) => {
  const hoyMs = new Date().setHours(0, 0, 0, 0)
  const venceMs = new Date(fechaVencimiento).setHours(0, 0, 0, 0)
  return Math.ceil((venceMs - hoyMs) / 86400000)
}