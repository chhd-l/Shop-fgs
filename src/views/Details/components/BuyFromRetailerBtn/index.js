import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Popover } from '@/components/Common';

let clickInit = false;
class BuyFromRetailerBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipVisible: false,
      ccidBtnDisplay: false,
      gaFlag: false // 主动触发和手动点击会重复埋点，暂未想到处理办法
    };
  }

  ccidBtnRef(el) {
    const self = this;
    const nodeBtn = document.querySelector('.other-buy-btn');
    let eanDoms = document.querySelectorAll('.eanIcon');
    if (el && nodeBtn && eanDoms[0].nextElementSibling) {
      const config = { attributes: true, childList: true, subtree: true };
      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        if (!clickInit) {
          clickInit = true;
          eanDoms[0].parentElement.addEventListener(
            'click',
            function () {
              eanDoms[0].nextElementSibling.click();
            },
            false
          );
        }

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
  onMouseEnter = () => {
    this.setState({
      toolTipVisible: !this.state.toolTipVisible
    });
  };
  onMouseLeave = () => {
    this.setState({
      toolTipVisible: false
    });
  };
  confirmTooltip = () => {
    return (
      <Popover
        display={this.state.toolTipVisible}
        cancelBtnVisible={false}
        confirmBtnVisible={false}
        updateChildDisplay={(status) => {
          this.setState({
            toolTipVisible: status
          });
        }}
        positions={['top']}
        content={<FormattedMessage id="details.buyFromRetailerTip" />}
        contentStyle={{
          fontWeight: 500,
          fontSize: '1rem'
        }}
      >
        <span
          className="info-tooltip delivery-method-tooltip"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          i
        </span>
      </Popover>
    );
  };
  render() {
    const { onClick, barcode, goodsType, buyFromRetailerConfig } = this.props;
    const isApi =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'API';
    const isUrl =
      buyFromRetailerConfig.retailerEnable &&
      buyFromRetailerConfig.type === 'URL';
    const vetUrl = buyFromRetailerConfig.retailerEnable
      ? buyFromRetailerConfig.vetUrl
      : '';
    const sptUrl = buyFromRetailerConfig.retailerEnable
      ? buyFromRetailerConfig.sptUrl
      : '';
    const { ccidBtnDisplay } = this.state;
    return (
      <div ref={(el) => this.ccidBtnRef(el)}>
        {isApi ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={`other-buy-btn rc-btn rc-btn--sm rc-btn--two  items-center ${
                !ccidBtnDisplay && 'rc-btn-solid-disabled'
              }`}
              data-ccid="wtb-target"
              data-ean={barcode}
              onClick={() => {
                let gaFlag = this.state.gaFlag;
                gaFlag && onClick();
                this.setState({ gaFlag: !gaFlag });
              }}
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
            <div style={{ position: 'relative' }}>{this.confirmTooltip()}</div>
          </div>
        ) : null}
        {isUrl ? (
          <a
            href={goodsType === 3 ? vetUrl : sptUrl}
            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
            style={{ padding: '7px 1.5rem' }}
          >
            <FormattedMessage
              id={
                goodsType === 3
                  ? 'details.vetBuyFromRetailer'
                  : 'details.buyFromRetailer'
              }
            />
          </a>
        ) : null}
      </div>
    );
  }
}

export default BuyFromRetailerBtn;
