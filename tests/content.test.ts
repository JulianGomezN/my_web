/** Validates the real content files with the same zod schemas used by Astro. */
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { blogSchema, certificationSchema, journeySchema, projectSchema } from '../src/content/schemas';
import { skillCategories } from '../src/data/skills';
import { sectionIds } from '../src/data/sections';
import { ui } from '../src/i18n/ui';
import { certificationLink } from '../src/lib/content';
import { localizedSlugs, readFrontmatter, readYaml, ROOT } from './helpers';

describe('projects', () => {
  const slugs = localizedSlugs('src/content/projects');

  it('exist in both languages with the same slugs', () => {
    expect(Object.keys(slugs).sort()).toEqual(['en', 'es']);
    expect(slugs.es).toEqual(slugs.en);
    expect(slugs.en.length).toBeGreaterThanOrEqual(3);
  });

  it('match the schema, link to GitHub and share order/status/repo across languages', () => {
    for (const slug of slugs.en) {
      const en = projectSchema.parse(readFrontmatter(join(ROOT, 'src/content/projects/en', `${slug}.md`)));
      const es = projectSchema.parse(readFrontmatter(join(ROOT, 'src/content/projects/es', `${slug}.md`)));
      if (en.repo) expect(en.repo).toMatch(/^https:\/\/github\.com\//);
      expect({ order: es.order, status: es.status, repo: es.repo, year: es.year }).toEqual({
        order: en.order,
        status: en.status,
        repo: en.repo,
        year: en.year,
      });
    }
  });

  it('have unique order values (stable sorting)', () => {
    const orders = slugs.en.map(
      (slug) => projectSchema.parse(readFrontmatter(join(ROOT, 'src/content/projects/en', `${slug}.md`))).order,
    );
    expect(new Set(orders).size).toBe(orders.length);
  });
});

describe('journey', () => {
  const entries = readYaml<unknown[]>('src/content/journey.yaml').map((e) => journeySchema.parse(e));

  it('validates and has unique ids', () => {
    expect(entries.length).toBeGreaterThan(0);
    expect(new Set(entries.map((e) => e.id)).size).toBe(entries.length);
  });

  it('has texts in both languages and ends after it starts', () => {
    for (const entry of entries) {
      expect(entry.points.en.length, entry.id).toBeGreaterThan(0);
      expect(entry.points.es.length, entry.id).toBe(entry.points.en.length);
      if (entry.end) expect(entry.end >= entry.start, entry.id).toBe(true);
    }
  });
});

describe('certifications', () => {
  const certs = readYaml<unknown[]>('src/content/certifications.yaml').map((c) => certificationSchema.parse(c));

  it('validates and has unique ids and names', () => {
    expect(new Set(certs.map((c) => c.id)).size).toBe(certs.length);
    expect(new Set(certs.map((c) => c.name.toLowerCase())).size).toBe(certs.length);
  });

  it('has between 4 and 6 featured certifications', () => {
    const featured = certs.filter((c) => c.featured).length;
    expect(featured).toBeGreaterThanOrEqual(4);
    expect(featured).toBeLessThanOrEqual(6);
  });

  it('gives every certification a link', () => {
    for (const cert of certs) expect(certificationLink(cert)).toMatch(/^https:\/\//);
  });

  it('has a translated label for every category in use', () => {
    for (const cert of certs) {
      expect(ui.en.certifications.categories[cert.category]).toBeTruthy();
      expect(ui.es.certifications.categories[cert.category]).toBeTruthy();
    }
  });
});

describe('blog', () => {
  it('posts match the schema', () => {
    const slugs = localizedSlugs('src/content/blog');
    for (const [lang, list] of Object.entries(slugs)) {
      for (const slug of list) {
        blogSchema.parse(readFrontmatter(join(ROOT, 'src/content/blog', lang, `${slug}.md`)));
      }
    }
  });
});

describe('skills', () => {
  it('have titles in both languages, items and no duplicates within a category', () => {
    for (const category of skillCategories) {
      expect(category.title.en.trim(), category.id).not.toBe('');
      expect(category.title.es.trim(), category.id).not.toBe('');
      expect(category.items.length, category.id).toBeGreaterThan(0);
      expect(new Set(category.items).size, category.id).toBe(category.items.length);
    }
  });

  it('do not list tools the CV does not back', () => {
    const all = skillCategories.flatMap((c) => c.items.map((i) => i.toLowerCase()));
    for (const unbacked of ['kubernetes', 'gcp', 'django', 'mlflow']) expect(all).not.toContain(unbacked);
  });
});

describe('sections', () => {
  it('have a nav label in both languages', () => {
    for (const id of sectionIds) {
      expect(ui.en.nav[id]).toBeTruthy();
      expect(ui.es.nav[id]).toBeTruthy();
    }
  });
});
