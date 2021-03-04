import React from 'react';
import { FormattedMessage } from 'react-intl';
import findIndex from 'lodash/findIndex';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
import { getDictionary } from '@/utils/utils';
import { getProvincesList } from '@/api';

export default class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        countryName: '',
        city: '',
        cityName: '',
        provinceNo: '',
        provinceName: '',
        province: '',
        postCode: '',
        phoneNumber: ''
      },
      countryList: [],
      provinceList: [], // 省份列表
    };
  }
  componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      })
    });
    // 查询省份列表（美国：州）
    getProvincesList({ storeId: process.env.REACT_APP_STOREID }).then((res) => {
      this.setState({
        provinceList: res.context.systemStates
      });
    });
    console.log('------------------ deliveryAddress: ',this.state.deliveryAddress);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.deliveryAddress) {
      this.setState({
        deliveryAddress: Object.assign({}, nextProps.data)
      }, () => {
        console.log(this.state.deliveryAddress, 'deliveryAddress')
      });
    }
  }
  computedList(key) {
    let tmp = '';
    if (key == 'province') {
      tmp = this.state[`${key}List`].map((c) => {
        return {
          value: c.id.toString(),
          name: c.stateName,
          stateNo: c.stateNo
        };
      });
      tmp.unshift({ value: '', name: 'state' });
    } else {
      tmp = this.state[`${key}List`].map((c) => {
        return {
          value: c.id.toString(),
          name: c.name
        };
      });
      tmp.unshift({ value: '', name: '' });
    }
    return tmp;
  }
  deliveryInputChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'postCode') {
      value = value.replace(/\s+/g, '');
    }
    const { deliveryAddress } = this.state;
    deliveryAddress[name] = value;
    this.inputBlur(e);
    this.setState({ deliveryAddress: deliveryAddress }, () => {
      this.props.updateData(this.state.deliveryAddress);
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
    const { deliveryAddress } = this.state;
    if (key == 'province') {
      deliveryAddress.provinceName = data.name;
      deliveryAddress.provinceNo = data.stateNo; // 省份简写      
    } else if (key == 'country') {
      deliveryAddress.countryName = data.name;
    }
    deliveryAddress[key] = data.value;
    this.setState({ deliveryAddress: deliveryAddress }, () => {
      this.props.updateData(this.state.deliveryAddress);
    });
  }
  handleCityInputChange = (data) => {
    const { deliveryAddress } = this.state;
    deliveryAddress.city = data.id;
    deliveryAddress.cityName = data.cityName;
    this.setState({ deliveryAddress: deliveryAddress }, () => {
      this.props.updateData(this.state.deliveryAddress);
    });
  };
  _emailPanelJSX = () => {
    const { deliveryAddress } = this.state;
    return (
      <div className="col-12 col-md-6 required dwfrm_shipping_shippingAddress_addressFields_phone">
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
            value={deliveryAddress.email}
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
    );
  };
  _postCodeJSX = () => {
    const { deliveryAddress } = this.state;
    return (
      <div className="col-12 col-md-6 required dwfrm_shipping_shippingAddress_addressFields_postalCode">
        <label className="form-control-label 1111" htmlFor="shippingZipCode">
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
            value={deliveryAddress.postCode}
            onChange={(e) => this.deliveryInputChange(e)}
            onBlur={(e) => this.inputBlur(e)}
            name="postCode"
            data-js-pattern="(*.*)"
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
      </div>
    );
  };
  _phonePanelJSX = () => {
    const { deliveryAddress } = this.state;
    return (
      <div className="col-12 col-md-6 required dwfrm_shipping_shippingAddress_addressFields_phone">
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
            type="text"
            className="rc-input__control input__phoneField shippingPhoneNumber"
            id="shippingPhoneNumber"
            value={deliveryAddress.phoneNumber}
            onChange={(e) => this.deliveryInputChange(e)}
            onBlur={(e) => this.inputBlur(e)}
            s-pattern="(^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$)"
            name="phoneNumber"
            maxLength="20"
            minLength="18"
          />
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
    );
  };
  _provinceJSX = () => {
    const { deliveryAddress } = this.state;
    return (
      <div className="col-12 col-md-6">
        <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_province">
          <label className="form-control-label" htmlFor="shippingProvince">
            <FormattedMessage id="payment.state" />
          </label>
          <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
            <Selection
              selectedItemChange={(data) =>
                this.handleSelectedItemChange('province', data)
              }
              optionList={this.computedList('province')}
              selectedItemData={{
                value: deliveryAddress.province
              }}
              key={deliveryAddress.province}
            />
          </span>
        </div>
      </div>
    );
  };
  render() {
    const { deliveryAddress } = this.state;
    return (
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
                value={deliveryAddress.firstName}
                onChange={(e) => this.deliveryInputChange(e)}
                onBlur={(e) => this.inputBlur(e)}
                name="firstName"
                maxLength="50"
              />
              <label className="rc-input__label" htmlFor="id-text1"></label>
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
                value={deliveryAddress.lastName}
                onChange={(e) => this.deliveryInputChange(e)}
                onBlur={(e) => this.inputBlur(e)}
                name="lastName"
                maxLength="50"
              />
              <label className="rc-input__label" htmlFor="id-text1"></label>
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

        {/* 国家 */}
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
                  value: this.state.deliveryAddress.country
                }}
                key={this.state.deliveryAddress.country}
              />
            </span>
          </div>
        </div>

        {/* 省份 */}
        {process.env.REACT_APP_LANG === 'en' ? (
          this._provinceJSX()
        ) : (null)}

        {/* 城市 */}
        <div className="col-12 col-md-6 required dwfrm_shipping_shippingAddress_addressFields_city">
          <div className="form-group required dwfrm_shipping_shippingAddress_addressFields_city">
            <label className="form-control-label" htmlFor="shippingAddressCity">
              <FormattedMessage id="payment.city" />
            </label>
            <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
              <CitySearchSelection
                defaultValue={this.state.deliveryAddress.cityName}
                key={this.state.deliveryAddress.cityName}
                freeText={true}
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
                value={deliveryAddress.address1}
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
                value={deliveryAddress.address2}
                onChange={(e) => this.deliveryInputChange(e)}
                onBlur={(e) => this.inputBlur(e)}
                name="address2"
                maxLength="50"
              />
              <label className="rc-input__label" htmlFor="id-text1"></label>
            </span>
          </div>
        </div>

        {this._phonePanelJSX()}
        {this._postCodeJSX()}
      </div>
    );
  }
}
