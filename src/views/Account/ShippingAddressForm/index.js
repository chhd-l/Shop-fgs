import React from "react"
import { injectIntl, FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'
import { findIndex } from "lodash"
import {
  saveAddress,
  setDefaltAddress,
  deleteAddress,
  getAddressById,
  editAddress
} from '@/api/address'
import { Link } from 'react-router-dom';
import Loading from "@/components/Loading"
import { getDictionary } from '@/utils/utils'

class ShippingAddressFrom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      showModal: false,
      isAdd: true,
      addressList: [],
      total: 0,
      errorMsg: "",
      successMsg: "",
      addressForm: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: 6,
        city: 0,
        postCode: "",
        phoneNumber: "",
        rfc: "",
        isDefalt: false,
        deliveryAddressId: "",
        customerId: "",
        addressType: "DELIVERY"
      },
      cityList: [],
      countryList: []
    }
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }

    getDictionary({ type: 'city' })
      .then(res => {
        this.setState({
          cityList: res
        })
      })
      .catch(err => {
        this.showErrorMsg(err.toString() || this.props.intl.messages.getDataFailed)
      })
    getDictionary({ type: 'country' })
      .then(res => {
        this.setState({
          countryList: res
        })
      })
      .catch(err => {
        this.showErrorMsg(err.toString() || this.props.intl.messages.getDataFailed)
      })

    if (this.props.match.params.addressId) {
      this.getAddressById(this.props.match.params.addressId)
    }
  }
  getAddressById = async (id) => {
    this.setState({
      loading: true
    })
    let params = {
      id: id
    }
    await getAddressById(params).then(res => {
      if (res.code === 'K-000000') {
        let data = res.context
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
          addressType: data.type
        }

        this.setState({
          addressForm: addressForm,
          showModal: true,
          isAdd: false,
          loading: false
        })
      }
      else {
        this.setState({
          loading: false
        })
        this.showErrorMsg(res.message || this.props.intl.messages.getDataFailed)
      }
    }).catch(err => {
      this.setState({
        loading: false
      })
      this.showErrorMsg(err.toString() || this.props.intl.messages.getDataFailed)
    })



  }
  isDefalt = () => {
    let data = this.state.addressForm;
    data.isDefalt = !data.isDefalt
    this.setState({
      addressForm: data
    });
  }
  saveAddress = async () => {
    this.setState({
      loading: true
    })
    let data = this.state.addressForm;
    debugger
    let params = {
      "address1": data.address1,
      "address2": data.address2,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "countryId": +data.country,
      "cityId": +data.city,
      "consigneeName": data.firstName + " " + data.lastName,
      "consigneeNumber": data.phoneNumber,
      "customerId": data.customerId,
      "deliveryAddress": data.address1 + " " + data.address2,
      "deliveryAddressId": data.deliveryAddressId,
      "isDefaltAddress": data.addressType === 'DELIVERY' ? (data.isDefalt ? 1 : 0) : 0,
      "postCode": data.postCode,
      "provinceId": 0,
      "rfc": data.rfc,
      "type": data.addressType
    }
    if (this.state.isAdd) {

      await saveAddress(params).then(res => {
        debugger
        if (res.code === 'K-000000') {
          this.setState({
            loading: false
          })
          this.handleCancel()
        }
        else {
          this.setState({
            loading: false
          })
          this.showErrorMsg(res.message || this.props.intl.messages.saveFailed)
        }
      }).catch(err => {
        this.setState({
          loading: false
        })
        this.showErrorMsg(err.toString() || this.props.intl.messages.saveFailed)
      })

    } else {
      await editAddress(params).then(res => {
        if (res.code === 'K-000000') {
          this.setState({
            loading: false
          })
          this.showSuccessMsg(res.message || this.props.intl.messages.saveSuccess)
          setTimeout(() => {
            this.handleCancel()
          }, 3000);

        }
        else {
          this.setState({
            loading: false
          })
          this.showErrorMsg(res.message || this.props.intl.messages.saveFailed)
        }
      }).catch(err => {
        this.setState({
          loading: false
        })
        this.showErrorMsg(err.toString() || this.props.intl.messages.saveFailed)
      })
    }
  }
  setDefaltAddress = async (id) => {
    this.setState({
      loading: true
    })
    let params = {
      "deliveryAddressId": id,
    }
    await setDefaltAddress(params).then(res => {
      if (res.code === 'K-000000') {
        this.showSuccessMsg(res.message || this.props.intl.messages.setDefaltAddressSuccess)
        this.getAddressList()
      }
      else {
        this.showErrorMsg(res.message || this.props.intl.messages.setDefaltAddressFailed)
        this.setState({
          loading: false
        })
      }
    }).catch(err => {
      this.showErrorMsg(err.toString() || this.props.intl.messages.setDefaltAddressFailed)
      this.setState({
        loading: false
      })
    })

  }
  deleteAddress = async (id) => {
    this.setState({
      loading: true
    })
    let params = {
      "id": id,
    }
    await deleteAddress(params).then(res => {
      if (res.code === 'K-000000') {
        this.showSuccessMsg(res.message || this.props.intl.messages.deleteAddressSuccess)
        this.getAddressList()
      }
      else {
        this.showErrorMsg(res.message || this.props.intl.messages.deleteAddressFailed)
        this.setState({
          loading: false
        })
      }
    }).catch(err => {
      this.showErrorMsg(err.toString() || this.props.intl.messages.setDefaltAddressFailed)
      this.setState({
        loading: false
      })
    })

  }
  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      })
    }, 3000)
  }

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: ''
      })
    }, 2000)
  }

  //定位
  scrollToErrorMsg () {
    const widget = document.querySelector('.content-asset')
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: 'smooth'
      })
    }
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
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
  handleInputChange (e) {
    const target = e.target
    const { addressForm } = this.state
    const name = target.name
    let value = target.value
    if (name === 'postCode') {
      value = value.replace(/\s+/g, "")
    }
    addressForm[name] = value
    this.setState({ addressForm: addressForm })
    this.inputBlur(e);
  }

  handleCancel = () => {
    const { history } = this.props
    history.push('/account/shippingAddress')
  }
  handleSave = () => {
    this.saveAddress()

  }
  render () {
    const { addressForm } = this.state
    return (
      <div>
        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              {this.state.loading ? <Loading positionFixed="true" /> : null}
              <SideMenu type="ShippingAddress" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="content-asset">
                  <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? '' : 'hidden'}`}>
                    <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
                      <span>{this.state.errorMsg}</span>
                      <button
                        className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                        onClick={() => { this.setState({ errorMsg: '' }) }}
                        aria-label="Close">
                        <span className="rc-screen-reader-text">
                          <FormattedMessage id="close" />
                        </span>
                      </button>
                    </aside>
                  </div>
                  <aside
                    className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successMsg ? '' : 'hidden'}`}
                    role="alert">
                    <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">{this.state.successMsg}</p>
                  </aside>
                  <div className={`userContactInfoEdit`}>
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group col-lg-12 pull-left no-padding required">
                          <label className="form-control-label" htmlFor="addressType">
                            <FormattedMessage id="addressType" />
                          </label>
                          <span className="rc-select rc-full-width rc-input--full-width rc-select-processed"
                            style={{ marginTop: "10px" }} data-loc="addressTypeSelect">
                            <select
                              data-js-select=""
                              id="addressType"
                              value={addressForm.addressType}
                              onChange={(e) => this.handleInputChange(e)}
                              onBlur={(e) => this.inputBlur(e)}
                              name="addressType"
                            >
                              <FormattedMessage id="delivery">
                                {txt => (
                                  <option value="DELIVERY">{txt}</option>
                                )}
                              </FormattedMessage>
                              <FormattedMessage id="billing2">
                                {txt => (
                                  <option value="DELIVERY">{txt}</option>
                                )}
                              </FormattedMessage>
                              {/* {
                              this.state.countryList.map(item=>(
                              <option value={item.id}>{item.name}</option>
                              ))
                            } */}

                            </select>
                          </span>
                          <div className="invalid-feedback"></div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-6 pull-left required">
                        <label className="form-control-label rc-full-width" htmlFor="address">
                          <FormattedMessage id="payment.firstName" />
                        </label>
                        <span className="rc-input rc-input--label rc-margin--none rc-input--full-width" input-setup="true">
                          <input
                            type="text"
                            className="rc-input__control"
                            id="firstName"
                            name="firstName"
                            required=""
                            aria-required="true"
                            value={addressForm.firstName}
                            onChange={e => this.handleInputChange(e)}
                            onBlur={e => this.inputBlur(e)}
                            maxLength="50"
                            autoComplete="address-line" />
                          <label className="rc-input__label" htmlFor="firstName"></label>
                        </span>
                        <div className="invalid-feedback" style={{ display: 'none' }}>
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
                      <div className="form-group col-lg-6 pull-left required">
                        <label className="form-control-label rc-full-width" htmlFor="address">
                          <FormattedMessage id="payment.lastName" />
                        </label>
                        <span className="rc-input rc-input--label rc-margin--none rc-input--full-width" input-setup="true">
                          <input
                            type="text"
                            className="rc-input__control"
                            id="lastName"
                            name="lastName"
                            required=""
                            aria-required="true"
                            value={addressForm.lastName}
                            onChange={e => this.handleInputChange(e)}
                            onBlur={e => this.inputBlur(e)}
                            maxLength="50"
                            autoComplete="address-line" />
                          <label className="rc-input__label" htmlFor="lastName"></label>
                        </span>
                        <div className="invalid-feedback" style={{ display: 'none' }}>
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
                      <div className="form-group col-lg-6 pull-left required">
                        <label className="form-control-label rc-full-width" htmlFor="address">
                          <FormattedMessage id="payment.address1" />
                        </label>
                        <span className="rc-input rc-input--label rc-margin--none rc-input--full-width" input-setup="true">
                          <input
                            type="text"
                            className="rc-input__control"
                            id="address1"
                            name="address1"
                            required=""
                            aria-required="true"
                            value={addressForm.address1}
                            onChange={e => this.handleInputChange(e)}
                            onBlur={e => this.inputBlur(e)}
                            maxLength="50"
                            autoComplete="address-line" />
                          <label className="rc-input__label" htmlFor="address1"></label>
                        </span>
                        <div className="invalid-feedback" style={{ display: 'none' }}>
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

                      <div className="form-group col-6">
                        <label className="form-control-label rc-full-width" htmlFor="reference">
                          <FormattedMessage id="payment.address2" />
                        </label>
                        <span className="rc-input rc-input--full-width rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                          <input
                            type="text"
                            className="rc-input__control input__phoneField"
                            id="address2"
                            name="address2"
                            value={addressForm.address2}
                            onChange={e => this.handleInputChange(e)}
                            onBlur={e => this.inputBlur(e)}
                            maxLength="50" />
                          <label className="rc-input__label" htmlFor="address2"></label>
                        </span>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group col-lg-12 pull-left no-padding required">
                          <label className="form-control-label" htmlFor="country">
                            <FormattedMessage id="payment.country" />
                          </label>
                          <span className="rc-select rc-full-width rc-input--full-width rc-select-processed" data-loc="countrySelect">
                            <select
                              data-js-select=""
                              id="country"
                              value={addressForm.country}
                              onChange={(e) => this.handleInputChange(e)}
                              onBlur={(e) => this.inputBlur(e)}
                              name="country"
                            >
                              <option value=""></option>
                              {
                                this.state.countryList.map(item => (
                                  <option value={item.id} key={item.id}>{item.name}</option>
                                ))
                              }

                            </select>
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
                            <span className="rc-select rc-full-width rc-input--full-width rc-select-processed" data-loc="citySelect">
                              <select
                                data-js-select=""
                                id="city"
                                value={addressForm.city}
                                onChange={(e) => this.handleInputChange(e)}
                                onBlur={(e) => this.inputBlur(e)}
                                name="city"
                              >
                                <option value=""></option>
                                {
                                  this.state.cityList.map(item => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                  ))
                                }
                              </select>
                            </span>
                          </div>
                          <div className="invalid-feedback"></div>
                        </div>
                      </div>
                      <div className="form-group col-6 required">
                        <div className="no-padding">
                          <label className="form-control-label rc-full-width" htmlFor="zipCode">
                            <FormattedMessage id="payment.postCode" />
                          </label>
                          <span
                            className="rc-input rc-input--inline rc-input--label rc-margin-top--none rc-margin-right--none rc-margin-left--none rc-full-width"
                            data-js-validate=""
                            style={{ maxWidth: '1000px' }}
                            data-js-warning-message="*Post Code isn’t valid"
                            input-setup="true">
                            <input
                              className="rc-input__control"
                              type="number"
                              id="zipCode"
                              data-range-error="The postal code needs to be 6 characters"
                              name="postCode"
                              value={addressForm.postCode}
                              onChange={e => this.handleInputChange(e)}
                              onBlur={e => this.inputBlur(e)}
                              // maxLength="5"
                              // minLength="5"
                              data-js-pattern="(^\d{5}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)"
                              autoComplete="postal-code" />
                            <label className="rc-input__label" htmlFor="zipCode"></label>
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
                            <FormattedMessage id="example" />: 02860
                        </div>
                        </div>
                      </div>
                      <div className="form-group col-6 required">
                        <label className="form-control-label rc-full-width" htmlFor="phone">
                          <FormattedMessage id="payment.phoneNumber" />
                        </label>
                        <span
                          className="rc-input rc-input--inline rc-input--label rc-margin--none rc-full-width"
                          style={{ maxWidth: '1000px' }}
                          input-setup="true">
                          <input
                            className="rc-input__control input__phoneField"
                            id="phone"
                            type="number"
                            name="phoneNumber"
                            value={addressForm.phoneNumber}
                            onChange={e => this.handleInputChange(e)}
                            onBlur={e => this.inputBlur(e)}
                            maxLength="20"
                            minLength="18" />
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
                          <FormattedMessage id="example" />: +(52) 559 801 65
                      </span>
                      </div>
                      <div className="form-group col-6">
                        <label className="form-control-label rc-full-width" htmlFor="reference">
                          <FormattedMessage id="payment.rfc" />
                        </label>
                        <span className="rc-input rc-input--full-width rc-input--inline rc-input--label rc-margin--none rc-full-width" input-setup="true">
                          <input
                            type="text"
                            className="rc-input__control input__phoneField"
                            id="reference"
                            name="rfc"
                            value={addressForm.rfc}
                            onChange={e => this.handleInputChange(e)}
                            onBlur={e => this.inputBlur(e)}
                            maxLength="50" />
                          <label className="rc-input__label" htmlFor="reference"></label>
                        </span>
                      </div>

                      {
                        addressForm.addressType === 'DELIVERY' ? (
                          <div className="form-group col-6">
                            <div className="rc-input rc-input--inline" style={{ margin: "40px 0 0 0" }} onClick={() => this.isDefalt()}>
                              {
                                addressForm.isDefalt
                                  ? <input
                                    type="checkbox"
                                    className="rc-input__checkbox"
                                    value={addressForm.isDefalt}
                                    checked />
                                  : <input
                                    type="checkbox"
                                    className="rc-input__checkbox"
                                    value={addressForm.isDefalt} />
                              }
                              <label className="rc-input__label--inline text-break w-100">
                                <FormattedMessage id="setDefaultAddress" />
                              </label>
                            </div>
                          </div>
                        ) : null
                      }


                    </div>
                    <span className="rc-meta mandatoryField">
                      * <FormattedMessage id="account.requiredFields" />
                    </span>
                    <div className="text-right">
                      <a
                        className="rc-styled-link editPersonalInfoBtn"
                        name="contactInformation"
                        onClick={() => this.handleCancel()}>
                        <FormattedMessage id="cancel" />
                      </a>
                    &nbsp;<FormattedMessage id="or" />&nbsp;
                      <button
                        className="rc-btn rc-btn--one submitBtn editAddress"
                        data-sav="false"
                        name="contactInformation"
                        type="submit"
                        onClick={() => this.handleSave()}>
                        <FormattedMessage id="save" />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div >
    )
  }
}

export default injectIntl(ShippingAddressFrom);