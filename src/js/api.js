/* =====================================================
   NEXUS Frontend — src/js/api.js
   Reemplaza los datos estáticos de app.js con
   llamadas reales a la API de Node.js
   ===================================================== */

const API_URL = 'http://localhost:3001/api';

/* --------------------------------------------------
   Helpers de fetch
   -------------------------------------------------- */
function getToken() {
  return localStorage.getItem('nexus_token') || sessionStorage.getItem('nexus_token');
}

async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    // Token expirado → redirigir al login
    if (res.status === 401 || res.status === 403) {
      sessionStorage.removeItem('nexus_token');
      sessionStorage.removeItem('nexus_user');
      window.location.href = 'login.html';
    }
    throw new Error(data.error || `Error ${res.status}`);
  }

  return data;
}

/* --------------------------------------------------
   AUTH
   -------------------------------------------------- */
async function apiLogin(username, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  // Guardar token y usuario en sesión
  sessionStorage.setItem('nexus_token', data.token);
  sessionStorage.setItem('nexus_user', JSON.stringify(data.usuario));
  localStorage.setItem('nexus_token', data.token);
  localStorage.setItem('nexus_user', JSON.stringify(data.usuario));
  return data.usuario;
}

function apiGetCurrentUser() {
  const raw = sessionStorage.getItem('nexus_user');
  return raw ? JSON.parse(raw) : null;
}

/* --------------------------------------------------
   DASHBOARD
   -------------------------------------------------- */
async function apiGetDashboard() {
  const data = await apiFetch('/dashboard');
  return data.data;
}

/* --------------------------------------------------
   CASOS
   -------------------------------------------------- */
async function apiGetCasos(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await apiFetch(`/casos${qs ? '?' + qs : ''}`);
  return data.data;
}

async function apiGetCaso(id) {
  const data = await apiFetch(`/casos/${id}`);
  return data.data;
}

/* --------------------------------------------------
   DETECTIVES
   -------------------------------------------------- */
async function apiGetDetectives(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await apiFetch(`/detectives${qs ? '?' + qs : ''}`);
  return data.data;
}

async function apiGetDetective(id) {
  const data = await apiFetch(`/detectives/${id}`);
  return data.data;
}

/* --------------------------------------------------
   CRIMINALES
   -------------------------------------------------- */
async function apiGetCriminales(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await apiFetch(`/criminales${qs ? '?' + qs : ''}`);
  return data.data;
}

async function apiGetCriminal(id) {
  const data = await apiFetch(`/criminales/${id}`);
  return data.data;
}

/* --------------------------------------------------
   EVIDENCIAS
   -------------------------------------------------- */
async function apiGetEvidencias(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await apiFetch(`/evidencias${qs ? '?' + qs : ''}`);
  return data.data;
}

/* --------------------------------------------------
   LOADER — spinner mientras carga la API
   -------------------------------------------------- */
function mostrarLoader(container, mensaje = '// cargando datos...') {
  if (typeof container === 'string') {
    container = document.getElementById(container);
  }
  if (container) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--text3);font-family:var(--mono);font-size:.72rem;">
        <div style="width:24px;height:24px;border:2px solid var(--cyan3);border-top-color:var(--cyan);
                    border-radius:50%;animation:spinSlow .8s linear infinite;margin:0 auto .8rem;"></div>
        ${mensaje}
      </div>`;
  }
}

function mostrarError(container, msg = '// error al conectar con la API') {
  if (typeof container === 'string') container = document.getElementById(container);
  if (container) {
    container.innerHTML = `
      <div style="text-align:center;padding:2rem;color:#f87171;font-family:var(--mono);font-size:.7rem;">
        <i class="ti ti-alert-circle" style="font-size:1.5rem;display:block;margin-bottom:.5rem;"></i>
        ${msg}<br>
        <span style="font-size:.58rem;color:var(--text3);margin-top:.4rem;display:block;">
          Verifica que el servidor Node.js esté corriendo en localhost:3001
        </span>
      </div>`;
  }
}
