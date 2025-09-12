import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, vi } from '.';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en',
  resources: {
    en: en,
    vi: vi,
  },
  react: {
    useSuspense: false,
  },
});
export { i18next };
