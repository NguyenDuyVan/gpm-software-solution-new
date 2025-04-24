import en from './locales/en.json';
import vi from './locales/vi.json';

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  silentTranslationWarn: true,
  fallbackLocale: 'vi',
  locale: 'vi',
  messages: {
    en,
    vi,
  },
  warnHtmlMessage: false,
  escapeParameterHtml: false,
}));
