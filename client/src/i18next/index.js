import i18next from 'i18next';
import { eng } from './en/en';
import { esp } from './esp/es';

i18next.init({
  lng: 'en',
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

export default i18next;