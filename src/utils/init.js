import { loadJS } from '@/utils/utils';
// 限制启用了BazaarVoice ratings&reviews才能add BV Loader

if (window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS === '1') {
  loadJS({
    url: `https://apps.bazaarvoice.com/deployments/royal-canin/main_site/${window.__.env.REACT_APP_BAZAARVOICE_ENV}/en_US/bv.js`
  });
}

// seo is not searched
if (
  window.__.env.REACT_APP_COUNTRY === 'us' ||
  process.env.NODE_ENV !== 'production'
) {
  var metaTag = document.createElement('meta');
  metaTag.name = 'robots';
  metaTag.content = 'noindex';
  document.getElementsByTagName('head')[0].appendChild(metaTag);
}

// add hreflang for ru
if (window.__.env.REACT_APP_COUNTRY === 'ru') {
  const linkTag = document.createElement('link');
  linkTag.rel = 'alternate';
  // var country = window.__.env.REACT_APP_COUNTRY?.charAt(0).toUpperCase() + window.__.env.REACT_APP_COUNTRY?.slice(1)
  linkTag.hreflang = window.__.env.REACT_APP_COUNTRY;
  linkTag.href = window.location.href;
  document.getElementsByTagName('head')[0].appendChild(linkTag);
}

const selfReferencingCountry = ['tr', 'fr', 'uk'];
if (selfReferencingCountry.includes(window.__.env.REACT_APP_COUNTRY)) {
  const linkTag = document.createElement('link');
  linkTag.rel = 'alternate';
  linkTag.hreflang = window.__.env.REACT_APP_LANG_LOCALE;
  linkTag.href = window.location.href;
  document.getElementsByTagName('head')[0].appendChild(linkTag);
}

if (window.__.env.REACT_APP_HUB) {
  let dom = document.querySelector('#root');
  dom.className += ' ui-custom-hub';
}

// x-default hreflang tags should be updated on all D2C pages for all markets.
const relatedUKCountry = ['ru', 'fr', 'tr', 'uk'];
if (relatedUKCountry.includes(window.__.env.REACT_APP_COUNTRY)) {
  const { origin, pathname } = window.location;
  const path = pathname.replace(/^\/([^/]+)/, 'uk');
  const linkTag = document.createElement('link');
  linkTag.rel = 'alternate';
  linkTag.hreflang = 'x-default';
  linkTag.href = `${origin}/${path}`;
  document.getElementsByTagName('head')[0].appendChild(linkTag);
}
