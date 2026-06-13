import { getData } from './services/api.js';

const appDiv = document.querySelector('#app');

// Función para resaltar la pestaña activa en el menú
const setActiveButton = (idActivo) => {
  document.querySelectorAll('.w3-bar-item').forEach(btn => btn.classList.remove('w3-black'));
  document.querySelector(idActivo).classList.add('w3-black');
};

// --- Vistas Estáticas ---
const renderHome = () => {
  appDiv.innerHTML = `
    <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom">
      <header class="w3-container w3-indigo w3-round-top w3-center w3-padding-16">
        <h2>¡Bienvenido a nuestra SPA!</h2>
      </header>
      <div class="w3-container w3-padding-32 w3-center">
        <p class="w3-large">Selecciona una opción en el menú superior para empezar a explorar los datos traídos desde internet en tiempo real.</p>
        <div class="w3-panel w3-leftbar w3-border-indigo w3-pale-blue w3-padding">
          <p><i>💡 Tip: Navega entre las pestañas para ver cómo los datos se cargan dinámicamente con fetch() sin recargar la página.</i></p>
        </div>
      </div>
    </div>
  `;
};

const renderAbout = () => {
  appDiv.innerHTML = `
    <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-center w3-padding-32">
      <h2 class="w3-text-indigo">Acerca del Proyecto</h2>
      <hr style="width:50%; margin:auto;">
      <p class="w3-margin-top">Este proyecto consume datos de la API <b>JSONPlaceholder</b> utilizando <code>fetch()</code> nativo.</p>
      <p>Desarrollado con <b>Vite</b>, diseño responsivo implementando <b>W3.CSS</b> y construido en Vanilla JS.</p>
    </div>
  `;
};

// --- Vistas Dinámicas (Tablas) ---
const renderPosts = () => {
  appDiv.innerHTML = '<div class="w3-center w3-padding-32"><h3>Cargando posts...</h3></div>';
  // Limitamos a 15 para no mostrar 100 de golpe
  getData('https://jsonplaceholder.typicode.com/posts?_limit=15')
    .then(posts => {
      // Estructura exacta solicitada por el profesor (.map y .join)
      let dataTable = posts.map(item => `
        <tr>
          <td>${item.id}</td>
          <td style="text-transform: capitalize;"><b>${item.title}</b></td>
          <td>${item.body}</td>
        </tr>
      `).join('');
      
      appDiv.innerHTML = `
        <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom">
          <header class="w3-container w3-indigo w3-round-top">
            <h2>Lista de Posts</h2>
          </header>
          <div class="w3-responsive">
            <table class="w3-table-all w3-hoverable">
              <thead><tr class="w3-light-grey"><th>ID</th><th>Título</th><th>Contenido</th></tr></thead>
              <tbody>${dataTable}</tbody>
            </table>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      appDiv.innerHTML = `<div class="w3-panel w3-red w3-round"><h3>Error</h3><p>No se pudieron cargar los datos.</p></div>`;
    });
};

const renderTodos = () => {
  appDiv.innerHTML = '<div class="w3-center w3-padding-32"><h3>Cargando tareas...</h3></div>';
  // Limitamos a 15
  getData('https://jsonplaceholder.typicode.com/todos?_limit=15')
    .then(todos => {
      let dataTable = todos.map(item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.completed ? '<span class="w3-tag w3-green w3-round">Completado</span>' : '<span class="w3-tag w3-red w3-round">Pendiente</span>'}</td>
        </tr>
      `).join('');
      
      appDiv.innerHTML = `
        <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom">
          <header class="w3-container w3-indigo w3-round-top">
            <h2>Lista de Todos (Tareas)</h2>
          </header>
          <div class="w3-responsive">
            <table class="w3-table-all w3-hoverable">
              <thead><tr class="w3-light-grey"><th>ID</th><th>Tarea</th><th>Estado</th></tr></thead>
              <tbody>${dataTable}</tbody>
            </table>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      appDiv.innerHTML = `<div class="w3-panel w3-red w3-round"><h3>Error</h3><p>No se pudieron cargar los datos.</p></div>`;
    });
};

const renderUsers = () => {
  appDiv.innerHTML = '<div class="w3-center w3-padding-32"><h3>Cargando usuarios...</h3></div>';
  getData('https://jsonplaceholder.typicode.com/users')
    .then(users => {
      // Cumpliendo el Ejercicio #1 del PDF: Mostrar Ciudad y Compañía
      let dataTable = users.map(item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.username}</td>
          <td>${item.email}</td>
          <td>${item.address.city}</td>
          <td>${item.company.name}</td>
        </tr>
      `).join('');
      
      appDiv.innerHTML = `
        <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom">
          <header class="w3-container w3-indigo w3-round-top">
            <h2>Lista de Usuarios</h2>
          </header>
          <div class="w3-responsive">
            <table class="w3-table-all w3-hoverable">
              <thead><tr class="w3-light-grey"><th>ID</th><th>Nombre</th><th>Usuario</th><th>Email</th><th>Ciudad</th><th>Compañía</th></tr></thead>
              <tbody>${dataTable}</tbody>
            </table>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      appDiv.innerHTML = `<div class="w3-panel w3-red w3-round"><h3>Error</h3><p>No se pudieron cargar los datos.</p></div>`;
    });
};

// --- Asignar eventos de clic al menú ---
document.querySelector('#nav-home').addEventListener('click', () => { renderHome(); setActiveButton('#nav-home'); });
document.querySelector('#nav-posts').addEventListener('click', () => { renderPosts(); setActiveButton('#nav-posts'); });
document.querySelector('#nav-todos').addEventListener('click', () => { renderTodos(); setActiveButton('#nav-todos'); });
document.querySelector('#nav-users').addEventListener('click', () => { renderUsers(); setActiveButton('#nav-users'); });
document.querySelector('#nav-about').addEventListener('click', () => { renderAbout(); setActiveButton('#nav-about'); });

// Cargar Home por defecto
renderHome();