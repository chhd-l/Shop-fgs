import React from 'react';

class Header extends React.Component {
  static defaultProps = {
    cartData: [],
    showMiniIcons: false
  }
  constructor(props) {
    super(props)
    this.state = { showCart: false }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }
  get totalNum () {
    return this.props.cartData.reduce((pre, cur) => { return pre + cur.quantity }, 0)
  }
  get totalInfo () {
    let num = this.props.cartData.length
    return num > 1 ? `${num} items` : `${num} item`
  }
  get totalPrice () {
    let ret = 0
    this.props.cartData.map(item => {
      ret += item.quantity * item.sizeList.find(s => s.selected).price
    })
    return ret
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
          showCart: false
        })
      }
    }, 500)
  }
  render () {
    const { cartData } = this.props
    return (
      <header className="rc-header" data-js-header-scroll>
        <nav className="rc-header__nav rc-header__nav--primary">
          <ul className="rc-list rc-list--blank rc-list--inline rc-list--align" role="menubar">
            {/* <li className="rc-list__item">
            <button className="rc-btn rc-btn--icon-label rc-icon rc-menu--xs rc-iconography rc-md-up"
              data-modal-trigger="main-nav-modal" aria-label="Menu">Menu</button>
            <button className="rc-btn rc-btn--icon rc-icon rc-menu--xs rc-iconography rc-md-down"
              data-js-trigger="mobile-push-nav" aria-label="Menu">
              <span className="rc-screen-reader-text">Menu</span>
            </button>
          </li> */}
          </ul>

          <a href="#/" className="rc-header__brand">
            <span className="rc-screen-reader-text">Royal Canin Logo</span>
            <object id="header__logo" className="rc-header__logo" type="image/svg+xml"
              data="https://d1a19ys8w1wkc1.cloudfront.net/logo--animated.svg?v=8-7-8" data-js-import-interactive-svg>
              <img alt="Royal Canin logo" height="100" src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                style={{ backgroundImage: 'url(https://d1a19ys8w1wkc1.cloudfront.net/logo--animated.png?v=8-7-8)' }} width="135" />
            </object>
          </a>

          <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__right" role="menubar">
            {this.props.showMiniIcons ?
              <li className="rc-list__item">
                <button data-js-trigger="search-bar" className="rc-btn rc-btn--icon rc-icon rc-search--xs rc-iconography"
                  aria-label="Search">
                  <span className="rc-screen-reader-text">Search</span>
                </button>
                <span className="minicart inlineblock" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                  <a className="minicart-link" data-loc="miniCartOrderBtn" href="#/cart" title="Basket">
                    <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
                    <span className="minicart-quantity">{this.totalNum}</span>
                  </a>
                  {
                    !this.totalNum
                      ?
                      <div className={['popover', 'popover-bottom', this.state.showCart ? 'show' : ''].join(' ')}>
                        <div className="container cart">
                          <div className="minicart__footer__msg text-center minicart-padding">
                            <span className="minicart__pointer"></span>
                            <div className="minicart__empty">
                              <img className="cart-img" src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwbedbf812/images/cart.png" alt="Интернет-магазин ROYAL CANIN®" />
                              <p className="rc-delta">your basket is empty</p>
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
                                <p>Mini basket</p>
                              </div>
                            </div>
                            <div className="minicart-padding rc-bg-colour--brand4 rc-padding-top--sm rc-padding-bottom--xs">
                              <span className="rc-body rc-margin--none">Total <b className="js-update-minicart-subtotal">{this.totalPrice} ₽</b></span>
                              <a className="rc-styled-link pull-right" href="#/cart" role="button" aria-pressed="true">Change</a>
                            </div>
                            <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                              <miaaoauth data-oauthlogintargetendpoint="2" className="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn " aria-pressed="true">
                                Checkout</miaaoauth>
                            </div>
                            <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                              <span className="rc-meta">
                                You have <b>{this.totalInfo}</b> in your cart</span>
                            </div>
                            <div className="minicart-error cart-error">
                            </div>
                            <div className="product-summary limit">
                              {cartData.map((item, idx) => (
                                <div className="minicart__product" key={item.id + idx}>
                                  <div>
                                    <div className="product-summary__products__item">
                                      <div className="product-line-item">
                                        <div className="product-line-item-details d-flex flex-row">
                                          <div className="item-image">
                                            <img className="product-image"
                                              src={item.url}
                                              alt={item.name}
                                              title={item.name} />
                                          </div>
                                          <div className="wrap-item-title">
                                            <div className="item-title">
                                              <div className="line-item-name capitalize">
                                                <span className="light">{item.name}</span>
                                              </div>
                                            </div>
                                            <div className="line-item-total-price justify-content-start pull-left">
                                              <div className="item-attributes">
                                                <p className="line-item-attributes">{item.sizeList.find(s => s.selected).label + item.sizeList.find(s => s.selected).unit} - {item.quantity > 1 ? `${item.quantity} products` : `${item.quantity} product`}</p>
                                              </div>
                                            </div>
                                            <div className="line-item-total-price justify-content-end pull-right">
                                              <div className="item-total-07984de212e393df75a36856b6 price relative">
                                                <div className="strike-through non-adjusted-price">null</div>
                                                <b className="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light">{item.sizeList.find(s => s.selected).price * item.quantity} ₽</b>
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
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                  }
                </span>
              </li>
              : null}
          </ul>
          <form className="rc-header__search-bar rc-hidden" data-js-target="search-bar" autoComplete="off">
            <button className="rc-btn rc-btn--icon rc-icon rc-search--xs rc-iconography rc-stick-left rc-vertical-align"
              type="submit" aria-label="Search">
              <span className="rc-screen-reader-text">Search</span>
            </button>
            <input data-js-autocomplete className="rc-header__input" placeholder="Start typing to search" id="header-search"
              type="search" value="" />
            <label htmlFor="header-search">
              <span className="rc-screen-reader-text">Start typing to search</span>
            </label>
            <button data-js-trigger="search-bar"
              className="rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography rc-stick-right rc-vertical-align" type="button"
              aria-label="Close">
              <span className="rc-screen-reader-text">Close</span>
            </button>
          </form>
        </nav>

        <nav className="rc-header__nav rc-header__nav--secondary rc-md-up ">

          <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
            <li className="rc-list__item">
              <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                <li className="rc-list__item">
                  <a className="rc-list__header" href="#/list/cats">CATS</a>
                </li>
              </ul>
            </li>


            <li className="rc-list__item">
              <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                <li className="rc-list__item">
                  <a className="rc-list__header" href="#/list/dogs">DOGS</a>
                </li>
              </ul>
            </li>

            <li className="rc-list__item">
              <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                <li className="rc-list__item">
                  <a className="rc-list__header" href="#/">ABOUT US</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;