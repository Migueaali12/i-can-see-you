import { ui, defaultLang, type Lang } from './ui';

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
