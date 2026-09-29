/**
 * Checks the built site in dist/. Run `npm run build` first (CI does it).
 * These tests catch base-path bugs, broken internal links and SEO regressions.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { sectionIds } from '../src/data/sections';
import {
  attrValues,
  BASE,
  DIST,
  distFileForUrl,
  distHtmlFiles,
  distRel,
  readDist,
  readFrontmatter,
  localizedSlugs,
  ROOT,
  walk,
} from './helpers';

const SITE = 'https://juliangomezn.github.io';
const langs = ['en', 'es'] as const;

if (!existsSync(join(DIST, 'index.html'))) {
  throw new Error('dist/ not found. Run `npm run build` before `npm test`.');
}

describe('pages', () => {
  it('builds the root redirect and one home page per language', () => {
    expect(existsSync(join(DIST, 'index.html'))).toBe(true);
    for (const lang of langs) expect(existsSync(join(DIST, lang, 'index.html')), lang).toBe(true);
  });

  it('sets the lang attribute of each home page', () => {
    for (const lang of langs) expect(readDist(`${lang}/index.html`)).toMatch(new RegExp(`<html[^>]*lang="${lang}"`));
  });

  it('includes .nojekyll so GitHub Pages serves the _astro/ folder', () => {
    expect(existsSync(join(DIST, '.nojekyll'))).toBe(true);
  });

  it('root page redirects without JS to English', () => {
    const html = readDist('index.html');
    expect(html).toContain(`url=${BASE}/en/`);
    expect(html).toContain('noindex');
  });

  it('uses the English university name on English pages', () => {
    for (const file of distHtmlFiles().filter((f) => distRel(f).startsWith('en/'))) {
      const html = readDist(distRel(file));
      expect(html, distRel(file)).not.toContain('Universidad Nacional');
      // "UNAL" alone is the Spanish acronym; the club's official name "UNAL Finance Club" is kept.
      expect(html.replaceAll('UNAL Finance Club', ''), distRel(file)).not.toMatch(/\bUNAL\b/);
    }
    expect(readDist('en/index.html')).toContain('National University of Colombia');
    expect(readDist('es/index.html')).toContain('Universidad Nacional de Colombia');
  });

  it('has the AI Developer role on both home pages', () => {
    for (const lang of langs) expect(readDist(`${lang}/index.html`)).toContain('AI Developer');
  });
});

describe('SEO', () => {
  for (const lang of langs) {
    it(`${lang}: canonical, hreflang and skip link`, () => {
      const html = readDist(`${lang}/index.html`);
      expect(html).toContain(`<link rel="canonical" href="${SITE}${BASE}/${lang}/"`);
      expect(html).toContain(`hreflang="en" href="${SITE}${BASE}/en/"`);
      expect(html).toContain(`hreflang="es" href="${SITE}${BASE}/es/"`);
      expect(html).toContain(`hreflang="x-default" href="${SITE}${BASE}/"`);
      expect(html).toMatch(/class="skip-link" href="#main"/);
      expect(html).toContain('id="main"');
    });
  }

  it('starts in dark mode and includes the no-flash theme script', () => {
    for (const lang of langs) {
      const html = readDist(`${lang}/index.html`);
      expect(html).toMatch(/<html[^>]*class="dark"/);
      expect(html).toContain("localStorage.getItem('theme') === 'light'");
    }
  });
});

describe('internal links', () => {
  const files = distHtmlFiles();

  it('every internal href/src uses the base path and points to an existing file', () => {
    const broken: string[] = [];
    for (const file of files) {
      const html = readDist(distRel(file));
      const urls = [...attrValues(html, 'href'), ...attrValues(html, 'src'), ...attrValues(html, 'srcset').flatMap((s) => s.split(',').map((p) => p.trim().split(' ')[0]))];
      for (const url of urls) {
        if (!url || url.startsWith('#') || /^(https?:|mailto:|data:|\/\/)/.test(url)) continue;
        if (!url.startsWith(`${BASE}/`)) {
          broken.push(`${distRel(file)}: ${url} (missing base path)`);
          continue;
        }
        if (!distFileForUrl(url)) broken.push(`${distRel(file)}: ${url} (not found)`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('each home page links the CV of its language', () => {
    for (const lang of langs) {
      const html = readDist(`${lang}/index.html`);
      const cv = `${BASE}/cv-julian-gomez-${lang}.pdf`;
      expect(html).toContain(`href="${cv}"`);
      expect(distFileForUrl(cv)).not.toBeNull();
    }
  });

  it('navigation links point to sections that exist on the page', () => {
    for (const lang of langs) {
      const html = readDist(`${lang}/index.html`);
      const nav = /<ul class="nav-menu"[\s\S]*?<\/ul>/.exec(html)?.[0] ?? '';
      const hashes = attrValues(nav, 'href').map((href) => href.split('#')[1]).filter(Boolean);
      expect(hashes.sort()).toEqual([...sectionIds].sort());
      for (const id of hashes) expect(html, `#${id} in ${lang}`).toContain(`id="${id}"`);
    }
  });

  it('language switch points to the other language', () => {
    expect(readDist('en/index.html')).toMatch(new RegExp(`id="lang-switch" href="${BASE}/es/"`));
    expect(readDist('es/index.html')).toMatch(new RegExp(`id="lang-switch" href="${BASE}/en/"`));
  });
});

describe('sections', () => {
  it('renders every project of each language', () => {
    const slugs = localizedSlugs('src/content/projects');
    for (const lang of langs) {
      const html = readDist(`${lang}/index.html`);
      for (const slug of slugs[lang]) {
        const { title } = readFrontmatter(join(ROOT, 'src/content/projects', lang, `${slug}.md`));
        expect(html, `${lang}/${slug}`).toContain(String(title));
      }
    }
  });

  it('renders every certification', () => {
    const html = readDist('en/index.html');
    const ids = attrValues(html, 'data-cert');
    expect(new Set(ids).size).toBeGreaterThanOrEqual(15);
  });
});

describe('contact', () => {
  it('has no form and no EmailJS leftovers', () => {
    for (const file of walk(DIST).filter((f) => /\.(html|js)$/.test(f))) {
      const text = readDist(distRel(file));
      expect(text, distRel(file)).not.toMatch(/<form/i);
      expect(text.toLowerCase(), distRel(file)).not.toContain('emailjs');
    }
  });
});

describe('blog', () => {
  const slugs = localizedSlugs('src/content/blog');
  const published = Object.fromEntries(
    langs.map((lang) => [
      lang,
      (slugs[lang] ?? []).filter(
        (slug) => readFrontmatter(join(ROOT, 'src/content/blog', lang, `${slug}.md`)).draft === false,
      ),
    ]),
  ) as Record<(typeof langs)[number], string[]>;

  for (const lang of langs) {
    it(`${lang}: blog pages and nav link exist only with published posts`, () => {
      const html = readDist(`${lang}/index.html`);
      const hasBlogLink = html.includes(`href="${BASE}/${lang}/blog/"`);
      const blogBuilt = existsSync(join(DIST, lang, 'blog'));
      if (published[lang].length === 0) {
        expect(hasBlogLink).toBe(false);
        expect(blogBuilt).toBe(false);
      } else {
        expect(hasBlogLink).toBe(true);
        for (const slug of published[lang]) expect(existsSync(join(DIST, lang, 'blog', slug, 'index.html'))).toBe(true);
      }
    });
  }
});
