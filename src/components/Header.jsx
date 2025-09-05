import { Link } from 'react-router-dom'
import logo from '../assets/logo_tapo.png'

export function Header({ user }) {
  return (
    <header className='header '>
      <nav>
        <div className="nav-wrapper teal lighten-2">
          <Link to="/" className="brand-logo">
            <img
              src={logo}
              alt="Logo SAIF"
              style={{ height: '50px', verticalAlign: 'left', marginRight: '12px' }}
            />
            
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {!user && <li><Link to="/">Login</Link></li>}
            {!user && <li><Link to="/signup">Signup</Link></li>}
            {user && <li><Link to="/home">Home</Link></li>}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header