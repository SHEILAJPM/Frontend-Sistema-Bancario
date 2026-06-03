export const isValidDni = (dni) => /^\d{8}$/.test(dni)

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isPositiveNumber = (val) =>
  !isNaN(val) && Number(val) > 0

export const isRequired = (val) =>
  val !== null && val !== undefined && String(val).trim().length > 0