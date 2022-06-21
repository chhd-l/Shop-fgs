import React from 'react';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;

const Canonical = ({ href }) => {
  const ret = href || pageLink;
  return (
    <Helmet>
      <link rel="canonical" href={ret} />
      {['ru', 'tr', 'fr', 'uk'].includes(window.__.env.REACT_APP_COUNTRY) ? (
        <link
          rel="alternate"
          href={ret}
          hreflang={window.__.env.REACT_APP_LANG_LOCALE}
        />
      ) : null}
      {/* // x-default hreflang tags should be updated on all D2C pages for all markets. */}
      {['ru', 'tr', 'fr', 'uk'].includes(window.__.env.REACT_APP_COUNTRY) ? (
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
