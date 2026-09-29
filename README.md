# Portafolio · Julian Gomez (AI Developer)

Sitio personal bilingüe (inglés / español) hecho con [Astro](https://astro.build). Es estático, dark-first y se despliega en GitHub Pages:

- Inglés: https://juliangomezn.github.io/my_web/en/
- Español: https://juliangomezn.github.io/my_web/es/
- La raíz `/my_web/` redirige al idioma guardado o al del navegador.

## Requisitos

- Node.js **22.12 o superior** (Astro 7). En CI se usa Node 24.
- npm

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:4321/my_web/
npm run build     # astro check (tipos) + build estático en dist/
npm test          # tests de contenido y del dist/ (requiere build previo)
npm run preview   # sirve dist/ igual que en producción
```

## Estructura

```
src/
  content/
    projects/{en,es}/*.md      Proyectos (un archivo por idioma, mismo nombre)
    journey.yaml               Trayectoria: educación, investigación, comunidades
    certifications.yaml        Certificaciones
    blog/{en,es}/*.md          Posts (ocultos mientras sean draft)
    schemas.ts                 Reglas (zod) que valida el build y los tests
  data/
    profile.ts                 Email, GitHub, LinkedIn, nombre de los CV
    skills.ts                  Habilidades e idiomas
    sections.ts                Secciones de la home y orden del menú
  i18n/ui.ts                   Todos los textos de interfaz (en / es)
  components/                  Una sección por componente
  pages/[lang]/index.astro     Home de cada idioma
  styles/global.css            Tema oscuro/claro y estilos
public/cv-julian-gomez-{en,es}.pdf
tests/                         Vitest
```

## Cómo editar el contenido

**Agregar un proyecto.** Crea `src/content/projects/en/<slug>.md` y `src/content/projects/es/<slug>.md` con el mismo `<slug>`. Copia el frontmatter de uno existente. `order` define la posición y `status` puede ser `done` o `in-progress`. Si falta la traducción, el test falla.

**Agregar una certificación.** Añade una entrada en `src/content/certifications.yaml`. Usa `featured: true` para mostrarla arriba (deja entre 4 y 6 destacadas). `url` es opcional: pega ahí el link "Show credential" de LinkedIn. Sin él, la tarjeta enlaza a tu página de certificaciones.

**Agregar una entrada de trayectoria.** Añade un bloque en `src/content/journey.yaml` con `title` y `points` en `en` y `es`. Si la entrada sigue vigente, omite `end`. El orden en la página es automático.

**Publicar en el blog.** Escribe el post en `src/content/blog/<lang>/<slug>.md` y cambia `draft: true` a `draft: false`. Con al menos un post publicado en un idioma aparecen la página `/blog/` y el link en el menú de ese idioma.

**Cambiar textos de interfaz.** Todo está en `src/i18n/ui.ts`. El objeto `es` tiene el mismo tipo que `en`, así que TypeScript avisa si falta una clave.

**Actualizar el CV.** Reemplaza los PDF en `public/` manteniendo los nombres.

## Quitar una sección

1. Borra su línea en `src/pages/[lang]/index.astro` (por ejemplo, `<Journey lang={lang} />`).
2. Borra su id en `src/data/sections.ts` para quitarla del menú.

## Tests

`npm test` corre cuatro suites:

- `i18n.test.ts`: paridad de textos en/es, base path, cambio de idioma, detección de idioma.
- `lib.test.ts`: tema, orden de la trayectoria, agrupación de certificaciones, filtro del blog.
- `content.test.ts`: valida los archivos de contenido con los mismos esquemas del build.
- `dist.test.ts`: revisa el sitio generado: cada link interno usa `/my_web/` y existe, CV por idioma, canonical/hreflang, skip link, menú vs. secciones, sin formulario y blog oculto si no hay posts publicados.

## Despliegue

`.github/workflows/deploy.yml` corre en cada push a `main`: instala con `npm ci`, ejecuta `npm run build` y `npm test` y, si todo pasa, copia `dist/` a la rama `gh-pages` como un commit nuevo. GitHub Pages sirve esa rama: Settings → Pages → Source debe estar en **Deploy from a branch**, rama `gh-pages`, carpeta `/ (root)`.

`public/.nojekyll` evita que GitHub procese el sitio con Jekyll, que ignoraría la carpeta `_astro/` (CSS, JS e imágenes). No lo borres.

No hagas merge de `main` en `gh-pages`: esa rama solo contiene el sitio compilado.

Si el repositorio cambia de nombre, actualiza `base` en `astro.config.mjs` y `BASE` en `tests/helpers.ts`.

## Autor

Julian Andres Gomez Niño · [GitHub](https://github.com/JulianGomezN) · [LinkedIn](https://www.linkedin.com/in/julian-andres-gomez-ni%C3%B1o-b91820186/) · juliangomezni@gmail.com
