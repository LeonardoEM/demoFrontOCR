const baseURL = 'http://localhost:8082';

export const obtenerDatos = async (url, setData) => {
  try {
    const res = await fetch(`${baseURL}${url}`);
    if (!res.ok) throw new Error('Error al consultar los datos');
    const data = await res.json();
    setData(data);
  } catch (error) {
    alert('Obtener Datos. Error al consultar los datos: ' + error.message);
  }
};

export const enviarDatos = async (url, datos) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!res.ok) throw new Error('Error al actualizar los datos');
    const data = await res.json();
    alert('Enviar datos. Datos actualizados correctamente');
    console.log('Respuesta del servidor:', data);
    return data;
  } catch (error) {
    alert('Enviar datos. Error al actualizar los datos: ' + error.message);
    throw error;
  }
};

export const actualizarDatos = async (url, datos) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!res.ok) throw new Error('Error al actualizar los datos');
    const data = await res.json();
    alert('Datos actualizados correctamente');
    console.log('Respuesta del servidor:', data);
    return data;
  } catch (error) {
    alert('Actualizar datos. Error al actualizar los datos: ' + error.message);
    throw error;
  }
};

export const eliminarDatos = async (url) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar los datos');
    console.log(`Elemento eliminado: ${baseURL}${url}`);
  } catch (error) {
    alert('Eliminar datos. Error al eliminar los datos: ' + error.message);
  }
};

export const obtenerRoles = async (url) => {
  try {
    const res = await fetch(`${baseURL}${url}`, {
      method: 'GET'
    });
    if (!res.ok) throw new Error('Obtener Roles. Error al actualizar los datos');
    const roles = await res.json();
    //alert('Obtener Roles. Datos actualizados correctamente');
    //console.log('Obtener Roles. Respuesta del servidor:', roles);
    return roles;
  } catch (error) {
    alert('Obtener Roless. Error al actualizar los datos: ' + error.message);
    throw error;
  }
};