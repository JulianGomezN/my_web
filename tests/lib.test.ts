import { describe, expect, it } from 'vitest';
import { nextTheme, resolveInitialTheme } from '../src/lib/theme';
import {
  certificationLink,
  entriesForLang,
  formatYearMonth,
  getFeatured,
  localize,
  groupByCategory,
  LINKEDIN_CERTS_URL,
  publishedPosts,
  sortByOrder,
  sortTimeline,
  splitLocaleId,
} from '../src/lib/content';
import type { Certification } from '../src/content/schemas';

describe('theme', () => {
  it('is dark by default (dark-first)', () => {
    expect(resolveInitialTheme(null)).toBe('dark');
    expect(resolveInitialTheme(undefined)).toBe('dark');
    expect(resolveInitialTheme('garbage')).toBe('dark');
    expect(resolveInitialTheme('dark')).toBe('dark');
  });

  it('is light only when the visitor chose it', () => {
    expect(resolveInitialTheme('light')).toBe('light');
  });

  it('toggles', () => {
    expect(nextTheme('dark')).toBe('light');
    expect(nextTheme('light')).toBe('dark');
  });
});

describe('localized entries', () => {
  const entries = [
    { id: 'en/a', data: { order: 2 } },
    { id: 'es/a', data: { order: 2 } },
    { id: 'en/b', data: { order: 1 } },
    { id: 'orphan', data: { order: 0 } },
  ];

  it('splits locale ids', () => {
    expect(splitLocaleId('es/unxchange')).toEqual({ lang: 'es', slug: 'unxchange' });
    expect(splitLocaleId('fr/x')).toBeNull();
    expect(splitLocaleId('en')).toBeNull();
  });

  it('filters by language and sorts by order', () => {
    expect(sortByOrder(entriesForLang(entries, 'en')).map((e) => e.id)).toEqual(['en/b', 'en/a']);
    expect(entriesForLang(entries, 'es').map((e) => e.id)).toEqual(['es/a']);
  });
});

describe('sortTimeline', () => {
  it('puts ongoing entries first, then the most recent', () => {
    const sorted = sortTimeline([
      { id: 'old', start: '2015-02', end: '2020-11' },
      { id: 'ongoing-old', start: '2022-03' },
      { id: 'recent', start: '2025-03', end: '2026-02' },
      { id: 'ongoing-new', start: '2025-10' },
      { id: 'event', start: '2026-07', end: '2026-07' },
    ]);
    expect(sorted.map((e) => e.id)).toEqual(['ongoing-new', 'ongoing-old', 'event', 'recent', 'old']);
  });

  it('does not mutate the input', () => {
    const input = [{ start: '2020-01', end: '2020-02' }, { start: '2021-01' }];
    const copy = structuredClone(input);
    sortTimeline(input);
    expect(input).toEqual(copy);
  });
});

describe('localize', () => {
  it('returns plain strings as-is and picks the language from objects', () => {
    expect(localize('IEEE Computer Society', 'en')).toBe('IEEE Computer Society');
    const org = { en: 'National University of Colombia', es: 'Universidad Nacional de Colombia' };
    expect(localize(org, 'en')).toBe('National University of Colombia');
    expect(localize(org, 'es')).toBe('Universidad Nacional de Colombia');
  });
});

describe('formatYearMonth', () => {
  it('formats in each language', () => {
    expect(formatYearMonth('2026-09', 'en')).toBe('Sep 2026');
    expect(formatYearMonth('2026-09', 'es')).toMatch(/^sept? 2026$/i);
    expect(formatYearMonth('2024-05', 'es')).toMatch(/^may 2024$/i);
  });
});

describe('certifications', () => {
  const base = { name: 'x', issuer: 'y' };
  const certs: Certification[] = [
    { ...base, id: 'a', date: '2024-01', category: 'math-stats', featured: true },
    { ...base, id: 'b', date: '2026-09', category: 'ai-cloud', featured: true, url: 'https://example.com/cred' },
    { ...base, id: 'c', date: '2025-05', category: 'math-stats', featured: false },
    { ...base, id: 'd', date: '2023-04', category: 'other', featured: false },
  ];

  it('returns featured certifications, newest first', () => {
    expect(getFeatured(certs).map((c) => c.id)).toEqual(['b', 'a']);
  });

  it('groups by category in a fixed order and skips empty groups', () => {
    const groups = groupByCategory(certs);
    expect(groups.map((g) => g.category)).toEqual(['ai-cloud', 'math-stats', 'other']);
    expect(groups[1].items.map((c) => c.id)).toEqual(['c', 'a']);
  });

  it('falls back to LinkedIn when there is no credential url', () => {
    expect(certificationLink(certs[1])).toBe('https://example.com/cred');
    expect(certificationLink(certs[0])).toBe(LINKEDIN_CERTS_URL);
  });
});

describe('publishedPosts', () => {
  const post = (id: string, draft: boolean, date: string) => ({ id, data: { draft, date: new Date(date) } });

  it('hides drafts', () => {
    expect(publishedPosts([post('en/a', true, '2026-01-01'), post('es/b', true, '2026-01-01')], 'en')).toEqual([]);
  });

  it('returns published posts of one language, newest first', () => {
    const posts = [
      post('en/old', false, '2026-01-01'),
      post('en/draft', true, '2026-09-01'),
      post('en/new', false, '2026-06-01'),
      post('es/otro', false, '2026-07-01'),
    ];
    expect(publishedPosts(posts, 'en').map((p) => p.id)).toEqual(['en/new', 'en/old']);
    expect(publishedPosts(posts, 'es').map((p) => p.id)).toEqual(['es/otro']);
  });
});
