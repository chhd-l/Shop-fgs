import React from 'react'
import Skeleton from 'react-skeleton-loader'
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router-dom"
import { formatMoney } from '@/utils/utils'
import { find } from 'lodash'
import {
  sitePurchases,
  siteMiniPurchases,
  mergePurchase
} from '@/api/cart'
import { MINIMUM_AMOUNT } from '@/utils/constant'

class LoginCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: [],
      showCart: false,
      checkoutLoading: false,
      tradePrice: '',
      totalNum: 0,
      loading: true
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  async componentDidMount () {
    // 合并购物车(登录后合并非登录态的购物车数据)
    const unloginCartData = localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    if (unloginCartData.length) {
      await mergePurchase({
        purchaseMergeDTOList: unloginCartData.map(ele => {
          return {
            goodsInfoId: find(ele.sizeList, s => s.selected).goodsInfoId,
            goodsNum: ele.quantity,
            invalid: false
          }
        })
      })
      localStorage.removeItem('rc-cart-data')
    }
    this.updateCartCache()
  }
  async updateCartCache () {
    // 获取购物车列表
    this.setState({ loading: true })
    const siteMiniPurchasesRes = await siteMiniPurchases()
    const context = siteMiniPurchasesRes.context
    this.setState({
      cartData: context.goodsList,
      totalNum: context.num,
      loading: false
    })
  }
  handleMouseOver () {
    this.flag = 1
    this.setState({
      showCart: true
    })
  }
  handleMouseOut () {
    this.flag = 0
    setTimeout(() => {
      if (!this.flag) {
        this.setState({
          showCart: false,
          errMsg: ''
        })
      }
    }, 500)
  }
  get totalPrice () {
    let ret = 0
    this.state.cartData.map(item => {
      return ret += item.salePrice * item.buyCount
    })
    return ret
  }
  async handleCheckout () {
    const { cartData } = this.state
    this.setState({ checkoutLoading: true })
    // 获取总价
    let sitePurchasesRes = await sitePurchases({ goodsInfoIds: cartData.map(ele => ele.goodsInfoId) })
    sitePurchasesRes = sitePurchasesRes.context

    this.setState({
      checkoutLoading: false,
      tradePrice: sitePurchasesRes.tradePrice
    }, () => {
      if (this.state.tradePrice < MINIMUM_AMOUNT) {
        this.setState({
          errMsg: <FormattedMessage id="cart.errorInfo3" />
        })
        return false
      }

      // 库存不够，不能下单
      if (find(cartData, ele => ele.buyCount > ele.stock)) {
        this.setState({
          errMsg: <FormattedMessage id="cart.errorInfo2" />
        })
        return false
      }

      // promotion相关
      sessionStorage.setItem('goodsMarketingMap', JSON.stringify(sitePurchasesRes.goodsMarketingMap))
      sessionStorage.setItem('rc-totalInfo', JSON.stringify({
        totalPrice: sitePurchasesRes.totalPrice,
        tradePrice: sitePurchasesRes.tradePrice,
        discountPrice: sitePurchasesRes.discountPrice
      }))

      localStorage.setItem('rc-cart-data-login', JSON.stringify(cartData))
      this.props.history.push('/prescription')
    })
  }
  render () {
    const { cartData, totalNum, loading } = this.state
    return (
      <span
        className="minicart inlineblock"
        style={{ verticalAlign: this.props.showSearchInput ? 'initial' : '' }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        <Link to="/cart" className="minicart-link" data-loc="miniCartOrderBtn" title="Basket">
          <i className="minicart-icon rc-btn rc-btn less-width-xs rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
          <span className="minicart-quantity">{loading ? '--' : totalNum}</span>
        </Link>
        {
          !totalNum && !loading
            ?
            <div className={['popover', 'popover-bottom', this.state.showCart ? 'show' : ''].join(' ')}>
              <div className="container cart">
                <div className="minicart__footer__msg text-center minicart-padding">
                  <span className="minicart__pointer"></span>
                  <div className="minicart__empty">
                    <img className="cart-img" src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwbedbf812/images/cart.png" alt="Интернет-магазин ROYAL CANIN®" />
                    <p className="rc-delta"><FormattedMessage id="header.basketEmpty" /></p>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className={['popover', 'popover-bottom', this.state.showCart ? 'show' : ''].join(' ')} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
              <div className="container cart">
                <div>
                  <div className="minicart__header cart--head small">
                    <span className="minicart__pointer"></span>
                    <div className="d-flex minicart_freeshipping_info align-items-center">
                      <i className="rc-icon rc-incompatible--xs rc-brand3 rc-padding-right--xs"></i>
                      <p><FormattedMessage id="miniBasket" /></p>
                    </div>
                  </div>
                  <div className="minicart-padding rc-bg-colour--brand4 rc-padding-top--sm rc-padding-bottom--xs">
                    <span className="rc-body rc-margin--none">
                      {
                        loading
                          ? <b>--</b>
                          : <>
                            <FormattedMessage id="total" /> <b>{formatMoney(this.totalPrice)}</b>
                          </>
                      }
                    </span>
                    <Link to="/cart" className="rc-styled-link pull-right" role="button" aria-pressed="true"><FormattedMessage id="chang" /></Link>
                  </div>
                  <div style={{ margin: '0 2%', display: this.state.errMsg ? 'block' : 'none' }}>
                    <aside className="rc-alert rc-alert--error rc-alert--with-close" role="alert" style={{ padding: '.5rem' }}>
                      <span style={{ paddingLeft: '0' }}>{this.state.errMsg}</span>
                    </aside>
                  </div>
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                    <a
                      onClick={this.handleCheckout}
                      className={['rc-btn', 'rc-btn--one', 'rc-btn--sm', 'btn-block', 'cart__checkout-btn', 'checkout-btn', this.state.checkoutLoading ? 'ui-btn-loading' : ''].join(' ')}
                      style={{ color: '#fff' }}>
                      <FormattedMessage id="checkout" />
                    </a>
                  </div>
                  <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                    <span className="rc-meta">
                      {
                        cartData.length > 1
                          ? <FormattedMessage
                            id="itemsInCart2"
                            values={{ val: <b>{cartData.length}</b> }}
                          />
                          : <FormattedMessage
                            id="itemsInCart"
                            values={{ val: <b>{cartData.length}</b> }}
                          />
                      }
                    </span>
                  </div>
                  <div className="minicart-error cart-error">
                  </div>
                  <div className="product-summary limit">
                    {
                      loading
                        ? <div className="pt-2 pb-2"><Skeleton color="#f5f5f5" width="100%" count={2} /></div>
                        : cartData.map((item, idx) => (
                          <div className="minicart__product" key={item.goodsInfoId}>
                            <div>
                              <div className="product-summary__products__item">
                                <div className="product-line-item">
                                  <div className="product-line-item-details d-flex flex-row">
                                    <div className="item-image">
                                      <img className="product-image"
                                        src={item.goodsInfoImg}
                                        alt={item.goodsName}
                                        title={item.goodsName} />
                                    </div>
                                    <div className="wrap-item-title">
                                      <div className="item-title">
                                        <div className="line-item-name capitalize">
                                          <span className="light">{item.goodsName}</span>
                                        </div>
                                      </div>
                                      <div className="line-item-total-price justify-content-start pull-left">
                                        <div className="item-attributes">
                                          <p className="line-item-attributes">{item.specText} - {item.buyCount > 1 ? `${item.buyCount} products` : `${item.buyCount} product`}</p>
                                        </div>
                                      </div>
                                      <div className="line-item-total-price justify-content-end pull-right">
                                        <div className="item-total-07984de212e393df75a36856b6 price relative">
                                          <div className="strike-through non-adjusted-price">null</div>
                                          <b className="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light">{formatMoney(item.salePrice * item.buyCount)}</b>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item-options">
                                  </div>
                                  <div className="line-item-promo item-07984de212e393df75a36856b6">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
        }
      </span>
    )
  }
}

export default LoginCart