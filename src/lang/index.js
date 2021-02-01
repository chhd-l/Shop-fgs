import en_US from '@/lang/en_US';
import es_ES from '@/lang/es_ES';
import de_DE from '@/lang/de_DE';
import fr_FR from '@/lang/fr_FR';
import ru_RU from '@/lang/ru_RU';
import tr_TR from '@/lang/tr_TR';

const ENUM_LANGFILE = {
  en: en_US,
  es: es_ES,
  de: de_DE,
  fr: fr_FR,
  ru: ru_RU,
  tr: tr_TR
};

// export default ENUM_LANGFILE;

// ENUM_LANGFILE[process.env.REACT_APP_LANG]

const locales = {
  en: require('@/lang/en_US'),
  es: require('@/lang/es_ES'),
  de: require('@/lang/de_DE'),
  fr: require('@/lang/fr_FR'),
  ru: require('@/lang/ru_RU'),
  tr: require('@/lang/tr_TR')
};
// const locales = {
//   en: import(/*webpackChunkName: "h-w1*/'@/lang/en_US'),
//   es: import(/*webpackChunkName: "h-w1*/'@/lang/es_ES'),
//   de: import(/*webpackChunkName: "h-w1*/'@/lang/de_DE'),
//   fr: import(/*webpackChunkName: "h-w1*/'@/lang/fr_FR'),
//   ru: import(/*webpackChunkName: "h-w1*/'@/lang/ru_RU'),
//   tr: import(/*webpackChunkName: "h-w1*/'@/lang/tr_TR')
// };
export default locales[process.env.REACT_APP_LANG].default;
