import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { eng } from './en/en';
import { esp } from './esp/es';

if (localStorage.getItem('i18nextLng') === null)
{
  localStorage.setItem('i18nextLng', 'en')
}
i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
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