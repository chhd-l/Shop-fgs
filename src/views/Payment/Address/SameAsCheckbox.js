import React from 'react';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@observer
class SameAsCheckbox extends React.Component {
  static defaultProps = { type: '' };
  constructor(props) {
    super(props);
    this.state = {
      billingChecked: true,
      toolTipVisible: false
    };
  }
  componentDidMount() {
    let deliveryInfo = localItemRoyal.get('deliveryInfo');
    let tmp = this.state.billingChecked;
    if (!this.isLogin && deliveryInfo) {
      tmp = deliveryInfo.billingChecked;
    }
    this.setState(
      {
        billingChecked: tmp
      },
      () => {
        this.props.updateSameAsCheckBoxVal(this.state.billingChecked);
      }
    );
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  billingCheckedChange = () => {
    this.setState(
      (curState) => ({ billingChecked: !curState.billingChecked }),
      () => {
        this.props.updateSameAsCheckBoxVal(this.state.billingChecked);
      }
    );
  };
  render() {
    const { type } = this.props;
    return (
      <div className="billingCheckbox rc-margin-top--xs fit-mobile-billingCheckbox d-flex flex-wrap">
        <div>
          <input
            className="form-check-input"
            id={`id-checkbox-billing-${type}`}
            type="checkbox"
            onChange={this.billingCheckedChange}
            checked={this.state.billingChecked}
            style={{ width: '17px', height: '17px' }}
          />
          <label
            className="rc-input__label--inline"
            htmlFor={`id-checkbox-billing-${type}`}
          >
            <FormattedMessage id="biliingAddressSameAs" />
          </label>
        </div>
        <div className="normalDelivery fit-mobile-normalDelivery">
          <span>
            <FormattedMessage id="payment.normalDelivery2" />
          </span>
          <span className="text-muted arrival-time">
            <FormattedMessage id="payment.normalDelivery3" />
          </span>

          <span className="shipping-method-pricing ml3">
            <span
              className="info delivery-method-tooltip fit-mobile-icon-left"
              style={{ verticalAlign: 'unset' }}
              onMouseEnter={() => {
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
            <ConfirmTooltip
              containerStyle={{
                transform: 'translate(-65%, 112%)'
              }}
              arrowStyle={{ left: '92%' }}
              display={this.state.toolTipVisible}
              cancelBtnVisible={false}
              confirmBtnVisible={false}
              updateChildDisplay={(status) =>
                this.setState({
                  toolTipVisible: status
                })
              }
              content={<FormattedMessage id="payment.forFreeTip" />}
            />
          </span>
        </div>
      </div>
    );
  }
}
export default SameAsCheckbox;
