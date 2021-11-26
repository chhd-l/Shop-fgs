import React from 'react';
import { FormattedMessage } from 'react-intl';
import ConfirmTooltip from '@/components/ConfirmTooltip';

class BuyFromRetailerBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipVisible: false,
      ccidBtnDisplay: false
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
  ccidBtnRef(el) {
    const self = this;
    const nodeBtn = document.querySelector('.other-buy-btn');
    if (el && nodeBtn) {
      const config = { attributes: true, childList: true, subtree: true };
      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        let eanDoms = document.querySelectorAll('.eanIcon');
        eanDoms[0].parentElement.addEventListener(
          'click',
          function () {
            eanDoms[0].nextElementSibling.click();
          },
          false
        );

        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            self.setState({
              ccidBtnDisplay: true
            });
            observer.disconnect();
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(nodeBtn, config);
    }
  }
  confirmTooltip = () => {
    return (
      <ConfirmTooltip
        arrowDirection="bottom"
        containerStyle={{
          transform: 'translate(-95%, -50%)',
          width: ' 15.3rem',
          minWidth: 'auto'
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
        textStyle={{
          fontWeight: 500,
          fontSize: '1rem'
        }}
      />
    );
  };
  render() {
    const { onClick, barcode, goodsType } = this.props;
    const { ccidBtnDisplay } = this.state;
    const Fr = window.__.env.REACT_APP_COUNTRY === 'fr';
    const Tr = window.__.env.REACT_APP_COUNTRY === 'tr';
    const Uk = window.__.env.REACT_APP_COUNTRY === 'uk';
    return (
      <div ref={(el) => this.ccidBtnRef(el)}>
        {Fr || Uk ? (
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
        ) : null}
        {Tr ? (
          <a
            href="http://www.royalcanin.com/tr/where-to-buy"
            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
            style={{ padding: '7px 1.5rem' }}
          >
            <FormattedMessage id="details.buyFromRetailer" />
          </a>
        ) : null}
      </div>
    );
  }
}

export default BuyFromRetailerBtn;
