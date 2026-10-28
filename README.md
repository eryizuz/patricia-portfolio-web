# Portafolio de Patricia Reverón

Portafolio personal de Patricia Reverón (Social Media Manager y especialista en growth), construido con **Vite + React** y CSS plano. El diseño sigue el prototipo `reference/portafolio-patricia-v3.html`.

## Cómo ejecutar

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # revisar el build
```

## Cómo cambiar un video

Cada teléfono busca su video en `public/videos/{handle}.mp4`. Por ejemplo, para la cuenta `@peckers.mx`:

```text
public/videos/peckers.mx.mp4
```

Si el archivo no existe (o falla al cargar), se usa automáticamente `public/videos/test.mp4`, así que ningún mockup queda vacío. Los videos se reproducen solo cuando están visibles.

Para usar un video puntual sin seguir la convención, cambia el campo `video` de esa cuenta en `src/data/content.json`:

```json
{ "handle": "peckers.mx", "video": "/videos/mi-video.mp4" }
```

Formato recomendado: vertical 9:16, H.264 (mp4), máximo 720×1280, sin audio, 5–15 s. Comando de compresión:

```bash
ffmpeg -i entrada.mp4 -vf "scale=720:-2" -c:v libx264 -crf 28 -an -movflags +faststart salida.mp4
```

Opcional: si existe `public/videos/{handle}.jpg`, se usa como póster del video.

## Cómo editar el contenido

Todo el texto, cifras, casos, cuentas, herramientas y rutas de video están en `src/data/content.json`. No hace falta tocar los componentes para cambiar textos. Las negritas se escriben con `**texto**`.

- `cover.videos`: los tres teléfonos de la portada (`null` = video por defecto).
- `contentSlide.monitor` y `contentSlide.phones`: videos de la diapositiva de contenido.
- `accounts.items`: handles de Instagram; el enlace se genera automáticamente.
- `analytics.monitors[].image`: si se define una ruta, se muestra esa captura en lugar de la cifra y la línea decorativa.

## Cómo elegir una sola paleta

Por defecto se usa la paleta morada; el interruptor cambia a rojo sin recargar (no se guarda en el navegador). Cuando Patricia decida una sola paleta:

1. Borra el bloque `:root[data-pal='red']` de `src/index.css`.
2. Elimina `src/components/PaletteSwitch.jsx` y su uso en `src/App.jsx` (junto con `palette` de `content.json` si quieres).

## Estructura

```text
public/                 foto, videos de prueba y videos reales
reference/              prototipo original (no se modifica)
src/
  data/content.json     todo el contenido editable
  hooks/                useReveal · useActiveSlide
  components/           diapositivas y mockups
  index.css             sistema de diseño
```
