# AnimeSuge

Proyecto web estático desarrollado en HTML, CSS y TypeScript.

## Contenido
- index.html: Página principal del sitio
- hola.html: Página de prueba para GitHub Pages

### TypeScript (src/, módulos ES)
- src/header.ts: sombra del header al hacer scroll
- src/reveal.ts: animación de aparición de tarjetas y secciones al entrar en pantalla
- src/banner.ts: entrada con zoom del banner principal
- src/main.ts: punto de entrada, importa y arranca los módulos anteriores

Cada módulo se compila 1:1 a su equivalente en `assets/js/*.js` (generado, no editar a mano). `index.html` carga solo `assets/js/main.js` como `<script type="module">`, y este importa el resto.

### CSS (assets/css/, un archivo por sección)
- base.css: reset y estilos base del body
- header.css: header, navegación, selector de idioma
- banner.css: banner principal
- search.css: barra de búsqueda
- cards.css: grilla de tarjetas de anime
- sections.css: columnas de "Recently Added", "Most Viewed" y "Just Completed"
- footer.css: pie de página

`index.html` los carga con un `<link>` por archivo (en vez de un único CSS gigante), así cada sección de estilos se puede editar de forma aislada.

## Desarrollo

Requiere Node.js.

```bash
npm install       # instala TypeScript
npm run build     # compila src/*.ts a assets/js/*.js
npm run watch     # recompila automáticamente al guardar cambios
```

El sitio sigue siendo estático: `index.html` carga los archivos `.js` ya compilados, así que funciona en GitHub Pages sin build en el servidor. Solo hay que recordar ejecutar `npm run build` y subir los `.js` resultantes después de editar los `.ts`.

## Autor
Dilan Barajas
