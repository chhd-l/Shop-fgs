import React from 'react'
import { Link } from 'react-router-dom';

export const LinkJSX = () => {
    const defaultJSX = null

    return (
        {
            fr: <Link
            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
            style={{minWidth:"110px"}}
            to={'/subscription-landing'}
          >
            En savoir plus
          </Link>,
            en:  <Link
            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
            style={{minWidth:"110px"}}
            to={'/subscription-landing-us'}
          >
            Join the Club
          </Link>,
            ru: <Link
            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
            style={{minWidth:"110px"}}
            to={'/subscription-landing-ru'}
          >
            Учить больше
          </Link>
        } [process.env.REACT_APP_LANG] || defaultJSX
    )
} 