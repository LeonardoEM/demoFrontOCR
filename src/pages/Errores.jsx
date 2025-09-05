import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ButtonForm from '../components/buttons/ButtonForm';
import autobusData from './autobucesError.json'; // archivo JSON con los datos

export function Correctos({setUser}) {
  const navigate = useNavigate();
  const [autobuces, setAutobuces] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setAutobuces(autobusData);
    localStorage.setItem('autobuces', JSON.stringify(autobusData));
    setCargado(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/new-autobus'); // ajusta esta ruta si tienes una vista para agregar autobuses
  };

  const columnas = autobuces.length > 0 ? Object.keys(autobuces[0]) : [];

  return (
    <div>
      <div>
        <div className="truncate center-align app" style={{ justifyContent: 'center' }}>
          <h4>Autobuses</h4>
        </div>

        <div className="row" style={{ justifyContent: 'center' }}>
          {cargado && autobuces.length > 0 ? (
            <table className="highlight centered">
              <thead>
                <tr>
                  {columnas.map((col) => (
                    <th key={col}>{col.toUpperCase()}</th>
                  ))}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {autobuces.map((bus, index) => (
                  <tr key={index}>
                    {columnas.map((col) => (
                      <td key={col}>{bus[col]}</td>
                    ))}
                    <td>
                      <ButtonForm tipo="submit" titulo="Editar" clases="btn-small teal" />
                      <ButtonForm tipo="submit" titulo="Eliminar" clases="btn-small red" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se recibió ningún autobús</p>
          )}

          <form className='formulario' onSubmit={handleSubmit}>
            <div className="center-align" style={{ marginTop: '20px' }}>
              <ButtonForm
                tipo='submit'
                titulo='Agregar nuevo Autobús'
                clases='waves-effect waves-light btn'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Correctos;