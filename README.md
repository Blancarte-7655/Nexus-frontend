# NEXUS v4 — Sistema Integral de Control Criminal
## Guía de Imágenes, Logos y Características

---

## ESTRUCTURA DEL PROYECTO
```
nexus/
├── src/
│   ├── css/styles.css          ← estilos globales + modo día/noche
│   ├── js/app.js               ← datos, lógica, modales, nav, tema
│   └── imagenes/
│       ├── logo.jpeg               ← logo NEXUS original (ya incluido)
│       ├── logo-dark.svg           ← variante modo noche (SVG)
│       ├── logo-light.svg          ← variante modo día (SVG)
│       ├── logo-icon.svg           ← ícono solo, para favicon
│       ├── hero-login.jpg          ← fondo hero login (TÚ LA PONES)
│       ├── dashboard-bg.jpg        ← fondo hero dashboard (TÚ LA PONES)
│       ├── casos-bg.jpg            ← fondo hero casos (TÚ LA PONES)
│       ├── detectives-bg.jpg       ← fondo hero detectives (TÚ LA PONES)
│       ├── criminales-bg.jpg       ← fondo hero criminales (TÚ LA PONES)
│       └── evidencias-bg.jpg       ← fondo hero evidencias (TÚ LA PONES)
├── login.html
├── dashboard.html
├── casos.html
├── detectives.html
├── criminales.html
├── evidencias.html
├── perfil.html              ← página propia del agente
└── LEEME.md
```

---

## DÓNDE AGREGAR IMÁGENES DE FONDO

En cada página hay un comentario marcado así:
```html
<!-- IMAGEN FONDO: ... -->
```

**Login** → Dentro de `.login-hero`, descomenta:
```html
<img src="src/imagenes/hero-login.jpg" class="login-hero-img" alt="">
```

**Dashboard** → Dentro de `.dash-hero`, agrega como primer hijo:
```html
<img src="src/imagenes/dashboard-bg.jpg"
     style="position:absolute;inset:0;width:100%;height:100%;
            object-fit:cover;opacity:.1;pointer-events:none;z-index:0;">
```

**Demás páginas** → Dentro de `.page-hero`:
```html
<img src="src/imagenes/[nombre]-bg.jpg" class="hero-bg-img" alt="">
```

**Tips para las imágenes:**
- Fotos oscuras con baja luminosidad funcionan mejor
- Opacidad recomendada: .08 a .15
- Formatos: JPG o WebP (menor peso)
- Tamaño mínimo: 1400x500px para los heroes

---

## LOGO NEXUS — VARIANTES

El logo original `logo.jpeg` ya está incluido y aparece en:
- Header de todas las páginas (44x44px)
- Login: header + hero grande (200x200px)
- Perfil: hero card decorativo

### Variantes SVG generadas:
- `logo-dark.svg` — versión para fondos oscuros (modo noche)
- `logo-light.svg` — versión para fondos claros (modo día)
- `logo-icon.svg` — solo la pirámide, sin texto (para favicon)

### Usar como favicon:
En el `<head>` de cada página agrega:
```html
<link rel="icon" type="image/svg+xml" href="src/imagenes/logo-icon.svg">
```

---

## MODO DÍA / NOCHE

El toggle está en el header (el botón sol/luna) y en el topbar del login.

El tema se guarda en `sessionStorage` y persiste mientras el navegador esté abierto.

Para cambiar el tema por defecto (actualmente noche):
En `app.js`, línea `const saved = sessionStorage.getItem('nexus_theme') || 'dark';`
Cambia `'dark'` por `'light'`.

---

## CARACTERÍSTICAS INTERACTIVAS

| Módulo      | Interacción                                              |
|-------------|----------------------------------------------------------|
| Casos       | Click en fila → Modal detallado con zona, involucrados y evidencias |
| Detectives  | Click en tarjeta → Panel lateral con casos y próximos movimientos |
| Criminales  | Click en tarjeta → Modal con expediente completo         |
| Evidencias  | Vista lista / Vista por caso (collapsible por grupo)     |
| Perfil      | Página propia con notas y pistas de investigación        |
| Header      | Avatar → ir al perfil · Toggle sol/luna → modo día/noche|

Presiona **ESC** para cerrar cualquier modal o panel.

---

## CÓMO ABRIR EN VS CODE

1. Extrae el ZIP → abre la carpeta `nexus` en VS Code
2. Instala la extensión **Live Server**
3. Click derecho en `login.html` → "Open with Live Server"
4. Usuarios de prueba: loing de mysql
5. Contraseña: **1234**
