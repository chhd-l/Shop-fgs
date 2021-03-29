import React from 'react';
import { FormattedMessage } from 'react-intl';
class BuyFromRetailerBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ccidBtnDisplay, onClick, barcode } = this.props;
    const Fr = process.env.REACT_APP_LANG === 'fr';
    return (
      <div>
        {Fr ? (
          <div
            className={`other-buy-btn rc-btn rc-btn--sm rc-btn--two ${
              !ccidBtnDisplay && 'rc-btn-solid-disabled'
            }`}
            data-ccid="wtb-target"
            data-ean={
              process.env.REACT_APP_LANG === 'fr' ? '3182550751148' : barcode
            }
            onClick={onClick}
          >
            <span className="rc-icon rc-location--xs rc-iconography rc-brand1 eanIcon" />
            {!ccidBtnDisplay ? (
              <span className="default-txt">
                <FormattedMessage id="details.buyFromRetailer" />
              </span>
            ) : null}
          </div>
        ) : (
          <a
            href="https://www.royalcanin.com.com/tr/where-to-buy"
            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
            style={{ minWidth: '110px' }}
          >
            <FormattedMessage id="details.buyFromRetailer" />
          </a>
        )}
      </div>
    );
  }
}

export default BuyFromRetailerBtn;
