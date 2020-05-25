import React from "react"
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import OrderFilters from './modules/filters'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';
import { formatMoney, getPreMonthDay, dateFormat } from "@/utils/utils"
import { getOrderList } from "@/api/order"

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      orderList: [],
      form: {
        pageSize: 6,
        orderNumber: '',
        startdate: '',
        enddate: ''
      },
      loading: false,
      currentPage: 1,
      totalPage: 1,
      initing: true
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

    this.queryOrderList()
  }
  handlePrevOrNextPage (type) {
    const { currentPage, totalPage } = this.state
    let res
    if (type === 'prev') {
      if (currentPage <= 1) {
        return
      }
      res = currentPage - 1
    } else {
      if (currentPage >= totalPage) {
        return
      }
      res = currentPage + 1
    }
    this.setState({ currentPage: res }, () => this.queryOrderList())
  }
  handleCurrentPageNumChange (e) {
    const val = e.target.value
    if (val === '') {
      this.setState({ currentPage: val })
    } else {
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      if (tmp > this.state.totalPage) {
        tmp = this.state.totalPage
      } else if (tmp < 1) {
        tmp = 1
      }
      if (tmp !== this.state.currentPage) {
        this.setState({ currentPage: tmp }, () => this.queryOrderList())
      }
    }
  }
  queryOrderList () {
    const { form, initing, currentPage } = this.state

    if (!initing) {
      const widget = document.querySelector('#J_order_list')
      if (widget) {
        setTimeout(() => {
          window.scrollTo(0, widget.offsetTop);
        }, 0)
      }
    }

    let param = {
      keywords: form.orderNumber,
      createdFrom: form.startdate ? form.startdate.split('/').join('-') : '',
      createdTo: form.enddate ? form.enddate.split('/').join('-') : dateFormat('YYYY-mm-dd', new Date()),
      pageNum: currentPage - 1,
      pageSize: form.pageSize
    }
    getOrderList(param)
      .then(res => {
        this.setState({
          orderList: res.context.content,
          currentPage: res.context.pageable.pageNumber + 1,
          totalPage: res.context.totalPages,
          loading: false,
          initing: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
  }
  updateFilterData (form) {
    this.setState({
      form: Object.assign({}, this.state.form, form),
      currentPage: 1
    }, () => this.queryOrderList())
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    sessionStorage.setItem('rc-token', 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNpkjs0KgzAQhN9lzyLZTcyPtx576StITFYQapXGSEF898ZD6UHmMsx8MLNDyj20gI1Aa4x2WkMFo1-hxcY6p6SyuoKQ0zpP_L7Hwg6DFUVoCK1Q7EVx1GMTA2uBvYE_fwthzq_1MvDrH37i6_pyRoS1NDWSq40o4eafmTsfI8cu8XsbA6eC7Ufp-LOcdx1pklLR8QUAAP__.X3LQwtSBKGdCU8BvzIxJNxZ9b-XidSFcLYhl3YmIe2M')
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none">
                    <FormattedMessage id="order.historyOfOrders" />
                  </h4>
                </div>
                <OrderFilters updateFilterData={form => this.updateFilterData(form)} />
                <div className="order__listing" id="J_order_list">
                  <div className="order-list-container">
                    {
                      this.state.loading
                        ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} />
                        : this.state.orderList.length
                          ? <React.Fragment>
                            {this.state.orderList.map(order => (
                              <div className="card-container" key={order.id}>
                                <div className="card rc-margin-y--none ml-0" style={{ border: '0!important', padding: 0 }}>
                                  <div className="card-header row rc-margin-x--none align-items-center">
                                    <div className="col-12 col-md-3">
                                      <p><FormattedMessage id="order.orderDate" />: <br className="d-none d-md-block" /> <span className="medium orderHeaderTextColor">{order.tradeState.createTime.substr(0, 10)}</span></p>
                                    </div>
                                    <div className="col-12 col-md-3">
                                      <p><FormattedMessage id="order.orderNumber" />: <br className="d-none d-md-block" /> <span className="medium orderHeaderTextColor">{order.id}</span></p>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      <p><FormattedMessage id="order.orderStatus" /></p>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      <p><FormattedMessage id="order.shippingStatus" /></p>
                                    </div>
                                    <div className="col-12 col-md-2 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                                      <button className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn">
                                        <Link
                                          className="medium pull-right--desktop rc-styled-link rc-padding-top--xs"
                                          to={`/account/orders-detail/${order.id}`}>
                                          <FormattedMessage id="order.orderDetails" />
                                        </Link>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="row rc-margin-x--none row align-items-center" style={{ padding: '1rem 0' }}>
                                  <div className="col-12 col-md-6">
                                    {order.tradeItems.map(item => (
                                      <img
                                        className="img-fluid"
                                        key={item.oid}
                                        src={item.pic}
                                        alt={item.spuName}
                                        title={item.spuName} />
                                    ))}
                                  </div>
                                  <div className="col-12 col-md-2">
                                    {order.tradeState.flowState}
                                  </div>
                                  <div className="col-12 col-md-2">
                                    {order.tradeState.deliverStatus}
                                  </div>
                                  <div className="col-12 col-md-1 text-right">
                                    {formatMoney(order.tradeItems.reduce((total, item) => total + item.splitPrice, 0))}
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="grid-footer rc-full-width">
                              <nav className="rc-pagination rc-padding--s no-padding-left no-padding-right">
                                <div className="rc-pagination__form">
                                  <div
                                    className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                                    onClick={() => this.handlePrevOrNextPage('prev')}></div>
                                  {/* <div
                              className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                              onClick={this.handlePrevOrNextPage('prev')}></div> */}
                                  <div className="rc-pagination__steps">
                                    <input
                                      type="text"
                                      className="rc-pagination__step rc-pagination__step--current"
                                      value={this.state.currentPage}
                                      onChange={() => this.handleCurrentPageNumChange()} />
                                    <div className="rc-pagination__step rc-pagination__step--of">
                                      <FormattedMessage id="of" /> <span>{this.state.totalPage}</span>
                                    </div>
                                  </div>

                                  <span
                                    className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"
                                    onClick={() => this.handlePrevOrNextPage('next')}></span>
                                </div>
                              </nav>
                            </div>
                          </React.Fragment>
                          : <div className="text-center mt-5">
                            <span class="rc-icon rc-incompatible--xs rc-iconography"></span>
                            <FormattedMessage id="order.noDataTip" />
                          </div>
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