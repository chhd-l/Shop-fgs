import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import KlarnaIcon from '@/components/Adyen/klarna_icon';

@inject('loginStore', 'paymentStore')
@injectIntl
@observer
class AdyenCommonPay extends Component {
  static defaultProps = {
    billingJSX: null,
    updateEmail: () => {},
    showIcon: false
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      type: '',
      btnName: '',
      btnNameObj: {
        adyenKlarnaPayLater: 'Weiter mit KlarnaPayLater',
        adyenKlarnaPayNow: 'Weiter mit KlarnaPayNow',
        directEbanking: 'Weiter mit KlarnaSofort'
      }
    };
  }

  handleChange = (e) => {
    const val = e.target.value;
    this.setState(
      {
        text: val
      },
      () => {
        this.props.updateEmail(this.state.text);
      }
    );
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(
      {
        type: nextProps.type
      },
      () => {
        const btnName = this.state.btnNameObj[this.state.type];
        this.setState({ btnName });
      }
    );
  }
  render() {
    const { billingJSX, showIcon } = this.props;
    return (
      <div className="customer-form">
        <div className="address">
          <form className="address-form">
            <div className="address-line" id="addressLine2">
              {showIcon ? <KlarnaIcon /> : <></>}
              <div
                className="mt-2 address-input full-width"
                style={{ marginBottom: '1.125rem' }}
              >
                <label className="address-label" htmlFor="street">
                  <FormattedMessage id="email" />
                  <span className="red">*</span>
                </label>
                <input
                  type="text"
                  autocomplete="off"
                  className="form-control"
                  placeholder={`${this.props.intl.messages.mailAddress}*`}
                  name="street"
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </form>
          {billingJSX}
        </div>
      </div>
    );
  }
}

export default AdyenCommonPay;
