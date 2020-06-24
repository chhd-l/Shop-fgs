import React from "react"
import {injectIntl, FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import ConfirmTooltip from '@/components/ConfirmTooltip'
import './index.css'
import {
  getAddressList,
  setDefaltAddress,
  deleteAddress,
  getAddressById,
} from '@/api/address'
import { Link } from 'react-router-dom';
import Loading from "@/components/Loading"
import { getDictionary } from '@/utils/utils'

@injectIntl
class ShippingAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
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
        country: "1",
        city: "1",
        postCode: "",
        phoneNumber: "",
        rfc: "",
        isDefalt: false,
        deliveryAddressId: "",
        customerId: ""
      },
      cityList: [],
      countryList: [],
      currentType:'DELIVERY',
      currentAddressList:[]
    }
  }

  componentWillUnmount () {
    
  }
  componentDidMount () {
    this.getAddressList()
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
  }
  getAddressList = async () => {
    await getAddressList().then(res => {
      if (res.code === 'K-000000') {
        let addressList = res.context
        let total = addressList.length
        this.setState({
          addressList: addressList,
          total: total,
          loading: false,
        })
        this.switchAddressType(this.state.currentType)
      } else {
        this.showErrorMsg(res.message || this.props.intl.messages.queryDataFailed)
      }
    }).catch(err => {
      this.showErrorMsg(this.props.intl.messages.queryDataFailed)
      this.setState({
        loading: false
      })
    })


  }
  getAddressById = async (id) => {
    let params = {
      id: id
    }
    const res = await getAddressById(params)
    if (res.code === 'K-000000') {
      let data = res.context
      let nameArr = data.consigneeName.split(' ')
      let addressArr = data.deliveryAddress.split(' ')
      let addressForm = {
        firstName: nameArr[0],
        lastName: nameArr[1],
        address1: addressArr[0],
        address2: addressArr[1],
        country: data.areaId,
        city: data.cityId,
        postCode: data.postCode,
        phoneNumber: data.consigneeNumber,
        rfc: data.rfc,
        isDefalt: data.isDefaltAddress === 1 ? true : false,
        deliveryAddressId: data.deliveryAddressId,
        customerId: data.customerId
      }

      this.setState({
        addressForm: addressForm,
        showModal: true,
        isAdd: false
      })
    }

  }

  onFormChange = ({ field, value }) => {
    let data = this.state.addressForm;
    data[field] = value;
    this.setState({
      addressForm: data
    });
  };
  isDefalt = () => {
    let data = this.state.addressForm;
    data.isDefalt = !data.isDefalt
    this.setState({
      addressForm: data
    });
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
      this.showErrorMsg(this.props.intl.messages.setDefaltAddressFailed)
      this.setState({
        loading: false
      })
    })

  }
  deleteAddress = async (item) => {
    let { addressList } = this.state
    item.confirmTooltipVisible = false
    this.setState({
      loading: true,
      addressList: addressList
    })
    await deleteAddress({ id: item.deliveryAddressId })
      .then(res => {
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
      })
      .catch(err => {
        this.showErrorMsg(err.toString()|| this.props.intl.messages.deleteAddressFailed)
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
        top: 0,
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
  openCreatePage = () => {
    const { history } = this.props
    history.push('/account/shippingAddress/create')
  }
  openEditPage = (id) => {
    const { history } = this.props
    history.push('/account/shippingAddress/' + id)
  }

  getDictValue = (list, id) => {
    if (list && list.length > 0) {
      let item = list.find(item => {
        return item.id === id
      })
      if (item) {
        return item.name
      }
      else {
        return id
      }
    }
    else {
      return id
    }

  }
  updateConfirmTooltipVisible (item, status) {
    let { addressList } = this.state
    item.confirmTooltipVisible = status
    this.setState({
      addressList: addressList
    })
  }
  switchAddressType=(type)=>{
    const {addressList} = this.state
    let currentAddressList = addressList.filter(item=>{
      return item.type === type
    })
    this.setState({
      currentType:type,
      currentAddressList:currentAddressList
    })
  }
  render () {
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
                <div className="rc-border-bottom rc-border-colour--interface mb-2">
                  <h4 className="rc-delta rc-margin--none">
                    <FormattedMessage id="shippingAddress"></FormattedMessage>
                  </h4>
                </div>
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
                  <div className="table-toolbar">
                    <div style={{display:'flex'}}>
                      <span className="type-text">
                          <FormattedMessage id="type"></FormattedMessage>
                        </span>

                        <span className="dividing"></span>
                        
                        <button type="button" 
                          onClick={()=>this.switchAddressType('DELIVERY')}
                          className={ this.state.currentType==='DELIVERY'?'selected-btn':"type-btn"} >
                          <span> <FormattedMessage id="deliveryAddress"></FormattedMessage></span>
                        </button>
                        
                        <span className="dividing"></span>

                        <button type="button"
                            onClick={()=>this.switchAddressType('BILLING')}
                            className={ this.state.currentType==='BILLING'?'selected-btn':"type-btn"}>
                          <span> <FormattedMessage id="billingAddress"></FormattedMessage></span>
                        </button>

                        <span className="dividing"></span>
                      </div>
                      <button type="button" className="address-btn" onClick={() => this.openCreatePage()}>
                        <span><FormattedMessage id="newAddress"></FormattedMessage></span>
                      </button>
                    </div>

                  
                  <div className="row address-layout">
                    {
                      this.state.currentAddressList.map(item => (
                        <div className="col-lg-6"  style={{padding:"10px 25px" }} key={item.deliveryAddressId}>
                          {/* <div className="addr-line"></div> */}
                          <div className={"row card-address " + (item.isDefaltAddress === 1 ? "card-address-default" : "")} >
                            <div className="col-lg-10">
                              <div className="address-name">
                                <span>{item.firstName+' '+ item.lastName}</span>
                              </div>
                            </div>
                            <div className="col-lg-2 address-action">
                              <a className="address-click-btn" 
                                onClick={() => this.openEditPage(item.deliveryAddressId)}>
                                <FormattedMessage id="edit" />
                              </a>
                              
                              <span className="dividing-action"></span>
                              <a className="address-click-btn"
                               onClick={() => this.updateConfirmTooltipVisible(item, true)}>
                                <FormattedMessage id="delete" />
                              </a>
                                <ConfirmTooltip
                                  display={item.confirmTooltipVisible}
                                  confirm={e => this.deleteAddress(item)}
                                  updateChildDisplay={status => this.updateConfirmTooltipVisible(item, status)} />
                              {/* <a className="address-click-btn"><FormattedMessage id="delete" /></a> */}
                            </div>
                            <div className="col-lg-12" style={{fontSize:'12px'}}>
                              <div>
                                <span>{item.consigneeNumber}</span>
                              </div>
                              <div>
                                <span>{this.getDictValue(this.state.countryList, item.countryId)}</span>
                              </div>
                              <div>
                                <span>{this.getDictValue(this.state.cityList, item.cityId)}</span>
                              </div>
                              <div>
                                <span>{item.address1}</span>
                              </div>
                            </div>
                            

                            {/* <div className="col-lg-3">
                              <FormattedMessage id="edit" />
                              <span className="dividing-action"></span>
                              <FormattedMessage id="delete" />
                            </div> */}
                            {/* <div className="ant-col-20 form-info">
                              <form className="ant-form ant-form-horizontal">

                                <div className="ant-row ant-form-item">
                                  <div className="ant-col-0 ant-form-item-label">
                                    <FormattedMessage id="Name">
                                      {(txt) => (
                                        <label className="" title={txt}>{txt}</label>
                                      )}
                                    </FormattedMessage>
                                  </div>
                                  <div className="ant-col-24 ant-form-item-control-wrapper">
                                    <div className="ant-form-item-control ">
                                      <span>{item.consigneeName}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="ant-row ant-form-item">
                                  <div className="ant-col-0 ant-form-item-label">
                                    <FormattedMessage id="payment.phoneNumber">
                                      {(txt) => (
                                        <label className="" title={txt}>{txt}</label>
                                      )
                                      }
                                    </FormattedMessage>
                                  </div>
                                  <div className="ant-col-24 ant-form-item-control-wrapper">
                                    <div className="ant-form-item-control ">
                                      <span>{item.consigneeNumber}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="ant-row ant-form-item">
                                  <div className="ant-col-0 ant-form-item-label">
                                    <FormattedMessage id="payment.country">
                                      {(txt) => (
                                        <label className="" title={txt}>{txt}</label>
                                      )
                                      }
                                    </FormattedMessage>
                                  </div>
                                  <div className="ant-col-24 ant-form-item-control-wrapper">
                                    <div className="ant-form-item-control ">
                                      <span>{this.getDictValue(this.state.countryList, item.countryId)}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="ant-row ant-form-item">
                                  <div className="ant-col-0 ant-form-item-label">
                                    <FormattedMessage id="payment.city">
                                      {(txt) => (
                                        <label className="" title={txt}>{txt}</label>
                                      )
                                      }
                                    </FormattedMessage>
                                  </div>
                                  <div className="ant-col-24 ant-form-item-control-wrapper">
                                    <div className="ant-form-item-control ">
                                      <span>{this.getDictValue(this.state.cityList, item.cityId)}</span>
                                    </div>
                                  </div>
                                </div>


                                <div className="ant-row ant-form-item">
                                  <div className="ant-col-0 ant-form-item-label">
                                    <FormattedMessage id="payment.address1">
                                      {(txt) => (
                                        <label className="" title={txt}>{txt}</label>
                                      )
                                      }
                                    </FormattedMessage>
                                  </div>
                                  <div className="ant-col-24 ant-form-item-control-wrapper">
                                    <div className="ant-form-item-control ">
                                      <span>{item.address1}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="ant-row ant-form-item">
                                  <div className="ant-col-0 ant-form-item-label">
                                    <FormattedMessage id="addressType">
                                      {(txt) => (
                                        <label className="" title={txt}>{txt}</label>
                                      )
                                      }
                                    </FormattedMessage>
                                  </div>
                                  <div className="ant-col-24 ant-form-item-control-wrapper">
                                    <div className="ant-form-item-control ">
                                      <span>{item.type}</span>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="ant-col-4 card-action">
                              <span className="card-action-delete">
                                <a onClick={() => this.updateConfirmTooltipVisible(item, true)}>×</a>
                                <ConfirmTooltip
                                  display={item.confirmTooltipVisible}
                                  confirm={e => this.deleteAddress(item)}
                                  updateChildDisplay={status => this.updateConfirmTooltipVisible(item, status)} />
                              </span>

                              <div className="card-action-link">
                                <a onClick={() => this.openEditPage(item.deliveryAddressId)}>
                                  <FormattedMessage id="edit" ></FormattedMessage>
                                </a>
                              </div>
                            </div>
                           */}
                          </div>
                        </div>

                      ))
                    }
                  </div>

                  
                </div>

              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default injectIntl(ShippingAddress);