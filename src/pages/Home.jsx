import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ButtonForm from '../components/buttons/ButtonForm'

export function Home({ user, setUser }) {
  const navigate = useNavigate()

  // Verificación adicional: si no hay usuario, redirige al login
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }

  // Si no hay usuario, no renderiza nada (previene flash de contenido)
  if (!user) {
    return <div className="loading">Cargando...</div>
  }

  const irARegistrados = () => {
  navigate('/Correctos')
}

const irAErrores = () => {
  navigate('/errores')
}


  return (
    <div>
      {/* Contenedor principal centrado */}
      <div className="row home-container position-custom-small">
        <div className="col s12" style={{ paddingTop: '250px', paddingBottom: '50px' }}>
          {/* Panel principal con adaptación automática de colores */}
          <div className="card-panel center-align z-depth-3 home-panel">
            {/* Icono de usuario con color adaptable */}
            <i className="large material-icons home-icon">Autobuses registrados</i>

            {/* Título de bienvenida 
            <h4 className="home-title">
              ¡Hola, <span className="home-username">{user?.name}</span>!
            </h4>*/}
          </div>
          
          {/* Botones de Roles, Modulos y Usuarios debajo del panel principal */}
          <div className="home-buttons-row" style={{ marginBottom: '200px', marginTop: '100px' }}>
            <h5>Panel de navegación</h5>

            <button
              className="btn-large teal darken-1 home-function-btn"
              onClick={irARegistrados}
            >
              Registrados
            </button>

            <button
              className="btn-large teal darken-2 home-function-btn"
              onClick={irAErrores}
            >
              Errores
            </button>
          </div>

        </div>
        {/* Botón de cerrar sesión */}
            <ButtonForm
              tipo="button"
              titulo="Cerrar sesión"
              clases="btn red lighten-1"
              manejarClic={handleLogout}
            />
      </div>
    </div>
  )
}

export default Home