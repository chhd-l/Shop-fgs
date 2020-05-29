
import React from "react";
import { FormattedMessage } from 'react-intl'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { formatMoney } from "@/utils/utils"
import { MINIMUM_AMOUNT } from '@/utils/constant'
import { find } from 'lodash'
import {
  updateBackendCart,
  deleteItemFromBackendCart,
  sitePurchases,
  siteMiniPurchases
} from '@/api/cart'

class LoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorShow: false,
      errorMsg: '',
      productList: [],
      totalPrice: '',
      tradePrice: '',
      discountPrice: '',
      currentProduct: null,
      currentProductIdx: -1,
      loading: true,
      modalShow: false,
      quantityMinLimit: 1,
      deleteLoading: false,
      checkoutLoading: false,
      validateAllItemsStock: true,
      isPromote: false,
      totalNum: 0
    }
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.gotoDetails = this.gotoDetails.bind(this)
    this.headerRef = React.createRef();
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    this.updateCartCache()
  }
  async updateCartCache () {
    // 获取购物车列表
    this.setState({ checkoutLoading: true })
    let siteMiniPurchasesRes = await siteMiniPurchases()
    siteMiniPurchasesRes = siteMiniPurchasesRes.context
    this.setState({
      productList: siteMiniPurchasesRes.goodsList,
      totalNum: siteMiniPurchasesRes.num
    })
    let sitePurchasesRes = await sitePurchases({ goodsInfoIds: siteMiniPurchasesRes.goodsList.map(ele => ele.goodsInfoId) })
    sitePurchasesRes = sitePurchasesRes.context
    this.setState({
      totalPrice: sitePurchasesRes.totalPrice,
      tradePrice: sitePurchasesRes.tradePrice,
      discountPrice: sitePurchasesRes.discountPrice
    })

    // promotion相关
    let goodsMarketingMapStr = JSON.stringify(sitePurchasesRes.goodsMarketingMap)
    if (goodsMarketingMapStr === "{}") {
      this.setState({
        isPromote: false
      })
    } else {
      this.setState({
        isPromote: true
      })
    }
    sessionStorage.setItem('goodsMarketingMap', JSON.stringify(goodsMarketingMapStr))
    sessionStorage.setItem('rc-totalInfo', JSON.stringify({
      totalPrice: sitePurchasesRes.totalPrice,
      tradePrice: sitePurchasesRes.tradePrice,
      discountPrice: sitePurchasesRes.discountPrice
    }))

    this.setState({ checkoutLoading: false })
  }
  /**
   * 加入后台购物车
   */
  async updateBackendCart (param) {
    await updateBackendCart(param)
    await this.updateCartCache()
    this.headerRef.current.updateCartCache()
  }
  /**
   * 删除某个产品
   * 
   */
  async deleteItemFromBackendCart (param) {
    await deleteItemFromBackendCart(param)
    await this.updateCartCache()
    this.headerRef.current.updateCartCache()
  }
  async handleCheckout () {
    const { productList } = this.state

    // 价格未达到底限，不能下单
    if (this.state.tradePrice < MINIMUM_AMOUNT) {
      this.setState({
        errorShow: true,
        errorMsg: <FormattedMessage id="cart.errorInfo3" />
      })
      return false
    }

    // 库存不够，不能下单
    if (find(productList, ele => ele.buyCount > ele.stock)) {
      this.setState({
        errorShow: true,
        errorMsg: <FormattedMessage id="cart.errorInfo2" />
      })
      return false
    }

    localStorage.setItem('rc-cart-data-login', JSON.stringify(productList))
    this.props.history.push('/prescription')
  }
  handleAmountChange (e, item) {
    this.setState({ errorShow: false })
    const val = e.target.value
    if (val === '') {
      item.buyCount = val
      this.setState({
        productList: this.state.productList
      })
    } else {
      const { quantityMinLimit } = this.state
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
        this.setState({
          errorShow: true,
          errorMsg: <FormattedMessage id="cart.errorInfo" />
        });
        setTimeout(() => {
          this.setState({
            errorShow: false
          });
        }, 2000)
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit
        this.setState({
          errorShow: true,
          errorMsg: <FormattedMessage id="cart.errorInfo" />
        });
        setTimeout(() => {
          this.setState({
            errorShow: false
          });
        }, 2000)
      }
      item.buyCount = tmp
      this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
    }
  }
  changeCache () {
    this.state.productList.map(item => {
      item.currentAmount = item.quantity * find(item.sizeList, s => s.selected).salePrice
    })
    localStorage.setItem(
      "rc-cart-data",
      JSON.stringify(this.state.productList)
    )
    this.headerRef.current.updateCartCache()
  }
  addQuantity (item) {
    this.setState({ errorShow: false })
    item.buyCount++
    this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
  }
  subQuantity (item) {
    this.setState({ errorShow: false })
    if (item.buyCount > 1) {
      item.buyCount--
      this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
    } else {
      this.setState({
        errorShow: true,
        errorMsg: <FormattedMessage id="cart.errorInfo" />
      });
      setTimeout(() => {
        this.setState({
          errorShow: false
        });
      }, 2000)
    }
  }
  closeModal () {
    this.setState({
      currentProduct: null,
      currentProductIdx: -1,
      modalShow: false,
    });
  }
  async deleteProduct () {
    let { currentProductIdx, productList } = this.state
    this.setState({ deleteLoading: true })
    await this.deleteItemFromBackendCart({ goodsInfoIds: [productList[currentProductIdx].goodsInfoId] })
    this.setState({ deleteLoading: false })
    this.closeModal()
  }
  goBack (e) {
    e.preventDefault();
    this.props.history.goBack()
  }
  gotoDetails (pitem) {
    sessionStorage.setItem('rc-goods-cate-name', pitem.goodsCateName || '')
    sessionStorage.setItem('rc-goods-name', pitem.goodsName)
    this.props.history.push('/details/' + pitem.goodsInfoId)
  }
  getProducts (plist) {
    const Lists = plist.map((pitem, index) => (
      <div
        className="rc-border-all rc-border-colour--interface product-info uuid-3ab64fd26c17b64c44e4ba1a7e"
        key={index}
      >
        <div className="">
          <div className="d-flex">
            <div className="product-info__img w-100">
              <img
                className="product-image"
                style={{ maxWidth: '100px' }}
                src={pitem.goodsInfoImg}
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
                            <div className="rc-swatch__item selected">
                              <span>
                                {pitem.specText}
                                <i></i>
                              </span>
                            </div>
                            {/* {pitem.sizeList.map((sizeItem, i) => (
                              <div
                                key={i}
                                className={`rc-swatch__item ${
                                  sizeItem.selected ? "selected" : ""
                                  }`}
                              >
                                <span>
                                  {sizeItem.detailName}
                                  <i></i>
                                </span>
                              </div>
                            ))} */}
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
                          value={pitem.buyCount}
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
                          {formatMoney(pitem.buyCount * pitem.salePrice)}
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
                      <label className={['availability', pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
                        <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                      </label>
                      <span className="availability-msg">
                        <div
                          className={[pitem.buyCount <= pitem.stock ? '' : 'out-stock'].join(' ')}>
                          {pitem.buyCount <= pitem.stock ? <FormattedMessage id="details.inStock" /> : <FormattedMessage id="details.outStock" />}
                        </div>
                      </span>
                    </div>
                    <div className="promotion stock" style={{ display: this.state.isPromote ? 'inline-block' : 'none' }}>
                      <label className={['availability', pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
                        <span><FormattedMessage id="promotion" /> :</span>
                      </label>
                      <span className="availability-msg">
                        {/* {console.log(find(pitem.sizeList, s => s.selected).marketingLabels, 'find(pitem.sizeList, s => s.selected)')} */}
                        <div>
                          {/* <FormattedMessage id="25% OFF" /> */}
                          {/* {find(pitem.sizeList, s => s.selected).marketingLabels[0].marketingDesc} */}
                          25% OFF
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
                    value={pitem.buyCount}
                    onChange={(e) => this.handleAmountChange(e, pitem)}
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
                    {formatMoney(pitem.buyCount * pitem.salePrice)}
                  </b>
                </div>
              </div>
            </div>
            <div className="availability  product-availability">
              <div className="align-left flex rc-content-v-right">
                <div className="stock__wrapper">
                  <div className="stock" style={{ margin: '.5rem 0 -.4rem' }}>
                    <label className={['availability', pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
                      <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                    </label>
                    <span className="availability-msg">
                      <div
                        className={[pitem.buyCount <= pitem.stock ? '' : 'out-stock'].join(' ')}>
                        {pitem.buyCount <= pitem.stock ? <FormattedMessage id="details.inStock" /> : <FormattedMessage id="details.outStock" />}
                      </div>
                    </span>
                  </div>
                  <div className="promotion stock" style={{ marginTop: '7px', display: this.state.isPromote ? 'inline-block' : 'none' }}>
                    <label className={['availability', pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
                      <span className=""><FormattedMessage id="promotion" /> :</span>
                    </label>
                    <span className="availability-msg">
                      {/* {console.log(find(pitem.sizeList, s => s.selected).marketingLabels, 'find(pitem.sizeList, s => s.selected)')} */}
                      <div>
                        {/* <FormattedMessage id="25% OFF" /> */}
                        {/* {find(pitem.sizeList, s => s.selected).marketingLabels[0].marketingDesc} */}
                          25% OFF
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
    const { productList } = this.state;
    const List = this.getProducts(this.state.productList);
    const event = {
      "page": {
        "type": "Cart",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header ref={this.headerRef} showMiniIcons={true} location={this.props.location} history={this.props.history} />
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
                        <span style={{ paddingLeft: 0 }}>{this.state.errorMsg}</span>
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
                          <span>{this.state.totalNum}</span> {this.state.totalNum > 1 ? 'items' : 'item'} in the basket
                    </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FormattedMessage id="total" />
                        </div>
                        <div className="col-4 no-padding-left">
                          <p className="text-right sub-total">{formatMoney(this.state.totalPrice)}</p>
                        </div>
                      </div>
                      <div className="row" style={{ display: this.state.isPromote ? 'flex' : 'none' }}>
                        <div className="col-4">
                          <p style={{ color: '#ec001a' }}>
                            <FormattedMessage id="promotion" />
                          </p>
                        </div>
                        <div className="col-8">
                          <p className="text-right shipping-cost" style={{ color: '#ec001a' }}>- {formatMoney(this.state.discountPrice)}</p>
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
                            <p className="text-right grand-total-sum medium">{formatMoney(this.state.tradePrice)}</p>
                          </div>
                        </div>
                        <div className="row checkout-proccess">
                          <div className="col-lg-12 checkout-continue">
                            <a className="" onClick={() => this.handleCheckout()}>
                              <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                                <div
                                  data-oauthlogintargetendpoint="2"
                                  className={`rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width ${this.state.checkoutLoading ? 'ui-btn-loading' : ''}`}
                                  aria-pressed="true">
                                  <FormattedMessage id="checkout" />
                                </div>
                              </div>
                            </a>
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
                              <img
                                className="w-100"
                                style={{ transform: 'scale(.8)' }}
                                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd94da11c/ENGLISH_COCKER_SPANIEL_ADULT__DERMATOLOGY_EMBLEMATIC_High_Res.___Print.png?sw=500&amp;sh=385&amp;sm=fit&amp;cx=356&amp;cy=161&amp;cw=2088&amp;ch=1608&amp;sfrm=png" alt="Dog" />
                              <br /><h4 className="card__title red">
                                <FormattedMessage id="cart.dogDiet" />
                              </h4>
                            </Link>
                          </div>
                          <div className="ui-item border radius-3">
                            <Link to="/list/cats">
                              <img
                                className="w-100"
                                style={{ padding: '3rem 0 4rem' }}
                                src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwf417a5f2/RUSSIAN_BLUE_ADULT___VHN_DERMATOLOGY_EMBLEMATIC_High_Res.___Print.png?sw=550&amp;sh=300&amp;sm=fit&amp;cx=0&amp;cy=268&amp;cw=2642&amp;ch=1441&amp;sfrm=png" alt="Cat" />
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
                  className={`btn btn-primary cart-delete-confirmation-btn ${this.state.deleteLoading ? 'ui-btn-loading' : ''}`}
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

export default LoginCart