import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage    from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ClientesPage from './pages/ClientesPage'
import PrestamosPage from './pages/PrestamosPage'
import PrestamoDetallePage from './pages/PrestamoDetallePage'
import UsuariosPage from './pages/UsuariosPage'
import NotFoundPage from './pages/NotFoundPage'
import AppLayout    from './components/layout/AppLayout'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
              borderRadius: '10px',
              boxShadow: '0 4px 14px 0 rgba(14,165,233,0.15)',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={
            <PublicRoute><LoginPage /></PublicRoute>
          } />
          <Route path="/" element={
            <PrivateRoute><AppLayout /></PrivateRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"          element={<DashboardPage />} />
            <Route path="clientes"           element={<ClientesPage />} />
            <Route path="prestamos"          element={<PrestamosPage />} />
            <Route path="prestamos/:id"      element={<PrestamoDetallePage />} />
            <Route path="usuarios"           element={<UsuariosPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
