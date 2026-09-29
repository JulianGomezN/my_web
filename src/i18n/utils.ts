import { defaultLang, languages, ui, type Lang, type UIStrings } from './ui';

export const LANG_STORAGE_KEY = 'preferred-language';

export const supportedLangs = Object.keys(languages) as Lang[];

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (supportedLangs as string[]).includes(value);
}

export function useTranslations(lang: Lang): UIStrings {
  return ui[lang];
}

/** Removes the trailing slash of a base path ('/my_web/' -> '/my_web', '/' -> ''). */
function normalizeBase(base: string): string {
  return base.replace(/\/+$/, '');
}

/**
 * Prefixes an internal path with the site base path.
 * Pure version, used by tests and by `withBase`.
 */
export function joinBase(base: string, path = '/'): string {
  const cleanBase = normalizeBase(base);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/** Prefixes an internal path with the configured `base` (e.g. '/my_web'). */
export function withBase(path = '/'): string {
  return joinBase(import.meta.env.BASE_URL, path);
}

/** URL of a page in a given language: localePath('es', 'blog/') -> '/my_web/es/blog/'. */
export function localePath(lang: Lang, path = ''): string {
  const cleanPath = path.replace(/^\/+/, '');
  return withBase(`/${lang}/${cleanPath}`);
}

/** Reads the language from a pathname that may include the base path. */
export function getLangFromPath(pathname: string, base: string = import.meta.env.BASE_URL): Lang {
  const cleanBase = normalizeBase(base);
  const rest = cleanBase && pathname.startsWith(cleanBase) ? pathname.slice(cleanBase.length) : pathname;
  const [, first] = rest.split('/');
  return isLang(first) ? first : defaultLang;
}

/**
 * Returns the same page in another language, keeping the rest of the path and the hash.
 * getAlternatePath('/my_web/en/blog/post/#top', 'es', '/my_web') -> '/my_web/es/blog/post/#top'
 */
export function getAlternatePath(
  pathnameWithHash: string,
  target: Lang,
  base: string = import.meta.env.BASE_URL,
): string {
  const cleanBase = normalizeBase(base);
  const hashIndex = pathnameWithHash.indexOf('#');
  const pathname = hashIndex >= 0 ? pathnameWithHash.slice(0, hashIndex) : pathnameWithHash;
  const hash = hashIndex >= 0 ? pathnameWithHash.slice(hashIndex) : '';

  const rest = cleanBase && pathname.startsWith(cleanBase) ? pathname.slice(cleanBase.length) : pathname;
  const segments = rest.split('/').filter(Boolean);
  if (segments.length > 0 && isLang(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return `${cleanBase}/${segments.join('/')}/${hash}`;
}

/**
 * Picks the language for the root redirect:
 * 1. a stored preference, 2. the first browser language we support, 3. English.
 */
export function detectPreferredLang(stored: string | null | undefined, browserLangs: readonly string[] = []): Lang {
  if (isLang(stored)) return stored;
  for (const tag of browserLangs) {
    const primary = tag.toLowerCase().split('-')[0];
    if (isLang(primary)) return primary;
  }
  return defaultLang;
}
