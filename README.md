# Sistema de Préstamos — Frontend

Aplicación React 18 + Vite para gestión de préstamos y cobranzas.

## Stack

- React 18 + Vite 5
- React Router DOM v6
- Axios (con interceptor JWT)
- Framer Motion
- Lucide Icons
- React Hot Toast
- CSS Modules

## Iniciar

```bash
npm install
npm run dev   # http://localhost:5173
```

## Credenciales

| Usuario | Contraseña |
|---------|-----------|
| admin   | admin123  |

## Estructura

```
src/
├── api/           # Clientes Axios por dominio
├── components/    # Componentes reutilizables
├── context/       # AuthContext con JWT
├── hooks/         # Custom hooks
├── pages/         # Vistas principales
└── styles/        # CSS global
```
## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Estructura de componentes

```
components/
├── common/     # Componentes reutilizables (Modal, Badge, Spinner, etc.)
├── clientes/   # Componentes específicos de clientes
├── prestamos/  # Componentes específicos de préstamos
├── dashboard/  # Componentes del dashboard
└── layout/     # Layout: Sidebar, TopBar, Footer, BreadCrumb
```
