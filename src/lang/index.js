const locales = {
  US: require('@/lang/en_US'),
  MX: require('@/lang/es_ES'),
  DE: require('@/lang/de_DE'),
  FR: require('@/lang/fr_FR'),
  RU: require('@/lang/ru_RU'),
  TR: require('@/lang/tr_TR'),
  ca: require('@/lang/en_CA'),
  core: require('@/lang/en_US')
};
export default locales[window.__.env.REACT_APP_COUNTRY].default;
