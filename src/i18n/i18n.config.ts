import en from './locales/en.json';
import vi from './locales/vi.json';

export default defineI18nConfig(() => {
  return {
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    fallbackLocale: 'en',
    locale: 'en',
    messages: {
      en,
      vi,
    },
    warnHtmlMessage: false,
    compilation: {
      strictMessage: false,
    },
  };
});
