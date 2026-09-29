/** Shared helpers for the test suite: reading content files and the built site. */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const DIST = join(ROOT, 'dist');
export const BASE = '/my_web';

export function readYaml<T = unknown>(relPath: string): T {
  return yaml.load(readFileSync(join(ROOT, relPath), 'utf8')) as T;
}

/** Parses the YAML frontmatter of a markdown file. */
export function readFrontmatter(absPath: string): Record<string, unknown> {
  const text = readFileSync(absPath, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) throw new Error(`No frontmatter in ${absPath}`);
  return (yaml.load(match[1]) ?? {}) as Record<string, unknown>;
}

/** Lists markdown files of a localized collection: { en: ['a', 'b'], es: [...] }. */
export function localizedSlugs(collectionDir: string): Record<string, string[]> {
  const dir = join(ROOT, collectionDir);
  const result: Record<string, string[]> = {};
  for (const lang of readdirSync(dir)) {
    if (!statSync(join(dir, lang)).isDirectory()) continue;
    result[lang] = readdirSync(join(dir, lang))
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
      .sort();
  }
  return result;
}

export function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

export function distHtmlFiles(): string[] {
  return walk(DIST).filter((f) => f.endsWith('.html'));
}

export function readDist(relPath: string): string {
  return readFileSync(join(DIST, relPath), 'utf8');
}

export function distRel(absPath: string): string {
  return relative(DIST, absPath).split('\\').join('/');
}

/** Extracts attribute values (href, src, ...) from an HTML string. */
export function attrValues(html: string, attr: string): string[] {
  const re = new RegExp(`\\s${attr}="([^"]*)"`, 'g');
  return Array.from(html.matchAll(re), (m) => m[1]);
}

/** Maps an internal URL like '/my_web/en/#about' to the file that serves it. */
export function distFileForUrl(url: string): string | null {
  const [pathOnly] = url.split(/[?#]/);
  if (!pathOnly.startsWith(`${BASE}/`) && pathOnly !== BASE) return null;
  const rel = decodeURIComponent(pathOnly.slice(BASE.length)).replace(/^\/+/, '');
  const candidates = rel === '' || rel.endsWith('/') ? [join(DIST, rel, 'index.html')] : [join(DIST, rel), join(DIST, rel, 'index.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}
