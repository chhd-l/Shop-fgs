const locales = {
  US: require('@/lang/en_US'),
  MX: require('@/lang/es_ES'),
  DE: require('@/lang/de_DE'),
  FR: require('@/lang/fr_FR'),
  RU: require('@/lang/ru_RU'),
  TR: require('@/lang/tr_TR'),
  CA: require('@/lang/en_CA'),
  CORE: require('@/lang/fr_FR')
};
export default locales[process.env.REACT_APP_COUNTRY].default;
