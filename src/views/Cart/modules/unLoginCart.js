
import React from "react";
import { FormattedMessage } from 'react-intl'
import { inject } from 'mobx-react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ConfirmTooltip from '@/components/ConfirmTooltip'
import LoginButton from '@/components/LoginButton'
import { Link } from "react-router-dom"
import { formatMoney, hanldePurchases } from "@/utils/utils"
import { MINIMUM_AMOUNT } from '@/utils/constant'
import { cloneDeep, find } from 'lodash'
import CART_CAT from "@/assets/images/CART_CAT.webp";
import CART_DOG from "@/assets/images/CART_DOG.webp";

@inject("checkoutStore")
class UnLoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorShow: false,
      errorMsg: '',
      productList: [],
      currentProductIdx: -1,
      loading: true,
      quantityMinLimit: 1,
      checkoutLoading: false
    }
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.gotoDetails = this.gotoDetails.bind(this)
    this.headerRef = React.createRef();
  }
  get totalNum () {
    return this.state.productList.filter(ele => ele.selected).reduce((pre, cur) => { return pre + cur.quantity }, 0)
  }
  get totalPrice () {
    return this.props.checkoutStore.totalPrice
  }
  get tradePrice () {
    return this.props.checkoutStore.tradePrice
  }
  get discountPrice () {
    return this.props.checkoutStore.discountPrice
  }
  get isPromote () {
    return parseInt(this.discountPrice) > 0
  }
  componentDidMount () {
    this.setCartData()
  }
  setCartData () {
    this.setState({
      productList: this.props.checkoutStore.cartData
    })
  }
  async handleCheckout ({ needLogin = false } = {}) {
    const { history } = this.props;

    // 价格未达到底限，不能下单
    if (this.tradePrice < MINIMUM_AMOUNT) {
      this.setState({
        errorShow: true,
        errorMsg: <FormattedMessage id="cart.errorInfo3" />
      })
      return false
    }

    this.setState({ checkoutLoading: true })
    try {
      await this.updateStock()
      // 库存不够，不能下单
      if (this.props.checkoutStore.outOfstockProNames.length) {
        this.setState({
          errorShow: true,
          errorMsg: <FormattedMessage id="cart.errorInfo2"
            values={{ val: this.props.checkoutStore.outOfstockProNames.length.join('/') }} />
        })
        return false
      }
      if (needLogin) {
        // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        history.push('/prescription')
      }
    } catch (e) {
      console.log(e)
      this.setState({
        errorShow: true,
        errorMsg: e.toString()
      })
    } finally {
      this.setState({ checkoutLoading: false })
    }
  }
  handleAmountChange (e, item) {
    this.setState({ errorShow: false })
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
      item.quantity = tmp
      this.setState({
        productList: this.state.productList
      }, () => {
        this.updateStock()
      })
    }
  }
  addQuantity (item) {
    this.setState({ errorShow: false })
    item.quantity++
    this.setState({
      productList: this.state.productList
    }, () => {
      this.updateStock()
    })
  }
  subQuantity (item) {
    this.setState({ errorShow: false })
    if (item.quantity > 1) {
      item.quantity--
      this.setState({
        productList: this.state.productList
      }, () => {
        this.updateStock()
      })
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
  deleteProduct (item) {
    let { currentProductIdx, productList } = this.state
    item.confirmTooltipVisible = false
    let newProductList = cloneDeep(productList)
    newProductList.splice(currentProductIdx, 1)
    this.setState({
      productList: newProductList
    }, () => {
      this.updateStock()
    })
  }
  goBack (e) {
    e.preventDefault();
    const { history } = this.props
    history.goBack()
  }
  async updateStock () {
    const { productList } = this.state
    this.setState({ checkoutLoading: true })
    await this.props.checkoutStore.updateUnloginCart(productList)
    this.setState({ checkoutLoading: false })
  }
  gotoDetails (pitem) {
    sessionStorage.setItem('rc-goods-cate-name', pitem.goodsCateName || '')
    sessionStorage.setItem('rc-goods-name', pitem.goodsName)
    this.props.history.push('/details/' + pitem.sizeList[0].goodsInfoId)
  }
  toggleSelect (pitem) {
    pitem.selected = !pitem.selected
    this.setState({
      productList: this.state.productList
    }, () => {
      this.updateStock()
    })
  }
  getProducts (plist) {
    const { checkoutLoading } = this.state
    const Lists = plist.map((pitem, index) => (
      <div
        className="rc-border-all rc-border-colour--interface product-info"
        key={index}>
        <div
          className="rc-input rc-input--inline position-absolute"
          style={{ left: '1%' }}
          onClick={() => this.toggleSelect(pitem)}>
          {
            pitem.selected
              ? <input
                type="checkbox"
                className="rc-input__checkbox"
                key={1}
                checked />
              : <input
                type="checkbox"
                className="rc-input__checkbox"
                key={2} />
          }
          <label className="rc-input__label--inline">&nbsp;</label>
        </div>
        <div className="d-flex pl-3">
          <div className="product-info__img w-100">
            <img
              className="product-image"
              style={{ maxWidth: '100px' }}
              src={find(pitem.sizeList, s => s.selected).goodsInfoImg}
              alt={pitem.goodsName}
              title={pitem.goodsName}
            />
          </div>
          <div className="product-info__desc w-100 relative">
            <div className="line-item-header rc-margin-top--xs rc-padding-right--sm">
              <a className="ui-cursor-pointer" onClick={() => this.gotoDetails(pitem)}>
                <h4
                  className="rc-gamma rc-margin--none ui-text-overflow-line2 text-break"
                  title={pitem.goodsName}>
                  {pitem.goodsName}
                </h4>
              </a>
            </div>
            <div className="cart-product-error-msg"></div>
            <span className="remove-product-btn">
              <span
                className="rc-icon rc-close--sm rc-iconography"
                onClick={() => {
                  this.updateConfirmTooltipVisible(pitem, true)
                  this.setState({ currentProductIdx: index })
                }}
              />
              <ConfirmTooltip
                display={pitem.confirmTooltipVisible}
                confirm={e => this.deleteProduct(pitem)}
                updateChildDisplay={status => this.updateConfirmTooltipVisible(pitem, status)} />
            </span>

            <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
              <div className="product-quickview product-null product-wrapper product-detail">
                <div className="detail-panel">
                  <section className="attributes">
                    <div data-attr="size" className="swatch">
                      <div className="cart-and-ipay">
                        <div className="rc-swatch __select-size">
                          <div className="rc-swatch__item selected">
                            <span>
                              {find(pitem.sizeList, s => s.selected).specText}
                              <i></i>
                            </span>
                          </div>
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
                    <div className="price">
                      <b className="pricing line-item-total-price-amount light" style={{ lineHeight: checkoutLoading ? 1.2 : '' }}>
                        {checkoutLoading ? '--' : formatMoney(pitem.quantity * pitem.sizeList.filter((el) => el.selected)[0].salePrice)}
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
                    <label className={['availability', pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? 'instock' : 'outofstock'].join(' ')} >
                      <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                    </label>
                    <span className="availability-msg">
                      <div
                        className={[pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? '' : 'out-stock'].join(' ')}>
                        {pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? <FormattedMessage id="details.inStock" /> : <FormattedMessage id="details.outStock" />}
                      </div>
                    </span>
                  </div>
                  <div className="promotion stock" style={{ display: this.isPromote ? 'inline-block' : 'none' }}>
                    <label className={['availability', pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? 'instock' : 'outofstock'].join(' ')} >
                      <span><FormattedMessage id="promotion" /> :</span>
                    </label>
                    <span className="availability-msg">
                      25% OFF
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
                  onClick={() => this.subQuantity(pitem)}></span>
                <input
                  className="rc-quantity__input"
                  value={pitem.quantity}
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
                  {formatMoney(pitem.quantity * pitem.sizeList.filter((el) => el.selected)[0].salePrice)}
                </b>
              </div>
            </div>
          </div>
          <div className="availability product-availability">
            <div className="align-left flex rc-content-v-right">
              <div className="stock__wrapper">
                <div className="stock" style={{ margin: '.5rem 0 -.4rem' }}>
                  <label className={['availability', pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? 'instock' : 'outofstock'].join(' ')} >
                    <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                  </label>
                  <span className="availability-msg">
                    <div className={`${pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? '' : 'out-stock'}`}>
                      {
                        pitem.quantity <= find(pitem.sizeList, s => s.selected).stock
                          ? <FormattedMessage id="details.inStock" />
                          : <FormattedMessage id="details.outStock" />
                      }
                    </div>
                  </span>
                </div>
                <div className="promotion stock" style={{ marginTop: '7px', display: this.isPromote ? 'inline-block' : 'none' }}>
                  <label className={['availability', pitem.quantity <= find(pitem.sizeList, s => s.selected).stock ? 'instock' : 'outofstock'].join(' ')} >
                    <span><FormattedMessage id="promotion" /> :</span>
                  </label>
                  <span className="availability-msg">
                    25% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return Lists;
  }
  get total () {
    let total = 0;
    this.state.productList.map((pitem) => {
      total =
        total +
        pitem.quantity * pitem.sizeList.filter((el) => el.selected)[0].salePrice;
    });
    return total
  }
  updateConfirmTooltipVisible (item, status) {
    let { productList } = this.state
    item.confirmTooltipVisible = status
    this.setState({
      productList: productList
    })
  }
  render () {
    const { productList, checkoutLoading } = this.state;
    const List = this.getProducts(this.state.productList);
    const event = {
      page: {
        type: 'Cart',
        theme: ''
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header ref={this.headerRef} showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className={['rc-content--fixed-header', productList.length ? '' : 'cart-empty'].join(' ')}>
          <div className="rc-bg-colour--brand3 rc-max-width--xl rc-padding--sm rc-bottom-spacing">
            {productList.length
              ? <>
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
                      <aside className="rc-alert rc-alert--error rc-alert--with-close text-break" role="alert">
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
                          <span>{checkoutLoading ? '--' : this.totalNum}</span> {this.totalNum > 1 ? 'items' : 'item'} in the basket
                    </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FormattedMessage id="total" />
                        </div>
                        <div className="col-4 no-padding-left">
                          <p className="text-right sub-total">{checkoutLoading ? '--' : formatMoney(this.totalPrice)}</p>
                        </div>
                      </div>
                      <div className="row" style={{ display: this.isPromote ? 'flex' : 'none' }}>
                        <div className="col-4">
                          <p style={{ color: '#ec001a' }}>
                            <FormattedMessage id="promotion" />
                          </p>
                        </div>
                        <div className="col-8">
                          <p className="text-right shipping-cost" style={{ color: '#ec001a' }}>- {checkoutLoading ? '--' : formatMoney(this.discountPrice)}</p>
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
                              <FormattedMessage id="totalIncluIVA" />
                            </strong>
                          </div>
                          <div className="col-5">
                            <p className="text-right grand-total-sum medium">{checkoutLoading ? '--' : formatMoney(this.tradePrice)}</p>
                          </div>
                        </div>
                        <div className="row checkout-proccess">
                          <div className="col-lg-12 checkout-continue">
                            <a className={[checkoutLoading ? 'ui-btn-loading' : ''].join(' ')}>
                              <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                                {
                                  this.totalNum > 0
                                    ? <LoginButton
                                      beforeLoginCallback={async () => this.handleCheckout({ needLogin: true })}
                                      btnClass="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width"
                                      history={this.props.history}>
                                      <FormattedMessage id="checkout" />
                                    </LoginButton>
                                    : <div className="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width rc-btn-solid-disabled">
                                      <FormattedMessage id="checkout" />
                                    </div>
                                }
                              </div>
                              <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                                {
                                  this.totalNum > 0
                                    ? <div className="text-center" onClick={() => this.handleCheckout()}>
                                      <div
                                        className="rc-styled-link color-999"
                                        aria-pressed="true">
                                        <FormattedMessage id="GuestCheckout" />
                                      </div>
                                    </div>
                                    : <div className="text-center">
                                      <div className="rc-styled-link color-999 rc-btn-disabled">
                                        <FormattedMessage id="GuestCheckout" />
                                      </div>
                                    </div>
                                }
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              : <>
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
                                src={CART_DOG}
                                alt="Dog" />
                              <br />
                              <h4 className="card__title red">
                                <FormattedMessage id="cart.dogDiet" />
                              </h4>
                            </Link>
                          </div>
                          <div className="ui-item border radius-3">
                            <Link to="/list/cats">
                              <img
                                className="w-100"
                                style={{ padding: '3rem 0 4rem' }}
                                src={CART_CAT}
                                alt="Cat" />
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
              </>
            }
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default UnLoginCart