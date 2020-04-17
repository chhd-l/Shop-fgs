import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import "./index.css";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }
  changeCache() {
    localStorage.setItem(
      "rc-cart-data",
      JSON.stringify(this.state.productList)
    );
  }
  addQuantity(item) {
    item.quantity++;
    this.setState({
      productList: this.state.productList,
    });
    this.changeCache();
  }
  subQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.setState({
        productList: this.state.productList,
      });
    }
    this.changeCache();
  }
  closeModal() {
    this.setState({
      currentProduct: null,
      modalShow: false,
    });
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
  }
  getProducts(plist) {
    const Lists = plist.map((pitem, index) => (
      <div
        class="rc-border-all rc-border-colour--interface product-info  uuid-3ab64fd26c17b64c44e4ba1a7e"
        key={index}
      >
        <div class="">
          <div class="d-flex">
            <div class="product-info__img w-100">
              <img
                class="product-image"
                src={pitem.url}
                alt="Sterilised 37"
                title="Sterilised 37"
              />
            </div>
            <div class="product-info__desc w-100 relative">
              <div class="line-item-header rc-margin-top--xs rc-padding-right--sm">
                <a href="/ru/Sterilised%2037-2537_RU.html">
                  <h4 class="rc-gamma rc-margin--none">{pitem.name}</h4>
                </a>
              </div>
              <div class="cart-product-error-msg"></div>
              <span
                class="remove-product-btn js-remove-product rc-icon rc-close--sm rc-iconography"
                onClick={() => {
                  this.setState({
                    currentProduct: pitem,
                    modalShow: true,
                  });
                }}
              ></span>
              <div class="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
                <div
                  class="product-quickview product-null product-wrapper product-detail"
                  data-pid="null"
                >
                  <div class="detail-panel">
                    <section class="attributes">
                      <div data-attr="size" class="swatch">
                        <div class="cart-and-ipay">
                          <div
                            class="rc-swatch __select-size"
                            id="id-single-select-size"
                          >
                            {pitem.sizeList.map((sizeItem, i) => (
                              <div
                                key={i}
                                className={`rc-swatch__item ${
                                  sizeItem.selected ? "selected" : ""
                                }`}
                                onClick={() => this.changeSize(pitem, sizeItem)}
                              >
                                <span>
                                  {sizeItem.label + " " + sizeItem.unit}
                                  <i></i>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <div class="rc-md-up">
                  <div class="product-card-footer product-card-price d-flex">
                    <div class="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                      <div class="rc-quantity d-flex">
                        <span
                          class=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                          onClick={() => this.subQuantity(pitem)}
                        ></span>
                        <input
                          class="rc-quantity__input"
                          disabled
                          id="quantity"
                          name="quantity"
                          type="number"
                          value={pitem.quantity}
                          min="1"
                          max="10"
                        />
                        <span
                          class="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                          data-quantity-error-msg="Вы не можете заказать больше 10"
                          onClick={() => this.addQuantity(pitem)}
                        ></span>
                      </div>
                    </div>
                    <div class="line-item-total-price d-flex justify-content-center">
                      <p class="line-item-price-info line-item-total-price-amount rc-margin-bottom--none rc-margin-right--xs flex-grow-1 text-right">
                        =
                      </p>
                      <div class="item-total-3ab64fd26c17b64c44e4ba1a7e price">
                        <div
                          class="strike-through
                      non-adjusted-price"
                        >
                          null
                        </div>
                        <b class="pricing line-item-total-price-amount item-total-3ab64fd26c17b64c44e4ba1a7e light">
                          {pitem.quantity *
                            pitem.sizeList.filter((el) => el.selected)[0].price}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return Lists;
  }
  render() {
    const { results, productList, loading } = this.state;

    const List = this.getProducts(this.state.productList);
    let total = 0;
    this.state.productList.map((pitem) => {
      total =
        total +
        pitem.quantity * pitem.sizeList.filter((el) => el.selected)[0].price;
    });
    return (
      <div>
        <Header />
        <main class="rc-content--fixed-header">
          <div class="rc-layout-container rc-three-column rc-max-width--xl">
            <div class="rc-column rc-double-width shipping__address">
              <div className="center">
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
                  <div class="product-summary__inner">
                    <div
                      class="product-summary__recap"
                      data-loc="confirmOrderSummary"
                    >
                      <div class="product-summary__itemnbr checkout--padding rc-bg-colour--brand4">
                        1 total product
                      </div>
                      <div class="product-summary__recap__content">
                        <div class="rc-border-colour--interface rc-border-left rc-border-right checkout--padding">
                          <div class="product-summary__products">
                            <div
                              class="product-summary__products__item uuid-3ab64fd26c17b64c44e4ba1a7e"
                              data-product-line-item="3ab64fd26c17b64c44e4ba1a7e"
                            >
                              <div class="product-line-item">
                                <div class="product-line-item-details d-flex flex-row">
                                  <div class="item-image">
                                    <img
                                      class="product-image"
                                      src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw2aa045b9/products/RU/packshot_2016_FHN_DRY_Sterilised_37_4.png?sw=250&amp;sh=380&amp;sm=fit"
                                      alt="Sterilised 37"
                                      title="Sterilised 37"
                                    />
                                  </div>
                                  <div class="wrap-item-title">
                                    <div class="item-title">
                                      <div class="line-item-name capitalize">
                                        <span class="light">sterilised 37</span>
                                      </div>
                                    </div>
                                    <div class="line-item-total-price justify-content-start pull-left">
                                      <div class="item-attributes">
                                        <p class="line-item-attributes">
                                          4.00kg - 1 item
                                        </p>
                                      </div>
                                    </div>
                                    <div class="line-item-total-price justify-content-end pull-right">
                                      <div class="item-total-3ab64fd26c17b64c44e4ba1a7e price relative">
                                        <div class="strike-through non-adjusted-price">
                                          null
                                        </div>
                                        <b class="pricing line-item-total-price-amount item-total-3ab64fd26c17b64c44e4ba1a7e light">
                                          ₽ 2 616
                                        </b>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="item-options"></div>
                              </div>
                            </div>
                          </div>
                          <div class="product-summary__fees order-total-summary">
                            <div class="row leading-lines subtotal-item">
                              <div class="col-8 start-lines">
                                <p class="order-receipt-label">
                                  <span>Total</span>
                                </p>
                              </div>
                              <div class="col-4 end-lines">
                                <p class="text-right">
                                  <span class="sub-total">₽ 2 616</span>
                                </p>
                              </div>
                            </div>
                            <div class="row leading-lines order-discount hide-order-discount">
                              <div class="col-7 start-lines">
                                <p class="order-receipt-label">
                                  <span>Скидка на заказ</span>
                                </p>
                              </div>
                              <div class="col-5 end-lines">
                                <p class="text-right">
                                  <span class="order-discount-total">
                                    {" "}
                                    - 0 ₽
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div class="row leading-lines shipping-item">
                              <div class="col-7 start-lines">
                                <p class="order-receipt-label order-shipping-cost">
                                  <span>Delivery</span>
                                </p>
                              </div>
                              <div class="col-5 end-lines">
                                <p class="text-right">
                                  <span class="shipping-total-cost">-</span>
                                </p>
                              </div>
                            </div>
                            <div class="row leading-lines shipping-discount hide-shipping-discount">
                              <div class="col-7 start-lines">
                                <p class="order-receipt-label">
                                  <span>Скидка на доставку</span>
                                </p>
                              </div>
                              <div class="col-5 end-lines">
                                <p class="text-right">
                                  <span class="shipping-discount-total">
                                    - N/A
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="product-summary__total grand-total row leading-lines rc-bg-colour--brand4 checkout--padding">
                        <div class="col-6 start-lines order-receipt-label">
                          <span>total cost</span>
                        </div>
                        <div class="col-6 end-lines text-right">
                          <span class="grand-total-sum">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <div
                      class="single-shipping"
                      data-shipment-summary="8b50610f77571c1ac58b609278"
                    >
                      <div
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
    );
  }
}

export default Confirmation;
