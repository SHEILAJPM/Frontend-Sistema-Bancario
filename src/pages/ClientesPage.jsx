import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Pencil, Trash2, X, Info, ChevronRight, Phone, Mail, MapPin, Calendar, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { getClientes, crearCliente, editarCliente, eliminarCliente } from '../api/clienteApi'
import { getPrestamosByCliente } from '../api/prestamoApi'
import { formatSoles, formatFecha, formatEstado } from '../utils/format'
import styles from './ClientesPage.module.css'

const emptyForm = { nombre: '', apellido: '', dni: '', telefono: '', direccion: '', email: '' }

export default function ClientesPage() {
  const [clientes, setClientes]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [busqueda, setBusqueda]   = useState('')
  const [modal, setModal]         = useState(false)
  const [editando, setEditando]   = useState(null)
  const [form, setForm]           = useState(emptyForm)
  const [saving, setSaving]       = useState(false)
  const [historialCliente, setHistorialCliente] = useState(null)
  const [historialPrestamos, setHistorialPrestamos] = useState([])
  const [historialLoading, setHistorialLoading] = useState(false)

  const cargar = useCallback(() => {
    setLoading(true)
    getClientes({ q: busqueda, size: 50 })
      .then(r => setClientes(r.data.content ?? r.data))
      .catch(() => toast.error('Error al cargar clientes'))
      .finally(() => setLoading(false))
  }, [busqueda])

  useEffect(() => { cargar() }, [cargar])

  const abrirCrear = () => { setEditando(null); setForm(emptyForm); setModal(true) }
  const abrirEditar = (c) => {
    setEditando(c)
    setForm({ nombre: c.nombre, apellido: c.apellido, dni: c.dni,
              telefono: c.telefono ?? '', direccion: c.direccion ?? '', email: c.email ?? '' })
    setModal(true)
  }

  const handleGuardar = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editando) {
        await editarCliente(editando.id, form)
        toast.success('Cliente actualizado')
      } else {
        await crearCliente(form)
        toast.success('Cliente creado')
      }
      setModal(false)
      cargar()
    } catch (err) {
      const msg = err.response?.data?.detail ?? 'Error al guardar'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const abrirHistorial = (c) => {
    setHistorialCliente(c)
    setHistorialPrestamos([])
    setHistorialLoading(true)
    getPrestamosByCliente(c.id)
      .then(r => setHistorialPrestamos(r.data.content ?? r.data))
      .catch(() => toast.error('Error al cargar historial'))
      .finally(() => setHistorialLoading(false))
  }

  const handleEliminar = async (c) => {
    if (!confirm(`¿Desactivar a ${c.nombre} ${c.apellido}?`)) return
    try {
      await eliminarCliente(c.id)
      toast.success('Cliente desactivado')
      cargar()
    } catch (err) {
      toast.error(err.response?.data?.detail ?? 'No se pudo desactivar el cliente')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Clientes</h1>
          <p className={styles.subtitle}>Gestión de prestatarios registrados</p>
        </div>
        <motion.button
          className={styles.btnPrimary}
          onClick={abrirCrear}
          whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-sky)' }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={16} /> Nuevo cliente
        </motion.button>
      </div>

      {/* Buscador */}
      <div className={styles.searchWrap}>
        <Search size={16} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Buscar por nombre, apellido o DNI..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <motion.div
        className={styles.tableCard}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {loading ? (
          <div className={styles.loadingRows}>
            {[1,2,3,4,5].map(i => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Préstamos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className={styles.clienteCell}>
                      <span className={styles.avatar}>{c.nombre[0]}{c.apellido[0]}</span>
                      <span>{c.nombre} {c.apellido}</span>
                    </div>
                  </td>
                  <td className={styles.mono}>{c.dni}</td>
                  <td>{c.telefono ?? '—'}</td>
                  <td>{c.email ?? '—'}</td>
                  <td>
                    <span className={styles.countBadge}>{c.totalPrestamos}</span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.iconBtn} ${styles.info}`} onClick={() => abrirHistorial(c)} title="Más información">
                        <Info size={15} />
                      </button>
                      <button className={styles.iconBtn} onClick={() => abrirEditar(c)} title="Editar">
                        <Pencil size={15} />
                      </button>
                      <button className={`${styles.iconBtn} ${styles.danger}`} onClick={() => handleEliminar(c)} title="Desactivar">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {clientes.length === 0 && (
                <tr><td colSpan={6} className={styles.emptyRow}>Sin resultados.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Modal historial del cliente */}
      <AnimatePresence>
        {historialCliente && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setHistorialCliente(null)}
          >
            <motion.div
              className={styles.historialModal}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className={styles.historialHeader}>
                <div className={styles.historialClienteInfo}>
                  <span className={styles.historialAvatar}>
                    {historialCliente.nombre[0]}{historialCliente.apellido[0]}
                  </span>
                  <div>
                    <h2 className={styles.historialNombre}>
                      {historialCliente.nombre} {historialCliente.apellido}
                    </h2>
                    <span className={styles.historialDni}>DNI: {historialCliente.dni}</span>
                  </div>
                  <span className={`${styles.estadoBadge} ${historialCliente.activo ? styles.estadoActivo : styles.estadoInactivo}`}>
                    {historialCliente.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <button className={styles.closeBtn} onClick={() => setHistorialCliente(null)}>
                  <X size={18} />
                </button>
              </div>

              {/* Info del cliente */}
              <div className={styles.historialBody}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <Phone size={13} className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Teléfono</p>
                      <p className={styles.infoValue}>{historialCliente.telefono ?? '—'}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <Mail size={13} className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Email</p>
                      <p className={styles.infoValue}>{historialCliente.email ?? '—'}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <MapPin size={13} className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Dirección</p>
                      <p className={styles.infoValue}>{historialCliente.direccion ?? '—'}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <Calendar size={13} className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoLabel}>Registrado</p>
                      <p className={styles.infoValue}>{formatFecha(historialCliente.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Historial de préstamos */}
                <div className={styles.historialSection}>
                  <div className={styles.historialSectionHeader}>
                    <CreditCard size={15} className={styles.infoIcon} />
                    <h3 className={styles.historialSectionTitle}>Historial de Préstamos</h3>
                    {!historialLoading && (
                      <span className={styles.countBadge}>{historialPrestamos.length}</span>
                    )}
                  </div>

                  {historialLoading ? (
                    <div className={styles.loadingRows}>
                      {[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}
                    </div>
                  ) : historialPrestamos.length === 0 ? (
                    <p className={styles.historialEmpty}>Este cliente no tiene préstamos registrados.</p>
                  ) : (
                    <div className={styles.historialList}>
                      {historialPrestamos.map(p => (
                        <div key={p.id} className={styles.historialItem}>
                          <div className={styles.historialItemLeft}>
                            <span className={`${styles.estadoBadge} ${styles['estado' + p.estado.replace('_', '')]}`}>
                              {formatEstado(p.estado)}
                            </span>
                            <div>
                              <p className={styles.historialItemCapital}>{formatSoles(p.capital)} capital</p>
                              <p className={styles.historialItemSub}>
                                {p.numeroCuotas} cuotas {p.frecuencia?.toLowerCase()}es
                                · Inicio: {formatFecha(p.fechaInicio)}
                              </p>
                            </div>
                          </div>
                          <div className={styles.historialItemRight}>
                            <p className={styles.historialItemMonto}>{formatSoles(p.montoTotal)}</p>
                            <p className={styles.historialItemSubRight}>Total a cobrar</p>
                            <Link to={`/prestamos/${p.id}`} className={styles.verDetalleBtn} onClick={() => setHistorialCliente(null)}>
                              Ver detalle <ChevronRight size={13} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de formulario */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                <h2>{editando ? 'Editar cliente' : 'Nuevo cliente'}</h2>
                <button className={styles.closeBtn} onClick={() => setModal(false)}>
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleGuardar} className={styles.modalForm}>
                <div className={styles.formRow}>
                  <Field label="Nombre"   name="nombre"   value={form.nombre}   onChange={setForm} required />
                  <Field label="Apellido" name="apellido" value={form.apellido} onChange={setForm} required />
                </div>
                <div className={styles.formRow}>
                  <Field label="DNI"      name="dni"      value={form.dni}      onChange={setForm} required />
                  <Field label="Teléfono" name="telefono" value={form.telefono} onChange={setForm} />
                </div>
                <Field label="Dirección" name="direccion" value={form.direccion} onChange={setForm} />
                <Field label="Email"     name="email"     value={form.email}     onChange={setForm} type="email" />
                <div className={styles.modalActions}>
                  <button type="button" className={styles.btnSecondary} onClick={() => setModal(false)}>
                    Cancelar
                  </button>
                  <motion.button
                    type="submit"
                    className={styles.btnPrimary}
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {saving ? <span className="spinner" /> : (editando ? 'Guardar cambios' : 'Crear cliente')}
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

function Field({ label, name, value, onChange, required, type = 'text' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)' }}>
        {label}{required && <span style={{ color: 'var(--red-500)' }}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(p => ({ ...p, [name]: e.target.value }))}
        required={required}
        style={{
          padding: '0.6rem 0.875rem',
          border: '1.5px solid var(--gray-200)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--sky-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.15)' }}
        onBlur={e  => { e.target.style.borderColor = 'var(--gray-200)'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}
