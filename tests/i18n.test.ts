import { describe, expect, it } from 'vitest';
import { ui } from '../src/i18n/ui';
import { detectPreferredLang, getAlternatePath, getLangFromPath, joinBase } from '../src/i18n/utils';

function keyPaths(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([key, value]) => keyPaths(value, prefix ? `${prefix}.${key}` : key));
}

describe('ui strings', () => {
  it('has the same keys in every language', () => {
    expect(keyPaths(ui.es).sort()).toEqual(keyPaths(ui.en).sort());
  });

  it('has no empty strings', () => {
    for (const lang of ['en', 'es'] as const) {
      const empty = keyPaths(ui[lang]).filter((path) => {
        const value = path.split('.').reduce<unknown>((acc, k) => (acc as Record<string, unknown>)[k], ui[lang]);
        return typeof value !== 'string' || value.trim() === '';
      });
      expect(empty, `empty keys in ${lang}`).toEqual([]);
    }
  });

  it('uses the AI Developer role in both languages', () => {
    expect(ui.en.hero.role).toBe('AI Developer');
    expect(ui.es.hero.role).toBe('AI Developer');
  });
});

describe('joinBase', () => {
  it('prefixes paths with the base, with or without trailing slash', () => {
    expect(joinBase('/my_web', '/cv.pdf')).toBe('/my_web/cv.pdf');
    expect(joinBase('/my_web/', '/cv.pdf')).toBe('/my_web/cv.pdf');
    expect(joinBase('/my_web', 'cv.pdf')).toBe('/my_web/cv.pdf');
    expect(joinBase('/my_web', '/')).toBe('/my_web/');
  });

  it('works with a root base', () => {
    expect(joinBase('/', '/es/')).toBe('/es/');
  });
});

describe('getAlternatePath', () => {
  it('swaps the language and keeps the rest of the path', () => {
    expect(getAlternatePath('/my_web/en/', 'es', '/my_web')).toBe('/my_web/es/');
    expect(getAlternatePath('/my_web/es/blog/post', 'en', '/my_web')).toBe('/my_web/en/blog/post/');
  });

  it('keeps the hash', () => {
    expect(getAlternatePath('/my_web/en/#projects', 'es', '/my_web')).toBe('/my_web/es/#projects');
  });

  it('adds a language when the path has none', () => {
    expect(getAlternatePath('/my_web/', 'es', '/my_web/')).toBe('/my_web/es/');
  });
});

describe('getLangFromPath', () => {
  it('reads the language after the base', () => {
    expect(getLangFromPath('/my_web/es/', '/my_web')).toBe('es');
    expect(getLangFromPath('/my_web/en/blog/', '/my_web')).toBe('en');
  });

  it('falls back to English', () => {
    expect(getLangFromPath('/my_web/', '/my_web')).toBe('en');
    expect(getLangFromPath('/my_web/fr/', '/my_web')).toBe('en');
  });
});

describe('detectPreferredLang', () => {
  it('prefers the stored choice', () => {
    expect(detectPreferredLang('es', ['en-US'])).toBe('es');
    expect(detectPreferredLang('en', ['es-CO'])).toBe('en');
  });

  it('uses the first supported browser language', () => {
    expect(detectPreferredLang(null, ['es-CO', 'en'])).toBe('es');
    expect(detectPreferredLang(null, ['fr-FR', 'es'])).toBe('es');
    expect(detectPreferredLang(null, ['en-GB', 'es'])).toBe('en');
  });

  it('ignores invalid stored values and defaults to English', () => {
    expect(detectPreferredLang('de', ['fr'])).toBe('en');
    expect(detectPreferredLang(undefined, [])).toBe('en');
  });
});
