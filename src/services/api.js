// Obtener datos de la URL (Lectura - GET)
export function getData(URL) {
  return fetch(URL)
    .then(response => {
      if (!response.ok) throw new Error('Error al cargar datos');
      return response.json();
    }); 
}

// (Escritura - POST)
export function postData(URL, data) {
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(response => {
    if (!response.ok) throw new Error('Error al guardar datos');
    return response.json();
  });
}