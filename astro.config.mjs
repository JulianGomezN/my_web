// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // GitHub Pages: https://juliangomezn.github.io/my_web/
  site: 'https://juliangomezn.github.io',
  base: '/my_web',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      // Both languages live under a prefix: /my_web/en/ and /my_web/es/
      prefixDefaultLocale: true,
      // The root page (src/pages/index.astro) implements its own language
      // detection, so Astro must not redirect it to /en/ automatically.
      redirectToDefaultLocale: false,
    },
  },
});
