import React from 'react'
import Skeleton from 'react-skeleton-loader'
import { FormattedMessage } from "react-intl"
import { findIndex } from "lodash"
import {
  getAddressList,
  saveAddress,
  editAddress
} from '@/api/address'
import { getDict } from '@/api/dict'
import { STOREID } from '@/utils/constant'
import AddressForm from './addressForm'
import Loading from "@/components/Loading"

export default class LoginDeliveryAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deliveryAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        rfc: '',
        country: "",
        city: "",
        postCode: "",
        phoneNumber: "",
        isDefalt: false
      },
      errMsg: '',
      loading: true,
      saveLoading: false,
      addOrEdit: false,
      addressList: [],
      cityList: [],
      countryList: [],
      foledMore: true,
      successTipVisible: false,
      saveErrorMsg: ''
    }
  }
  componentDidMount () {
    this.queryAddressList()
    this.getDict('city')
    this.getDict('country')
  }
  componentWillReceiveProps (nextProps) {

  }
  async getDict (type) {
    let res = await getDict({
      delFlag: 0,
      storeId: STOREID,
      type
    })
    this.setState({
      [`${type}List`]: res.context.sysDictionaryVOS
    })
  }
  async queryAddressList () {
    this.setState({ loading: true })
    try {
      let res = await getAddressList()
      let addressList = res.context
      Array.from(addressList, ele => ele.selected = ele.isDefaltAddress === 1)
      this.setState({
        addressList: addressList,
        loading: false,
      })
    } catch (err) {
      this.setState({
        errMsg: err.toString(),
        loading: false,
      })
    }
  }
  getDictValue (list, id) {
    if (list && list.length > 0) {
      let item = list.find(item => {
        return item.id === id
      })
      if (item) {
        return item.name
      } else {
        return id
      }
    } else {
      return id
    }
  }
  selectAddress (idx) {
    let { addressList } = this.state
    Array.from(addressList, a => a.selected = false)
    addressList[idx].selected = true
    this.setState({
      addressList: addressList
    })
  }
  addOrEditAddress (idx = -1) {
    const { deliveryAddress, addressList } = this.state
    this.currentOperateIdx = idx
    let tmpDeliveryAddress = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      rfc: '',
      country: '',
      city: '',
      postCode: '',
      phoneNumber: '',
      isDefalt: false
    }
    this.setState({
      addOrEdit: true
    })
    if (idx > -1) {
      const tmp = addressList[idx]
      tmpDeliveryAddress = {
        firstName: tmp.firstName,
        lastName: tmp.lastName,
        address1: tmp.address1,
        address2: tmp.address2,
        rfc: tmp.rfc,
        country: tmp.countryId ? tmp.countryId.toString() : '',
        city: tmp.cityId ? tmp.cityId.toString() : '',
        postCode: tmp.postCode,
        phoneNumber: tmp.consigneeNumber,
        isDefalt: tmp.isDefaltAddress === 1 ? true : false
      }
    }
    this.setState({
      deliveryAddress: Object.assign({}, deliveryAddress, tmpDeliveryAddress)
    })
    this.scrollToTitle()
  }
  isDefalt () {
    let data = this.state.deliveryAddress;
    data.isDefalt = !data.isDefalt
    this.setState({
      deliveryAddress: data
    });
  }
  updateDeliveryAddress (data) {
    this.setState({
      deliveryAddress: data,
      saveErrorMsg: ''
    })
  }
  scrollToTitle () {
    const widget = document.querySelector('#J-err-msg')
    if (widget) {
      window.scrollTo(this.getElementToPageTop(widget), 0)
    }
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
  }
  handleClickCancel () {
    this.setState({ addOrEdit: false })
    this.scrollToTitle()
  }
  async handleSave () {
    const { deliveryAddress, addressList } = this.state
    const originData = addressList[this.currentOperateIdx]
    if (!deliveryAddress.firstName || !deliveryAddress.lastName || !deliveryAddress.address1 || !deliveryAddress.country || !deliveryAddress.city || !deliveryAddress.postCode || !deliveryAddress.phoneNumber) {
      this.setState({
        saveErrorMsg: 'Please complete the required items'
      })
      this.scrollToTitle()
      return false
    }
    let params = {
      address1: deliveryAddress.address1,
      address2: deliveryAddress.address2,
      firstName: deliveryAddress.firstName,
      lastName: deliveryAddress.lastName,
      countryId: +deliveryAddress.country,
      cityId: +deliveryAddress.city,
      consigneeName: deliveryAddress.firstName + " " + deliveryAddress.lastName,
      consigneeNumber: deliveryAddress.phoneNumber,
      customerId: originData ? originData.customerId : '',
      deliveryAddress: deliveryAddress.address1 + " " + deliveryAddress.address2,
      deliveryAddressId: originData ? originData.deliveryAddressId : '',
      isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
      postCode: deliveryAddress.postCode,
      provinceId: 0,
      rfc: deliveryAddress.rfc
    }
    try {
      this.setState({ saveLoading: true })
      const tmpPromise = this.currentOperateIdx > -1 ? editAddress : saveAddress
      await tmpPromise(params)
      this.setState({
        addOrEdit: false,
        successTipVisible: true,
        saveLoading: false
      })
      this.scrollToTitle()
      this.queryAddressList()
      setTimeout(() => {
        this.setState({
          successTipVisible: false
        })
      }, 2000)
    } catch (err) {
      this.setState({
        saveErrorMsg: err.toString(),
        saveLoading: false
      })
      this.scrollToTitle()
      setTimeout(() => {
        this.setState({
          saveErrorMsg: ''
        })
      }, 5000)
    }
  }
  render () {
    const { deliveryAddress, addOrEdit, loading, foledMore } = this.state;
    return (
      <React.Fragment>
        <div className="card-header">
          <h5 className="d-flex justify-content-between">
            <FormattedMessage id="payment.deliveryTitle" />
            <a
              className={`rc-styled-link font-weight-lighter ${addOrEdit ? 'hidden' : ''}`}
              style={{ fontSize: '1rem' }}
              onClick={() => this.addOrEditAddress()}
            >
              <FormattedMessage id="newAddress" />
            </a>
          </h5>
        </div>
        <div id="J-err-msg" className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.saveErrorMsg ? '' : 'hidden'}`}>
          <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
            <span>{this.state.saveErrorMsg}</span>
            <button
              className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
              aria-label="Close"
              onClick={() => { this.setState({ saveErrorMsg: '' }) }}>
              <span className="rc-screen-reader-text">
                <FormattedMessage id="close" />
              </span>
            </button>
          </aside>
        </div>
        <aside
          className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successTipVisible ? '' : 'hidden'}`}
          role="alert">
          <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">Save successfullly</p>
        </aside>
        <div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
          {
            loading
              ? <Skeleton color="#f5f5f5" count={2} width="100%" />
              : this.state.errMsg
                ? this.state.errMsg
                : <React.Fragment>
                  {
                    !addOrEdit
                      ? <React.Fragment>
                        {
                          this.state.addressList.map((item, i) => (
                            <div className={`row align-items-start mb-2 ${foledMore && !item.selected ? 'hidden' : ''}`} key={item.deliveryAddressId}>
                              <div
                                className={`ui-cursor-pointer border col-3 address-item ${item.selected ? 'border-danger selected' : ''}`}
                                onClick={() => this.selectAddress(i)}>
                                {item.consigneeName}
                                {
                                  item.selected
                                    ? <span className="position-absolute icon-gou">
                                      <span className="ui-arrow border-danger"></span>
                                      <span className="position-absolute icon-ok"></span>
                                    </span>
                                    : null
                                }
                              </div>
                              <div className="col-8">
                                {[item.consigneeName, item.consigneeNumber].join(',')}
                                <br />
                                {[
                                  this.getDictValue(this.state.countryList, item.countryId),
                                  this.getDictValue(this.state.cityList, item.cityId),
                                  item.address1
                                ].join(',')}
                              </div>
                              <div className="col-1">
                                <a className="rc-styled-link red" onClick={() => this.addOrEditAddress(i)}>
                                  <FormattedMessage id="edit" />
                                </a>
                              </div>
                            </div>
                          ))
                        }
                        <span className="ui-cursor-pointer" onClick={() => { this.setState({ foledMore: !foledMore }) }}>
                          {
                            foledMore
                              ? <React.Fragment>
                                <FormattedMessage id="moreAddress" />&nbsp;
                                <span className="rc-icon rc-down--xs rc-iconography position-relative" style={{ top: '3px' }}></span>
                              </React.Fragment>
                              : <React.Fragment>
                                <FormattedMessage id="unfoldAddress" />
                                <span className="rc-icon rc-up--xs rc-iconography position-relative" style={{ top: '3px' }}></span>
                              </React.Fragment>
                          }
                        </span>
                      </React.Fragment>
                      : null
                  }
                </React.Fragment>
          }
          {/* add or edit address form */}
          <fieldset className={`shipping-address-block rc-fieldset position-relative ${addOrEdit || loading ? '' : 'hidden'}`}>
            <AddressForm
              data={deliveryAddress}
              updateData={data => this.updateDeliveryAddress(data)}
            />
            {this.state.saveLoading ? <Loading positionAbsolute="true" /> : null}
            <div className="rc-layout-container">
              <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down d-flex justify-content-between align-items-center">
                <div className="rc-input rc-input--inline" onClick={() => this.isDefalt()}>
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    className="rc-input__checkbox"

                    value={deliveryAddress.isDefalt} />
                  {
                    !deliveryAddress.isDefalt
                      ? <label className="rc-input__label--inline" >
                        <FormattedMessage id="setDefaultAddress"></FormattedMessage>
                      </label>
                      : <label className="rc-input__label--inline defaultAddressChecked">
                        <FormattedMessage id="setDefaultAddress"></FormattedMessage>
                      </label>
                  }
                </div>
                <div>
                  <a className="rc-styled-link" onClick={() => this.handleClickCancel()}>
                    <FormattedMessage id="cancel" />
                  </a>
                      &nbsp;<FormattedMessage id="or" />&nbsp;
                      <button
                    className="rc-btn rc-btn--one submitBtn"
                    name="contactPreference"
                    type="submit"
                    onClick={() => this.handleSave()}>
                    <FormattedMessage id="save" />
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </React.Fragment>
    )
  }
}
