import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { inject } from 'mobx-react';

//cyber支付的保存卡checkbox
@inject('loginStore')
class CyberSaveCardCheckbox extends Component {
  static defaultProps = {
    isChecked: false
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  render() {
    const { isChecked } = this.props;
    return (
      <>
        <div className="rc-input rc-input--inline w-100 mw-100 mt-2">
          <input
            id="cyberSaveCard-default-checkbox"
            type="checkbox"
            className="rc-input__checkbox"
            onChange={() =>
              this.props.changeCyberPaymentFormIsSaveCard(isChecked)
            }
            checked={isChecked}
          />
          <label
            className="rc-input__label--inline text-break"
            htmlFor="cyberSaveCard-default-checkbox"
            style={{ marginBottom: 0 }}
          >
            <FormattedMessage id="cyber.form.saveFor" />
          </label>
        </div>
        {!isChecked && this.isLogin ? (
          <div
            className="text-danger-2"
            style={{ marginLeft: '35px', fontSize: '.75rem' }}
          >
            <FormattedMessage id="payment.errorInfo3" />
          </div>
        ) : null}
      </>
    );
  }
}
export default CyberSaveCardCheckbox;
