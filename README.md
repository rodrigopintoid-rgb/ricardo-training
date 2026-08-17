# Ricardo Training — landing

Landing estática de una sola página (es-CL). Sin framework, sin build step, sin backend.
Se sirve tal cual como archivos estáticos.

```
index.html     markup + sprite SVG de iconos
styles.css     tokens del design system + todos los estilos
main.js        menú móvil, palabra rotativa, carruseles, FAQ, widget de WhatsApp
assets/        imágenes (.webp)
```

## Verla en local

Cualquier servidor estático sirve. Por ejemplo:

```bash
python -m http.server 4173
```

Y abrir `http://localhost:4173`. (`.claude/launch.json` deja esto configurado para el
preview de Claude Code.)

## Para publicar

Sube `index.html`, `styles.css`, `main.js` y `assets/` a cualquier hosting estático
(Netlify, Vercel, Cloudflare Pages, S3, hosting compartido). No hay nada que compilar.

## Notas de implementación

- **Breakpoints:** 720 px (tablet) y 1080 px (escritorio), más un ajuste en 900 px para
  las secciones "Comunidad" y "Conoce a Ricardo". El orden de la cascada en `styles.css`
  reproduce el del diseño original: base → 900 → 720 → 1080. Si mueves bloques de media
  query, algunos overrides dejan de aplicar.
- **Iconos:** SVG de lucide incrustados como `<symbol>` al inicio del `index.html` y
  referenciados con `<use>`. No hay CDN.
- **Tipografía:** Inter desde Google Fonts.
- **Fuera del hero, las imágenes usan `loading="lazy"`.**

## Notas sobre las imágenes

Las tarjetas de Instagram usan marco 3:4 con `object-fit: cover`. El encuadre vertical de
`ig-1` e `ig-2` va como `object-position` en línea en `index.html`; el resto va centrado.

`ig-5` e `ig-6` son cuadradas (720×720), así que el marco 3:4 recorta **90 px por lado**.
En `ig-6` (la foto grupal) eso alcanza a cortar a las personas de los extremos. Si quieres
que salgan todas, hay que reemplazarla por una versión vertical 3:4 — desde una imagen
cuadrada no hay `object-position` que lo resuelva, porque la pérdida es simétrica.

### Archivos de `assets/` que la landing no usa

Vienen de iteraciones anteriores del diseño; se pueden borrar:

`hero-desktop.webp` · `hero-gym.webp` · `ricardo-cutout.webp` · `ricardo-gym-curl.webp` ·
`ricardo-plate.webp` · `ricardo-portrait-bw.webp` · `ricardo-run.webp` ·
`ricardo-stretch.webp` · `team-desktop.webp` · `team-mobile.webp` · `wa-avatar.webp`

El avatar del widget de WhatsApp usa `ricardo-portrait-gym.webp`, que es lo que indica el
diseño v2; por eso `wa-avatar.webp` queda sin uso.
