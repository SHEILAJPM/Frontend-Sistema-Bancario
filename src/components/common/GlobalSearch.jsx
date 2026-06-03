import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Users, Banknote } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getClientes } from '../../api/clienteApi'
import { getPrestamos } from '../../api/prestamoApi'
import styles from './GlobalSearch.module.css'

const fmt = (v) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(v ?? 0)

export default function GlobalSearch() {
  const [open, setOpen]         = useState(false)
  const [term, setTerm]         = useState('')
  const [clientes, setClientes] = useState([])
  const [prestamos, setPrestamos] = useState([])
  const [busy, setBusy]         = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Abrir con Ctrl+K / Cmd+K, cerrar con Escape
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Foco al abrir, limpieza al cerrar
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60)
    } else {
      setTerm('')
      setClientes([])
      setPrestamos([])
    }
  }, [open])

  // Búsqueda con debounce
  useEffect(() => {
    if (!term.trim()) { setClientes([]); setPrestamos([]); return }
    const t = setTimeout(async () => {
      setBusy(true)
      try {
        const [cr, pr] = await Promise.all([
          getClientes({ q: term, size: 5 }),
          getPrestamos({ size: 40 }),
        ])
        setClientes(cr.data.content ?? cr.data)
        const lower = term.toLowerCase()
        setPrestamos(
          (pr.data.content ?? pr.data)
            .filter(p => p.clienteNombre?.toLowerCase().includes(lower))
            .slice(0, 5)
        )
      } finally {
        setBusy(false)
      }
    }, 280)
    return () => clearTimeout(t)
  }, [term])

  const go = (path) => { setOpen(false); navigate(path) }

  const hasResults = clientes.length > 0 || prestamos.length > 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Barra de búsqueda */}
            <div className={styles.bar}>
              <Search size={16} className={styles.searchIcon} />
              <input
                ref={inputRef}
                className={styles.input}
                placeholder="Buscar cliente o préstamo..."
                value={term}
                onChange={e => setTerm(e.target.value)}
              />
              {term
                ? <button className={styles.clearBtn} onClick={() => setTerm('')}><X size={14} /></button>
                : <kbd className={styles.esc}>Esc</kbd>
              }
            </div>

            {/* Resultados */}
            <div className={styles.body}>
              {!term.trim() && (
                <p className={styles.hint}>Escribe un nombre, apellido o DNI...</p>
              )}

              {busy && term && <p className={styles.hint}>Buscando...</p>}

              {!busy && clientes.length > 0 && (
                <section className={styles.section}>
                  <header className={styles.sectionHead}><Users size={11} /> Clientes</header>
                  {clientes.map(c => (
                    <button key={c.id} className={styles.row} onClick={() => go('/clientes')}>
                      <span className={styles.ava}>{c.nombre[0]}{c.apellido[0]}</span>
                      <div>
                        <p className={styles.rowName}>{c.nombre} {c.apellido}</p>
                        <p className={styles.rowSub}>DNI {c.dni} · {c.totalPrestamos ?? 0} préstamos</p>
                      </div>
                    </button>
                  ))}
                </section>
              )}

              {!busy && prestamos.length > 0 && (
                <section className={styles.section}>
                  <header className={styles.sectionHead}><Banknote size={11} /> Préstamos</header>
                  {prestamos.map(p => (
                    <button key={p.id} className={styles.row} onClick={() => go(`/prestamos/${p.id}`)}>
                      <span className={`${styles.ava} ${styles.avaBlue}`}>#</span>
                      <div>
                        <p className={styles.rowName}>{p.clienteNombre}</p>
                        <p className={styles.rowSub}>{fmt(p.capital)} · {p.estado.replace('_', ' ')}</p>
                      </div>
                    </button>
                  ))}
                </section>
              )}

              {!busy && term.trim() && !hasResults && (
                <p className={styles.hint}>Sin resultados para <strong>"{term}"</strong></p>
              )}
            </div>

            {/* Footer con atajos */}
            <div className={styles.footer}>
              <span><kbd>↑↓</kbd> navegar</span>
              <span><kbd>Enter</kbd> abrir</span>
              <span><kbd>Esc</kbd> cerrar</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}