import { createContext, useContext, useState, useCallback } from 'react'
import { login as loginApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const { data } = await loginApi(credentials)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify({ username: data.username, rol: data.rol }))
      setUser({ username: data.username, rol: data.rol })
      return { ok: true }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Credenciales inválidas'
      return { ok: false, message: msg }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
