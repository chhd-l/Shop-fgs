import React, { Component } from 'react';
import './AdyenOxxoModal.css';
import { FormattedMessage } from 'react-intl-phraseapp';
import { loadJS } from '@/utils/utils';
import getPaymentConf from '@/lib/get-payment-conf';

export default class AdyenOxxoModal extends Component {
  static defaultProps = {
    visible: true,
    pspItemCode: ''
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  close = () => {
    this.props.close();
  };
  async presentVoucher(action) {
    const tmpConfArr = await getPaymentConf();
    const adyenOriginKeyConf = tmpConfArr.filter(
      (t) => t.pspItemCode === this.props.pspItemCode
    )[0];
    loadJS({
      url: 'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          const AdyenCheckout = window.AdyenCheckout;
          const checkout = new AdyenCheckout({
            environment: adyenOriginKeyConf?.environment,
            originKey: adyenOriginKeyConf?.openPlatformSecret,
            locale: adyenOriginKeyConf?.locale || 'en-US',
            shopperLocale: adyenOriginKeyConf?.locale || 'en-US'
          });

          //Present the voucher
          checkout.createFromAction(action).mount('#oxxo-container');
        }
      }
    });
  }
  componentDidMount() {
    if (this.props.action && Object.keys(this.props.action).length > 0) {
      this.presentVoucher(this.props.action);
    }
  }
  render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        {visible ? (
          <div
            className={`rc-shade `}
            style={{ backgroundColor: 'rgba(51,51,51,.5)' }}
          />
        ) : null}
        <div
          className={`modal fade ${visible ? 'show' : ''}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: visible ? 'block' : 'none', overflow: 'hidden' }}
          aria-hidden="true"
        >
          <div
            className="modal-dialog mt-0 mb-0"
            role="document"
            id="adyenOxxoModal"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="modal-content mt-0">
              <div
                id="mainBody"
                style={{
                  position: 'absolute!important',
                  maxHeight: '80vh',
                  minHeight: '80vh',
                  overflowY: 'auto',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                  left: '50%',
                  width: '100%'
                }}
              >
                <div id="oxxo-container" style={{ padding: '10px' }}></div>
              </div>
              <div className="modal-footer" style={{ borderTop: 'none' }}>
                <a
                  href="https://www.oxxo.cl/ubicaciones"
                  target="blank"
                  style={{ marginRight: '35px' }}
                >
                  <FormattedMessage id="visitStoreMap" />
                </a>
                <span onClick={this.close} style={{ cursor: 'pointer' }}>
                  <FormattedMessage id="close" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
