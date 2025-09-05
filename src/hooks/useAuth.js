import { useState, useEffect } from 'react'

// Hook personalizado para manejar la autenticación
export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario guardado al cargar la aplicación
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        
        if (savedUser && token) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error)
        // Si hay error al parsear, limpiar localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Función para hacer login
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    setUser(userData)
  }

  // Función para hacer logout
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  // Función para verificar si hay una sesión válida
  const isAuthenticated = () => {
    return user !== null && localStorage.getItem('token') !== null
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    setUser
  }
}

export default useAuth
