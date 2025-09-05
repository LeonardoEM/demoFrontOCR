import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { enviarDatos } from '../components/api/apiFetch'
import ButtonForm from '../components/buttons/ButtonForm'
import CampoTexto from "../components/formulario/CampoTexto"

export function Login({ setUser }) {

    // Estados del formulario
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorCampos, setErrorCampos] = useState(false)
    const [errorCredenciales, setErrorCredenciales] = useState(false)
    const navigate = useNavigate()

    // Verificar si ya hay un usuario loggeado
    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        if (savedUser && token) {
            // Si ya hay un usuario loggeado, redirige al home
            navigate('/home')
        }
    }, [navigate])

    // Maneja el envío del formulario
    /*const handleSudmit = (e) => {
        e.preventDefault()
        setErrorCampos(false)
        setErrorCredenciales(false)

        // Validación de campos vacíos
        if (email === '' || password === '') {
            setErrorCampos(true)
            return
        }

        const datosLogin = {
            email: email,
            password: password
        }

        // Enviar datos al backend
        enviarDatos('/user/login', datosLogin)
            .then((data) => {
                if (!data.access_token) {
                    setErrorCredenciales(true)
                } else {
                    // Guardar token y información del usuario
                    localStorage.setItem('token', data.access_token)
                    const userData = { 
                        email: email,
                        name: email.split('@')[0] // Extrae el nombre del email como fallback
                    }
                    localStorage.setItem('user', JSON.stringify(userData))
                    setUser(userData)
                    navigate('/home')
                }
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error)
                setErrorCredenciales(true)
            })
    }*/
   const handleSudmit = (e) => {
    e.preventDefault()
    setErrorCampos(false)
    setErrorCredenciales(false)

    // Validación de campos vacíos
    if (email === '' || password === '') {
        setErrorCampos(true)
        return
    }

    // Simulación de login exitoso para desarrollo
    const userData = {
        email: email,
        name: email.split('@')[0]
    }
    localStorage.setItem('token', 'fake-token-dev') // Token ficticio
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    navigate('/home') // Redirección inmediata
}


    return (
        // Centrado vertical y horizontal con Materialize y Flexbox
        <div className="row login-container">
            <div className="col s12" style={{ display: "flex", justifyContent: "center", paddingTop: "250px", paddingBottom: "250px" }}>
                <div className="card-panel z-depth-4">
                    <i className="large material-icons">Acceso Casetas</i>
                    {/* Formulario con grupos para simetría */}
                    <form className='formulario' onSubmit={handleSudmit}>
                        {/* Grupo Email */}
                        <div className="form-group">
                            <CampoTexto
                                titulo='Email'
                                required='True'
                                value={email}
                                placeholder='Email'
                                id='email'
                                onchange={e => setEmail(e.target.value)}
                                tipo='text'
                            />
                        </div>
                        {/* Grupo Password */}
                        <div className="form-group">
                            <CampoTexto
                                titulo='Password'
                                required='True'
                                value={password}
                                placeholder='Password'
                                id='password'
                                onchange={e => setPassword(e.target.value)}
                                tipo='password'
                            />
                        </div>
                        {/* Grupo Botón */}
                        <div className="form-group">
                            <ButtonForm
                                tipo='submit'
                                titulo='Iniciar Sesión'
                                clases='waves-effect waves-light btn'
                            />
                        </div>
                    </form>
                    {/* Mensajes de error */}
                    {errorCampos && <p>Todos los campos son obligatorios</p>}
                    {errorCredenciales && <p>Email o contraseña incorrectos</p>}
                </div>
            </div>
        </div>
    )
}

export default Login