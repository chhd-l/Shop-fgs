import React from 'react';

const information = {
  icon: (
    <svg
      className="svg-icon account-home-icon"
      aria-hidden="true"
      style={{ width: '2.6rem' }}
    >
      <use xlinkHref="#iconMyinformation" />
    </svg>
  ),
  titleLangKey: 'account.profile',
  textLangKey: 'account.profileTip',
  link: '/account/information'
};

const pets = {
  icon: (
    <svg
      className="svg-icon account-home-icon"
      aria-hidden="true"
      style={{ width: '2.6rem' }}
    >
      <use xlinkHref="#iconMypets" />
    </svg>
  ),
  titleLangKey: 'account.petsTitle',
  textLangKey: 'account.petsTip',
  link: '/account/pets/'
};

const orders = {
  icon: (
    <svg
      className="svg-icon account-home-icon"
      aria-hidden="true"
      style={{ width: '2.6rem' }}
    >
      <use xlinkHref="#iconMyorders1" />
    </svg>
  ),
  titleLangKey: 'account.ordersTitle',
  textLangKey: 'account.ordersTip',
  link: '/account/orders'
};

const subscription = {
  icon: (
    <svg
      className="svg-icon account-home-icon"
      aria-hidden="true"
      style={{ width: '2.6rem' }}
    >
      <use xlinkHref="#iconMySubsciptions1" />
    </svg>
  ),
  titleLangKey: 'account.subscriptionTitle',
  textLangKey: 'account.subscriptionTip',
  link: '/account/subscription'
};

const faqs = {
  icon: (
    <svg
      className="svg-icon account-home-icon"
      aria-hidden="true"
      style={{ width: '2.6rem' }}
    >
      <use xlinkHref="#iconFAQ" />
    </svg>
  ),
  titleLangKey: 'account.faqTitle',
  textLangKey: 'account.faqTip',
  link: '/faq',
  href:
    process.env.REACT_APP_COUNTRY == 'ru' ? '/about-us/faq' : '/about-us/faqs',
  isHubOuterLink: true
};

const itemList = (function () {
  const defaultItemList = [information, pets, orders, subscription, faqs];
  return (
    {
      // RU: [information, pets, orders, subscription] //ru 没有faqs
    }[process.env.REACT_APP_COUNTRY] || defaultItemList
  );
})();

export { itemList };
