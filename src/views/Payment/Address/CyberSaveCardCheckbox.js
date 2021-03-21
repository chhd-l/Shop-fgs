import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

//cyber支付的保存卡checkbox
class CyberSaveCardCheckbox extends Component {
  static defaultProps = {
    isChecked: false
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isChecked } = this.props;
    return (
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
        >
          <FormattedMessage id="cyberIsSaveCard" />
        </label>
      </div>
    );
  }
}
export default CyberSaveCardCheckbox;
