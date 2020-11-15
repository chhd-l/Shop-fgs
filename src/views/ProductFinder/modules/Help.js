import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';

@inject('configStore')
@observer
class Help extends React.Component {
  render() {
    const { configStore } = this.props;
    return (
      <div className="row">
        <div className="col-12 col-md-6 ">
          <div className="dropdown-nav__help__card call-us rc-border-all rc-border-colour--interface d-flex align-items-center">
            <div className="rc-margin-right--xs flex-grow-1">
              <b>
                <FormattedMessage id="callUs" />
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
                className="ls-is-cached lazyloaded"
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
        </div>
        <div className="col-12 col-md-6 ">
          <Link
            className="dropdown-nav__help__card email-us rc-border-all rc-border-colour--interface d-flex align-items-center"
            to="/help"
          >
            <div className="rc-margin-right--xs flex-grow-1">
              <b>
                <FormattedMessage id="emailUs" />
              </b>
              <br />
              <a
                className="rc-styled-link"
                href={`mailto:${configStore.storeContactPhoneNumber}`}
              >
                <FormattedMessage id="sendUsAnEmail" />
              </a>
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
        </div>
      </div>
    );
  }
}

export default Help