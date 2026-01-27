/**
 * Theme Management System
 * Handles dark/light mode toggle with localStorage persistence
 * Detects system preference on first visit
 */

type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

/**
 * Gets the current theme from localStorage or system preference
 */
export function getPreferredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  
  if (stored) {
    return stored;
  }
  
  // Detect system preference on first visit
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

/**
 * Applies the theme to the document
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Save preference
  localStorage.setItem(THEME_KEY, theme);
  
  // Update toggle button icon
  updateThemeButton(theme);
}

/**
 * Updates the theme toggle button icon
 */
function updateThemeButton(theme: Theme): void {
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.textContent = theme === 'dark' ? '☀️' : '🌙';
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme(): void {
  const current = getPreferredTheme();
  const newTheme: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

/**
 * Initializes the theme system
 */
export function initTheme(): void {
  const theme = getPreferredTheme();
  applyTheme(theme);
  
  // Listen for theme toggle button
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', toggleTheme);
  }
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only apply if user hasn't manually set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}
