import React from 'react';
import { FormattedMessage } from 'react-intl';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
class CyberBillingAddress extends React.Component {
  static defaultProps = {
    form: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '', //非必填
      country: '',
      state: '',
      city: '',
      zipCode: '',
      email: '',
      isSaveCard: true
    },
    countryList: [],
    stateList: [],
    errMsgObj: {
      firstName: '',
      lastName: '',
      address1: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      email: ''
    }
  };

  firstNameJSX = () => {
    const { form, errMsgObj } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id="cyber.form.firstName" />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
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
        {errMsgObj.firstName && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  lastNameJSX = () => {
    const { form, errMsgObj } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id="cyber.form.lastName" />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
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
        {errMsgObj.lastName && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  address1JSX = () => {
    const { form, errMsgObj } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id="cyber.form.address1" />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
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
        {errMsgObj.address1 && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  address2JSX = () => {
    const { form } = this.props;
    return (
      <div className="form-group">
        <label className="form-control-label">
          <FormattedMessage id="cyber.form.address2" />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
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
    );
  };

  countryJSX = () => {
    const { form, errMsgObj } = this.props;
    return (
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
        {errMsgObj.country && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  stateJSX = () => {
    const { form, errMsgObj } = this.props;
    return (
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
                this.props.handleSelectedItemChange('state', data);
              }
            }}
            choicesInput={true}
            emptyFirstItem="State"
            optionList={this.props.stateList}
            selectedItemData={{ value: form.state }}
            key={form.state}
          />
        </span>
        {errMsgObj.state && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  cityJSX = () => {
    const { form, errMsgObj } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id="cyber.form.city" />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
          <CitySearchSelection
            placeholder={false}
            defaultValue={form.city}
            key={form.city}
            freeText={true}
            onChange={this.props.handleSelectedCityChange}
          />
        </span>
        {errMsgObj.city && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  zipCodeJSX = () => {
    const { form, errMsgObj } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id="cyber.form.zipCode" />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
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
        {errMsgObj.zipCode && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  emailJSX = () => {
    const { form, errMsgObj } = this.props;
    return (
      <div className="form-group required">
        <label className="form-control-label">
          <FormattedMessage id="cyber.form.email" />
        </label>
        <span className="rc-input rc-input--full-width" input-setup="true">
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
        {errMsgObj.email && (
          <div className="text-danger-2">
            <FormattedMessage id="payment.errorInfo2" />
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="billingAddress">
        {/* firstName */}
        <div className="row">
          <div className="col-sm-12">{this.firstNameJSX()}</div>
        </div>
        {/* lastName */}
        <div className="row">
          <div className="col-sm-12">{this.lastNameJSX()}</div>
        </div>
        {/* address1 */}
        <div className="row">
          <div className="col-sm-12">{this.address1JSX()}</div>
        </div>
        {/* address2 */}
        <div className="row">
          <div className="col-sm-12">{this.address2JSX()}</div>
        </div>
        <div className="row">
          {/* country*/}
          <div className="col-sm-6">{this.countryJSX()}</div>
          {/* state */}
          <div className="col-sm-6">{this.stateJSX()}</div>
        </div>
        <div className="row">
          {/* city */}
          <div className="col-sm-6">{this.cityJSX()}</div>
          {/* ZIP Code */}
          <div className="col-sm-6">{this.zipCodeJSX()}</div>
        </div>
        {/* Email */}
        <div className="row">
          <div className="col-sm-12">{this.emailJSX()}</div>
        </div>
      </div>
    );
  }
}
export default CyberBillingAddress;
