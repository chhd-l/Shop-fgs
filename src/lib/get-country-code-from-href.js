const getCountryCodeFromHref = () => {
  const href = window.location.href;
  const host = window.location.host;

  /**
   * 获取国家码(fr/mx)，以及是否为hub
   * 1. 开发环境，根据process.env
   * 2. 其他环境，根据二级路径，判断国家 eg: https://www.royalcanin.com/fr/shop https://shopsit.royalcanin.com/fr
   */
  let countryLink =
    process.env.REACT_APP_START_COUNTRY_LINK ||
    href.match(/http[s]?:\/\/[^\/]+\/([a-zA-A]{2,4})\/*/i)[1];

  // 从地址上获取不到时，进行强制匹配
  if (!countryLink) {
    switch (host) {
      case 'shop.royalcanin.mx':
        countryLink = 'mx';
        break;
      case 'shop.royalcanin.de':
      case 'www.shop.royalcanin.de':
        countryLink = 'de';
        break;
      case 'shop.royalcanin.com':
        countryLink = 'us';
        break;
      case 'shop.royalcanin.fr':
        countryLink = 'fr';
        break;
      case 'shop.royal-canin.ru':
      case 'www.shop.royal-canin.ru':
        countryLink = 'ru';
        break;
      case 'shop.royalcanin.com.tr':
      case 'www.shop.royalcanin.com.tr':
        countryLink = 'tr';
        break;
    }
  }

  // 此mapping关系暂时为之，后续讨论标准国家码
  return {
    countryCode: {
      mx: 'MX',
      de: 'DE',
      us: 'US',
      fr: 'FR',
      ru: 'RU',
      tr: 'TR',
      uk: 'GB',
      se: 'SE',
      core: 'CORE'
    }[countryLink],
    countryLink
  };
};

export default getCountryCodeFromHref;
