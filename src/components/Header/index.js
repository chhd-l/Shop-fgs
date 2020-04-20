import React from 'react'
import { Link } from "react-router-dom"
import Loading from '@/components/Loading'
import MegaMenu from '@/components/MegaMenu'
import { createHashHistory } from 'history'
import './index.css'

class Header extends React.Component {
  static defaultProps = {
    cartData: [],
    showMiniIcons: false
  }
  constructor(props) {
    super(props)
    this.state = {
      showCart: false,
      showSearchInput: false,
      keywords: '',
      loading: false,
      result: null,
      showMegaMenu: false
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.hanldeSearchClick = this.hanldeSearchClick.bind(this)
    this.hanldeSearchCloseClick = this.hanldeSearchCloseClick.bind(this)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.inputRef = React.createRef();
    this.inputRefMobile = React.createRef();
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
      return ret += item.quantity * item.sizeList.find(s => s.selected).price
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
  hanldeSearchClick () {
    this.setState({
      showSearchInput: true
    }, () => {
      setTimeout(() => {
        this.inputRef.current.focus()
        this.inputRefMobile.current.focus()
      })
    })
  }
  hanldeSearchCloseClick () {
    this.setState({
      showSearchInput: false,
      keywords: '',
      result: null
    })
  }
  handleSearchInputChange (e) {
    this.setState({
      keywords: e.target.value
    }, () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getSearchData();
      }, 500)
    })
  }
  getSearchData () {
    const { keywords } = this.state
    this.setState({ loading: true })
    console.log('query keywords search interface', keywords)
    setTimeout(() => {
      let res = {
        total: 20,
        productName: 'mini',
        productList: [
          {
            id: '3003_RU',
            name: 'Mini adult',
            url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
            img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
            description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
            price: 945
          },
          {
            id: '3001_RU',
            name: 'Mini adult',
            url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
            img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
            description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
            price: 33
          }
        ]
      }
      this.setState({
        result: res && res.productList.length ? res : null,
        loading: false
      })
    }, 1000)
  }
  handleItemClick () {
    createHashHistory().push('/list/keywords')
    localStorage.setItem('rc-search-keywords', this.state.keywords)
  }
  toggleMenu () {
    this.setState({
      showMegaMenu: !this.state.showMegaMenu
    })
  }
  renderResultJsx () {
    return this.state.result ?
      <div className="suggestions">
        <div className="container">
          <div className="row d-flex flex-column-reverse flex-sm-row">
            <div className="col-12 col-md-7 rc-column">
              <div className="rc-padding-top--lg--mobile rc-large-intro">Goods</div>
              <div className="suggestions-items row justify-content-end items rc-padding-left--xs">
                {this.state.result.productList.map(item => (
                  <div className="col-12 item" key={item.id}>
                    <div className="row">
                      <div className="item__image hidden-xs-down_ swatch-circle col-4 col-md-3 col-lg-2">
                        <Link to={`/details/${item.id}`}>
                          <img
                            className="swatch__img"
                            alt={item.name}
                            title={item.name}
                            src={item.url} />
                        </Link>
                      </div>
                      <div className="col-8 col-md-9 col-lg-10 rc-padding-top--xs">
                        <Link
                          to={`/details/${item.id}`}
                          className="productName"
                          alt={item.name}
                          title={item.name}
                        >
                          {item.name}
                        </Link>
                        <div className="rc-meta searchProductKeyword"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rc-margin-top--xs">
                <a className="productName rc-large-body ui-cursor-pointer" onClick={this.handleItemClick}>
                  <b>View all results ({this.state.result.total})</b>
                </a>
              </div>
            </div>
            <div className="col-12 col-md-5 rc-bg-colour--brand4 rc-column d-flex flex-column rc-padding-top--md--mobile">
              <a onClick={this.handleItemClick} className="productName ui-cursor-pointer" title={this.state.result.productName} alt={this.state.result.productName}>
                {this.state.result.productName}
              </a>
            </div>
          </div>
          <span className="d-sm-none_ more-below">
            <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      : null
  }
  render () {
    const { cartData } = this.props
    return (
      <header className="rc-header" data-js-header-scroll>
        <nav className="rc-header__nav rc-header__nav--primary">
          <ul className="rc-list rc-list--blank rc-list--inline rc-list--align" role="menubar">
            {this.props.showMiniIcons ?
              <li className="rc-list__item">
                <button className="rc-btn rc-btn--icon-label rc-icon rc-menu--xs rc-iconography rc-md-up"
                  aria-label="Menu" onClick={this.toggleMenu}>Menu</button>
                <button className={['rc-btn', 'rc-btn--icon', 'rc-icon', 'rc-menu--xs', 'rc-iconography', 'rc-md-down', this.state.showMegaMenu ? 'btn-close' : ''].join(' ')}
                  aria-label="Menu" onClick={this.toggleMenu}>
                  <span className="rc-screen-reader-text">Menu</span>
                </button>
              </li> : null}
          </ul>

          <Link to="/" className="header__nav__brand logo-home">
            <span className="rc-screen-reader-text">Royal Canin Logo</span>
            <object id="header__logo" className="rc-header__logo" type="image/svg+xml"
              data="https://d1a19ys8w1wkc1.cloudfront.net/logo--animated.svg?v=8-7-8" data-js-import-interactive-svg>
              <img alt="Royal Canin logo" height="100" src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                style={{ backgroundImage: 'url(https://d1a19ys8w1wkc1.cloudfront.net/logo--animated.png?v=8-7-8)' }} width="135" />
            </object>
          </Link>

          <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__right" role="menubar">
            {this.props.showMiniIcons ?
              <React.Fragment>
                <li className="rc-list__item">
                  <div className="inlineblock">
                    <button
                      className={['rc-btn', 'rc-btn--icon', 'rc-icon', 'rc-search--xs', 'rc-iconography', this.state.showSearchInput ? 'rc-hidden' : ''].join(' ')}
                      aria-label="Search"
                      onClick={this.hanldeSearchClick}>
                      <span className="rc-screen-reader-text">Search</span>
                    </button>
                    <div className="rc-sm-up">
                      <form
                        className={['inlineblock', 'headerSearch', 'headerSearchDesktop', 'relative', this.state.showSearchInput ? '' : 'rc-hidden'].join(' ')}
                        role="search"
                        name="simpleSearch"
                        onSubmit={e => { e.preventDefault() }}>
                        <span className="rc-input rc-input--full-width" input-setup="true">
                          <button className="rc-input__submit rc-input__submit--search" type="submit">
                            <span className="rc-screen-reader-text">Submit</span>
                          </button>
                          <input
                            ref={this.inputRef}
                            className="search-field"
                            type="search"
                            autoComplete="off"
                            aria-label="Start typing to search"
                            placeholder="Start typing to search"
                            value={this.state.keywords}
                            onChange={this.handleSearchInputChange} />
                          <label className="rc-input__label" htmlFor="id-submit-2">
                            <span className="rc-input__label-text"></span>
                          </label>
                        </span>
                        <input type="hidden" value="null" name="lang" />
                        <span className="rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle rc-padding-top--xs" aria-label="Close" onClick={this.hanldeSearchCloseClick}>
                        </span>
                        <div className="suggestions-wrapper">{this.renderResultJsx()}</div>
                      </form>
                    </div>
                  </div>
                  <span className="minicart inlineblock" style={{ verticalAlign: this.state.showSearchInput ? 'initial' : '' }} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
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
                                <span className="rc-body rc-margin--none">Total <b>{this.totalPrice} ₽</b></span>
                                <Link to="/cart" className="rc-styled-link pull-right" role="button" aria-pressed="true">Change</Link>
                              </div>
                              <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                                <Link to="/payment/shipping" className="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn">
                                  Checkout
                                </Link>
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
              </React.Fragment>
              : null}
          </ul>
        </nav>

        <nav className="rc-header__nav rc-header__nav--secondary rc-md-up ">
          <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
            <li className="rc-list__item">
              <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                <li className="rc-list__item">
                  <Link to="/list/cats" className="rc-list__header">CATS</Link>
                </li>
              </ul>
            </li>

            <li className="rc-list__item">
              <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                <li className="rc-list__item">
                  <Link className="rc-list__header" to="/list/dogs">DOGS</Link>
                </li>
              </ul>
            </li>

            <li className="rc-list__item">
              <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                <li className="rc-list__item">
                  <Link className="rc-list__header" to="/">ABOUT US</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="search">
          <div className="rc-sm-down">
            <form
              className={['rc-header__search-bar', 'headerSearch', this.state.showSearchInput ? '' : 'rc-hidden'].join(' ')}
              role="search"
              name="simpleSearch"
              onSubmit={e => { e.preventDefault() }}>
              <button className="rc-btn rc-btn--icon rc-icon search--xs iconography stick-left rc-vertical-align" type="submit" aria-label="Search">
                <span className="screen-reader-text">Search</span>
              </button>
              <input
                ref={this.inputRefMobile}
                type="search"
                className="form-control search-field rc-header__input"
                placeholder="Start typing to search"
                autoComplete="off"
                aria-label="Start typing to search"
                value={this.state.keywords}
                onChange={this.handleSearchInputChange}
                style={{ padding: '1rem 4rem' }} />
              <div className="suggestions-wrapper">{this.renderResultJsx()}</div>
              <input type="hidden" value="ru_RU" name="lang" />
              <button className="rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle" type="button" aria-label="Close" onClick={this.hanldeSearchCloseClick}>
                <span className="screen-reader-text">Close</span>
              </button>
            </form>
          </div>
        </div>
        {this.state.loading ? <Loading /> : null}
        <MegaMenu show={this.state.showMegaMenu} />
      </header>
    )
  }
}

export default Header;