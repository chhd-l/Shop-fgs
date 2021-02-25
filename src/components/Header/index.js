import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import {
  getParaByName,
  getDeviceType,
  generateOptions,
  getDictionary
} from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';
import {
  getPrescriptionById,
  getPrescriberByEncryptCode,
  getPrescriberByPrescriberIdAndStoreId
} from '@/api/clinic';
import { getList } from '@/api/list';
import { setBuryPoint } from '@/api';
import LoginButton from '@/components/LoginButton';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import DropDownMenu from './modules/DropDownMenu';
import MegaMenuMobile from './modules/MegaMenuMobile';
import NavItem from './modules/NavItem';
import LogoutButton from '@/components/LogoutButton';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { loadJS, fetchHeaderNavigations } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import './index.css';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject(
  'loginStore',
  'clinicStore',
  'configStore',
  'checkoutStore',
  'headerSearchStore'
)
@injectIntl
@observer // 将Casual类转化为观察者，只要被观察者跟新，组件将会刷新
class Header extends React.Component {
  static defaultProps = {
    showMiniIcons: false,
    showUserIcon: false,
    showNav: true,
    showLoginBtn: true
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
      isScrollToTop: true,
      headerNavigationList: [],
      activeTopParentId: -1,
      isSearchSuccess: false //是否搜索成功
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

    this.handleCenterMouseOver = this.handleCenterMouseOver.bind(this);
    this.handleCenterMouseOut = this.handleCenterMouseOut.bind(this);

    this.hanldeListItemMouseOver = this.hanldeListItemMouseOver.bind(this);
    this.hanldeListItemMouseOut = this.hanldeListItemMouseOut.bind(this);
    this.handleClickNavItem = this.handleClickNavItem.bind(this);

    this.preTop = 0;
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  async componentDidMount() {
    //进入这个页面 清除搜索埋点
    this.props.headerSearchStore.clear();

    if (sessionItemRoyal.get('rc-token-lose')) {
      this.handleLogout();
      return false;
    }

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
      } else if (linkClinicId && location.pathname === '/') {
        // 根据prescriberId查询Clinic详情(查询id)
        const idRes = await getPrescriberByPrescriberIdAndStoreId({
          prescriberId: linkClinicId,
          storeId: process.env.REACT_APP_STOREID
        });

        // 根据id查询Clinic详情
        const res = await getPrescriptionById({ id: idRes.context.id });
        if (res.context && res.context.enabled) {
          linkClinicId = idRes.context.id;
          linkClinicName = res.context.prescriberName;
        }
        if (linkClinicName) {
          clinicStore.setLinkClinicId(linkClinicId);
          clinicStore.setLinkClinicName(linkClinicName);
          clinicStore.setAuditAuthority(res.context.auditAuthority);
        }
      }
    }

    // 埋点
    setBuryPoint({
      id: this.userInfo ? this.userInfo.customerId : '',
      prescriber: this.props.clinicStore.clinicId,
      clientType: getDeviceType(),
      skuId:
        this.props.match && this.props.match.path === '/details/:id'
          ? this.props.match.params.id
          : '',
      shopId: process.env.REACT_APP_STOREID,
      page:
        clinciRecoCode || linkClinicId
          ? '5'
          : {
              '/': '1',
              '/cart': '2',
              '/checkout': '3',
              '/confirmation': '4'
            }[this.props.match && this.props.match.path] || ''
    });

    this.initNavigations();
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
  initNavigations = async () => {
    let res = await fetchHeaderNavigations();
    const pageEnumRes = await getDictionary({ type: 'pageType' });
    if (res) {
      let treeData = generateOptions(res);

      function handleLink(list) {
        Array.from(list, (item) => {
          if (item.children && item.children.length) {
            handleLink(item.children);
          }
          const targetRes = pageEnumRes.filter((ele) => ele.id === item.pageId);
          let tmpLink = null;
          let tmpHref = null;
          if (item.interaction === 0 && targetRes.length) {
            const pageVal = targetRes[0].valueEn;
            if (pageVal) tmpLink = { pathname: `${item.navigationLink}` };
            switch (pageVal) {
              case 'SRP':
                if (pageVal === 'SRP') {
                  tmpLink = Object.assign(tmpLink, {
                    search: `?${item.keywords}`
                  });
                }
                break;
              case 'PDP':
                tmpLink = Object.assign(tmpLink, {
                  pathname: `${item.navigationLink}${item.paramsField}`
                });
                break;
              default:
                break;
            }
          } else if (item.interaction === 1) {
            tmpHref = { pathname: item.navigationLink, target: item.target };
          }
          item.link = tmpLink;
          item.href = tmpHref;
          return item;
        });
      }

      handleLink(treeData);

      this.setState({
        headerNavigationList: treeData
      });
    }
  };

  /**
   * token过期时，主动登出
   */
  handleLogout = async () => {
    const { loginStore, checkoutStore, oktaAuth } = this.props;
    try {
      sessionItemRoyal.remove('rc-token-lose');
      loginStore.changeLoginModal(true);
      localItemRoyal.remove('rc-token');
      loginStore.removeUserInfo();
      checkoutStore.removeLoginCartData();
      const res = await oktaAuth.signOut({
        postLogoutRedirectUri:
          window.location.origin + process.env.REACT_APP_HOMEPAGE
      });
      setTimeout(async () => {
        loginStore.changeLoginModal(false);
        await oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
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

    if (targetEl == null) return;
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
  handleSearch = () => {
    if (this.state.loading) return;
    this.props.history.push({
      pathname: `/on/demandware.store/Sites-${process.env.REACT_APP_LANG.toUpperCase()}-Site/${process.env.REACT_APP_LANG.toLowerCase()}_${process.env.REACT_APP_LANG.toUpperCase()}/Search-Show`,
      // pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?q=${e.current.value}`,
      search: `?q=${this.state.keywords}`,
      state: {
        GAListParam: 'Search Results',
        noresult: !this.state.isSearchSuccess
      }
    });
  };
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
      // cateId: process.env.REACT_APP_CATEID,
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
                  goodsImg: tmpItem.goodsImg,
                  goodsNo: tmpItem.goodsNo
                });
              }
              return ret;
            });
          }
          this.setState({ isSearchSuccess: true });
          if (dataLayer[0] && dataLayer[0].search) {
            dataLayer[0].search.query = keywords;
            dataLayer[0].search.results = esGoods.totalElements;
            dataLayer[0].search.type = 'with results';
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
          if (dataLayer[0] && dataLayer[0].search) {
            dataLayer[0].search.query = keywords;
            dataLayer[0].search.results = esGoods.totalElements;
            dataLayer[0].search.type = 'without results';
          }
          this.setState({ isSearchSuccess: false });
          this.setState({
            result: Object.assign({}, { productList: [], totalElements: 0 })
          });
        }
      }
    } catch (err) {
      console.log(222, err);
      this.setState({
        loading: false,
        result: Object.assign({}, { productList: [], totalElements: 0 })
      });
    }
  }
  gotoDetails(item) {
    console.log(item);
    this.props.history.push({
      pathname: `/${item.lowGoodsName.split(' ').join('-').replace('/', '')}-${
        item.goodsNo
      }`,
      state: {
        GAListParam: 'Search Results'
      }
    });
    // this.props.history.push('/details/' + item.goodsInfos[0].goodsInfoId);
  }
  clickLogin() {
    this.props.history.push('/login');
    localItemRoyal.set('loginType', 'login');
  }
  clickLogoff() {
    const { loginStore, checkoutStore, history } = this.props;
    localItemRoyal.remove('rc-token');
    sessionItemRoyal.remove(`rc-clinic-name-default`);
    sessionItemRoyal.remove(`rc-clinic-id-default`);
    loginStore.removeUserInfo();
    checkoutStore.removeLoginCartData();
    loginStore.changeIsLogin(false);
    history.push('/home');
  }
  renderResultJsx() {
    const { result, keywords } = this.state;
    return result ? (
      <div className="suggestions" id="mainSuggestions">
        <div className="container">
          <div className="row d-flex flex-column-reverse flex-sm-row">
            <div className="col-12 rc-column">
              <div className="rc-padding-top--lg--mobile rc-large-intro">
                <FormattedMessage id="goods" />
              </div>
              <div className="suggestions-items row justify-content-end items rc-padding-left--xs">
                {result.productList.length ? (
                  result.productList.map((item, idx) => (
                    <div className="col-12 item" key={item.id + idx}>
                      <div className="row">
                        <div className="item__image hidden-xs-down_ swatch-circle col-4 col-md-3 col-lg-2">
                          <span
                            className="ui-cursor-pointer"
                            style={{ width: '100%' }}
                            onClick={this.gotoDetails.bind(this, item)}
                          >
                            <LazyLoad>
                              <img
                                className="swatch__img"
                                alt={item.goodsName}
                                title={item.goodsName}
                                style={{ width: '100%' }}
                                src={
                                  item.goodsImg ||
                                  item.goodsInfos.sort(
                                    (a, b) => a.marketPrice - b.marketPrice
                                  )[0].goodsInfoImg ||
                                  IMG_DEFAULT
                                }
                              />
                            </LazyLoad>
                          </span>
                        </div>
                        <div className="col-8 col-md-9 col-lg-10">
                          <span
                            onClick={this.gotoDetails.bind(this, item)}
                            className="productName ui-cursor-pointer ui-text-overflow-line2 text-break"
                            alt={item.goodsName}
                            title={item.goodsName}
                          >
                            {item.goodsName}
                          </span>
                          <div className="rc-meta searchProductKeyword" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="d-flex ml-2 mr-2">
                    <i className="rc-icon rc-incompatible--xs rc-iconography" />
                    <FormattedMessage id="list.errMsg4" />
                  </p>
                )}
              </div>
              {result.totalElements ? (
                <div className="rc-margin-top--xs">
                  <Link
                    className="productName rc-large-body ui-cursor-pointer"
                    // to={`/list/keywords/${keywords}`}
                    to={{
                      // pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show`,
                      pathname: `/on/demandware.store/Sites-${process.env.REACT_APP_LANG.toUpperCase()}-Site/${process.env.REACT_APP_LANG.toLowerCase()}_${process.env.REACT_APP_LANG.toUpperCase()}/Search-Show`,
                      search: `?q=${keywords}`
                    }}
                  >
                    <b>
                      <FormattedMessage id="viewAllResults" /> (
                      {result.totalElements})
                    </b>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <span className="d-sm-none_ more-below">
            <i className="fa fa-long-arrow-down" aria-hidden="true" />
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
  // 点击menu埋点
  GAClickMenu(interaction) {
    const { category, action, label, value } = interaction;
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}clickMenu`,
      interaction: {
        category,
        action,
        label,
        value
      }
    });
  }
  async handleClickNavItem(item) {
    // 点击menu埋点
    this.GAClickMenu({
      category: 'menu',
      action: 'menu',
      label: item.navigationLink,
      value: 1
    });
  }
  renderDropDownText = (item) => {
    return item.expanded ? (
      <span className="rc-header-with-icon header-icon">
        {item.navigationName}
        <span
          className={`rc-icon rc-iconography ${
            item.id === this.state.activeTopParentId
              ? 'rc-up rc-brand1'
              : 'rc-down'
          }`}
        />
      </span>
    ) : (
      item.navigationName
    );
  };
  toggleShowBodyMask({ visible = false }) {
    if (visible) {
      let cls = document.querySelector('body').className.split(' ') || [];
      cls.push('open-dropdown');
      document.querySelector('body').className = cls.join(' ');
    } else {
      let cls = document.querySelector('body').className.split(' ') || [];
      const idx = cls.findIndex((c) => c === 'open-dropdown');
      cls.splice(idx, 1);
      document.querySelector('body').className = cls.join(' ');
    }
  }
  hanldeListItemMouseOver(item) {
    if (!item.expanded) {
      return false;
    }
    this.updateActiveTopParentId(item.id);
  }
  hanldeListItemMouseOut(item) {
    if (!item.expanded) {
      return false;
    }
    this.updateActiveTopParentId(-1);
  }
  updateActiveTopParentId = (id) => {
    this.setState({ activeTopParentId: id }, () => {
      const { activeTopParentId } = this.state;
      this.toggleShowBodyMask({ visible: activeTopParentId !== -1 });
    });
  };
  hanldeClickSignUp = () => {
    if (
      process.env.REACT_APP_LANG === 'fr' ||
      process.env.REACT_APP_LANG === 'en'
    ) {
      this.props.history.push('/register');
    } else {
      window.location.href =
        process.env.REACT_APP_RegisterPrefix +
        window.encodeURIComponent(process.env.REACT_APP_RegisterCallback);
    }
  };
  render() {
    const {
      showMiniIcons,
      showUserIcon,
      loginStore,
      configStore,
      history
    } = this.props;
    const {
      headerNavigationList,
      showSearchInput,
      keywords,
      activeTopParentId,
      showCenter
    } = this.state;
    return (
      <>
        <div id="page-top" name="page-top" />
        {loginStore.loginModal ? <Loading /> : null}
        {/* <header className={`rc-header ${this.state.isScrollToTop ? '' : 'rc-header--scrolled'}`} style={{ zIndex: 9999 }}> */}
        {/* data-js-header-scroll */}
        <header className={`rc-header`} data-js-header-scroll>
          <nav className="rc-header__nav rc-header__nav--primary">
            <ul
              className="rc-list rc-list--blank rc-list--inline rc-list--align"
              role="menubar"
            >
              {showMiniIcons ? (
                <li className="rc-list__item">
                  <MegaMenuMobile
                    menuData={headerNavigationList}
                    handleClickNavItem={this.handleClickNavItem}
                    configStore={configStore}
                    key={headerNavigationList.length}
                  />
                </li>
              ) : null}
            </ul>

            <Link to="/home" className="header__nav__brand logo-home">
              <span className="rc-screen-reader-text" />
              <Logo />
            </Link>
            <ul
              className={[
                'rc-list',
                'rc-list--blank',
                'rc-list--align',
                'rc-header__right',
                this.props.showLoginBtn ? 'rc-list--inline' : 'rc-hidden'
              ].join(' ')}
              role="menubar"
            >
              <li className="rc-list__item d-flex align-items-center">
                {showMiniIcons ? (
                  <>
                    <div className="inlineblock">
                      <button
                        id="mainSearch"
                        className={`rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography ${
                          showSearchInput ? 'rc-hidden' : ''
                        }`}
                        aria-label="Search"
                        onClick={this.hanldeSearchClick}
                      >
                        <span className="rc-screen-reader-text">
                          <FormattedMessage id="search" />
                        </span>
                      </button>
                      <div className="rc-sm-up">
                        <form
                          className={`inlineblock headerSearch headerSearchDesktop relative ${
                            showSearchInput ? '' : 'rc-hidden'
                          }`}
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
                              onClick={this.handleSearch}
                            >
                              <span className="rc-screen-reader-text" />
                            </button>
                            <FormattedMessage id="header.startTypingToSearch">
                              {(txt) => (
                                <input
                                  id="startTypingToSearch"
                                  ref={this.inputRef}
                                  className="search-field"
                                  type="search"
                                  autoComplete="off"
                                  placeholder={txt}
                                  value={keywords}
                                  onChange={this.handleSearchInputChange}
                                />
                              )}
                            </FormattedMessage>
                            <label
                              className="rc-input__label"
                              htmlFor="id-submit-2"
                            >
                              <span className="rc-input__label-text" />
                            </label>
                          </span>
                          <span
                            className="rc-icon rc-close--xs rc-iconography rc-interactive rc-stick-right rc-vertical-align searchBtnToggle"
                            aria-label="Close"
                            onClick={this.hanldeSearchCloseClick}
                          />
                          <div className="suggestions-wrapper">
                            {this.renderResultJsx()}
                          </div>
                        </form>
                      </div>
                    </div>
                    {this.isLogin ? (
                      <LoginCart
                        showSearchInput={showSearchInput}
                        history={history}
                        configStore={configStore}
                      />
                    ) : (
                      <UnloginCart
                        showSearchInput={showSearchInput}
                        history={history}
                        configStore={configStore}
                      />
                    )}
                  </>
                ) : null}
                {showUserIcon ? (
                  <>
                    <span className="rc-md-up">
                      {this.userInfo && this.userInfo.firstName}
                    </span>
                    <span
                      id="main_mini_cart"
                      className="minicart inlineblock"
                      onMouseOver={this.handleCenterMouseOver}
                      onMouseOut={this.handleCenterMouseOut}
                    >
                      {this.isLogin ? (
                        <FormattedMessage id="personal">
                          {(txt) => (
                            <Link
                              to="/account"
                              className="minicart-link position-relative"
                              data-loc="miniCartOrderBtn"
                              title={txt}
                            >
                              <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography" />
                              <span
                                className="rc-md-down"
                                style={{
                                  bottom: '-1.45rem',
                                  position: 'absolute',
                                  right: '.3rem',
                                  fontSize: '.95em'
                                }}
                              >
                                {this.userInfo && this.userInfo.firstName}
                              </span>
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
                              <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography" />
                            </div>
                          )}
                        </FormattedMessage>
                      )}

                      {!this.isLogin ? (
                        <div
                          className={`popover popover-bottom ${
                            showCenter ? 'show' : ''
                          }`}
                          style={{ minWidth: '15rem' }}
                        >
                          <div className="container cart">
                            <div className="login-style">
                              <LoginButton
                                btnStyle={{ width: '11rem', margin: '2rem 0' }}
                                history={history}
                              />
                              <div>
                                <FormattedMessage id="account.notRegistred" />
                              </div>
                              <span
                                className="rc-styled-link"
                                onClick={this.hanldeClickSignUp}
                              >
                                <FormattedMessage id="signUp" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`popover popover-bottom ${
                            showCenter ? 'show' : ''
                          }`}
                          style={{ minWidth: '15rem' }}
                          onMouseOver={this.handleMouseOver}
                          onMouseOut={this.handleMouseOut}
                        >
                          <div className="container cart">
                            <div className="link-group">
                              <div className="link-style">
                                <Link to="/account" className="click-hover">
                                  <span className="iconfont">&#xe697;</span>{' '}
                                  <FormattedMessage id="home" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link
                                  to="/account/information"
                                  className="click-hover"
                                >
                                  <span className="iconfont">&#xe69c;</span>{' '}
                                  <FormattedMessage id="account.profile" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link
                                  to="/account/pets"
                                  className="click-hover"
                                >
                                  <span className="iconfont">&#xe69a;</span>{' '}
                                  <FormattedMessage id="account.pets" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link
                                  to="/account/orders"
                                  className="click-hover"
                                >
                                  <span className="iconfont">&#xe699;</span>{' '}
                                  <FormattedMessage id="account.ordersTitle" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link
                                  to="/account/subscription"
                                  className="click-hover"
                                >
                                  <span className="iconfont">&#xe6a2;</span>{' '}
                                  <FormattedMessage id="account.subscriptionTitle" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link to="/faq" className="click-hover">
                                  <span className="iconfont">&#xe696;</span>{' '}
                                  <FormattedMessage id="footer.FAQ" />
                                </Link>
                              </div>
                            </div>
                            <LogoutButton />
                          </div>
                        </div>
                      )}
                    </span>
                  </>
                ) : null}
              </li>
            </ul>
          </nav>

          <nav
            className={[
              'rc-header__nav',
              'rc-header__nav--secondary',
              'rc-md-up',
              this.props.showNav ? '' : 'rc-hidden'
            ].join(' ')}
          >
            <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center flex-nowrap">
              {headerNavigationList.map((item, i) => (
                <li
                  className={`rc-list__item ${
                    item.expanded ? 'dropdown' : ''
                  } ${activeTopParentId === item.id ? 'active' : ''}`}
                  key={i}
                  onMouseOver={this.hanldeListItemMouseOver.bind(this, item)}
                  onMouseOut={this.hanldeListItemMouseOut.bind(this, item)}
                >
                  <ul className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center">
                    <li className="rc-list__item">
                      <span className="rc-list__header">
                        <NavItem item={item} className="rc-list__header">
                          {this.renderDropDownText(item)}
                        </NavItem>
                      </span>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <DropDownMenu
            activeTopParentId={this.state.activeTopParentId}
            updateActiveTopParentId={this.updateActiveTopParentId}
            headerNavigationList={headerNavigationList}
            configStore={configStore}
            // handleClickNavItem={this.handleClickNavItem}
            toggleShowBodyMask={this.toggleShowBodyMask}
          />
          <div className="search">
            <div className="rc-sm-down">
              <form
                className={`rc-header__search-bar headerSearch ${
                  showSearchInput ? '' : 'rc-hidden'
                }`}
                role="search"
                name="simpleSearch"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Link
                  className="productName rc-large-body ui-cursor-pointer"
                  to={{
                    // pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show`,
                    pathname: `/on/demandware.store/Sites-${process.env.REACT_APP_LANG.toUpperCase()}-Site/${process.env.REACT_APP_LANG.toLowerCase()}_${process.env.REACT_APP_LANG.toUpperCase()}/Search-Show`,
                    search: `?q=${keywords}`
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
                </Link>

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
