import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { optimizeImage } from '@/utils/utils';

export default function Help(props) {
  const { configStore } = props;

  return (
    <div className="dropdown-nav__help d-md-flex">
      <div className="dropdown-nav__help__text align-self-center">
        <h4 className="title rc-delta">
          <FormattedMessage id="aQuestion" />
        </h4>
        <div className="desc children-nomargin text-left">
          <p className="rc-text-colour--text">
            <FormattedMessage id="uNeedHelp" />
          </p>
          <p className="rc-text-colour--text">
            <FormattedMessage id="dontHesitateToContactUs" /> :
          </p>
        </div>
      </div>
      <div className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
        <div className="rc-margin-right--xs flex-grow-1">
          <strong>
            <FormattedMessage id="help.byTelephone" />
          </strong>
          <div className="children-nomargin">
            <p>{configStore.contactTimePeriod}</p>
          </div>
          <div>
            <a
              href={`tel:${configStore.storeContactPhoneNumber}`}
              className="rc-large-body tel"
            >
              {configStore.storeContactPhoneNumber}
            </a>
          </div>
        </div>
        <div className="rc-padding-left--xs rc-lg-up">
          <LazyLoad>
            <img
              className="ls-is-cached lazyloaded"
              alt="Par téléphone icon"
              src={optimizeImage({
                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icon callus@2x.png`,
                width: 65
              })}
            />
          </LazyLoad>
        </div>
        <div className="rc-padding-left--xs rc-md-down">
          <LazyLoad>
            <img
              className="lazyload"
              src={optimizeImage({
                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icon callus@2x.png`,
                width: 65
              })}
              alt="Par téléphone icon"
            />
          </LazyLoad>
        </div>
      </div>
      <Link
        className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
        to="/help"
      >
        <div className="rc-margin-right--xs flex-grow-1">
          <strong>
            <FormattedMessage id="help.byEmail" />
          </strong>
          <div className="children-nomargin" />
        </div>
        <div className="rc-padding-left--xs rc-lg-up">
          <LazyLoad>
            <img
              className=" ls-is-cached lazyloaded"
              src={optimizeImage({
                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/Emailus_icon@2x.png`,
                width: 65
              })}
              alt="Par e-mail icon"
            />
          </LazyLoad>
        </div>
        <div className="rc-padding-left--xs rc-md-down">
          <LazyLoad>
            <img
              className="lazyload"
              src={optimizeImage({
                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/Emailus_icon@2x.png`,
                width: 65
              })}
              alt="Par e-mail icon"
            />
          </LazyLoad>
        </div>
      </Link>
      <Link
        className="dropdown-nav__help__card faq rc-border-all rc-border-colour--interface d-flex align-items-center"
        to="/faq"
      >
        <div className="rc-margin-right--xs flex-grow-1">
          <strong>
            <FormattedMessage id="footer.FAQ" />
          </strong>
          <div className="children-nomargin" />
        </div>
        <div className="rc-padding-left--xs rc-lg-up">
          <LazyLoad>
            <img
              className="ls-is-cached lazyloaded"
              alt="FAQ icon"
              src={optimizeImage({
                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/FAQ_icon@2x.png`,
                width: 65
              })}
            />
          </LazyLoad>
        </div>
        <div className="rc-padding-left--xs rc-md-down">
          <LazyLoad>
            <img
              className="lazyload"
              src={optimizeImage({
                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/FAQ_icon@2x.png`,
                width: 65
              })}
              alt="FAQ icon"
            />
          </LazyLoad>
        </div>
      </Link>
    </div>
  );
}
