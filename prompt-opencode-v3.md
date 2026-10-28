# PROMPT PARA OPENCODE: Portafolio web de Patricia Reverón (versión 3, estilo presentación)

> **Antes de pegar este prompt**, crea la carpeta del proyecto y coloca estos archivos:
> - `reference/portafolio-patricia-v3.html`: prototipo visual de referencia (no se modifica).
> - `public/foto-patricia.jpg`: foto de Patricia, ya enderezada y recortada.
> - `public/videos/test.mp4`: video vertical de prueba.
> - Después, tus videos reales en `public/videos/` (ver sección 6).

---

## 1. Rol y objetivo

Actúa como desarrollador frontend senior con ojo de diseñador. Debes **convertir el prototipo `reference/portafolio-patricia-v3.html` en un proyecto Vite + React profesional y mantenible, sin cambiar el diseño.**

**Regla principal: el resultado debe verse y comportarse EXACTAMENTE igual que el archivo de referencia.** No rediseñes, no "mejores" estilos, no cambies colores, tipografías, tamaños, espaciados, textos ni animaciones. Ante cualquier duda, abre la referencia en el navegador y copia lo que hace.

**Qué es el sitio:** portafolio personal de Patricia Reverón, Social Media Manager y especialista en growth (más de 5 años de experiencia). Idioma: **español**. Estética: **presentación de diapositivas** hecha scroll, con paneles divididos (un lado de color y otro casi blanco), titulares condensados en negrita, mockups de teléfono con video y mockups de monitor y portátil.

---

## 2. Stack y estructura

- **Vite + React** (JavaScript, no TypeScript).
- **CSS plano** con variables CSS, copiando los estilos de la referencia. **Sin Tailwind, sin librerías de UI, sin librerías de animación** (todo es CSS más un poco de JS).
- Fuentes de Google Fonts, con este `<link>`:
  `https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap`

```
portafolio-patricia/
├─ reference/portafolio-patricia-v3.html     ← NO modificar
├─ public/
│  ├─ foto-patricia.jpg
│  └─ videos/                                ← test.mp4 + videos reales por cuenta
├─ src/
│  ├─ main.jsx · App.jsx · index.css
│  ├─ data/content.json                      ← TODO el contenido editable
│  ├─ hooks/useReveal.js · useActiveSlide.js
│  └─ components/
│     ├─ SlideNav.jsx · PaletteSwitch.jsx
│     ├─ PhoneVideo.jsx · Imac.jsx · Laptop.jsx
│     ├─ Cover.jsx · Toolbox.jsx · About.jsx · Experience.jsx
│     ├─ ContentCreation.jsx · Cases.jsx · Accounts.jsx
│     └─ Analytics.jsx · Contact.jsx · Footer.jsx
```

**Todo el contenido (textos, cifras, casos, cuentas, herramientas, rutas de video) vive en `src/data/content.json`** y los componentes lo leen de ahí.

---

## 3. Sistema de diseño (copiar exactamente)

### 3.1 Paletas (dos, intercambiables con `data-pal` en `<html>`)

Por defecto: **morado**. El atributo `data-pal="red"` activa el rojo.

```css
:root{
  --pan:#4a1d96;   /* panel de color */
  --deep:#2a1065;  /* hover de barras y footer */
  --acc:#8b5cf6;   /* acento (titulares sobre fondo claro, líneas de gráfica, foco) */
  --bg:#f5f3fa;    /* panel claro */
  --tint:#e6dff5;  /* fondo de la diapositiva Toolbox */
  --ink:#241046;   /* texto sobre claro */
  --on:#fff;       /* texto sobre panel de color */
  color-scheme:light;
  box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);
  padding-bottom:env(safe-area-inset-bottom,0px);
}
:root[data-pal="red"]{
  --pan:#8e1b1f; --deep:#4a0d10; --acc:#d95f59;
  --bg:#f3f3f1; --tint:#e9dcdb; --ink:#2e0b0d;
}
```

Para quedarte con **una sola paleta** (cuando Patricia decida), basta con borrar el bloque no elegido y el componente `PaletteSwitch`. Deja ambas por ahora y que el switch sea fácil de quitar.

### 3.2 Tipografía

| Clase | Fuente | Uso |
|---|---|---|
| `.an` | `Anton, Impact, sans-serif`, weight 400, `line-height:1.02`, `letter-spacing:.01em` | Titulares, cifras, nombres |
| `.pf` | `"Playfair Display", Georgia, serif`, weight 700, `line-height:1.1` | Titular de "Casos de éxito" y marca de agua "Mi Toolbox" |
| body | `"Barlow Semi Condensed", system-ui, sans-serif`, 400, `font-size:1.15rem`, `line-height:1.5` | Texto general |

`b, strong` → `font-weight:600`. Fondo de `body`: `var(--bg)`, color `var(--ink)`, `overflow-x:hidden`. `html{scroll-behavior:smooth}`. Foco visible: `outline:3px solid var(--acc); outline-offset:3px`.

### 3.3 Estructura base de diapositiva

```css
.slide{min-height:100svh;display:grid;grid-template-columns:var(--c,1fr 1fr);position:relative;overflow:hidden}
.lt{background:var(--bg);color:var(--ink)}
.rd{background:var(--pan);color:var(--on)}
.pn{padding:clamp(34px,6vw,84px);display:flex;flex-direction:column;justify-content:center;position:relative}
.full{grid-template-columns:1fr}
@media(max-width:860px){.slide{grid-template-columns:1fr;min-height:auto}.pn{padding:56px 24px}}
```

Cada diapositiva define sus columnas con la variable `--c` (ver sección 4). `.chip` = `display:inline-block; border:1.5px solid currentColor; border-radius:999px; padding:3px 14px; font-size:.92rem; margin:0 8px 8px 0`.

### 3.4 Animación de entrada ("reveal")

Los elementos con clase `.rv` aparecen al entrar al viewport. **Es la única animación de entrada del sitio.**

```css
.rv{transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}
.js .rv{opacity:0;transform:translateY(34px)}
.js .rv.in{opacity:1;transform:none}
```
- La clase `js` se añade a `<html>` con un script inline en el `<head>` (para que sin JavaScript el contenido sea visible).
- Hook `useReveal`: `IntersectionObserver` con `threshold:.15`; al entrar añade `.in` y deja de observar. Retraso escalonado: `transitionDelay = (índice % 4) * 70 + 'ms'` según el orden del elemento en el documento.
- `@media (prefers-reduced-motion: reduce)`: desactivar transiciones y animaciones y mostrar `.rv` con `opacity:1; transform:none`.

### 3.5 Mockups reutilizables

**Teléfono (`PhoneVideo`):**
```css
.phone{position:relative;width:var(--pw,132px);aspect-ratio:9/19;border-radius:26px;border:4px solid #0b0b0f;background:#000;overflow:hidden;box-shadow:0 16px 36px -14px rgba(0,0,0,.55);flex:none}
.phone::before{content:"";position:absolute;top:6px;left:50%;width:34%;height:9px;border-radius:9px;background:#000;transform:translateX(-50%);z-index:2}
.phone video{width:100%;height:100%;object-fit:cover;display:block}
```

**Monitor tipo iMac (`Imac`):**
```css
.imac{background:#fff;border:6px solid #ececec;border-bottom-width:20px;border-radius:10px;aspect-ratio:16/10;position:relative;color:var(--ink);padding:10px 12px;box-shadow:0 14px 30px -14px rgba(0,0,0,.5)}
.imac::after{content:"";position:absolute;left:50%;bottom:-40px;width:34%;height:22px;transform:translateX(-50%);background:linear-gradient(#dcdcdc,#f1f1f1);clip-path:polygon(18% 0,82% 0,100% 100%,0 100%)}
.imac small{display:block;font-size:.72rem;opacity:.7}
.imac strong{font:400 1.7rem/1 Anton}
.imac svg{width:100%;height:42%;margin-top:6px}
```

**Portátil (`Laptop`):** ver diapositiva 9.

---

## 4. Diapositivas (en este orden, ids `s1` … `s9`)

### Elementos globales fijos

- **`SlideNav` (puntos laterales):** `nav.dots` con `position:fixed; right:14px; top:50%; transform:translateY(-50%); z-index:40; display:flex; flex-direction:column; gap:10px`. Un `<a href="#sN" aria-label="Sección N">` por diapositiva: círculo 11×11px, `background:var(--ink)`, `opacity:.35`, `border:2px solid #fff`, `transition:.25s`. Hover y activo: `opacity:1; background:var(--acc); transform:scale(1.35)`. El activo se calcula con `IntersectionObserver` (`threshold:.5`) sobre las diapositivas. Oculto en ≤860px.
- **`PaletteSwitch`:** `position:fixed; left:14px; bottom:calc(14px + env(safe-area-inset-bottom,0px)); z-index:40`; píldora negra `#111` de radio 999px, `padding:4px`, con dos botones "Morado" y "Rojo" (font 600 .8rem; cada botón `padding:6px 14px`, radio 999px). El activo: fondo blanco, texto `#111`. Usar `aria-pressed`. Cambia `document.documentElement.dataset.pal` (`""` para morado, `"red"` para rojo). No persistir en localStorage.

### s1 · Portada (`--c:1.05fr .95fr`)
- Izquierda `.lt`: `h1.an` "Portafolio" con un `<span>` en bloque "Patricia Reverón" (color `--acc`); el h1 en color `--pan`, `font-size:clamp(3.4rem,10vw,8.4rem)`. Debajo, párrafo (`max-width:34ch; margin:18px 0 0`): "Social Media Manager y especialista en growth. Contenido, publicidad y automatización con resultados medibles."
- Sello "EDICIÓN 2026": `position:absolute; left:clamp(34px,6vw,84px); bottom:28px; font:600 .95rem "Playfair Display"; letter-spacing:.06em`.
- Derecha `.rd`: **trío de teléfonos** con video, `display:flex; justify-content:center; align-items:center`. Teléfonos 1 y 3 con `--pw:clamp(110px,15vw,190px)`; el central con `--pw:clamp(130px,18vw,230px)` y `z-index:2`. Transformaciones: el 1º `rotate(-8deg) translateY(30px)`, el 3º `rotate(8deg) translateY(30px)`.

### s2 · Toolbox (`.full`, fondo `var(--tint)`)
- Marca de agua "Mi Toolbox": `position:absolute; left:4%; top:8%; font:700 clamp(4.5rem,15vw,13rem)/1 "Playfair Display"; color:var(--pan); opacity:.12; pointer-events:none`; `aria-hidden`.
- **Barras** (`position:relative; margin-top:clamp(40px,12vw,150px); display:flex; flex-direction:column; align-items:flex-end; gap:8px`), cada una con ancho `var(--w)`: fondo `--pan`, texto blanco, `padding:12px 22px`, `font:400 clamp(.95rem,2vw,1.35rem)/1.1 Anton`, `letter-spacing:.03em`, mayúsculas. Hover: `translateX(-10px)` y fondo `--deep`. Contenido y anchos:
  1. Gestión de redes sociales · 62%
  2. Estrategia de contenido y copywriting · 80%
  3. Publicidad paga · Meta, LinkedIn, Google · 74%
  4. Lead generation y automatización · 86%
  5. Edición de video y diseño · 68%
  6. Analítica y reportes · 56%
- Debajo (`margin-top:30px; color:var(--pan)`): chips con las 24 herramientas, en este orden: Meta Ads, LinkedIn Ads, Google Ads, Google Analytics, Hootsuite, HubSpot CRM, Kommo CRM, Zoho CRM, ManyChat, LinkedIn Helper, Octopus CRM, GetResponse, Bots de Telegram, Notion, ClickUp, Trello, Asana, Canva, CapCut, Filmora, After Effects, Renderforest, WordPress, Shopify.

### s3 · Sobre mí (`--c:.8fr 1.2fr`)
- Izquierda `.lt`: **tarjeta de reproductor de música** (`.player`): fondo `--pan`, `border-radius:36px`, `padding:22px`, texto blanco, `max-width:340px`, centrada, sombra `0 30px 60px -30px rgba(0,0,0,.6)`. Contenido en orden:
  - Foto `/foto-patricia.jpg`: `width:100%; aspect-ratio:1/1.05; object-fit:cover; border-radius:22px; background:#111`.
  - Fila (`display:flex; justify-content:space-between; font-size:.8rem; opacity:.85; margin:14px 0 4px`): "Patricia Reverón" / "Social Media Manager".
  - Barra de progreso: alto 4px, radio 4px, fondo `rgba(255,255,255,.3)`; relleno blanco al 58% con un punto blanco de 10×10px al final (`right:-5px; top:-3px`).
  - Fila de tiempos: "1:53" / "−1:20" (mismo estilo, `margin-top:6px`).
  - Controles (`display:flex; justify-content:center; gap:34px; margin:16px 0 10px`): tres íconos SVG blancos de 30px: anterior, pausa y siguiente.
  - Volumen: `♪`, barra (relleno 86%), `♬`.
- Derecha `.rd`: `h2.an` "Sobre<br>Mí" (`font-size:clamp(3rem,7vw,5.6rem); margin-bottom:24px`) y dos párrafos (`max-width:46ch; font-size:1.25rem; margin:0 0 18px`):
  1. "Soy **social media manager estratégica** con **más de 5 años de experiencia** haciendo crecer la presencia de marcas muy distintas: desde telecomunicaciones y eSports hasta coaching y tecnología B2B."
  2. "No solo publico contenido: diseño estrategias que generan conversación, construyen comunidad y traen clientes. **Combino creatividad con un análisis riguroso de métricas** para optimizar cada campaña."

### s4 · Experiencia (`.full .lt`)
- `h2.an` "Experiencia": `font-size:clamp(2.8rem,8vw,6rem); color:var(--acc); text-align:center; margin-bottom:46px`.
- Tres columnas (`display:grid; grid-template-columns:repeat(3,1fr)`), cada una con `padding:0 28px` y `border-left:1.5px solid rgba(36,16,70,.25)` (la primera sin borde). En ≤860px: una columna, `gap:30px`, sin borde ni padding.
  - h3: `font:400 clamp(2.2rem,4.4vw,3.4rem)/1 Anton; color:var(--pan); margin-bottom:8px`.
  - h4: `font:600 .95rem/1.25 "Barlow Semi Condensed"; letter-spacing:.06em; text-transform:uppercase; margin:0 0 12px`.
  - p: `opacity:.85`.
  1. **2020 – Hoy** · "Community manager, automatización y video · Mipto Tech, SirSelling, Anmac, Shareity" · "Publicaciones diarias, reels, publicidad en Facebook Business, prospección con LinkedIn Helper y Octopus, automatización en HubSpot y atención al cliente."
  2. **2020 – 2021** · "Branding, bots y leads · Coaches JennyJose, Prospecta B2B" · "Marca y presencia digital completa, guiones y edición de video, bots de Telegram y reportes semanales de captación de leads."
  3. **Más proyectos** · "Redes y leads · Movilnet-e, LinkedDNA" · "Gestión integral de cuatro plataformas con anuncios por evento y reportes mensuales, y captación de 3.000 a 4.000 prospectos diarios."
- Habilidades (`margin-top:44px; text-align:center; color:var(--pan)`), como chips: **destacados** (fondo `--pan`, texto blanco): Disciplina, Adaptabilidad, Pensamiento analítico. Normales: Comunicación asertiva, Toma de decisiones, Trabajo en equipo, Empatía, Proactividad.

### s5 · Creación de contenido (`--c:.9fr 1.1fr`)
- Izquierda `.rd`: `h2.an` "Creación de contenido, producción y edición de video »" (`font-size:clamp(2.2rem,4.6vw,3.6rem); margin-bottom:22px`); párrafo (`max-width:40ch`): "Guion, grabación, edición y entrega. Manejo el ciclo completo: historias interactivas, reels, videos para YouTube y notas para blog."; chips blancos: Filmora, After Effects, CapCut, Renderforest, Canva (`margin-top:20px`).
- Derecha `.lt`: rejilla `.mix` (`display:grid; grid-template-columns:1fr 1fr; gap:20px 26px; align-items:center; max-width:560px; margin:0 auto`):
  - **Monitor iMac** a ancho completo (`grid-column:1/-1; max-width:420px; margin:0 auto 44px; padding:0; overflow:hidden; background:#000`) con un `<video>` dentro (`object-fit:cover`).
  - Dos **teléfonos** (`--pw:100%; max-width:150px; margin:0 auto`) con pie centrado (`font-size:.92rem; opacity:.85`): "Reel · video de prueba" (el texto del pie debe salir de `content.json`).

### s6 · Casos de éxito (`--c:.9fr 1.1fr`)
- Izquierda `.lt`: `h2.pf` "Casos de éxito" (`font-size:clamp(2.2rem,4.6vw,3.8rem); margin-bottom:20px`) y lista (`padding-left:20px; max-width:42ch`, ítems con `margin-bottom:12px`):
  - "Más de **35.9k seguidores** en Instagram con Coaches JennyJose."
  - "**3–4k prospectos al día** con automatización en LinkedDNA."
  - "Ocho marcas con estrategia, anuncios, video y reportes propios."
- Derecha `.rd`: **acordeón** (`max-width:560px; margin:0 auto; width:100%`). Cada fila es un `<button>` (sin estilos nativos) a ancho completo, `display:flex; justify-content:space-between; align-items:baseline; gap:16px; padding:16px 0; border-top:1.5px solid rgba(255,255,255,.3)`; la última fila también lleva borde inferior. Nombre en `font:400 clamp(1.4rem,3vw,2rem)/1 Anton`; métrica a la derecha (`font-size:.92rem; opacity:.85; text-align:right`). El panel se despliega con `display:grid; grid-template-rows:0fr → 1fr` y `transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1)`, hijo con `overflow:hidden`; lista con `padding-left:20px; opacity:.9; margin:0 0 16px`, ítems `font-size:1.05rem; margin-bottom:6px`. Cada fila se abre independiente, con `aria-expanded` y `aria-controls`. Foco: `outline:3px solid #fff`.
- Los 8 casos (nombre · métrica · viñetas) están en `content.json` (ver sección 5).

### s7 · Reels y cuentas (`.full .rd`)
- `h2.an` "Reels y cuentas": `font-size:clamp(2.6rem,7vw,5.4rem); text-align:center`.
- Subtítulo (`text-align:center; opacity:.85; margin:10px auto 44px; max-width:50ch`): "Perfiles de Instagram que he gestionado. Los videos son de prueba y se reemplazan por los reels reales." **Cuando estén los videos reales, cambia este texto a:** "Perfiles de Instagram que he gestionado. Toca uno para verlo."
- Rejilla de teléfonos (`display:flex; flex-wrap:wrap; justify-content:center; gap:26px 22px; max-width:1100px; margin:0 auto`). Cada elemento es un enlace `<a>` a `https://www.instagram.com/{handle}/` (`target="_blank" rel="noopener"`), de ancho 132px, texto blanco centrado, `font-size:.88rem; line-height:1.2`, sin subrayado, con un teléfono y debajo `@handle` (en negrita, en bloque) y "Ver en Instagram". Escalonado: `nth-child(3n+2){margin-top:34px}` y `nth-child(3n){margin-top:-8px}`. Hover: `translateY(-8px) rotate(-2deg)` con `transition:transform .35s cubic-bezier(.22,1,.36,1)`.
- Las 14 cuentas, en este orden: `movilnet_e`, `somosjennyjose`, `miptotech`, `sksgdlprime`, `entredijesmx`, `inteliteam.mx`, `peckers.mx`, `lavanda.spatherapy`, `annstone.jewelry`, `alexlavin11`, `1driveinc`, `nexsourcing`, `keratrendoficial`, `farmtobody`.

### s8 · Analítica y datos (`--c:.85fr 1.15fr`)
- Izquierda `.lt`: ícono SVG de barras (56×56, trazo `--pan`, ancho 2.4, sin relleno, path `M3 20h18M6 16v-5M11 16V6M16 16v-8M21 16v-3`), `h2.an` "Analítica y datos" (`font-size:clamp(2.2rem,4.6vw,3.6rem); margin:16px 0 18px`) y párrafo (`max-width:38ch`): "Interpreto métricas clave para decidir y mejorar el ROI. Entrego reportes mensuales que muestran el crecimiento y qué ajustar en la siguiente campaña."
- Derecha `.rd`: rejilla de 4 monitores iMac (`grid-template-columns:1fr 1fr; gap:34px 28px; max-width:600px; margin:0 auto 40px`), cada uno con título encima (`font:400 1.1rem Anton; text-align:center; margin-bottom:8px; letter-spacing:.03em`), cifra en `strong` y una línea de tendencia SVG (`viewBox="0 0 120 44"`, `preserveAspectRatio="none"`, trazo `var(--acc)`, ancho 3, extremos y uniones redondeados):
  1. Instagram · JennyJose · **35.9k** · `M0 40L20 34 40 36 60 24 80 26 100 12 120 4`
  2. Facebook · JennyJose · **19.8k** · `M0 38L20 36 40 30 60 32 80 20 100 18 120 8`
  3. Prospectos por día · **3–4k** · `M0 30L20 14 40 28 60 10 80 24 100 8 120 16`
  4. Marcas y cuentas · **19** · `M0 40L20 36 40 30 60 28 80 20 100 14 120 6`
- **Nota:** las líneas son decorativas, no son datos históricos reales. Deja un campo opcional `image` en `content.json` por monitor: si se define, se muestra esa captura de analítica en lugar de cifra + línea.

### s9 · Contacto (`--c:1fr 1fr`)
- Izquierda `.lt`: `h2.an` "Hablemos" (`font-size:clamp(3rem,8vw,6.4rem); color:var(--acc); margin-bottom:18px`), párrafo (`max-width:36ch`): "Cuéntame qué necesitas y te propongo un plan con objetivos y métricas claras." y 3 KPIs (`display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:26px; max-width:520px`), cada uno con borde superior `2px solid var(--pan)`, cifra `font:400 2rem/1 Anton; color:var(--pan)` y etiqueta `.85rem`: **+5** años de experiencia · **19** marcas y cuentas · **35.9k** seguidores en IG de JennyJose.
- Derecha `.rd`: **portátil** (`.lap`: `max-width:520px; background:#0d0d12; border:8px solid #1b1b22; border-radius:16px 16px 0 0; padding:16px; color:#fff; position:relative`; base con `::after`: `left:-40px; right:-40px; bottom:-22px; height:14px; background:#cfcfd6; border-radius:0 0 16px 16px`). Dentro, título "CONTACTO" (`font:400 1rem Anton; opacity:.85; letter-spacing:.04em`) y tres filas tipo notificación (`display:flex; align-items:center; gap:12px; background:#1c1c25; border-radius:14px; padding:11px 12px; margin-bottom:8px`; hover fondo `--pan`), cada una con avatar circular de 36px (fondo `--pan`, Anton .9rem) y texto con subtítulo:
  - `@` · patriciareveron15@gmail.com · Correo → `mailto:patriciareveron15@gmail.com`
  - `W` · +58 424 150 6797 · WhatsApp → `https://wa.me/584241506797`
  - `in` · Patricia Reverón · LinkedIn → `https://www.linkedin.com/in/patricia-rever%C3%B2n92a8631b0/`

### Footer
Banda `background:var(--deep); color:#fff; text-align:center; padding:26px 14px; font-size:.9rem`: "© 2026 Patricia Reverón · Referencias disponibles bajo solicitud".

---

## 5. Contenido (`src/data/content.json`)

Estructura mínima que debe existir (los textos de las diapositivas de la sección 4 también deben vivir aquí):

```json
{
  "videoDefault": "/videos/test.mp4",
  "cover": [null, null, null],
  "contentSlide": { "monitor": null, "phones": [null, null], "caption": "Reel · video de prueba" },
  "accounts": [
    {"handle":"movilnet_e","video":null},
    {"handle":"somosjennyjose","video":null},
    {"handle":"miptotech","video":null},
    {"handle":"sksgdlprime","video":null},
    {"handle":"entredijesmx","video":null},
    {"handle":"inteliteam.mx","video":null},
    {"handle":"peckers.mx","video":null},
    {"handle":"lavanda.spatherapy","video":null},
    {"handle":"annstone.jewelry","video":null},
    {"handle":"alexlavin11","video":null},
    {"handle":"1driveinc","video":null},
    {"handle":"nexsourcing","video":null},
    {"handle":"keratrendoficial","video":null},
    {"handle":"farmtobody","video":null}
  ],
  "cases": [
    {"name":"Coaches JennyJose","metric":"35.9k en Instagram","bullets":["Guiones y edición de video para coaching y desarrollo personal.","Marca y presencia digital en todas las redes, con copy y estrategia.","Bots de Telegram con menús y recolección de datos."]},
    {"name":"LinkedDNA","metric":"3–4k prospectos al día","bullets":["Captación de clientes potenciales a gran escala.","Bases de datos masivas organizadas para el embudo de ventas.","Automatización con LinkedIn Helper y Octopus CRM."]},
    {"name":"Movilnet-e","metric":"4 plataformas","bullets":["Campañas pagas optimizadas para los eventos de la marca.","Ciclo completo de contenido, de historias a notas del blog de eSports.","Reportes mensuales de rendimiento."]},
    {"name":"Mipto Tech","metric":"366 en Instagram","bullets":["Publicaciones diarias, historias interactivas y reels.","Publicidad con Facebook Business.","Coordinación del equipo de diseño."]},
    {"name":"SirSelling","metric":"236 en Instagram","bullets":["Prospección con LinkedIn Helper y automatización en HubSpot CRM.","Listas, formularios, bot para landing page y customer journey."]},
    {"name":"Anmac Global Consulting","metric":"53 en Facebook","bullets":["Prospección en LinkedIn con Octopus CRM.","Videos para la parrilla de contenido de YouTube."]},
    {"name":"Shareity","metric":"776 en Instagram","bullets":["Atención a clientes desde la bandeja de HubSpot CRM.","Prospección en LinkedIn con Octopus CRM."]},
    {"name":"Prospecta B2B","metric":"Reportes semanales","bullets":["Búsqueda de clientes con LinkedIn Helper.","Reporte semanal de captación de leads y su estado."]}
  ]
}
```

Un valor `null` en `video` significa "usar `videoDefault`".

---

## 6. Sistema de videos (importante)

**Hoy:** todos los teléfonos y el monitor usan el mismo video de prueba `public/videos/test.mp4`. **Después:** el usuario copiará los videos reales de cada cuenta en `public/videos/` y deben sustituirse sin tocar el código.

- **Convención de nombres:** `public/videos/{handle}.mp4`. Ejemplo: `public/videos/peckers.mx.mp4`, `public/videos/lavanda.spatherapy.mp4`.
- **Resolución automática:** el componente `PhoneVideo` recibe `handle` (o `src`). Orden de búsqueda: (1) `src` explícito de `content.json`; (2) `/videos/{handle}.mp4`; (3) `videoDefault`. Si el archivo del paso 1 o 2 no carga (`onError` del `<video>`), cambia automáticamente a `videoDefault`. Así el sitio nunca muestra un teléfono vacío.
- **Atributos del `<video>`:** `muted`, `loop`, `playsInline`, `autoPlay`, `preload="metadata"`, sin controles.
- **Rendimiento (sin cambiar el diseño):** con `IntersectionObserver` (`threshold:.25`), reproducir el video solo cuando su teléfono está visible y pausarlo al salir. Con `prefers-reduced-motion`, no reproducir automáticamente y mostrar el primer fotograma.
- **Formato recomendado de los videos:** vertical 9:16, H.264 (mp4), máximo 720×1280, sin audio, 5–15 s, idealmente ≤3 MB cada uno. Añade al `README` un comando de ejemplo para comprimir con ffmpeg:
  `ffmpeg -i entrada.mp4 -vf "scale=720:-2" -c:v libx264 -crf 28 -an -movflags +faststart salida.mp4`
- **Opcional:** si existe `public/videos/{handle}.jpg`, usarlo como `poster`.
- Crea un `README.md` corto con: cómo ejecutar el proyecto, cómo cambiar un video, cómo editar `content.json` y cómo elegir una sola paleta.

---

## 7. Responsive (breakpoints exactos)

- **≤860px:** las diapositivas pasan a una columna (`min-height:auto`), los paneles usan `padding:56px 24px`, los puntos laterales se ocultan, las columnas de experiencia se apilan.
- Sin scroll horizontal en ningún ancho.
- En móvil, el panel claro y el de color se apilan en el orden del HTML (s5: primero el panel de color, luego el claro).

---

## 8. Qué NO debes hacer

- No cambies colores, fuentes, tamaños, textos ni cifras.
- No añadas secciones, íconos, sombras, librerías ni animaciones nuevas.
- No uses `localStorage` (la paleta no se recuerda).
- No inventes datos: las líneas de tendencia son decorativas y los videos son de prueba.
- No publiques teléfonos de referencias personales.
- No pongas audio en los videos.

---

## 9. Proceso de trabajo

1. Abre `reference/portafolio-patricia-v3.html` en el navegador y léelo completo.
2. Crea el proyecto con Vite + React, copia variables y estilos a `index.css` y construye los componentes en el orden de la sección 4.
3. Al terminar cada diapositiva, compárala **lado a lado con la referencia** a 1440px y 390px.
4. Al final, ejecuta `npm run build` y confirma que no hay errores ni warnings.

## 10. Criterios de aceptación

- [ ] Las 9 diapositivas se ven igual que la referencia en 1440px, 768px y 390px.
- [ ] Morado es la paleta por defecto; el switch cambia a rojo y de vuelta, sin recargar.
- [ ] Los puntos laterales marcan la diapositiva activa y navegan con scroll suave.
- [ ] La animación de entrada `.rv` es la única y respeta `prefers-reduced-motion`.
- [ ] Los 14 teléfonos de s7 enlazan al Instagram correcto y abren en pestaña nueva.
- [ ] Cada teléfono usa `/videos/{handle}.mp4` si existe y, si no, `test.mp4`; nunca queda vacío.
- [ ] Los videos solo se reproducen cuando están visibles.
- [ ] El acordeón de casos abre y cierra cada fila de forma independiente, con `aria-expanded`.
- [ ] Todo el contenido sale de `content.json`.
- [ ] Navegación por teclado con foco visible.
- [ ] `npm run build` termina sin errores.

---

## 11. Datos pendientes de confirmar con Patricia (no bloquean el desarrollo)

- Fechas reales de Movilnet-e y LinkedDNA, y qué proyectos siguen activos.
- Cifras que no coinciden entre fuentes: JennyJose 35.9k (portafolio) vs 33.4k (captura); Mipto Tech 366 vs 411.
- Rubro y resultados de las 11 cuentas nuevas (hoy solo muestran el @usuario).
- Capturas reales de analítica para reemplazar las líneas decorativas de s8.
- Permiso para mostrar contenido de las cuentas de los clientes.
