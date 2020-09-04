import React from 'react'
import Skeleton from 'react-skeleton-loader'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from "react-router-dom"
import { formatMoney } from '@/utils/utils'
import { inject, observer } from 'mobx-react'
import { toJS } from "mobx";
import PetModal from '@/components/PetModal'

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject("checkoutStore", "headerCartStore")
@observer
class LoginCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkoutLoading: false,
      petModalVisible: false,
      isAdd: 0
    }
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  async componentDidMount () {
    // console.log(this.props.history, 'history')
    if(!sessionItemRoyal.get('recommend_product') && this.props.history.location.pathname !== '/payment/payment' ) {
      console.log(sessionItemRoyal.get('recommend_product'), this.props.history.location.pathname, 'history')
      this.checkoutStore.updateLoginCart()
    }
  }
  get checkoutStore () {
    return this.props.checkoutStore
  }
  get cartData () {
    return this.props.checkoutStore.loginCartData.slice()
  }
  get totalNum () {
    return this.cartData.reduce((prev, cur) => { return prev + cur.buyCount }, 0)
  }
  get loading () {
    return this.checkoutStore.loadingCartData
  }
  get tradePrice () {
    return this.props.checkoutStore.tradePrice
  }
  async handleCheckout () {
    this.setState({ checkoutLoading: true })
    this.checkoutStore.updateLoginCart()
    this.setState({ checkoutLoading: false })
    if (this.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
      this.props.headerCartStore.setErrMsg(<FormattedMessage id="cart.errorInfo3" values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }} />)
      return false
    }

    // 存在下架商品，不能下单
    if (this.props.checkoutStore.offShelvesProNames.length) {
      this.props.headerCartStore.setErrMsg(<FormattedMessage id="cart.errorInfo4"
        values={{ val: this.props.checkoutStore.offShelvesProNames.join('/') }} />)
      return false
    }

    // 库存不够，不能下单
    if (this.props.checkoutStore.outOfstockProNames.length) {
      this.props.headerCartStore.setErrMsg(<FormattedMessage id="cart.errorInfo2"
        values={{ val: this.props.checkoutStore.outOfstockProNames.join('/') }} />)
      return false
    }
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
  render () {
    const { totalNum, cartData, loading } = this
    const { headerCartStore } = this.props
    return (
      <span
        className="minicart inlineblock"
        onMouseOver={() => { headerCartStore.show() }}
        onMouseOut={() => { headerCartStore.hide() }}>
        <Link to="/cart" className="minicart-link" data-loc="miniCartOrderBtn">
          <i className="minicart-icon rc-btn rc-btn less-width-xs rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
          <span className="minicart-quantity">{totalNum}</span>
        </Link>
        {
          !totalNum && !loading
            ?
            <div className={['popover', 'popover-bottom', headerCartStore.visible ? 'show' : ''].join(' ')}>
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
            <div
              className={['popover', 'popover-bottom', headerCartStore.visible ? 'show' : ''].join(' ')}
              onMouseOver={() => { headerCartStore.show() }}
              onMouseOut={() => { headerCartStore.hide() }}>
              <div className="container cart">
                <div>
                  <div className="minicart__header cart--head small">
                    <span className="minicart__pointer"></span>
                    <div className="d-flex minicart_freeshipping_info align-items-center">
                      <i className="rc-icon rc-incompatible--xs rc-brand3 rc-padding-right--xs"></i>
                      <p>
                        {process.env.REACT_APP_IS_PROMOTION === 'true'
                          ? <FormattedMessage id="cart.miniCartTitle" />
                          : <FormattedMessage id="miniBasket" />}
                      </p>
                    </div>
                  </div>
                  <div className="minicart-padding rc-bg-colour--brand4 rc-padding-top--sm rc-padding-bottom--xs">
                    <span className="rc-body rc-margin--none">
                      <FormattedMessage id="total" />{' '}
                      <b>{formatMoney(this.tradePrice)}</b>
                    </span>
                    <Link to="/cart" className="rc-styled-link pull-right" role="button" aria-pressed="true">
                      <FormattedMessage id="chang" />
                    </Link>
                  </div>
                  <div className={`${headerCartStore.errMsg ? '' : 'hidden'}`} style={{ margin: '0 2%' }}>
                    <aside className="rc-alert rc-alert--error rc-alert--with-close text-break" role="alert" style={{ padding: '.5rem' }}>
                      <span className="pl-0">{headerCartStore.errMsg}</span>
                    </aside>
                  </div>
                  <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                    <a
                      onClick={this.handleCheckout}
                      className={`rc-btn rc-btn--one rc-btn--sm btn-block cart__checkout-btn text-white checkout-btn ${this.state.checkoutLoading ? 'ui-btn-loading' : ''}`}>
                      <FormattedMessage id="checkout" />
                    </a>
                  </div>
                  <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                    <span className="rc-meta">
                      <FormattedMessage
                        id="cart.totalProduct"
                        values={{ val: cartData.length }} />
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
                                        <div
                                          className="line-item-name ui-text-overflow-line2 text-break"
                                          title={item.goodsName}>
                                          <span className="light">{item.goodsName}</span>
                                        </div>
                                      </div>
                                      <div className="line-item-total-price justify-content-start pull-left">
                                        <div className="item-attributes">
                                          {
                                            process.env.REACT_APP_LANG!='de'
                                            ?
                                            <p className="line-item-attributes">{item.specText} - {item.buyCount > 1 ? `${item.buyCount} products` : `${item.buyCount} product`}</p>
                                            :
                                            <p className="line-item-attributes">{item.specText} - {`Anzahl: ${item.buyCount}`}</p>
                                          }                                          
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
        {/* <PetModal visible={this.state.petModalVisible}
          isAdd={this.state.isAdd}
          productList={cartData}
          openNew={() => this.openNew()}
          closeNew={() => this.closeNew()}
          confirm={() => this.petComfirm()}
          close={() => this.closePetModal()} /> */}
      </span>
    )
  }
}

export default LoginCart
