import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

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
          <b>
            <FormattedMessage id="help.byTelephone" />
          </b>
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
          <img
            className=" ls-is-cached lazyloaded"
            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
            alt="Par téléphone icon"
            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
          />
        </div>
        <div className="rc-padding-left--xs rc-md-down">
          <img
            className="lazyload"
            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw77342d81/subscription/icon callus@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=4&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
            alt="Par téléphone icon"
          />
        </div>
      </div>
      <Link
        className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
        to="/help"
      >
        <div className="rc-margin-right--xs flex-grow-1">
          <b>
            <FormattedMessage id="help.byEmail" />
          </b>
          <div className="children-nomargin" />
        </div>
        <div className="rc-padding-left--xs rc-lg-up">
          <img
            className=" ls-is-cached lazyloaded"
            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
            alt="Par e-mail icon"
            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
          />
        </div>
        <div className="rc-padding-left--xs rc-md-down">
          <img
            className="lazyload"
            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw72994029/subscription/Emailus_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
            alt="Par e-mail icon"
          />
        </div>
      </Link>
      <Link
        className="dropdown-nav__help__card faq rc-border-all rc-border-colour--interface d-flex align-items-center"
        to="/FAQ/all"
      >
        <div className="rc-margin-right--xs flex-grow-1">
          <b>
            <FormattedMessage id="footer.FAQ" />
          </b>
          <div className="children-nomargin" />
        </div>
        <div className="rc-padding-left--xs rc-lg-up">
          <img
            className=" ls-is-cached lazyloaded"
            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
            alt="FAQ icon"
            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
          />
        </div>
        <div className="rc-padding-left--xs rc-md-down">
          <img
            className="lazyload"
            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw4893a52e/subscription/FAQ_icon@2x.png?sw=65&amp;sh=65&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=180&amp;ch=180&amp;sfrm=png"
            alt="FAQ icon"
          />
        </div>
      </Link>
    </div>
  );
}
