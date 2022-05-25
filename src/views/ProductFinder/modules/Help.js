import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';

@inject('configStore')
@observer
class Help extends React.Component {
  render() {
    const { configStore } = this.props;
    return (
      <div className="rc-layout-container rc-two-column">
        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
          <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
              <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                <div className="w-100">
                  <b style={{ color: '#00A4A6' }}>
                    <FormattedMessage id="callUs" />
                  </b>
                  {/* <p>{configStore.contactTimePeriod}</p> */}
                  <p>
                    <FormattedMessage id="productFinder.resultHlep" />
                  </p>
                  <div className="rc-margin-top--xs">
                    <a
                      href={`tel:${configStore.storeContactPhoneNumber}`}
                      style={{ color: '#00A4A6' }}
                      className="rc-numeric nowrap"
                    >
                      {configStore.storeContactPhoneNumber}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                <picture
                  className="align-self-center m-auto"
                  data-rc-feature-objectfillpolyfill-setup="true"
                >
                  <LazyLoad>
                    <img
                      className="ls-is-cached lazyloaded"
                      alt="Par téléphone icon"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/customer-service@2x.png`}
                    />
                  </LazyLoad>
                </picture>
              </div>
            </div>
          </div>
        </article>
        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
          <Link
            // className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
            to="/help"
          >
            <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                {/*
              <Link
                className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
                to="/help"> */}
                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center md:text-left rc-padding-right--none--desktop">
                  <div className="w-100">
                    <b style={{ color: '#0087BD' }}>Par mail</b>
                    <div className="rc-margin-top--xs">
                      <a
                        href={`mailto:${configStore.storeContactPhoneNumber}`}
                        className="rc-styled-link nowrap"
                      >
                        <FormattedMessage id="emailUs" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                  <picture
                    className="align-self-center m-auto"
                    data-rc-feature-objectfillpolyfill-setup="true"
                  >
                    <LazyLoad>
                      <img
                        className=" ls-is-cached lazyloaded"
                        alt="Par e-mail icon"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/email.png`}
                      />
                    </LazyLoad>
                  </picture>
                </div>
              </div>
            </div>
          </Link>
        </article>
      </div>
    );
  }
}

export default Help;
