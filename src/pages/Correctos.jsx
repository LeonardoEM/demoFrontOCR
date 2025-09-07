import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ButtonForm from '../components/buttons/ButtonForm';
import {
  obtenerAutobusesExitosos,
  obtenerImagen,
  insertarCambioEntrada
} from '../components/api/apiFetch';

export function Correctos({ setUser }) {
  const navigate = useNavigate();
  const [autobuses, setAutobuses] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [nuevoId, setNuevoId] = useState('');
  const [nuevaPlaca, setNuevaPlaca] = useState('');
  const [numeroEconomico, setNumeroEconomico] = useState('');
  const [marcaEconomica, setMarcaEconomica] = useState('');
  const [esReparto, setEsReparto] = useState('No');
  const [imagen, setImagen] = useState(null);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  useEffect(() => {
    obtenerAutobusesExitosos()
      .then((data) => {
        console.log('Datos recibidos:', data);
        setAutobuses(data);
        setCargado(true);
      })
      .catch((err) => {
        console.error('Error al obtener capturas exitosas:', err);
        setCargado(true);
      });
  }, []);

  useEffect(() => {
    if (!idSeleccionado) return;

    // Aquí asumimos que tipo de detección es 1 (puedes adaptarlo según el dato real)
    obtenerImagen(idSeleccionado, 1)
      .then((image64) => {
        setImagen(image64);
        setCargado(true);
      })
      .catch((err) => {
        console.log('La imagen no fue cargada', err);
        setCargado(true);
      });
  }, [idSeleccionado]);

  const columnas = autobuses.length > 0
    ? Object.keys(autobuses[0]).filter(col => col !== 'imagenBase64')
    : [];

  const handleAgregarPlaca = (e) => {
    e.preventDefault();

    const entrada = {
      cve_entrada: parseInt(nuevoId),
      cve_vehiculo: 1, // puedes obtenerlo dinámicamente si lo tienes
      placa: nuevaPlaca,
      numero_economico: esReparto === 'Sí' ? '' : numeroEconomico,
      marca: esReparto === 'Sí' ? '' : marcaEconomica
    };

    insertarCambioEntrada(entrada)
      .then(() => {
        console.log('Corrección enviada correctamente');
        setNuevoId('');
        setNuevaPlaca('');
        setNumeroEconomico('');
        setMarcaEconomica('');
        setEsReparto('No');
      })
      .catch((err) => {
        console.error('Error al insertar corrección:', err);
      });
  };

  return (
    <div>
      <div>
        <div className="truncate center-" style={{ justifyContent: 'center' }}>
          <h4>Autobuses</h4>
        </div>

        <div className="row" style={{ justifyContent: 'center' }}>
          {cargado && autobuses.length > 0 ? (
            <table className="highlight centered">
              <thead>
                <tr>
                  {columnas.map((col) => (
                    <th key={col}>{col.toUpperCase()}</th>
                  ))}
                  <th>Tipo de registro</th>
                </tr>
              </thead>
              <tbody>
                {autobuses.map((bus, index) => (
                  <tr key={index}>
                    {columnas.map((col) => (
                      <td key={`${index}-${col}`}>{bus[col]}</td>
                    ))}
                    <td>
                      <button
                        onClick={() => {
                          setIdSeleccionado(bus.CVE_ENTRADA); // ← usa CVE_ENTRADA del backend
                          navigate(`/imagen-autobus/${bus.CVE_ENTRADA}`);
                        }}
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

          {/* Formulario extendido */}
          <form onSubmit={handleAgregarPlaca} style={{ marginTop: '40px' }}>
            <h5 className="center-align">Registrar corrección de entrada</h5>

            <div className="input-field">
              <input
                type="number"
                value={nuevoId}
                onChange={(e) => setNuevoId(e.target.value)}
                placeholder="CVE_ENTRADA"
                required
              />
            </div>

            <div className="input-field">
              <input
                type="text"
                value={nuevaPlaca}
                onChange={(e) => setNuevaPlaca(e.target.value)}
                placeholder="Placa detectada"
                required
              />
            </div>

            <div className="input-field">
              <label style={{ display: 'block', marginBottom: '8px' }}>¿Es de reparto?</label>
              <select
                value={esReparto}
                onChange={(e) => setEsReparto(e.target.value)}
                className="browser-default"
                required
              >
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>
            </div>

            <div className="input-field">
              <input
                type="text"
                value={numeroEconomico}
                onChange={(e) => setNumeroEconomico(e.target.value)}
                placeholder="Número económico"
                disabled={esReparto === 'Sí'}
                required={esReparto === 'No'}
                style={esReparto === 'Sí' ? { backgroundColor: '#f0f0f0' } : {}}
              />
            </div>

            <div className="input-field">
              <input
                type="text"
                value={marcaEconomica}
                onChange={(e) => setMarcaEconomica(e.target.value)}
                placeholder="Marca económica"
                disabled={esReparto === 'Sí'}
                required={esReparto === 'No'}
                style={esReparto === 'Sí' ? { backgroundColor: '#f0f0f0' } : {}}
              />
            </div>

            <div className="center-align">
              <ButtonForm
                tipo="submit"
                titulo="Enviar corrección"
                clases="waves-effect waves-light btn green"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Correctos;



/*
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ButtonForm from '../components/buttons/ButtonForm';
//import autobusData from './autobuces.json';
import { obtenerAutobuses, agregarAutobus, obtenerImagen  } from '../components/api/apiFetch';

export function Correctos({ setUser }) {
  const navigate = useNavigate();
  const [autobuses, setAutobuses] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [nuevoId, setNuevoId] = useState('');
  const [nuevaPlaca, setNuevaPlaca] = useState('');
  const [numeroEconomico, setNumeroEconomico] = useState('');
  const [marcaEconomica, setMarcaEconomica] = useState('');
  const [esReparto, setEsReparto] = useState('No');
  const [imagen, setImagen] = useState(null);
  const [idSeleccionado, setIdSeleccionado] = useState(null);


  useEffect(() => {
  obtenerAutobuses()
    .then((data) => {
      console.log('Datos recibidos:', data);
      setAutobuses(data);
      setCargado(true); // ← esto es clave para que se renderice la tabla
    })
    .catch((err) => {
      console.error('Error al obtener autobuses:', err);
      setCargado(true); // evita que se quede en blanco si falla
    });
  }, []);

  useEffect(()=>{
    obtenerImagen(idSeleccionado)
    .then((image64)=> {
      setImagen(image64);
      setCargado(true);
    })
    .catch((err)=> {
      console.log('la imagen no fue cargada', err);
      setCargado(true);
    });
  }, [idSeleccionado])
  

  
  const columnas = autobuses.length > 0
  ? Object.keys(autobuses[0]).filter(col => col !== 'imagenBase64')
  : [];


  const handleAgregarPlaca = (e) => {
    e.preventDefault();
    const nuevoAutobus = {
      id: parseInt(nuevoId),
      placa: nuevaPlaca,
      numeroEconomico: esReparto === 'Sí' ? '' : numeroEconomico,
      marcaEconomica: esReparto === 'Sí' ? '' : marcaEconomica,
      esReparto: esReparto
    };

    agregarAutobus(nuevoAutobus)
    .then((data) => {
      console.log('Autobús enviado:', data);
      setAutobuses(prev => [...prev, data]);
      setNuevoId('');
      setNuevaPlaca('');
      setNumeroEconomico('');
      setMarcaEconomica('');
      setEsReparto('No');
    })
    .catch(err => console.error('Error al enviar:', err));

  };

  return (
    <div>
      <div>
        <div className="truncate center-" style={{ justifyContent: 'center' }}>
          <h4>Autobuses</h4>
        </div>

        <div className="row" style={{ justifyContent: 'center' }}>
          {cargado && autobuses.length > 0 ? (
            <table className="highlight centered">
              <thead>
                <tr>
                  {columnas.map((col) => (
                    <th key={col}>{col.toUpperCase()}</th>
                  ))}
                  <th>Tipo de registro</th>
                </tr>
              </thead>
              <tbody>
                {autobuses.map((bus, index) => (
                  <tr key={index}>
                    {columnas.map((col) => (
                      <td key={`${index}-${col}`}>{bus[col]}</td>
                    ))}
                    <td>
                      <button
                        onClick={() => {
                        setIdSeleccionado(bus.id);
                        navigate(`/imagen-autobus/${bus.id}`)  
                        }}
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

          
          <form onSubmit={handleAgregarPlaca} style={{ marginTop: '40px' }}>
            <h5 className="center-align">Registrar datos del autobús</h5>

            <div className="input-field">
              <input
                type="number"
                value={nuevoId}
                onChange={(e) => setNuevoId(e.target.value)}
                placeholder="ID del autobús"
                required
              />
            </div>

            <div className="input-field">
              <input
                type="text"
                value={nuevaPlaca}
                onChange={(e) => setNuevaPlaca(e.target.value)}
                placeholder="Placa del autobús"
                required
              />
            </div>

            <div className="input-field">
              <label style={{ display: 'block', marginBottom: '8px' }}>¿Es de reparto?</label>
              <select
                value={esReparto}
                onChange={(e) => setEsReparto(e.target.value)}
                className="browser-default"
                required
              >
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>
            </div>


            <div className="input-field">
              <input
                type="text"
                value={numeroEconomico}
                onChange={(e) => setNumeroEconomico(e.target.value)}
                placeholder="Número económico"
                disabled={esReparto === 'Sí'}
                required={esReparto === 'No'}
                style={esReparto === 'Sí' ? { backgroundColor: '#f0f0f0' } : {}}
              />
            </div>

            <div className="input-field">
              <input
                type="text"
                value={marcaEconomica}
                onChange={(e) => setMarcaEconomica(e.target.value)}
                placeholder="Marca económica"
                disabled={esReparto === 'Sí'}
                required={esReparto === 'No'}
                style={esReparto === 'Sí' ? { backgroundColor: '#f0f0f0' } : {}}
              />
            </div>

            <div className="center-align">
              <ButtonForm
                tipo="submit"
                titulo="Enviar datos"
                clases="waves-effect waves-light btn green"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Correctos;*/
