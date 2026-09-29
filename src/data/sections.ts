/**
 * Sections of the home page, in navigation order.
 * To remove a section: delete its id here and its component line in src/pages/[lang]/index.astro.
 */
export const sectionIds = ['about', 'skills', 'projects', 'journey', 'certifications', 'contact'] as const;

export type SectionId = (typeof sectionIds)[number];
