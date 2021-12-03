const getCountryCodeFromHref = () => {
  const href = window.location.href;
  const host = window.location.host;

  /**
   * 获取国家码(fr/mx)，以及是否为hub
   * 1. 开发环境，根据process.env
   * 2. 其他环境，根据二级路径，判断国家 eg: https://www.royalcanin.com/fr/shop https://shopsit.royalcanin.com/fr
   */
  let countryCode =
    process.env.REACT_APP_START_COUNTRY_LINK ||
    href.match(/http[s]?:\/\/[^\/]+\/([a-zA-A]{2})\/*/i)[1];
  const isHub =
    process.env.REACT_APP_START_HUB === '1' ||
    href.includes('wedding') ||
    /\/shop\/*$/gi.test(href) ||
    /\/shop\//gi.test(href); //包含wedding字样，或以/shop结尾，或包含/shop/字样

  // 从地址上获取不到时，进行强制匹配
  if (!countryCode) {
    switch (host) {
      case 'shop.royalcanin.mx':
        countryCode = 'mx';
        break;
      case 'shop.royalcanin.de':
      case 'www.shop.royalcanin.de':
        countryCode = 'de';
        break;
      case 'shop.royalcanin.com':
        countryCode = 'us';
        break;
      case 'shop.royalcanin.fr':
        countryCode = 'fr';
        break;
      case 'shop.royal-canin.ru':
      case 'www.shop.royal-canin.ru':
        countryCode = 'ru';
        break;
      case 'shop.royalcanin.com.tr':
      case 'www.shop.royalcanin.com.tr':
        countryCode = 'tr';
        break;
    }
  }

  // 此mapping关系暂时为之，后续讨论标准国家码
  return { countryCode: { ru: 'RU', fr: 'FR' }[countryCode], isHub };
};

export default getCountryCodeFromHref;
