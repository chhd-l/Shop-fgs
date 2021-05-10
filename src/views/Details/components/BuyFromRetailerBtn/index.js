import React from 'react';
import { FormattedMessage } from 'react-intl';
class BuyFromRetailerBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ccidBtnDisplay, onClick, barcode, goodsType } = this.props;
    const Fr = process.env.REACT_APP_COUNTRY === 'FR';
    return (
      <div>
        {Fr ? (
          <div
            className={`other-buy-btn rc-btn rc-btn--sm rc-btn--two ${
              !ccidBtnDisplay && 'rc-btn-solid-disabled'
            }`}
            data-ccid="wtb-target"
            data-ean={
              process.env.REACT_APP_COUNTRY === 'FR' ? '3182550751148' : barcode
            }
            onClick={onClick}
          >
            <span className="rc-icon rc-location--xs rc-iconography rc-brand1 eanIcon" />
            {!ccidBtnDisplay ? (
              <span className="default-txt">
                <FormattedMessage
                  id={
                    goodsType === 3
                      ? 'details.vetBuyFromRetailer'
                      : 'details.buyFromRetailer'
                  }
                />
              </span>
            ) : null}
          </div>
        ) : (
          <a
            href="http://www.royalcanin.com/tr/where-to-buy"
            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
            style={{ padding: '7px 1.5rem' }}
          >
            <FormattedMessage id="details.buyFromRetailer" />
          </a>
        )}
      </div>
    );
  }
}

export default BuyFromRetailerBtn;
