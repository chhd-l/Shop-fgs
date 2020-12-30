import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { EMAIL_REGEXP } from '@/utils/constant';
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
      },
      isValid: false,
      isEdit: true
    };
  }
  //是否填写邮箱正确
  isTestMail() {
    if (!EMAIL_REGEXP.test(this.state.text)) {
      throw new Error(emailRule.errMsg);
    }
  }

  handleChange = (e) => {
    const val = e.target.value;
    this.setState(
      {
        text: val
      },
      () => {
        this.props.updateEmail(this.state.text);
        try {
          this.isTestMail();
          this.setState({ isValid: true });
        } catch (err) {
          this.setState({ isValid: false });
        }
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
    const { isEdit } = this.state;
    return (
      <>
        <div className="customer-form">
          <div className="address">
            {isEdit ? (
              <>
                <form className="address-form">
                  <div className="address-line" id="addressLine2">
                    <div
                      className="address-input full-width"
                      id="street"
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
              </>
            ) : (
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <label className="address-label">
                    <FormattedMessage id="email" />
                    <span className="red">*</span>
                  </label>
                  <br />
                  {this.state.text}
                </div>
                <span
                  className="rc-styled-link"
                  onClick={(e) => {
                    this.setState({ isEdit: true });
                  }}
                >
                  <FormattedMessage id="edit" />
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default AdyenCommonPay;
