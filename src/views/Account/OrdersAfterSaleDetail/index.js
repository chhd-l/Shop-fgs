import React from "react"
import { FormattedMessage } from 'react-intl'
import Skeleton from 'react-skeleton-loader'
import { Link } from "react-router-dom"
import { getReturnDetails } from "@/api/order"
import { formatMoney } from "@/utils/utils"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'

export default class OrdersAfterSaleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      returnNumber: '',
      details: null,
      loading: true
    }
  }
  componentDidMount () {
    this.setState({
      returnNumber: this.props.match.params.returnNumber
    }, () => this.queryReturnDetails())
  }
  queryReturnDetails () {
    getReturnDetails(this.state.returnNumber)
      .then(res => {
        this.setState({
          details: res.context,
          loading: false
        })
      })
  }
  render () {
    const { details } = this.state
    return (
      <div>
        <Header showMiniIcons={true} location={this.props.location} />
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
                            <div className="ui-order-title d-flex justify-content-between">
                              <div>
                                <span className="inlineblock">
                                  Order number: {details.tid}
                                </span>&nbsp;&nbsp;
                                <span className="inlineblock">Return order number:{this.state.returnNumber}</span>&nbsp;&nbsp;
                                <span className="inlineblock">
                                  Application time: {details.createTime.substr(0, 19)}
                                </span>&nbsp;&nbsp;
                                <span className="inlineblock">
                                  Return order status: {details.refundStatus}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 color-999">Dear customer, your refund has been cancelled for the reason: {details.rejectReason}</div>
                            <div className="detail-title">
                              Refund information
                            </div>
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Reasons for return:
                                  </div>
                                  <div className="col-12 col-md-8">
                                    {details.returnReason['0']}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Chargeback attachment:
                                  </div>
                                  <div className="col-12 col-md-8 after-sale d-flex">
                                    {details.images.map((item, i) => (
                                      <div className="mr-1 mb-1 img-item" key={i}>
                                        <img src={JSON.parse(item).url} />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Return instructions:
                                  </div>
                                  <div className="col-12 col-md-8">
                                    {details.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="order__listing mt-4">
                              <div className="order-list-container">
                                <div className="card-container mt-0 border-0">
                                  <div className="card rc-margin-y--none">
                                    <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 border-0">
                                      <div className="col-12 col-md-4">
                                        <p>Returned goods</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Weight</p>
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
                                  {details.returnItems.map((item, i) => (
                                    <div className="row rc-margin-x--none row align-items-center pt-2 pb-2 border-bottom" key={i}>
                                      <div className="col-12 col-md-4 d-flex pl-0 pr-0">
                                        <img
                                          className="img-fluid border"
                                          src={item.pic}
                                          alt={item.skuName}
                                          title={item.skuName} />
                                        <div className="m-1 color-999">
                                          {item.skuName}
                                        </div>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {item.specDetails}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.price)}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {item.num}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.price * item.num)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* modal */}
          <div
            className={`modal-backdrop fade ${
              this.state.modalShow ? "show" : ""
              }`}
            style={{ display: this.state.modalShow ? "block" : "none", zIndex: 59 }}
          ></div>
          <div
            className={`modal fade ${this.state.modalShow ? "show" : ""}`}
            id="removeProductModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="removeProductLineItemModal"
            style={{ display: this.state.modalShow ? "block" : "none", overflow: 'hidden' }}
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header delete-confirmation-header">
                  <h4 className="modal-title" id="removeProductLineItemModal">
                    Cancel Order?
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => { this.setState({ modalShow: false }) }}
                  >
                    <span aria-hidden="true">
                      ×
                  </span>
                  </button>
                </div>
                <div className="modal-body delete-confirmation-body">
                  Do you really want to cancel the order?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-dismiss="modal"
                    onClick={() => { this.setState({ modalShow: false }) }}
                  >
                    <FormattedMessage id="cancel" />
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary cart-delete-confirmation-btn ${this.state.cancelOrderLoading ? 'ui-btn-loading' : ''}`}
                    data-dismiss="modal"
                    onClick={() => this.handleCancelOrder()}
                  >
                    <FormattedMessage id="yes" />
                  </button>
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