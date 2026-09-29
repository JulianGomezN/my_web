/**
 * Zod schemas for every content collection.
 * They live in their own module so `src/content.config.ts` and the Vitest
 * suite validate content with exactly the same rules.
 */
import { z } from 'astro/zod';

/** 'YYYY-MM', e.g. '2026-09'. */
export const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected YYYY-MM');

const bilingualText = z.object({ en: z.string().min(1), es: z.string().min(1) });
const bilingualList = z.object({ en: z.array(z.string().min(1)), es: z.array(z.string().min(1)) });

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  year: z.number().int().min(2000),
  role: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  highlights: z.array(z.string().min(1)).min(1),
  repo: z.url().optional(),
  /** Lower numbers are shown first. */
  order: z.number().int(),
  status: z.enum(['done', 'in-progress']),
});

/** A plain string (same in every language) or one text per language. */
export const localizedText = z.union([z.string().min(1), bilingualText]);

export const journeySchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['education', 'research', 'community', 'event']),
  org: localizedText,
  place: z.string().min(1),
  start: yearMonth,
  /** Omit for ongoing entries. */
  end: yearMonth.optional(),
  featured: z.boolean().default(false),
  url: z.url().optional(),
  title: bilingualText,
  points: bilingualList,
});

export const certificationCategories = ['ai-cloud', 'data-science', 'math-stats', 'other'] as const;

export const certificationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  issuer: z.string().min(1),
  date: yearMonth,
  expires: yearMonth.optional(),
  category: z.enum(certificationCategories),
  featured: z.boolean().default(false),
  /** Direct credential URL. When missing, the site links to LinkedIn. */
  url: z.url().optional(),
});

export const blogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  /** Drafts are never built. The blog stays hidden until one post is published. */
  draft: z.boolean().default(true),
});

export type LocalizedText = z.infer<typeof localizedText>;
export type ProjectData = z.infer<typeof projectSchema>;
export type JourneyEntry = z.infer<typeof journeySchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type CertificationCategory = (typeof certificationCategories)[number];
export type BlogData = z.infer<typeof blogSchema>;
