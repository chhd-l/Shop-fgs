import React from "react";
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PayProductInfo from "@/components/PayProductInfo"
import Modal from '@/components/Modal'
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router-dom"
import successImg from "@/assets/images/credit-cards/success.png"
import { find } from "lodash"
import { GTM_SITE_ID, STOREID } from "@/utils/constant"
import { getDictionary } from "@/utils/utils"
import { addEvaluate } from "@/api/order"
import "./index.css";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: {},
      billingAddress: {},
      productList: [
        {
          id: "3003_RU",
          name: "Miniddd adult",
          url:
            "https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png",
          img:
            "https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x",
          description:
            "Mini Edalt: dry food for dogs aged 10 months to 8 years. MINI Adult is specially designed for dogs of small breeds (weighing from 4 to 10 kg). In the nutrition of dogs of small breeds, not only the adapted croquet size is important. They need more energy than large dogs, their growth period is shorter and their growth is more intense. As a rule, they live longer than large dogs, and are more picky in their diet.<ul><li>dsdsds</li></ul>",
          reference: 2323,
          sizeList: [
            {
              label: "2.00",
              price: 100,
              originalPrice: 120,
              unit: "kg",
              selected: true,
            },
            {
              label: "4.00",
              price: 300,
              originalPrice: 320,
              unit: "kg",
              selected: false,
            },
            {
              label: "6.00",
              price: 500,
              originalPrice: 530,
              unit: "kg",
              selected: false,
            },
          ],
          quantity: 1,
        },
      ],
      currentProduct: null,
      loading: true,
      commentOnDelivery: '',
      totalPrice: '',
      tradePrice: '',
      discountPrice: '',
      paywithLogin: sessionStorage.getItem("rc-paywith-login") === 'true',
      cityList: [],
      countryList: [],
      submitLoading: false,
      evalutateScore: -1,
      consumerComment: '',

      modalShow: true,
      operateSuccessModalVisible: false,
      errorMsg: ''
    }
    this.timer = null
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true)
    if (this.state.paywithLogin) {
      localStorage.removeItem('rc-cart-data-login')
    } else {
      localStorage.removeItem('rc-cart-data')
      sessionStorage.removeItem('rc-token')
    }
    localStorage.removeItem('orderNumber')
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    let productList
    if (this.state.paywithLogin) {
      productList = JSON.parse(localStorage.getItem("rc-cart-data-login"))
    } else {
      productList = JSON.parse(localStorage.getItem("rc-cart-data"))
    }
    this.setState({
      productList: productList,
      loading: false
    });
    let deliveryInfoStr = this.state.paywithLogin ? localStorage.getItem("loginDeliveryInfo") : localStorage.getItem("deliveryInfo");
    if (deliveryInfoStr) {
      let deliveryInfo = JSON.parse(deliveryInfoStr);
      this.setState({
        deliveryAddress: deliveryInfo.deliveryAddress,
        billingAddress: deliveryInfo.billingAddress,
        commentOnDelivery: deliveryInfo.commentOnDelivery
      });
    }
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
  matchNamefromDict (dictList, id) {
    return find(dictList, ele => ele.id == id)
      ? find(dictList, ele => ele.id == id).name
      : id
  }
  async hanldeClickSubmit () {
    this.setState({ submitLoading: true })
    try {
      await addEvaluate({
        storeId: STOREID,
        orderNo: localStorage.getItem('orderNumber'),
        goodsScore: this.state.evalutateScore + 1,
        consumerComment: this.state.consumerComment,
        serverScore: -1,
        logisticsScore: -1,
        compositeScore: -1
      })
      this.setState({
        operateSuccessModalVisible: true
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({
          operateSuccessModalVisible: false
        })
      }, 5000)
    } catch (err) {
      this.setState({
        errorMsg: err.toString()
      })
    } finally {
      this.setState({
        modalShow: false,
        submitLoading: false
      })
    }
  }
  handleConsumerCommentChange (e) {
    this.setState({
      consumerComment: e.target.value
    })
  }
  render () {
    const {
      deliveryAddress,
      billingAddress,
      commentOnDelivery,
      productList,
      loading
    } = this.state;

    let event
    let eEvents
    if (!loading) {
      let products
      if (this.state.paywithLogin) {
        products = productList.map(item => {
          return {
            id: item.goodsInfoId,
            name: item.goodsName,
            price: item.salePrice,
            brand: "Royal Canin",
            category: item.goodsCateName,
            quantity: item.buyCount,
            variant: item.specText
          }
        })
      } else {
        products = productList.map(item => {
          const selectedSize = item.sizeList.filter(s => s.selected)[0]
          return {
            id: selectedSize.goodsInfoId,
            name: item.goodsName,
            price: selectedSize.salePrice,
            brand: "Royal Canin",
            category: item.goodsCateName,
            quantity: item.quantity,
            variant: selectedSize.detailName
          }
        })
      }
      event = {
        page: {
          type: 'Order Confirmation',
          theme: ''
        }
      }
      eEvents = {
        event: `${GTM_SITE_ID}eComTransaction`,
        ecommerce: {
          currencyCode: 'MXN',
          purchase: {
            actionField: {
              id: localStorage.getItem('orderNumber'),
              revenue: JSON.parse(sessionStorage.getItem('rc-totalInfo')).tradePrice
            },
            products
          }
        }
      }
    }

    return (
      <div>
        {event ? <GoogleTagManager additionalEvents={event} ecommerceEvents={eEvents} /> : null}
        <Header history={this.props.history} />
        <main className="rc-content--fixed-header">
          <div className="rc-layout-container rc-three-column rc-max-width--xl">
            <div className="rc-column rc-double-width shipping__address">
              <div className="center">
                <img src={successImg} alt="" style={{ display: 'inline-block' }} />
                <h4>
                  <b><FormattedMessage id="confirmation.info1" /></b>
                </h4>
                <p style={{ marginBottom: '5px' }}>
                  <FormattedMessage id="confirmation.info2" />
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  {
                    this.state.paywithLogin
                      ? <React.Fragment>
                        <Link to={`/account/orders-detail/${localStorage.getItem('orderNumber')}`} className="rc-btn rc-btn--one">
                          <FormattedMessage id="order.viewOrder" />
                        </Link>
                          &nbsp;or&nbsp;
                      </React.Fragment>
                      : null
                  }
                  <Link to="/" className="rc-meta rc-styled-link backtohome mb-0">
                    <FormattedMessage id="confirmation.visitOnlineStore" />
                  </Link>
                </div>
                <p className="rc-margin-top--sm">
                  <b>
                    <FormattedMessage id="confirmation.orderNumber" />：{localStorage.getItem('orderNumber')}
                  </b>

                </p>
              </div>
              <div className="rc-bg-colour--brand3 rc-max-width--xl rc-bottom-spacing rc-padding--sm imformation">
                <div className="product-summary rc-column">
                  <h5 className="product-summary__title rc-margin-bottom--xs center">
                    <FormattedMessage id="total" />
                  </h5>
                  <PayProductInfo />
                </div>
                <div className="card shipping-summary">
                  <div className="card-header rc-margin-bottom--xs rc-padding-right--none clearfix center">
                    <h5><FormattedMessage id="confirmation.customerInformation" /></h5>
                  </div>
                  <div className="card-body rc-padding--none">
                    <p className="shipping-addr-label multi-shipping padding-y--sm">
                      <FormattedMessage id="confirmation.info3" />
                    </p>
                    <div className="single-shipping">
                      <div className="rc-border-all rc-border-colour--interface checkout--padding">
                        <div className="summary-details shipping rc-margin-bottom--xs">
                          <div className="address-summary row">
                            <div className="col-md-12 deliveryAddress">
                              <h5 className="center"><FormattedMessage id="payment.deliveryTitle" /></h5>
                              <div className="row">
                                <div className="col-md-6"><FormattedMessage id="payment.firstName" /></div>
                                <div className="col-md-6">
                                  &nbsp;{deliveryAddress.firstName}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.lastName" /></div>
                                <div className="col-md-6">
                                  &nbsp;{deliveryAddress.lastName}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.address1" /></div>
                                <div className="col-md-6">
                                  &nbsp;{deliveryAddress.address1}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.address2" /></div>
                                <div className="col-md-6">
                                  &nbsp;{deliveryAddress.address2}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.country" /></div>
                                <div className="col-md-6">
                                  &nbsp;{this.matchNamefromDict(this.state.countryList, deliveryAddress.country)}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.city" /></div>
                                <div className="col-md-6">
                                  &nbsp;{this.matchNamefromDict(this.state.cityList, deliveryAddress.city)}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.postCode" /></div>
                                <div className="col-md-6">
                                  &nbsp;{deliveryAddress.postCode}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.phoneNumber" /></div>
                                <div className="col-md-6">
                                  &nbsp;{deliveryAddress.phoneNumber}
                                </div>
                                <div className="col-md-6">
                                  <FormattedMessage id="payment.normalDelivery2" />
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.forFree" /></div>
                                <div className="col-md-6">
                                  <FormattedMessage id="payment.commentOnDelivery" />
                                </div>
                                <div className="col-md-6">
                                  &nbsp;{this.state.commentOnDelivery}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 address-summary-left">
                              <h5 className="center"><FormattedMessage id="payment.billTitle" /></h5>
                              <div className="row">
                                <div className="col-md-6"><FormattedMessage id="payment.firstName" /></div>
                                <div className="col-md-6">
                                  &nbsp;{billingAddress.firstName}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.lastName" /></div>
                                <div className="col-md-6">
                                  &nbsp;{billingAddress.lastName}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.address1" /></div>
                                <div className="col-md-6">
                                  &nbsp;{billingAddress.address1}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.address2" /></div>
                                <div className="col-md-6">
                                  &nbsp;{billingAddress.address2}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.country" /></div>
                                <div className="col-md-6">
                                  &nbsp;{this.matchNamefromDict(this.state.countryList, billingAddress.country)}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.city" /></div>
                                <div className="col-md-6">
                                  &nbsp;{this.matchNamefromDict(this.state.cityList, billingAddress.city)}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.postCode" /></div>
                                <div className="col-md-6">
                                  &nbsp;{billingAddress.postCode}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.phoneNumber" /></div>
                                <div className="col-md-6">
                                  &nbsp;{billingAddress.phoneNumber}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="rc-margin-bottom--xs delivery-comment"
                          style={{ display: "none" }}
                        >
                          <b>Delivery comment:</b> <span>null</span>
                        </div>
                      </div>
                      {/* <div
                        className="rc-border-all rc-border-colour--interface checkout--padding"
                        data-loc="placeOrderBillingSummary"
                      >
                        <div className="summary-details shipping rc-margin-bottom--xs">
                          <div
                            className="address-summary row"
                            data-loc="confirmOrderCustomerInfo"
                          >
                            <div className="col-md-6">
                              <div>
                                <span className="firstName">minya</span>
                                <span className="lastName">tang</span>
                              </div>
                              <div className="country">Russia</div>
                              <div className="districtCode">Moscow</div>
                              <div className="stateCode">Other</div>
                              <div>
                                <span className="city">1st Worker</span>
                                <span className="postalCode">123456</span>
                              </div>
                            </div>
                            <div className="col-md-6 address-summary-left">
                              <div className="address1">1-1</div>
                              <div>
                                <span className="houselabel">House</span>
                                <span className="house">1</span>
                              </div>
                              <div>
                                <span className="housinglabel">
                                  Building / Building
                                </span>
                                <span className="housing">1</span>
                                <span className="housingdash">-</span>
                                <span className="entrancelabel">Entrance</span>
                                <span className="entrance">1</span>
                                <span className="entrancedash">-</span>
                                <span className="appartmentlabel">Apartment</span>
                                <span className="appartment">1</span>
                              </div>
                              <div className="shipping-phone">
                                +7 (923) 456-78-90
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="rc-margin-bottom--xs delivery-comment"
                          style={{ display: "none" }}
                        >
                          <b>Delivery comment:</b> <span>null</span>
                        </div>
                        <div className="row summary-details leading-lines">
                          <div className="col-6 start-lines">
                            <div className="shipping-method">
                              <span className="shipping-method-title">
                                Moscow region and Moscow beyond the MKAD
                              </span>
                              <span className="shipping-method-arrival-time">
                                (1-4 days)
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="pricing shipping-method-price">
                              500 ₽
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <Modal
          key="1"
          visible={this.state.modalShow}
          confirmLoading={this.state.submitLoading}
          modalTitle={<FormattedMessage id="order.rateModalTitle" />}
          confirmBtnText={<FormattedMessage id="submit" />}
          cancelBtnVisible={false}
          close={() => { this.setState({ modalShow: false }) }}
          hanldeClickConfirm={() => this.hanldeClickSubmit()}>
          <div className="text-center pl-4 pr-4" style={{ lineHeight: 2 }}>
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
            <h4><FormattedMessage id="confirmation.rateTip" /></h4>
            <div className="d-flex justify-content-around" style={{ width: '40%', margin: '0 auto' }}>
              {
                [0, 1, 2, 3, 4].map((item, idx) => (
                  <span
                    key={idx}
                    className={`rc-icon ui-cursor-pointer ${this.state.evalutateScore >= idx ? 'rc-rate-fill' : 'rc-rate'} rc-brand1`}
                    onClick={() => { this.setState({ evalutateScore: idx }) }} />
                ))
              }
            </div>
            <h4><FormattedMessage id="confirmation.rateTip2" /></h4>
            <span
              className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
              input-setup="true">
              <FormattedMessage id="confirmation.rateTip3">
                {
                  txt => (<textarea
                    className="rc-input__textarea noborder"
                    maxLength="50"
                    placeholder={txt}
                    style={{ height: 100 }}
                    value={this.state.consumerComment}
                    onChange={(e) => this.handleConsumerCommentChange(e)} />)
                }
              </FormattedMessage>
            </span>
          </div>
        </Modal>
        <Modal
          key="2"
          visible={this.state.operateSuccessModalVisible}
          modalText={<FormattedMessage id="operateSuccessfully" />}
          close={() => { this.setState({ operateSuccessModalVisible: false }) }}
          hanldeClickConfirm={() => { this.setState({ operateSuccessModalVisible: false }) }} />
      </div>
    );
  }
}

export default Confirmation;
