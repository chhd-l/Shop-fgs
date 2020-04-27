import React from "react";
import { FormattedMessage } from 'react-intl'
import { createHashHistory } from 'history'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { formatMoney } from "@/utils/utils";
import { cloneDeep } from 'lodash'
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
      productListCopy: [],
      currentProduct: null,
      currentProductIdx: -1,
      loading: true,
      modalShow: false,
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      quantityMinLimit: 1
    }
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.gotoDetails = this.gotoDetails.bind(this)
  }
  get totalNum () {
    return this.state.productList.reduce((pre, cur) => { return pre + cur.quantity }, 0)
  }
  handleAmountChange (e, item) {
    const val = e.target.value
    if (val === '') {
      item.quantity = val
      this.setState({
        productList: this.state.productList
      })
    } else {
      const { quantityMinLimit } = this.state
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit
      }
      item.quantity = tmp
      this.setState({
        productListCopy: this.state.productListCopy
      })
      if (item.quantity <= item.sizeList.find(s => s.selected).stock) {
        this.setState({
          productList: cloneDeep(this.state.productListCopy)
        });
      }
    }
  }
  changeCache () {
    localStorage.setItem(
      "rc-cart-data",
      JSON.stringify(this.state.productList)
    )
    this.setState({
      cartData: this.state.productList
    })
  }
  addQuantity (item) {
    item.quantity++
    this.setState({
      productListCopy: this.state.productListCopy
    });
    if (item.quantity <= item.sizeList.find(s => s.selected).stock) {
      this.setState({
        productList: cloneDeep(this.state.productListCopy)
      });
    }
    this.changeCache();
  }
  subQuantity (item) {
    if (item.quantity > 1) {
      item.quantity--
      this.setState({
        productListCopy: this.state.productListCopy
      })
      if (item.quantity <= item.sizeList.find(s => s.selected).stock) {
        this.setState({
          productList: cloneDeep(this.state.productListCopy)
        });
      }
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
      currentProductIdx: -1,
      modalShow: false,
    });
  }
  deleteProduct () {
    let { currentProductIdx, productList } = this.state;
    let newProductList = cloneDeep(productList)
    newProductList.splice(currentProductIdx, 1)
    this.setState({
      productListCopy: newProductList,
      productList: newProductList
    }, () => {
      this.changeCache();
      this.closeModal();
    })
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
      productList: productList || [],
      productListCopy: cloneDeep(productList || [])
    });
  }
  gotoDetails (pitem) {
    sessionStorage.setItem('rc-goods-cate-name', pitem.goodsCateName || '')
    sessionStorage.setItem('rc-goods-name', pitem.goodsName)
    createHashHistory().push('/details/' + pitem.sizeList[0].goodsInfoId)
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
                style={{ maxWidth: '100px' }}
                src={pitem.goodsImg}
                alt={pitem.goodsName}
                title={pitem.goodsName}
              />
            </div>
            <div className="product-info__desc w-100 relative">
              <div className="line-item-header rc-margin-top--xs rc-padding-right--sm">
                <a className="ui-cursor-pointer" onClick={() => this.gotoDetails(pitem)}>
                  <h4 className="rc-gamma rc-margin--none">{pitem.goodsName}</h4>
                </a>
              </div>
              <div className="cart-product-error-msg"></div>
              <span
                className="remove-product-btn js-remove-product rc-icon rc-close--sm rc-iconography"
                onClick={() => {
                  this.setState({
                    currentProduct: pitem,
                    currentProductIdx: index,
                    modalShow: true
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
                                  {sizeItem.detailName}
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
                          type="number"
                          value={pitem.quantity}
                          min="1"
                          max="10"
                          onChange={(e) => this.handleAmountChange(e, pitem)}
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
                          $ {formatMoney(pitem.quantity * pitem.sizeList.filter((el) => el.selected)[0].salePrice)}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="availability  product-availability">
                <div className="align-left flex rc-content-v-right rc-md-up">
                  <div className="stock__wrapper">
                    <div className="stock">
                      <label className={['availability', pitem.quantity <= pitem.sizeList.find(s => s.selected).stock ? 'instock' : 'outofstock'].join(' ')} >
                        <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                      </label>
                      <span className="availability-msg">
                        <div
                          className={[pitem.quantity <= pitem.sizeList.find(s => s.selected).stock ? '' : 'out-stock'].join(' ')}>
                          {pitem.quantity <= pitem.sizeList.find(s => s.selected).stock ? <FormattedMessage id="details.inStock" /> : <FormattedMessage id="details.outStock" />}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-margin-bottom--sm rc-md-down">
            <div className="product-card-footer product-card-price d-flex">
              <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                <div className="rc-quantity d-flex">
                  <span
                    className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                    data-quantity-error-msg="Количество не может быть меньше 1"
                    onClick={() => this.subQuantity(pitem)}></span>
                  <input
                    className="rc-quantity__input"
                    type="number"
                    value={pitem.quantity}
                    onChange={() => this.handleAmountChange(pitem)}
                    min="1"
                    max="10" />
                  <span
                    className=" rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                    data-quantity-error-msg="Вы не можете заказать больше 10"
                    onClick={() => this.addQuantity(pitem)}></span>
                </div>
              </div>
              <div className="line-item-total-price d-flex justify-content-center">
                <p className="line-item-price-info line-item-total-price-amount rc-margin-bottom--none rc-margin-right--xs flex-grow-1 text-right">=</p>
                <div className="item-total-f6a6279ea1978964b8bf0e3524 price">
                  <div className="strike-through non-adjusted-price">
                    null
                  </div>
                  <b className="pricing line-item-total-price-amount item-total-f6a6279ea1978964b8bf0e3524 light">
                    $ {formatMoney(pitem.quantity * pitem.sizeList.filter((el) => el.selected)[0].salePrice)}
                  </b>
                </div>
              </div>
            </div>
            <div className="availability  product-availability">
              <div className="align-left flex rc-content-v-right">
                <div className="stock__wrapper">
                  <div className="stock" style={{ margin: '.5rem 0 -.4rem' }}>
                    <label className={['availability', pitem.quantity <= pitem.sizeList.find(s => s.selected).stock ? 'instock' : 'outofstock'].join(' ')} >
                      <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                    </label>
                    <span className="availability-msg">
                      <div
                        className={[pitem.quantity <= pitem.sizeList.find(s => s.selected).stock ? '' : 'out-stock'].join(' ')}>
                        {pitem.quantity <= pitem.sizeList.find(s => s.selected).stock ? <FormattedMessage id="details.inStock" /> : <FormattedMessage id="details.outStock" />}
                      </div>
                    </span>
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
    const { results, productList, productListCopy, loading } = this.state;

    const List = this.getProducts(this.state.productListCopy);
    let total = 0;
    this.state.productList.map((pitem) => {
      total =
        total +
        pitem.quantity * pitem.sizeList.filter((el) => el.selected)[0].salePrice;
    });
    return (
      <div>
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main className={['rc-content--fixed-header', productList.length ? '' : 'cart-empty'].join(' ')}>
          <div className="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing">
            {productList.length
              ? <React.Fragment>
                <div className="rc-layout-container rc-one-column">
                  <div className="rc-column">
                    <FormattedMessage id="continueShopping">
                      {txt => (
                        <a href="#" onClick={(e) => this.goBack(e)} title={txt}>
                          <span className="rc-header-with-icon rc-header-with-icon--gamma">
                            <span className="rc-icon rc-left rc-iconography"></span>
                            {txt}
                          </span>
                        </a>
                      )}
                    </FormattedMessage>
                  </div>
                </div>
                <div className="rc-layout-container rc-three-column cart cart-page">
                  <div className="rc-column rc-double-width">
                    <div className="rc-padding-bottom--xs cart-error-messaging cart-error" style={{ display: this.state.errorShow ? 'block' : 'none' }}>
                      <aside className="rc-alert rc-alert--error rc-alert--with-close" role="alert">
                        <span style={{ paddingLeft: 0 }}><FormattedMessage id="cart.errorInfo" /></span>
                      </aside>
                    </div>
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        <FormattedMessage id="cart.yourBasket" />
                      </h5>
                    </div>
                    <div id="product-cards-container">{List}</div>
                  </div>
                  <div className="rc-column totals cart__total">
                    <div className="rc-padding-bottom--xs">
                      <h5 className="rc-espilon rc-border-bottom rc-border-colour--interface rc-padding-bottom--xs">
                        <FormattedMessage id="total" />
                      </h5>
                    </div>
                    <div className="group-order rc-border-all rc-border-colour--interface cart__total__content">
                      <div className="row">
                        <div className="col-12 total-items medium">
                          <span>{this.totalNum}</span> {this.totalNum > 1 ? 'items' : 'item'} in the basket
                    </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FormattedMessage id="total" />
                        </div>
                        <div className="col-4 no-padding-left">
                          <p className="text-right sub-total">$ {formatMoney(total)}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <p>
                            <FormattedMessage id="delivery" />
                          </p>
                        </div>
                        <div className="col-4">
                          <p className="text-right shipping-cost">0</p>
                        </div>
                      </div>
                      <div className="group-total">
                        <div className="row">
                          <div className="col-7 medium">
                            <strong>
                              <FormattedMessage id="totalCost" />
                            </strong>
                          </div>
                          <div className="col-5">
                            <p className="text-right grand-total-sum medium">$ {formatMoney(total)}</p>
                          </div>
                        </div>
                        <div className="row checkout-proccess">
                          <div className="col-lg-12 checkout-continue">
                            <Link to="/prescription">
                              <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                                <div
                                  data-oauthlogintargetendpoint="2"
                                  className="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn "
                                  aria-pressed="true">
                                  <FormattedMessage id="checkout" />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
              : <React.Fragment>
                <div className="rc-text-center">
                  <div className="rc-beta rc-margin-bottom--sm">
                    <FormattedMessage id="cart.yourBasket" />
                  </div>
                  <div className="rc-gamma title-empty">
                    <FormattedMessage id="header.basketEmpty" />
                  </div>
                </div>
                <div className="content-asset">
                  <div className="rc-bg-colour--brand3 rc-padding--sm">
                    <div className="rc-max-width--lg rc-padding-x--lg--mobile">
                      <div>
                        <div className="rc-alpha inherit-fontsize">
                          <p style={{ textAlign: 'center' }}>
                            <FormattedMessage id="cart.fullPrice" />
                          </p>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap ui-pet-item text-center">
                          <div className="ui-item border radius-3">
                            <Link to="/list/dogs">
                              <img className="w-100" src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw85b28211/New content/packshot_13.11.png?sw=498&amp;sh=281&amp;sm=fit&amp;cx=2&amp;cy=0&amp;cw=1996&amp;ch=1126&amp;sfrm=png" alt="Dog" />
                              <br /><h4 className="card__title red">
                                <FormattedMessage id="cart.dogDiet" />
                              </h4>
                            </Link>
                          </div>
                          <div className="ui-item border radius-3">
                            <Link to="/list/cats">
                              <img className="w-100" src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3b01991e/Bloc Cat.png?sw=1920&amp;sh=1080&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=498&amp;ch=280&amp;sfrm=png" alt="Cat" />
                              <br /><h4 className="card__title red">
                                <FormattedMessage id="cart.catDiet" />
                              </h4>
                            </Link>
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
                  <FormattedMessage id="cart.deletInfo" />
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.closeModal()}
                >
                  <span aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body delete-confirmation-body">
                <FormattedMessage id="cart.deletInfo2" />
                <p className="product-to-remove">
                  {this.state.currentProduct ? this.state.currentProduct.name : ""}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-dismiss="modal"
                  onClick={() => this.closeModal()}
                >
                  <FormattedMessage id="cancel" />
                </button>
                <button
                  type="button"
                  className="btn btn-primary cart-delete-confirmation-btn"
                  data-dismiss="modal"
                  onClick={() => this.deleteProduct()}
                >
                  <FormattedMessage id="yes" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Cart;
