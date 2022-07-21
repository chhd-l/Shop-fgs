const searchNoResult = {
  fr: '/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show',
  us: '/on/demandware.store/Sites-EN-Site/en_EN/Search-Show',
  ru: '/on/demandware.store/Sites-RU-Site/ru_RU/Search-Show',
  tr: '/on/demandware.store/Sites-TR-Site/tr_TR/Search-Show',
  de: '/on/demandware.store/Sites-DE-Site/de_DE/Search-Show'
};
const aboutUsBread = () => {
  let list = [
    {
      name: 'aboutUs2'
    }
  ];
  if (window.__.env.REACT_APP_COUNTRY === 'ru') {
    list = [{ name: 'Информация о компании', href: '/about-us' }];
  }

  return list;
};
const breadcrumbNameMap = {
  '/aboutUs': [
    {
      name: 'aboutUs2'
    }
  ],
  '/Tailorednutrition': [
    {
      name: 'tailorednutrition'
    }
  ],
  '/general-terms-conditions': [
    {
      name: 'generalTermsConditions'
    }
  ],
  '/latelier/felin-terms-conditions': [
    {
      name: 'CONDITIONS GÉNÉRALES DE RESERVATION'
    }
  ],
  '/club/find-product': [
    { name: 'Club', href: '/club' },
    { name: 'Find Product', href: '/club/find-product' }
  ],
  '/faq': [
    {
      name: 'FAQ'
    }
  ],
  '/shipmentConditions': [
    {
      name: 'ShipmentConditions'
    }
  ],
  '/promotion-refuge': [
    {
      name: 'Nos promotions refuge'
    }
  ],
  '/cadeau-coussin-chat': [
    {
      name: 'Nos promotions Chat'
    }
  ],
  '/About-Us': aboutUsBread(),
  '/about-us': aboutUsBread()
};

export default breadcrumbNameMap;
