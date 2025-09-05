import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { enviarDatos } from "../components/api/apiFetch"
import ButtonForm from '../components/buttons/ButtonForm'
import CampoTexto from "../components/formulario/CampoTexto"
// le pasamos las props para poder usarlas 
export function Signup({ setUser }) {

    // Estos son los estados 
    const[usuario, setUsuario] = useState('')
    const[password, setPassword] = useState('')
    const[email, setEmail] = useState('')
    const[passwordRepeat, setPasswordRepeat] = useState('')

    //navegador
    const navigate = useNavigate()

    const[error,setError]= useState(false)
    const[error2,setError2]= useState(false)

    //para que guarde un objeto
    const nuevoUsuario = {
        fullname: usuario,
        email: email,
        password: password
    }

    //Cuando precionemos el boton guarda los datos
    const handleSudmit = (e) => {
        e.preventDefault()
        //Si un campo no esta lleno nos envia un mensaje de error
        if (usuario === '' || password === '') {
            setError(true)
            return
        }
        //Si las contrasenas no coinciden envia un mensaje de error
        if (passwordRepeat !== password ) {
            setError2(true)
            return
        }
        setError(false)

        // Si las contraseñas coinciden, enviamos los datos al servidor
        enviarDatos('/user/signup', nuevoUsuario)
        .then(() => {
            localStorage.setItem('user', JSON.stringify(nuevoUsuario))
            setUser(nuevoUsuario)
            navigate('/home')
        })
        .catch((error) => {
            console.error("Error al registrar:", error)
            alert("Error al registrar el usuario")
        })

    }

    return(
        <div className="row">
            <div className="col s12" style={{ display: "flex", justifyContent:"center" }}>
                <div className="card-panel z-depth-4 " >
                    <h3 className="text-teal lighten-3 center-align">Sign Up</h3>
                        <form className='formulario'
                            onSubmit={handleSudmit}>

                            <CampoTexto 
                            titulo='Name' 
                            required='True' 
                            value={usuario} 
                            placeholder='name' 
                            id='name' 
                            onchange={e=> setUsuario(e.target.value)} 
                            tipo='text'>
                            </CampoTexto>

                            <CampoTexto 
                            titulo='Email' 
                            required='True' 
                            value={email} 
                            placeholder='email' 
                            id='email' 
                            onchange={e=> setEmail(e.target.value)} 
                            tipo='email'>
                            </CampoTexto>

                            <CampoTexto 
                            titulo='Password' 
                            required='True' 
                            value={password} 
                            placeholder='password' 
                            id='password' 
                            onchange={e=> setPassword(e.target.value)} 
                            tipo='password'>
                            </CampoTexto>

                            <CampoTexto 
                            titulo='Password Repeat' 
                            required='True' 
                            value={passwordRepeat} 
                            placeholder='password repeat' 
                            id='password-repeat' 
                            onchange={e=> setPasswordRepeat(e.target.value)} 
                            tipo='password'>
                            </CampoTexto>

                            <ButtonForm 
                            tipo='submit' 
                            titulo='Registrar' 
                            clases='waves-effect waves-light btn' 
                            />
                        </form>
                        {error && <p>Todos los campos son obligatorios</p>}
                        {error2 && <p>Las contraseñas no coinciden</p>}
                </div>
            </div>
        </div>

    ) 
}
export default Signup