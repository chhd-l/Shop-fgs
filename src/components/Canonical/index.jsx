import React from 'react';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;

const Canonical = () => {
  return (
    <Helmet>
      <link rel="canonical" href={pageLink.toLocaleLowerCase()} />
    </Helmet>
  );
};

export default Canonical;
