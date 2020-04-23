import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PayProductInfo from "@/components/PayProductInfo";
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
  changeCache() {
    localStorage.setItem(
      "rc-cart-data",
      JSON.stringify(this.state.productList)
    );
  }
  deleteProduct() {
    let { currentProduct, productList } = this.state;
    this.state.productList = productList.filter(
      (el) => el.id !== currentProduct.id
    );
    this.changeCache();
    this.closeModal();
  }
  changeSize(pItem, sizeItem) {
    pItem.sizeList.map((el) => (el.selected = false));
    sizeItem.selected = true;
    this.setState({
      productList: this.state.productList,
    });
    this.changeCache();
  }
  componentDidMount() {
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
  }
  render() {
    const {
      deliveryAddress,
      billingAddress,
      commentOnDelivery
    } = this.state;

    return (
      <div>
        <Header />
        <main class="rc-content--fixed-header">
          <div class="rc-layout-container rc-three-column rc-max-width--xl">
            <div class="rc-column rc-double-width shipping__address">
              <div className="center">
                <img src={successImg} alt="" />
                <h4>
                  <b>Thank you for your order.</b>
                </h4>
                <p class="rc-meta">
                  In the near future, our staff will contact you to comfirm the
                  order.
                </p>
                <a href="" class="rc-meta rc-styled-link backtohome">
                  Visit online store
                </a>
              </div>
              <div class="rc-bg-colour--brand3 rc-max-width--xl rc-bottom-spacing rc-padding--sm imformation">
                <div class="product-summary rc-column">
                  <h5 class="product-summary__title rc-margin-bottom--xs center">
                    Total
                  </h5>
                  <PayProductInfo />
                </div>
                <div class="card shipping-summary">
                  <div class="card-header rc-margin-bottom--xs rc-padding-right--none clearfix center">
                    <h5>Buyer Imformation</h5>
                  </div>
                  <div class="card-body rc-padding--none">
                    <p class="shipping-addr-label multi-shipping padding-y--sm">
                      Addresses and shipping methods are indicated under your
                      goods.
                    </p>
                    <div class="single-shipping">
                    <div class="rc-border-all rc-border-colour--interface checkout--padding">
                          <div class="summary-details shipping rc-margin-bottom--xs">
                            <div class="address-summary row">
                              <div class="col-md-12 deliveryAddress">
                                <h5 className="center">Delivery Address</h5>
                                <div className="row">
                                  <div className="col-md-6">First Name</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.firstName}
                                  </div>
                                  <div className="col-md-6">Last Name</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.lastName}
                                  </div>
                                  <div className="col-md-6">Address 1</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.address1}
                                  </div>
                                  <div className="col-md-6">Address 2</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.address2}
                                  </div>
                                  <div className="col-md-6">Country</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.country}
                                  </div>
                                  <div className="col-md-6">City</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.city}
                                  </div>
                                  <div className="col-md-6">Post Code</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.postCode}
                                  </div>
                                  <div className="col-md-6">Phone Number</div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.phoneNumber}
                                  </div>
                                  <div className="col-md-6">
                                    Normal Delivery
                                  </div>
                                  <div className="col-md-6">For free</div>
                                  <div className="col-md-6">
                                    Comment on delivery
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{this.state.commentOnDelivery}
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12 address-summary-left">
                                <h5 className="center">Billing Address</h5>
                                <div className="row">
                                  <div className="col-md-6">First Name</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.firstName}
                                  </div>
                                  <div className="col-md-6">Last Name</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.lastName}
                                  </div>
                                  <div className="col-md-6">Address 1</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.address1}
                                  </div>
                                  <div className="col-md-6">Address 2</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.address2}
                                  </div>
                                  <div className="col-md-6">Country</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.country}
                                  </div>
                                  <div className="col-md-6">City</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.city}
                                  </div>
                                  <div className="col-md-6">Post Code</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.postCode}
                                  </div>
                                  <div className="col-md-6">Phone Number</div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.phoneNumber}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="rc-margin-bottom--xs delivery-comment"
                            style={{ display: "none" }}
                          >
                            <b>Delivery comment:</b> <span>null</span>
                          </div>
                        </div>
                      {/* <div
                        class="rc-border-all rc-border-colour--interface checkout--padding"
                        data-loc="placeOrderBillingSummary"
                      >
                        <div class="summary-details shipping rc-margin-bottom--xs">
                          <div
                            class="address-summary row"
                            data-loc="confirmOrderCustomerInfo"
                          >
                            <div class="col-md-6">
                              <div>
                                <span class="firstName">minya</span>
                                <span class="lastName">tang</span>
                              </div>
                              <div class="country">Russia</div>
                              <div class="districtCode">Moscow</div>
                              <div class="stateCode">Other</div>
                              <div>
                                <span class="city">1st Worker</span>
                                <span class="postalCode">123456</span>
                              </div>
                            </div>
                            <div class="col-md-6 address-summary-left">
                              <div class="address1">1-1</div>
                              <div>
                                <span class="houselabel">House</span>
                                <span class="house">1</span>
                              </div>
                              <div>
                                <span class="housinglabel">
                                  Building / Building
                                </span>
                                <span class="housing">1</span>
                                <span class="housingdash">-</span>
                                <span class="entrancelabel">Entrance</span>
                                <span class="entrance">1</span>
                                <span class="entrancedash">-</span>
                                <span class="appartmentlabel">Apartment</span>
                                <span class="appartment">1</span>
                              </div>
                              <div class="shipping-phone">
                                +7 (923) 456-78-90
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="rc-margin-bottom--xs delivery-comment"
                          style={{ display: "none" }}
                        >
                          <b>Delivery comment:</b> <span>null</span>
                        </div>
                        <div class="row summary-details leading-lines">
                          <div class="col-6 start-lines">
                            <div class="shipping-method">
                              <span class="shipping-method-title">
                                Moscow region and Moscow beyond the MKAD
                              </span>
                              <span class="shipping-method-arrival-time">
                                (1-4 days)
                              </span>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="pricing shipping-method-price">
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
