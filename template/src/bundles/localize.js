import { renderToStaticMarkup } from 'react-dom/server';
import {
  localizeReducer,
  initialize,
  addTranslation,
  addTranslationForLanguage,
  setActiveLanguage,
  getTranslations,
  getLanguages,
  getOptions,
  getActiveLanguage,
} from 'react-localize-redux';
import globalTranslations from '@/translations/global.json';

export default {
  name: 'localize', // must be "localize" as used in LocalizeProvider
  init: store => {
    store.doLocaleInitialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'French', code: 'fr' },
      ],
      translation: globalTranslations,
      options: { renderToStaticMarkup },
    });
  },
  getReducer: () => localizeReducer,
  doLocaleInitialize: initialize,
  doAddTranslation: addTranslation,
  doAddTranslationForLanguage: addTranslationForLanguage,
  doSetActiveLanguage: setActiveLanguage,
  selectTranslations: ({ localize }) => getTranslations(localize),
  selectLanguages: ({ localize }) => getLanguages(localize),
  selectOptions: ({ localize }) => getOptions(localize),
  selectActiveLanguage: ({ localize }) => getActiveLanguage(localize),
};
