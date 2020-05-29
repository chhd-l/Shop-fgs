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
      errMsg: '',

      cancelOrderModalVisible: false,
      operateSuccessModalVisible: false,
      errModalVisible: false,
      returnOrExchangeModalVisible: false,
      errModalText: ''
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
    let res = await returnFindByTid(this.state.orderNumber)
    let unloadItem = find(res.context, ele =>
      ele.returnFlowState === 'INIT'
      || ele.returnFlowState === 'AUDIT'
      || ele.returnFlowState === 'DELIVERED'
      || ele.returnFlowState === 'RECEIVED')
    if (unloadItem) {
      this.setState({
        returnOrExchangeModalVisible: true
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
      return <React.Fragment>
        <div className="d-flex justify-content-end">
          <button className="rc-btn rc-btn--two" onClick={() => this.hanldeItemClick('exchange')}>Return</button>
          <button className="rc-btn rc-btn--two" onClick={() => this.hanldeItemClick('return')}>Exchange</button>
        </div>
      </React.Fragment>
    }
    return ret
  }
  cancelOrderBtnJSX () {
    const { details } = this.state
    let ret = null
    if (new Date().getTime() < new Date(details.orderTimeOut).getTime()
      && details.tradeState.flowState === 'AUDIT'
      && details.tradeState.deliverStatus === 'NOT_YET_SHIPPED') {
      ret = <button className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn">
        <span
          className="mr-2 rc-styled-link"
          onClick={() => { this.setState({ cancelOrderModalVisible: true }) }}>Cancel order</span>
      </button>
    }
    return ret
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    const { details, payRecord, cancelOrderModalVisible } = this.state
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu />
              <div className="my__account-content rc-column rc-quad-width">
                <div className="row justify-content-center">
                  <div className="order_listing_details col-12 no-padding">
                    <div className="card confirm-details orderDetailsPage ml-0 mr-0">
                      {this.state.loading
                        ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
                        : details
                          ? <div className="card-body p-0">
                            <div className="ui-order-title d-flex justify-content-between align-items-center">
                              <div>
                                <span className="inlineblock">Order number:{this.state.orderNumber}</span>&nbsp;&nbsp;
                                <span className="inlineblock">Order time:{details.tradeState.createTime.substr(0, 19)}</span>&nbsp;&nbsp;
                                <span className="inlineblock">Order status:{details.tradeState.flowState}</span>
                              </div>
                              <div className="details-btn-group d-flex">
                                {/* 前台暂时不显示取消订单按钮 */}
                                {/* {this.cancelOrderBtnJSX()} */}
                              </div>
                            </div>
                            <div className="detail-title">
                              Order information
                            </div>
                            <div className="row">
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Receiver:
                                  </div>
                                <div className="col-8">
                                  {details.consignee.name}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Reference:
                                  </div>
                                <div className="col-8">
                                  {details.consignee.rfc}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Phone number:
                                  </div>
                                <div className="col-8">
                                  {details.consignee.phone}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Selected Clinic:
                                </div>
                                <div className="col-8">
                                  {details.clinicsId}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Postal code:
                                  </div>
                                <div className="col-8">
                                  {details.consignee.postCode}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Express method:
                                  </div>
                                <div className="col-8">
                                  {details.deliverWay}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Delivery address:
                                  </div>
                                <div className="col-8">
                                  {details.consignee.address}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Billing address:
                                  </div>
                                <div className="col-8">
                                  {details.invoice.address}
                                </div>
                              </div>
                              <div className="row col-6">
                                <div className="col-4 text-right color-999">
                                  Delivery comment:
                                  </div>
                                <div className="col-8">
                                  {details.buyerRemark}
                                </div>
                              </div>
                            </div>
                            {
                              payRecord
                                ? <React.Fragment>
                                  <div className="detail-title">
                                    Payment information
                                  </div>
                                  <div className="row">
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Payment time:
                                      </div>
                                      <div className="col-8">
                                        {details.tradeState.createTime}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Name:
                                        </div>
                                      <div className="col-8">
                                        {payRecord.accountName}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Payment status:
                                      </div>
                                      <div className="col-8">
                                        {details.tradeState.payState}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Email:
                                        </div>
                                      <div className="col-8">
                                        {payRecord.email}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Payment number:
                                        </div>
                                      <div className="col-8">
                                        {payRecord.chargeId}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Phone number :
                                        </div>
                                      <div className="col-8">
                                        {payRecord.phone}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Payment method:
                                        </div>
                                      <div className="col-8">
                                        {payRecord.paymentMethod}
                                      </div>
                                    </div>
                                    <div className="row col-6">
                                      <div className="col-4 text-right color-999">
                                        Card number:
                                        </div>
                                      <div className="col-8">
                                        {payRecord.last4Digits}
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                                : null
                            }
                            <div className="order__listing mt-4">
                              <div className="order-list-container">
                                <div className="card-container mt-0 border-0">
                                  <div className="card rc-margin-y--none">
                                    <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 border-0">
                                      <div className="col-12 col-md-6">
                                        <p>Product</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Price</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Quantity</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Subtotal</p>
                                      </div>
                                    </div>
                                  </div>
                                  {details.tradeItems.map((item, i) => (
                                    <div className="row rc-margin-x--none row align-items-center pt-2 pb-2 border-bottom" key={i}>
                                      <div className="col-12 col-md-6 d-flex pl-0 pr-0">
                                        <img
                                          className="img-fluid border"
                                          src={item.pic || IMG_DEFAULT}
                                          alt={item.spuName}
                                          title={item.spuName} />
                                        <div className="m-1 color-999">
                                          <span>{item.spuName}</span><br />
                                          {item.specDetails}
                                        </div>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.price)}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {item.num}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.splitPrice)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="row pt-2 pb-2 border-bottom" style={{ lineHeight: 1.7 }}>
                              <div className="col-9 text-right color-999">
                                Total:
                              </div>
                              <div className="col-2 text-right">{formatMoney(details.tradePrice.originPrice)}</div>
                              {
                                details.tradePrice.discountsPrice
                                  ? <React.Fragment>
                                    <div className="col-9 text-right color-999 red">
                                      <FormattedMessage id="promotion" />:
                                    </div>
                                    <div className="col-2 text-right red">-{formatMoney(details.tradePrice.discountsPrice)}</div>
                                  </React.Fragment>
                                  : null
                              }
                              <div className="col-9 text-right color-999">
                                Shipping:
                              </div>
                              <div className="col-2 text-right">{formatMoney(0)}</div>
                              <div className="col-9 text-right color-999">
                                Total (Inclu IVA):
                              </div>
                              <div className="col-2 text-right">{formatMoney(details.tradePrice.totalPrice)}</div>
                            </div>
                            <div className="detail-title">
                              Delivery Record
                            </div>
                            <div className="text-center">No data</div>
                            {this.returnOrExchangeBtnJSX()}
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
            modalText="No products can be returned or exchange."
            close={() => { this.setState({ returnOrExchangeModalVisible: false }) }}
            hanldeClickConfirm={() => { this.setState({ returnOrExchangeModalVisible: false }) }} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default AccountOrders