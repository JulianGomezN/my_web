import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { blogSchema, certificationSchema, journeySchema, projectSchema } from './content/schemas';

/** One markdown file per project and language: src/content/projects/{en,es}/<slug>.md */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: projectSchema,
});

/** Bilingual timeline entries (education, research, communities, events). */
const journey = defineCollection({
  loader: file('src/content/journey.yaml'),
  schema: journeySchema,
});

const certifications = defineCollection({
  loader: file('src/content/certifications.yaml'),
  schema: certificationSchema,
});

/** src/content/blog/{en,es}/<slug>.md */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: blogSchema,
});

export const collections = { projects, journey, certifications, blog };
