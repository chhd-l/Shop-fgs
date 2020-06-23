import React from "react"
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import Modal from '@/components/Modal'
import { FormattedMessage } from 'react-intl'
import { formatMoney, getDictionary } from "@/utils/utils"
import { find, findIndex } from 'lodash'
import { getOrderDetails, cancelOrder, getPayRecord, returnFindByTid } from "@/api/order"
import {
  IMG_DEFAULT,
  DELIVER_STATUS_ENUM,
  ORDER_STATUS_ENUM,
  PAY_STATUS_ENUM
} from '@/utils/constant'
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import './index.css'

class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      creditCardImgObj: {
        VISA: visaImg,
        MASTERCARD: mastercardImg,
        "AMERICAN EXPRESS": amexImg,
        DISCOVER: discoverImg,
      },
      orderNumber: '',
      details: null,
      payRecord: null,
      loading: true,
      cancelOrderLoading: false,
      returnOrExchangeLoading: false,
      errMsg: '',

      cancelOrderModalVisible: false,
      operateSuccessModalVisible: false,
      errModalVisible: false,
      returnOrExchangeModalVisible: false,
      errModalText: '',
      cityList: [],
      countryList: [],
      progressList: [
        {
          backendName: 'Create Order',
          displayName: 'Create'
        },
        {
          backendName: 'Order payment',
          displayName: 'Paid'
        },
        {
          backendName: 'DELIVERED',
          displayName: 'Delivered'
        },
        {
          backendName: 'COMPLETED',
          displayName: 'Completed'
        }
      ],
      currentProgerssIndex: -1
    }
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    this.setState({
      orderNumber: this.props.match.params.orderNumber
    }, () => {
      this.init()
    })
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
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  matchNamefromDict (dictList, id) {
    return find(dictList, ele => ele.id == id)
      ? find(dictList, ele => ele.id == id).name
      : id
  }
  init () {
    const { orderNumber, progressList } = this.state
    this.setState({ loading: true })
    getOrderDetails(orderNumber)
      .then(res => {
        let tmpIndex = -1
        const tradeEventLogs = res.context.tradeEventLogs || []
        if (tradeEventLogs.length) {
          tmpIndex = findIndex(progressList, ele => tradeEventLogs[0].eventType.includes(ele.backendName))
          Array.from(progressList, item => {
            const tpm = find(tradeEventLogs, ele => ele.eventType.includes(item.backendName))
            if (tpm) {
              item.time1 = tpm.eventTime.substr(0, 10)
              item.time2 = tpm.eventTime.substr(11, 8)
            }
            return item
          })
        }
        this.setState({
          details: res.context,
          loading: false,
          currentProgerssIndex: tmpIndex,
          progressList: progressList
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          errMsg: err.toString()
        })
      })

    getPayRecord(orderNumber)
      .then(res => {
        this.setState({
          payRecord: res.context
        })
      })
  }
  async hanldeItemClick (afterSaleType) {
    // 退单都完成了，才可继续退单
    this.setState({ returnOrExchangeLoading: true })
    let res = await returnFindByTid(this.state.orderNumber)
    let unloadItem = find(res.context, ele =>
      ele.returnFlowState === 'INIT'
      || ele.returnFlowState === 'AUDIT'
      || ele.returnFlowState === 'DELIVERED'
      || ele.returnFlowState === 'RECEIVED')
    if (unloadItem) {
      this.setState({
        returnOrExchangeModalVisible: true,
        returnOrExchangeLoading: false
      })
    } else {
      sessionStorage.setItem('rc-after-sale-type', afterSaleType)
      this.props.history.push(`/account/orders-aftersale/${this.state.orderNumber}`)
    }
  }
  handleCancelOrder () {
    this.setState({ cancelOrderLoading: true })
    cancelOrder(this.state.orderNumber)
      .then(res => {
        this.setState({
          cancelOrderLoading: false,
          cancelOrderModalVisible: false,
          operateSuccessModalVisible: true
        })
        this.init()
      })
      .catch(err => {
        this.setState({
          cancelOrderLoading: false,
          errModalText: err.toString(),
          cancelOrderModalVisible: false,
          errModalVisible: true
        })
      })
  }
  returnOrExchangeBtnJSX () {
    const { details } = this.state
    let ret = <span />
    if (details.tradeState.deliverStatus === 'SHIPPED'
      && details.tradeState.flowState === 'COMPLETED') {
      return <>
        <a className="color-999 ui-cursor-pointer" title="More" data-tooltip-placement="bottom" data-tooltip="bottom-tooltip">•••</a>
        <div id="bottom-tooltip" className="rc-tooltip text-left pl-1 pr-1">
          <div
            className={`border-bottom p-1 ui-cursor-pointer ${this.props.returnOrExchangeLoading ? 'ui-btn-loading ui-btn-loading-border-red' : ''}`}
            onClick={() => this.hanldeItemClick('exchange')}>
            <FormattedMessage id="order.return" />
          </div>
          <div
            className={`p-1 ui-cursor-pointer ${this.props.returnOrExchangeLoading ? 'ui-btn-loading ui-btn-loading-border-red' : ''}`}
            onClick={() => this.hanldeItemClick('return')}>
            <FormattedMessage id="order.exchange" />
          </div>
        </div>
      </>
    }
    return ret
  }
  cancelOrderBtnJSX () {
    const { details } = this.state
    let ret = <span />
    if (new Date().getTime() < new Date(details.orderTimeOut).getTime()
      && details.tradeState.flowState === 'AUDIT'
      && details.tradeState.deliverStatus === 'NOT_YET_SHIPPED') {
      ret = <>
        <a className="color-999 ui-cursor-pointer" title="More" data-tooltip-placement="bottom" data-tooltip="bottom-tooltip">•••</a>
        <div id="bottom-tooltip" className="rc-tooltip text-left pl-1 pr-1">
          <div
            className={`p-1 ui-cursor-pointer ${this.props.returnOrExchangeLoading ? 'ui-btn-loading ui-btn-loading-border-red' : ''}`}
            onClick={() => { this.setState({ cancelOrderModalVisible: true }) }}>
            <FormattedMessage id="order.cancelOrder" />
          </div>
        </div>
      </>
    }
    return ret
  }
  render () {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    }
    const { details, payRecord, currentProgerssIndex } = this.state
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" />
              <div className="my__account-content rc-column rc-quad-width">
                <div className="row justify-content-center">
                  <div className="order_listing_details col-12 no-padding">
                    <div className="card confirm-details orderDetailsPage ml-0 mr-0">
                      {this.state.loading
                        ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
                        : details
                          ? <div className="card-body p-0">
                            {
                              currentProgerssIndex > -1
                                ? <>
                                  <div className="rc-progress-stepped order-progress">
                                    <ol className="rc-list d-flex order-progress-mb">
                                      {
                                        this.state.progressList.map((item, i) => (
                                          <li
                                            key={i}
                                            className={`rc-list__item rc-progress-stepped__item ${i < currentProgerssIndex ? 'rc-complete' : i == currentProgerssIndex ? 'rc-current' : ''}`}>
                                            <span className="rc-progress-stepped__link">
                                              {i + 1}
                                              <br />
                                              <span className="order-progress-text md-up">
                                                {item.displayName}<br />{item.time1}&nbsp;{item.time2}
                                              </span>
                                              <span className="order-progress-text md-down">
                                                {item.displayName}<br />{item.time1}&nbsp;<br />{item.time2}&nbsp;
                                            </span>
                                            </span>
                                          </li>
                                        ))
                                      }
                                    </ol>
                                    <ol> </ol>
                                  </div>
                                  <hr className="rc-margin-top---none" />
                                </>
                                : null
                            }
                            <div className="d-flex justify-content-between align-items-center flex-wrap ml-4 mr-4">
                              <div className="">
                                <FormattedMessage id="order.orderNumber" />:<br />
                                <span className="medium">{this.state.orderNumber}</span>
                              </div>
                              <div>
                                <FormattedMessage id="order.orderDate" />:<br />
                                <span className="medium">{details.tradeState.createTime.substr(0, 10)}</span>
                              </div>
                              <div className="text-center">
                                <FormattedMessage id="order.orderStatus" />:<br />
                                <span className="medium">{ORDER_STATUS_ENUM[details.tradeState.flowState] || details.tradeState.flowState}</span>
                              </div>
                              <div className="text-center">
                                <FormattedMessage id="payment.clinicTitle3" />:<br />
                                <span className="medium">{details.clinicsName}</span>
                              </div>
                              {/* {this.returnOrExchangeBtnJSX()} */}
                              {/* {this.cancelOrderBtnJSX()} */}
                            </div>
                            <hr className="rc-margin-top---none" />
                            <div className="order__listing">
                              <div className="order-list-container">
                                <div className="card-container mt-0 border-0 pl-2 pr-2">
                                  {details.tradeItems.map((item, i) => (
                                    <div className={`row align-items-center ${i ? 'pt-3' : ''} ${i !== details.tradeItems.length - 1 ? 'pb-3' : ''}`} key={i}>
                                      <div className="col-12 col-md-4 d-flex">
                                        <img
                                          className="img-fluid"
                                          src={item.pic || IMG_DEFAULT}
                                          alt={item.spuName}
                                          title={item.spuName} />
                                        <span className="ml-1">
                                          <span
                                            className="medium ui-text-overflow-line2 text-break"
                                            title={item.spuName}>
                                            {item.spuName}
                                          </span><br />
                                          {item.specDetails}
                                        </span>
                                      </div>
                                      <div className="col-9 col-md-3 text-right text-md-left">
                                        {item.num} x
                                      </div>
                                      <div className="col-3 col-md-4 text-right text-md-left">
                                        {formatMoney(item.price)}
                                      </div>
                                      <div className="col-12 col-md-1 text-right text-md-left text-nowrap">
                                        {formatMoney(item.price * item.num)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <hr className="rc-margin-top---none" />
                            <div className="row pt-2 pb-2" style={{ lineHeight: 1.7 }}>
                              <div className="col-9 col-xxl-11 text-right color-999">
                                <FormattedMessage id="total" />
                              </div>
                              <div className="col-3 col-xxl-1 medium text-nowrap">{formatMoney(details.tradePrice.originPrice)}</div>
                              {
                                details.tradePrice.discountsPrice
                                  ? <>
                                    <div className="col-9 col-xxl-11 text-right color-999 red">
                                      <FormattedMessage id="promotion" />
                                    </div>
                                    <div className="col-3 col-xxl-1 red medium text-nowrap">-{formatMoney(details.tradePrice.discountsPrice)}</div>
                                  </>
                                  : null
                              }
                              <div className="col-9 col-xxl-11 text-right color-999">
                                <FormattedMessage id="shipping" />
                              </div>
                              <div className="col-3 col-xxl-1 medium text-nowrap">{formatMoney(0)}</div>
                              <div className="col-9 col-xxl-11 text-right color-999">
                                <FormattedMessage id="totalIncluIVA" />
                              </div>
                              <div className="col-3 col-xxl-1 medium text-nowrap">{formatMoney(details.tradePrice.totalPrice)}</div>
                            </div>
                            <hr className="rc-margin-top---none" />
                            <div className="row ml-2 mr-2">
                              <div className="col-12 col-md-4 mb-2">
                                <i className="rc-icon rc-delivery--sm rc-brand1 m-1" />
                                <FormattedMessage id="delivery2" />
                                <div className="ml-1">
                                  <span className="medium">{details.consignee.name}</span><br />
                                  {details.consignee.postCode}, {details.consignee.phone}<br />
                                  {this.matchNamefromDict(this.state.countryList, details.consignee.countryId)}{' '}{this.matchNamefromDict(this.state.cityList, details.consignee.cityId)}<br />
                                  {details.consignee.detailAddress1}<br />
                                  {details.consignee.detailAddress2}{details.consignee.detailAddress2 ? <br /> : null}
                                  {details.consignee.rfc}{details.consignee.rfc ? <br /> : null}
                                  {details.buyerRemark}
                                </div>
                              </div>
                              <div className="col-12 col-md-4 mb-2">
                                <i className="rc-icon rc-rewind rc-billing rc-brand1" />
                                <FormattedMessage id="billing" />
                                <div className="ml-1">
                                  <span className="medium">{details.invoice.contacts}</span><br />
                                  {details.invoice.postCode}, {details.invoice.phone}<br />
                                  {this.matchNamefromDict(this.state.countryList, details.invoice.countryId)}{' '}{this.matchNamefromDict(this.state.cityList, details.invoice.cityId)}<br />
                                  {details.invoice.address1}<br />
                                  {details.invoice.address2}{details.invoice.address2 ? <br /> : null}
                                  {details.invoice.rfc}{details.invoice.rfc ? <br /> : null}
                                </div>
                              </div>
                              <div className="col-12 col-md-4 mb-2">
                                {
                                  payRecord
                                    ? <>
                                      <i className="rc-icon rc-payment--sm rc-brand1 m-1" />
                                      <FormattedMessage id="payment.payment" />
                                      <div className="ml-1">
                                        <img
                                          className="d-inline-block mr-1"
                                          style={{ width: '10%' }}
                                          src={
                                            this.state.creditCardImgObj[payRecord.vendor]
                                              ? this.state.creditCardImgObj[payRecord.vendor]
                                              : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                          } />
                                        <span className="medium">********{payRecord.last4Digits}</span><br />
                                        {payRecord.accountName}<br />
                                        {payRecord.phone}<br />
                                        {payRecord.email}
                                      </div>
                                    </>
                                    : null
                                }
                              </div>
                            </div>
                          </div>
                          : this.state.errMsg
                            ? <div className="text-center mt-5">
                              <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                              {this.state.errMsg}
                            </div>
                            : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            key="1"
            visible={this.state.cancelOrderModalVisible}
            confirmLoading={this.state.cancelOrderLoading}
            modalText={<FormattedMessage id="order.confirmCancelOrderInfo" />}
            close={() => { this.setState({ cancelOrderModalVisible: false }) }}
            hanldeClickConfirm={() => this.handleCancelOrder()} />
          <Modal
            key="2"
            visible={this.state.operateSuccessModalVisible}
            modalText={<FormattedMessage id="operateSuccessfully" />}
            close={() => { this.setState({ operateSuccessModalVisible: false }) }}
            hanldeClickConfirm={() => { this.props.history.push('/account/orders') }} />
          <Modal
            key="3"
            visible={this.state.errModalVisible}
            modalText={this.state.errModalText}
            close={() => { this.setState({ errModalVisible: false }) }}
            hanldeClickConfirm={() => { this.setState({ errModalVisible: false }) }} />
          <Modal
            key="4"
            visible={this.state.returnOrExchangeModalVisible}
            modalText={<FormattedMessage id="order.refundErrorInfo" />}
            close={() => { this.setState({ returnOrExchangeModalVisible: false }) }}
            hanldeClickConfirm={() => { this.setState({ returnOrExchangeModalVisible: false }) }} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default AccountOrders