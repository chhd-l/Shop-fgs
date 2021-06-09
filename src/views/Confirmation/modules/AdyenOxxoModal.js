import React, { Component } from 'react';
import './OxxoModal.css';
import { FormattedMessage } from 'react-intl';
import { loadJS } from '@/utils/utils';

export default class AdyenOxxoModal extends Component {
  static defaultProps = {
    visible: true
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  close = () => {
    this.props.close();
  };
  presentVoucher(action) {
    loadJS({
      url:
        'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          const AdyenCheckout = window.AdyenCheckout;
          const checkout = new AdyenCheckout({
            environment: process.env.REACT_APP_Adyen_ENV,
            originKey: process.env.REACT_APP_AdyenOriginKEY,
            locale: process.env.REACT_APP_Adyen_locale
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
            id="oxxoModal"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="modal-content mt-0">
              <div
                id="mainBody"
                style={{
                  maxHeight: '80vh',
                  minHeight: '80vh',
                  overflowY: 'auto'
                }}
              >
                <div id="oxxo-container" style={{ padding: '10px' }}></div>
              </div>
              <div className="modal-footer" style={{ borderTop: 'none' }}>
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
