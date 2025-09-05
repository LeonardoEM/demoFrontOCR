import { Navigate } from 'react-router-dom'

// Componente para proteger rutas que requieren autenticación
export function ProtectedRoute({ children, user }) {
  // Verificar tanto el usuario como el token
  const token = localStorage.getItem('token')
  
  // Si no hay usuario autenticado o no hay token, redirige al login
  if (!user || !token) {
    // Limpiar datos inconsistentes
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return <Navigate to="/" replace />
  }

  // Si hay usuario autenticado y token, renderiza el componente hijo
  return children
}

export default ProtectedRoute
