import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import InterestedIn from "@/components/InterestedIn";
import "./index.css";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorShow: false,
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
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    };
  }
  changeCache () {
    localStorage.setItem(
      "rc-cart-data",
      JSON.stringify(this.state.productList)
    );
  }
  addQuantity (item) {
    item.quantity++;
    this.setState({
      productList: this.state.productList,
    });
    this.changeCache();
  }
  subQuantity (item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.setState({
        productList: this.state.productList,
      });
    } else {
      this.setState({
        errorShow: true,
      });
      setTimeout(() => {
        this.setState({
          errorShow: false,
        });
      }, 2000)
    }
    this.changeCache();
  }
  closeModal () {
    this.setState({
      currentProduct: null,
      modalShow: false,
    });
  }
  deleteProduct () {
    let { currentProduct, productList } = this.state;
    this.state.productList = productList.filter(
      (el) => el.id !== currentProduct.id
    );
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
  componentDidMount () {
    let productList = JSON.parse(localStorage.getItem("rc-cart-data"));
    this.setState({
      productList: productList,
    });
  }
  getProducts (plist) {
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
  render () {
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
        <Header cartData={this.state.cartData} showMiniIcons={true} />
        <main class="rc-content--fixed-header">
          <div class="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing">
            <div class="rc-layout-container rc-one-column">
              <div class="rc-column">
                <a href="./boilerplate.html" title="Continue shopping">
                  <span class="rc-header-with-icon rc-header-with-icon--gamma">
                    <span class="rc-icon rc-left rc-iconography"></span>
                    Continue shopping
                  </span>
                </a>
              </div>
            </div>
            <div class="rc-layout-container rc-three-column cart cart-page">
              <div class="rc-column rc-double-width">
                <div class="cart-error-messaging cart-error" style={{ display: this.state.errorShow ? 'block' : 'none' }}>
                  <aside class="rc-alert rc-alert--error rc-alert--with-close" role="alert">
                    <span>The number can't be less than 1</span>
                  </aside>
                </div>
                <div class="rc-padding-bottom--xs">
                  <h5 class="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                    Your basket
                  </h5>
                </div>
                <div id="product-cards-container">{List}</div>
              </div>
              <div class="rc-column totals cart__total">
                <div class="rc-padding-bottom--xs">
                  <h5 class="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                    Total
                  </h5>
                </div>
                <div class="group-order rc-border-all rc-border-colour--interface cart__total__content">
                  <div class="row">
                    <div class="col-12 total-items medium">
                      <span id="items-number">1</span>
                      in the basket
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">Total</div>
                    <div class="col-4 no-padding-left">
                      <p class="text-right sub-total">{total}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">
                      <p>Delivery</p>
                    </div>
                    <div class="col-4">
                      <p class="text-right shipping-cost">0</p>
                    </div>
                  </div>
                  <div class="group-total">
                    <div class="row">
                      <div class="col-7 medium">
                        <strong>total cost</strong>
                      </div>
                      <div class="col-5">
                        <p class="text-right grand-total-sum medium">{total}</p>
                      </div>
                    </div>
                    <div class="row checkout-proccess">
                      <div class="col-lg-12 checkout-continue">
                        <Link to="/payment/shipping">
                          <div class="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                            <miaaoauth
                              data-oauthlogintargetendpoint="2"
                              class="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn "
                              aria-pressed="true"
                            >
                              Checkout
                            </miaaoauth>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InterestedIn />
          </div>
        </main>
        <div
          className={`modal fade ${this.state.modalShow ? "show" : ""}`}
          id="removeProductModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="removeProductLineItemModal"
          style={{ display: this.state.modalShow ? "block" : "none" }}
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header delete-confirmation-header">
                <h4 class="modal-title" id="removeProductLineItemModal">
                  <font>
                    <font>Delete product?</font>
                  </font>
                </h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.closeModal()}
                >
                  <span aria-hidden="true">
                    <font>
                      <font>×</font>
                    </font>
                  </span>
                </button>
              </div>
              <div class="modal-body delete-confirmation-body">
                <font>
                  <font>
                    Are you sure you want to remove this item from your cart?
                  </font>
                </font>
                <p class="product-to-remove">
                  <font>
                    <font>
                      {this.state.currentProduct
                        ? this.state.currentProduct.name
                        : ""}
                    </font>
                  </font>
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  data-dismiss="modal"
                  onClick={() => this.closeModal()}
                >
                  <font>
                    <font>Cancel</font>
                  </font>
                </button>
                <button
                  type="button"
                  class="btn btn-primary cart-delete-confirmation-btn"
                  data-dismiss="modal"
                  onClick={() => this.deleteProduct()}
                >
                  <font>
                    <font>Yes</font>
                  </font>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`modal-backdrop fade ${
            this.state.modalShow ? "show" : ""
            }`}
          style={{ display: this.state.modalShow ? "block" : "none" }}
        ></div>
        <Footer />
      </div>
    );
  }
}

export default Cart;
