import api from './axiosConfig'

export const resumenPeriodo = (desde, hasta) =>
  api.get('/reportes/periodo', { params: { desde, hasta } })