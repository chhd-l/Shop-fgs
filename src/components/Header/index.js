import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { find } from 'lodash';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import MegaMenu from '@/components/MegaMenu';
import { getParaByName, getDeviceType } from '@/utils/utils';
import logoAnimatedPng from '@/assets/images/logo--animated.png';
import logoAnimatedSvg from '@/assets/images/logo--animated.svg';
import { getList } from '@/api/list';
import { IMG_DEFAULT } from '@/utils/constant';
import { getPrescriptionById, getPrescriberByEncryptCode } from '@/api/clinic';
import { setBuryPoint } from '@/api';
import { doLogout } from '@/api/login';
import LoginButton from '@/components/LoginButton';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import DropDownMenu from './modules/DropDownMenu';
import LogoutButton from '@/components/LogoutButton';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';
import './index.css';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore', 'clinicStore', 'configStore', 'checkoutStore')
@injectIntl
@observer // 将Casual类转化为观察者，只要被观察者跟新，组件将会刷新
class Header extends React.Component {
  static defaultProps = {
    showMiniIcons: false,
    showUserIcon: false
  };
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      showCenter: false,
      showSearchInput: false,
      keywords: '',
      loading: false,
      result: null,
      showMegaMenu: false,
      isScrollToTop: true,
      visibleType: ''
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.hanldeSearchClick = this.hanldeSearchClick.bind(this);
    this.hanldeSearchCloseClick = this.hanldeSearchCloseClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);

    this.gotoDetails = this.gotoDetails.bind(this);
    // this.clickLogin = this.clickLogin.bind(this)
    this.clickLogoff = this.clickLogoff.bind(this);

    this.inputRef = React.createRef();
    this.inputRefMobile = React.createRef();
    this.menuBtnRef = React.createRef();
    this.unloginCartRef = React.createRef();
    this.loginCartRef = React.createRef();

    this.handleCenterMouseOver = this.handleCenterMouseOver.bind(this);
    this.handleCenterMouseOut = this.handleCenterMouseOut.bind(this);

    this.handleMenuMouseOver = this.handleMenuMouseOver.bind(this);
    this.handleMenuMouseOut = this.handleMenuMouseOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.preTop = 0;
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  async componentDidMount() {
    if (sessionItemRoyal.get('rc-token-lose')) {
      this.handleLogout();
      return false;
    }

    window.addEventListener('click', (e) => this.hideMenu(e));
    window.addEventListener('scroll', (e) => this.handleScroll(e));

    const { location, clinicStore } = this.props;
    let clinciRecoCode = getParaByName(
      window.location.search || (location ? location.search : ''),
      'code'
    );
    let linkClinicId = getParaByName(
      window.location.search || (location ? location.search : ''),
      'clinic'
    );
    let linkClinicName = '';

    // 指定clinic/recommendation code链接进入，设置default clinic
    if (
      location &&
      (location.pathname === '/' ||
        location.pathname.includes('/list') ||
        location.pathname.includes('/details'))
    ) {
      if (clinciRecoCode && clinicStore.clinicRecoCode !== clinciRecoCode) {
        const res = await getPrescriberByEncryptCode({
          encryptCode: clinciRecoCode,
          storeId: process.env.REACT_APP_STOREID
        });
        if (
          res.context &&
          res.context.prescriberVo &&
          res.context.prescriberVo.length
        ) {
          linkClinicId = res.context.prescriberVo[0].id;
          linkClinicName = res.context.prescriberVo[0].prescriberName;
        }
        if (linkClinicId && linkClinicName) {
          clinicStore.setClinicRecoCode(clinciRecoCode);
          clinicStore.setLinkClinicId(linkClinicId);
          clinicStore.setLinkClinicName(linkClinicName);
        }
      } else if (linkClinicId && clinicStore.clinicId !== linkClinicId) {
        const res = await getPrescriptionById({ id: linkClinicId });
        if (res.context && res.context.enabled) {
          linkClinicName = res.context.prescriberName;
        }
        if (linkClinicName) {
          clinicStore.setLinkClinicId(linkClinicId);
          clinicStore.setLinkClinicName(linkClinicName);
        }
      }
    }

    // 埋点
    setBuryPoint({
      id: '',
      url: window.location.href,
      clientType: getDeviceType(),
      skuId:
        this.props.match && this.props.match.path === '/details/:id'
          ? this.props.match.params.id
          : '',
      shopId: process.env.REACT_APP_STOREID
    });
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.hideMenu);
    // window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener(
      'scroll',
      (function () {
        var timer; //使用闭包，缓存变量
        var startTime = new Date();
        return function () {
          var curTime = new Date();
          if (curTime - startTime >= 200) {
            timer = setTimeout(this.handleScroll, 200);
            startTime = curTime;
          }
        };
      })()
    );
  }
  /**
   * token过期时，主动登出
   */
  handleLogout = async () => {
    const { loginStore, checkoutStore, authService } = this.props;
    try {
      sessionItemRoyal.remove('rc-token-lose');
      loginStore.changeLoginModal(true);
      localItemRoyal.remove('rc-token');
      loginStore.removeUserInfo();
      checkoutStore.removeLoginCartData();
      const res = await authService.logout(process.env.REACT_APP_HOMEPAGE);
      setTimeout(async () => {
        loginStore.changeLoginModal(false);
        await authService.login(process.env.REACT_APP_HOMEPAGE);
      }, 3000);
    } catch (e) {
      loginStore.changeLoginModal(false);
      // window.location.reload();
    }
  };
  handleScroll(e) {
    let baseEl = document.querySelector('#J_sidecart_container');
    if (!baseEl) {
      return false;
    }
    const footerEl = document.querySelector('#footer');
    let targetEl = document.querySelector('#J_sidecart_fix');
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    let isScrollToTop = this.preTop > scrollTop;
    this.preTop = scrollTop;
    const baseTop =
      this.getElementToPageTop(baseEl) - (isScrollToTop ? 120 : 80) - scrollTop;
    const footerTop =
      this.getElementToPageTop(footerEl) -
      (isScrollToTop ? 120 : 80) -
      scrollTop +
      baseEl.offsetHeight;

    if (scrollTop >= footerTop) {
      targetEl.style.top = 'auto';
      targetEl.style.bottom = '40px';
      targetEl.style.position = 'absolute';
    } else if (scrollTop >= baseTop) {
      targetEl.style.top = isScrollToTop ? '120px' : '80px';
      targetEl.style.bottom = 'auto';
      targetEl.style.display = 'block';
      targetEl.style.position = 'fixed';
    } else {
      targetEl.style.display = 'none';
    }
    this.setState({ isScrollToTop });
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  handleMouseOver() {
    this.flag = 1;
    this.setState({
      showCart: true
    });
  }
  handleMouseOut() {
    this.flag = 0;
    setTimeout(() => {
      if (!this.flag) {
        this.setState({
          showCart: false
        });
      }
    }, 500);
  }

  handleCenterMouseOver() {
    this.setState({
      showCenter: true
    });
  }
  handleCenterMouseOut() {
    this.setState({
      showCenter: false
    });
  }
  hanldeSearchClick() {
    this.setState(
      {
        showSearchInput: true
      },
      () => {
        setTimeout(() => {
          this.inputRef.current.focus();
          this.inputRefMobile.current.focus();
        });
      }
    );
  }
  hanldeSearchCloseClick() {
    this.setState({
      showSearchInput: false,
      keywords: '',
      result: null
    });
  }
  handleSearchInputChange(e) {
    this.setState(
      {
        keywords: e.target.value
      },
      () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getSearchData();
        }, 500);
      }
    );
  }
  signUp() {
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
    const { history } = this.props;
    history.push('/login');
    localItemRoyal.set('loginType', 'register');
  }
  async getSearchData() {
    const { keywords } = this.state;
    this.setState({ loading: true });

    let params = {
      cateId: process.env.REACT_APP_CATEID,
      keywords,
      propDetails: [],
      pageNum: 0,
      brandIds: [],
      pageSize: 20,
      esGoodsInfoDTOList: [],
      companyType: ''
    };
    try {
      let res = await getList(params);
      this.setState({ loading: false });
      if (res && res.context) {
        const esGoods = res.context.esGoods;
        if (esGoods && esGoods.content.length) {
          let goodsContent = esGoods.content;
          if (res.context.goodsList) {
            goodsContent = goodsContent.map((ele) => {
              let ret = Object.assign({}, ele);
              const tmpItem = find(
                res.context.goodsList,
                (g) => g.goodsId === ele.id
              );
              if (tmpItem) {
                ret = Object.assign(ret, {
                  goodsCateName: tmpItem.goodsCateName,
                  goodsSubtitle: tmpItem.goodsSubtitle,
                  goodsImg: tmpItem.goodsImg
                });
              }
              return ret;
            });
          }
          this.setState({
            result: Object.assign(
              {},
              {
                productList: goodsContent,
                totalElements: esGoods.totalElements
              }
            )
          });
        } else {
          this.setState({
            result: Object.assign({}, { productList: [], totalElements: 0 })
          });
        }
      }
    } catch (err) {
      this.setState({
        loading: false,
        result: Object.assign({}, { productList: [], totalElements: 0 })
      });
    }
  }
  gotoDetails(item) {
    sessionItemRoyal.set('rc-goods-cate-name', item.goodsCateName || '');
    sessionItemRoyal.set('rc-goods-name', item.goodsName);
    this.props.history.push('/details/' + item.goodsInfos[0].goodsInfoId);
  }
  handleMenuMouseOver() {
    this.flag = 1;
    this.setState({
      showMegaMenu: true
    });
  }
  handleMenuMouseOut() {
    this.flag = 0;
    setTimeout(() => {
      if (!this.flag) {
        this.setState({
          showMegaMenu: false
        });
      }
    }, 200);
  }
  toggleMenu() {
    this.setState({
      showMegaMenu: !this.state.showMegaMenu
    });
  }
  hideMenu(e) {
    // const widget = this.menuBtnRef.current && getComputedStyle(this.menuBtnRef.current)
    const widget = document.getElementById('J-btn-menu');
    if (e.target.id !== 'J-btn-menu' && widget) {
      this.setState({
        showMegaMenu: false
      });
    }
  }
  clickLogin() {
    this.props.history.push('/login');
    localItemRoyal.set('loginType', 'login');
  }
  clickLogoff() {
    localItemRoyal.remove('rc-token');
    sessionItemRoyal.remove(`rc-clinic-name-default`);
    sessionItemRoyal.remove(`rc-clinic-id-default`);
    this.props.loginStore.removeUserInfo();
    this.props.checkoutStore.removeLoginCartData();
    this.props.loginStore.changeIsLogin(false);
    this.props.history.push('/');
  }
  renderResultJsx() {
    return this.state.result ? (
      <div className="suggestions">
        <div className="container">
          <div className="row d-flex flex-column-reverse flex-sm-row">
            <div className="col-12 rc-column">
              <div className="rc-padding-top--lg--mobile rc-large-intro">
                <FormattedMessage id="goods" />
              </div>
              <div className="suggestions-items row justify-content-end items rc-padding-left--xs">
                {this.state.result.productList.length ? (
                  this.state.result.productList.map((item, idx) => (
                    <div className="col-12 item" key={item.id + idx}>
                      <div className="row">
                        <div className="item__image hidden-xs-down_ swatch-circle col-4 col-md-3 col-lg-2">
                          <a
                            className="ui-cursor-pointer"
                            onClick={() => this.gotoDetails(item)}
                          >
                            <img
                              className="swatch__img"
                              alt={item.goodsName}
                              title={item.goodsName}
                              src={
                                item.goodsImg ||
                                item.goodsInfos.sort(
                                  (a, b) => a.marketPrice - b.marketPrice
                                )[0].goodsInfoImg ||
                                IMG_DEFAULT
                              }
                            />
                          </a>
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <a
                            onClick={() => this.gotoDetails(item)}
                            className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                            alt={item.goodsName}
                            title={item.goodsName}
                          >
                            {item.goodsName}
                          </a>
                          <div className="rc-meta searchProductKeyword"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="d-flex ml-2 mr-2">
                    <i className="rc-icon rc-incompatible--xs rc-iconography"></i>
                    <FormattedMessage id="list.errMsg4" />
                  </p>
                )}
              </div>
              {this.state.result.totalElements ? (
                <div className="rc-margin-top--xs">
                  <Link
                    className="productName rc-large-body ui-cursor-pointer"
                    to={`/list/keywords/${this.state.keywords}`}
                  >
                    <b>
                      <FormattedMessage id="viewAllResults" /> (
                      {this.state.result.totalElements})
                    </b>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <span className="d-sm-none_ more-below">
            <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    ) : null;
  }
  renderClinic() {
    const { clinicId, clinicName } = this.props.clinicStore;
    return clinicId && clinicName && this.props.showMiniIcons ? (
      <div className="tip-clinics" title={clinicName}>
        <FormattedMessage id="clinic.clinic" /> : {clinicName}
      </div>
    ) : null;
  }
  _catogryCfg = (lang) => {
    const defaultVal = [
      { linkObj: { pathname: '/list/cats' }, langKey: 'cats' },
      { linkObj: { pathname: '/list/dogs' }, langKey: 'dogs' },
      {
        link: this.props.configStore.contactUsUrl,
        langKey: 'aboutUs'
      },
      { linkObj: { pathname: '/help' }, langKey: 'contactUs' }
    ];
    return (
      {
        de: [
          {
            linkObj: { pathname: '/list/cats', search: '?fid=481|1784' },
            langKey: 'cats'
          },
          {
            linkObj: { pathname: '/list/dogs', search: '?fid=481|1783' },
            langKey: 'dogs'
          },
          {
            link: this.props.configStore.contactUsUrl,
            langKey: 'aboutUs'
          },
          { linkObj: { pathname: '/help' }, langKey: 'contactUs' }
        ],
        fr: [
          {
            linkObj: { pathname: '/list/dogs' },
            langKey: 'dogs',
            subMenuKey: 'dogs',
            type: 'dogs'
          },
          {
            linkObj: { pathname: '/list/cats' },
            langKey: 'cats',
            subMenuKey: 'cats',
            type: 'cats'
          },
          {
            linkObj: { pathname: '/subscription-landing' },
            langKey: 'account.subscription',
            type: 'subscription'
          },
          {
            linkObj: { pathname: '/Tailorednutrition' },
            langKey: 'healthAndWellbeing',
            type: 'healthAndWellbeing'
          },
          {
            link: this.props.configStore.contactUsUrl,
            langKey: 'aboutUs',
            type: 'aboutUs'
          },
          {
            linkObj: { pathname: '/help' },
            langKey: 'contactUs',
            subMenuKey: 'help',
            type: 'help'
          }
        ],
        ru: [
          {
            linkObj: { pathname: '/club' },
            langKey: 'club',
            type: 'club'
          },
          {
            linkObj: { pathname: '/list/dogs' },
            langKey: 'dogs',
            subMenuKey: 'dogs',
            type: 'dogs'
          },
          {
            linkObj: { pathname: '/list/cats' },
            langKey: 'cats',
            subMenuKey: 'cats',
            type: 'cats'
          },
          {
            linkObj: { pathname: '/subscription-landing' },
            langKey: 'account.subscription',
            type: 'subscription'
          },
          {
            linkObj: { pathname: '/Tailorednutrition' },
            langKey: 'healthAndWellbeing',
            type: 'healthAndWellbeing'
          },
          {
            link: this.props.configStore.contactUsUrl,
            langKey: 'aboutUs',
            type: 'aboutUs'
          }
        ]
      }[lang] || defaultVal
    );
  };
  _renderDropDownText = (item) => {
    return item.subMenuKey ? (
      <span class="rc-header-with-icon">
        <FormattedMessage id={item.langKey} />
        <span
          class={`rc-icon rc-iconography ${
            item.type === this.state.visibleType ? 'rc-up rc-brand1' : 'rc-down'
          }`}
        ></span>
      </span>
    ) : (
      <FormattedMessage id={item.langKey} />
    );
  };
  hanldeListItemMouseOver = (e, item) => {
    if (!item.subMenuKey) {
      return false;
    }
    this.setState({
      visibleType: item.type
    });
  };
  hanldeListItemMouseOut = (e, item) => {
    if (!item.subMenuKey) {
      return false;
    }
    this.setState({
      visibleType: ''
    });
  };
  render() {
    return (
      <>
        <div id="page-top" name="page-top"></div>
        {this.props.loginStore.loginModal ? <Loading /> : null}
        {/* <header className={`rc-header ${this.state.isScrollToTop ? '' : 'rc-header--scrolled'}`} style={{ zIndex: 9999 }}> */}
        <header className={`rc-header`} data-js-header-scroll>
          <nav className="rc-header__nav rc-header__nav--primary">
            <ul
              className="rc-list rc-list--blank rc-list--inline rc-list--align"
              role="menubar"
            >
              {this.props.showMiniIcons ? (
                <li className="rc-list__item">
                  <MegaMenu
                    showMegaMenu={this.state.showMegaMenu}
                    handleMouseOver={this.handleMenuMouseOver}
                    handleMouseOut={this.handleMenuMouseOut}
                    toggleMenu={this.toggleMenu}
                    menuData={this._catogryCfg(process.env.REACT_APP_LANG)}
                  />
                </li>
              ) : null}
            </ul>

            <Link to="/" className="header__nav__brand logo-home">
              <span className="rc-screen-reader-text"></span>
              <object
                id="header__logo"
                className="rc-header__logo"
                type="image/svg+xml"
                data={logoAnimatedSvg}
                data-js-import-interactive-svg
              >
                <img
                  alt="Royal Canin"
                  height="100"
                  src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                  style={{ backgroundImage: 'url(' + logoAnimatedPng + ')' }}
                  width="135"
                />
              </object>
            </Link>

            <ul
              className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__right"
              role="menubar"
            >
              <li className="rc-list__item d-flex align-items-center">
                {this.props.showMiniIcons ? (
                  <>
                    <div className="inlineblock">
                      <button
                        className={[
                          'rc-btn',
                          'less-width-xs',
                          'rc-btn--icon',
                          'rc-icon',
                          'rc-search--xs',
                          'rc-iconography',
                          this.state.showSearchInput ? 'rc-hidden' : ''
                        ].join(' ')}
                        aria-label="Search"
                        onClick={this.hanldeSearchClick}
                      >
                        <span className="rc-screen-reader-text">
                          <FormattedMessage id="search" />
                        </span>
                      </button>
                      <div className="rc-sm-up">
                        <form
                          className={[
                            'inlineblock',
                            'headerSearch',
                            'headerSearchDesktop',
                            'relative',
                            this.state.showSearchInput ? '' : 'rc-hidden'
                          ].join(' ')}
                          role="search"
                          name="simpleSearch"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <span
                            className="rc-input rc-input--full-width"
                            input-setup="true"
                          >
                            <button
                              className="rc-input__submit rc-input__submit--search"
                              type="submit"
                            >
                              <span className="rc-screen-reader-text"></span>
                            </button>
                            <FormattedMessage id="header.startTypingToSearch">
                              {(txt) => (
                                <input
                                  ref={this.inputRef}
                                  className="search-field"
                                  type="search"
                                  autoComplete="off"
                                  placeholder={txt}
                                  value={this.state.keywords}
                                  onChange={this.handleSearchInputChange}
                                />
                              )}
                            </FormattedMessage>
                            <label
                              className="rc-input__label"
                              htmlFor="id-submit-2"
                            >
                              <span className="rc-input__label-text"></span>
                            </label>
                          </span>
                          <span
                            className="rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle"
                            aria-label="Close"
                            onClick={this.hanldeSearchCloseClick}
                          ></span>
                          <div className="suggestions-wrapper">
                            {this.renderResultJsx()}
                          </div>
                        </form>
                      </div>
                    </div>
                    {this.isLogin ? (
                      <LoginCart
                        ref={this.loginCartRef}
                        showSearchInput={this.state.showSearchInput}
                        history={this.props.history}
                      />
                    ) : (
                      <UnloginCart
                        ref={this.unloginCartRef}
                        showSearchInput={this.state.showSearchInput}
                        history={this.props.history}
                      />
                    )}
                  </>
                ) : null}
                {this.props.showUserIcon ? (
                  <span
                    className="minicart inlineblock"
                    onMouseOver={this.handleCenterMouseOver}
                    onMouseOut={this.handleCenterMouseOut}
                  >
                    {this.isLogin ? (
                      <FormattedMessage id="personal">
                        {(txt) => (
                          <Link
                            to="/account"
                            className="minicart-link"
                            data-loc="miniCartOrderBtn"
                            title={txt}
                          >
                            <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography"></i>
                          </Link>
                        )}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage id="personal">
                        {(txt) => (
                          <div
                            className="minicart-link"
                            data-loc="miniCartOrderBtn"
                            title={txt}
                          >
                            <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography"></i>
                          </div>
                        )}
                      </FormattedMessage>
                    )}

                    {!this.isLogin ? (
                      <div
                        className={[
                          'popover',
                          'popover-bottom',
                          this.state.showCenter ? 'show' : ''
                        ].join(' ')}
                        style={{ minWidth: '13rem' }}
                      >
                        <div className="container cart">
                          <div className="login-style">
                            <LoginButton
                              btnStyle={{ width: '11rem', margin: '2rem 0' }}
                              history={this.props.history}
                            />
                            {/* <button onClick={() => {
                                  // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=https%3A%2F%2Fshopuat.466920.com%3Forigin%3Dregister'
                                  window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=http%3A%2F%2Flocalhost%3A3000%3Forigin%3Dregister'
                                }}>registred</button> */}
                            {/* <button className="rc-btn rc-btn--one" style={{ width: "11rem", margin: "2rem 0" }}
                                  onClick={() => this.clickLogin()}> <FormattedMessage id='login'/></button> */}
                            <div>
                              <FormattedMessage id="account.notRegistred" />
                            </div>
                            <a
                              className="rc-styled-link"
                              onClick={() => {
                                // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=https%3A%2F%2Fshopuat.466920.com%3Forigin%3Dregister'
                                window.location.href =
                                  process.env.REACT_APP_RegisterPrefix +
                                  window.encodeURIComponent(
                                    process.env.REACT_APP_RegisterCallback
                                  );
                                // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=http%3A%2F%2Flocalhost%3A3000%3Forigin%3Dregister'
                                // this.signUp()
                              }}
                            >
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
                    ) : (
                      <div
                        className={[
                          'popover',
                          'popover-bottom',
                          this.state.showCenter ? 'show' : ''
                        ].join(' ')}
                        style={{ minWidth: '13rem' }}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                      >
                        <div className="container cart">
                          <div className="link-group">
                            <div className="link-style">
                              <Link to="/account" className="click-hover">
                                <FormattedMessage id="account.myAccount" />
                              </Link>
                            </div>
                            <div className="link-style">
                              <Link
                                to="/account/information"
                                className="click-hover"
                              >
                                <FormattedMessage id="account.basicInfomation" />
                              </Link>
                            </div>
                            <div className="link-style">
                              <Link to="/account/pets" className="click-hover">
                                <FormattedMessage id="account.pets" />
                              </Link>
                            </div>
                            <div className="link-style">
                              <Link
                                to="/account/subscription"
                                className="click-hover"
                              >
                                <FormattedMessage id="account.subscription" />
                              </Link>
                            </div>
                            <div className="link-style">
                              <Link
                                to="/account/orders"
                                className="click-hover"
                              >
                                <FormattedMessage id="account.orders" />
                              </Link>
                            </div>
                            <div className="link-style">
                              <Link
                                to="/account/shippingAddress"
                                className="click-hover"
                              >
                                <FormattedMessage id="shippingAddress" />
                              </Link>
                            </div>
                            {this.props.configStore.profilePaymentMethod && (
                              <div className="link-style">
                                <Link
                                  to="/account/paymentMethod"
                                  className="click-hover"
                                >
                                  <FormattedMessage id="paymentMethod" />
                                </Link>
                              </div>
                            )}
                          </div>
                          <LogoutButton />
                        </div>
                      </div>
                    )}
                  </span>
                ) : null}
              </li>
            </ul>
          </nav>

          <nav className="rc-header__nav rc-header__nav--secondary rc-md-up ">
            <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
              {this._catogryCfg(process.env.REACT_APP_LANG).map((item, i) => (
                <li
                  className={`rc-list__item ${
                    item.subMenuKey ? 'dropdown' : ''
                  } ${this.state.visibleType === item.type ? 'active' : ''}`}
                  key={i}
                  onMouseOver={(e) => this.hanldeListItemMouseOver(e, item)}
                  onMouseOut={(e) => this.hanldeListItemMouseOut(e, item)}
                >
                  <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                    <li className="rc-list__item">
                      {item.link ? (
                        <a href={item.link} className="rc-list__header">
                          {this._renderDropDownText(item)}
                        </a>
                      ) : (
                        <Link to={item.linkObj} className="rc-list__header">
                          {this._renderDropDownText(item)}
                        </Link>
                      )}
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <DropDownMenu
            visibleType={this.state.visibleType}
            updateVisibleType={(val) => {
              this.setState({ visibleType: val });
            }}
          />
          <div className="search">
            <div className="rc-sm-down">
              <form
                className={[
                  'rc-header__search-bar',
                  'headerSearch',
                  this.state.showSearchInput ? '' : 'rc-hidden'
                ].join(' ')}
                role="search"
                name="simpleSearch"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <button
                  className="rc-btn rc-btn--icon rc-icon search--xs iconography stick-left rc-vertical-align"
                  type="submit"
                  aria-label="Search"
                >
                  <span className="screen-reader-text">
                    <FormattedMessage id="search" />
                  </span>
                </button>
                <FormattedMessage id="header.startTypingToSearch">
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
                      style={{ padding: '1rem 4rem' }}
                    />
                  )}
                </FormattedMessage>
                <div className="suggestions-wrapper">
                  {this.renderResultJsx()}
                </div>
                <button
                  className="rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle"
                  type="button"
                  aria-label="Close"
                  onClick={this.hanldeSearchCloseClick}
                >
                  <span className="screen-reader-text">
                    <FormattedMessage id="close" />
                  </span>
                </button>
              </form>
            </div>
          </div>
          {this.state.loading ? <Loading /> : null}
        </header>
        {process.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true' &&
          this.renderClinic()}
      </>
    );
  }
}

export default withOktaAuth(Header);
