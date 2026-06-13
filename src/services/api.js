// obtener datos de la URL
export function getData(URL) {
  return fetch(URL)
    .then(response => {
      // Manejo de errores idéntico al documento del profesor
      if (!response.ok) throw new Error('Error al cargar datos');
      return response.json();
    }); 
}