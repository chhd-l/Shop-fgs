import React from 'react';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;
const categoryAndProductNeedArr = [
  { countryName: 'ru', langLocale: 'ru-RU' },
  { countryName: 'tr', langLocale: 'tr-TR' },
  { countryName: 'fr', langLocale: 'fr-FR' },
  { countryName: 'uk', langLocale: 'en-GB' }
];

const Canonical = (props) => {
  const { href, pageType } = props;
  const ret = href || pageLink;
  //372676 [CORE][SEO] Cross-referencing hreflang tags between category and product pages
  const getLinkTag = () => {
    if (['PLP', 'PDP'].includes(pageType)) {
      if (['ru', 'tr', 'fr', 'uk'].includes(window.__.env.REACT_APP_COUNTRY)) {
        return categoryAndProductNeedArr.map((item) => {
          return <link rel="alternate" href={ret} hreflang={item.langLocale} />;
        });
      } else {
        return (
          <link
            rel="alternate"
            href={ret}
            hreflang={window.__.env.REACT_APP_LANG_LOCALE}
          />
        );
      }
    } else {
      return (
        <link
          rel="alternate"
          href={ret}
          hreflang={window.__.env.REACT_APP_LANG_LOCALE}
        />
      );
    }
  };

  return (
    <Helmet>
      <link rel="canonical" href={ret} />
      {['ru', 'tr', 'fr', 'uk', 'se'].includes(window.__.env.REACT_APP_COUNTRY)
        ? getLinkTag()
        : // <link
          //   rel="alternate"
          //   href={ret}
          //   hreflang={window.__.env.REACT_APP_LANG_LOCALE}
          // />
          null}
      {/* // x-default hreflang tags should be updated on all D2C pages for all markets. */}
      {['ru', 'tr', 'fr', 'uk', 'se'].includes(
        window.__.env.REACT_APP_COUNTRY
      ) ? (
        <link
          rel="alternate"
          href={ret.replace(new RegExp(window.__.env.REACT_APP_COUNTRY), 'uk')}
          hreflang="x-default"
        />
      ) : null}
    </Helmet>
  );
};

export default Canonical;
