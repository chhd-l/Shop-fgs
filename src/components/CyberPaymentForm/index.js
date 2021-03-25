import React from 'react';
import { FormattedMessage } from 'react-intl';
import Selection from '@/components/Selection';
import { usPaymentInfo } from '@/api/payment';
import { usGuestPaymentInfo } from '@/api/payment';
import resolve from 'resolve';

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
    monthList: [],
    yearList: [],
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
      const res = await usPaymentInfo(params);
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
    const { form, errMsgObj, cyberFormTitle } = this.props;
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
            maxLength="254"
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
            optionList={this.props.monthList}
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
            optionList={this.props.yearList}
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
    const { form, errMsgObj, cyberFormTitle, securityCodeTipsJSX } = this.props;
    return (
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
            maxLength="254"
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
    );
  };

  render() {
    const {
      CyberSaveCardCheckboxJSX,
      billingJSX,
      backToSavedPaymentsJSX
    } = this.props;
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
