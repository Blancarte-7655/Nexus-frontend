/* =====================================================
   NEXUS Frontend — src/js/api.js
   Versión con CRUD completo
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
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('nexus_token');
      sessionStorage.removeItem('nexus_token');
      window.location.href = 'login.html';
    }
    throw new Error(data.error || `Error ${res.status}`);
  }
  return data;
}

/* Fetch para subida de archivos (sin Content-Type para que el browser ponga multipart) */
async function apiFetchForm(endpoint, formData) {
  const token = getToken();
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

/* --------------------------------------------------
   AUTH
   -------------------------------------------------- */
async function apiLogin(username, password) {
  const data = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
  localStorage.setItem('nexus_token', data.token);
  localStorage.setItem('nexus_user', JSON.stringify(data.usuario));
  sessionStorage.setItem('nexus_token', data.token);
  sessionStorage.setItem('nexus_user', JSON.stringify(data.usuario));
  return data.usuario;
}

/* --------------------------------------------------
   CATÁLOGOS (para formularios)
   -------------------------------------------------- */
async function apiGetCatalogos() {
  const data = await apiFetch('/catalogos');
  return data.data;
}

/* --------------------------------------------------
   DASHBOARD
   -------------------------------------------------- */
async function apiGetDashboard() {
  const data = await apiFetch('/dashboard');
  return data.data;
}

/* --------------------------------------------------
   CASOS — CRUD
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

async function apiCrearCaso(payload) {
  const data = await apiFetch('/casos', { method: 'POST', body: JSON.stringify(payload) });
  return data;
}

async function apiEditarCaso(id, payload) {
  const data = await apiFetch(`/casos/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  return data;
}

async function apiCambiarEstadoCaso(id, id_estado) {
  const data = await apiFetch(`/casos/${id}/estado`, { method: 'PUT', body: JSON.stringify({ id_estado }) });
  return data;
}

async function apiEliminarCaso(id) {
  const data = await apiFetch(`/casos/${id}`, { method: 'DELETE' });
  return data;
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

async function apiCrearDetective(payload) {
  const data = await apiFetch('/detectives', { method: 'POST', body: JSON.stringify(payload) });
  return data;
}

/* --------------------------------------------------
   CRIMINALES — CRUD
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

async function apiCrearCriminal(payload) {
  const data = await apiFetch('/criminales', { method: 'POST', body: JSON.stringify(payload) });
  return data;
}

async function apiEditarCriminal(id, payload) {
  const data = await apiFetch(`/criminales/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  return data;
}

async function apiEliminarCriminal(id) {
  const data = await apiFetch(`/criminales/${id}`, { method: 'DELETE' });
  return data;
}

/* --------------------------------------------------
   EVIDENCIAS — con subida de archivos
   -------------------------------------------------- */
async function apiGetEvidencias(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const data = await apiFetch(`/evidencias${qs ? '?' + qs : ''}`);
  return data.data;
}

async function apiCrearEvidencia(id_caso, tipo, descripcion, archivo = null) {
  const form = new FormData();
  form.append('id_caso', id_caso);
  form.append('tipo', tipo);
  form.append('descripcion', descripcion);
  if (archivo) form.append('archivo', archivo);
  return apiFetchForm('/evidencias', form);
}

async function apiEliminarEvidencia(id) {
  const data = await apiFetch(`/evidencias/${id}`, { method: 'DELETE' });
  return data;
}

/* --------------------------------------------------
   LOADERS
   -------------------------------------------------- */
function mostrarLoader(container, mensaje = '// cargando datos...') {
  if (typeof container === 'string') container = document.getElementById(container);
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

/* --------------------------------------------------
   NOTAS Y PISTAS — guardadas en MySQL
   -------------------------------------------------- */
async function apiGetNotas() {
  const data = await apiFetch('/notas');
  return data.data;
}

async function apiCrearNota(tipo, contenido, caso_relacionado = null) {
  const data = await apiFetch('/notas', {
    method: 'POST',
    body: JSON.stringify({ tipo, contenido, caso_relacionado }),
  });
  return data;
}

async function apiEliminarNota(id_nota) {
  const data = await apiFetch(`/notas/${id_nota}`, { method: 'DELETE' });
  return data;
}