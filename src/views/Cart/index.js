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
  goBack (e) {
    e.preventDefault();
    const { history } = this.props
    history.goBack()
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
        className="rc-border-all rc-border-colour--interface product-info  uuid-3ab64fd26c17b64c44e4ba1a7e"
        key={index}
      >
        <div className="">
          <div className="d-flex">
            <div className="product-info__img w-100">
              <img
                className="product-image"
                src={pitem.url}
                alt="Sterilised 37"
                title="Sterilised 37"
              />
            </div>
            <div className="product-info__desc w-100 relative">
              <div className="line-item-header rc-margin-top--xs rc-padding-right--sm">
                <a href="/ru/Sterilised%2037-2537_RU.html">
                  <h4 className="rc-gamma rc-margin--none">{pitem.name}</h4>
                </a>
              </div>
              <div className="cart-product-error-msg"></div>
              <span
                className="remove-product-btn js-remove-product rc-icon rc-close--sm rc-iconography"
                onClick={() => {
                  this.setState({
                    currentProduct: pitem,
                    modalShow: true,
                  });
                }}
              ></span>
              <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
                <div
                  className="product-quickview product-null product-wrapper product-detail"
                  data-pid="null"
                >
                  <div className="detail-panel">
                    <section className="attributes">
                      <div data-attr="size" className="swatch">
                        <div className="cart-and-ipay">
                          <div
                            className="rc-swatch __select-size"
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
                <div className="rc-md-up">
                  <div className="product-card-footer product-card-price d-flex">
                    <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                      <div className="rc-quantity d-flex">
                        <span
                          className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                          onClick={() => this.subQuantity(pitem)}
                        ></span>
                        <input
                          className="rc-quantity__input"
                          disabled
                          id="quantity"
                          name="quantity"
                          type="number"
                          value={pitem.quantity}
                          min="1"
                          max="10"
                        />
                        <span
                          className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                          data-quantity-error-msg="Вы не можете заказать больше 10"
                          onClick={() => this.addQuantity(pitem)}
                        ></span>
                      </div>
                    </div>
                    <div className="line-item-total-price d-flex justify-content-center">
                      <p className="line-item-price-info line-item-total-price-amount rc-margin-bottom--none rc-margin-right--xs flex-grow-1 text-right">
                        =
                      </p>
                      <div className="item-total-3ab64fd26c17b64c44e4ba1a7e price">
                        <div
                          className="strike-through non-adjusted-price">
                          null
                        </div>
                        <b className="pricing line-item-total-price-amount item-total-3ab64fd26c17b64c44e4ba1a7e light">
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
        <main className={['rc-content--fixed-header', productList.length ? '' : 'cart-empty'].join(' ')}>
          <div className="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing">
            {productList.length
              ? <React.Fragment>
                <div className="rc-layout-container rc-one-column">
                  <div className="rc-column">
                    <a href="#" onClick={(e) => this.goBack(e)} title="Continue shopping">
                      <span className="rc-header-with-icon rc-header-with-icon--gamma">
                        <span className="rc-icon rc-left rc-iconography"></span>
                    Continue shopping
                  </span>
                    </a>
                  </div>
                </div>
                <div className="rc-layout-container rc-three-column cart cart-page">
                  <div className="rc-column rc-double-width">
                    <div className="cart-error-messaging cart-error" style={{ display: this.state.errorShow ? 'block' : 'none' }}>
                      <aside className="rc-alert rc-alert--error rc-alert--with-close" role="alert">
                        <span>The number can't be less than 1</span>
                      </aside>
                    </div>
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        Your basket
                  </h5>
                    </div>
                    <div id="product-cards-container">{List}</div>
                  </div>
                  <div className="rc-column totals cart__total">
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        Total
                  </h5>
                    </div>
                    <div className="group-order rc-border-all rc-border-colour--interface cart__total__content">
                      <div className="row">
                        <div className="col-12 total-items medium">
                          <span id="items-number">{this.state.productList.length}</span>
                      item in the basket
                    </div>
                      </div>
                      <div className="row">
                        <div className="col-8">Total</div>
                        <div className="col-4 no-padding-left">
                          <p className="text-right sub-total">$ {total}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <p>Delivery</p>
                        </div>
                        <div className="col-4">
                          <p className="text-right shipping-cost">0</p>
                        </div>
                      </div>
                      <div className="group-total">
                        <div className="row">
                          <div className="col-7 medium">
                            <strong>total cost</strong>
                          </div>
                          <div className="col-5">
                            <p className="text-right grand-total-sum medium">$ {total}</p>
                          </div>
                        </div>
                        <div className="row checkout-proccess">
                          <div className="col-lg-12 checkout-continue">
                            <Link to="/payment/shipping">
                              <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                                <miaaoauth
                                  data-oauthlogintargetendpoint="2"
                                  className="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn "
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
              </React.Fragment>
              : <React.Fragment>
                <div className="rc-text-center">
                  <div className="rc-beta rc-margin-bottom--sm">Your basket</div>
                  <div className="rc-gamma title-empty">your basket is empty</div>
                </div>
                <div className="content-asset">
                  <div className="rc-bg-colour--brand3 rc-padding--sm">
                    <div className="rc-max-width--lg rc-padding-x--lg--mobile">
                      <div>
                        <div className="rc-alpha inherit-fontsize"><p style={{ textAlign: 'center' }}>FULL RICE FOR YOUR PET</p></div>
                        <div className="rc-card-grid rc-match-heights rc-four-column">
                          <div className="rc-grid">
                            <article className="rc-card rc-card--a">
                              <Link to="/list/dogs">
                                <img className="card__image" src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw85b28211/New content/packshot_13.11.png?sw=498&amp;sh=281&amp;sm=fit&amp;cx=2&amp;cy=0&amp;cw=1996&amp;ch=1126&amp;sfrm=png" alt="Dog" />
                              </Link>
                              <div className="card__body">
                                <header>
                                  <Link to="/list/dogs">
                                    <h1 className="card__title">Choose a diet for your dog</h1>
                                  </Link>
                                </header>
                                <Link to="/list/dogs"></Link>
                              </div>
                            </article>
                          </div>
                          <div className="rc-grid">
                            <article className="rc-card rc-card--a">
                              <Link to="/list/cats">
                                <img className="card__image" src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3b01991e/Bloc Cat.png?sw=1920&amp;sh=1080&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=498&amp;ch=280&amp;sfrm=png" alt="Cat" />
                              </Link>
                              <div className="card__body">
                                <header>
                                  <Link to="/list/cats">
                                    <h4 className="card__title">Choose a diet for your cat</h4>
                                  </Link>
                                </header>
                                <Link to="/list/cats"></Link>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            }
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
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header delete-confirmation-header">
                <h4 className="modal-title" id="removeProductLineItemModal">
                  <font>
                    <font>Delete product?</font>
                  </font>
                </h4>
                <button
                  type="button"
                  className="close"
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
              <div className="modal-body delete-confirmation-body">
                <font>
                  <font>
                    Are you sure you want to remove this item from your cart?
                  </font>
                </font>
                <p className="product-to-remove">
                  <font>
                    <font>
                      {this.state.currentProduct
                        ? this.state.currentProduct.name
                        : ""}
                    </font>
                  </font>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-dismiss="modal"
                  onClick={() => this.closeModal()}
                >
                  <font>
                    <font>Cancel</font>
                  </font>
                </button>
                <button
                  type="button"
                  className="btn btn-primary cart-delete-confirmation-btn"
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
