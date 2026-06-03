import { useState } from 'react'
import FormField from '../common/FormField'
import ActionButton from '../common/ActionButton'

const INICIAL = { nombre: '', apellido: '', dni: '', telefono: '', direccion: '', email: '' }

export default function ClienteForm({ inicial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({ ...INICIAL, ...inicial })

  const change = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
        <FormField label="Nombre" required>
          <input className="input" name="nombre" value={form.nombre} onChange={change} required />
        </FormField>
        <FormField label="Apellido" required>
          <input className="input" name="apellido" value={form.apellido} onChange={change} required />
        </FormField>
      </div>
      <FormField label="DNI" required>
        <input className="input" name="dni" value={form.dni} onChange={change} required maxLength={20} />
      </FormField>
      <FormField label="Teléfono">
        <input className="input" name="telefono" value={form.telefono} onChange={change} />
      </FormField>
      <FormField label="Dirección">
        <input className="input" name="direccion" value={form.direccion} onChange={change} />
      </FormField>
      <FormField label="Email">
        <input className="input" type="email" name="email" value={form.email} onChange={change} />
      </FormField>
      <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.75rem', marginTop:'0.5rem' }}>
        <ActionButton type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </ActionButton>
      </div>
    </form>
  )
}