/* =====================================================
   NEXUS — Sistema Integral de Control Criminal
   app.js v4 · Con tema día/noche y logo NEXUS
   ===================================================== */

/* --------------------------------------------------
   TEMA DÍA / NOCHE
   -------------------------------------------------- */
function initTheme(){
  const saved=sessionStorage.getItem('nexus_theme')||'dark';
  document.documentElement.setAttribute('data-theme',saved);
}

function toggleTheme(){
  const current=document.documentElement.getAttribute('data-theme')||'dark';
  const next=current==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',next);
  sessionStorage.setItem('nexus_theme',next);
  // Actualizar icono si existe
  const btn=document.getElementById('theme-toggle-btn');
  if(btn){
    const sun=btn.querySelector('.icon-sun');
    const moon=btn.querySelector('.icon-moon');
    if(sun&&moon){
      if(next==='light'){sun.style.display='block';moon.style.display='none';}
      else{sun.style.display='none';moon.style.display='block';}
    }
  }
}

/* Llama al inicio de cada página */
initTheme();

/* --------------------------------------------------
   USUARIOS
   -------------------------------------------------- */
const USERS={
  tstark:      {pass:'1234',nombre:'Tony Stark',         rol:'Analista',       rango:'Comandante',   dpto:'Inteligencia'},
  mmontes:     {pass:'1234',nombre:'Manuel Montes',       rol:'Investigador',   rango:'Teniente',     dpto:'Homicidios'},
  rpadilla:    {pass:'1234',nombre:'Rocío Padilla',       rol:'Administrativo', rango:'Capitán',      dpto:'Inteligencia'},
  kperez:      {pass:'1234',nombre:'Kevin Pérez',         rol:'Capturista',     rango:'Detective II', dpto:'Robos'},
  lmorningstar:{pass:'1234',nombre:'Lucifer Morningstar', rol:'Investigador',   rango:'Capitán',      dpto:'Asuntos Internos'},
  nromanoff:   {pass:'1234',nombre:'Natasha Romanoff',    rol:'Investigador',   rango:'Teniente',     dpto:'Inteligencia'},
};

/* --------------------------------------------------
   CASOS
   -------------------------------------------------- */
const CASOS=[
  {id:1, asunto:'Operación Sombras',    desc:'Tráfico de sustancias en zona industrial de Guadalajara',      zona:'Zona Industrial, Guadalajara',   estado:'En investigación',fecha:'2026-01-10',presupuesto:5000,   det_id:4, detective:'Jahir Berumen',     tags:['narcotráfico','pandillas']},
  {id:2, asunto:'El Hacker Silencioso', desc:'Intrusión en servidores del banco regional de GDL',            zona:'Centro Financiero, GDL',         estado:'En investigación',fecha:'2026-02-15',presupuesto:12000.5,det_id:6, detective:'Angel González',    tags:['cibercrimen','fraude']},
  {id:3, asunto:'Callejón 45',          desc:'Homicidio en zona norte de Guadalajara',                       zona:'Colonia Oblatos Norte, GDL',     estado:'Abierto',         fecha:'2026-03-01',presupuesto:1500,  det_id:2, detective:'Manuel Montes',     tags:['homicidio','violencia']},
  {id:4, asunto:'Joyas Reales',         desc:'Robo en joyería del centro histórico de GDL',                  zona:'Centro Histórico, GDL',          estado:'Cerrado',         fecha:'2026-03-05',presupuesto:3000,  det_id:7, detective:'Kevin Pérez',       tags:['robo']},
  {id:5, asunto:'Voto Corrupto',        desc:'Fraude electoral detectado en municipio de Zapopan',           zona:'Municipio de Zapopan, Jalisco',  estado:'En investigación',fecha:'2026-03-10',presupuesto:8500,  det_id:14,detective:'Lucifer Morningstar',tags:['fraude','corrupción']},
  {id:6, asunto:'Nube Roja',            desc:'Distribución de malware en dependencias del gobierno estatal', zona:'Palacio de Gobierno, GDL',       estado:'En investigación',fecha:'2026-03-12',presupuesto:20000, det_id:6, detective:'Angel González',    tags:['cibercrimen']},
  {id:7, asunto:'Fuga de Capital',      desc:'Lavado de dinero en empresas fachada de Tlaquepaque',          zona:'Tlaquepaque, Jalisco',            estado:'En investigación',fecha:'2026-03-15',presupuesto:4500,  det_id:18,detective:'Gustavo Gutiérrez', tags:['lavado','fraude']},
  {id:8, asunto:'Doble Cara',           desc:'Infiltración en pandillas del sector Oblatos',                 zona:'Sector Oblatos, GDL',            estado:'En investigación',fecha:'2026-03-18',presupuesto:7000,  det_id:23,detective:'Jerónimo Durán',    tags:['pandillas','violencia']},
  {id:9, asunto:'Reloj de Arena',       desc:'Desaparición de testigo clave en colonia Chapalita',           zona:'Colonia Chapalita, GDL',         estado:'Abierto',         fecha:'2026-03-20',presupuesto:2500,  det_id:3, detective:'Marisol Huerta',    tags:['desaparición']},
  {id:10,asunto:'Fuego Cruzado',        desc:'Enfrentamiento armado en Calzada Independencia',               zona:'Calzada Independencia, GDL',     estado:'Abierto',         fecha:'2026-03-25',presupuesto:1200,  det_id:8, detective:'Orlando Fierros',   tags:['homicidio','violencia']},
  {id:11,asunto:'Código Fantasma',      desc:'Robo de identidad masivo a ciudadanos de GDL',                 zona:'Múltiples colonias, GDL',        estado:'En investigación',fecha:'2026-03-26',presupuesto:9500,  det_id:17,detective:'Erik Guardado',     tags:['cibercrimen','fraude']},
  {id:12,asunto:'La Última Carrera',    desc:'Red de carreras ilegales en periférico de Guadalajara',        zona:'Periférico Norte, GDL',          estado:'Abierto',         fecha:'2026-03-27',presupuesto:6000,  det_id:22,detective:'Paulina Villalpando',tags:['robo','violencia']},
];

/* --------------------------------------------------
   INVOLUCRADOS
   -------------------------------------------------- */
const INVOLUCRADOS={
  1:[{nombre:'Moisés Carrera',    rol:'Criminal',  declaracion:'Capturado con cargamento en bodega de zona industrial.'},
     {nombre:'Miguel Angel Lobo', rol:'Testigo',   declaracion:'Vio camiones sin placas entrar a la bodega de madrugada.'},
     {nombre:'Hector Padilla',    rol:'Sospechoso',declaracion:'Dueño del terreno donde se encontró el cargamento.'}],
  2:[{nombre:'Iván Balderas',     rol:'Criminal',  declaracion:'Rastro digital confirma acceso desde su dispositivo.'},
     {nombre:'Nicolas López',     rol:'Testigo',   declaracion:'Reportó actividad inusual en los servidores del banco.'},
     {nombre:'Bruce Wayne',       rol:'Sospechoso',declaracion:'Accedió al sistema bancario con credenciales robadas.'}],
  3:[{nombre:'Cesar Medina',      rol:'Victima',   declaracion:'Fallecido por impacto de arma de fuego en callejón norte.'},
     {nombre:'Daniel Medina',     rol:'Testigo',   declaracion:'Escuchó discusión fuerte antes de los disparos.'},
     {nombre:'Noé Zermeño',       rol:'Sospechoso',declaracion:'Visto en el área minutos antes del incidente.'}],
  4:[{nombre:'Benito Flores',     rol:'Criminal',  declaracion:'Capturado con joyas robadas en su domicilio.'},
     {nombre:'Saul Mora',         rol:'Victima',   declaracion:'Dueño de la joyería asaltada en centro histórico.'},
     {nombre:'El Pelón Rodilla',  rol:'Sospechoso',declaracion:'Empleado con copia de llaves del local.'}],
  5:[{nombre:'Itzel Padilla',     rol:'Testigo',   declaracion:'Grabó en video la manipulación de urnas.'},
     {nombre:'Ramiro Preciado',   rol:'Sospechoso',declaracion:'Vinculado a la organización electoral fraudulenta.'}],
  6:[{nombre:'Isai Plascencia',   rol:'Testigo',   declaracion:'Técnico que detectó el malware en servidores del gobierno.'}],
  7:[{nombre:'Gael Ramirez',      rol:'Testigo',   declaracion:'Contador que detectó irregularidades en estados financieros.'},
     {nombre:'Noé Zermeño',       rol:'Criminal',  declaracion:'Administrador de las empresas fachada identificadas.'},
     {nombre:'Gaizka Camacho',    rol:'Sospechoso',declaracion:'Vinculado a flujos de dinero irregulares.'}],
  8:[{nombre:'Marcos Ramirez',    rol:'Testigo',   declaracion:'Informante interno de la pandilla en sector Oblatos.'},
     {nombre:'El Pelón Rodilla',  rol:'Sospechoso',declaracion:'Señalado como líder de célula en colonia Rancho Nuevo.'}],
  9:[{nombre:'Eric Reyes',        rol:'Victima',   declaracion:'Testigo desaparecido tras declarar en caso de homicidio.'},
     {nombre:'Fernando Serrano',  rol:'Testigo',   declaracion:'Último en ver al testigo con vida en colonia Chapalita.'}],
  10:[{nombre:'Sergio Ulloa',     rol:'Victima',   declaracion:'Herido en enfrentamiento en Calzada Independencia.'},
      {nombre:'Edgar Uribe',      rol:'Testigo',   declaracion:'Conductor que grabó el enfrentamiento desde su vehículo.'}],
  11:[{nombre:'Paulina Villalpando',rol:'Victima', declaracion:'Una de las víctimas de robo de identidad masivo.'},
      {nombre:'Iván Balderas',    rol:'Criminal',  declaracion:'Identificado como operador técnico de la red de fraude.'}],
  12:[{nombre:'Dominic Toretto',  rol:'Sospechoso',declaracion:'Participante frecuente en carreras ilegales del periférico.'},
      {nombre:'Letty Ortiz',      rol:'Testigo',   declaracion:'Conductora que reportó las carreras a las autoridades.'},
      {nombre:'Jerónimo Durán',   rol:'Victima',   declaracion:'Atropellado por vehículo participante en carrera ilegal.'}],
};

/* --------------------------------------------------
   DETECTIVES
   -------------------------------------------------- */
const DETECTIVES=[
  {id:1, nombre:'Rocío Padilla',       user:'rpadilla',     rango:'Capitán',      dpto:'Inteligencia',     rol:'Administrativo', casos_ids:[5,7]},
  {id:2, nombre:'Manuel Montes',       user:'mmontes',      rango:'Teniente',     dpto:'Homicidios',       rol:'Investigador',   casos_ids:[3,9]},
  {id:3, nombre:'Marisol Huerta',      user:'mhuerta',      rango:'Teniente',     dpto:'Homicidios',       rol:'Investigador',   casos_ids:[9]},
  {id:4, nombre:'Jahir Berumen',       user:'jberumen',     rango:'Sargento I',   dpto:'Narcóticos',       rol:'Investigador',   casos_ids:[1]},
  {id:5, nombre:'Laura García',        user:'lgarcia',      rango:'Sargento II',  dpto:'Forense',          rol:'Capturista',     casos_ids:[3,4]},
  {id:6, nombre:'Angel González',      user:'agonzalez',    rango:'Detective I',  dpto:'Cibercrimen',      rol:'Analista',       casos_ids:[2,6]},
  {id:7, nombre:'Kevin Pérez',         user:'kperez',       rango:'Detective II', dpto:'Robos',            rol:'Investigador',   casos_ids:[4,12]},
  {id:8, nombre:'Orlando Fierros',     user:'ofierros',     rango:'Oficial',      dpto:'Antipandillas',    rol:'Capturista',     casos_ids:[10]},
  {id:13,nombre:'Tony Stark',          user:'tstark',       rango:'Comandante',   dpto:'Inteligencia',     rol:'Analista',       casos_ids:[5,11]},
  {id:14,nombre:'Lucifer Morningstar', user:'lmorningstar', rango:'Capitán',      dpto:'Asuntos Internos', rol:'Investigador',   casos_ids:[5]},
  {id:15,nombre:'Natasha Romanoff',    user:'nromanoff',    rango:'Teniente',     dpto:'Inteligencia',     rol:'Investigador',   casos_ids:[1,8]},
  {id:17,nombre:'Erik Guardado',       user:'eguardado',    rango:'Detective II', dpto:'Cibercrimen',      rol:'Analista',       casos_ids:[11]},
  {id:18,nombre:'Gustavo Gutiérrez',   user:'ggutierrez',   rango:'Detective I',  dpto:'Narcóticos',       rol:'Investigador',   casos_ids:[7]},
  {id:23,nombre:'Jerónimo Durán',      user:'jduran',       rango:'Detective I',  dpto:'Antipandillas',    rol:'Investigador',   casos_ids:[8,12]},
  {id:22,nombre:'Paulina Villalpando', user:'pvillalpando', rango:'Oficial',      dpto:'Tráfico',          rol:'Capturista',     casos_ids:[12]},
];

/* --------------------------------------------------
   MOVIMIENTOS
   -------------------------------------------------- */
const MOVIMIENTOS={
  2:[{fecha:'2026-05-10',desc:'Interrogatorio pendiente a testigo secundario en caso Callejón 45',tipo:'Interrogatorio'},
     {fecha:'2026-05-14',desc:'Revisión de cámaras con apoyo de forense',tipo:'Revisión de evidencia'},
     {fecha:'2026-05-20',desc:'Audiencia preliminar en juzgado 3',tipo:'Judicial'}],
  4:[{fecha:'2026-05-08',desc:'Inspección de segunda bodega identificada en Tlaquepaque',tipo:'Inspección'},
     {fecha:'2026-05-15',desc:'Entrega de informe parcial a Comandante Stark',tipo:'Reporte'}],
  6:[{fecha:'2026-05-09',desc:'Análisis forense de segundo servidor comprometido',tipo:'Análisis digital'},
     {fecha:'2026-05-12',desc:'Reunión con Banco Regional para ampliar acceso a logs',tipo:'Coordinación'},
     {fecha:'2026-05-18',desc:'Presentación de hallazgos técnicos a Asuntos Internos',tipo:'Reporte'}],
  14:[{fecha:'2026-05-11',desc:'Revisión de actas electorales con Fiscalía Electoral',tipo:'Coordinación'},
      {fecha:'2026-05-16',desc:'Solicitud de orden de cateo al juzgado',tipo:'Judicial'}],
  17:[{fecha:'2026-05-10',desc:'Cruce de base de datos robada con registros del IMSS',tipo:'Análisis digital'},
      {fecha:'2026-05-13',desc:'Notificación formal a 1,200 ciudadanos afectados',tipo:'Administrativo'}],
  23:[{fecha:'2026-05-08',desc:'Reunión con informante en punto de encuentro designado',tipo:'Inteligencia'},
      {fecha:'2026-05-17',desc:'Operativo de vigilancia nocturna en periférico norte',tipo:'Operativo'}],
};

/* --------------------------------------------------
   CRIMINALES
   -------------------------------------------------- */
const CRIMINALES=[
  {id:1, alias:'El Fantasma',nombre:'Moisés Carrera Nunez',   cargos:'Tráfico de sustancias a gran escala y asociación delictiva',    condena:'18 años',  activo:false,casos_ids:[1],    dni:'DNI400001',nacimiento:'1985-04-12',nacionalidad:'Mexicana'},
  {id:2, alias:'El Toro',    nombre:'Iván Balderas León',      cargos:'Homicidio calificado y portación ilegal de armas',              condena:'25 años',  activo:false,casos_ids:[2,11], dni:'DNI400002',nacimiento:'1979-08-03',nacionalidad:'Mexicana'},
  {id:3, alias:'La Sombra',  nombre:'Noé Zermeño Mejia',       cargos:'Lavado de activos y evasión fiscal agravada',                   condena:'12 años',  activo:false,casos_ids:[3,7],  dni:'DNI400003',nacimiento:'1982-11-21',nacionalidad:'Mexicana'},
  {id:4, alias:'El Profeta', nombre:'Benito Daniel Flores',    cargos:'Fraude electoral y corrupción de funcionarios públicos',        condena:'10 años',  activo:false,casos_ids:[4],    dni:'DNI400004',nacimiento:'1970-06-15',nacionalidad:'Mexicana'},
  {id:5, alias:'El Pelón',   nombre:'El Pelón Rodilla de Alfaro',cargos:'Robo a mano armada, extorsión y resistencia al arresto',     condena:'15 años',  activo:false,casos_ids:[4,8],  dni:'DNI400005',nacimiento:'1990-02-28',nacionalidad:'Mexicana'},
  {id:6, alias:'El Dom',     nombre:'Dominic Toretto',          cargos:'Conducción temeraria, robo de vehículos y fuga de la justicia',condena:'8 años',   activo:false,casos_ids:[12],   dni:'DNI200002',nacimiento:'1976-07-04',nacionalidad:'Americana'},
  {id:7, alias:'El Jefe',    nombre:'Michael Scott',            cargos:'Fraude laboral, acoso y malversación de fondos',               condena:'3 años',   activo:false,casos_ids:[],     dni:'DNI200004',nacimiento:'1964-03-15',nacionalidad:'Americana'},
  {id:8, alias:'El Rápido',  nombre:"Brian O'Conner",           cargos:'Tráfico de vehículos robados y obstrucción a la justicia',     condena:'5 años',   activo:false,casos_ids:[],     dni:'DNI200006',nacimiento:'1978-09-12',nacionalidad:'Americana'},
  {id:9, alias:'El Gaizka',  nombre:'Gaizka Alejandro Camacho', cargos:'Sospechoso activo en investigación por lavado de dinero',      condena:'Pendiente',activo:true, casos_ids:[7],    dni:'DNI300001',nacimiento:'1993-01-17',nacionalidad:'Mexicana'},
  {id:10,alias:'El Ramiro',  nombre:'Ramiro Preciado Martínez', cargos:'Sospechoso activo vinculado a red de fraude electoral',        condena:'Pendiente',activo:true, casos_ids:[5],    dni:'DNI300014',nacimiento:'1988-10-05',nacionalidad:'Mexicana'},
];

/* --------------------------------------------------
   EVIDENCIAS
   -------------------------------------------------- */
const EVIDENCIAS=[
  {id:1, caso:1, tipo:'Fotografía',desc:'Cargamento fotografiado en bodega industrial',          ruta:'/evidencias/caso1/cargamento.jpg',  det:'J. Berumen',    fecha:'2026-01-12'},
  {id:2, caso:1, tipo:'Video',     desc:'Cámara de seguridad bodega zona industrial GDL',        ruta:'/evidencias/caso1/camara_bod.mp4',  det:'J. Berumen',    fecha:'2026-01-12'},
  {id:3, caso:2, tipo:'Digital',   desc:'Log de accesos ilegales a servidores bancarios',        ruta:'/evidencias/caso2/logs_banco.zip',  det:'A. González',   fecha:'2026-02-18'},
  {id:4, caso:2, tipo:'Documento', desc:'Reporte técnico de intrusión elaborado por forense',    ruta:'/evidencias/caso2/reporte_tec.pdf', det:'L. García',     fecha:'2026-02-20'},
  {id:5, caso:3, tipo:'Fotografía',desc:'Escena del crimen callejón norte Guadalajara',          ruta:'/evidencias/caso3/escena.jpg',      det:'L. García',     fecha:'2026-03-01'},
  {id:6, caso:3, tipo:'Objeto',    desc:'Casquillo encontrado en el callejón',                   ruta:null,                                det:'L. García',     fecha:'2026-03-01'},
  {id:7, caso:4, tipo:'Fotografía',desc:'Joyas recuperadas en domicilio del sospechoso',         ruta:'/evidencias/caso4/joyas.jpg',       det:'K. Pérez',      fecha:'2026-03-07'},
  {id:8, caso:5, tipo:'Video',     desc:'Grabación de manipulación de urnas en Zapopan',         ruta:'/evidencias/caso5/urnas.mp4',       det:'L. Morningstar',fecha:'2026-03-11'},
  {id:9, caso:6, tipo:'Digital',   desc:'Muestra del malware extraído de servidores de gobierno',ruta:'/evidencias/caso6/malware.zip',     det:'A. González',   fecha:'2026-03-14'},
  {id:10,caso:7, tipo:'Documento', desc:'Estados financieros alterados de empresas fachada',     ruta:'/evidencias/caso7/estados_fin.pdf', det:'G. Gutiérrez',  fecha:'2026-03-16'},
  {id:11,caso:8, tipo:'Fotografía',desc:'Fotografías de reuniones de la pandilla en Oblatos',    ruta:'/evidencias/caso8/reunion.jpg',     det:'J. Durán',      fecha:'2026-03-19'},
  {id:12,caso:9, tipo:'Video',     desc:'Última grabación del testigo en colonia Chapalita',     ruta:'/evidencias/caso9/ultima_grab.mp4', det:'M. Huerta',     fecha:'2026-03-21'},
  {id:13,caso:10,tipo:'Video',     desc:'Grabación del enfrentamiento en Calzada Independencia', ruta:'/evidencias/caso10/enfrent.mp4',    det:'O. Fierros',    fecha:'2026-03-25'},
  {id:14,caso:11,tipo:'Digital',   desc:'Base de datos con información robada de ciudadanos',    ruta:'/evidencias/caso11/bd_robada.zip',  det:'E. Guardado',   fecha:'2026-03-27'},
  {id:15,caso:12,tipo:'Video',     desc:'Grabación de carreras ilegales en periférico GDL',      ruta:'/evidencias/caso12/carreras.mp4',   det:'P. Villalpando',fecha:'2026-03-28'},
];

/* --------------------------------------------------
   HELPERS
   -------------------------------------------------- */
function ini(n){const p=n.trim().split(' ');return(p[0][0]+(p[1]?p[1][0]:'')).toUpperCase();}
function badge(e){const m={'Abierto':'b-open','En investigación':'b-inv','Cerrado':'b-closed'};return`<span class="badge ${m[e]||'b-susp'}">${e}</span>`;}
function evIconClass(t){return{Fotografía:'ti-camera',Video:'ti-video',Documento:'ti-file-text',Objeto:'ti-package',Digital:'ti-database',Otro:'ti-box'}[t]||'ti-box';}
function fmt(n){return n.toLocaleString('es-MX');}
function padId(n,l=3){return String(n).padStart(l,'0');}

/* --------------------------------------------------
   SESIÓN
   -------------------------------------------------- */
function loginAndRedirect(u){sessionStorage.setItem('nexus_user',u);window.location.href='dashboard.html';}
function logout(){sessionStorage.removeItem('nexus_user');window.location.href='login.html';}
function requireSession(){const u=sessionStorage.getItem('nexus_user');if(!u||!USERS[u]){window.location.href='login.html';return null;}return{username:u,...USERS[u]};}

/* --------------------------------------------------
   NAV — con logo NEXUS y toggle tema
   -------------------------------------------------- */
function initNav(activeTab){
  const user=requireSession();
  if(!user)return;
  window._currentUser=user;

  const tabs=[
    {id:'dashboard', label:'Dashboard',  icon:'ti-layout-dashboard',href:'dashboard.html'},
    {id:'casos',     label:'Casos',       icon:'ti-folder',          href:'casos.html'},
    {id:'detectives',label:'Detectives',  icon:'ti-id-badge',        href:'detectives.html'},
    {id:'criminales',label:'Criminales',  icon:'ti-alert-triangle',  href:'criminales.html'},
    {id:'evidencias',label:'Evidencias',  icon:'ti-archive',         href:'evidencias.html'},
    {id:'perfil',    label:'Perfil',      icon:'ti-user-circle',     href:'perfil.html'},
  ];

  const links=tabs.map(t=>`<a class="nav-item ${t.id===activeTab?'active':''}" href="${t.href}"><i class="ti ${t.icon}" aria-hidden="true"></i>${t.label}</a>`).join('');
  const mlinks=tabs.map(t=>`<a class="nav-item ${t.id===activeTab?'active':''}" href="${t.href}"><i class="ti ${t.icon}" aria-hidden="true"></i>${t.label}</a>`).join('');
  const isDark=(document.documentElement.getAttribute('data-theme')||'dark')==='dark';

  const html=`
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
      <nav class="nav">${links}</nav>
      <div class="nav-user">
        <div><div class="nav-user-name">${ini(user.nombre)}.${user.nombre.split(' ').slice(-1)[0].toUpperCase()}</div><div class="nav-user-role">${user.rol} · ${user.dpto}</div></div>
        <a href="perfil.html" class="nav-av" title="Ver perfil">${ini(user.nombre)}</a>
        <button class="theme-toggle" id="theme-toggle-btn" onclick="toggleTheme()" title="Cambiar tema" aria-label="Cambiar modo día/noche">
          <i class="ti ti-sun icon-sun" aria-hidden="true" style="display:${isDark?'none':'block'}"></i>
          <i class="ti ti-moon icon-moon" aria-hidden="true" style="display:${isDark?'block':'none'}"></i>
        </button>
        <button class="nav-logout" onclick="logout()"><i class="ti ti-logout" aria-hidden="true"></i> SALIR</button>
      </div>
      <button class="nav-toggle" onclick="toggleMobileNav()" aria-label="Menú"><i class="ti ti-menu-2" aria-hidden="true"></i></button>
    </div>
    <nav class="mobile-nav" id="mobile-nav">${mlinks}
      <div style="padding:.6rem 1.5rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:.6rem;">
        <a href="perfil.html" style="font-size:.58rem;color:var(--cyan);text-decoration:none;">${user.nombre} — Perfil</a>
        <div style="display:flex;gap:.4rem;">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="Cambiar tema">
            <i class="ti ti-sun icon-sun" aria-hidden="true" style="display:${isDark?'none':'block'}"></i>
            <i class="ti ti-moon icon-moon" aria-hidden="true" style="display:${isDark?'block':'none'}"></i>
          </button>
          <button class="nav-logout" onclick="logout()"><i class="ti ti-logout" aria-hidden="true"></i> SALIR</button>
        </div>
      </div>
    </nav>`;

  const c=document.getElementById('nav-container');
  if(c)c.innerHTML=html;
}

function toggleMobileNav(){const n=document.getElementById('mobile-nav');if(n)n.classList.toggle('open');}

/* --------------------------------------------------
   MODAL CASO
   -------------------------------------------------- */
function abrirCaso(id){
  const c=CASOS.find(x=>x.id===id);if(!c)return;
  const inv=INVOLUCRADOS[id]||[];
  const evids=EVIDENCIAS.filter(e=>e.caso===id);
  const det=DETECTIVES.find(d=>d.id===c.det_id);

  const invHTML=inv.length?inv.map(p=>`
    <div class="involucrado-row">
      <div class="det-av">${ini(p.nombre)}</div>
      <div style="flex:1"><div style="font-family:var(--title);font-size:.72rem;font-weight:600;color:var(--white);">${p.nombre}</div>
      <div style="font-size:.54rem;color:var(--text2);margin-top:.1rem;font-style:italic;">${p.declaracion}</div></div>
      <span class="rol-badge rol-${p.rol.replace(' ','')}">${p.rol}</span>
    </div>`).join(''):`<div style="font-size:.56rem;color:var(--text3);font-family:var(--mono);">// sin involucrados registrados</div>`;

  const evidHTML=evids.length?evids.map(e=>`
    <div class="evid-mini">
      <div class="evid-icon" style="width:28px;height:28px;font-size:.85rem;"><i class="ti ${evIconClass(e.tipo)}" aria-hidden="true"></i></div>
      <div style="flex:1"><div class="evid-type" style="font-size:.44rem;">${e.tipo}</div>
      <div style="font-size:.6rem;color:var(--white);">${e.desc}</div>
      ${e.ruta?`<div class="evid-path">${e.ruta}</div>`:`<div class="evid-nofile">// evidencia física</div>`}</div>
      <div style="font-size:.42rem;color:var(--text3);font-family:var(--mono);">EV-${padId(e.id,4)}</div>
    </div>`).join(''):`<div style="font-size:.56rem;color:var(--text3);font-family:var(--mono);">// sin evidencias registradas</div>`;

  document.body.insertAdjacentHTML('beforeend',`
    <div class="overlay open" id="caso-overlay" onclick="cerrarModal('caso-overlay','caso-modal')">
      <div class="modal" id="caso-modal" onclick="event.stopPropagation()">
        <div class="modal-head">
          <div><div class="modal-title">${c.asunto}</div><div class="modal-sub">C-${padId(c.id)} &nbsp;·&nbsp; ${c.fecha} &nbsp;·&nbsp; ${c.zona}</div></div>
          <button class="modal-close" onclick="cerrarModal('caso-overlay','caso-modal')"><i class="ti ti-x" aria-hidden="true"></i></button>
        </div>
        <div class="modal-body">
          <div><div class="modal-section-title">Información General</div>
          <div class="info-grid">
            <div class="info-cell"><div class="info-label">Estado</div><div class="info-value">${badge(c.estado)}</div></div>
            <div class="info-cell"><div class="info-label">Detective a cargo</div><div class="info-value cyan">${c.detective}</div></div>
            <div class="info-cell"><div class="info-label">Presupuesto</div><div class="info-value cyan">$${fmt(c.presupuesto)}</div></div>
            <div class="info-cell"><div class="info-label">Zona</div><div class="info-value">${c.zona}</div></div>
            <div class="info-cell"><div class="info-label">Fecha apertura</div><div class="info-value">${c.fecha}</div></div>
            <div class="info-cell"><div class="info-label">Departamento</div><div class="info-value">${det?.dpto||'—'}</div></div>
          </div></div>
          <div><div class="modal-section-title">Descripción</div>
          <div style="background:var(--panel);border:1px solid var(--border);border-left:2px solid var(--cyan3);padding:.75rem .9rem;font-size:.65rem;color:var(--text);line-height:1.7;">${c.desc}</div></div>
          <div><div class="modal-section-title">Etiquetas</div><div>${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>
          <div><div class="modal-section-title">Involucrados (${inv.length})</div>${invHTML}</div>
          <div><div class="modal-section-title">Evidencias Vinculadas (${evids.length})</div>${evidHTML}</div>
        </div>
      </div>
    </div>`);
}

/* --------------------------------------------------
   SIDE PANEL DETECTIVE
   -------------------------------------------------- */
function abrirDetective(id){
  const det=DETECTIVES.find(d=>d.id===id);if(!det)return;
  const casos=det.casos_ids.map(cid=>CASOS.find(c=>c.id===cid)).filter(Boolean);
  const movs=MOVIMIENTOS[id]||[];

  const casosHTML=casos.length?casos.map(c=>`
    <div class="caso-mini" onclick="cerrarSidePanel();setTimeout(()=>abrirCaso(${c.id}),200)">
      <span class="case-num">C-${padId(c.id)}</span>
      <span style="font-family:var(--title);font-size:.72rem;font-weight:600;color:var(--white);flex:1;">${c.asunto}</span>
      ${badge(c.estado)}
    </div>`).join(''):`<div style="font-size:.56rem;color:var(--text3);font-family:var(--mono);">// sin casos asignados</div>`;

  const movsHTML=movs.length?movs.map(m=>`
    <div class="movimiento-row">
      <div class="mov-dot"></div>
      <div><div class="mov-fecha">${m.fecha}</div><div class="mov-desc">${m.desc}</div><div class="mov-tipo">${m.tipo}</div></div>
    </div>`).join(''):`<div style="font-size:.56rem;color:var(--text3);font-family:var(--mono);">// sin movimientos programados</div>`;

  document.body.insertAdjacentHTML('beforeend',`
    <div class="side-overlay open" id="side-overlay" onclick="cerrarSidePanel()"></div>
    <div class="side-panel open" id="side-panel">
      <div class="side-head">
        <div><div class="side-title">${det.nombre}</div><div style="font-size:.5rem;color:var(--text3);font-family:var(--mono);">@${det.user} &nbsp;·&nbsp; ${det.dpto}</div></div>
        <button class="side-close" onclick="cerrarSidePanel()"><i class="ti ti-x" aria-hidden="true"></i></button>
      </div>
      <div class="side-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.4rem;margin-bottom:1rem;">
          <div class="info-cell"><div class="info-label">Rango</div><div class="info-value" style="font-size:.62rem;">${det.rango}</div></div>
          <div class="info-cell"><div class="info-label">Rol</div><div class="info-value" style="font-size:.62rem;">${det.rol}</div></div>
          <div class="info-cell"><div class="info-label">Departamento</div><div class="info-value" style="font-size:.62rem;">${det.dpto}</div></div>
          <div class="info-cell"><div class="info-label">Casos activos</div><div class="info-value cyan" style="font-size:.62rem;">${casos.length}</div></div>
        </div>
        <div style="margin-bottom:1rem;"><div class="modal-section-title">Casos Asignados</div>${casosHTML}</div>
        <div><div class="modal-section-title">Próximos Movimientos</div>${movsHTML}</div>
      </div>
    </div>`);
}

/* --------------------------------------------------
   MODAL CRIMINAL
   -------------------------------------------------- */
function abrirCriminal(id){
  const cr=CRIMINALES.find(x=>x.id===id);if(!cr)return;
  const casos=cr.casos_ids.map(cid=>CASOS.find(c=>c.id===cid)).filter(Boolean);

  const casosHTML=casos.length?casos.map(c=>`
    <div class="caso-mini" onclick="cerrarModal('crim-overlay','crim-modal');setTimeout(()=>abrirCaso(${c.id}),200)">
      <span class="case-num">C-${padId(c.id)}</span>
      <span style="font-family:var(--title);font-size:.72rem;font-weight:600;color:var(--white);flex:1;">${c.asunto}</span>
      ${badge(c.estado)}
    </div>`).join(''):`<div style="font-size:.56rem;color:var(--text3);font-family:var(--mono);">// sin casos vinculados</div>`;

  document.body.insertAdjacentHTML('beforeend',`
    <div class="overlay open" id="crim-overlay" onclick="cerrarModal('crim-overlay','crim-modal')">
      <div class="modal" id="crim-modal" onclick="event.stopPropagation()">
        <div class="modal-head">
          <div><div class="modal-title">${cr.alias}</div><div class="modal-sub">EXP-${padId(cr.id,4)} &nbsp;·&nbsp; ${cr.nombre}</div></div>
          <button class="modal-close" onclick="cerrarModal('crim-overlay','crim-modal')"><i class="ti ti-x" aria-hidden="true"></i></button>
        </div>
        <div class="modal-body">
          <div class="info-grid">
            <div class="info-cell"><div class="info-label">Nombre completo</div><div class="info-value" style="font-size:.62rem;">${cr.nombre}</div></div>
            <div class="info-cell"><div class="info-label">DNI / Pasaporte</div><div class="info-value cyan">${cr.dni}</div></div>
            <div class="info-cell"><div class="info-label">Nacimiento</div><div class="info-value">${cr.nacimiento}</div></div>
            <div class="info-cell"><div class="info-label">Nacionalidad</div><div class="info-value">${cr.nacionalidad}</div></div>
            <div class="info-cell"><div class="info-label">Condena</div><div class="info-value ${cr.activo?'amber':'green'}">${cr.condena}</div></div>
            <div class="info-cell"><div class="info-label">Estatus</div><div class="info-value ${cr.activo?'amber':'green'}">${cr.activo?'Activo / Prófugo':'Detenido'}</div></div>
          </div>
          <div><div class="modal-section-title">Cargos</div>
          <div style="background:var(--panel);border:1px solid var(--border);border-left:2px solid var(--red);padding:.75rem .9rem;font-size:.65rem;color:var(--text);line-height:1.7;font-style:italic;">${cr.cargos}</div></div>
          <div><div class="modal-section-title">Casos Vinculados (${casos.length})</div>${casosHTML}</div>
        </div>
      </div>
    </div>`);
}

/* --------------------------------------------------
   CERRAR PANELES
   -------------------------------------------------- */
function cerrarModal(oid,mid){document.getElementById(oid)?.remove();document.getElementById(mid)?.remove();}
function cerrarSidePanel(){document.getElementById('side-overlay')?.remove();document.getElementById('side-panel')?.remove();}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){cerrarModal('caso-overlay','caso-modal');cerrarModal('crim-overlay','crim-modal');cerrarSidePanel();}});
