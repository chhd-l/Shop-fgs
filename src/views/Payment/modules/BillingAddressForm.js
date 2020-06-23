import React from 'react'
import { FormattedMessage } from "react-intl"
import { findIndex } from "lodash"
import Selection from '@/components/Selection'
import { getDictionary } from '@/utils/utils'

export default class BillingAddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      billingAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: 'Mexico',
        city: '',
        postCode: '',
        phoneNumber: ''
      },
      cityList: [],
      countryList: []
    }
  }
  componentDidMount () {
    getDictionary({ type: 'city' })
      .then(res => {
        this.setState({
          cityList: res
        })
      })
    getDictionary({ type: 'country' })
      .then(res => {
        this.setState({
          countryList: res
        })
      })
  }
  computedList (key) {
    let tmp = this.state[`${key}List`].map(c => {
      return {
        value: c.id.toString(),
        name: c.name
      }
    })
    tmp.unshift({ value: '', name: '' })
    return tmp
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.state.billingAddress) {
      this.setState({
        billingAddress: Object.assign({}, nextProps.data)
      })
    }
  }
  deliveryInputChange (e) {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { deliveryAddress } = this.state;
    if (name === 'postCode') {
      value = value.replace(/\s+/g,"")
    }
    deliveryAddress[name] = value;
    this.inputBlur(e);
    this.setState({ deliveryAddress: deliveryAddress }, () => {
      this.props.updateData(this.state.deliveryAddress)
    });
  }
  inputBlur (e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === "invalid-feedback";
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? "none" : "block";
    }
  }
  billingInputChange (e) {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { billingAddress } = this.state;
    if (name === 'postCode') {
      value = value.replace(/\s+/g,"")
    }
    billingAddress[name] = value;
    this.inputBlur(e);
    this.setState({ billingAddress: billingAddress }, () => {
      this.props.updateData(this.state.billingAddress)
    });
  }
  handleSelectedItemChange (key, data) {
    const { billingAddress } = this.state
    billingAddress[key] = data.value
    this.setState({ billingAddress: billingAddress }, () => {
      this.props.updateData(this.state.billingAddress)
    })
  }
  render () {
    const { billingAddress } = this.state;
    return (
      <div
        className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm"
        style={{
          display: this.props.billingChecked ? "none" : "block",
        }}
      >
        <fieldset className="shipping-address-block rc-fieldset">
          <div className="rc-layout-container">
            <div className="rc-column rc-padding-y--none">
              <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
                <label
                  className="form-control-label"
                  htmlFor="shippingFirstName"
                >
                  <FormattedMessage id="payment.firstName" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control shippingFirstName"
                    id="shippingFirstName"
                    type="text"
                    value={billingAddress.firstName}
                    onChange={(e) => this.billingInputChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                    name="firstName"
                    maxLength="50"
                  />
                  <label
                    className="rc-input__label"
                    htmlFor="id-text1"
                  ></label>
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: (
                        <FormattedMessage id="payment.firstName" />
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rc-layout-container">
            <div className="rc-column rc-padding-y--none">
              <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
                <label
                  className="form-control-label"
                  htmlFor="shippingLastName"
                >
                  <FormattedMessage id="payment.lastName" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control shippingLastName"
                    id="shippingLastName"
                    type="text"
                    value={billingAddress.lastName}
                    onChange={(e) => this.billingInputChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                    name="lastName"
                    maxLength="50"
                  />
                  <label
                    className="rc-input__label"
                    htmlFor="id-text1"
                  ></label>
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: (
                        <FormattedMessage id="payment.lastName" />
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rc-layout-container">
            <div className="rc-column rc-padding-y--none">
              <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
                <label
                  className="form-control-label"
                  htmlFor="shippingLastName"
                >
                  <FormattedMessage id="payment.address1" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control shippingLastName"
                    id="shippingLastName"
                    type="text"
                    value={billingAddress.address1}
                    onChange={(e) => this.billingInputChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                    name="address1"
                    maxLength="50"
                  />
                  <label
                    className="rc-input__label"
                    htmlFor="id-text1"
                  ></label>
                </span>
                <div className="invalid-feedback">
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: (
                        <FormattedMessage id="payment.address1" />
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rc-layout-container">
            <div className="rc-column rc-padding-y--none">
              <div className="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
                <label
                  className="form-control-label"
                  htmlFor="shippingLastName"
                >
                  <FormattedMessage id="payment.address2" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control shippingLastName"
                    id="shippingLastName"
                    type="text"
                    value={billingAddress.address2}
                    onChange={(e) => this.billingInputChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                    name="address2"
                    maxLength="50"
                  />
                  <label
                    className="rc-input__label"
                    htmlFor="id-text1"
                  ></label>
                </span>
              </div>
            </div>
          </div>
          <div className="rc-layout-container">
            <div className="rc-column rc-padding-y--none">
              <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_country">
                <label
                  className="form-control-label"
                  htmlFor="shippingCountry"
                >
                  <FormattedMessage id="payment.country" />
                </label>
                <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                  <Selection
                    selectedItemChange={data => this.handleSelectedItemChange('country', data)}
                    optionList={this.computedList('country')}
                    selectedItemData={{
                      value: this.state.billingAddress.country
                    }} />
                </span>
              </div>
            </div>
          </div>
          <div className="rc-layout-container">
            <div className="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_city">
              <label
                className="form-control-label"
                htmlFor="shippingAddressCity"
              >
                <FormattedMessage id="payment.city" />
              </label>
              <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                <Selection
                  selectedItemChange={data => this.handleSelectedItemChange('city', data)}
                  optionList={this.computedList('city')}
                  selectedItemData={{
                    value: this.state.billingAddress.city
                  }} />
              </span>
            </div>
          </div>
          <div className="rc-layout-container">
            <div className="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_postalCode">
              <label
                className="form-control-label"
                htmlFor="shippingZipCode"
              >
                <FormattedMessage id="payment.postCode" />
              </label>
              <span
                className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                input-setup="true"
                data-js-validate=""
                data-js-warning-message="*Post Code isn’t valid"
              >
                <input
                  className="rc-input__control shippingZipCode"
                  id="shippingZipCode"
                  type="tel"
                  value={billingAddress.postCode}
                  onChange={(e) => this.billingInputChange(e)}
                  onBlur={(e) => this.inputBlur(e)}
                  name="postCode"
                  maxLength="6"
                  minLength="6"
                  data-js-pattern="(^\d{6}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                />
                <label
                  className="rc-input__label"
                  htmlFor="id-text1"
                ></label>
              </span>
              <div className="invalid-feedback">
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: (
                      <FormattedMessage id="payment.postCode" />
                    ),
                  }}
                />
              </div>
              <div className="ui-lighter">
                <FormattedMessage id="example" />: 123456
            </div>
            </div>
            <div className="form-group rc-column rc-padding-y--none required dwfrm_shipping_shippingAddress_addressFields_phone">
              <label
                className="form-control-label"
                htmlFor="shippingPhoneNumber"
              >
                <FormattedMessage id="payment.phoneNumber" />
              </label>
              <span
                className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
                input-setup="true"
                data-js-validate=""
                data-js-warning-message="*Phone Number isn’t valid"
              >
                <input
                  type="number"
                  className="rc-input__control input__phoneField shippingPhoneNumber"
                  id="shippingPhoneNumber"
                  value={billingAddress.phoneNumber}
                  onChange={(e) => this.billingInputChange(e)}
                  onBlur={(e) => this.inputBlur(e)}
                  name="phoneNumber"
                  // data-js-pattern="(^(\+?7|8)?9\d{9}$)"
                  // data-js-pattern="(^(\+52)\d{8}$)"
                  // data-js-pattern="(^\d{10}$)"
                  maxLength="20"
                  minLength="18"
                />
                {/* <input
                className="rc-input__control input__phoneField shippingPhoneNumber"
                type="tel"
                value={billingAddress.phoneNumber}
                onChange={(e) => this.billingInputChange(e)}
                onBlur={(e) => this.inputBlur(e)}
                onClick={(e) => this.phoneNumberClick(e)}
                data-js-pattern="(^(\+52)\d{8}$)"
                name="phoneNumber"
                maxlength="17"
                minLength="16"
              ></input> */}
                <label
                  className="rc-input__label"
                  htmlFor="shippingPhoneNumber"
                ></label>
              </span>
              <div className="invalid-feedback">
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: (
                      <FormattedMessage id="payment.phoneNumber" />
                    ),
                  }}
                />
              </div>
              <span className="ui-lighter">
                <FormattedMessage id="example" />: +(52) 559 801 65
            </span>
            </div>
          </div>
          <div className="rc-layout-container">
            <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down">
              <div className="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
                <label
                  className="form-control-label"
                  htmlFor="shippingLastName"
                >
                  <FormattedMessage id="payment.rfc" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    className="rc-input__control shippingLastName"
                    type="text"
                    value={billingAddress.rfc}
                    onChange={(e) => this.billingInputChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                    name="rfc"
                    maxLength="50"
                  />
                  <label
                    className="rc-input__label"
                  ></label>
                </span>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    )
  }
}
