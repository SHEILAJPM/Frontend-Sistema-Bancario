import { useState } from 'react'
import Modal from '../common/Modal'
import ActionButton from '../common/ActionButton'
import FormField from '../common/FormField'
import { registrarPago } from '../../api/prestamoApi'
import toast from 'react-hot-toast'

export default function PagoModal({ open, onClose, cuota, onPagado }) {
  const [monto, setMonto]       = useState('')
  const [loading, setLoading]   = useState(false)

  const saldo = cuota ? (cuota.montoCuota - cuota.montoPagado).toFixed(2) : 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registrarPago({ cuotaId: cuota.id, montoRecibido: parseFloat(monto) })
      toast.success('Pago registrado correctamente')
      onPagado()
      onClose()
    } catch {
      toast.error('Error al registrar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Registrar Pago" width={400}>
      {cuota && (
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <p style={{ margin:0, color:'#6b7280', fontSize:'0.875rem' }}>
            Cuota #{cuota.numeroCuota} — Saldo: <strong>S/ {saldo}</strong>
          </p>
          <FormField label="Monto a pagar" required>
            <input
              type="number" step="0.01" min="0.01" max={saldo}
              value={monto} onChange={e => setMonto(e.target.value)}
              required style={{ padding:'0.5rem', border:'1px solid #e5e7eb', borderRadius:'6px', width:'100%' }}
            />
          </FormField>
          <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
            <ActionButton variant="secondary" onClick={onClose} type="button">Cancelar</ActionButton>
            <ActionButton variant="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Confirmar pago'}
            </ActionButton>
          </div>
        </form>
      )}
    </Modal>
  )
}