import React from 'react';
import { FormattedMessage } from 'react-intl';
import ConfirmTooltip from '@/components/ConfirmTooltip';

class BuyFromRetailerBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipVisible: false
    };
  }

  componentDidMount() {
    const tipIcon = (
      <span
        className="info-tooltip delivery-method-tooltip"
        onMouseEnter={(e) => {
          this.setState({
            toolTipVisible: true
          });
        }}
        onMouseLeave={() => {
          this.setState({
            toolTipVisible: false
          });
        }}
      >
        i
      </span>
    );
    this.setState({
      tipIcon
    });
  }
  confirmTooltip = () => {
    return (
      <ConfirmTooltip
        arrowDirection="bottom"
        containerStyle={{
          transform: 'translate(-95%, -50%)'
        }}
        display={this.state.toolTipVisible}
        cancelBtnVisible={false}
        confirmBtnVisible={false}
        updateChildDisplay={(status) =>
          this.setState({
            toolTipVisible: status
          })
        }
        content={<FormattedMessage id="details.buyFromRetailerTip" />}
      />
    );
  };
  render() {
    const { ccidBtnDisplay, onClick, barcode, goodsType } = this.props;
    const Fr = process.env.REACT_APP_COUNTRY === 'FR';
    return (
      <div>
        {Fr ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={`other-buy-btn rc-btn rc-btn--sm rc-btn--two ${
                !ccidBtnDisplay && 'rc-btn-solid-disabled'
              }`}
              data-ccid="wtb-target"
              data-ean={barcode}
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
            <div style={{ position: 'relative' }}>
              {this.state.tipIcon}
              {this.confirmTooltip()}
            </div>
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
