export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/**
 * The site is dark-first: it only starts in light mode when the visitor chose it before.
 * The inline script in BaseLayout.astro mirrors this rule to avoid a flash on load.
 */
export function resolveInitialTheme(stored: string | null | undefined): Theme {
  return stored === 'light' ? 'light' : 'dark';
}

export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}
