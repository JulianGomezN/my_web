/**
 * Skills shown in the "Skills" section.
 * Only list tools backed by the CV or by the projects.
 */
import type { Lang } from '../i18n/ui';

export interface SkillCategory {
  id: string;
  /** Font Awesome class, e.g. 'fa-solid fa-brain'. */
  icon: string;
  title: Record<Lang, string>;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-data',
    icon: 'fa-solid fa-brain',
    title: { en: 'AI & Data', es: 'IA y Datos' },
    items: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Generative AI'],
  },
  {
    id: 'backend',
    icon: 'fa-solid fa-server',
    title: { en: 'Backend & APIs', es: 'Backend y APIs' },
    items: ['FastAPI', 'Flask', 'SQLAlchemy', 'Node.js / Express', 'Go', 'REST', 'GraphQL', 'JWT / OAuth2'],
  },
  {
    id: 'databases',
    icon: 'fa-solid fa-database',
    title: { en: 'Databases & BI', es: 'Bases de datos y BI' },
    items: ['SQL', 'PostgreSQL', 'MongoDB', 'Power BI', 'Excel'],
  },
  {
    id: 'devops',
    icon: 'fa-solid fa-gears',
    title: { en: 'DevOps & Testing', es: 'DevOps y Testing' },
    items: ['Docker', 'Git', 'Prometheus', 'pytest', 'Selenium', 'Appian'],
  },
  {
    id: 'languages',
    icon: 'fa-solid fa-code',
    title: { en: 'Programming languages', es: 'Lenguajes de programación' },
    items: ['Python', 'Java', 'C++', 'JavaScript / TypeScript', 'R', 'Go'],
  },
];

export const spokenLanguages: { name: Record<Lang, string>; level: Record<Lang, string> }[] = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'Advanced (C1, EF SET)', es: 'Avanzado (C1, EF SET)' } },
  { name: { en: 'German', es: 'Alemán' }, level: { en: 'Basic', es: 'Básico' } },
];
