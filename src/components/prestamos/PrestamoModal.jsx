import { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import PrestamoForm from './PrestamoForm'
import { crearPrestamo } from '../../api/prestamoApi'
import { listarClientes } from '../../api/clienteApi'
import toast from 'react-hot-toast'

export default function PrestamoModal({ open, onClose, onCreado }) {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    if (open) {
      listarClientes('', 0, 100).then(r => setClientes(r.data.content ?? [])).catch(() => {})
    }
  }, [open])

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await crearPrestamo({
        ...data,
        clienteId:    parseInt(data.clienteId),
        capital:      parseFloat(data.capital),
        tasaInteres:  parseFloat(data.tasaInteres),
        numeroCuotas: parseInt(data.numeroCuotas),
      })
      toast.success('Préstamo creado exitosamente')
      onCreado()
      onClose()
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Error al crear préstamo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Nuevo préstamo" width={560}>
      <PrestamoForm clientes={clientes} onSubmit={handleSubmit} loading={loading} />
    </Modal>
  )
}