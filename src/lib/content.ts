/**
 * Pure helpers over content data. They take plain objects (not Astro entries)
 * so they can be unit-tested without the Astro runtime.
 */
import type { Lang } from '../i18n/ui';
import { isLang } from '../i18n/utils';
import type { Certification, CertificationCategory, JourneyEntry, LocalizedText } from '../content/schemas';
import { certificationCategories } from '../content/schemas';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/julian-andres-gomez-ni%C3%B1o-b91820186/';
export const LINKEDIN_CERTS_URL = `${LINKEDIN_URL}details/certifications/`;

/** Picks the text for a language from a plain string or an { en, es } object. */
export function localize(value: LocalizedText, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}

/* ---------- Localized collections (projects, blog) ---------- */

/** 'es/unxchange' -> { lang: 'es', slug: 'unxchange' }. Returns null for ids outside a language folder. */
export function splitLocaleId(id: string): { lang: Lang; slug: string } | null {
  const [lang, ...rest] = id.split('/');
  if (!isLang(lang) || rest.length === 0) return null;
  return { lang, slug: rest.join('/') };
}

/** Keeps the entries of one language. */
export function entriesForLang<T extends { id: string }>(entries: readonly T[], lang: Lang): T[] {
  return entries.filter((entry) => splitLocaleId(entry.id)?.lang === lang);
}

export function sortByOrder<T extends { data: { order: number } }>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

/* ---------- Journey ---------- */

/** Ongoing entries first (most recent start first), then finished ones by end date, newest first. */
export function sortTimeline<T extends Pick<JourneyEntry, 'start' | 'end'>>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => {
    const aOngoing = !a.end;
    const bOngoing = !b.end;
    if (aOngoing !== bOngoing) return aOngoing ? -1 : 1;
    const byEnd = (b.end ?? b.start).localeCompare(a.end ?? a.start);
    return byEnd !== 0 ? byEnd : b.start.localeCompare(a.start);
  });
}

/** '2026-09' -> 'Sep 2026' / 'sept 2026' (compact, without "de"). */
export function formatYearMonth(value: string, lang: Lang): string {
  const [year, month] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  const monthName = new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', { month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace(/\.$/, '');
  return `${monthName} ${year}`;
}

/* ---------- Certifications ---------- */

export function sortByDateDesc<T extends Pick<Certification, 'date'>>(certs: readonly T[]): T[] {
  return [...certs].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeatured<T extends Pick<Certification, 'featured' | 'date'>>(certs: readonly T[]): T[] {
  return sortByDateDesc(certs.filter((cert) => cert.featured));
}

/** Groups certifications by category in a fixed order, skipping empty groups. Each group is sorted by date. */
export function groupByCategory<T extends Pick<Certification, 'category' | 'date'>>(
  certs: readonly T[],
): { category: CertificationCategory; items: T[] }[] {
  return certificationCategories
    .map((category) => ({
      category,
      items: sortByDateDesc(certs.filter((cert) => cert.category === category)),
    }))
    .filter((group) => group.items.length > 0);
}

/** Direct credential link, or the LinkedIn certifications page as fallback. */
export function certificationLink(cert: Pick<Certification, 'url'>): string {
  return cert.url ?? LINKEDIN_CERTS_URL;
}

/* ---------- Blog ---------- */

/** Published posts of one language, newest first. */
export function publishedPosts<T extends { id: string; data: { draft: boolean; date: Date } }>(
  posts: readonly T[],
  lang: Lang,
): T[] {
  return entriesForLang(posts, lang)
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
