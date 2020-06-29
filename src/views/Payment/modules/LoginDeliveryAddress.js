import React from 'react'
import Skeleton from 'react-skeleton-loader'
import { FormattedMessage } from "react-intl"
import { find, findIndex } from "lodash"
import {
  getAddressList,
  saveAddress,
  editAddress
} from '@/api/address'
import { getDictionary } from '@/utils/utils'
import AddressForm from './AddressForm'
import Loading from "@/components/Loading"
import './loginDeliveryAddress.css'

export default class LoginDeliveryAddress extends React.Component {
  static defaultProps = {
    visible: true,
    type: 'delivery'
  }
  constructor(props) {
    super(props)
    this.state = {
      deliveryAddress: {
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
      saveErrorMsg: '',
      selectedId: ''
    }
    this.timer = null
  }
  async componentDidMount () {
    getDictionary({ type: 'city' })
      .then(res => {
        this.setState({
          cityList: res
        })
      })

    await getDictionary({ type: 'country' })
      .then(res => {
        const { deliveryAddress } = this.state
        deliveryAddress.country = find(res, ele => ele.name.toLowerCase() == 'mexico')
          ? find(res, ele => ele.name.toLowerCase() == 'mexico').id
          : ''
        this.setState({
          countryList: res,
          deliveryAddress: deliveryAddress
        })
      })
    this.queryAddressList()
  }
  async queryAddressList () {
    const { selectedId } = this.state
    this.setState({ loading: true })
    try {
      let res = await getAddressList()
      let addressList = res.context.filter(ele => ele.type === this.props.type.toUpperCase())
      let tmpId
      const defaultAddressItem = find(addressList, ele => ele.isDefaltAddress === 1)
      if (selectedId && find(addressList, ele => ele.deliveryAddressId === selectedId)) {
        Array.from(addressList, ele => ele.selected = ele.deliveryAddressId === selectedId)
      } else if (defaultAddressItem) {
        Array.from(addressList, ele => ele.selected = ele.isDefaltAddress === 1)
        tmpId = defaultAddressItem.deliveryAddressId
      } else if (addressList.length) {
        Array.from(addressList, (ele, i) => ele.selected = !i)
        tmpId = addressList[0].deliveryAddressId
      }
      this.setState({
        addressList: addressList,
        addOrEdit: !addressList.length,
        selectedId: tmpId
      })
    } catch (err) {
      this.setState({
        errMsg: err.toString()
      })
    } finally {
      this.setState({ loading: false })
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
      addressList: addressList,
      selectedId: addressList[idx].deliveryAddressId
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
      country: find(this.state.countryList, ele => ele.name.toLowerCase() == 'mexico')
        ? find(this.state.countryList, ele => ele.name.toLowerCase() == 'mexico').id
        : '',
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
    const widget = document.querySelector(`#J-address-title-${this.props.id}`)
    const headerWidget = document.querySelector('.rc-header__scrolled') ? document.querySelector('.rc-header__scrolled') : document.querySelector('.rc-header__nav')
    if (widget && headerWidget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget) - 950 - this.getElementToPageTop(headerWidget),
        behavior: "smooth"
      })
    }
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
  }
  handleClickCancel () {
    this.setState({ addOrEdit: false, saveErrorMsg: '' })
    this.scrollToTitle()
  }
  async handleSave () {
    const { deliveryAddress, addressList } = this.state
    const originData = addressList[this.currentOperateIdx]
    if (!deliveryAddress.firstName || !deliveryAddress.lastName || !deliveryAddress.address1 || !deliveryAddress.country || !deliveryAddress.city || !deliveryAddress.postCode || !deliveryAddress.phoneNumber) {
      this.setState({
        saveErrorMsg: this.props.intl.messages.CompleteRequiredItems
      })
      console.log(deliveryAddress)
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
      rfc: deliveryAddress.rfc,
      type: this.props.type.toUpperCase()
    }
    try {
      this.setState({ saveLoading: true })
      const tmpPromise = this.currentOperateIdx > -1 ? editAddress : saveAddress
      let res = await tmpPromise(params)
      this.scrollToTitle()
      await this.queryAddressList()
      this.setState({
        addOrEdit: false,
        successTipVisible: true,
        selectedId: res.context.deliveryAddressId
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({
          successTipVisible: false
        })
      }, 2000)
      return res
    } catch (err) {
      this.setState({
        saveErrorMsg: err.toString()
      })
      this.scrollToTitle()
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({
          saveErrorMsg: ''
        })
      }, 5000)
    } finally {
      this.setState({ saveLoading: false })
    }
  }
  render () {
    const { deliveryAddress, addOrEdit, loading, foledMore, addressList } = this.state;
    return (
      <div className={`${this.props.visible ? '' : 'hidden'}`}>
        <div id={`J-address-title-${this.props.id}`} className="card-header" style={{ marginTop: this.props.type === 'billing' ? -56 : 0 }}>
          <h5 className="pull-left">
            <FormattedMessage id="payment.deliveryTitle" />
          </h5>
          <p
            className={`red rc-margin-top--xs ui-cursor-pointer pull-right inlineblock m-0 d-flex align-items-center ${addOrEdit ? 'hidden' : ''}`}
            onClick={() => this.addOrEditAddress()}>
            <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus"></span>
            <span><FormattedMessage id="newAddress" /></span>
          </p>
        </div>
        <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.saveErrorMsg ? '' : 'hidden'}`}>
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
          <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
            <FormattedMessage id="saveSuccessfullly" />
          </p>
        </aside>
        <div className={`rc-border-all rc-border-colour--interface rc-margin-bottom--sm ${!addOrEdit ? 'addr-container' : 'checkout--padding'} ${loading ? 'pt-3 pb-3' : ''}`}>
          {
            loading
              ? <Skeleton color="#f5f5f5" count={2} width="100%" />
              : this.state.errMsg
                ? <span className="pt-2 pb-2">{this.state.errMsg}</span>
                : <>
                  {
                    !addOrEdit
                      ? addressList.length
                        ? <>
                          {
                            addressList.map((item, i) => (
                              <div
                                className={`address-item ${item.selected ? 'selected' : ''} ${foledMore && !item.selected ? 'hidden' : ''}`} key={item.deliveryAddressId}
                                onClick={() => this.selectAddress(i)}>
                                <div className="row align-items-center pt-3 pb-3 ml-2 mr-2 border-bottom">
                                  <div className="d-flex align-items-center justify-content-between col-2 col-md-1 address-name">
                                    {
                                      item.selected
                                        ? <svg width="24" height="32">
                                          <path d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0" fill="#E2001A" fillRule="evenodd"></path>
                                        </svg>
                                        : <svg width="24" height="32">
                                          <path d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0" fill="#c4c4c4" fillRule="evenodd"></path>
                                        </svg>
                                    }
                                    {/* <span style={{ flex: 1, marginLeft: '8%', lineHeight: 1.2 }}>{item.consigneeName}</span> */}
                                  </div>
                                  <div className="col-10 col-md-9">
                                    {[item.consigneeName, item.consigneeNumber].join(', ')}
                                    {
                                      item.isDefaltAddress === 1
                                        ? <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                                          <FormattedMessage id="default" />
                                        </span>
                                        : null
                                    }
                                    <br />
                                    {[
                                      this.getDictValue(this.state.countryList, item.countryId),
                                      this.getDictValue(this.state.cityList, item.cityId),
                                      item.address1
                                    ].join(', ')}
                                  </div>
                                  <div className="col-12 col-md-2 mt-md-0 mt-1 text-right">
                                    <a className="addr-btn-edit border-left pl-2" onClick={() => this.addOrEditAddress(i)}>
                                      {/* <span className="rc-icon rc-edit--xs rc-iconography"></span> */}
                                      <FormattedMessage id="edit" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                          {
                            addressList.length > 1 && <div
                              className="text-center pt-2 pb-2 ui-cursor-pointer"
                              onClick={() => { this.setState({ foledMore: !foledMore }) }}>
                              <span>
                                {
                                  foledMore
                                    ? <React.Fragment>
                                      <FormattedMessage id="moreAddress" />&nbsp;
                                    <b className="addr-switch switch-on"></b>
                                    </React.Fragment>
                                    : <React.Fragment>
                                      <FormattedMessage id="unfoldAddress" />
                                      <b className="addr-switch switch-off"></b>
                                    </React.Fragment>
                                }
                              </span>
                            </div>
                          }
                        </>
                        : <FormattedMessage id="order.noDataTip" />
                      : null
                  }
                  {/* add or edit address form */}
                  <fieldset className={`shipping-address-block rc-fieldset position-relative ${addOrEdit || loading ? '' : 'hidden'}`}>
                    <AddressForm
                      data={deliveryAddress}
                      updateData={data => this.updateDeliveryAddress(data)}
                    />
                    {this.state.saveLoading ? <Loading positionAbsolute="true" /> : null}
                    <div className="rc-layout-container">
                      <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down d-flex flex-wrap justify-content-between align-items-center">
                        <div>
                          {
                            this.props.type === 'delivery'
                              ? <div className="rc-input rc-input--inline" onClick={() => this.isDefalt()}>
                                {
                                  deliveryAddress.isDefalt
                                    ? <input
                                      type="checkbox"
                                      className="rc-input__checkbox"
                                      value={deliveryAddress.isDefalt}
                                      checked />
                                    : <input
                                      type="checkbox"
                                      className="rc-input__checkbox"
                                      value={deliveryAddress.isDefalt} />
                                }
                                <label className={`rc-input__label--inline text-break`}>
                                  <FormattedMessage id="setDefaultAddress" />
                                </label>
                              </div>
                              : null
                          }
                        </div>
                        {
                          addressList.length
                            ? <>
                              <div className="rc-md-up">
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
                              <div className="rc-md-down rc-full-width text-right">
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
                            </>
                            : null
                        }
                      </div>
                    </div>
                  </fieldset>
                </>
          }
        </div>
      </div>
    )
  }
}
