import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="page-footer teal lighten-2 footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Casetas</h5>
            <p className="grey-text text-lighten-4">
              Marca registrada por ADO
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><Link className="grey-text text-lighten-3" to="/">Login</Link></li>
              <li><Link className="grey-text text-lighten-3" to="/signup">Signup</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Copyright Saif S.A. de C.V.
        </div>
      </div>
    </footer>
  )
}

export default Footer
