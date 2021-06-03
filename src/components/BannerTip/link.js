import React from 'react';
import { Link } from 'react-router-dom';

export const LinkJSX = () => {
  const defaultJSX = null;

  return (
    {
      FR: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing'}
        >
          En savoir plus
        </Link>
      ),
      DE: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing'}
        >
          En savoir plus
        </Link>
      ),
      US: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing-us'}
        >
          Join the Club
        </Link>
      ),
      RU: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing-ru'}
        >
          Учить больше
        </Link>
      )
    }[process.env.REACT_APP_COUNTRY] || defaultJSX
  );
};
