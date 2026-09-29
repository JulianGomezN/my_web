/**
 * Client-side behavior. Everything here is progressive enhancement:
 * the site works without JavaScript.
 */
import { LANG_STORAGE_KEY } from '../i18n/utils';
import { nextTheme, THEME_STORAGE_KEY, type Theme } from '../lib/theme';

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode): ignore */
  }
}

function currentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function initTheme(): void {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const syncLabel = () => {
    const label = currentTheme() === 'dark' ? button.dataset.labelToLight : button.dataset.labelToDark;
    if (label) button.setAttribute('aria-label', label);
  };

  syncLabel();
  button.addEventListener('click', () => {
    const theme = nextTheme(currentTheme());
    document.documentElement.classList.toggle('dark', theme === 'dark');
    safeSet(THEME_STORAGE_KEY, theme);
    syncLabel();
  });
}

function initLanguageSwitch(): void {
  const link = document.getElementById('lang-switch') as HTMLAnchorElement | null;
  if (!link) return;

  link.addEventListener('click', () => {
    const lang = link.dataset.lang;
    if (lang) safeSet(LANG_STORAGE_KEY, lang);
    // Keep the visitor on the same section when switching language.
    if (location.hash && !link.href.includes('#')) {
      link.href = `${link.href}${location.hash}`;
    }
  });
}

function initMobileMenu(): void {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    const label = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
    if (label) toggle.setAttribute('aria-label', label);
    const icon = toggle.querySelector('i');
    icon?.classList.toggle('fa-bars', !open);
    icon?.classList.toggle('fa-xmark', open);
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/** Highlights the nav link of the section currently in view. */
function initScrollSpy(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link[data-section]'));
  const sections = links
    .map((link) => document.getElementById(link.dataset.section ?? ''))
    .filter((el): el is HTMLElement => el !== null);
  if (sections.length === 0 || !('IntersectionObserver' in window)) return;

  const setActive = (id: string | null) => {
    links.forEach((link) => {
      const active = link.dataset.section === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
  );
  sections.forEach((section) => observer.observe(section));

  // Clear the highlight when back at the hero.
  const hero = document.getElementById('hero');
  if (hero) {
    new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(null), { threshold: 0.6 }).observe(hero);
  }
}

/** Fades elements in when they enter the viewport. Disabled with prefers-reduced-motion. */
function initReveal(): void {
  if (!document.documentElement.classList.contains('js-anim')) return;
  const elements = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );
  elements.forEach((el) => observer.observe(el));
}

export function initSite(): void {
  initTheme();
  initLanguageSwitch();
  initMobileMenu();
  initScrollSpy();
  initReveal();
}
