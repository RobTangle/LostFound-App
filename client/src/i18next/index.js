import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { eng } from './en/en';
import { esp } from './esp/es';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translation:
        eng
    },
    es: {
      translation: esp

    },
  },
});

export default i18n;