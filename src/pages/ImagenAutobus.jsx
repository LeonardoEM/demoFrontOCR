import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerAutobusesExitosos } from '../components/api/apiFetch';

export default function ImagenAutobus() {
  const { id } = useParams();
  const [imagen, setImagen] = useState(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    obtenerAutobusesExitosos()
      .then((data) => {
        const bus = data.find(b => b.id === id);
        if (bus && bus.imagenBase64) {
          setImagen(bus.imagenBase64);
        } else {
          console.warn('No se encontró imagen para el ID', id);
        }
        setCargado(true);
      })
      .catch((err) => {
        console.error('Error al obtener autobuses:', err);
        setCargado(true);
      });
  }, [id]);

  return (
    <div className="center-align" style={{ marginTop: '40px' }}>
      {cargado ? (
        imagen ? (
          <img
            src={`data:image/jpeg;base64,${imagen}`}
            alt={`Autobús ${id}`}
            style={{ maxWidth: '500px' }}
          />
        ) : (
          <p>No se encontró imagen para el autobús con ID {id}</p>
        )
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
}
