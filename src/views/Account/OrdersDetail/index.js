import React from "react"
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import Modal from '@/components/Modal'
import { FormattedMessage } from 'react-intl'
import { formatMoney } from "@/utils/utils"
import { find } from 'lodash'
import { getOrderDetails, cancelOrder, getPayRecord, returnFindByTid } from "@/api/order"
import { IMG_DEFAULT } from '@/utils/constant'
import './index.css'

class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

      showOperateBtn: false
    }
  }
  componentDidMount () {
    this.setState({
      orderNumber: this.props.match.params.orderNumber
    }, () => {
      this.init()
    })
  }
  init () {
    const { orderNumber } = this.state
    this.setState({ loading: true })
    getOrderDetails(orderNumber)
      .then(res => {
        this.setState({
          details: res.context,
          loading: false
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
          payRecord: res.context,
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
    let ret = null
    if (details.tradeState.deliverStatus === 'SHIPPED'
      && details.tradeState.flowState === 'COMPLETED') {
      this.setState({ showOperateBtn: true })
      return <>
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
      </>
    }
    return ret
  }
  cancelOrderBtnJSX () {
    const { details } = this.state
    let ret = null
    if (new Date().getTime() < new Date(details.orderTimeOut).getTime()
      && details.tradeState.flowState === 'AUDIT'
      && details.tradeState.deliverStatus === 'NOT_YET_SHIPPED') {
      this.setState({ showOperateBtn: true })
      ret = <div
        className={`p-1 ui-cursor-pointer ${this.props.returnOrExchangeLoading ? 'ui-btn-loading ui-btn-loading-border-red' : ''}`}
        onClick={() => { this.setState({ cancelOrderModalVisible: true }) }}>
        <FormattedMessage id="order.cancelOrder" />
      </div>
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
    const { details, payRecord } = this.state
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} location={this.props.location} history={this.props.history} />
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
                            <div className="d-flex justify-content-between align-items-center ml-4 mr-4">
                              <div>
                                <FormattedMessage id="order.orderDate" />:<br />
                                <span className="medium">{details.tradeState.createTime.substr(0, 10)}</span>
                              </div>
                              <div>
                                <FormattedMessage id="order:YourOrderNumber" />:<br />
                                <span className="medium">{this.state.orderNumber}</span>
                              </div>
                              <div className="text-center">
                                <FormattedMessage id="order.orderStatus" />:<br />
                                <span className="medium">{details.tradeState.flowState}</span>
                              </div>
                              <div className="text-center">
                                <FormattedMessage id="payment.clinicTitle" />:<br />
                                <span className="medium">{details.clinicsName}</span>
                              </div>
                              {
                                this.state.showOperateBtn
                                  ? <>
                                    <a className="color-999 ui-cursor-pointer" title="Bottom" data-tooltip-placement="bottom" data-tooltip="bottom-tooltip">•••</a>
                                    <div id="bottom-tooltip" class="rc-tooltip text-left pl-1 pr-1">
                                      {this.returnOrExchangeBtnJSX()}
                                      {this.cancelOrderBtnJSX()}
                                    </div>
                                  </>
                                  : <span></span>
                              }
                            </div>
                            <hr className="rc-margin-top---none" />
                            <div className="order__listing">
                              <div className="order-list-container">
                                <div className="card-container mt-0 border-0">
                                  {details.tradeItems.map((item, i) => (
                                    <div className={`row align-items-center pt-2 pb-2 ml-2 mr-2 ${i !== details.tradeItems.length - 1 ? 'border-bottom' : ''}`} key={i}>
                                      <div className="col-12 col-md-3 d-flex align-items-center justify-content-center">
                                        <span className="mr-5">{item.num} x</span>
                                        <img
                                          className="img-fluid"
                                          src={item.pic || IMG_DEFAULT}
                                          alt={item.spuName}
                                          title={item.spuName} />
                                      </div>
                                      <div className="col-12 col-md-5">
                                        <div className="m-1">
                                          <span className="medium">{item.spuName}</span><br />
                                          {item.specDetails}
                                        </div>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.price)}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.price * item.num)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <hr className="rc-margin-top---none" />
                            <div className="row pt-2 pb-2" style={{ lineHeight: 1.7 }}>
                              <div className="col-9 text-right color-999">
                                <FormattedMessage id="total" />:
                              </div>
                              <div className="col-2 text-right">{formatMoney(details.tradePrice.originPrice)}</div>
                              {
                                details.tradePrice.discountsPrice
                                  ? <>
                                    <div className="col-9 text-right color-999 red">
                                      <FormattedMessage id="promotion" />:
                                    </div>
                                    <div className="col-2 text-right red">-{formatMoney(details.tradePrice.discountsPrice)}</div>
                                  </>
                                  : null
                              }
                              <div className="col-9 text-right color-999">
                                <FormattedMessage id="shipping" />:
                              </div>
                              <div className="col-2 text-right">{formatMoney(0)}</div>
                              <div className="col-9 text-right color-999">
                                <FormattedMessage id="totalIncluIVA" />:
                              </div>
                              <div className="col-2 text-right">{formatMoney(details.tradePrice.totalPrice)}</div>
                            </div>
                            <hr className="rc-margin-top---none" />
                            <div className="detail-title">
                              <FormattedMessage id="order.orderInformation" />
                            </div>
                            <div className="row">
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="receiver" />:
                                </div>
                                <div className="col-8">
                                  {details.consignee.name}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="payment.rfc" />:
                                </div>
                                <div className="col-8">
                                  {details.consignee.rfc}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="payment.phoneNumber" />:
                                </div>
                                <div className="col-8">
                                  {details.consignee.phone}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="payment.postCode2" />:
                                </div>
                                <div className="col-8">
                                  {details.consignee.postCode}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="order.expressMethod" />:
                                </div>
                                <div className="col-8">
                                  {details.deliverWay}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="deliveryAddress" />:
                                </div>
                                <div className="col-8">
                                  {details.consignee.address}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="payment.billTitle" />:
                                </div>
                                <div className="col-8">
                                  {details.invoice.address}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  <FormattedMessage id="order.deliveryComment" />:
                                </div>
                                <div className="col-8">
                                  {details.buyerRemark}
                                </div>
                              </div>
                            </div>
                            {
                              payRecord
                                ? <>
                                  <div className="detail-title">
                                    <FormattedMessage id="payment.paymentInformation" />
                                  </div>
                                  <div className="row">
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="order.paymentTime" />:
                                      </div>
                                      <div className="col-8">
                                        {details.tradeState.createTime}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="name" />:
                                      </div>
                                      <div className="col-8">
                                        {payRecord.accountName}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="order.paymentStatus" />:
                                      </div>
                                      <div className="col-8">
                                        {details.tradeState.payState}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="email" />:
                                      </div>
                                      <div className="col-8">
                                        {payRecord.email}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="order.paymentNumber" />:
                                      </div>
                                      <div className="col-8">
                                        {payRecord.chargeId}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="payment.phoneNumber" />:
                                      </div>
                                      <div className="col-8">
                                        {payRecord.phone}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="paymentMethod" />:
                                      </div>
                                      <div className="col-8">
                                        {payRecord.paymentMethod}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        <FormattedMessage id="payment.cardNumber" />:
                                      </div>
                                      <div className="col-8">
                                        {payRecord.last4Digits}
                                      </div>
                                    </div>
                                  </div>
                                </>
                                : null
                            }
                            {/* <div className="detail-title">
                              Delivery Record
                            </div>
                            <div className="text-center">No data</div> */}
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
            modalText="Do you really want to cancel the order?"
            close={() => { this.setState({ cancelOrderModalVisible: false }) }}
            hanldeClickConfirm={() => this.handleCancelOrder()} />
          <Modal
            key="2"
            visible={this.state.operateSuccessModalVisible}
            modalText="Operate successfully!"
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
            modalText="This order is associated with a refund in processing and cannot be reapplied."
            close={() => { this.setState({ returnOrExchangeModalVisible: false }) }}
            hanldeClickConfirm={() => { this.setState({ returnOrExchangeModalVisible: false }) }} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default AccountOrders