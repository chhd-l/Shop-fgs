import React from 'react';
import ClubBanner_Logo_ru from '@/assets/images/club_banner_logo_ru.png';
import ClubBanner_Logo_en from '@/assets/images/club_banner_logo_en.png';
import ClubBanner_Logo_tr from '@/assets/images/club_banner_logo_tr.png';
import { FormattedMessage } from 'react-intl';
let ClubBanner_Logo = ClubBanner_Logo_en;
if (process.env.REACT_APP_LANG === 'ru') {
  ClubBanner_Logo = ClubBanner_Logo_ru;
} else if (process.env.REACT_APP_LANG === 'tr') {
  ClubBanner_Logo = ClubBanner_Logo_tr;
}

export default function ClubGiftBanner(props) {
  console.log(props, 'props');
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
      <div
        className="tips-info mobile-text-center mr-3 ml-4 ml-md-0"
        style={{ paddingLeft: '10px', flex: 1 }}
      >
        <ul>
          <li
            className="rc-list__item"
            dangerouslySetInnerHTML={{
              __html: props.intl.messages['clubGiftTips1']
            }}
          >
            {/* <FormattedMessage id="clubGiftTips1" /> */}
            {/* <strong>Best-in-class nutrition</strong> for your pet */}
          </li>
          <li
            className="rc-list__item"
            dangerouslySetInnerHTML={{
              __html: props.intl.messages['clubGiftTips2']
            }}
          >
            {/* <strong>
              <FormattedMessage id="clubGiftTips2" />
            </strong> */}
            {/* <strong>Adapted tips</strong> to care for your pet */}
          </li>
          <li
            className="rc-list__item"
            dangerouslySetInnerHTML={{
              __html: props.intl.messages['clubGiftTips3']
            }}
          >
            {/* <strong>
              <FormattedMessage id="clubGiftTips3" />
            </strong> */}
            {/* Your personal <strong>Pet advisor</strong> */}
          </li>
          <li
            className="rc-list__item"
            dangerouslySetInnerHTML={{
              __html: props.intl.messages['clubGiftTips4']
            }}
          >
            {/* <strong>
              <FormattedMessage id="clubGiftTips4" />
            </strong> */}
            {/* Exclusive <strong>rewards & offers</strong> */}
          </li>
          <li
            className="rc-list__item"
            dangerouslySetInnerHTML={{
              __html: props.intl.messages['clubGiftTips5']
            }}
          >
            {/* <strong>
              <FormattedMessage id="clubGiftTips5" />
            </strong> */}
            {/* <strong>Free, automatic delivery</strong> on every refill */}
          </li>
          {process.env.REACT_APP_LANG === 'ru' ? (
            <li
              className="rc-list__item"
              dangerouslySetInnerHTML={{
                __html: props.intl.messages['clubGiftTips6']
              }}
            >
              {/* <strong>
                <FormattedMessage id="clubGiftTips6" />
              </strong> */}
              {/* <strong>Free, automatic delivery</strong> on every refill */}
            </li>
          ) : null}
        </ul>
        {/* You can cancel your subscription anytime, but you will have to
    pay the remaining balance of the dispenser market price of 120
    euros.* */}
      </div>
    </div>
  );
}
