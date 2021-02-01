import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
@inject('loginStore', 'paymentStore')
@injectIntl
@observer
class AdyenCommonPay extends Component {
  static defaultProps = {
    billingJSX: null,
    updateEmail: () => {}
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
    const { billingJSX } = this.props;
    return (
      <div className="customer-form">
        <div className="address">
          <form className="address-form">
            <div className="address-line" id="addressLine2">
              <div
                className="address-input full-width"
                style={{ marginBottom: '18px' }}
              >
                <label className="address-label" htmlFor="street">
                  <FormattedMessage id="email" />
                  <span className="red">*</span>
                </label>
                <input
                  type="text"
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
