import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Selection from '@/components/Selection';
import {
  usGuestPaymentInfo,
  usPaymentInfo,
  usPayCardSubscription,
  usGuestPayCardSubscription
} from '@/api/payment';

const monthList = [
  { name: 'month', value: '' },
  { name: '01', value: 1 },
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
  { name: '11', value: 11 },
  { name: '12', value: 12 }
];
// Array.from({ length: 12 }).map((item, i) => {
//   return {
//     label: <FormattedMessage id="xMonths" values={{ val: i }} />,
//     key: i.toString(),
//     value: i
//   };
// }),

const yearList = [
  { name: 'year', value: '' },
  { name: '2021', value: 2021 },
  { name: '2022', value: 2022 },
  { name: '2023', value: 2023 },
  { name: '2024', value: 2024 },
  { name: '2025', value: 2025 },
  { name: '2026', value: 2026 },
  { name: '2027', value: 2027 },
  { name: '2028', value: 2028 },
  { name: '2029', value: 2029 },
  { name: '2030', value: 2030 }
];

@inject('paymentStore')
@observer
class CyberPaymentForm extends React.Component {
  static defaultProps = {
    cyberFormTitle: {
      cardHolderName: 'cyber.form.cardHolderName',
      cardNumber: 'cyber.form.cardNumber',
      EXPMonth: 'cyber.form.EXPMonth',
      EXPYear: 'cyber.form.EXPYear',
      secureCode: 'cyber.form.secureCode'
    },
    CyberSaveCardCheckboxJSX: null,
    billingJSX: null,
    securityCodeTipsJSX: null,
    backToSavedPaymentsJSX: null,
    form: {
      cardholderName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: ''
    },
    errMsgObj: {
      cardholderName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: ''
    }
  };
  //游客绑卡
  usGuestPaymentInfoEvent = async (params) => {
    try {
      const res = await usGuestPaymentInfo(params);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  //会员绑卡
  usPaymentInfoEvent = async (params) => {
    try {
      const newCardNumber = params?.cardNumber?.replace(/\s*/g, '') || '';
      const newParams = Object.assign({}, params, {
        cardNumber: newCardNumber?.replace(/\d(?=\d{4})/g, 'X')
      });
      const res = await usPaymentInfo(newParams);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  //查询卡类型-会员
  queryCyberCardTypeEvent = async (params) => {
    try {
      const res = await usPayCardSubscription(params);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // //查询卡类型-游客
  queryGuestCyberCardTypeEvent = async (params) => {
    try {
      const res = await usGuestPayCardSubscription(params);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  nameOnCardJSX = () => {
    const { form, errMsgObj, cyberFormTitle } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id={cyberFormTitle.cardHolderName} />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
          <input
            type="cardholderName"
            className="rc-input__control"
            id="cardNumberJSX"
            value={form.cardholderName}
            onChange={this.props.handleInputChange}
            onBlur={this.props.inputBlur}
            name="cardholderName"
            maxLength="254"
          />
          <label className="rc-input__label" htmlFor="cardholderName" />
        </span>
        {errMsgObj.cardholderName && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  cardNumberJSX = () => {
    const {
      form,
      errMsgObj,
      cyberFormTitle,
      paymentStore: { currentCardTypeInfo }
      //currentCardTypeInfo.cardTypeValue ==>001
    } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id={cyberFormTitle.cardNumber} />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
          <input
            type="cardNumber"
            className="rc-input__control"
            id="cardNumber"
            value={form.cardNumber}
            onChange={this.props.handleInputChange}
            onBlur={this.props.inputBlur}
            name="cardNumber"
            //maxLength={currentCardTypeInfo?.cardLength || 19}
            maxLength={19}
            placeholder=""
          />
          <label className="rc-input__label" htmlFor="cardNumber" />
        </span>
        {errMsgObj.cardNumber && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  expirationMonthJSX = () => {
    const { form, errMsgObj, cyberFormTitle } = this.props;
    return (
      <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_province">
        <label className="form-control-label" htmlFor="month">
          <FormattedMessage id={cyberFormTitle.EXPMonth} />
        </label>
        <span
          className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
          data-loc="countrySelect"
        >
          <Selection
            key={form.expirationMonth}
            selectedItemChange={(data) =>
              this.props.handleSelectedItemChange('expirationMonth', data)
            }
            optionList={monthList}
            selectedItemData={{
              value: form.expirationMonth
            }}
          />
        </span>
        {errMsgObj.expirationMonth && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  expirationYearJSX = () => {
    const { form, errMsgObj, cyberFormTitle } = this.props;
    return (
      <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_province">
        <label className="form-control-label" htmlFor="year">
          <FormattedMessage id={cyberFormTitle.EXPYear} />
        </label>
        <span
          className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
          data-loc="countrySelect"
        >
          <Selection
            key={form.expirationYear}
            selectedItemChange={(data) =>
              this.props.handleSelectedItemChange('expirationYear', data)
            }
            optionList={yearList}
            selectedItemData={{
              value: form.expirationYear
            }}
          />
        </span>
        {errMsgObj.expirationYear && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  securityCodeJSX = () => {
    const {
      form,
      errMsgObj,
      cyberFormTitle,
      securityCodeTipsJSX,
      paymentStore: { currentCardTypeInfo }
    } = this.props;
    return (
      <>
        <div className="form-group required">
          <label className="form-control-label" htmlFor="month">
            <FormattedMessage id="cyber.form.secureCode" />
          </label>
          <span className="rc-input rc-input--full-width" input-setup="true">
            <input
              type="securityCode"
              className="rc-input__control"
              id="securityCode"
              value={form.securityCode}
              onChange={this.props.handleInputChange}
              onBlur={this.props.inputBlur}
              name="securityCode"
              //maxLength={currentCardTypeInfo?.cvvLength || 3}
              maxLength={4}
            />
            <label className="rc-input__label" htmlFor="securityCode" />
          </span>
          {errMsgObj.securityCode && (
            <div className="text-danger-2">
              <FormattedMessage id="payment.errorInfo2" />
            </div>
          )}
          {securityCodeTipsJSX}
        </div>
      </>
    );
  };

  render() {
    const { CyberSaveCardCheckboxJSX, billingJSX, backToSavedPaymentsJSX } =
      this.props;
    return (
      <div>
        {/* Name on Card */}
        <div className="row">
          <div className="col-sm-12">{this.nameOnCardJSX()}</div>
        </div>
        {/* Card Number */}
        <div className="row">
          <div className="col-sm-12">{this.cardNumberJSX()}</div>
        </div>

        <div className="row">
          {/* Expiration Month  */}
          <div className="col-sm-4">{this.expirationMonthJSX()}</div>
          {/* Expiration Year */}
          <div className="col-sm-4">{this.expirationYearJSX()}</div>
          {/* Security Code */}
          <div className="col-sm-4">{this.securityCodeJSX()}</div>
        </div>
        {backToSavedPaymentsJSX}
        {CyberSaveCardCheckboxJSX}
        {billingJSX}
      </div>
    );
  }
}
export default CyberPaymentForm;
