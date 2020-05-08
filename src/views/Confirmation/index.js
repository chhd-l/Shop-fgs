import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PayProductInfo from "@/components/PayProductInfo";
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router-dom";
import "./index.css";
import successImg from "@/assets/images/credit-cards/success.png";

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
      modalShow: false,
      commentOnDelivery: ''
    };
  }
  changeCache () {
    localStorage.setItem(
      "rc-cart-data",
      JSON.stringify(this.state.productList)
    );
  }
  deleteProduct () {
    let { currentProduct, productList } = this.state;
    this.setState({
      productList: productList.filter(
        (el) => el.id !== currentProduct.id
      )
    })
    this.changeCache();
    this.closeModal();
  }
  changeSize (pItem, sizeItem) {
    pItem.sizeList.map((el) => (el.selected = false));
    sizeItem.selected = true;
    this.setState({
      productList: this.state.productList,
    });
    this.changeCache();
  }
  componentWillUnmount() {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    let productList = JSON.parse(localStorage.getItem("rc-cart-data"));
    this.setState({
      productList: productList,
    });
    let deliveryInfoStr = localStorage.getItem("deliveryInfo");
    if (deliveryInfoStr) {
      let deliveryInfo = JSON.parse(deliveryInfoStr);
      this.setState({
        deliveryAddress: deliveryInfo.deliveryAddress,
        billingAddress: deliveryInfo.billingAddress,
        commentOnDelivery: deliveryInfo.commentOnDelivery
      });
    }
    localStorage.removeItem('rc-cart-data')
    localStorage.removeItem('orderNumber')
  }
  render () {
    const {
      deliveryAddress,
      billingAddress,
      commentOnDelivery
    } = this.state;
    return (
      <div>
        <Header />
        <main className="rc-content--fixed-header">
          <div className="rc-layout-container rc-three-column rc-max-width--xl">
            <div className="rc-column rc-double-width shipping__address">
              <div className="center">
                <img src={successImg} alt="" />
                <h4>
                  <b><FormattedMessage id="confirmation.info1" /></b>
                </h4>
                <p style={{marginBottom: '5px'}}>
                  <FormattedMessage id="confirmation.info2" />
                </p>
                <Link to="/" className="rc-meta rc-styled-link backtohome">
                  <FormattedMessage id="confirmation.visitOnlineStore" />
                </Link>
                <p className="rc-margin-top--sm">
                  <b>
                  <FormattedMessage id="confirmation.orderNumber" />
                  ：{localStorage.getItem('orderNumber')}
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
                                  &nbsp;{deliveryAddress.country}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.city" /></div>
                                <div className="col-md-6">
                                  &nbsp;{deliveryAddress.city}
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
                                  &nbsp;{billingAddress.country}
                                </div>
                                <div className="col-md-6"><FormattedMessage id="payment.city" /></div>
                                <div className="col-md-6">
                                  &nbsp;{billingAddress.city}
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
      </div>
    );
  }
}

export default Confirmation;
