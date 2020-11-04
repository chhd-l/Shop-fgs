import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import CitySearchSelection from '@/components/CitySearchSelection';
import './index.css';
import { findIndex } from 'lodash';
import {
  saveAddress,
  setDefaltAddress,
  deleteAddress,
  getAddressById,
  editAddress
} from '@/api/address';
import { queryCityNameById } from '@/api';
import Loading from '@/components/Loading';
import { getDictionary, validData } from '@/utils/utils';
import { ADDRESS_RULE } from '@/utils/constant';
import Selection from '@/components/Selection';

const localItemRoyal = window.__.localItemRoyal;

const defaulProps = {
  addressId: ''
};

@injectIntl
class ShippingAddressFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      isAdd: true,
      errorMsg: '',
      successMsg: '',
      addressForm: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: 6,
        city: '',
        cityName: '',
        postCode: '',
        phoneNumber: '',
        rfc: '',
        isDefalt: false,
        deliveryAddressId: '',
        customerId: '',
        addressType: 'DELIVERY',
        email: ''
      },
      countryList: [],
      isValid: false,
      curType: 'delivery'
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }

    getDictionary({ type: 'country' })
      .then((res) => {
        this.setState({
          countryList: res
        });
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
      });

    if (this.props.addressId) {
      this.getAddressById(this.props.addressId);
    }
  }
  getAddressById = async (id) => {
    this.setState({
      loading: true
    });
    let params = { id };

    try {
      let res = await getAddressById(params);
      let data = res.context;
      let addressForm = {
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        address2: data.address2,
        country: data.countryId,
        city: data.cityId,
        postCode: data.postCode,
        phoneNumber: data.consigneeNumber,
        rfc: data.rfc,
        isDefalt: data.isDefaltAddress === 1 ? true : false,
        deliveryAddressId: data.deliveryAddressId,
        customerId: data.customerId,
        addressType: data.type,
        email: data.email
      };

      let cityRes = await queryCityNameById({ id: [data.cityId] });
      addressForm.cityName =
        cityRes.context.systemCityVO.length &&
        cityRes.context.systemCityVO[0].cityName;
      this.setState(
        {
          addressForm,
          showModal: true,
          isAdd: false,
          loading: false,
          curType: data.type === 'DELIVERY' ? 'delivery' : 'billing'
        },
        () => {
          this.validFormData();
        }
      );
    } catch (err) {
      this.setState({ loading: false });
      this.showErrorMsg(err.message.toString());
    }
  };
  isDefalt = () => {
    let data = this.state.addressForm;
    data.isDefalt = !data.isDefalt;
    this.setState(
      {
        addressForm: data
      },
      () => {
        this.validFormData();
      }
    );
  };
  saveAddress = async () => {
    try {
      let data = this.state.addressForm;
      this.setState({
        loading: true
      });

      let params = {
        address1: data.address1,
        address2: data.address2,
        firstName: data.firstName,
        lastName: data.lastName,
        countryId: +data.country,
        cityId: +data.city,
        consigneeName: data.firstName + ' ' + data.lastName,
        consigneeNumber: data.phoneNumber,
        customerId: data.customerId,
        deliveryAddress: data.address1 + ' ' + data.address2,
        deliveryAddressId: data.deliveryAddressId,
        isDefaltAddress:
          data.addressType === 'DELIVERY' ? (data.isDefalt ? 1 : 0) : 0,
        postCode: data.postCode,
        provinceId: 0,
        rfc: data.rfc,
        email: data.email,
        type: data.addressType
      };
      if (this.state.isAdd) {
        await saveAddress(params);
        this.setState({
          loading: false
        });
        this.handleCancel();
      } else {
        let editRes = await editAddress(params);
        this.setState({
          loading: false
        });
        this.showSuccessMsg(editRes.message);
        setTimeout(() => {
          this.handleCancel();
        }, 3000);
      }
      this.props.refreshList();
    } catch (err) {
      this.setState({
        loading: false
      });
      this.showErrorMsg(
        err.message.toString() || this.props.intl.messages.saveFailed
      );
    }
  };
  setDefaltAddress = async (id) => {
    this.setState({
      loading: true
    });
    let params = {
      deliveryAddressId: id
    };
    await setDefaltAddress(params)
      .then((res) => {
        this.showSuccessMsg(res.message);
        this.getAddressList();
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
        this.setState({
          loading: false
        });
      });
  };
  deleteAddress = async (id) => {
    this.setState({
      loading: true
    });
    let params = {
      id: id
    };
    await deleteAddress(params)
      .then((res) => {
        this.showSuccessMsg(res.message);
        this.getAddressList();
      })
      .catch((err) => {
        this.showErrorMsg(err.message);
        this.setState({
          loading: false
        });
      });
  };
  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
  };

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 2000);
  };

  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector('.content-asset');
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }

  inputBlur = (e) => {
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
  };
  handleInputChange = (e) => {
    const target = e.target;
    const { addressForm } = this.state;
    const name = target.name;
    let value = target.value;
    if (name === 'postCode') {
      value = value.replace(/\s+/g, '');
    }
    addressForm[name] = value;
    this.setState({ addressForm }, () => {
      this.validFormData();
    });
    this.inputBlur(e);
  };
  handleCityInputChange = (data) => {
    const { addressForm } = this.state;
    addressForm.city = data.id;
    addressForm.cityName = data.cityName;
    this.setState({ addressForm }, () => {
      this.validFormData();
    });
  };
  handleCancel = () => {
    this.props.hideMyself({ closeListPage: this.props.backPage === 'cover' });
  };
  handleSave = () => {
    this.saveAddress();
  };
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
  handleSelectedItemChange(key, data) {
    const { addressForm } = this.state;
    addressForm[key] = data.value;
    this.setState({ addressForm }, () => {
      this.validFormData();
    });
  }
  validFormData = async () => {
    try {
      await validData(ADDRESS_RULE, this.state.addressForm);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    }
  };
  handleTypeChange = (item) => {
    this.setState({ curType: item.type });
  };
  render() {
    const { addressForm, isValid, curType, successMsg, errorMsg } = this.state;
    return (
      <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
        <div className="content-asset">
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
              errorMsg ? '' : 'hidden'
            }`}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
              role="alert"
            >
              <span className="pl-0">{errorMsg}</span>
              <button
                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                onClick={() => {
                  this.setState({ errorMsg: '' });
                }}
                aria-label="Close"
              >
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
              successMsg ? '' : 'hidden'
            }`}
            role="alert"
          >
            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
              {successMsg}
            </p>
          </aside>
          <div className={`userContactInfoEdit`}>
            <div className="row">
              {[
                { type: 'delivery', langKey: 'deliveryAddress' },
                { type: 'billing', langKey: 'billingAddress' }
              ].map((item, i) => (
                <div className="col-12 col-md-3" key={i}>
                  <div className="rc-input rc-input--inline">
                    <input
                      className="rc-input__radio"
                      id={`account-info-address-${item.type}-${i}`}
                      checked={curType === item.type}
                      type="radio"
                      disabled={!!this.props.addressId}
                      onChange={this.handleTypeChange.bind(this, item)}
                    />
                    <label
                      className="rc-input__label--inline"
                      for={`account-info-address-${item.type}-${i}`}
                    >
                      <FormattedMessage id={item.langKey} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="form-group col-lg-6 pull-left required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="address"
                >
                  <FormattedMessage id="payment.firstName" />
                </label>
                <span
                  className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    type="text"
                    className="rc-input__control"
                    id="firstName"
                    name="firstName"
                    required=""
                    aria-required="true"
                    value={addressForm.firstName}
                    onChange={this.handleInputChange}
                    onBlur={this.inputBlur}
                    maxLength="50"
                    autoComplete="address-line"
                  />
                  <label
                    className="rc-input__label"
                    htmlFor="firstName"
                  ></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: <FormattedMessage id="payment.firstName" />
                    }}
                  />
                </div>
              </div>
              <div className="form-group col-lg-6 pull-left required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="address"
                >
                  <FormattedMessage id="payment.lastName" />
                </label>
                <span
                  className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    type="text"
                    className="rc-input__control"
                    id="lastName"
                    name="lastName"
                    required=""
                    aria-required="true"
                    value={addressForm.lastName}
                    onChange={this.handleInputChange}
                    onBlur={this.inputBlur}
                    maxLength="50"
                    autoComplete="address-line"
                  />
                  <label className="rc-input__label" htmlFor="lastName"></label>
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: <FormattedMessage id="payment.lastName" />
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group col-lg-12 pull-left no-padding required">
                  <label className="form-control-label" htmlFor="country">
                    <FormattedMessage id="payment.country" />
                  </label>
                  <span
                    className="rc-select rc-full-width rc-input--full-width rc-select-processed"
                    data-loc="countrySelect"
                  >
                    <Selection
                      key={addressForm.country}
                      selectedItemChange={(data) =>
                        this.handleSelectedItemChange('country', data)
                      }
                      optionList={this.computedList('country')}
                      selectedItemData={{
                        value: addressForm.country
                      }}
                    />
                  </span>
                  <div className="invalid-feedback"></div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group col-lg-12 pull-left no-padding required">
                  <label className="form-control-label" htmlFor="city">
                    <FormattedMessage id="payment.city" />
                  </label>
                  <div data-js-dynamicselect="city" data-template="shipping">
                    <span
                      className="rc-select rc-full-width rc-input--full-width rc-select-processed"
                      data-loc="citySelect"
                    >
                      <CitySearchSelection
                        defaultValue={this.state.addressForm.cityName}
                        onChange={this.handleCityInputChange}
                      />
                    </span>
                  </div>
                  <div className="invalid-feedback"></div>
                </div>
              </div>
              <div className="form-group col-lg-6 pull-left required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="address"
                >
                  <FormattedMessage id="payment.address1" />
                </label>
                <span
                  className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                  input-setup="true"
                >
                  <input
                    type="text"
                    className="rc-input__control"
                    id="address1"
                    name="address1"
                    required=""
                    aria-required="true"
                    value={addressForm.address1}
                    onChange={this.handleInputChange}
                    onBlur={this.inputBlur}
                    maxLength="50"
                    autoComplete="address-line"
                  />
                  <label className="rc-input__label" htmlFor="address1" />
                </span>
                <div className="invalid-feedback" style={{ display: 'none' }}>
                  <FormattedMessage
                    id="payment.errorInfo"
                    values={{
                      val: <FormattedMessage id="payment.address1" />
                    }}
                  />
                </div>
              </div>

              <div className="form-group col-6">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="reference"
                >
                  <FormattedMessage id="payment.address2" />
                </label>
                <span
                  className="rc-input rc-input--full-width rc-input--inline rc-input--label rc-margin--none rc-full-width"
                  input-setup="true"
                >
                  <input
                    type="text"
                    className="rc-input__control input__phoneField"
                    id="address2"
                    name="address2"
                    value={addressForm.address2}
                    onChange={this.handleInputChange}
                    onBlur={this.inputBlur}
                    maxLength="50"
                  />
                  <label className="rc-input__label" htmlFor="address2" />
                </span>
              </div>
              <div className="form-group col-6 required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="phone"
                >
                  <FormattedMessage id="email" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width"
                  style={{ maxWidth: '1000px' }}
                  input-setup="true"
                >
                  <input
                    className="rc-input__control input__phoneField"
                    id="email"
                    type="email"
                    name="email"
                    value={addressForm.email}
                    onChange={this.handleInputChange}
                    onBlur={this.inputBlur}
                    maxLength="254"
                  />
                  <label className="rc-input__label" htmlFor="email" />
                </span>
                {/* <div className="invalid-feedback">
              <FormattedMessage
                id="payment.errorInfo"
                values={{
                  val: (
                    <FormattedMessage id="payment.phoneNumber" />
                  ),
                }}
              />
            </div> */}
              </div>
              <div className="form-group col-6 required">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="phone"
                >
                  <FormattedMessage id="payment.phoneNumber" />
                </label>
                <span
                  className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width"
                  style={{ maxWidth: '1000px' }}
                  input-setup="true"
                >
                  <input
                    className="rc-input__control input__phoneField"
                    id="phone"
                    type="number"
                    name="phoneNumber"
                    value={addressForm.phoneNumber}
                    onChange={this.handleInputChange}
                    onBlur={this.inputBlur}
                    maxLength="20"
                    minLength="18"
                  />
                  <label className="rc-input__label" htmlFor="phone"></label>
                </span>
                {/* <div className="invalid-feedback">
              <FormattedMessage
                id="payment.errorInfo"
                values={{
                  val: (
                    <FormattedMessage id="payment.phoneNumber" />
                  ),
                }}
              />
            </div> */}
                <span className="ui-lighter">
                  <FormattedMessage id="example" />:{' '}
                  <FormattedMessage id="examplePhone" />
                </span>
              </div>

              <div className="form-group col-6 required">
                <div className="no-padding">
                  <label
                    className="form-control-label rc-full-width"
                    htmlFor="zipCode"
                  >
                    <FormattedMessage id="payment.postCode" />
                  </label>
                  <span
                    className="rc-input rc-input--inline rc-input--label rc-margin-top--none rc-margin-right--none rc-margin-left--none rc-full-width"
                    data-js-validate=""
                    style={{ maxWidth: '1000px' }}
                    data-js-warning-message="*Post Code isn’t valid"
                    input-setup="true"
                  >
                    <input
                      className="rc-input__control"
                      type="number"
                      id="zipCode"
                      data-range-error="The postal code needs to be 6 characters"
                      name="postCode"
                      value={addressForm.postCode}
                      onChange={this.handleInputChange}
                      onBlur={this.inputBlur}
                      // maxLength="5"
                      // minLength="5"
                      //data-js-pattern="(^\d{5}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                      data-js-pattern="(*.*)"
                      autoComplete="postal-code"
                    />
                    <label className="rc-input__label" htmlFor="zipCode" />
                  </span>
                  {/* <div className="invalid-feedback">
                <FormattedMessage
                  id="payment.errorInfo"
                  values={{
                    val: (
                      <FormattedMessage id="payment.postCode" />
                    ),
                  }}
                />
              </div> */}
                  <div className="ui-lighter">
                    <FormattedMessage id="example" />:{' '}
                    <FormattedMessage id="examplePostCode" />
                  </div>
                </div>
              </div>
              <div className="form-group col-6">
                <label
                  className="form-control-label rc-full-width"
                  htmlFor="reference"
                >
                  <FormattedMessage id="payment.rfc" />
                </label>
                <span
                  className="rc-input rc-input--full-width rc-input--inline rc-input--label rc-margin--none rc-full-width"
                  input-setup="true"
                >
                  <input
                    type="text"
                    className="rc-input__control input__phoneField"
                    id="reference"
                    name="rfc"
                    value={addressForm.rfc}
                    onChange={this.handleInputChange}
                    onBlur={this.inputBlur}
                    maxLength="50"
                  />
                  <label className="rc-input__label" htmlFor="reference" />
                </span>
              </div>

              {addressForm.addressType === 'DELIVERY' ? (
                <div className="form-group col-6">
                  <div
                    className="rc-input rc-input--inline"
                    style={{ margin: '40px 0 0 0' }}
                    onClick={() => this.isDefalt()}
                  >
                    {addressForm.isDefalt ? (
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        value={addressForm.isDefalt}
                        key={1}
                        checked
                      />
                    ) : (
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        key={2}
                        value={addressForm.isDefalt}
                      />
                    )}
                    <label className="rc-input__label--inline text-break w-100">
                      <FormattedMessage id="setDefaultAddress" />
                    </label>
                  </div>
                </div>
              ) : null}
            </div>
            <span className="rc-meta mandatoryField">
              * <FormattedMessage id="account.requiredFields" />
            </span>
            <div className="text-right">
              <span
                className="rc-styled-link editPersonalInfoBtn"
                name="contactInformation"
                onClick={() => this.handleCancel()}
              >
                <FormattedMessage id="cancel" />
              </span>
              &nbsp;
              <FormattedMessage id="or" />
              &nbsp;
              <button
                className="rc-btn rc-btn--one submitBtn editAddress"
                data-sav="false"
                name="contactInformation"
                type="submit"
                disabled={!isValid}
                onClick={this.handleSave}
              >
                <FormattedMessage id="save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ShippingAddressFrom.defaulProps = defaulProps;

export default ShippingAddressFrom;
