import { useState } from 'react'
import FormField from '../common/FormField'
import ActionButton from '../common/ActionButton'
import { FRECUENCIAS } from '../../utils/constants'

const HOY = new Date().toISOString().split('T')[0]
const INICIAL = { clienteId: '', capital: '', tasaInteres: '', numeroCuotas: '', frecuencia: 'MENSUAL', fechaInicio: HOY, observacion: '' }

export default function PrestamoForm({ clientes = [], onSubmit, loading }) {
  const [form, setForm] = useState(INICIAL)
  const change = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form) }}
      style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
      <FormField label="Cliente" required>
        <select className="input" name="clienteId" value={form.clienteId} onChange={change} required>
          <option value="">Seleccionar cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre} {c.apellido} — {c.dni}</option>)}
        </select>
      </FormField>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
        <FormField label="Capital (S/)" required>
          <input className="input" type="number" step="0.01" name="capital" value={form.capital} onChange={change} required min="1" />
        </FormField>
        <FormField label="Tasa de interés" required>
          <input className="input" type="number" step="0.001" name="tasaInteres" value={form.tasaInteres} onChange={change} required min="0.001" />
        </FormField>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.875rem' }}>
        <FormField label="Número de cuotas" required>
          <input className="input" type="number" name="numeroCuotas" value={form.numeroCuotas} onChange={change} required min="1" />
        </FormField>
        <FormField label="Frecuencia">
          <select className="input" name="frecuencia" value={form.frecuencia} onChange={change}>
            {FRECUENCIAS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="Fecha de inicio" required>
        <input className="input" type="date" name="fechaInicio" value={form.fechaInicio} onChange={change} required />
      </FormField>
      <FormField label="Observación">
        <textarea className="input" name="observacion" value={form.observacion} onChange={change} rows={2} />
      </FormField>
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <ActionButton type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear préstamo'}</ActionButton>
      </div>
    </form>
  )
}