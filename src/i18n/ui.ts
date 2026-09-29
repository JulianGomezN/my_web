/**
 * Interface strings for every language.
 * Each text exists exactly once per language. `tests/i18n.test.ts` fails
 * if a key is missing in any language.
 */

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

const en = {
  meta: {
    title: 'Julian Gomez · AI Developer',
    description:
      'Portfolio of Julian Gomez, AI Developer and Systems & Computer Engineering student at the National University of Colombia. Python, backend, data and applied machine learning.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    switchLang: 'Ver en español',
    mainNav: 'Main navigation',
    photoAlt: 'Portrait of Julian Gomez',
    opensNewTab: 'opens in a new tab',
  },
  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    journey: 'Journey',
    certifications: 'Certifications',
    contact: 'Contact',
    blog: 'Blog',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'AI Developer',
    description:
      'Systems & Computer Engineering student at the National University of Colombia, building software that puts machine learning to work. Strong in Python, backend and data; growing into ML engineering.',
    downloadCV: 'Download CV',
    contactMe: 'Get in touch',
  },
  about: {
    label: 'about',
    title: 'About me',
    p1: "I'm a Systems and Computer Engineering student at the National University of Colombia. Most of my experience comes from building data-driven software in teams: backend services, APIs, databases and the tests that keep them honest.",
    p2: "My focus now is Artificial Intelligence and applied machine learning. I'm building the foundations (statistics, linear algebra, Python for data) and learning how models go from a notebook to a reliable service. I'm also part of a research seminar on generative models.",
    p3: 'I care about performance, maintainability and clear communication. I like owning problems end to end, asking good questions and leaving code better than I found it.',
    languagesTitle: 'Languages',
    statProjects: 'team projects',
    statCerts: 'certifications',
    statEnglish: 'English (EF SET)',
  },
  skills: {
    label: 'skills',
    title: 'Technical skills',
    subtitle: 'Tools I have used in coursework and team projects.',
  },
  projects: {
    label: 'projects',
    title: 'Projects',
    subtitle: 'Team projects where I contributed to the engineering side: APIs, data, security and testing.',
    status: { done: 'Completed', 'in-progress': 'In progress' },
    viewRepo: 'View repository of',
    role: 'Role',
  },
  journey: {
    label: 'journey',
    title: 'Journey',
    subtitle: 'Education, research and student communities.',
    present: 'Present',
    kinds: { education: 'Education', research: 'Research', community: 'Community', event: 'Event' },
  },
  certifications: {
    label: 'certifications',
    title: 'Certifications',
    subtitle: 'Continuous learning in AI, data science, mathematics and statistics.',
    featured: 'Featured',
    seeAll: 'See all certifications',
    expires: 'Expires',
    viewCredential: 'View credential',
    linkedin: 'Full list on LinkedIn',
    categories: {
      'ai-cloud': 'AI & Cloud',
      'data-science': 'Data Science (IBM path)',
      'math-stats': 'Mathematics & Statistics',
      other: 'Other',
    },
  },
  contact: {
    label: 'contact',
    title: 'Get in touch',
    subtitle: 'Open to internships and junior roles in AI / ML engineering, and to collaborating on projects.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Curriculum',
    cvAction: 'Download PDF',
    location: 'Location',
    locationValue: 'Bogotá, Colombia',
  },
  blog: {
    title: 'Blog',
    subtitle: 'Notes on what I am learning about machine learning.',
    back: 'Back to blog',
    publishedOn: 'Published on',
  },
  footer: {
    rights: 'All rights reserved.',
    built: 'Built with Astro.',
  },
};

export type UIStrings = typeof en;

/** Typed as `UIStrings`, so TypeScript rejects missing or extra keys. */
const es: UIStrings = {
  meta: {
    title: 'Julian Gomez · AI Developer',
    description:
      'Portafolio de Julian Gomez, AI Developer y estudiante de Ingeniería de Sistemas y Computación en la Universidad Nacional de Colombia. Python, backend, datos y machine learning aplicado.',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    toDark: 'Cambiar a modo oscuro',
    toLight: 'Cambiar a modo claro',
    switchLang: 'View in English',
    mainNav: 'Navegación principal',
    photoAlt: 'Retrato de Julian Gomez',
    opensNewTab: 'se abre en una pestaña nueva',
  },
  nav: {
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    journey: 'Trayectoria',
    certifications: 'Certificaciones',
    contact: 'Contacto',
    blog: 'Blog',
  },
  hero: {
    greeting: 'Hola, soy',
    role: 'AI Developer',
    description:
      'Estudiante de Ingeniería de Sistemas y Computación (UNAL) construyendo software que pone el machine learning a trabajar. Fuerte en Python, backend y datos; creciendo hacia ML engineering.',
    downloadCV: 'Descargar CV',
    contactMe: 'Contáctame',
  },
  about: {
    label: 'sobre-mí',
    title: 'Sobre mí',
    p1: 'Soy estudiante de Ingeniería de Sistemas y Computación en la Universidad Nacional de Colombia. La mayor parte de mi experiencia viene de construir software orientado a datos en equipo: servicios backend, APIs, bases de datos y las pruebas que los mantienen confiables.',
    p2: 'Hoy mi foco es la Inteligencia Artificial y el machine learning aplicado. Estoy consolidando las bases (estadística, álgebra lineal, Python para datos) y aprendiendo cómo un modelo pasa de un notebook a un servicio confiable. También participo en un semillero de investigación en modelos generativos.',
    p3: 'Me importan el rendimiento, la mantenibilidad y la comunicación clara. Me gusta hacerme cargo de los problemas de principio a fin, hacer buenas preguntas y dejar el código mejor de lo que lo encontré.',
    languagesTitle: 'Idiomas',
    statProjects: 'proyectos en equipo',
    statCerts: 'certificaciones',
    statEnglish: 'Inglés (EF SET)',
  },
  skills: {
    label: 'habilidades',
    title: 'Habilidades técnicas',
    subtitle: 'Herramientas que he usado en la carrera y en proyectos en equipo.',
  },
  projects: {
    label: 'proyectos',
    title: 'Proyectos',
    subtitle: 'Proyectos en equipo donde contribuí en la parte de ingeniería: APIs, datos, seguridad y pruebas.',
    status: { done: 'Terminado', 'in-progress': 'En progreso' },
    viewRepo: 'Ver repositorio de',
    role: 'Rol',
  },
  journey: {
    label: 'trayectoria',
    title: 'Trayectoria',
    subtitle: 'Educación, investigación y comunidades estudiantiles.',
    present: 'Actualidad',
    kinds: { education: 'Educación', research: 'Investigación', community: 'Comunidad', event: 'Evento' },
  },
  certifications: {
    label: 'certificaciones',
    title: 'Certificaciones',
    subtitle: 'Aprendizaje continuo en IA, ciencia de datos, matemáticas y estadística.',
    featured: 'Destacadas',
    seeAll: 'Ver todas las certificaciones',
    expires: 'Vence',
    viewCredential: 'Ver credencial',
    linkedin: 'Lista completa en LinkedIn',
    categories: {
      'ai-cloud': 'IA y Cloud',
      'data-science': 'Data Science (ruta IBM)',
      'math-stats': 'Matemáticas y Estadística',
      other: 'Otros',
    },
  },
  contact: {
    label: 'contacto',
    title: 'Contáctame',
    subtitle: 'Abierto a prácticas y roles junior en IA / ML engineering, y a colaborar en proyectos.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Hoja de vida',
    cvAction: 'Descargar PDF',
    location: 'Ubicación',
    locationValue: 'Bogotá, Colombia',
  },
  blog: {
    title: 'Blog',
    subtitle: 'Notas sobre lo que estoy aprendiendo de machine learning.',
    back: 'Volver al blog',
    publishedOn: 'Publicado el',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    built: 'Construido con Astro.',
  },
};

export const ui: Record<Lang, UIStrings> = { en, es };
