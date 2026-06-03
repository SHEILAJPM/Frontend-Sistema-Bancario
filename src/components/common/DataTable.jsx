import styles from './DataTable.module.css'
import EmptyState from './EmptyState'
import Spinner from './Spinner'

export default function DataTable({ columns, data, loading, emptyText = 'No hay datos' }) {
  if (loading) return <Spinner />
  if (!data || data.length === 0) return <EmptyState title={emptyText} />

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={styles.th} style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id ?? i} className={styles.tr}>
              {columns.map(col => (
                <td key={col.key} className={styles.td}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}