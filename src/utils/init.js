import { loadJS, dynamicLoadCss } from '@/utils/utils';

// Cookies Consent Notice, DO NOT REMOVE
loadJS({
  url: window.__.env.REACT_APP_ONTRUST_SRC,
  dataSets: {
    domainScript: window.__.env.REACT_APP_ONTRUST_DOMAIN_SCRIPT,
    documentLanguage: 'true'
  }
});

// 限制启用了BazaarVoice ratings&reviews才能add BV Loader
if (window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS === '1') {
  loadJS({
    url: `https://apps.bazaarvoice.com/deployments/royal-canin/main_site/${window.__.env.REACT_APP_BAZAARVOICE_ENV}/en_US/bv.js`
  });
}

if (
  window.__.env.REACT_APP_COUNTRY === 'fr' ||
  window.__.env.REACT_APP_COUNTRY === 'de'
) {
  window.OptanonWrapper = () => {
    setTimeout(function () {
      Optanon.Close();
    }, 30000);
  };
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

dynamicLoadCss(window.__.env.REACT_APP_ONTRUST_STYLE);

if (window.__.env.REACT_APP_COUNTRY === 'ru') {
  !(function (t) {
    (window.PetStoryWC = window.PetStoryWC || {}),
      (window.PetStoryWC.id = t.id || 'ps-widget-' + new Date().getTime());
    var e = document.createElement('script');
    e.setAttribute('type', 'text/javascript'),
      e.setAttribute('src', 'https://corp.petstory.ru/wc.js'),
      e.setAttribute(
        'onload',
        '!function({d:t,k:a,r:s}){PetStoryWC&&PetStoryWC.init&&PetStoryWC.init({draw:t,key:a,reinit:s})}({d:false,k:"' +
          t.key +
          '",r:false});'
      ),
      document.body.append(e);
  })({ key: 'd8ba1b22-18c0-4b5b-82f0-3768899fea64' });
}

if (window.__.env.REACT_APP_HUB === '1') {
  let dom = document.querySelector('#root');
  dom.className += ` ${window.__.env.REACT_APP_ROOT_CLS}`;
}
