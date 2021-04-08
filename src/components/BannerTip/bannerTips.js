import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { getDeviceType } from '@/utils/utils';
import './index.less';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

function Container({ children }) {
  return isMobile ? (
    <marquee style={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </marquee>
  ) : (
    <div
      className="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs"
      style={{ padding: '.3rem .5rem' }}
    >
      {children}
    </div>
  );
}

export const bannerTips = () => {
  return (
    <div
      // id="bannerTip"
      className="red font-weight-normal p-1 position-relative text-center pl-2 pr-2 pr-md-4 pl-md-4 rc-bg-colour--brand4 rc-bannertip-containner"
    >
      {process.env.REACT_APP_IS_PROMOTION === 'true' && (
        <div>
          {/* 美国临时加一个写死的Notice  */}
          {process.env.REACT_APP_LANG === 'en' ? (
            <div class="rc-bg-colour--brand4 text-center">
              <div class="rc-layout-container rc-content-h-middle">
                <div class="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs">
                  <div class="d-flex align-items-center">
                    <span class="rc-margin-right--xs rc-margin-left--xs">
                      Important Notice: Due to an increase in demand, your
                      preferred product may be currently unavailable.
                      <br />
                      Your pet’s health is our top priority, and we’re working
                      hard to ensure their formulas are back in stock soon.
                      <br />
                      Thank you for your patience.
                    </span>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="rc-bg-colour--brand4 text-center">
            <div className="rc-layout-container rc-content-h-middle">
              <Container>
                <span className="rc-icon rc-refresh rc-brand1 rc-iconography" />
                <span className="align-middle">
                  <span className="rc-margin-right--xs rc-margin-left--xs rc-bannertip-text">
                    <FormattedMessage id="home.promotionTip" />
                  </span>
                  <Link
                    to="/subscription-landing"
                    className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                  >
                    <FormattedMessage id="bannerTip.btnText" />
                  </Link>
                </span>
              </Container>
            </div>
          </div>
        </div>
      )}
      <FormattedMessage id="home.note1" defaultMessage={' '} />{' '}
      <FormattedMessage id="home.note2" defaultMessage={' '} />
    </div>
  );
};
