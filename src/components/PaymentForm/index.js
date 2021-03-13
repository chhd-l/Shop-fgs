import React from 'react'
import { FormattedMessage } from 'react-intl'
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
class PaymentForm extends React.Component {
  static defaultProps = {
    form: {
      cardholderName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: '',
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",//非必填
      country: "",
      state: "",
      city: "",
      zipCode: "",
      email: "",
      isSaveCard: true
    },
    monthList: [],
    yearList: [],
    countryList: [],
    stateList: []
  };

  render() {
    const { form } = this.props
    return (
      <div>
        {/* Name on Card */}
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group required">
              <label className="form-control-label">
                <FormattedMessage id="cyber.form.cardHolderName" />
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
              >
                <input
                  type="cardholderName"
                  className="rc-input__control"
                  id="cardNumber"
                  value={form.cardholderName}
                  onChange={this.props.handleInputChange}
                  onBlur={this.props.inputBlur}
                  name="cardholderName"
                  maxLength="254"
                />
                <label className="rc-input__label" htmlFor="cardholderName" />
              </span>
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
        </div>
        {/* Card Number */}
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group required">
              <label className="form-control-label">
                <FormattedMessage id="cyber.form.cardNumber" />
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
              >
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
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Expiration Month  */}
          <div className="col-sm-4">
            <div className="form-group required">
              <label className="form-control-label" htmlFor="month">
                <FormattedMessage id="cyber.form.EXPMonth" />
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
              <div className="invalid-feedback" style={{ display: 'none' }}>
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
          {/* Expiration Year */}
          <div className="col-sm-4">
            <div className="form-group required">
              <label
                className="form-control-label"
                htmlFor="year"
              >
                <FormattedMessage id="cyber.form.EXPYear" />
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
              <div className="invalid-feedback">
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
          {/* Security Code */}
          <div className="col-sm-4">
            <div className="form-group required">
              <label className="form-control-label" htmlFor="month">
                <FormattedMessage id="cyber.form.secureCode" />
              </label>
              <span
                className="rc-input rc-input--full-width"
                input-setup="true"
              >
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
              <div className="invalid-feedback" style={{ display: 'none' }}>
                <FormattedMessage id="payment.errorInfo2" />
              </div>
            </div>
          </div>
        </div>
        <div className="billingAddress">
          {/* firstName */}
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group required">
                <label className="form-control-label">
                  <FormattedMessage id="cyber.form.firstName" />
                </label>
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control"
                    id="firstName"
                    value={form.firstName}
                    onChange={this.props.handleInputChange}
                    onBlur={this.props.inputBlur}
                    name="firstName"
                    maxLength="254"
                  />
                  <label className="rc-input__label" htmlFor="firstName" />
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
          </div>
          {/* lastName */}
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group required">
                <label className="form-control-label">
                  <FormattedMessage id="cyber.form.lastName" />
                </label>
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control"
                    id="lastName"
                    value={form.lastName}
                    onChange={this.props.handleInputChange}
                    onBlur={this.props.inputBlur}
                    name="lastName"
                    maxLength="254"
                  />
                  <label className="rc-input__label" htmlFor="lastName" />
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
          </div>
          {/* address1 */}
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group required">
                <label className="form-control-label">
                  <FormattedMessage id="cyber.form.address1" />
                </label>
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control email"
                    id="address1"
                    value={form.address1}
                    onChange={this.props.handleInputChange}
                    onBlur={this.props.inputBlur}
                    name="address1"
                    maxLength="254"
                  />
                  <label className="rc-input__label" htmlFor="address1" />
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
          </div>
          {/* address2 */}
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="form-control-label">
                  <FormattedMessage id="cyber.form.address2" />
                </label>
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control"
                    id="address2"
                    value={form.address2}
                    onChange={this.props.handleInputChange}
                    onBlur={this.props.inputBlur}
                    name="address2"
                    maxLength="254"
                  />
                  <label className="rc-input__label" htmlFor="address2" />
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            {/* country*/}
            <div className="col-sm-6">
              <div className="form-group required">
                <label className="form-control-label" htmlFor="month">
                  <FormattedMessage id="cyber.form.country" />
                </label>
                <span
                  className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
                  data-loc="countrySelect"
                >
                  <Selection
                    key={form.country}
                    selectedItemChange={(data) =>
                      this.props.handleSelectedItemChange('country', data)
                    }
                    optionList={this.props.countryList}
                    selectedItemData={{
                      value: form.country
                    }}
                  />
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
            {/* state */}
            <div className="col-sm-6">
              <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_province">
                <label className="form-control-label" htmlFor="month">
                  <FormattedMessage id="cyber.form.state" />
                </label>
                <span
                  className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
                  data-loc="countrySelect"
                >
                  <Selection
                    selectedItemChange={(data) => {
                      if (data.value != '') {
                        this.props.handleSelectedItemChange('state', data)
                      }
                    }}
                    optionList={this.props.stateList}
                    selectedItemData={{ value: form.state }}
                    key={form.state}
                  />
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* city */}
            <div className="col-sm-6">
              <div className="form-group required">
                <label className="form-control-label">
                  <FormattedMessage id="cyber.form.city" />
                </label>
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <CitySearchSelection
                    placeholder={null}
                    defaultValue={form.city}
                    key={form.city}
                    freeText={true}
                    onChange={this.props.handleSelectedCityChange}
                  />
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
            {/* ZIP Code */}
            <div className="col-sm-6">
              <div className="form-group required">
                <label className="form-control-label">
                  <FormattedMessage id="cyber.form.zipCode" />
                </label>
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control"
                    id="zipCode"
                    value={form.zipCode}
                    onChange={this.props.handleInputChange}
                    onBlur={this.props.inputBlur}
                    name="zipCode"
                    maxLength="254"
                  />
                  <label className="rc-input__label" htmlFor="zipCode" />
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group required">
                <label className="form-control-label">
                  <FormattedMessage id="cyber.form.email" />
                </label>
                <span
                  className="rc-input rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control"
                    id="email"
                    value={form.email}
                    onChange={this.props.handleInputChange}
                    onBlur={this.props.inputBlur}
                    name="email"
                    maxLength="254"
                  />
                  <label className="rc-input__label" htmlFor="email" />
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage id="payment.errorInfo2" />
                </div>
              </div>
            </div>
          </div>
          {/* save card checkbox */}
          <div className="row">
            <div className="col-sm-6">
              <div className="rc-input rc-input--inline"
                onClick={(data) => this.props.handelCheckboxChange('isSaveCard')}>

                {form.isSaveCard ? (
                  <input
                    type="checkbox"
                    className="rc-input__checkbox"
                    value={form.isSaveCard}
                    key="1"
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    className="rc-input__checkbox"
                    value={form.isSaveCard}
                    key="2"
                  />
                )}
                <label className="rc-input__label--inline text-break">
                  <FormattedMessage id="cyber.form.saveFor" />
                </label>
                {/* <div className="red-text"><FormattedMessage id="cyber.form.theBox" /></div> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
export default PaymentForm
