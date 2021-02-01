import React from 'react';
//import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
//import { Link } from 'react-router-dom';
import { getReturnDetails } from '@/api/order';
import { formatMoney,setSeoConfig } from '@/utils/utils';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { IMG_DEFAULT } from '@/utils/constant';
import './index.css';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href

export default class OrdersAfterSaleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      returnNumber: '',
      details: null,
      loading: true
    };
  }
  componentDidMount() {
    this.setState(
      {
        returnNumber: this.props.match.params.returnNumber
      },
      () => this.queryReturnDetails()
    );
    setSeoConfig().then(res => {
      this.setState({seoConfig: res})
    });
  }
  queryReturnDetails() {
    getReturnDetails(this.state.returnNumber).then((res) => {
      this.setState({
        details: res.context,
        loading: false
      });
    });
  }
  render() {
    const { details } = this.state;
    const event = {
      page: {
        type: 'Account',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu />
              <div className="my__account-content rc-column rc-quad-width">
                <div className="row justify-content-center">
                  <div className="order_listing_details col-12 no-padding">
                    <div className="card confirm-details orderDetailsPage ml-0 mr-0">
                      {this.state.loading ? (
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={5}
                        />
                      ) : details ? (
                        <div className="card-body p-0">
                          <div className="ui-order-title d-flex justify-content-between">
                            <div>
                              <span className="inlineblock">
                                Order number: {details.tid}
                              </span>
                              &nbsp;&nbsp;
                              <span className="inlineblock">
                                Return order number:{this.state.returnNumber}
                              </span>
                              &nbsp;&nbsp;
                              <span className="inlineblock">
                                Application time:{' '}
                                {details.createTime.substr(0, 19)}
                              </span>
                              &nbsp;&nbsp;
                              <span className="inlineblock">
                                Return order status: {details.returnFlowState}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 color-999">
                            Dear customer, your{' '}
                            {details.returnType === 'RETURN'
                              ? 'refund'
                              : 'exchange'}{' '}
                            has been cancelled for the reason:{' '}
                            {details.rejectReason}
                          </div>
                          <div className="detail-title">
                            {details.returnType === 'RETURN'
                              ? 'Refund'
                              : 'Exchange'}{' '}
                            information
                          </div>
                          <div className="row">
                            <div className="row col-6">
                              <div className="col-5 text-right color-999">
                                Reasons for{' '}
                                {details.returnType === 'RETURN'
                                  ? 'return'
                                  : 'exchange'}
                                :
                              </div>
                              <div className="col-7">
                                {Object.values(details.returnReason).join(';')}
                              </div>
                            </div>
                            <div className="row col-6">
                              <div className="col-5 text-right color-999">
                                {details.returnType === 'RETURN'
                                  ? 'Return'
                                  : 'Exchange'}{' '}
                                Method:
                              </div>
                              <div className="col-7">
                                {Object.values(details.returnWay).join(';')}
                              </div>
                            </div>
                            <div className="row col-6">
                              <div className="col-5 text-right color-999">
                                Chargeback attachment:
                              </div>
                              <div className="col-7 after-sale d-flex">
                                {details.images.length
                                  ? details.images.map((item, i) => (
                                      <div
                                        className="mr-1 mb-1 img-item"
                                        key={i}
                                      >
                                        <LazyLoad>
                                        <img src={JSON.parse(item).url} alt=""/>
                                        </LazyLoad>
                                      </div>
                                    ))
                                  : 'none'}
                              </div>
                            </div>
                            <div className="row col-6">
                              <div className="col-5 text-right color-999">
                                {details.returnType === 'RETURN'
                                  ? 'Refund'
                                  : 'Exchange'}{' '}
                                Method:
                              </div>
                              <div className="col-7">PAYU</div>
                            </div>
                            <div className="row col-6"></div>
                            <div className="row col-6">
                              <div className="col-5 text-right color-999">
                                {details.returnType === 'RETURN'
                                  ? 'Return'
                                  : 'Exchange'}{' '}
                                instructions:
                              </div>
                              <div className="col-7">{details.description}</div>
                            </div>
                          </div>
                          <div className="order__listing mt-4">
                            <div className="order-list-container">
                              <div className="card-container mt-0 border-0">
                                <div className="card rc-margin-y--none">
                                  <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 border-0">
                                    <div className="col-12 col-md-6">
                                      <p>
                                        {details.returnType === 'RETURN'
                                          ? 'Return'
                                          : 'Exchange'}{' '}
                                        goods
                                      </p>
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
                                  <div
                                    className="row rc-margin-x--none row align-items-center pt-2 pb-2 border-bottom"
                                    key={i}
                                  >
                                    <div className="col-12 col-md-6 d-flex pl-0 pr-0">
                                      <LazyLoad>
                                      <img
                                        className="img-fluid border"
                                        src={item.pic || IMG_DEFAULT}
                                        alt={item.skuName}
                                        title={item.skuName}
                                      />
                                      </LazyLoad>
                                      <div className="m-1 color-999">
                                        <span>{item.skuName}</span>
                                        <br />
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
                                      {formatMoney(item.price * item.num)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div
                            className="row pt-2 pb-2 border-bottom"
                            style={{ lineHeight: 1.7 }}
                          >
                            <div className="col-9 text-right color-999">
                              {details.returnType === 'RETURN'
                                ? 'Refundable'
                                : 'Exchange'}{' '}
                              amount:
                            </div>
                            <div className="col-2 text-right">
                              {formatMoney(details.returnPrice.applyPrice)}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
