const locales = {
  us: require('@/lang/en_US'),
  mx: require('@/lang/es_ES'),
  de: require('@/lang/de_DE'),
  fr: require('@/lang/fr_FR'),
  ru: require('@/lang/ru_RU'),
  tr: require('@/lang/tr_TR'),
  ca: require('@/lang/en_CA'),
  core: require('@/lang/en_US')
};
export default locales[window.__.env.REACT_APP_COUNTRY].default;
