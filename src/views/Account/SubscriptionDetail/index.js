import React from "react";
import "./index.css";
import Test from "../../Test";
import {FormattedMessage} from "react-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import visaImg from "@/assets/images/credit-cards/visa.svg";
export default class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subId:  0,
      selectedTime: 'Every 4 weeks',
      nextOrderTime: '2020-18-06',
      productName: 'Glycobalance Feline',
      productPrice: '$46.54',
      productUrl: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004291741049919.png',
      totalMoney: 10,
      discount: 10,
      shipping: 'FREE',
      totalRealPay: 0,
      shippingAddress: {
        name: 'George Guo',
        address: 'TESTST',
        code: '2929292',
        addressType: 'SNSN,CO 27272'
      },
      billingAddress: {
        name: 'George Guo',
        address: 'TESTST',
        code: '2929292',
        addressType: 'SNSN,CO 27272'
      },
      payment: {
        name: 'George Guo',
        card: '00000008',
        type: 'CREDIT',
        cardImg: visaImg
      }
    };
  }
  componentDidMount() {
    console.log('enter detail')
    this.setState({
      subId: this.props.match.params.subscriptionNumber
    })
  }
  render () {
    const data = this.state
    return (
        <div>
          <div>
            <Header
                showMiniIcons={true}
                showUserIcon={true}
                location={this.props.location}
                history={this.props.history}
            />
            <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
              <BreadCrumbs />
              <div className="rc-padding--sm rc-max-width--xl">
                <div className="rc-layout-container rc-five-column">
                  {this.state.loading ? <Loading positionFixed="true" /> : null}
                  <SideMenu type="PaymentMethod" />
                  <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                    <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                      <h4 className="rc-delta rc-margin--none">
                        <FormattedMessage id="subscription.sub"></FormattedMessage>{data.subId}
                      </h4>
                    </div>
                    <div className="content-asset">
                      <div className="rc-layout-container rc-three-column mgb30 border">
                        <div className="rc-column column-contanier">
                          <div className="rc-card-container">
                            <div className="bt-icon">
                              <button
                                  className="rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography not-yet-btn"
                                  aria-label="Search"></button>
                            </div>
                            <div className="rc-card-content">
                              <b className="">
                                <FormattedMessage id="subscription.notYet"></FormattedMessage>
                              </b>
                              <h1 className="rc-card__meta order-Id"><FormattedMessage id="subscription.order"></FormattedMessage>                                {data.oderId}
                                {data.subId}
                              </h1>
                            </div>
                            <div>
                              <span className="rc-carousel__direction rc-carousel__direction--next
                                rc-btn rc-btn--icon rc-icon rc-interactive rc-right rc-iconography" aria-label="next">
                              <span className="rc-screen-reader-text">Next</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column column-contanier">
                          <div className="rc-card-container">
                            <div className="bt-icon">
                              <button
                                  className="rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography not-yet-btn"
                                  aria-label="Search"></button>
                            </div>
                            <div className="rc-card-content">
                              <b className="">
                                <FormattedMessage id="subscription.frequency"></FormattedMessage>
                              </b>
                              <h1 className="rc-card__meta order-Id"><FormattedMessage id="subscription.order"></FormattedMessage>                                {data.oderId}
                                {data.nextOrderTime}
                              </h1>
                            </div>
                            <div className="v-center">
                              <a className="rc-styled-link red-text"><FormattedMessage id="subscription.change"></FormattedMessage></a>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column">
                          <div className="rc-card-container">
                            <div className="bt-icon">
                              <button
                                  className="rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography not-yet-btn"
                                  aria-label="Search"></button>
                            </div>
                            <div className="rc-card-content">
                              <b className="">
                                <FormattedMessage id="subscription.nextOrder"></FormattedMessage>
                              </b>
                              <h1 className="rc-card__meta order-Id"><FormattedMessage id="subscription.nextOrder"></FormattedMessage>                                {data.oderId}
                                {data.nextOrderTime}
                              </h1>
                            </div>
                            <div className="v-center">
                              <a className="rc-styled-link red-text"><FormattedMessage id="subscription.change"></FormattedMessage></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rc-layout-container rc-three-column mgb30">
                        <div className="rc-column rc-double-width product-container">
                          <div className="rc-layout-container rc-five-column">
                            <div className="rc-column rc-triple-width flex-layout">
                              <div className="img-container">
                                <img className="product-img" src={data.productUrl}/>
                              </div>
                              <div className="v-center">
                                <label className="font18">{data.productName}</label>
                                <div>
                                  <label className="font-weight-bold">{data.productPrice}</label>
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-double-width">
                              <div className="p-container rc-quantity text-right d-flex justify-content-end rc-padding--sm rc-content-v-middle ">
                               <div className="v-center">
                                  <span
                                      className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"></span>
                                 <input
                                     className="rc-quantity__input" id="quantity" name="quantity" min="1" max="899"
                                     maxLength="5" value="1" />
                                 <span
                                     className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"></span>
                               </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column flex-layout">
                          <div className="v-center total-container">
                            <div className="border-b pdb20">
                              <div className="flex-layout">
                                <label className="font18"><FormattedMessage id="subscription.total"></FormattedMessage>:</label>
                                <div className="text-right"><b>${data.totalMoney}</b></div>
                              </div>
                              <div className="flex-layout">
                                <label className="saveDiscount font18"><FormattedMessage id="subscription.saveDiscount"></FormattedMessage>:</label>
                                <div className="text-right red-text"><b>-${data.discount}</b></div>
                              </div>
                              <div className="flex-layout">
                                <label className="font18"><FormattedMessage id="subscription.shipping"></FormattedMessage>:</label>
                                <div className="text-right red-text"><b>{data.shipping}</b></div>
                              </div>
                            </div>
                            <div className="flex-layout mgt20">
                              <label className="saveDiscount font18"><FormattedMessage id="subscription.totalInclu"></FormattedMessage>:</label>
                              <div className="text-right"><b>${data.totalRealPay}</b></div>
                            </div>

                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="rc-layout-container rc-three-column">
                        <div className="rc-column footer-container ">
                          <b className="font18"><FormattedMessage id="subscription.shippingAddress"></FormattedMessage></b>
                          <div className="rc-grid mgt10">
                            <article className="rc-card rc-card--a">
                              <div className="rc-card__body pdl0">
                                <div className="rc-card-container">
                                  <div className="rc-card-content">
                                    <b className="footer--title">
                                      {data.shippingAddress.name}
                                    </b>
                                    <h1 className="rc-card__meta order-Id">
                                      {data.shippingAddress.address}
                                    </h1>
                                    <h1 className="rc-card__meta order-Id">
                                      {data.shippingAddress.code}
                                    </h1>
                                    <h1 className="rc-card__meta order-Id">
                                      {data.shippingAddress.addressType}
                                    </h1>
                                  </div>
                                  <div className="v-center">
                                    <a className="rc-styled-link red-text"><FormattedMessage id="subscription.change"></FormattedMessage></a>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                        <div className="rc-column footer-container mgl20 ">
                          <b className="font18"><FormattedMessage id="subscription.BillingAddress"></FormattedMessage></b>
                          <div className="rc-grid mgt10">
                            <article className="rc-card rc-card--a">
                              <div className="rc-card__body pdl0">
                                <div className="rc-card-container">
                                  <div className="rc-card-content">
                                    <b className="footer--title">
                                      {data.billingAddress.name}
                                    </b>
                                    <h1 className="rc-card__meta order-Id">
                                      {data.billingAddress.address}
                                    </h1>
                                    <h1 className="rc-card__meta order-Id">
                                      {data.billingAddress.code}
                                    </h1>
                                    <h1 className="rc-card__meta order-Id">
                                      {data.billingAddress.addressType}
                                    </h1>
                                  </div>
                                  <div className="v-center">
                                    <a className="rc-styled-link red-text"><FormattedMessage id="subscription.change"></FormattedMessage></a>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                        <div className="rc-column footer-container mgl20 ">
                          <b className="b-text"><FormattedMessage id="subscription.paymentMethod"></FormattedMessage></b>
                          <div className="rc-grid mgt10">
                            <article className="rc-card rc-card--a">
                              <div className="rc-card__body pdl0 ">
                                <div className="rc-card-container">
                                  <div className="card-wrapper flex-layout">
                                    <img className="card-img" src={data.payment.cardImg} />
                                  </div>
                                  <div className="rc-card-content">
                                    <b className="footer--title">
                                      {data.payment.name}
                                    </b>
                                    <h1 className="rc-card__meta order-Id">
                                      {data.payment.card}
                                    </h1>
                                    <h1 className="rc-card__meta order-Id pdb20">
                                      {data.payment.type}
                                    </h1>
                                  </div>
                                  <div className="v-center">
                                    <a className="rc-styled-link red-text"><FormattedMessage id="subscription.change"></FormattedMessage></a>
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
    );
  }
}
