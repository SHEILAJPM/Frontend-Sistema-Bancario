import { useEffect, useState } from 'react'
import { listarUsuarios, crearUsuario, toggleActivo } from '../api/usuarioApi'
import PageHeader from '../components/common/PageHeader'
import ActionButton from '../components/common/ActionButton'
import StatusBadge from '../components/common/StatusBadge'
import Spinner from '../components/common/Spinner'
import toast from 'react-hot-toast'
import styles from './UsuariosPage.module.css'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading]   = useState(true)

  const cargar = async () => {
    try {
      const { data } = await listarUsuarios()
      setUsuarios(data)
    } catch { toast.error('Error al cargar usuarios') }
    finally { setLoading(false) }
  }

  useEffect(() => { cargar() }, [])

  const handleToggle = async (id) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u))
    try {
      await toggleActivo(id)
      toast.success('Estado actualizado')
    } catch {
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u))
      toast.error('No se pudo cambiar el estado')
    }
  }

  if (loading) return <Spinner />

  return (
    <div className={styles.page}>
      <PageHeader title="Gestión de Usuarios" subtitle="Administra los cobradores y administradores" />
      <div className={styles.tabla}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td><StatusBadge estado={u.rol} /></td>
                <td>{u.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <ActionButton size="sm" variant={u.activo ? 'danger' : 'secondary'} onClick={() => handleToggle(u.id)}>
                    {u.activo ? 'Desactivar' : 'Activar'}
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}