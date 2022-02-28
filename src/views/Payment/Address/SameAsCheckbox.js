import React from 'react';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@observer
class SameAsCheckbox extends React.Component {
  static defaultProps = { type: '', initVal: false };
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  constructor(props) {
    super(props);
    this.state = {
      billingChecked: this.props.initVal,
      paypalDetailsChecked: true,
      paypalMethodDefaultChecked: true,
      toolTipVisible: false
    };
    this.updateoolTipVisible = this.updateoolTipVisible.bind(this);
  }
  billingCheckedChange = () => {
    this.setState(
      (curState) => ({ billingChecked: !curState.billingChecked }),
      () => {
        this.props.updateSameAsCheckBoxVal(this.state.billingChecked);
      }
    );
  };
  paypalDetailsChange = () => {
    this.setState(
      {
        paypalDetailsChecked: !this.state.paypalDetailsChecked
      },
      () => {
        this.props.updatePaypalDetailsToAccount(
          this.state.paypalDetailsChecked
        );
      }
    );
  };
  paypalMethodDefaultChange = () => {
    this.setState(
      {
        paypalMethodDefaultChecked: !this.state.paypalMethodDefaultChecked
      },
      () => {
        this.props.updatePaypalMethodDefault(this.paypalMethodDefaultChecked);
      }
    );
  };
  updateoolTipVisible(status) {
    this.setState({
      toolTipVisible: status
    });
  }
  render() {
    const { type } = this.props;
    const { isLogin } = this;
    const country = window.__.env.REACT_APP_COUNTRY;
    return (
      <div className="rc-margin-top--xs fit-mobile-billingCheckbox d-flex flex-wrap justify-content-between">
        {country === 'fr' && type == 'adyen_paypal' && isLogin ? (
          <>
            <div className="rc-input rc-input--inline mw-100">
              <input
                className="rc-input__checkbox"
                id={`id-checkbox-paypal_details-${type}`}
                type="checkbox"
                onChange={this.paypalDetailsChange}
                checked={this.state.paypalDetailsChecked}
              />
              <label
                className="rc-input__label--inline"
                htmlFor={`id-checkbox-paypal_details-${type}`}
              >
                <FormattedMessage id="paypalDetailsLabel" />
              </label>
            </div>
            <div className="rc-input rc-input--inline mw-100">
              <input
                className="rc-input__checkbox"
                id={`id-checkbox-paypal_method_default-${type}`}
                type="checkbox"
                onChange={this.paypalMethodDefaultChange}
                checked={this.state.paypalMethodDefaultChecked}
              />
              <label
                className="rc-input__label--inline"
                htmlFor={`id-checkbox-paypal_method_default-${type}`}
              >
                <FormattedMessage id="paypalMethodDefaultLabel" />
              </label>
            </div>
          </>
        ) : null}

        <div className="rc-input rc-input--inline mw-100">
          <input
            className="rc-input__checkbox"
            id={`id-checkbox-billing-${type}`}
            onChange={this.billingCheckedChange}
            type="checkbox"
            checked={this.state.billingChecked}
          />
          <label
            className="rc-input__label--inline text-break"
            htmlFor={`id-checkbox-billing-${type}`}
          >
            <FormattedMessage id="biliingAddressSameAs" />
          </label>
        </div>
        {window.__.env.REACT_APP_COUNTRY == 'us' ? null : (
          <div className="normalDelivery fit-mobile-normalDelivery">
            <span>
              <FormattedMessage id="payment.normalDelivery2" />
            </span>
            <span className="text-muted arrival-time">
              <FormattedMessage id="payment.normalDelivery3" />
            </span>
            {['fr', 'se'].indexOf(window.__.env.REACT_APP_COUNTRY) >
            -1 ? null : (
              <span className="shipping-method-pricing ml3">
                <span
                  className="info delivery-method-tooltip fit-mobile-icon-left"
                  style={{ verticalAlign: 'unset' }}
                  onMouseEnter={this.updateoolTipVisible.bind(this, true)}
                  onMouseLeave={this.updateoolTipVisible.bind(this, false)}
                >
                  i
                </span>
                <ConfirmTooltip
                  containerStyle={{
                    transform: 'translate(-62%, 117%)'
                  }}
                  arrowStyle={{ left: '92%' }}
                  display={this.state.toolTipVisible}
                  cancelBtnVisible={false}
                  confirmBtnVisible={false}
                  updateChildDisplay={this.updateoolTipVisible.bind(this)}
                  content={<FormattedMessage id="payment.forFreeTip" />}
                />
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default SameAsCheckbox;
