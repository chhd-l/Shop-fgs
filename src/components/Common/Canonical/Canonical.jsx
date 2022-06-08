import React from 'react';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;

const Canonical = ({ href }) => {
  const ret = href || pageLink;
  return (
    <Helmet>
      <link rel="canonical" href={ret} />
      {['tr', 'fr', 'uk'].includes(window.__.env.REACT_APP_COUNTRY) ? (
        <link
          rel="alternate"
          href={ret}
          hreflang={window.__.env.REACT_APP_LANG_LOCALE}
        />
      ) : null}
    </Helmet>
  );
};

export default Canonical;
