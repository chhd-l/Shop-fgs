import React from 'react';

const information = {
  iconSrc: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/My information.svg`,
  titleLangKey: 'account.profile',
  textLangKey: 'account.profileTip',
  link: '/account/information'
};

const pets = {
  iconSrc: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/My pets.svg`,
  titleLangKey: 'account.petsTitle',
  textLangKey: 'account.petsTip',
  link: '/account/pets/'
};

const orders = {
  iconSrc: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/My orders.svg`,
  titleLangKey: 'account.ordersTitle',
  textLangKey: 'account.ordersTip',
  link: '/account/orders'
};

const appointments = {
  icon: (
    <span className="flex align-items-center rounded px-1 py-2">
      <span
        className="iconfont iconyuyuexinxi text-4xl"
        style={{ fontColor: '#e6e6e6' }}
      />
    </span>
  ),
  titleLangKey: 'account.appointment',
  textLangKey: 'account.appointmentsTip',
  link: '/account/appointments'
};

const subscription = {
  iconSrc: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/My Subsciptions.svg`,
  titleLangKey: 'account.subscriptionTitle',
  textLangKey: 'account.subscriptionTip',
  link: '/account/subscription'
};

const faqs = {
  iconSrc: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/FAQ.svg`,
  titleLangKey: 'account.faqTitle',
  textLangKey: 'account.faqTip',
  link: '/faq',
  href:
    window.__.env.REACT_APP_COUNTRY == 'ru'
      ? '/about-us/faq'
      : '/about-us/faqs',
  isHubOuterLink: true
};

const loyaltyProgramme = {
  icon: (
    <span
      className="flex align-items-center rounded px-3 py-2"
      style={{ background: '#EDEDED' }}
    >
      <span className="iconfont iconlogo--crown rc-text-colour--brand1" />
    </span>
  ),
  titleLangKey: 'account.loyaltyProgramme',
  textLangKey: 'account.loyaltyProgrammeTip',
  href: window.__.env.LOYALTY_PROGRAMME_LINK,
  isOuter: true,
  rightTopIcon: <span className="iconfont iconLogoff" />
};

const itemList = (function () {
  const defaultItemList = [
    information,
    pets,
    window.__.env.REACT_APP_COUNTRY === 'fr' ? appointments : '',
    orders,
    subscription,
    faqs,
    Boolean(window.__.env.LOYALTY_PROGRAMME_LINK) ? loyaltyProgramme : ''
  ].filter((c) => c);
  return defaultItemList;
})();

export { itemList };
