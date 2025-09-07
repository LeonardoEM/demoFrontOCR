import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ButtonForm from '../components/buttons/ButtonForm';

export function Errores({ setUser }) {
  const navigate = useNavigate();
  const [autobuces, setAutobuces] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3002/autobuses2')
      .then((res) => res.json())
      .then((data) => {
        setAutobuces(data);
        localStorage.setItem('autobuces', JSON.stringify(data));
        setCargado(true);
      })
      .catch((err) => {
        console.error('Error al obtener autobuses2:', err);
        setCargado(true);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/new-autobus');
  };

  const columnas = autobuces.length > 0
    ? Object.keys(autobuces[0]).filter(col => col !== 'imagenBase64')
    : [];

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
                      <td key={`${index}-${col}`}>{bus[col]}</td>
                    ))}
                    <td>
                      <button
                        onClick={() => navigate(`/imagen-autobus/${bus.id}`)}
                        className="btn-small blue"
                      >
                        Ver imagen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se recibió ningún autobús</p>
          )}

          
        </div>
      </div>
    </div>
  );
}

export default Errores;


/*import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ButtonForm from '../components/buttons/ButtonForm';
import autobusData from './autobucesError.json'; // archivo JSON con los datos

export function Errores({ setUser }) {
  const navigate = useNavigate();
  const [autobuces, setAutobuces] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [idEditar, setIdEditar] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('');

  useEffect(() => {
    setAutobuces(autobusData);
    localStorage.setItem('autobuces', JSON.stringify(autobusData));
    setCargado(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/new-autobus');
  };

  const columnas = autobuces.length > 0 ? Object.keys(autobuces[0]) : [];

  const handleEstadoChange = (e) => {
    e.preventDefault();
    const idNum = parseInt(idEditar);
    const actualizado = autobuces.map((bus) =>
      bus.id === idNum ? { ...bus, estado: nuevoEstado } : bus
    );
    setAutobuces(actualizado);
    localStorage.setItem('autobuces', JSON.stringify(actualizado));
    setIdEditar('');
    setNuevoEstado('');
  };

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
                      <td key={`${index}-${col}`}>{bus[col]}</td>
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

         
          <form onSubmit={handleEstadoChange} style={{ marginTop: '40px' }}>
            <h5 className="center-align">Cambiar estado de autobús</h5>
            <div className="input-field">
              <input
                type="number"
                value={idEditar}
                onChange={(e) => setIdEditar(e.target.value)}
                placeholder="ID del autobús"
                required
              />
            </div>
            <div className="input-field">
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                required
              >
                <option value="" disabled>Selecciona nuevo estado</option>
                <option value="Activo">Activo</option>
                <option value="Disponible">Disponible</option>
                <option value="En mantenimiento">En mantenimiento</option>
              </select>
            </div>
            <div className="center-align">
              <ButtonForm
                tipo="submit"
                titulo="Actualizar estado"
                clases="waves-effect waves-light btn green"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Errores;
*/

