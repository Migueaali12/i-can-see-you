import { ui, defaultLang, languages, type Lang } from './ui';

export const LANG_STORAGE_KEY = 'preferred-lang';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

export function getStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return isLang(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function setStoredLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // storage unavailable — silently continue
  }
}

export function getBrowserLang(): Lang {
  try {
    const nav =
      (navigator.languages?.[0] ?? navigator.language ?? defaultLang) as string;
    return nav.toLowerCase().startsWith('es') ? 'es' : 'en';
  } catch {
    return defaultLang;
  }
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en'], values?: Record<string, string | number>): string {
    let text: string = (ui[lang][key] || ui[defaultLang][key] || key) as string;
    if (values) {
      for (const [k, v] of Object.entries(values)) {
        text = text.replaceAll(`{${k}}`, String(v));
      }
    }
    return text;
  };
}

export function getRelativeLocaleUrl(lang: Lang, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return cleanPath;
  return `/es${cleanPath}`;
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string = '', targetLang: Lang = lang): string {
    return getRelativeLocaleUrl(targetLang, path);
  };
}
