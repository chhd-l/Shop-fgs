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
  '/tailored-nutrition': [
    { name: 'Здоровье и питание', href: '/tailored-nutrition' }
  ],
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
  '/about-us/our-history': [
    { name: 'Информация о компании', href: '/about-us' },
    { name: 'Наша история', href: '/about-us/our-history' }
  ],
  '/about-us/sustainability': [
    { name: 'Информация о компании', href: '/about-us' },
    { name: 'Устойчивое развитие', href: '/about-us/sustainability' }
  ],
  '/about-us/our-values': [
    { name: 'Информация о компании', href: '/about-us' },
    { name: 'Наши ценности', href: '/about-us/our-values' }
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
  '/about-us/faq': [
    {
      name: 'Информация о компании',
      href: '/about-us'
    },
    {
      name: 'Часто задаваемые вопросы',
      href: '/about-us/faq'
    }
  ],
  '/about-us/special-works-conditions': [
    { name: 'Информация о компании', href: '/about-us' }
  ],
  '/about-us/shipment-conditions': [
    {
      name: 'Информация о компании',
      href: '/about-us'
    },
    {
      name: 'Условия доставки интернет-магазина',
      href: '/about-us/shipment-conditions'
    }
  ],
  '/about-us/terms-and-conditions': [
    { name: 'Информация о компании', href: '/about-us' }
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
