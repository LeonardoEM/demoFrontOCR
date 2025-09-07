import './App.css'
import './materialize.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import{ Login } from './pages/Login'
import{ Home } from './pages/Home'
//import{ Signup } from './pages/Signup'
import Correctos  from './pages/Correctos'
import Errores  from './pages/Errores'
import Header from './components/Header'
import ImagenAutobus from './pages/ImagenAutobus';

//import Footer from './components/Footer'
//import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'


function App() {
  const[user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null
  })

  return (
    <div className="App">
      <Router>
        <Header user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Login setUser={setUser}/>}/>
          <Route path="/home" element={<Home user={user} setUser={setUser} />} />
          <Route path='/Correctos' element={<Correctos setUser={setUser}/>}/>
          <Route path='/Errores' element={<Errores setUser={setUser}/>}/>
          <Route path="/imagen-autobus/:id" element={<ImagenAutobus />} />
        </Routes>
      {/* <Footer/>}*/}
      </Router>
      
    </div>
  );
}

export default App;
