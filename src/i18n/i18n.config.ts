import en from './locales/en.json';
import vi from './locales/vi.json';

export default defineI18nConfig(() => {
  return {
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    fallbackLocale: 'vi',
    locale: 'vi',
    messages: {
      vi,
      en,
    },
    warnHtmlMessage: false,
    compilation: {
      strictMessage: false,
    },
  };
});
