import React from 'react';
import CyberPaymentForm from '@/components/CyberPaymentForm';
import CyberCardList from './list';
import { inject, observer } from 'mobx-react';

@inject(
  'loginStore',
  'checkoutStore',
  'clinicStore',
  'frequencyStore',
  'configStore',
  'paymentStore'
)
@observer
class CyberPayment extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      isShowCardList: true
    };
  }
  render() {
    const { isShowCardList } = this.state;
    const {
      paymentStore: { supportPaymentMethods }
    } = this.props;
    console.log(supportPaymentMethods);
    debugger;
    return (
      <>
        {isShowCardList && (
          <>
            {/* 1.cyber卡类型 */}
            {supportPaymentMethods.length > 1 &&
              supportPaymentMethods.map((item, i) => (
                <div className={`rc-input rc-input--inline`} key={i}>
                  <input
                    className="rc-input__radio"
                    id={`payment-info-${item.id}`}
                    value={item.cardType}
                    type="radio"
                    name="payment-info"
                    onChange={this.handleCardTypeChange}
                    checked={cardTypeVal === item.cardType}
                  />
                  <label
                    className="rc-input__label--inline"
                    htmlFor={`payment-info-${item.id}`}
                  >
                    <img
                      src={item.imgUrl}
                      title={item.cardType}
                      style={{ width: '40px' }}
                      alt="card type image"
                    />
                  </label>
                </div>
              ))}
            {/* 2.cyber form */}
            <CyberPaymentForm
              cardTypeVal={this.state.cardTypeVal}
              cyberFormTitle={cyberFormTitle}
              ref={this.cyberCardRef}
              form={this.state.cyberPaymentForm}
              errMsgObj={this.state.cyberErrMsgObj}
              handleInputChange={this.handleCyberInputChange}
              handleSelectedItemChange={this.handleCyberSelectedItemChange}
              inputBlur={this.inputBlur}
              CyberSaveCardCheckboxJSX={this.CyberSaveCardCheckboxJSX()}
              billingJSX={this.renderBillingJSX({
                type: paymentTypeVal
              })}
              securityCodeTipsJSX={this.renderSecurityCodeTipsJSX()}
              backToSavedPaymentsJSX={this.renderBackToSavedPaymentsJSX()}
              showErrorMsg={this.showErrorMsg}
            />
            {payConfirmBtn({
              disabled: validForCyberPayment() || validForBilling,
              loading: saveBillingLoading
            })}
          </>
        )}
        {!isShowCardList && <div>456</div>}
      </>
    );
  }
}

export default CyberPayment;
