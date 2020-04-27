import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router-dom"
import Loading from '@/components/Loading'
import MegaMenu from '@/components/MegaMenu'
import { createHashHistory } from 'history'
import { formatMoney, getParaByName } from "@/utils/utils";
import logoAnimatedPng from "@/assets/images/logo--animated.png";
import logoAnimatedSvg from "@/assets/images/logo--animated.svg";
import './index.css'
import { getList } from '@/api/list'
import { CATEID } from '@/utils/constant'
import { getPrescriptionById } from '@/api/clinic'

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
      showMegaMenu: false,
      clinicsId: sessionStorage.getItem('rc-clinics-id'),
      clinicsName: sessionStorage.getItem('rc-clinics-name')
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.hanldeSearchClick = this.hanldeSearchClick.bind(this)
    this.hanldeSearchCloseClick = this.hanldeSearchCloseClick.bind(this)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.gotoDetails = this.gotoDetails.bind(this)
    this.inputRef = React.createRef();
    this.inputRefMobile = React.createRef();
    this.menuBtnRef = React.createRef();
  }
  async componentDidMount () {
    window.addEventListener('click', (e) => this.hideMenu(e))
    const { location } = this.props
    if (location && location.pathname === '/') {
      let clinicsId = getParaByName(window.location.search || (location ? location.search : ''), 'clinics')
      sessionStorage.setItem('rc-clinics-id', clinicsId)
      this.setState({
        clinicsId: clinicsId
      })
      let tmpName = null
      if (clinicsId) {
        try {
          let res = await getPrescriptionById({ clinicsId })
          if (res.context) {
            tmpName = res.context.clinicsName
          }
        } catch (e) { }
      }
      sessionStorage.setItem('rc-clinics-name', tmpName)
      this.setState({
        clinicsName: tmpName
      })
    }
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.hideMenu)
  }
  get totalNum () {
    return this.props.cartData.reduce((pre, cur) => { return pre + cur.quantity }, 0)
  }
  get totalPrice () {
    let ret = 0
    this.props.cartData.map(item => {
      return ret += item.currentAmount
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
  async getSearchData () {
    const { keywords } = this.state
    this.setState({ loading: true })

    let params = {
      cateId: CATEID,
      keywords,
      propDetails: [],
      pageNum: 0,
      brandIds: [],
      pageSize: 20,
      esGoodsInfoDTOList: [],
      companyType: ''
    }
    let res = await getList(params)
    this.setState({ loading: false })
    if (res && res.context) {
      const esGoods = res.context.esGoods
      if (esGoods && esGoods.content.length) {
        let goodsContent = esGoods.content
        if (res.context.goodsList) {
          goodsContent = goodsContent.map(ele => {
            let ret = Object.assign({}, ele)
            const tmpItem = res.context.goodsList.find(g => g.goodsId === ele.id)
            if (tmpItem) {
              ret = Object.assign(ret, { goodsCateName: tmpItem.goodsCateName, goodsSubtitle: tmpItem.goodsSubtitle })
            }
            return ret
          })
        }
        this.setState({
          result: Object.assign({}, { productList: goodsContent, totalElements: esGoods.totalElements })
        })
      } else {
        this.setState({
          result: Object.assign({}, { productList: [], totalElements: 0 })
        })
      }
    }
  }
  handleItemClick () {
    createHashHistory().push('/list/keywords')
    localStorage.setItem('rc-search-keywords', this.state.keywords)
  }
  gotoDetails (item) {
    sessionStorage.setItem('rc-goods-cate-name', item.goodsCateName || '')
    sessionStorage.setItem('rc-goods-name', item.lowGoodsName)
    createHashHistory().push('/details/' + item.goodsInfos[0].goodsInfoId)
  }
  toggleMenu () {
    this.setState({
      showMegaMenu: !this.state.showMegaMenu
    })
  }
  hideMenu (e) {
    const widget = this.menuBtnRef.current && getComputedStyle(this.menuBtnRef.current)
    if (e.target.id !== 'J-btn-menu' && widget && widget.display !== 'none') {
      this.setState({
        showMegaMenu: false
      })
    }
  }
  renderResultJsx () {
    return this.state.result ?
      <div className="suggestions">
        <div className="container">
          <div className="row d-flex flex-column-reverse flex-sm-row">
            <div className="col-12 rc-column">
              <div className="rc-padding-top--lg--mobile rc-large-intro">
                <FormattedMessage id="goods" />
              </div>
              <div className="suggestions-items row justify-content-end items rc-padding-left--xs">
                {
                  this.state.result.productList.length ?
                    this.state.result.productList.map((item, idx) => (
                      <div className="col-12 item" key={item.id + idx}>
                        <div className="row">
                          <div className="item__image hidden-xs-down_ swatch-circle col-4 col-md-3 col-lg-2">
                            <a className="ui-cursor-pointer" onClick={() => this.gotoDetails(item)}>
                              <img
                                className="swatch__img"
                                alt={item.lowGoodsName}
                                title={item.lowGoodsName}
                                src={item.goodsInfos[0].goodsInfoImg} />
                            </a>
                          </div>
                          <div className="col-8 col-md-9 col-lg-10 rc-padding-top--xs">
                            <a
                              onClick={() => this.gotoDetails(item)}
                              className="productName ui-cursor-pointer"
                              alt={item.lowGoodsName}
                              title={item.lowGoodsName}
                            >
                              {item.lowGoodsName}
                            </a>
                            <div className="rc-meta searchProductKeyword"></div>
                          </div>
                        </div>
                      </div>
                    )) :
                    <p className="">
                      <i className="rc-icon rc-incompatible--xs rc-iconography"></i>
                      <FormattedMessage id="list.errMsg2" />
                    </p>
                }
              </div>
              {
                this.state.result.totalElements ?
                  <div className="rc-margin-top--xs">
                    <a className="productName rc-large-body ui-cursor-pointer" onClick={this.handleItemClick}>
                      <b><FormattedMessage id="viewAllResults" /> ({this.state.result.totalElements})</b>
                    </a>
                  </div> :
                  null
              }

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
      <React.Fragment>
        <div id="page-top" name="page-top"></div>
        <header className="rc-header" data-js-header-scroll>
          <nav className="rc-header__nav rc-header__nav--primary">
            <ul className="rc-list rc-list--blank rc-list--inline rc-list--align" role="menubar">
              {this.props.showMiniIcons ?
                <li className="rc-list__item">
                  <button
                    className="rc-btn rc-btn--icon-label rc-icon rc-menu--xs rc-iconography rc-md-up"
                    aria-label="Menu"
                    id="J-btn-menu"
                    ref={this.menuBtnRef}
                    onClick={this.toggleMenu}>
                    <FormattedMessage id="menu" />
                  </button>
                  <button className={['rc-btn', 'rc-btn--icon', 'rc-icon', 'rc-menu--xs', 'rc-iconography', 'rc-md-down', this.state.showMegaMenu ? 'btn-close' : ''].join(' ')}
                    aria-label="Menu" onClick={this.toggleMenu}>
                    <span className="rc-screen-reader-text">
                      <FormattedMessage id="menu" />
                    </span>
                  </button>
                </li> : null}
            </ul>

            <Link to="/" className="header__nav__brand logo-home">
              <span className="rc-screen-reader-text"></span>
              <object id="header__logo" className="rc-header__logo" type="image/svg+xml"
                data={logoAnimatedSvg} data-js-import-interactive-svg>
                <img alt="Royal Canin" height="100" src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                  style={{ backgroundImage: 'url(' + logoAnimatedPng + ')' }} width="135" />
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
                        <span className="rc-screen-reader-text">
                          <FormattedMessage id="search" />
                        </span>
                      </button>
                      <div className="rc-sm-up">
                        <form
                          className={['inlineblock', 'headerSearch', 'headerSearchDesktop', 'relative', this.state.showSearchInput ? '' : 'rc-hidden'].join(' ')}
                          role="search"
                          name="simpleSearch"
                          onSubmit={e => { e.preventDefault() }}>
                          <span className="rc-input rc-input--full-width" input-setup="true">
                            <button className="rc-input__submit rc-input__submit--search" type="submit">
                              <span className="rc-screen-reader-text"></span>
                            </button>
                            <FormattedMessage id='header.startTypingToSearch'>
                              {(txt) => (
                                <input
                                  ref={this.inputRef}
                                  className="search-field"
                                  type="search"
                                  autoComplete="off"
                                  placeholder={txt}
                                  value={this.state.keywords}
                                  onChange={this.handleSearchInputChange} />
                              )}
                            </FormattedMessage>
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
                                  <span className="rc-body rc-margin--none"><FormattedMessage id="total" /> <b>$ {formatMoney(this.totalPrice)}</b></span>
                                  <Link to="/cart" className="rc-styled-link pull-right" role="button" aria-pressed="true"><FormattedMessage id="chang" /></Link>
                                </div>
                                <div className="rc-padding-y--xs rc-column rc-bg-colour--brand4">
                                  <Link to="/prescription" className="rc-btn rc-btn--one rc-btn--sm btn-block checkout-btn cart__checkout-btn">
                                    <FormattedMessage id="checkout" />
                                  </Link>
                                </div>
                                <div className="rc-bg-colour--brand4 minicart-padding rc-body rc-margin--none rc-padding-y--xs">
                                  <span className="rc-meta">
                                    {
                                      this.props.cartData.length > 1
                                        ? <FormattedMessage
                                          id="itemsInCart2"
                                          values={{ val: <b>{this.props.cartData.length}</b> }}
                                        />
                                        : <FormattedMessage
                                          id="itemsInCart"
                                          values={{ val: <b>{this.props.cartData.length}</b> }}
                                        />
                                    }
                                  </span>
                                </div>
                                <div className="minicart-error cart-error">
                                </div>
                                <div className="product-summary limit">
                                  {cartData.map((item, idx) => (
                                    <div className="minicart__product" key={item.goodsId + idx}>
                                      <div>
                                        <div className="product-summary__products__item">
                                          <div className="product-line-item">
                                            <div className="product-line-item-details d-flex flex-row">
                                              <div className="item-image">
                                                <img className="product-image"
                                                  src={item.goodsImg}
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
                                                    <p className="line-item-attributes">{item.sizeList.find(s => s.selected).detailName} - {item.quantity > 1 ? `${item.quantity} products` : `${item.quantity} product`}</p>
                                                  </div>
                                                </div>
                                                <div className="line-item-total-price justify-content-end pull-right">
                                                  <div className="item-total-07984de212e393df75a36856b6 price relative">
                                                    <div className="strike-through non-adjusted-price">null</div>
                                                    <b className="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light">$ {formatMoney(item.currentAmount)}</b>
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
                    <Link to="/list/cats" className="rc-list__header">
                      <FormattedMessage id="cats" />
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="rc-list__item">
                <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                  <li className="rc-list__item">
                    <Link className="rc-list__header" to="/list/dogs">
                      <FormattedMessage id="dogs" />
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="rc-list__item">
                <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                  <li className="rc-list__item">
                    <a className="rc-list__header" href="https://www.royalcanin.com/mx/about-us">
                      <FormattedMessage id="aboutUs" />
                    </a>
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
                  <span className="screen-reader-text"><FormattedMessage id="search" /></span>
                </button>
                <FormattedMessage id='header.startTypingToSearch'>
                  {(txt) => (
                    <input
                      ref={this.inputRefMobile}
                      type="search"
                      className="form-control search-field rc-header__input"
                      placeholder={txt}
                      autoComplete="off"
                      aria-label="Start typing to search"
                      value={this.state.keywords}
                      onChange={this.handleSearchInputChange}
                      style={{ padding: '1rem 4rem' }} />
                  )}
                </FormattedMessage>
                <div className="suggestions-wrapper">{this.renderResultJsx()}</div>
                <button className="rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle" type="button" aria-label="Close" onClick={this.hanldeSearchCloseClick}>
                  <span className="screen-reader-text"><FormattedMessage id="close" /></span>
                </button>
              </form>
            </div>
          </div>
          {this.state.loading ? <Loading /> : null}
          <MegaMenu show={this.state.showMegaMenu} />
        </header>
        {this.state.clinicsId && this.state.clinicsName && this.props.showMiniIcons ? <div className="tip-clinics"><FormattedMessage id="clinic.clinic" />: {this.state.clinicsName}</div> : null}
      </React.Fragment>
    )
  }
}

export default Header