import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LinkJSX } from './link';

export const bannerTips = () => {
  return (
    <div
      // id="bannerTip"
      className="red font-weight-normal p-1 position-relative text-center pl-2 pr-2 pr-md-4 pl-md-4 rc-bg-colour--brand4"
    >
      {process.env.REACT_APP_IS_PROMOTION === 'true' && (
        <div className="rc-bg-colour--brand4 text-center">
          <div className="rc-layout-container rc-content-h-middle">
            <div className="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs">
              <span className="rc-icon rc-refresh rc-brand1 rc-iconography" />
              <div className="d-flex align-items-center">
                <span className="rc-margin-right--xs rc-margin-left--xs">
                  <FormattedMessage id="home.promotionTip" />
                </span>
                <div>
                  <Link
                    to="/subscription-landing"
                    className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                    style={{ minWidth: '110px' }}
                  >
                    {process.env.REACT_APP_LANG == 'en' ? (
                      <FormattedMessage id="joinTheClub" />
                    ) : (
                        <FormattedMessage id="aboutUs.learnMore" />
                      )}

                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <FormattedMessage id="home.note1" defaultMessage={' '} />{' '}
      <FormattedMessage id="home.note2" defaultMessage={' '} />
    </div>
  );
};
