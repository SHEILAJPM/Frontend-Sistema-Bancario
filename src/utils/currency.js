export const SOL = 'S/ '

export const formatMonto = (n) =>
  SOL + Number(n || 0).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const parseMonto = (s) =>
  parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0