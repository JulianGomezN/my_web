# Changelog

Todos los cambios relevantes del sitio se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [Semantic Versioning](https://semver.org/lang/es/).

## [2.0.0] - 2026-09-29

### Added

- Migración a Astro 7 con content collections validadas con zod.
- Rutas por idioma `/my_web/en/` y `/my_web/es/`, con `canonical`, `hreflang` y redirección desde la raíz según la preferencia guardada o el idioma del navegador.
- Sección **Proyectos**: UNxchange, ElGamal Secure Voting System, CarWash Management Platform y una tarjeta "En progreso" de pipeline de ML.
- Sección **Trayectoria**: UNAL, bachillerato, semillero de modelos generativos, IEEE TEMS UN, IEEE Computer Society, FIN-UN y AWS Student Community Day.
- Sección **Certificaciones**: 16 certificaciones (sin duplicados), 6 destacadas, listado agrupado por categoría y link a LinkedIn.
- Bloque de idiomas y estadísticas calculadas desde el contenido.
- Blog con estructura lista y oculto hasta que exista un post con `draft: false`.
- Red neuronal SVG decorativa en el hero y animaciones de entrada que respetan `prefers-reduced-motion`.
- Skip link, foco visible, menú móvil con `aria-expanded` y cierre con Escape.
- Suite de tests con Vitest (contenido, i18n, helpers y validación del `dist/`).
- Paso `npm test` en el workflow de despliegue: un test fallido bloquea el deploy.
- Este CHANGELOG.

### Changed

- Perfil presentado como **AI Developer**, con textos basados en el CV y honestos sobre la etapa de formación.
- Habilidades alineadas al CV y a los proyectos.
- Diseño dark-first: paleta violeta/cian, acentos en Fira Code y modo claro opcional que se recuerda.
- Foto optimizada con `astro:assets` (de 231 kB a 19 kB en WebP).
- Workflow de GitHub Actions con Node 24 (Astro 7 requiere Node 22.12 o superior).
- README reescrito en español con guía para editar contenido.

### Removed

- Formulario de contacto y dependencia `@emailjs/browser`. El contacto queda con links directos.
- Setup de Vite vanilla (`index.html`, `vite.config.ts`, `src/main.ts`, `src/i18n.ts`, `src/theme.ts`, `src/styles.css`).
- Dependencia `gh-pages` y scripts `predeploy`/`deploy`.
- Tecnologías sin respaldo en el CV (Kubernetes, GCP, Django, MLflow, entre otras).

### Fixed

- CV en inglés y español actualizados a la versión más reciente.
- Tarjetas de contacto del mismo tamaño y sin cortar el texto (3 columnas en escritorio, 2 en tablet, 1 en celular).
- La versión en inglés usa siempre "National University of Colombia" (descripción, hero, sobre mí, trayectoria y blog). Un test lo verifica en todas las páginas en inglés.
- El link de descarga del CV ahora incluye el base path `/my_web/` y funciona en producción en ambos idiomas.
- Se eliminó el contenido duplicado entre el HTML y el archivo de traducciones: cada texto existe una sola vez por idioma.

## [1.0.0]

- Versión inicial con Vite y TypeScript: hero, sobre mí, habilidades y contacto con EmailJS, bilingüe con cambio de idioma en el navegador y tema claro/oscuro.
