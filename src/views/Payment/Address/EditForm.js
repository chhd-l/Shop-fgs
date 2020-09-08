import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { find, findIndex } from 'lodash';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
import { getDictionary } from '@/utils/utils';
import { ADDRESS_RULE } from '@/utils/constant';

const localItemRoyal = window.__.localItemRoyal;

/**
 * add/edit address form - member/visitor
 */
@inject('paymentStore', 'loginStore')
@observer
class EditForm extends React.Component {
  static defaultProps = {
    type: 'billing'
  };
  constructor(props) {
    super(props);
    this.state = {
      address: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        city: '',
        cityName: '',
        postCode: '',
        phoneNumber: ''
      },
      countryList: []
    };
  }
  componentDidMount() {
    const { address } = this.state;
    if (!this.isLogin) {
      let deliveryInfo = localItemRoyal.get('deliveryInfo');
      const tmpKey =
        this.props.type === 'delivery' ? 'deliveryAddress' : 'billingAddress';
      if (deliveryInfo) {
        this.setState(
          {
            address: Object.assign(deliveryInfo[tmpKey], {
              country: process.env.REACT_APP_DEFAULT_COUNTRYID
            })
          },
          () => {
            this.props.updateData(this.state.address);
            this.props.paymentStore.updateSelectedDeliveryAddress(
              this.state.address
            );
          }
        );
      } else {
        address.country = process.env.REACT_APP_DEFAULT_COUNTRYID;
        this.setState({
          address: address
        });
      }
    }
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  computedList(key) {
    let tmp = this.state[`${key}List`].map((c) => {
      return {
        value: c.id.toString(),
        name: c.name
      };
    });
    tmp.unshift({ value: '', name: '' });
    return tmp;
  }
  deliveryInputChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'postCode') {
      value = value.replace(/\s+/g, '');
    }
    const { address } = this.state;
    address[name] = value;
    this.inputBlur(e);
    this.setState({ address: address }, () => {
      this.props.paymentStore.updateSelectedDeliveryAddress(
        this.state.address
      );
      this.props.updateData(this.state.address);
    });
  }
  inputBlur(e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === 'invalid-feedback';
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? 'none' : 'block';
    }
  }
  handleSelectedItemChange(key, data) {
    const { address } = this.state;
    address[key] = data.value;
    this.setState({ address: address }, () => {
      this.props.paymentStore.updateSelectedDeliveryAddress(
        this.state.address
      );
      this.props.updateData(this.state.address);
    });
  }
  handleCityInputChange = (data) => {
    const { address } = this.state;
    address.city = data.id;
    address.cityName = data.cityName;
    this.setState({ address: address }, () => {
      this.props.paymentStore.updateSelectedDeliveryAddress(
        this.state.address
      );
      this.props.updateData(this.state.address);
    });
  };
  _emailPanelJSX = () => {
    const { address } = this.state;
    return (
      <div className="col-12 col-md-6">
        <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_phone">
          <label className="form-control-label" htmlFor="shippingEmail">
            <FormattedMessage id="email" />
          </label>
          <span
            className="rc-input rc-input--inline rc-input--label rc-full-width rc-input--full-width"
            input-setup="true"
          >
            <input
              type="email"
              className="rc-input__control input__phoneField shippingPhoneNumber"
              id="shippingEmail"
              value={address.email}
              onChange={(e) => this.deliveryInputChange(e)}
              onBlur={(e) => this.inputBlur(e)}
              name="email"
              maxLength="254"
            />
            <label className="rc-input__label" htmlFor="shippingEmail"></label>
          </span>
          <div className="invalid-feedback">
            <FormattedMessage
              id="payment.errorInfo"
              values={{
                val: <FormattedMessage id="email" />
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  _postCodeJSX = () => {
    const { address } = this.state;
    return (
      <div className="col-12 col-md-6">
        <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_postalCode">
          <label className="form-control-label" htmlFor="shippingZipCode">
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
              required
              value={address.postCode}
              onChange={(e) => this.deliveryInputChange(e)}
              onBlur={(e) => this.inputBlur(e)}
              name="postCode"
              // maxLength="5"
              // minLength="5"
              //data-js-pattern="(^\d{5}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)" //需要验证的时候开启
            />
            <label className="rc-input__label" htmlFor="id-text1"></label>
          </span>
          <div className="invalid-feedback">
            <FormattedMessage
              id="payment.errorInfo"
              values={{
                val: <FormattedMessage id="payment.postCode" />
              }}
            />
          </div>
          <div className="ui-lighter">
            <FormattedMessage id="example" />:{' '}
            <FormattedMessage id="examplePostCode" />
          </div>
          {process.env.REACT_APP_LANG == 'de' ? (
            <span style={{ padding: '2px',color:'#CA5264' }}>* Pflichtfelder</span>
          ) : null}
        </div>{' '}
      </div>
    );
  };
  _phonePanelJSX = () => {
    const { address } = this.state;
    return (
      <div className="col-12 col-md-6">
        <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_phone">
          <label className="form-control-label" htmlFor="shippingPhoneNumber">
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
              value={address.phoneNumber}
              onChange={(e) => this.deliveryInputChange(e)}
              onBlur={(e) => this.inputBlur(e)}
              // data-js-pattern="(^(\+?7|8)?9\d{9}$)"
              // data-js-pattern="(^(\+52)\d{8}$)"
              // data-js-pattern="(^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$)"
              name="phoneNumber"
              maxLength="20"
              minLength="18"
            />
            {/* <input
        className="rc-input__control input__phoneField shippingPhoneNumber"
        id="shippingPhoneNumber"
        unselectable="on"
        onSelect={() => {return false}}
        onContextMenu={() => {return false}}
        type="tel"
        // type="text"
        value={address.phoneNumber}
        onCopy={() => {
          return false
        }}
        unselectable
        onSelectCapture={() => { return false }}
        onChange={(e) => {
          this.deliveryInputChange(e);
        }}
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
                val: <FormattedMessage id="payment.phoneNumber" />
              }}
            />
          </div>
          <span className="ui-lighter">
            <FormattedMessage id="example" />:{' '}
            <FormattedMessage id="examplePhone" />
          </span>
        </div>
      </div>
    );
  };
  render() {
    const { address } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_firstName">
              <label className="form-control-label" htmlFor="shippingFirstName">
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
                  value={address.firstName}
                  onChange={(e) => this.deliveryInputChange(e)}
                  onBlur={(e) => this.inputBlur(e)}
                  name="firstName"
                  maxLength="50"
                />
                <label className="rc-input__label" htmlFor="id-text1" />
              </span>
              <div className="invalid-feedback">
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: <FormattedMessage id="payment.firstName" />
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
              <label className="form-control-label" htmlFor="shippingLastName">
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
                  value={address.lastName}
                  onChange={(e) => this.deliveryInputChange(e)}
                  onBlur={(e) => this.inputBlur(e)}
                  name="lastName"
                  maxLength="50"
                />
                <label className="rc-input__label" htmlFor="id-text1" />
              </span>
              <div className="invalid-feedback">
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: <FormattedMessage id="payment.lastName" />
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_country">
              <label className="form-control-label" htmlFor="shippingCountry">
                <FormattedMessage id="payment.country" />
              </label>
              <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                <Selection
                  selectedItemChange={(data) =>
                    this.handleSelectedItemChange('country', data)
                  }
                  optionList={this.computedList('country')}
                  selectedItemData={{
                    value: this.state.address.country
                  }}
                />
              </span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_city">
              <label
                className="form-control-label"
                htmlFor="shippingAddressCity"
              >
                <FormattedMessage id="payment.city" />
              </label>
              <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                <CitySearchSelection
                  defaultValue={this.state.address.cityName}
                  onChange={this.handleCityInputChange}
                />
              </span>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_lastName">
              <label className="form-control-label" htmlFor="shippingLastName">
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
                  value={address.address1}
                  onChange={(e) => this.deliveryInputChange(e)}
                  onBlur={(e) => this.inputBlur(e)}
                  name="address1"
                  maxLength="50"
                />
                <label className="rc-input__label" htmlFor="id-text1"></label>
              </span>
              <div className="invalid-feedback">
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: <FormattedMessage id="payment.address1" />
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
              <label className="form-control-label" htmlFor="shippingLastName">
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
                  value={address.address2}
                  onChange={(e) => this.deliveryInputChange(e)}
                  onBlur={(e) => this.inputBlur(e)}
                  name="address2"
                  maxLength="50"
                />
                <label className="rc-input__label" htmlFor="id-text1"></label>
              </span>
            </div>
          </div>
          {this._emailPanelJSX()}
          {this._phonePanelJSX()}
          {this._postCodeJSX()}
          <div className="col-12 col-md-6">
            <div className="form-group dwfrm_shipping_shippingAddress_addressFields_lastName">
              <label className="form-control-label" htmlFor="shippingLastName">
                <FormattedMessage id="payment.rfc" />
              </label>
              <span
                className="rc-input rc-input--inline rc-full-width rc-input--full-width"
                input-setup="true"
              >
                <input
                  className="rc-input__control shippingLastName"
                  type="text"
                  value={address.rfc}
                  onChange={(e) => this.deliveryInputChange(e)}
                  onBlur={(e) => this.inputBlur(e)}
                  name="rfc"
                  maxLength="50"
                />
                <label className="rc-input__label" />
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditForm;
