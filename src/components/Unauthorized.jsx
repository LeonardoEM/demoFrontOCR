import { Link } from 'react-router-dom'

// Componente que se muestra cuando se intenta acceder a una ruta sin autorización
export function Unauthorized() {
  return (
    <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="col s12 m8 l6">
        <div className="card-panel center-align red lighten-4">
          <i className="large material-icons red-text">warning</i>
          <h4 className="red-text text-darken-2">Acceso Denegado</h4>
          <p className="red-text text-darken-1">
            Debes iniciar sesión para acceder a esta página.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/" className="btn teal lighten-2 waves-effect waves-light">
              <i className="material-icons left">login</i>
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
