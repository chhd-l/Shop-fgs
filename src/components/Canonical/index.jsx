import React from 'react';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;

const Canonical = () => {
  return (
    <Helmet>
      {/* <link rel="canonical" href={pageLink} /> */}
      <link rel="canonical" href={pageLink} />
    </Helmet>
  );
};

export default Canonical;
