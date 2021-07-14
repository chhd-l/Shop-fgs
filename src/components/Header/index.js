import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import {
  getDeviceType,
  generateOptions,
  getDictionary,
  unique
} from '@/utils/utils';
import {
  getPrescriptionById,
  getPrescriberByEncryptCode,
  getPrescriberByPrescriberIdAndStoreId
} from '@/api/clinic';
import { setBuryPoint } from '@/api';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import DropDownMenu from './modules/DropDownMenu';
import DropDownMenuForHub from './hub/DropDownMenuForHub';
import MegaMenuMobile from './modules/MegaMenuMobile';
import MegaMenuMobileForHub from './hub/MegaMenuMobileForHub';
import Language from '@/components/Language';
import Search from './modules/Search';
import UserJSX from './jsx/user';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';
import {
  fetchHeaderNavigations,
  queryApiFromSessionCache
} from '@/utils/utils';
import { getNavigation } from '@/api/hub';
import queryNavigation from './mock/navigation';
import { funcUrl } from '@/lib/url-utils';
import './index.less';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const isFromStorePortal = sessionItemRoyal.get('rc-iframe-from-storepotal');

function HeaderContainer({ isScroll, children }) {
  return isScroll ? (
    <header className={`rc-header`} data-js-header-scroll>
      {children}
    </header>
  ) : (
    <header className={`rc-header`}>{children}</header>
  );
}

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
    showUserBox: true,
    showNav: true,
    showLoginBtn: true,
    bannerTipShowBtn: true, //是否展示固定的banbertip的按钮
    //User组件跳转用
    personInformationRouter: '/account/information',
    petsRouter: '/account/pets',
    subscriptionsRouter: '/account/subscription'
  };
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      showCenter: false,
      showSearchInput: false,
      isScrollToTop: true,
      headerNavigationList: [],
      headerNavigationListForHub: [],
      activeTopParentId: -1,
      isSearchSuccess: false, //是否搜索成功
      searchBarVisible: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    // this.clickLogin = this.clickLogin.bind(this)
    this.clickLogoff = this.clickLogoff.bind(this);

    this.handleCenterMouseOver = this.handleCenterMouseOver.bind(this);
    this.handleCenterMouseOut = this.handleCenterMouseOut.bind(this);

    this.handleClickNavItem = this.handleClickNavItem.bind(this);

    this.preTop = 0;
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
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
    let clinicRecoCode = funcUrl({ name: 'code' });
    let linkClinicId = funcUrl({ name: 'clinic' });
    let linkClinicName = '';
    // 指定clinic/recommendation code链接进入，设置default clinic
    if (
      location &&
      (location.pathname === '/' ||
        location.pathname.includes('/list') ||
        location.pathname.includes('/details'))
    ) {
      if (clinicRecoCode && clinicStore.clinicRecoCode !== clinicRecoCode) {
        const res = await getPrescriberByEncryptCode({
          encryptCode: clinicRecoCode,
          storeId: window.__.env.REACT_APP_STOREID
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
          clinicStore.setLinkClinicId(linkClinicId);
          clinicStore.setLinkClinicName(linkClinicName);
          clinicStore.setLinkClinicCode(clinicRecoCode);
        }
      } else if (linkClinicId && location.pathname === '/') {
        // 根据prescriberId查询Clinic详情(查询id)
        const idRes = await getPrescriberByPrescriberIdAndStoreId({
          prescriberId: linkClinicId,
          storeId: window.__.env.REACT_APP_STOREID
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
          clinicStore.setLinkClinicCode(res.context?.recommendationCode || '');
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
      shopId: window.__.env.REACT_APP_STOREID,
      page:
        clinicRecoCode || linkClinicId
          ? '5'
          : {
              '/': '1',
              '/cart': '2',
              '/checkout': '3',
              '/confirmation': '4'
            }[this.props.match && this.props.match.path] || ''
    });

    (+window.__.env.REACT_APP_HUB
      ? this.initNavigationsForHub
      : this.initNavigations)();
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.hideMenu);
    // window.removeEventListener('scroll', this.handleScroll)
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
            // 以http/https开头的，解析为外部路由跳转
            if (/^https?:\/\//.test(item.navigationLink)) {
              tmpHref = { pathname: item.navigationLink, target: item.target };
            } else {
              tmpLink = { pathname: item.navigationLink, target: item.target };
            }
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
  initNavigationsForHub = async () => {
    try {
      const res = await queryApiFromSessionCache({
        sessionKey: 'header-navigations-hub',
        api: getNavigation
      });
      // const res = await queryNavigation();
      const contactPhone = res && res.data && res.data.ContactPhone;
      let headerNavigationListForHub = (
        (res && res.data && res.data.MenuGroups) ||
        []
      ).map((ele, i) => {
        ele.MenuItems = (ele.MenuItems || []).map((cEle, j) => {
          if (cEle.Icon === 'contact' && contactPhone) {
            cEle.contactPhone = contactPhone;
            cEle.Link = cEle.Link || {};
            cEle.Link.Url = cEle.Link.Url || `tel:${contactPhone}`;
          }
          return { ...cEle, id: `${i + 1}-${j}` };
        });
        // 是否可下拉
        const expanded = !!(ele.MenuItems && ele.MenuItems.length);
        // 可以展开的顶级父节点，Link置空，使其不可跳转
        if (expanded && ele.Link && ele.Link.Url) {
          ele.Link.Url = '';
        }
        return {
          ...ele,
          expanded,
          id: i + 1
        };
      });
      this.setState({
        headerNavigationListForHub
      });
    } catch (err) {
      console.log(err);
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
      await oktaAuth.signOut({
        postLogoutRedirectUri:
          window.location.origin + window.__.env.REACT_APP_HOMEPAGE
      });
      setTimeout(async () => {
        loginStore.changeLoginModal(false);
        await oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE);
      }, 3000);
    } catch (e) {
      loginStore.changeLoginModal(false);
      // window.location.reload();
    }
  };
  handleScroll(e) {
    // 滑动时，移除.searchbar--visile，search bar的显示隐藏交由.rc-header--scrolled控制
    this.toggleDomClassName({
      dom: document.querySelector('.rc-header'),
      operatedClassName: 'searchbar--visile',
      active: false
    });

    const scrolledDom = document.querySelector('.rc-header--scrolled');
    const headerNavigationDom = document.querySelector(
      '.rc-header__nav.rc-header__nav--secondary'
    );
    if (headerNavigationDom) {
      headerNavigationDom.style.display = scrolledDom ? 'none' : 'flex';
    }

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

  loginIcon = () => {
    this.hubGA &&
      dataLayer.push({
        event: 'topPictosClick',
        topPictosClick: {
          itemName: 'Login'
        }
      });
  };

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
  signUp() {
    // let prefix = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri='
    // let callbackUrl = 'http://localhost:3000?origin=register'
    // let registredUrl = ''
    // if (process.env.NODE_ENV === 'development') {
    //   registredUrl = prefix + encodeURIComponent(callbackUrl)
    // } else if (process.env.NODE_ENV === 'production') {
    //   callbackUrl = window.__.env.REACT_APP_RegisterCallback
    //   registredUrl = window.__.env.REACT_APP_RegisterPrefix + encodeURIComponent(callbackUrl)
    // }
    // window.location.href = registredUrl
    const { history } = this.props;
    history.push('/login');
    localItemRoyal.set('loginType', 'register');
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
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}clickMenu`,
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
  /**
   *
   * @param {HTML dom} dom 需要操作的dom对象
   * @param {String} operatedClassName 需要操作的class名字
   * @param {Boolean} active true-添加 false-删除
   * @returns
   */
  toggleDomClassName({ dom, operatedClassName, active }) {
    if (!dom) {
      return false;
    }
    let cls = unique(dom.className.split(' ') || []);
    if (active) {
      cls.push(operatedClassName);
    } else {
      const idx = cls.findIndex((c) => c === operatedClassName);
      if (idx > -1) {
        cls.splice(idx, 1);
      }
    }
    dom.className = cls.join(' ');
  }
  toggleShowBodyMask({ visible = false }) {
    this.toggleDomClassName({
      dom: document.querySelector('body'),
      operatedClassName: 'open-dropdown',
      active: visible
    });
  }
  updateActiveTopParentId = (id) => {
    this.setState({ activeTopParentId: id }, () => {
      const { activeTopParentId } = this.state;
      this.toggleShowBodyMask({ visible: activeTopParentId !== -1 });
    });
  };
  hanldeClickSignUp = () => {
    if (
      window.__.env.REACT_APP_COUNTRY === 'fr' ||
      window.__.env.REACT_APP_COUNTRY === 'us'
    ) {
      this.props.history.push('/register');
    } else {
      window.location.href =
        window.__.env.REACT_APP_RegisterPrefix +
        window.encodeURIComponent(window.__.env.REACT_APP_RegisterCallback);
    }
  };
  toggleSearchIcon = () => {
    this.setState(
      (curState) => ({
        searchBarVisible: !curState.searchBarVisible
      }),
      () => {
        this.toggleDomClassName({
          dom: document.querySelector('.rc-header'),
          operatedClassName: 'searchbar--visile',
          active: this.state.searchBarVisible
        });
      }
    );
  };
  render() {
    const {
      showMiniIcons,
      showUserIcon,
      loginStore,
      configStore,
      history,
      bannerTipShowBtn, //是否展示固定的banbertip的按钮
      showBannerTip //是否展示固定的banbertip
    } = this.props;
    const {
      headerNavigationList,
      headerNavigationListForHub,
      showSearchInput,
      showCenter,
      showCart
    } = this.state;
    return (
      <>
        <div id="page-top" name="page-top" />
        {loginStore.loginModal ? <Loading /> : null}
        {/* <header className={`rc-header ${this.state.isScrollToTop ? '' : 'rc-header--scrolled'}`} style={{ zIndex: 9999 }}> */}
        {/* data-js-header-scroll */}
        <HeaderContainer isScroll={!window.__.env.REACT_APP_HUB || isMobile}>
          {!!+window.__.env.REACT_APP_HUB ? (
            <div className="rc-language-banner rc-bg-colour--brand4 rc-lg-up">
              <div className="rc-layout-container rc-one-column rc-max-width--xxl rc-text--right pt-0">
                <div className="rc-column p-0">
                  {window.__.env.REACT_APP_HUB_VET_PORTAL &&
                  window.__.env.REACT_APP_HUB_BREEDER_PORTAL ? (
                    <span style={{ fontSize: '.85em' }}>
                      {/* <FormattedMessage id="header.User.royalCaninPartner" /> */}
                      <a
                        className="medium"
                        href={window.__.env.REACT_APP_HUB_VET_PORTAL}
                      >
                        <FormattedMessage id="header.User.vetPortal" />
                      </a>
                      <span className="ml-2 mr-2">
                        <FormattedMessage id="header.User.or" />
                      </span>
                      <a
                        className="medium ml-2"
                        href={window.__.env.REACT_APP_HUB_BREEDER_PORTAL}
                      >
                        <FormattedMessage id="header.User.breederPortal" />
                      </a>
                    </span>
                  ) : null}
                  <Language
                    className={`qhx rc-btn rc-btn--icon-label rc-icon rc-language--xs rc-iconography ui-cursor-pointer ${
                      0 ? 'ui-btn-loading ui-btn-loading-border-red' : ''
                    }`}
                    style={{ fontSize: '.875rem' }}
                  />
                </div>
              </div>
            </div>
          ) : null}
          <nav className="rc-header__nav rc-header__nav--primary">
            <ul
              className="rc-list rc-list--blank rc-list--inline rc-list--align"
              role="menubar"
            >
              {showMiniIcons ? (
                <li className="rc-list__item">
                  {!!+window.__.env.REACT_APP_HUB ? (
                    <MegaMenuMobileForHub
                      menuData={headerNavigationListForHub}
                      handleClickNavItem={this.handleClickNavItem}
                      configStore={configStore}
                      key={headerNavigationListForHub.length}
                      {...this.props}
                      isLogin={this.isLogin}
                      userInfo={this.userInfo}
                    />
                  ) : (
                    <MegaMenuMobile
                      menuData={headerNavigationList}
                      handleClickNavItem={this.handleClickNavItem}
                      configStore={configStore}
                      key={headerNavigationList.length}
                    />
                  )}
                </li>
              ) : null}
            </ul>

            <DistributeHubLinkOrATag
              href=""
              to="/home"
              className="header__nav__brand logo-home"
            >
              <span className="rc-screen-reader-text" />
              <Logo />
            </DistributeHubLinkOrATag>
            <ul
              className={`rc-list rc-list--blank rc-list--align rc-header__right ${
                this.props.showLoginBtn && !isFromStorePortal
                  ? 'rc-list--inline'
                  : 'rc-hidden'
              }`}
              role="menubar"
            >
              <li className="rc-list__item d-flex align-items-center">
                {showMiniIcons ? (
                  <>
                    {!!+window.__.env.REACT_APP_HUB && isMobile ? (
                      <span
                        className="iconfont icon-search mr-2 icon-search-mini"
                        onClick={this.toggleSearchIcon}
                      >
                        &#xe6a5;
                      </span>
                    ) : (
                      <Search history={history} configStore={configStore} />
                    )}
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
                {this.props.showUserBox && (
                  <UserJSX
                    showCart={showCart}
                    showCenter={showCenter}
                    {...this.props}
                    self={this}
                  />
                )}
              </li>
            </ul>
          </nav>
          {/* 向下滑动页面时，才会出现搜索条 */}
          {showMiniIcons && !!+window.__.env.REACT_APP_HUB && isMobile && (
            <nav className="bg-white nav-search pl-3 pr-3 pb-2 search-full-input-container">
              <Search history={history} />
            </nav>
          )}

          {+window.__.env.REACT_APP_HUB ? (
            <DropDownMenuForHub
              activeTopParentId={this.state.activeTopParentId}
              updateActiveTopParentId={this.updateActiveTopParentId}
              headerNavigationList={headerNavigationListForHub}
              configStore={configStore}
              toggleShowBodyMask={this.toggleShowBodyMask}
              showNav={this.props.showNav}
              showLoginBtn={this.props.showLoginBtn}
            />
          ) : (
            <DropDownMenu
              activeTopParentId={this.state.activeTopParentId}
              updateActiveTopParentId={this.updateActiveTopParentId}
              headerNavigationList={headerNavigationList}
              configStore={configStore}
              toggleShowBodyMask={this.toggleShowBodyMask}
              showNav={this.props.showNav}
              showLoginBtn={this.props.showLoginBtn}
            />
          )}
          {showBannerTip && (
            <div className="nav-slim-banner">
              <div className="rc-bg-colour--brand4 text-center">
                <div className="rc-layout-container rc-content-h-middle">
                  <div className="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs">
                    <span className="rc-icon rc-refresh rc-brand1 rc-iconography"></span>
                    <div className="d-flex align-items-center">
                      <Link
                        to="/subscription-landing"
                        className="rc-margin-right--xs rc-margin-left--xs"
                      >
                        <FormattedMessage id="header.bannerTip" />
                      </Link>
                      <div>
                        {bannerTipShowBtn && (
                          <Link
                            to="/subscription-landing"
                            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                            style={{
                              minWidth: '110px',
                              lineHeight: 'normal'
                            }}
                          >
                            <FormattedMessage id="bannerTip.btnText" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </HeaderContainer>
        {window.__.env.REACT_APP_COUNTRY !== 'ru' &&
          window.__.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true' &&
          this.renderClinic()}
      </>
    );
  }
}

export default withOktaAuth(Header);
