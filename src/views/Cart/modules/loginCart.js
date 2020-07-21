
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConfirmTooltip from '@/components/ConfirmTooltip'
import PetModal from '@/components/PetModal'
import { Link } from 'react-router-dom'
import { formatMoney, mergeUnloginCartData } from '@/utils/utils'
import { MINIMUM_AMOUNT, SUBSCRIPTION_DISCOUNT_RATE } from '@/utils/constant'
import { find } from 'lodash'
import { getPetList } from '@/api/pet'
import { getCustomerInfo } from "@/api/user"
import {
  updateBackendCart,
  deleteItemFromBackendCart
} from '@/api/cart'
import CART_CAT from "@/assets/images/CART_CAT.webp";
import CART_DOG from "@/assets/images/CART_DOG.webp";
import { debug } from "semantic-ui-react/dist/commonjs/lib";

@inject("checkoutStore")
@observer
class LoginCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorShow: false,
      errorMsg: '',
      productList: [],
      currentProductIdx: -1,
      quantityMinLimit: 1,
      quantityMaxLimit: 30,
      deleteLoading: false,
      checkoutLoading: false,
      petModalVisible: false,
      isAdd: 0
    }
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.gotoDetails = this.gotoDetails.bind(this)
    this.headerRef = React.createRef();
  }
  async componentDidMount () {
    // 合并购物车(登录后合并非登录态的购物车数据)
    const unloginCartData = this.checkoutStore.cartData
    if (unloginCartData.length) {
      await mergeUnloginCartData()
    }
    this.setData()
  }
  get checkoutStore () {
    return this.props.checkoutStore
  }
  get totalNum () {
    return this.state.productList.reduce((prev, cur) => { return prev + cur.buyCount }, 0)
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
  get deliveryPrice () {
    return this.props.checkoutStore.deliveryPrice
  }
  async updateCartCache () {
    this.setState({ checkoutLoading: true })
    await this.checkoutStore.updateLoginCart()
    this.setData()
    this.setState({ checkoutLoading: false })
  }
  setData () {
    this.setState({
      productList: this.checkoutStore.loginCartData,
      checkoutLoading: false
    })
  }
  /**
   * 加入后台购物车
   */
  async updateBackendCart (param) {
    await updateBackendCart(param)
    this.updateCartCache()
  }
  /**
   * 删除某个产品
   *
   */
  async deleteItemFromBackendCart (param) {
    await deleteItemFromBackendCart(param)
    this.updateCartCache()
  }
  async handleCheckout () {
    const { productList } = this.state
    // 价格未达到底限，不能下单
    if (this.tradePrice < MINIMUM_AMOUNT) {
      window.scrollTo({ behavior: "smooth", top: 0 })
      this.showErrMsg(<FormattedMessage id="cart.errorInfo3" />)
      return false
    }

    // 库存不够，不能下单
    if (this.props.checkoutStore.outOfstockProNames.length) {
      window.scrollTo({ behavior: "smooth", top: 0 })
      this.showErrMsg(<FormattedMessage id="cart.errorInfo2"
        values={{ val: this.props.checkoutStore.outOfstockProNames.join('/') }} />)
      return false
    }

    this.checkoutStore.setLoginCartData(productList)
    // this.openPetModal()
    this.props.history.push('/prescription')
  }
  openPetModal () {
    this.setState({
      petModalVisible: true
    })
  }
  closePetModal () {
    if (this.state.isAdd === 2) {
      this.setState({
        isAdd: 0
      })
    }
    this.setState({
      petModalVisible: false
    })
  }
  showErrMsg (msg) {
    this.setState({
      errorShow: true,
      errorMsg: msg
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        errorShow: false
      })
    }, 3000)
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
      const { quantityMinLimit, quantityMaxLimit } = this.state
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
        this.showErrMsg(<FormattedMessage id="cart.errorInfo" />)
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit
        this.showErrMsg(<FormattedMessage id="cart.errorInfo" />)
      }
      if (tmp > quantityMaxLimit) {
        tmp = quantityMaxLimit
      }
      item.buyCount = tmp
      this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
    }
  }
  addQuantity (item) {
    this.setState({ errorShow: false })
    if (item.buyCount < 30) {
      item.buyCount++
      this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
    } else {
      this.showErrMsg(<FormattedMessage id="cart.errorMaxInfo" />)
    }

  }
  subQuantity (item) {
    this.setState({ errorShow: false })
    if (item.buyCount > 1) {
      item.buyCount--
      this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
    } else {
      this.showErrMsg(<FormattedMessage id="cart.errorInfo" />)
    }
  }
  async deleteProduct (item) {
    let { currentProductIdx, productList } = this.state
    item.confirmTooltipVisible = false
    this.setState({
      productList: productList,
      deleteLoading: true
    })
    await this.deleteItemFromBackendCart({ goodsInfoIds: [productList[currentProductIdx].goodsInfoId] })
    this.setState({ deleteLoading: false })
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
  toggleSelect (pitem) {
    // todo 请求接口
    // pitem.selected = !pitem.selected
    // this.setState({
    //   productList: this.state.productList
    // })
  }
  getProducts (plist) {
    const { checkoutLoading } = this.state
    const Lists = plist.map((pitem, index) => (
      <div
        className="rc-border-all rc-border-colour--interface product-info"
        key={index}>
        <div
          className="rc-input rc-input--inline position-absolute hidden"
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
              src={pitem.goodsInfoImg}
              alt={pitem.goodsName}
              title={pitem.goodsName}
            />
          </div>
          <div className="product-info__desc w-100 relative">
            <div className="line-item-header rc-margin-top--xs rc-padding-right--sm" style={{ width: '80%' }}>
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
                              {pitem.specText}
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
                    <div className="price">
                      <b className="pricing line-item-total-price-amount light">
                        {formatMoney(pitem.buyCount * pitem.salePrice)}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="availability  product-availability">
              <div className="flex justify-content-between rc-md-up">
                <div>
                  {
                    pitem.subscriptionStatus
                      ? <>
                        <span className="rc-icon rc-refresh--xs rc-brand1"></span>
                        <FormattedMessage id="details.Subscription" />{' '}-{' '}
                        <span style={{ fontSize: '.85em' }}>
                          <FormattedMessage id="subscription.promotionTip" values={{ val: SUBSCRIPTION_DISCOUNT_RATE }} />
                        </span>
                      </>
                      : null
                  }
                </div>
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
                  <div className="promotion stock" style={{ display: parseInt(this.discountPrice) > 0 ? 'inline-block' : 'none' }}>
                    <label className={['availability', pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
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
            <div className="flex justify-content-between flex-wrap">
              <div>
                {
                  pitem.subscriptionStatus
                    ? <>
                      <span className="rc-icon rc-refresh--xs rc-brand1"></span>
                      <FormattedMessage id="details.Subscription" />{' '}-{' '}
                      <span style={{ fontSize: '.85em' }}>
                        <FormattedMessage id="subscription.promotionTip" values={{ val: SUBSCRIPTION_DISCOUNT_RATE }} />
                      </span>
                    </>
                    : null
                }
              </div>
              <div className="stock__wrapper">
                <div className="stock" style={{ margin: '.5rem 0 -.4rem' }}>
                  <label className={['availability', pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
                    <span className="title-select"><FormattedMessage id="details.availability" /> :</span>
                  </label>
                  <span className="availability-msg">
                    <div className={[pitem.buyCount <= pitem.stock ? '' : 'out-stock'].join(' ')}>
                      {
                        pitem.buyCount <= pitem.stock
                          ? <FormattedMessage id="details.inStock" />
                          : <FormattedMessage id="details.outStock" />
                      }
                    </div>
                  </span>
                </div>
                <div className="promotion stock" style={{ marginTop: '7px', display: parseInt(this.discountPrice) > 0 ? 'inline-block' : 'none' }}>
                  <label className={['availability', pitem.buyCount <= pitem.stock ? 'instock' : 'outofstock'].join(' ')} >
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
      </div >
    ));
    return Lists;
  }
  updateConfirmTooltipVisible (item, status) {
    let { productList } = this.state
    item.confirmTooltipVisible = status
    this.setState({
      productList: productList
    })
  }
  petComfirm () {
    this.props.history.push('/prescription')
  }
  openNew () {
    this.setState({
      isAdd: 1
    })
    this.openPetModal()
  }
  closeNew () {
    this.setState({
      isAdd: 2
    })
    this.openPetModal()
  }
  sideCart ({ className = '', style = {}, id = '' } = {}) {
    const { productList, checkoutLoading } = this.state
    return <div
      className={`group-order rc-border-all rc-border-colour--interface cart__total__content ${className}`}
      style={{ ...style }}
      id={id}>
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
          <p className="text-right sub-total">{formatMoney(this.totalPrice)}</p>
        </div>
      </div>
      <div className="row" style={{ display: parseInt(this.discountPrice) > 0 ? 'flex' : 'none' }}>
        <div className="col-4">
          <p style={{ color: '#ec001a' }}>
            <FormattedMessage id="promotion" />
          </p>
        </div>
        <div className="col-8">
          <p className="text-right shipping-cost" style={{ color: '#ec001a' }}>- {formatMoney(this.discountPrice)}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <p>
            <FormattedMessage id="delivery" />
          </p>
        </div>
        <div className="col-4">
          <p className="text-right shipping-cost">{formatMoney(this.deliveryPrice)}</p>
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
            <p className="text-right grand-total-sum medium">{formatMoney(this.tradePrice)}</p>
          </div>
        </div>
        <div className="row checkout-proccess">
          <div className="col-lg-12 checkout-continue">
            <a onClick={() => this.handleCheckout()}>
              <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                <div
                  data-oauthlogintargetendpoint="2"
                  className={`rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn rc-full-width ${checkoutLoading ? 'ui-btn-loading' : ''} `}
                  aria-pressed="true">
                  <FormattedMessage id="checkout" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div >
  }
  render () {
    const { productList } = this.state;
    const List = this.getProducts(productList);
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
                        <a onClick={(e) => this.goBack(e)} title={txt}>
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
                    <div id="J_sidecart_container">
                      {this.sideCart({
                        className: 'hidden position-fixed rc-md-up',
                        style: {
                          background: '#fff',
                          zIndex: 9,
                          width: 320
                        },
                        id: 'J_sidecart_fix'
                      })}
                      {this.sideCart()}
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
                                src={CART_CAT}
                                alt="Cat" />
                              <br />
                              <h4 className="card__title red">
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
        {/* <PetModal visible={this.state.petModalVisible}
          isAdd={this.state.isAdd}
          productList={this.state.productList}
          openNew={() => this.openNew()}
          closeNew={() => this.closeNew()}
          confirm={() => this.petComfirm()}
          close={() => this.closePetModal()} /> */}
      </div>
    );
  }
}

export default LoginCart
