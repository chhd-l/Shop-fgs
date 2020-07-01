import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { find } from 'lodash'
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading'
import MegaMenu from '@/components/MegaMenu'
import { getParaByName, jugeLoginStatus } from '@/utils/utils';
import logoAnimatedPng from "@/assets/images/logo--animated.png";
import logoAnimatedSvg from "@/assets/images/logo--animated.svg";
import { getList } from '@/api/list'
import { CATEID, IMG_DEFAULT } from '@/utils/constant'
import { getPrescriptionById } from '@/api/clinic'
import LoginButton from '@/components/LoginButton'
import UnloginCart from './modules/unLoginCart'
import LoginCart from './modules/loginCart'
import LogoutButton from '@/components/LogoutButton';
import { inject, observer } from 'mobx-react';
import Store from '@/store/store';
import './index.css'

@observer   // 将Casual类转化为观察者，只要被观察者跟新，组件将会刷新
class Header extends React.Component {
  static defaultProps = {
    showMiniIcons: false,
    showUserIcon: false
  }
  constructor(props) {
    super(props)
    this.state = {
      showCart: false,
      showCenter: false,
      showSearchInput: false,
      keywords: '',
      loading: false,
      result: null,
      showMegaMenu: false,
      tradePrice: '',
      prescriberId: sessionStorage.getItem('rc-clinics-id-link'),
      prescriberName: sessionStorage.getItem('rc-clinics-name-link')
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.hanldeSearchClick = this.hanldeSearchClick.bind(this)
    this.hanldeSearchCloseClick = this.hanldeSearchCloseClick.bind(this)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.gotoDetails = this.gotoDetails.bind(this)
    // this.clickLogin = this.clickLogin.bind(this)
    this.clickLogoff = this.clickLogoff.bind(this)

    this.inputRef = React.createRef();
    this.inputRefMobile = React.createRef();
    this.menuBtnRef = React.createRef();
    this.unloginCartRef = React.createRef();
    this.loginCartRef = React.createRef();

    this.handleCenterMouseOver = this.handleCenterMouseOver.bind(this)
    this.handleCenterMouseOut = this.handleCenterMouseOut.bind(this)
  }
  async componentDidMount () {
    if (sessionStorage.getItem('rc-token-lose')) {
      document.querySelector('#J-btn-logoff') && document.querySelector('#J-btn-logoff').click()
      document.querySelector('#J-btn-login') && document.querySelector('#J-btn-login').click()
    }

    window.addEventListener('click', (e) => this.hideMenu(e))
    const { location } = this.props
    let prescriberId
    let tmpName = ''

    // 指定clinic链接进入，设置default clinic
    if (location
      && (location.pathname === '/'
        || location.pathname.includes('/list')
        || location.pathname.includes('/details'))
      && !this.state.prescriberId) {
      prescriberId = getParaByName(window.location.search || (location ? location.search : ''), 'clinic')
      if (prescriberId && !this.state.prescriberName) {
        try {
          let res = await getPrescriptionById({ prescriberId })
          if (res.context && res.context.enabled) {
            tmpName = res.context.prescriberName
          }
        } catch (e) { }
      }
      if (prescriberId && tmpName) {
        sessionStorage.setItem('rc-clinics-id-link', prescriberId)
        sessionStorage.setItem('rc-clinics-name-link', tmpName)
        this.setState({
          prescriberName: tmpName,
          prescriberId: prescriberId
        })
      }
    }

    // 登录状态，设置default clinic
    if (jugeLoginStatus() && localStorage.getItem('rc-userinfo') && !sessionStorage.getItem('rc-clinics-id-select')) {
      let userInfo = JSON.parse(localStorage.getItem('rc-userinfo'))
      if (userInfo.defaultClinics) {
        sessionStorage.setItem('rc-clinics-id-default', userInfo.defaultClinics.clinicsId)
        sessionStorage.setItem('rc-clinics-name-default', userInfo.defaultClinics.clinicsName)
      }
    }
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.hideMenu)
  }
  updateDefaultClinic () {
    this.setState({
      prescriberId: sessionStorage.getItem('rc-clinics-id-link'),
      prescriberName: sessionStorage.getItem('rc-clinics-name-link')
    })
  }
  updateCartCache () {
    if (jugeLoginStatus()) {
      this.loginCartRef.current.updateCartCache()
    } else {
      this.unloginCartRef.current.updateCartCache()
    }
  }
  handleCartMouseOver () {
    if (jugeLoginStatus()) {
      this.loginCartRef.current.handleMouseOver()
    } else {
      this.unloginCartRef.current.handleMouseOver()
    }
  }
  handleCartMouseOut () {
    if (jugeLoginStatus()) {
      this.loginCartRef.current.handleMouseOut()
    } else {
      this.unloginCartRef.current.handleMouseOut()
    }
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

  handleCenterMouseOver () {
    this.setState({
      showCenter: true
    })
  }
  handleCenterMouseOut () {
    this.setState({
      showCenter: false
    })
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
  signUp () {
    // let prefix = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri='
    // let callbackUrl = 'http://localhost:3000?origin=register'
    // let registredUrl = ''
    // if (process.env.NODE_ENV === 'development') {
    //   registredUrl = prefix + encodeURIComponent(callbackUrl)
    // } else if (process.env.NODE_ENV === 'production') {
    //   callbackUrl = process.env.REACT_APP_RegisterCallback
    //   registredUrl = process.env.REACT_APP_RegisterPrefix + encodeURIComponent(callbackUrl)
    // }
    // window.location.href = registredUrl
    const { history } = this.props
    history.push("/login");
    localStorage.setItem('loginType', 'register')

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
    try {
      let res = await getList(params)
      this.setState({ loading: false })
      if (res && res.context) {
        const esGoods = res.context.esGoods
        if (esGoods && esGoods.content.length) {
          let goodsContent = esGoods.content
          if (res.context.goodsList) {
            goodsContent = goodsContent.map(ele => {
              let ret = Object.assign({}, ele)
              const tmpItem = find(res.context.goodsList, g => g.goodsId === ele.id)
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
    } catch (err) {
      this.setState({
        loading: false,
        result: Object.assign({}, { productList: [], totalElements: 0 })
      })
    }
  }
  gotoDetails (item) {
    sessionStorage.setItem('rc-goods-cate-name', item.goodsCateName || '')
    sessionStorage.setItem('rc-goods-name', item.lowGoodsName)
    this.props.history.push('/details/' + item.goodsInfos[0].goodsInfoId)
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
  clickLogin () {
    const { history } = this.props
    history.push('/login')
    localStorage.setItem('loginType', 'login')
  }
  clickLogoff () {
    localStorage.removeItem("rc-token");
    sessionStorage.removeItem('rc-clinics-name-default')
    sessionStorage.removeItem('rc-clinics-id-default')
    localStorage.removeItem('rc-userinfo')
    localStorage.removeItem('rc-cart-data-login')
    // this.setState({
    //   isLogin: false
    // })
    Store.changeIsLogin(false)
    const { history } = this.props
    history.push('/')
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
                                src={item.goodsInfos[0].goodsInfoImg || IMG_DEFAULT} />
                            </a>
                          </div>
                          <div className="col-8 col-md-9 col-lg-10">
                            <a
                              onClick={() => this.gotoDetails(item)}
                              className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
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
                    <p className="d-flex ml-2 mr-2">
                      <i className="rc-icon rc-incompatible--xs rc-iconography"></i>
                      <FormattedMessage id="list.errMsg2" />
                    </p>
                }
              </div>
              {
                this.state.result.totalElements ?
                  <div className="rc-margin-top--xs">
                    <Link
                      className="productName rc-large-body ui-cursor-pointer"
                      to={`/list/keywords/${this.state.keywords}`}>
                      <b><FormattedMessage id="viewAllResults" /> ({this.state.result.totalElements})</b>
                    </Link>
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
    return (
      <>
        <div id="page-top" name="page-top"></div>
        {Store.loginModal ? <Loading /> : null}
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
                  <button
                    className={['rc-btn', 'rc-btn--icon', 'rc-icon', 'rc-menu--xs', 'rc-iconography', 'rc-md-down', this.state.showMegaMenu ? 'btn-close' : ''].join(' ')}
                    aria-label="Menu"
                    onClick={this.toggleMenu}>
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
              <li className="rc-list__item">
                {
                  this.props.showMiniIcons
                    ? <>
                      <div className="inlineblock">
                        <button
                          className={['rc-btn', 'less-width-xs', 'rc-btn--icon', 'rc-icon', 'rc-search--xs', 'rc-iconography', this.state.showSearchInput ? 'rc-hidden' : ''].join(' ')}
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
                      {
                        Store.isLogin
                          ? <LoginCart ref={this.loginCartRef} showSearchInput={this.state.showSearchInput} history={this.props.history} />
                          : <UnloginCart ref={this.unloginCartRef} showSearchInput={this.state.showSearchInput} history={this.props.history} />
                      }
                    </>
                    : null
                }
                {
                  this.props.showUserIcon
                    ? <span
                      className="minicart inlineblock"
                      style={{ verticalAlign: this.state.showSearchInput ? 'initial' : '' }}
                      onMouseOver={this.handleCenterMouseOver} onMouseOut={this.handleCenterMouseOut}>
                      {
                        Store.isLogin ? (
                          <FormattedMessage id="personal">
                            {txt => (
                              <Link
                                to="/account"
                                className="minicart-link"
                                data-loc="miniCartOrderBtn"
                                title={txt}>
                                <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography"></i>
                              </Link>
                            )}
                          </FormattedMessage>
                        ) : (
                            <FormattedMessage id="personal">
                              {txt => (
                                <div
                                  className="minicart-link"
                                  data-loc="miniCartOrderBtn"
                                  title={txt}>
                                  <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography"></i>
                                </div>
                              )}
                            </FormattedMessage>
                          )
                      }


                      {
                        !Store.isLogin
                          ?
                          <div className={['popover', 'popover-bottom', this.state.showCenter ? 'show' : ''].join(' ')} style={{ minWidth: "13rem" }}>
                            <div className="container cart" >
                              <div className="login-style">
                                <LoginButton
                                  updateCartCache={() => this.updateCartCache()}
                                  btnStyle={{ width: "11rem", margin: "2rem 0" }}
                                  history={this.props.history} />
                                {/* <button onClick={() => {
                                  // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=https%3A%2F%2Fshopuat.466920.com%3Forigin%3Dregister'
                                  window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=http%3A%2F%2Flocalhost%3A3000%3Forigin%3Dregister'
                                }}>registred</button> */}
                                {/* <button className="rc-btn rc-btn--one" style={{ width: "11rem", margin: "2rem 0" }}
                                  onClick={() => this.clickLogin()}> <FormattedMessage id='login'/></button> */}
                                <div><FormattedMessage id="account.notRegistred" /></div>
                                <a className="rc-styled-link" onClick={() => {
                                  // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=https%3A%2F%2Fshopuat.466920.com%3Forigin%3Dregister'
                                  window.location.href = process.env.REACT_APP_RegisterPrefix + window.encodeURIComponent(process.env.REACT_APP_RegisterCallback)
                                  // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=http%3A%2F%2Flocalhost%3A3000%3Forigin%3Dregister'
                                  // this.signUp()
                                }}>
                                  <FormattedMessage id="signUp" />
                                </a>
                              </div>

                              {/* <div className="link-group">
                                <div className="link-style" >
                                  <Link to="/account" >
                                    <FormattedMessage id="account.myAccount" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/information" >
                                    <FormattedMessage id="account.basicInfomation" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/pets" >
                                    <FormattedMessage id="account.pets" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/orders" >
                                  <FormattedMessage id="account.orders" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/orders" >
                                    <FormattedMessage id="shippingAddress" />
                                  </Link>
                                </div>

                              </div> */}
                            </div>
                          </div>
                          :
                          <div className={['popover', 'popover-bottom', this.state.showCenter ? 'show' : ''].join(' ')} style={{ minWidth: "13rem" }}
                            onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                            <div className="container cart">
                              <div className="link-group">
                                <div className="link-style" >
                                  <Link to="/account" className="click-hover">
                                    <FormattedMessage id="account.myAccount" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/information" className="click-hover">
                                    <FormattedMessage id="account.basicInfomation" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/pets" className="click-hover" >
                                    <FormattedMessage id="account.pets" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/orders" className="click-hover" >
                                    <FormattedMessage id="account.orders" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/shippingAddress" className="click-hover" >
                                    <FormattedMessage id="shippingAddress" />
                                  </Link>
                                </div>
                                <div className="link-style" >
                                  <Link to="/account/paymentMethod" className="click-hover" >
                                    <FormattedMessage id="paymentMethod" />
                                  </Link>
                                </div>
                              </div>
                              <LogoutButton />
                              {/* <div className="logoff-style">
                                <a className="rc-styled-link--external" onClick={() => this.clickLogoff()}>
                                  <FormattedMessage id="logOff" />
                                </a>
                              </div> */}

                            </div>
                          </div>
                      }
                    </span>
                    : null
                }
              </li>
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
                    <a className="rc-list__header" href="https://www.royalcanin.com/mx/about-us" target="_blank">
                      <FormattedMessage id="aboutUs" />
                    </a>
                  </li>
                </ul>
              </li>

              <li className="rc-list__item">
                <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                  <li className="rc-list__item">
                    <Link className="rc-list__header" to="/help">
                      <FormattedMessage id="contactUs" />
                    </Link>
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
        {
          this.state.prescriberId && this.state.prescriberName && this.props.showMiniIcons
            ? <div className="tip-clinics" title={this.state.prescriberName}>
              <FormattedMessage id="clinic.clinic" /> : {this.state.prescriberName}
            </div>
            : null
        }
      </>
    )
  }
}

export default injectIntl(Header, { forwardRef: true })