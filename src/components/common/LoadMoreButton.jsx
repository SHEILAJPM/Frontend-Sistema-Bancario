import ActionButton from './ActionButton'

export default function LoadMoreButton({ onClick, loading, hasMore }) {
  if (!hasMore) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <ActionButton variant="ghost" onClick={onClick} disabled={loading}>
        {loading ? 'Cargando...' : 'Cargar más'}
      </ActionButton>
    </div>
  )
}