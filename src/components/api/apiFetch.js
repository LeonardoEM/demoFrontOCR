const BASE_URL = 'http://localhost:8081';




// 🚍 Obtener autobuses con captura exitosa
export async function obtenerAutobusesExitosos() {
  const res = await fetch(`${BASE_URL}/buses-capturas-exitosas`);
  if (!res.ok) throw new Error('Error al obtener capturas exitosas');
  return await res.json();
}

// Obtener autobuses no reconocidos
export async function obtenerAutobusesNoReconocidos() {
  const res = await fetch(`${BASE_URL}/no-reconocidas`);
  if (!res.ok) throw new Error('Error al obtener entradas no reconocidas');
  return await res.json();
}

// 🖼 Obtener imagen base64 por entrada y tipo
export async function obtenerImagen(cve_entrada, tipo) {
  const url = `${BASE_URL}/entradas-imagen?cve_entrada=${cve_entrada}&tipo=${tipo}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Imagen no encontrada');
  const data = await res.json();
  return data.imagen64;
}

// ✏️ Insertar corrección de entrada
export async function insertarCambioEntrada({ cve_entrada, cve_vehiculo, placa, numero_economico, marca }) {
  if (!cve_entrada || !cve_vehiculo || !placa || !numero_economico || !marca) {
    throw new Error('Todos los campos son obligatorios');
  }

  const url = `${BASE_URL}/insert-cambio-entrada?` +
    `cve_entrada=${cve_entrada}&cve_vehiculo=${cve_vehiculo}` +
    `&placa=${encodeURIComponent(placa)}` +
    `&numero_economico=${encodeURIComponent(numero_economico)}` +
    `&marca=${encodeURIComponent(marca)}`;

  const res = await fetch(url);
  if (res.status === 304) throw new Error('No se pudo modificar la entrada');
  if (!res.ok) throw new Error('Error al insertar cambio');
  return res.status === 200;
}

/*
export async function obtenerAutobuses() {
  const res = await fetch('http://localhost:3001/autobuses');
  const data = await res.json();
  return data;
}

export async function agregarAutobus(nuevoAutobus) {
  const res = await fetch('http://localhost:3002/autobuses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoAutobus)
  });
  return await res.json();
}

export async function obtenerImagen(id) {
  const res = await fetch(`http://localhost:3001/imagenes/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error(`Imagen no encontrada para el ID ${id}`);
  }

  const data = await res.json();
  return data.imagenBase64;
}
*/

