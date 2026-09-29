/** Personal links used across the site. */
import { LINKEDIN_URL } from '../lib/content';

export const profile = {
  name: 'Julian Gomez',
  fullName: 'Julian Andres Gomez Niño',
  email: 'juliangomezni@gmail.com',
  github: 'https://github.com/JulianGomezN',
  githubHandle: '@JulianGomezN',
  linkedin: LINKEDIN_URL,
  /** File names inside /public, one per language. */
  cv: { en: 'cv-julian-gomez-en.pdf', es: 'cv-julian-gomez-es.pdf' },
  cvDownloadName: 'Julian_Gomez_CV.pdf',
} as const;
