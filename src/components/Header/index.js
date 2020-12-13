import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import {
  getParaByName,
  getDeviceType,
  generateOptions,
  getDictionary
} from '@/utils/utils';
import logoAnimatedPng from '@/assets/images/logo--animated.png';
import logoAnimatedSvg from '@/assets/images/logo--animated.svg';
import { getList, findSortList } from '@/api/list';
import { IMG_DEFAULT } from '@/utils/constant';
import {
  getPrescriptionById,
  getPrescriberByEncryptCode,
  getPrescriberByPrescriberIdAndStoreId
} from '@/api/clinic';
import { setBuryPoint, queryHeaderNavigations } from '@/api';
import LoginButton from '@/components/LoginButton';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import DropDownMenu from './modules/DropDownMenu';
import MegaMenuMobile from './modules/MegaMenuMobile';
import LogoutButton from '@/components/LogoutButton';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { loadJS } from '@/utils/utils';
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
      isScrollToTop: true,
      headerNavigationList: [],
      activeTopParentId: -1,
      event: {
        search: {}
      },
      isSearchSuccess: false, //是否搜索成功
      hideNavRouter: ['/confirmation', '/checkout']
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
  isHideNavBar() {
    //只需要在hideNavRouter数组中去配置不要显示nav的路由
    let str =
      this.state.hideNavRouter.indexOf(this.props.history.location.pathname) !=
      -1
        ? 'none'
        : 'flex';
    return {
      display: str
    };
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
        const idRes = await getPrescriberByPrescriberIdAndStoreId({
          prescriberId: linkClinicId,
          storeId: process.env.REACT_APP_STOREID
        });
        const res = await getPrescriptionById({ id: idRes.context.id });
        if (res.context && res.context.enabled) {
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
    let res = await this.queryHeaderNavigations();
    if (res) {
      this.setState({
        headerNavigationList: generateOptions(res).filter((el) => el.enable)
      });
    }
  };
  // 查询二级导航
  queryHeaderNavigations = async () => {
    let ret = sessionItemRoyal.get('header-navigations');
    if (ret) {
      ret = JSON.parse(ret);
    } else {
      const res = await queryHeaderNavigations();
      if (res.context) {
        ret = res.context;
        sessionItemRoyal.set('header-navigations', JSON.stringify(ret));
      }
    }
    return ret;
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
  handleSearch = (e) => {
    if (process.env.REACT_APP_LANG == 'fr') {
      if (this.state.isSearchSuccess) {
        this.props.history.push(
          `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show?q=${e.current.value}`
        );
      } else {
        this.props.history.push('/searchShow/' + e.current.value);
      }
    }
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
          //搜索成功-埋点
          this.props.headerSearchStore.getResult(keywords, goodsContent.length);
          console.log('搜索成功-成功', this.props.headerSearchStore);
          this.setState({ isSearchSuccess: true });
          const { query, results, type } = this.props.headerSearchStore;
          this.state.event.search = {
            query,
            results,
            type
          };
          dataLayer.push({ search: this.state.event.search });

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
          //搜索失败-埋点
          this.props.headerSearchStore.getNoResult(keywords);
          console.log('搜索失败-埋点', this.props.headerSearchStore);
          this.setState({ isSearchSuccess: false });
          const { query, results, type } = this.props.headerSearchStore;
          this.state.event.search = {
            query,
            results,
            type
          };
          dataLayer.push({ search: this.state.event.search });

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
    console.log(item);
    sessionItemRoyal.set('rc-goods-cate-name', item.goodsCateName || '');
    this.props.history.push(
      `/${item.lowGoodsName.split(' ').join('-')}-${item.goodsNo}`
    );
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
                            onClick={this.gotoDetails.bind(this, item)}
                          >
                            <LazyLoad>
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
                      pathname: `/on/demandware.store/Sites-FR-Site/fr_FR/Search-Show`,
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
    // 点击menu埋点-start
    let interaction = {
      category: 'menu',
      action: 'menu',
      label: item.avigationLink,
      value: item.navigationName
    };
    this.GAClickMenu(interaction);
    // 点击menu埋点-end
    let res = await getDictionary({ type: 'pageType' });
    const targetRes = res.filter((ele) => ele.id === item.pageId);
    // interaction 0-page 1-External URL 2-text
    if (item.interaction === 2) {
      return false;
    } else if (item.interaction === 0 && targetRes.length) {
      let linkObj = null;
      let sortParam = null;
      let cateIds = [];
      let filters = [];
      const pageVal = targetRes[0].valueEn;
      if (pageVal) linkObj = { pathname: `${item.navigationLink}` };
      switch (pageVal) {
        case 'PLP':
        case 'SRP':
          // 获取sort参数
          if (item.searchSort) {
            const sortRes = await findSortList();
            const targetSortRes = (sortRes.context || []).filter(
              (ele) => ele.id === item.searchSort
            );
            if (targetSortRes.length) {
              sortParam = {
                field: targetSortRes[0].field,
                sortType: targetSortRes[0].sortType
              };
            }
          }
          // sales category筛选
          const tmpCateIds = (item.navigationCateIds || '').split(',');
          if (tmpCateIds.length) {
            cateIds = tmpCateIds;
          }
          // filter筛选
          try {
            if (item.filter) {
              const tmpFilter = JSON.parse(item.filter);
              if (tmpFilter.length) {
                filters = tmpFilter;
              }
            }
          } catch (err) {}
          if (pageVal === 'SRP') {
            linkObj = Object.assign(linkObj, {
              search: `?${item.keywords}`
            });
          }
          break;
        case 'PDP':
          linkObj = Object.assign(linkObj, {
            pathname: `${item.navigationLink}${item.paramsField}`
          });
          // link = `/details/${item.paramsField}`;
          break;
        // case 'HP':
        //   link = '/';
        //   break;
        // case 'SP':
        //   link = `${
        //     {
        //       en: '/subscription-landing-us',
        //       ru: '/subscription-landing-ru',
        //       tr: '/subscription-landing-tr'
        //     }[process.env.REACT_APP_LANG] || '/subscription-landing'
        //   }`;
        //   break;
        // case 'CUP':
        //   link = '/help';
        //   break;
        default:
          break;
      }
      if (linkObj && linkObj.pathname) {
        linkObj = Object.assign(linkObj, {
          state: { sortParam, cateIds, filters }
        });
        this.props.history.push(linkObj);
        // this.props.history.push({
        //   pathname: link,
        //   state: { sortParam, cateIds, filters },
        //   search: `?${item.keywords}`
        // });
      }
    }
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
  hanldeListItemMouseOver(item) {
    if (!item.expanded) {
      return false;
    }
    this.setState({
      activeTopParentId: item.id
    });
  }
  hanldeListItemMouseOut(item) {
    if (!item.expanded) {
      return false;
    }
    this.setState({
      activeTopParentId: -1
    });
  }
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
        {/* 执行埋点 */}
        {/* {Object.keys(this.state.event.search).length ? <GoogleTagManager searchEvents={this.state.event} /> : null} */}
        {loginStore.loginModal ? <Loading /> : null}
        {/* <header className={`rc-header ${this.state.isScrollToTop ? '' : 'rc-header--scrolled'}`} style={{ zIndex: 9999 }}> */}
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
              {/* <object
                id="header__logo"
                className="rc-header__logo"
                type="image/svg+xml"
                data={logoAnimatedSvg}
                data-js-import-interactive-svg
              >
                <LazyLoad>
                  <img
                    alt="Royal Canin"
                    height="100"
                    src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
                    style={{ backgroundImage: 'url(' + logoAnimatedPng + ')' }}
                    width="135"
                  />
                </LazyLoad>
              </object> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 223 83.75"
                class="rc-header__logo"
                data-js-import-interactive-svg="true"
                svg-animate-processed="true"
              >
                <path
                  class="cls-1 rc-header__logo-text"
                  d="M190.1 79.3a3.2 3.2 0 1 0 6.4 0V56.6a3.2 3.2 0 1 0-6.4 0zm-93.4-3.1a.27.27 0 0 1-.3-.3V57a3.2 3.2 0 0 0-6.4 0v23.4a1.69 1.69 0 0 0 1.7 1.7H103a3 3 0 0 0 0-6zm76-20.1a4.18 4.18 0 0 0-7.8 1.9v21.5a3 3 0 0 0 3 3h.1a3 3 0 0 0 3.1-3V66.4a.22.22 0 0 1 .2-.2l.1.1 7.9 13.8a3.92 3.92 0 0 0 3.5 2.1 4 4 0 0 0 4-4v-22a3 3 0 1 0-6 0v13.2l-.2.2-.1-.1zm35.2 0a4.18 4.18 0 0 0-7.8 1.9v21.6a3 3 0 0 0 3 3h.1a3 3 0 0 0 3.1-3V66.5a.22.22 0 0 1 .2-.2l.1.1 7.9 13.8a3.92 3.92 0 0 0 3.5 2.1 4 4 0 0 0 4-4v-22a3 3 0 0 0-6 0v13.2l-.2.2-.1-.1zM58.8 62.4c-.1 0-.3 0-.3-.1l-7-7.4a3 3 0 0 0-5.2 2.1 3 3 0 0 0 .8 2l8.5 9.8.1 10.4a3 3 0 0 0 6 0l.1-10.4 8.5-9.8a3.18 3.18 0 0 0 .8-2 3 3 0 0 0-5.2-2.1l-7 7.4c.1.1 0 .1-.1.1zm-24-1.8a7.6 7.6 0 1 1-7.6 7.6 7.6 7.6 0 0 1 7.6-7.6zm14.1 7.6a14 14 0 1 0 0 .2v-.2zM150 70.1v.1a.22.22 0 0 1-.2.2h-2.9v-4.6zm-3.8-15.2a3.7 3.7 0 0 0-2.4-1.2c-1.7 0-3.2.9-3.2 2.6v22.6a3.12 3.12 0 0 0 3.1 3.1 3.2 3.2 0 0 0 3.2-3.1v-2.4h7.7l3.2 4.4a3.42 3.42 0 0 0 2.4 1.3 3 3 0 0 0 3-3 2.79 2.79 0 0 0-.6-1.8zM79.7 65.8v4.6h-2.9a.22.22 0 0 1-.2-.2v-.1zM63.8 77.3a3 3 0 0 0-.6 1.8 3 3 0 0 0 3 3 2.81 2.81 0 0 0 2.4-1.3l3.2-4.4h7.7v2.5a3.2 3.2 0 0 0 3.2 3.1 3.12 3.12 0 0 0 3.1-3.1v-22a3.22 3.22 0 0 0-3.2-3.2 3 3 0 0 0-2.4 1.2zm50.5-9a14 14 0 0 0 13.3 14.1c4 0 8.3-1.7 10.6-4.5a3.06 3.06 0 0 0 .7-2 3 3 0 0 0-3-3 3.19 3.19 0 0 0-1.4.3l-2.4 1.6a7.21 7.21 0 0 1-4 1.2 7.75 7.75 0 0 1 0-15.5 7.21 7.21 0 0 1 4 1.2l2.4 1.6a2.88 2.88 0 0 0 4-1.3 3.19 3.19 0 0 0 .3-1.4 3.06 3.06 0 0 0-.7-2 12.24 12.24 0 0 0-9.8-4.4 13.87 13.87 0 0 0-14.1 13.7.76.76 0 0 1 .1.4zM10.4 60.5a3.2 3.2 0 0 1 3.3 3 3.14 3.14 0 0 1-3.3 3h-.1A3.12 3.12 0 0 1 7 63.6a3.37 3.37 0 0 1 3.4-3.1zM1.8 79.3a3.08 3.08 0 0 0 3 3 3.08 3.08 0 0 0 3-3l.1-7.5a.32.32 0 0 1 .3-.3h.1l7.4 10a3 3 0 0 0 2 .8 3.06 3.06 0 0 0 3-2.9 2.2 2.2 0 0 0-.4-1.3l-4.6-7.3a8.1 8.1 0 0 0 4-7.2 9.33 9.33 0 0 0-9-9.5h-.2a9.17 9.17 0 0 0-6.9 2.4c-1.9 1.7-2.4 4.3-2.4 7z"
                  fill="#e2001a"
                />
                <path
                  class="cls-1 rc-header__logo-crown"
                  d="M86.6 43.4a2.22 2.22 0 0 1-2-1 2.54 2.54 0 0 1 .5-3.5c6.6-4.8 16.6-7.8 26.9-7.8 10.3 0 20.2 2.9 26.8 7.8a2.41 2.41 0 0 1 .5 3.4.1.1 0 0 1-.1.1 2.53 2.53 0 0 1-3.5.5c-4.4-3.3-13-6.8-23.9-6.8-10.9 0-19.5 3.5-23.9 6.8a1.9 1.9 0 0 1-1.3.5zm2.2 4.1a1.69 1.69 0 0 0 1-.3c5-4.2 13.5-6.7 22-6.7s16.8 2.5 21.9 6.7a1.73 1.73 0 0 0 2.4-.2 1.86 1.86 0 0 0-.2-2.5c-5.7-4.6-14.7-7.5-24.1-7.5s-18.4 2.8-24.1 7.5a1.73 1.73 0 0 0-.2 2.4 1.61 1.61 0 0 0 1.3.6zM75.7 12a6 6 0 0 0-2.9.8 6.34 6.34 0 0 0-2.7 3.5 6.16 6.16 0 0 0 .6 4.2 5.72 5.72 0 0 0 4.8 2.8 5.1 5.1 0 0 0 2.9-.8 6.34 6.34 0 0 0 2.7-3.5 6.44 6.44 0 0 0-.6-4.3 5.85 5.85 0 0 0-4.8-2.7zm36.2 4.4a5.7 5.7 0 0 0-5.7 5.7 5.7 5.7 0 1 0 11.4 0 5.7 5.7 0 0 0-5.7-5.7zm0-14.2a5.7 5.7 0 0 0-5.7 5.7 5.63 5.63 0 0 0 5.7 5.7 5.7 5.7 0 0 0 0-11.4zm-15 16.1a7.72 7.72 0 0 0-1.5.2 5.63 5.63 0 0 0-4 6.8v.2a5.89 5.89 0 0 0 5.4 4.2h.2a6.75 6.75 0 0 0 1.4-.2 5.57 5.57 0 0 0 3.5-2.7 6.36 6.36 0 0 0 .6-4.3 6.25 6.25 0 0 0-5.6-4.2zm-14.1 5.9a6 6 0 0 0-2.9.8 6.47 6.47 0 0 0-2.7 3.4 6.44 6.44 0 0 0 .6 4.3 5.62 5.62 0 0 0 4.8 2.7 6 6 0 0 0 2.9-.8 6.34 6.34 0 0 0 2.7-3.5 6.44 6.44 0 0 0-.6-4.3 5.5 5.5 0 0 0-4.8-2.6zm45.7-5.6a7.72 7.72 0 0 0-1.5-.2 5.64 5.64 0 0 0-1.5 11.1 7.72 7.72 0 0 0 1.5.2 5.74 5.74 0 0 0 5.7-5.6 5.67 5.67 0 0 0-4.2-5.5zm3.7-13.7a7.72 7.72 0 0 0-1.5-.2 5.74 5.74 0 0 0-5.7 5.6 5.76 5.76 0 0 0 4.2 5.5 7.72 7.72 0 0 0 1.5.2 5.58 5.58 0 0 0 5.4-4.1 5.4 5.4 0 0 0-3.6-6.8c-.1-.2-.2-.2-.3-.2zm11.7 20.2a6 6 0 0 0-2.9-.8 5.54 5.54 0 0 0-4.9 2.8 5.74 5.74 0 0 0 2 7.8 6 6 0 0 0 2.9.8 5.88 5.88 0 0 0 4.9-2.8 5.39 5.39 0 0 0 .6-4.3 4.79 4.79 0 0 0-2.6-3.5zm9.9-8.8a5.42 5.42 0 0 0-2.6-3.5 6 6 0 0 0-2.9-.8 5.88 5.88 0 0 0-4.9 2.8 5.39 5.39 0 0 0-.6 4.3 5.15 5.15 0 0 0 2.7 3.4 6 6 0 0 0 2.9.8 5.47 5.47 0 0 0 4.8-2.8 6.16 6.16 0 0 0 .6-4.2zm-60.7-.2a7.72 7.72 0 0 0 1.5-.2 5.65 5.65 0 0 0-1.5-11.1 7.72 7.72 0 0 0-1.5.2 5.63 5.63 0 0 0-4 6.8v.2a6.16 6.16 0 0 0 5.5 4.1z"
                  fill="#e2001a"
                />
              </svg>
            </Link>
            <ul
              className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__right"
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
                              onClick={() => this.handleSearch(this.inputRef)}
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
                    <span style={{ marginLeft: this.userInfo ? '10px' : '0' }}>
                      {getDeviceType() === 'PC' &&
                        this.userInfo &&
                        this.userInfo.firstName}
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
                              className="minicart-link"
                              data-loc="miniCartOrderBtn"
                              title={txt}
                            >
                              <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography" />
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
                          style={{ minWidth: '13rem' }}
                        >
                          <div className="container cart">
                            <div className="login-style">
                              <LoginButton
                                btnStyle={{ width: '11rem', margin: '2rem 0' }}
                                history={history}
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
                              <span
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
                                  // history.push('/register');
                                }}
                              >
                                <FormattedMessage id="signUp" />
                              </span>
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
                          className={`popover popover-bottom ${
                            showCenter ? 'show' : ''
                          }`}
                          style={{ minWidth: '13rem' }}
                          onMouseOver={this.handleMouseOver}
                          onMouseOut={this.handleMouseOut}
                        >
                          <div className="container cart">
                            <div className="link-group">
                              <div className="link-style">
                                <Link to="/account" className="click-hover">
                                  <span className="iconfont">&#xe697;</span>{' '}
                                  <FormattedMessage id="account.myAccount" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link
                                  to="/account/information"
                                  className="click-hover"
                                >
                                  <span className="iconfont">&#xe69c;</span>{' '}
                                  <FormattedMessage id="account.basicInfomation" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <span className="iconfont">&#xe69a;</span>{' '}
                                <Link
                                  to="/account/pets"
                                  className="click-hover"
                                >
                                  <FormattedMessage id="account.pets" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link
                                  to="/account/orders"
                                  className="click-hover"
                                >
                                  <span className="iconfont">&#xe699;</span>{' '}
                                  <FormattedMessage id="account.orders" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link
                                  to="/account/subscription"
                                  className="click-hover"
                                >
                                  <span className="iconfont">&#xe6a2;</span>{' '}
                                  <FormattedMessage id="account.subscription" />
                                </Link>
                              </div>
                              <div className="link-style">
                                <Link to="/FAQ/all" className="click-hover">
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
            className="rc-header__nav rc-header__nav--secondary rc-md-up "
            style={this.isHideNavBar()}
          >
            <ul
              className="rc-list rc-list--blank rc-list--inline rc-list--align rc-header__center flex-nowrap"
              style={this.isHideNavBar()}
            >
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
                        {item.interaction === 1 ? (
                          <a
                            href={item.navigationLink}
                            target={item.target}
                            className="rc-list__header"
                          >
                            {this.renderDropDownText(item)}
                          </a>
                        ) : (
                          <span
                            onClick={this.handleClickNavItem.bind(this, item)}
                            className="rc-list__header"
                          >
                            {this.renderDropDownText(item)}
                          </span>
                        )}
                      </span>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <DropDownMenu
            activeTopParentId={this.state.activeTopParentId}
            updateActiveTopParentId={(id) => {
              this.setState({ activeTopParentId: id });
            }}
            headerNavigationList={headerNavigationList}
            configStore={configStore}
            handleClickNavItem={this.handleClickNavItem}
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
