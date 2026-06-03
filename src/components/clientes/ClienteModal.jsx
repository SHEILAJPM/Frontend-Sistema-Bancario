import Modal from '../common/Modal'
import ClienteForm from './ClienteForm'
import { crearCliente, editarCliente } from '../../api/clienteApi'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ClienteModal({ open, onClose, cliente, onGuardado }) {
  const [loading, setLoading] = useState(false)
  const esEdicion = !!cliente

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      if (esEdicion) {
        await editarCliente(cliente.id, data)
        toast.success('Cliente actualizado')
      } else {
        await crearCliente(data)
        toast.success('Cliente creado')
      }
      onGuardado()
      onClose()
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={esEdicion ? 'Editar cliente' : 'Nuevo cliente'}>
      <ClienteForm inicial={cliente ?? {}} onSubmit={handleSubmit} loading={loading} />
    </Modal>
  )
}