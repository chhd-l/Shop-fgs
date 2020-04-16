import React from 'react';

class Header extends React.Component {
  static defaultProps = {
    cartData: []
  }
  get totalNum () {
    return this.props.cartData.reduce((pre, cur) => { return pre + cur.quantity }, 0)
  }
  get totalInfo () {
    let num = this.totalNum
    return num > 1 ? `${num} items` : `${num} item`
  }
  get totalPrice () {
    let ret = 0
    this.props.cartData.map(item => {
      ret += item.quantity * item.sizeList.find(s => s.selected).price
    })
    return ret
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
            <li className="rc-list__item">
              <button data-js-trigger="search-bar" className="rc-btn rc-btn--icon rc-icon rc-search--xs rc-iconography"
                aria-label="Search">
                <span className="rc-screen-reader-text">Search</span>
              </button>
              <span class="minicart inlineblock" data-action-url="/on/demandware.store/Sites-RU-Site/ru_RU/Cart-MiniCartShow">
                <a class="minicart-link" data-loc="miniCartOrderBtn" href="#/cart" title="Basket">
                  <i class="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon rc-cart--xs rc-iconography rc-interactive"></i>
                  <span class="minicart-quantity">{this.totalNum}</span>
                </a>
                {/* <div class="popover popover-bottom"></div> */}
                {/* <div class="popover popover-bottom show">
                <div class="container cart">
                  <div class="minicart__footer__msg text-center minicart-padding">
                    <span class="minicart__pointer"></span>
                    <div class="minicart__empty">
                      <img class="cart-img" src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwbedbf812/images/cart.png" alt="Интернет-магазин ROYAL CANIN®" />
                      <p class="rc-delta">your basket is empty</p>
                    </div>
                  </div>
                </div>
              </div> */}
                {/* minicart-fade */}
                <div class="popover popover-bottom show" style={{ display: 'none' }}>
                  <div class="container cart">
                    <div>
                      <div class="minicart__header cart--head small">
                        <span class="minicart__pointer"></span>
                        <div class="d-flex minicart_freeshipping_info align-items-center">
                          <i class="rc-icon rc-incompatible--xs rc-brand3 rc-padding-right--xs"></i>
                          <p>Mini basket</p>
                        </div>
                      </div>
                      <div class="minicart-padding rc-bg-colour--brand4 rc-padding-top--sm rc-padding-bottom--xs">
                        <span class="rc-body rc-margin--none">Total <b class="js-update-minicart-subtotal">{this.totalPrice} ₽</b></span>
                        <a class="rc-styled-link pull-right" href="#/cart" role="button" aria-pressed="true">Change</a>
                      </div>
                      <div class="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                        <miaaoauth data-oauthlogintargetendpoint="2" class="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn " aria-pressed="true">
                          Checkout</miaaoauth>
                      </div>
                      <div class="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                        <span class="rc-meta">
                          You have <b>{this.totalInfo}</b> in your cart</span>
                      </div>
                      <div class="minicart-error cart-error">
                      </div>
                      <div class="product-summary">
                        {cartData.map((item, idx) => (
                          <div class="minicart__product" key={item.id + idx}>
                            <div>
                              <div class="product-summary__products__item">
                                <div class="product-line-item">
                                  <div class="product-line-item-details d-flex flex-row">
                                    <div class="item-image">
                                      <img class="product-image"
                                        src={item.url}
                                        alt={item.name}
                                        title={item.name} />
                                    </div>
                                    <div class="wrap-item-title">
                                      <div class="item-title">
                                        <div class="line-item-name capitalize">
                                          <span class="light">{item.name}</span>
                                        </div>
                                      </div>
                                      <div class="line-item-total-price justify-content-start pull-left">
                                        <div class="item-attributes">
                                          <p class="line-item-attributes">{item.sizeList.find(s => s.selected).label + item.sizeList.find(s => s.selected).unit} - {item.quantity > 1 ? `${item.quantity} products` : `${item.quantity} product`}</p>
                                        </div>
                                      </div>
                                      <div class="line-item-total-price justify-content-end pull-right">
                                        <div class="item-total-07984de212e393df75a36856b6 price relative">
                                          <div class="strike-through non-adjusted-price">null</div>
                                          <b class="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light">3 678 ₽</b>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="item-options">
                                  </div>
                                  <div class="line-item-promo item-07984de212e393df75a36856b6">
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
              </span>
            </li>
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