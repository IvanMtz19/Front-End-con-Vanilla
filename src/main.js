import { getData, postData } from './services/api.js';

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
        <p class="w3-large">Selecciona una opción en el menú superior para explorar y guardar datos en tiempo real.</p>
        <div class="w3-panel w3-leftbar w3-border-indigo w3-pale-blue w3-padding">
          <p><i>💡 Tip: En las secciones de Posts y Todos puedes realizar pruebas de ESCRITURA (POST) hacia la API.</i></p>
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

// --- Vistas Dinámicas (Lectura y Escritura) ---

const renderPosts = () => {
  appDiv.innerHTML = '<div class="w3-center w3-padding-32"><h3>Cargando posts...</h3></div>';
  
  getData('https://jsonplaceholder.typicode.com/posts?_limit=15')
    .then(posts => {
      let dataTable = posts.map(item => `
        <tr>
          <td>${item.id}</td>
          <td style="text-transform: capitalize;"><b>${item.title}</b></td>
          <td>${item.body}</td>
        </tr>
      `).join('');
      
      appDiv.innerHTML = `
        <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom w3-padding-16">
          <div class="w3-container">
            <h4 class="w3-text-indigo"><i class="bi bi-pencil-square"></i> Crear nuevo Post</h4>
            <div class="w3-row-padding" style="margin:0 -16px;">
              <div class="w3-half w3-margin-bottom">
                <input id="post-title" class="w3-input w3-border w3-round" type="text" placeholder="Escribe el título">
              </div>
              <div class="w3-half w3-margin-bottom">
                <input id="post-body" class="w3-input w3-border w3-round" type="text" placeholder="Escribe el contenido">
              </div>
            </div>
            <button id="btn-save-post" class="w3-button w3-indigo w3-round w3-hover-blue"><i class="bi bi-cloud-arrow-up-fill"></i> Guardar Post</button>
            <span id="msg-post" class="w3-margin-left w3-bold"></span>
          </div>
        </div>

        <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom">
          <header class="w3-container w3-indigo w3-round-top">
            <h2>Lista de Posts</h2>
          </header>
          <div class="w3-responsive">
            <table class="w3-table-all w3-hoverable">
              <thead><tr class="w3-light-grey"><th>ID</th><th>Título</th><th>Contenido</th></tr></thead>
              <tbody id="posts-tbody">${dataTable}</tbody>
            </table>
          </div>
        </div>
      `;

      // Evento de guardado POSTS
      document.querySelector('#btn-save-post').addEventListener('click', () => {
        const title = document.querySelector('#post-title').value;
        const body = document.querySelector('#post-body').value;
        const msg = document.querySelector('#msg-post');
        
        if(!title || !body) {
          msg.className = 'w3-margin-left w3-text-red';
          msg.innerText = 'Llenar ambos campos.'; return;
        }

        msg.className = 'w3-margin-left w3-text-blue';
        msg.innerText = 'Guardando...';

        postData('https://jsonplaceholder.typicode.com/posts', { title, body, userId: 1 })
          .then(res => {
            msg.className = 'w3-margin-left w3-text-green';
            msg.innerHTML = `<i class="bi bi-check-circle-fill"></i> ¡Éxito! Post creado con ID: ${res.id}`;
            document.querySelector('#post-title').value = '';
            document.querySelector('#post-body').value = '';

            // --- TRUCO VISUAL: Insertar el nuevo dato en la tabla ---
            const tbody = document.querySelector('#posts-tbody');
            const newRow = `
              <tr class="w3-pale-green w3-animate-top">
                <td><b>${res.id}</b></td>
                <td style="text-transform: capitalize;"><b>${res.title}</b> <span class="w3-badge w3-green w3-small">Nuevo</span></td>
                <td>${res.body}</td>
              </tr>
            `;
            tbody.insertAdjacentHTML('afterbegin', newRow);
          })
          .catch(err => {
            msg.className = 'w3-margin-left w3-text-red';
            msg.innerText = 'Error al guardar.';
          });
      });
    })
    .catch(error => {
      appDiv.innerHTML = `<div class="w3-panel w3-red w3-round"><h3>Error</h3><p>No se pudieron cargar los datos.</p></div>`;
    });
};

const renderTodos = () => {
  appDiv.innerHTML = '<div class="w3-center w3-padding-32"><h3>Cargando tareas...</h3></div>';
  
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
        <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom w3-padding-16">
          <div class="w3-container">
            <h4 class="w3-text-indigo"><i class="bi bi-plus-square"></i> Agregar nueva Tarea</h4>
            <div class="w3-row-padding" style="margin:0 -16px;">
              <div class="w3-col s9 w3-margin-bottom">
                <input id="todo-title" class="w3-input w3-border w3-round" type="text" placeholder="¿Qué necesitas hacer?">
              </div>
              <div class="w3-col s3">
                <button id="btn-save-todo" class="w3-button w3-indigo w3-round w3-hover-blue w3-block"><i class="bi bi-plus-circle"></i> Agregar</button>
              </div>
            </div>
            <span id="msg-todo" class="w3-bold"></span>
          </div>
        </div>

        <div class="w3-card-4 w3-white w3-round w3-animate-opacity w3-margin-bottom">
          <header class="w3-container w3-indigo w3-round-top">
            <h2>Lista de Todos (Tareas)</h2>
          </header>
          <div class="w3-responsive">
            <table class="w3-table-all w3-hoverable">
              <thead><tr class="w3-light-grey"><th>ID</th><th>Tarea</th><th>Estado</th></tr></thead>
              <tbody id="todos-tbody">${dataTable}</tbody>
            </table>
          </div>
        </div>
      `;

      // Evento de guardado TODOS
      document.querySelector('#btn-save-todo').addEventListener('click', () => {
        const title = document.querySelector('#todo-title').value;
        const msg = document.querySelector('#msg-todo');
        
        if(!title) {
          msg.className = 'w3-text-red';
          msg.innerText = 'Escribe una tarea.'; return;
        }

        msg.className = 'w3-text-blue';
        msg.innerText = 'Guardando...';

        postData('https://jsonplaceholder.typicode.com/todos', { title, completed: false, userId: 1 })
          .then(res => {
            msg.className = 'w3-text-green';
            msg.innerHTML = `<i class="bi bi-check-circle-fill"></i> Tarea agregada con ID: ${res.id}`;
            document.querySelector('#todo-title').value = '';

            // --- TRUCO VISUAL: Insertar el nuevo dato en la tabla ---
            const tbody = document.querySelector('#todos-tbody');
            const newRow = `
              <tr class="w3-pale-green w3-animate-top">
                <td><b>${res.id}</b></td>
                <td>${res.title} <span class="w3-badge w3-green w3-small">Nuevo</span></td>
                <td><span class="w3-tag w3-red w3-round">Pendiente</span></td>
              </tr>
            `;
            tbody.insertAdjacentHTML('afterbegin', newRow);
          })
          .catch(err => {
            msg.className = 'w3-text-red';
            msg.innerText = 'Error al guardar.';
          });
      });
    })
    .catch(error => {
      appDiv.innerHTML = `<div class="w3-panel w3-red w3-round"><h3>Error</h3><p>No se pudieron cargar los datos.</p></div>`;
    });
};

const renderUsers = () => {
  appDiv.innerHTML = '<div class="w3-center w3-padding-32"><h3>Cargando usuarios...</h3></div>';
  getData('https://jsonplaceholder.typicode.com/users')
    .then(users => {
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