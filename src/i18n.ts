/**
 * Internationalization (i18n) System
 * Supports English and Spanish with localStorage persistence
 * Default language: English
 */

export type Language = 'en' | 'es';

const LANGUAGE_KEY = 'preferred-language';

/**
 * Interface for all translatable content
 */
export interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    skills: string;
    contact: string;
  };
  
  // Hero Section
  hero: {
    greeting: string;
    role: string;
    description: string;
    downloadCV: string;
  };
  
  // About Section
  about: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  
  // Skills Section
  skills: {
    title: string;
    subtitle: string;
    categories: {
      dataScience: {
        title: string;
        items: string[];
      };
      backend: {
        title: string;
        items: string[];
      };
      tools: {
        title: string;
        items: string[];
      };
      languages: {
        title: string;
        items: string[];
      };
    };
  };
  
  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  
  // Footer
  footer: {
    rights: string;
    builtWith: string;
  };
}

/**
 * English translations
 */
const en: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    contact: 'Contact',
  },
  
  hero: {
    greeting: 'Hi, I\'m',
    role: 'Data Scientist & AI Researcher',
    description: 'Transforming data into actionable insights and building intelligent systems that solve real-world problems.',
    downloadCV: 'Download CV',
  },
  
  about: {
    title: 'About Me',
    subtitle: 'Passionate about AI, Machine Learning, and Data-Driven Solutions',
    paragraph1: 'I\'m a Data Scientist and AI Researcher with a strong background in machine learning, deep learning, and statistical analysis. I specialize in developing end-to-end ML pipelines and deploying scalable AI solutions.',
    paragraph2: 'With expertise in both research and engineering, I bridge the gap between theoretical models and production-ready systems. My work spans computer vision, natural language processing, and predictive analytics.',
    paragraph3: 'I\'m passionate about leveraging data and AI to create innovative solutions that drive business value and improve user experiences. Always learning and exploring new technologies in the rapidly evolving field of artificial intelligence.',
  },
  
  skills: {
    title: 'Technical Skills',
    subtitle: 'Technologies and tools I work with',
    categories: {
      dataScience: {
        title: 'Data Science & AI',
        items: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
      },
      backend: {
        title: 'Backend Development',
        items: ['FastAPI', 'Django', 'Flask', 'Node.js', 'PostgreSQL', 'MongoDB', 'RESTful APIs', 'GraphQL'],
      },
      tools: {
        title: 'Tools & Platforms',
        items: ['Docker', 'Kubernetes', 'Git', 'AWS', 'GCP', 'MLflow', 'Jupyter'],
      },
      languages: {
        title: 'Programming Languages',
        items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'R', 'C++'],
      },
    },
  },
  
  contact: {
    title: 'Get In Touch',
    subtitle: 'I\'m always open to discussing new opportunities, collaborations, or just chatting about AI and data science.',
    form: {
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! I\'ll get back to you soon.',
      error: 'Oops! Something went wrong. Please try again.',
    },
  },
  
  footer: {
    rights: 'All rights reserved',
    builtWith: 'Built with ❤️',
  },
};

/**
 * Spanish translations
 */
const es: Translations = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    skills: 'Habilidades',
    contact: 'Contacto',
  },
  
  hero: {
    greeting: 'Hola, soy',
    role: 'Científico de Datos e Investigador de IA',
    description: 'Transformando datos en insights accionables y construyendo sistemas inteligentes que resuelven problemas del mundo real.',
    downloadCV: 'Descargar CV',
  },
  
  about: {
    title: 'Sobre Mí',
    subtitle: 'Apasionado por la IA, el Machine Learning y las Soluciones Basadas en Datos',
    paragraph1: 'Soy Científico de Datos e Investigador de IA con una sólida formación en machine learning, deep learning y análisis estadístico. Me especializo en desarrollar pipelines de ML end-to-end y desplegar soluciones de IA escalables.',
    paragraph2: 'Con experiencia tanto en investigación como en ingeniería, conecto la teoría de modelos con sistemas listos para producción. Mi trabajo abarca visión por computadora, procesamiento de lenguaje natural y análisis predictivo.',
    paragraph3: 'Me apasiona aprovechar los datos y la IA para crear soluciones innovadoras que generen valor empresarial y mejoren la experiencia del usuario. Siempre aprendiendo y explorando nuevas tecnologías en el campo de la inteligencia artificial en rápida evolución.',
  },
  
  skills: {
    title: 'Habilidades Técnicas',
    subtitle: 'Tecnologías y herramientas con las que trabajo',
    categories: {
      dataScience: {
        title: 'Ciencia de Datos e IA',
        items: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
      },
      backend: {
        title: 'Desarrollo Backend',
        items: ['FastAPI', 'Django', 'Flask', 'Node.js', 'PostgreSQL', 'MongoDB', 'RESTful APIs', 'GraphQL'],
      },
      tools: {
        title: 'Herramientas y Plataformas',
        items: ['Docker', 'Kubernetes', 'Git', 'AWS', 'GCP', 'MLflow', 'Jupyter'],
      },
      languages: {
        title: 'Lenguajes de Programación',
        items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'R', 'C++'],
      },
    },
  },
  
  contact: {
    title: 'Contáctame',
    subtitle: 'Siempre estoy abierto a discutir nuevas oportunidades, colaboraciones o simplemente charlar sobre IA y ciencia de datos.',
    form: {
      name: 'Tu Nombre',
      email: 'Tu Email',
      message: 'Tu Mensaje',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado exitosamente! Te responderé pronto.',
      error: '¡Ups! Algo salió mal. Por favor intenta de nuevo.',
    },
  },
  
  footer: {
    rights: 'Todos los derechos reservados',
    builtWith: 'Construido con ❤️',
  },
};

/**
 * All available translations
 */
const translations: Record<Language, Translations> = { en, es };

/**
 * Gets the current language from localStorage or returns default (English)
 */
export function getCurrentLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null;
  return stored && (stored === 'en' || stored === 'es') ? stored : 'en';
}

/**
 * Gets translations for the current language
 */
export function getTranslations(lang?: Language): Translations {
  const language = lang || getCurrentLanguage();
  return translations[language];
}

/**
 * Updates all translatable elements in the DOM
 */
export function updateContent(lang: Language): void {
  const t = translations[lang];
  
  // Update navigation
  setTextContent('nav-home', t.nav.home);
  setTextContent('nav-about', t.nav.about);
  setTextContent('nav-skills', t.nav.skills);
  setTextContent('nav-contact', t.nav.contact);
  
  // Update hero section
  setTextContent('hero-greeting', t.hero.greeting);
  setTextContent('hero-role', t.hero.role);
  setTextContent('hero-description', t.hero.description);
  setTextContent('hero-download-cv', t.hero.downloadCV);
  
  // Update CV download link
  const cvLink = document.getElementById('cv-link') as HTMLAnchorElement;
  if (cvLink) {
    cvLink.href = `/cv-julian-gomez-${lang}.pdf`;
    cvLink.download = 'Julian_Gomez_CV.pdf';
    cvLink.type = 'application/pdf';
  }
  
  // Update about section
  setTextContent('about-title', t.about.title);
  setTextContent('about-subtitle', t.about.subtitle);
  setTextContent('about-p1', t.about.paragraph1);
  setTextContent('about-p2', t.about.paragraph2);
  setTextContent('about-p3', t.about.paragraph3);
  
  // Update skills section
  setTextContent('skills-title', t.skills.title);
  setTextContent('skills-subtitle', t.skills.subtitle);
  setTextContent('skills-ds-title', t.skills.categories.dataScience.title);
  setTextContent('skills-backend-title', t.skills.categories.backend.title);
  setTextContent('skills-tools-title', t.skills.categories.tools.title);
  setTextContent('skills-languages-title', t.skills.categories.languages.title);
  
  // Update skill items
  updateSkillItems('skills-ds-items', t.skills.categories.dataScience.items);
  updateSkillItems('skills-backend-items', t.skills.categories.backend.items);
  updateSkillItems('skills-tools-items', t.skills.categories.tools.items);
  updateSkillItems('skills-languages-items', t.skills.categories.languages.items);
  
  // Update contact section
  setTextContent('contact-title', t.contact.title);
  setTextContent('contact-subtitle', t.contact.subtitle);
  setPlaceholder('contact-name', t.contact.form.name);
  setPlaceholder('contact-email', t.contact.form.email);
  setPlaceholder('contact-message', t.contact.form.message);
  setTextContent('contact-submit', t.contact.form.send);
  
  // Update footer
  setTextContent('footer-rights', t.footer.rights);
  setTextContent('footer-built', t.footer.builtWith);
  
  // Update language toggle button
  updateLanguageButton(lang);
}

/**
 * Helper function to set text content of an element
 */
function setTextContent(id: string, text: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

/**
 * Helper function to set placeholder of an input element
 */
function setPlaceholder(id: string, text: string): void {
  const element = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement;
  if (element) {
    element.placeholder = text;
  }
}

/**
 * Updates skill items list
 */
function updateSkillItems(id: string, items: string[]): void {
  const container = document.getElementById(id);
  if (container) {
    container.innerHTML = items.map(item => `<li>${item}</li>`).join('');
  }
}

/**
 * Updates the language toggle button
 */
function updateLanguageButton(lang: Language): void {
  const button = document.getElementById('lang-toggle');
  if (button) {
    const langText = button.querySelector('.lang-text');
    if (langText) {
      langText.textContent = lang === 'en' ? 'ES' : 'EN';
    } else {
      // Fallback if span doesn't exist
      button.innerHTML = `🌐 <span class="lang-text">${lang === 'en' ? 'ES' : 'EN'}</span>`;
    }
    button.setAttribute('aria-label', lang === 'en' ? 'Cambiar a Español' : 'Switch to English');
  }
}

/**
 * Sets the active language and updates all content
 */
export function setLanguage(lang: Language): void {
  localStorage.setItem(LANGUAGE_KEY, lang);
  updateContent(lang);
  
  // Update HTML lang attribute for accessibility
  document.documentElement.lang = lang;
}

/**
 * Toggles between English and Spanish
 */
export function toggleLanguage(): void {
  const current = getCurrentLanguage();
  const newLang: Language = current === 'en' ? 'es' : 'en';
  setLanguage(newLang);
}

/**
 * Initializes the i18n system
 */
export function initI18n(): void {
  const lang = getCurrentLanguage();
  setLanguage(lang);
  
  // Listen for language toggle button
  const button = document.getElementById('lang-toggle');
  if (button) {
    button.addEventListener('click', toggleLanguage);
  }
}
