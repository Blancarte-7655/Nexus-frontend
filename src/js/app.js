/* =====================================================
   NEXUS — Sistema Integral de Control Criminal
   app.js v4 · Tema día/noche · Conectado a API
   ===================================================== */

/* --------------------------------------------------
   TEMA DÍA / NOCHE
   -------------------------------------------------- */
function initTheme() {
  const saved = sessionStorage.getItem('nexus_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  sessionStorage.setItem('nexus_theme', next);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    const sun = btn.querySelector('.icon-sun');
    const moon = btn.querySelector('.icon-moon');
    if (sun && moon) {
      sun.style.display = next === 'light' ? 'block' : 'none';
      moon.style.display = next === 'dark' ? 'block' : 'none';
    }
  }
}

initTheme();

/* --------------------------------------------------
   HELPERS
   -------------------------------------------------- */
function ini(n) {
  const p = n.trim().split(' ');
  return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
}

function badge(estado) {
  const m = { 'Abierto': 'b-open', 'En investigación': 'b-inv', 'Cerrado': 'b-closed' };
  return `<span class="badge ${m[estado] || 'b-susp'}">${estado}</span>`;
}

function evIconClass(tipo) {
  return {
    Fotografía: 'ti-camera',
    Video: 'ti-video',
    Documento: 'ti-file-text',
    Objeto: 'ti-package',
    Digital: 'ti-database',
    Otro: 'ti-box',
  }[tipo] || 'ti-box';
}

function fmt(n) { return n.toLocaleString('es-MX'); }
function padId(n, l = 3) { return String(n).padStart(l, '0'); }

/* --------------------------------------------------
   SESIÓN
   -------------------------------------------------- */
function logout() {
  sessionStorage.removeItem('nexus_token');
  sessionStorage.removeItem('nexus_user');
  localStorage.removeItem('nexus_token');
  localStorage.removeItem('nexus_user');
  window.location.href = 'login.html';
}

function requireSession() {
  const token = sessionStorage.getItem('nexus_token') || localStorage.getItem('nexus_token');
  const raw = sessionStorage.getItem('nexus_user') || localStorage.getItem('nexus_user');
  if (!token || !raw) { window.location.href = 'login.html'; return null; }
  try {
    const u = JSON.parse(raw);
    return {
      username: u.username,
      nombre: u.nombre,
      rol: u.rol,
      rango: u.rango,
      dpto: u.dpto,
    };
  } catch (e) {
    window.location.href = 'login.html';
    return null;
  }
}

/* --------------------------------------------------
   NAV — logo NEXUS + toggle tema
   -------------------------------------------------- */
function initNav(activeTab) {
  const user = requireSession();
  if (!user) return;
  window._currentUser = user;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard', href: 'dashboard.html' },
    { id: 'casos', label: 'Casos', icon: 'ti-folder', href: 'casos.html' },
    { id: 'detectives', label: 'Detectives', icon: 'ti-id-badge', href: 'detectives.html' },
    { id: 'criminales', label: 'Criminales', icon: 'ti-alert-triangle', href: 'criminales.html' },
    { id: 'evidencias', label: 'Evidencias', icon: 'ti-archive', href: 'evidencias.html' },
    { id: 'perfil', label: 'Perfil', icon: 'ti-user-circle', href: 'perfil.html' },
  ];

  const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
  const mkLinks = (ts) => ts.map(t =>
    `<a class="nav-item ${t.id === activeTab ? 'active' : ''}" href="${t.href}">
       <i class="ti ${t.icon}" aria-hidden="true"></i>${t.label}
     </a>`
  ).join('');

  const html = `
    <div class="topbar">
      <span class="topbar-l">NEXUS · SISTEMA INTEGRAL DE CONTROL CRIMINAL &nbsp;·&nbsp; ACCESO RESTRINGIDO</span>
      <div class="topbar-r">
        <span><i class="ti ti-user" style="font-size:.75rem;color:var(--cyan)" aria-hidden="true"></i>${user.nombre.toUpperCase()}</span>
        <span class="topbar-badge">${user.rol.toUpperCase()}</span>
        <span><i class="ti ti-map-pin" style="font-size:.75rem;" aria-hidden="true"></i>ESTACIÓN CENTRAL GDL</span>
      </div>
    </div>
    <div class="header">
      <a href="dashboard.html" class="logo-wrap">
        <div class="logo-img-wrap">
          <img src="src/imagenes/logo.jpeg" alt="NEXUS Logo">
        </div>
        <div>
          <div class="logo-text-main">NEXUS</div>
          <div class="logo-text-sub">SISTEMA INTEGRAL DE CONTROL CRIMINAL</div>
        </div>
      </a>
      <div class="hdr-sep"></div>
      <div class="hdr-motto">Dirección de Seguridad Pública<br>Jalisco · División Metropolitana GDL</div>
      <nav class="nav">${mkLinks(tabs)}</nav>
      <div class="nav-user">
        <div>
          <div class="nav-user-name">${ini(user.nombre)}.${user.nombre.split(' ').slice(-1)[0].toUpperCase()}</div>
          <div class="nav-user-role">${user.rol} · ${user.dpto}</div>
        </div>
        <a href="perfil.html" class="nav-av" title="Ver perfil">${ini(user.nombre)}</a>
        <button class="theme-toggle" id="theme-toggle-btn" onclick="toggleTheme()"
                title="Cambiar tema" aria-label="Cambiar modo día/noche">
          <i class="ti ti-sun  icon-sun"  aria-hidden="true" style="display:${isDark ? 'none' : 'block'}"></i>
          <i class="ti ti-moon icon-moon" aria-hidden="true" style="display:${isDark ? 'block' : 'none'}"></i>
        </button>
        <button class="nav-logout" onclick="logout()">
          <i class="ti ti-logout" aria-hidden="true"></i> SALIR
        </button>
      </div>
      <button class="nav-toggle" onclick="toggleMobileNav()" aria-label="Menú">
        <i class="ti ti-menu-2" aria-hidden="true"></i>
      </button>
    </div>
    <nav class="mobile-nav" id="mobile-nav">
      ${mkLinks(tabs)}
      <div style="padding:.6rem 1.5rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:.6rem;">
        <a href="perfil.html" style="font-size:.58rem;color:var(--cyan);text-decoration:none;">${user.nombre} — Perfil</a>
        <div style="display:flex;gap:.4rem;">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="Cambiar tema">
            <i class="ti ti-sun  icon-sun"  aria-hidden="true" style="display:${isDark ? 'none' : 'block'}"></i>
            <i class="ti ti-moon icon-moon" aria-hidden="true" style="display:${isDark ? 'block' : 'none'}"></i>
          </button>
          <button class="nav-logout" onclick="logout()">
            <i class="ti ti-logout" aria-hidden="true"></i> SALIR
          </button>
        </div>
      </div>
    </nav>`;

  const c = document.getElementById('nav-container');
  if (c) c.innerHTML = html;
}

function toggleMobileNav() {
  const n = document.getElementById('mobile-nav');
  if (n) n.classList.toggle('open');
}

/* --------------------------------------------------
   CERRAR MODALES Y PANELES
   -------------------------------------------------- */
function cerrarModal(overlayId, modalId) {
  document.getElementById(overlayId)?.remove();
  document.getElementById(modalId)?.remove();
}

function cerrarSidePanel() {
  document.getElementById('side-overlay')?.remove();
  document.getElementById('side-panel')?.remove();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    cerrarModal('caso-overlay', 'caso-modal');
    cerrarModal('crim-overlay', 'crim-modal');
    cerrarSidePanel();
  }
});