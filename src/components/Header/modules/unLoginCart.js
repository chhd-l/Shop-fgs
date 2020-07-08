import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router-dom"
import LoginButton from '@/components/LoginButton'
import {
  formatMoney,
  hanldePurchases
} from '@/utils/utils'
import { find } from 'lodash'
import { MINIMUM_AMOUNT } from '@/utils/constant'
import { inject } from 'mobx-react'

@inject("checkoutStore")
class UnloginCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCart: false,
      checkoutLoading: false
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
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
  get selectedCartData () {
    return this.props.checkoutStore.cartData.filter(ele => ele.selected)
  }
  get totalNum () {
    return this.selectedCartData.reduce((pre, cur) => { return pre + cur.quantity }, 0)
  }
  get totalPrice () {
    let ret = 0
    this.selectedCartData.map(item => {
      return ret += item.currentAmount
    })
    return ret
  }
  async handleCheckout ({ needLogin = false } = {}) {
    const { history } = this.props
    let tmpValidateAllItemsStock = true
    this.setState({ checkoutLoading: true })
    if (this.selectedCartData.length) {
      let productList = this.selectedCartData
      let param = productList.map(ele => {
        return {
          goodsInfoId: find(ele.sizeList, s => s.selected).goodsInfoId,
          goodsNum: ele.quantity,
          invalid: false
        }
      })
      let res = await hanldePurchases(param)
      let latestGoodsInfos = res.goodsInfos
      let outOfstockProNames = []
      productList.map(item => {
        let selectedSize = find(item.sizeList, s => s.selected)
        const tmpObj = find(latestGoodsInfos, l => l.goodsId === item.goodsId && l.goodsInfoId === selectedSize.goodsInfoId)
        if (tmpObj) {
          selectedSize.stock = tmpObj.stock
          if (item.quantity > tmpObj.stock) {
            tmpValidateAllItemsStock = false
            outOfstockProNames.push(tmpObj.goodsInfoName + ' ' + tmpObj.specText)
          }
        }
      })

      sessionStorage.setItem('rc-totalInfo', JSON.stringify({
        totalPrice: res.totalPrice,
        tradePrice: res.tradePrice,
        discountPrice: res.discountPrice
      }))
      this.setState({
        checkoutLoading: false,
        validateAllItemsStock: tmpValidateAllItemsStock,
        tradePrice: res.tradePrice
      })

      if (res.tradePrice < MINIMUM_AMOUNT) {
        this.setState({
          errMsg: <FormattedMessage id="cart.errorInfo3" />
        })
        return false
      }
      if (!tmpValidateAllItemsStock) {
        this.setState({
          errMsg: <FormattedMessage id="cart.errorInfo2" values={{ val: outOfstockProNames.join('/') }} />
        })
        return false
      }
      if (needLogin) {
        // history.push({ pathname: '/login', state: { redirectUrl: '/cart' } })
      } else {
        history.push('/prescription')
      }
    }
  }
  render () {
    return (
      <span
        className="minicart inlineblock"
        style={{ verticalAlign: this.props.showSearchInput ? 'initial' : '' }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        <Link to="/cart" className="minicart-link" data-loc="miniCartOrderBtn" title="Basket">
          <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
          <span className="minicart-quantity">{this.totalNum}</span>
        </Link>
        {
          !this.totalNum
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
                    <span className="rc-body rc-margin--none"><FormattedMessage id="total" /> <b>{formatMoney(this.totalPrice)}</b></span>
                    <Link to="/cart" className="rc-styled-link pull-right" role="button" aria-pressed="true"><FormattedMessage id="chang" /></Link>
                  </div>
                  <div style={{ margin: '0 2%', display: this.state.errMsg ? 'block' : 'none' }}>
                    <aside className="rc-alert rc-alert--error rc-alert--with-close" role="alert" style={{ padding: '.5rem' }}>
                      <span style={{ paddingLeft: '0' }}>{this.state.errMsg}</span>
                    </aside>
                  </div>
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                    {/* <a
                      onClick={() => this.handleCheckout({ needLogin: true })}
                      className={`rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn checkout-btn ${this.state.checkoutLoading ? 'ui-btn-loading' : ''}`}
                      style={{ color: '#fff' }}>
                      <FormattedMessage id="checkout" />
                    </a> */}
                    <LoginButton
                      beforeLoginCallback={async () => this.handleCheckout({ needLogin: true })}
                      btnClass={`rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn checkout-btn ${this.state.checkoutLoading ? 'ui-btn-loading' : ''}`}
                      history={this.props.history}>
                      <FormattedMessage id="checkout" />
                    </LoginButton>
                  </div>
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4 text-center">
                    <a
                      onClick={() => this.handleCheckout()}
                      className={`rc-styled-link color-999 ${this.state.checkoutLoading ? 'ui-btn-loading ui-btn-loading-border-red' : ''}`}>
                      <FormattedMessage id="GuestCheckout" />
                    </a>
                  </div>
                  <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                    <span className="rc-meta">
                      {
                        this.selectedCartData.length > 1
                          ? <FormattedMessage
                            id="itemsInCart2"
                            values={{ val: <b>{this.selectedCartData.length}</b> }}
                          />
                          : <FormattedMessage
                            id="itemsInCart"
                            values={{ val: <b>{this.selectedCartData.length}</b> }}
                          />
                      }
                    </span>
                  </div>
                  <div className="minicart-error cart-error">
                  </div>
                  <div className="product-summary limit">
                    {this.selectedCartData.map((item, idx) => (
                      <div className="minicart__product" key={item.goodsId + idx}>
                        <div>
                          <div className="product-summary__products__item">
                            <div className="product-line-item">
                              <div className="product-line-item-details d-flex flex-row">
                                <div className="item-image">
                                  <img className="product-image"
                                    src={find(item.sizeList, s => s.selected).goodsInfoImg}
                                    alt={item.goodsName}
                                    title={item.goodsName} />
                                </div>
                                <div className="wrap-item-title">
                                  <div className="item-title">
                                    <div
                                      className="line-item-name capitalize ui-text-overflow-line2 text-break"
                                      title={item.goodsName}>
                                      <span className="light">{item.goodsName}</span>
                                    </div>
                                  </div>
                                  <div className="line-item-total-price justify-content-start pull-left">
                                    <div className="item-attributes">
                                      <p className="line-item-attributes">{find(item.sizeList, s => s.selected).specText} - {item.quantity > 1 ? `${item.quantity} products` : `${item.quantity} product`}</p>
                                    </div>
                                  </div>
                                  <div className="line-item-total-price justify-content-end pull-right">
                                    <div className="item-total-07984de212e393df75a36856b6 price relative">
                                      <div className="strike-through non-adjusted-price">null</div>
                                      <b className="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light">{formatMoney(item.currentAmount)}</b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="item-options">
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        }
      </span>
    )
  }
}

export default UnloginCart