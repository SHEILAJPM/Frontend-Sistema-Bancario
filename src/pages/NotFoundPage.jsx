import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <motion.div
      style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', gap:'1rem' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <span style={{ fontSize: '4rem' }}>404</span>
      <p style={{ color: '#6b7280', fontSize: '1rem' }}>La página que buscas no existe.</p>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ padding:'0.5rem 1.25rem', background:'#0ea5e9', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:600 }}
      >
        Volver al dashboard
      </button>
    </motion.div>
  )
}