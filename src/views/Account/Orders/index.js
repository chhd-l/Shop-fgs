import React from "react"
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import TimeCount from '@/components/TimeCount'
import Selection from '@/components/Selection'
import Pagination from '@/components/Pagination'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';
import { formatMoney, getPreMonthDay, dateFormat } from "@/utils/utils"
import { getOrderList, getOrderDetails } from "@/api/order"
import {
  IMG_DEFAULT,
  DELIVER_STATUS_ENUM,
  ORDER_STATUS_ENUM,
  PAY_STATUS_ENUM
} from '@/utils/constant'
import './index.css'

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: [],
      form: {
        duringTime: '7d',
        orderNumber: '',
        startdate: '',
        enddate: ''
      },
      loading: true,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: '',
      duringTimeOptions: [
        { value: '7d', name: <FormattedMessage id="order.lastXDays" values={{ val: 7 }} /> },
        { value: '30d', name: <FormattedMessage id="order.lastXDays" values={{ val: 30 }} /> },
        { value: '3m', name: <FormattedMessage id="order.lastXMonths" values={{ val: 3 }} /> },
        { value: '6m', name: <FormattedMessage id="order.lastXMonths" values={{ val: 6 }} /> }
      ]
    }

    this.pageSize = 6
  }
  componentWillUnmount () {
    
  }
  componentDidMount () {

    this.queryOrderList()
  }
  handleDuringTimeChange (data) {
    const { form } = this.state
    form.duringTime = data.value
    this.setState({
      form: form,
      currentPage: 1
    }, () => this.queryOrderList())
  }
  handleInputChange (e) {
    const target = e.target
    const { form } = this.state
    form[target.name] = target.value
    this.setState({ form: form })
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.queryOrderList()
    }, 500)
  }
  queryOrderList () {
    const { form, initing, currentPage } = this.state
    if (!initing) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 0)
    }
    let createdFrom = ''
    this.setState({ loading: true })
    let now = dateFormat('YYYY-mm-dd', new Date())
    if (form.duringTime.includes('d')) {
      let now2 = new Date()
      now2.setDate(now2.getDate() - parseInt(form.duringTime))
      createdFrom = dateFormat('YYYY-mm-dd', now2)
    } else if (form.duringTime.includes('m')) {
      createdFrom = getPreMonthDay(now, parseInt(form.duringTime))
    }
    let param = {
      createdFrom,
      createdTo: now,
      keywords: form.orderNumber,
      pageNum: currentPage - 1,
      pageSize: this.pageSize
    }
    getOrderList(param)
      .then(res => {
        let tmpList = Array.from(res.context.content, ele => {
          const tradeState = ele.tradeState
          return Object.assign(ele,
            {
              canPayNow: tradeState.flowState === 'AUDIT'
                && tradeState.deliverStatus === 'NOT_YET_SHIPPED'
                && tradeState.payState === 'NOT_PAID'
                && new Date(ele.orderTimeOut).getTime() > new Date().getTime(),
              payNowLoading: false
            }
          )
        }
        )
        this.setState({
          orderList: tmpList,
          currentPage: res.context.pageable.pageNumber + 1,
          totalPage: res.context.totalPages,
          loading: false,
          initing: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          errMsg: err.toString(),
          initing: false
        })
      })
  }
  hanldePageNumChange (params) {
    this.setState({
      currentPage: params.currentPage
    }, () => this.queryOrderList())
  }
  updateFilterData (form) {
    this.setState({
      form: Object.assign({}, this.state.form, form),
      currentPage: 1
    }, () => this.queryOrderList())
  }
  handlePayNowTimeEnd (order) {
    const { orderList } = this.state
    order.canPayNow = false
    this.setState({ orderList: orderList })
  }
  async handleClickPayNow (order) {
    const { orderList } = this.state
    order.payNowLoading = true
    this.setState({ orderList: orderList })
    const tradeItems = order.tradeItems.map(ele => {
      return {
        goodsInfoImg: ele.pic,
        goodsName: ele.spuName,
        specText: ele.specDetails,
        buyCount: ele.num,
        salePrice: ele.price,
        goodsInfoId: ele.skuId
      }
    })
    try {
      const detailRes = await getOrderDetails(order.id)
      debugger
      const detailResCt = detailRes.context
      const tmpDeliveryAddress = {
        firstName: detailResCt.consignee.firstName,
        lastName: detailResCt.consignee.lastName,
        address1: detailResCt.consignee.detailAddress1,
        address2: detailResCt.consignee.detailAddress2,
        rfc: detailResCt.consignee.rfc,
        country: detailResCt.consignee.countryId ? detailResCt.consignee.countryId.toString() : '',
        city: detailResCt.consignee.cityId ? detailResCt.consignee.cityId.toString() : '',
        postCode: detailResCt.consignee.postCode,
        phoneNumber: detailResCt.consignee.phone,
        addressId: detailResCt.consignee.id
      }
      const tmpBillingAddress = {
        firstName: detailResCt.invoice.firstName,
        lastName: detailResCt.invoice.lastName,
        address1: detailResCt.invoice.address1,
        address2: detailResCt.invoice.address2,
        rfc: detailResCt.invoice.rfc,
        country: detailResCt.invoice.countryId ? detailResCt.invoice.countryId.toString() : '',
        city: detailResCt.invoice.cityId ? detailResCt.invoice.cityId.toString() : '',
        postCode: detailResCt.invoice.postCode,
        phoneNumber: detailResCt.invoice.phone,
        addressId: detailResCt.invoice.addressId
      }
      localStorage.setItem("loginDeliveryInfo", JSON.stringify({
        deliveryAddress: tmpDeliveryAddress,
        billingAddress: tmpBillingAddress,
        commentOnDelivery: detailResCt.buyerRemark
      }))
      localStorage.setItem("rc-cart-data-login", JSON.stringify(tradeItems))
      sessionStorage.setItem('rc-tid', order.id)
      sessionStorage.setItem('rc-totalInfo', JSON.stringify({
        totalPrice: order.tradePrice.totalPrice,
        tradePrice: order.tradePrice.originPrice,
        discountPrice: order.tradePrice.discountsPrice
      }))
      this.props.history.push('/payment/payment')
    } catch (err) {
      console.log(err)
    } finally {
      order.payNowLoading = true
      this.setState({ orderList: orderList })
    }
  }
  render () {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none pb-2">
                    <FormattedMessage id="order.historyOfOrders" />
                  </h4>
                </div>
                <div className="row justify-content-around">
                  <div className="col-12 col-md-5 row align-items-center mt-2 mt-md-0">
                    <div className="col-md-4">
                      <FormattedMessage id="order.orderNumber" />
                    </div>
                    <div className="col-md-8">
                      <span className="rc-input rc-input--inline rc-full-width">
                        <input
                          className="rc-input__control"
                          id="id-text8"
                          type="text"
                          name="orderNumber"
                          maxLength="20"
                          value={this.state.form.orderNumber}
                          onChange={e => this.handleInputChange(e)} />
                        <label className="rc-input__label" htmlFor="id-text8">
                          <span className="rc-input__label-text">
                            <FormattedMessage id="order.inputOrderNumberTip" />
                          </span>
                        </label>
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-5 row align-items-center mt-2 mt-md-0">
                    <div className="col-12">
                      <div className="rc-full-width rc-select-processed">
                        <Selection
                          optionList={this.state.duringTimeOptions}
                          selectedItemChange={data => this.handleDuringTimeChange(data)}
                          selectedItemData={{
                            value: this.state.form.duringTime
                          }}
                          customStyleType="select-one" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order__listing">
                  <div className="order-list-container">
                    {
                      this.state.loading
                        ? <div className="mt-4"><Skeleton color="#f5f5f5" width="100%" height="50%" count={4} /></div>
                        : this.state.errMsg
                          ? <div className="text-center mt-5">
                            <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                            {this.state.errMsg}
                          </div>
                          : this.state.orderList.length
                            ? <>
                              {this.state.orderList.map(order => (
                                <div className="card-container" key={order.id}>
                                  <div className="card rc-margin-y--none ml-0">
                                    <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0">
                                      <div className="col-12 col-md-2">
                                        <p><FormattedMessage id="order.orderDate" />: <br className="d-none d-md-block" /> <span className="medium orderHeaderTextColor">{order.tradeState.createTime.substr(0, 10)}</span></p>
                                      </div>
                                      <div className="col-12 col-md-2 mb-2 mb-md-0">
                                        <p className="text-nowrap"><FormattedMessage id="order.orderNumber" />: <br className="d-none d-md-block" /> <span className="medium orderHeaderTextColor">{order.id}</span></p>
                                      </div>
                                      <div className="col-4 col-md-2">
                                        <p><FormattedMessage id="order.orderStatus" /></p>
                                      </div>
                                      <div className="col-4 col-md-2">
                                        <p><FormattedMessage id="order.shippingStatus" /></p>
                                      </div>
                                      <div className="col-4 col-md-2">
                                        <p><FormattedMessage id="order.paymentStatus" /></p>
                                      </div>
                                      <div className="col-12 col-md-2 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                                        <Link
                                          className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
                                          to={`/account/orders-detail/${order.id}`}>
                                          <span className="medium pull-right--desktop rc-styled-link rc-padding-top--xs">
                                            <FormattedMessage id="order.orderDetails" />
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row rc-margin-x--none row align-items-center" style={{ padding: '1rem 0' }}>
                                    <div className="col-8 col-md-2 d-flex flex-wrap mb-2 mb-md-0">
                                      {order.tradeItems.map(item => (
                                        <img
                                          className="img-fluid"
                                          key={item.oid}
                                          src={item.pic || IMG_DEFAULT}
                                          alt={item.spuName}
                                          title={item.spuName} />
                                      ))}
                                    </div>
                                    <div className="col-4 col-md-2 text-right text-md-left">
                                      {formatMoney(order.tradeItems.reduce((total, item) => total + item.splitPrice, 0))}
                                    </div>
                                    <div className="col-4 col-md-2">
                                      {ORDER_STATUS_ENUM[order.tradeState.flowState] || order.tradeState.flowState}
                                    </div>
                                    <div className="col-4 col-md-2">
                                      {DELIVER_STATUS_ENUM[order.tradeState.deliverStatus] || order.tradeState.deliverStatus}
                                    </div>
                                    <div className="col-4 col-md-2">
                                      {PAY_STATUS_ENUM[order.tradeState.payState] || order.tradeState.payState}
                                    </div>
                                    <div className="col-4 col-md-2 text-center">
                                      {
                                        order.canPayNow
                                          ? <React.Fragment>
                                            <TimeCount
                                              endTime={order.orderTimeOut}
                                              onTimeEnd={() => this.handlePayNowTimeEnd(order)} />
                                            <button
                                              className={`rc-btn rc-btn--one ${order.payNowLoading ? 'ui-btn-loading' : ''}`}
                                              style={{ transform: 'scale(.85)' }}
                                              onClick={() => this.handleClickPayNow(order)}>
                                              <FormattedMessage id="order.payNow" />
                                            </button>
                                          </React.Fragment>
                                          : null
                                      }
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                            : <div className="text-center mt-5">
                              <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                              <FormattedMessage id="order.noDataTip" />
                            </div>
                    }
                    {
                      this.state.errMsg
                        ? null
                        : <div className="grid-footer rc-full-width mt-2">
                          <Pagination
                            loading={this.state.loading}
                            totalPage={this.state.totalPage}
                            onPageNumChange={params => this.hanldePageNumChange(params)} />
                        </div>
                    }
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