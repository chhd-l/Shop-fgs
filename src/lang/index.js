const locales = {
  us: require('@/lang/en_US'),
  uk: require('@/lang/en_UK'),
  mx: require('@/lang/es_ES'),
  de: require('@/lang/de_DE'),
  fr: require('@/lang/fr_FR'),
  ru: require('@/lang/ru_RU'),
  tr: require('@/lang/tr_TR'),
  ca: require('@/lang/en_CA'),
  se: require('@/lang/sv_SE'),
  core: require('@/lang/en_US')
};
export default locales[window.__.env.REACT_APP_COUNTRY].default;
