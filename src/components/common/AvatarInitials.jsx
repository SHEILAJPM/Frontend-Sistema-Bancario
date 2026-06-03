import styles from './AvatarInitials.module.css'

function initials(nombre, apellido) {
  return `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()
}

export default function AvatarInitials({ nombre, apellido, size = 36 }) {
  return (
    <div className={styles.avatar} style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {initials(nombre, apellido)}
    </div>
  )
}