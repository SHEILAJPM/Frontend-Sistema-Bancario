import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Building2 } from 'lucide-react'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form)
    if (result.ok) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className={styles.page}>
      {/* Fondo decorativo */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

      {/* Tarjeta central con animación fade-in + slide-up */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo + título */}
        <div className={styles.header}>
          <motion.div
            className={styles.logoRing}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <Building2 size={28} color="var(--sky-600)" strokeWidth={1.8} />
          </motion.div>
          <h1 className={styles.title}>Sistema de Préstamos</h1>
          <p className={styles.subtitle}>Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campo usuario */}
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          {/* Campo contraseña */}
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass(p => !p)}
                aria-label="Mostrar/ocultar contraseña"
              >
                {showPass
                  ? <EyeOff size={18} color="var(--gray-400)" />
                  : <Eye    size={18} color="var(--gray-400)" />
                }
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              className={styles.error}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          {/* Botón submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? <span className="spinner" /> : 'Iniciar sesión'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
