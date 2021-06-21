import React from 'react';
import { Link } from 'react-router-dom';

export const LinkJSX = () => {
  const defaultJSX = null;

  return (
    {
      fr: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing'}
        >
          En savoir plus
        </Link>
      ),
      de: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing'}
        >
          En savoir plus
        </Link>
      ),
      us: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing-us'}
        >
          Join the Club
        </Link>
      ),
      ru: (
        <Link
          className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
          style={{ minWidth: '110px' }}
          to={'/subscription-landing-ru'}
        >
          Учить больше
        </Link>
      )
    }[window.__.env.REACT_APP_COUNTRY] || defaultJSX
  );
};
