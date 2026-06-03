import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ChevronRight, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { getPrestamos, crearPrestamo } from '../api/prestamoApi'
import { getClientes } from '../api/clienteApi'
import styles from './PrestamosPage.module.css'

const FRECUENCIAS = ['DIARIO', 'SEMANAL', 'QUINCENAL', 'MENSUAL']
const ESTADO_COLORS = { ACTIVO: 'sky', PAGADO: 'green', EN_MORA: 'red' }

function formatMoney(v) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(v ?? 0)
}

const emptyForm = {
  clienteId: '', capital: '', tasaInteres: '0.15', numeroCuotas: '',
  frecuencia: 'MENSUAL', fechaInicio: new Date().toISOString().slice(0, 10), observacion: '',
}

export default function PrestamosPage() {
  const [prestamos, setPrestamos] = useState([])
  const [loading, setLoading]     = useState(true)
  const [modal, setModal]         = useState(false)
  const [form, setForm]           = useState(emptyForm)
  const [clientes, setClientes]   = useState([])
  const [saving, setSaving]       = useState(false)

  const cargar = useCallback(() => {
    setLoading(true)
    getPrestamos({ size: 50 })
      .then(r => setPrestamos(r.data.content ?? r.data))
      .catch(() => toast.error('Error al cargar préstamos'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const abrirModal = () => {
    getClientes({ size: 100 }).then(r => setClientes(r.data.content ?? r.data))
    setForm(emptyForm)
    setModal(true)
  }

  const handleChange = e =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleGuardar = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await crearPrestamo({
        ...form,
        clienteId:    Number(form.clienteId),
        capital:      Number(form.capital),
        tasaInteres:  Number(form.tasaInteres),
        numeroCuotas: Number(form.numeroCuotas),
      })
      toast.success('Préstamo creado y cronograma generado')
      setModal(false)
      cargar()
    } catch (err) {
      const msg = err.response?.data?.detail ?? 'Error al crear préstamo'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Préstamos</h1>
          <p className={styles.subtitle}>Registro y seguimiento de créditos otorgados</p>
        </div>
        <motion.button
          className={styles.btnPrimary}
          onClick={abrirModal}
          whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-sky)' }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={16} /> Nuevo préstamo
        </motion.button>
      </div>

      {/* Lista de préstamos */}
      <div className={styles.list}>
        {loading
          ? [1,2,3].map(i => <div key={i} className={styles.skeleton} />)
          : prestamos.map((p, i) => (
            <motion.div
              key={p.id}
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <div className={styles.cardLeft}>
                <span className={`${styles.estadoBadge} ${styles[ESTADO_COLORS[p.estado]]}`}>
                  {p.estado.replace('_', ' ')}
                </span>
                <div>
                  <p className={styles.clienteNombre}>{p.clienteNombre}</p>
                  <p className={styles.cardSub}>
                    {formatMoney(p.capital)} capital · {p.numeroCuotas} cuotas {p.frecuencia.toLowerCase()}es
                    · Inició {format(new Date(p.fechaInicio + 'T00:00:00'), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
              <div className={styles.cardRight}>
                <div style={{ textAlign: 'right' }}>
                  <p className={styles.montoTotal}>{formatMoney(p.montoTotal)}</p>
                  <p className={styles.cardSub}>Total a cobrar</p>
                </div>
                <Link to={`/prestamos/${p.id}`} className={styles.detailBtn}>
                  Ver detalle <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))
        }
        {!loading && prestamos.length === 0 && (
          <p className={styles.empty}>Sin préstamos registrados.</p>
        )}
      </div>

      {/* Modal nuevo préstamo */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>Nuevo préstamo</h2>
                <button className={styles.closeBtn} onClick={() => setModal(false)}><X size={18} /></button>
              </div>
              <form onSubmit={handleGuardar} className={styles.modalForm}>
                <FormField label="Cliente" required>
                  <select name="clienteId" value={form.clienteId} onChange={handleChange} required>
                    <option value="">Seleccionar cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre} {c.apellido} — {c.dni}</option>
                    ))}
                  </select>
                </FormField>

                <div className={styles.formRow}>
                  <FormField label="Capital (S/.)" required>
                    <input type="number" name="capital" value={form.capital} onChange={handleChange}
                           min="100" step="0.01" placeholder="1000.00" required />
                  </FormField>
                  <FormField label="Tasa interés (ej: 0.15 = 15%)" required>
                    <input type="number" name="tasaInteres" value={form.tasaInteres} onChange={handleChange}
                           min="0.001" max="1" step="0.001" placeholder="0.150" required />
                  </FormField>
                </div>

                <div className={styles.formRow}>
                  <FormField label="N° de cuotas" required>
                    <input type="number" name="numeroCuotas" value={form.numeroCuotas} onChange={handleChange}
                           min="1" max="360" placeholder="12" required />
                  </FormField>
                  <FormField label="Frecuencia" required>
                    <select name="frecuencia" value={form.frecuencia} onChange={handleChange}>
                      {FRECUENCIAS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </FormField>
                </div>

                <FormField label="Fecha de inicio" required>
                  <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required />
                </FormField>
                <FormField label="Observación">
                  <textarea name="observacion" value={form.observacion} onChange={handleChange}
                            rows={2} placeholder="Opcional..." />
                </FormField>

                {/* Vista previa del cálculo */}
                {form.capital && form.tasaInteres && form.numeroCuotas && (
                  <div className={styles.preview}>
                    <p>Interés total: <strong>{formatMoney(form.capital * form.tasaInteres * form.numeroCuotas)}</strong></p>
                    <p>Total a cobrar: <strong>{formatMoney(+form.capital + form.capital * form.tasaInteres * form.numeroCuotas)}</strong></p>
                    <p>Cuota fija: <strong>{formatMoney((+form.capital + form.capital * form.tasaInteres * form.numeroCuotas) / form.numeroCuotas)}</strong></p>
                  </div>
                )}

                <div className={styles.modalActions}>
                  <button type="button" className={styles.btnSecondary} onClick={() => setModal(false)}>Cancelar</button>
                  <motion.button type="submit" className={styles.btnPrimary} disabled={saving}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {saving ? <span className="spinner" /> : 'Crear préstamo'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FormField({ label, required, children }) {
  const child = children
  const styled = {
    ...children,
    props: {
      ...children.props,
      style: {
        width: '100%', padding: '0.6rem 0.875rem',
        border: '1.5px solid var(--gray-200)', borderRadius: 'var(--radius-md)',
        fontSize: '0.875rem', fontFamily: 'var(--font-sans)', outline: 'none',
        background: '#fff', transition: 'border-color 0.2s, box-shadow 0.2s',
        resize: 'vertical',
      },
      onFocus: e => { e.target.style.borderColor = 'var(--sky-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.15)' },
      onBlur:  e => { e.target.style.borderColor = 'var(--gray-200)'; e.target.style.boxShadow = 'none' },
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)' }}>
        {label}{required && <span style={{ color: 'var(--red-500)' }}> *</span>}
      </label>
      {styled}
    </div>
  )
}
