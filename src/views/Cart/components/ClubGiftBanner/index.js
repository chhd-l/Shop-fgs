import React from 'react';
import ClubBanner_Logo from '@/assets/images/club_banner_logo.png';
import { FormattedMessage } from 'react-intl';

export default function ClubGiftBanner() {
  return (
    <div className="d-flex club-box rc-border-all gift-text-center-mobile-gift rc-border-colour--interface product-info">
      <div
        className="name-info flex-column-gift d-flex mr-md-3 ml-md-3"
        style={{ flex: 1 }}
      >
        <img className="img w-100" src={ClubBanner_Logo} />
      </div>
      {/* <div className="logo-info text-center">
    <img
      style={{ display: 'inline-block' }}
      src={Club_Logo}
      alt="Club logo"
    />
  </div> */}
      <div className="tips-info mobile-text-center mr-3 ml-4 ml-md-0">
        <ul>
          <li className="rc-list__item">
            <FormattedMessage id="clubGiftTips1" />
            {/* <strong>Best-in-class nutrition</strong> for your pet */}
          </li>
          <li className="rc-list__item">
            <FormattedMessage id="clubGiftTips2" />
            {/* <strong>Adapted tips</strong> to care for your pet */}
          </li>
          <li className="rc-list__item">
            <FormattedMessage id="clubGiftTips3" />
            {/* Your personal <strong>Pet advisor</strong> */}
          </li>
          <li className="rc-list__item">
            <FormattedMessage id="clubGiftTips4" />
            {/* Exclusive <strong>rewards & offers</strong> */}
          </li>
          <li className="rc-list__item">
            <FormattedMessage id="clubGiftTips5" />
            {/* <strong>Free, automatic delivery</strong> on every refill */}
          </li>
        </ul>
        {/* You can cancel your subscription anytime, but you will have to
    pay the remaining balance of the dispenser market price of 120
    euros.* */}
      </div>
    </div>
  );
}
