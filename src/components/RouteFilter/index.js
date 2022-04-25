import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { findUserConsentList } from '@/api/consent';
import { PDP_Regex } from '@/utils/constant';
import { withOktaAuth } from '@okta/okta-react';
import { authToken } from '@/api/login';
import { funcUrl } from '@/lib/url-utils';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject(
  'configStore',
  'checkoutStore',
  'loginStore',
  'checkoutStore',
  'clinicStore'
)
@withRouter
class RouteFilter extends Component {
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  // router refresh=true后，此生命周期无效
  shouldComponentUpdate(nextProps) {
    // 默认了clinic后，再次编辑clinic
    const { checkoutStore } = this.props;

    const isStorepotal = funcUrl({ name: 'stoken' });
    if (isStorepotal) {
      checkoutStore.removePromotionCode();
    }

    const sPromotionCodeFromSearch = funcUrl({ name: 'spromocode' });
    if (sPromotionCodeFromSearch) {
      checkoutStore.setPromotionCode(sPromotionCodeFromSearch);
      // goodwill单标识 goodWillFlag: 'GOOD_WILL'
      sessionItemRoyal.set('goodWillFlag', 'GOOD_WILL');
    }

    if (
      nextProps.location.pathname === '/prescription' &&
      sessionItemRoyal.get('clinic-reselect') === 'true'
    ) {
      return false;
    }

    if (
      nextProps.location.pathname.indexOf('/account') !== -1 &&
      !localItemRoyal.get('rc-token')
    ) {
      this.props.history.replace('/home');
      return false;
    }
    if (
      nextProps.location.pathname === '/confirmation' &&
      !sessionItemRoyal.get('subOrderNumberList')
    ) {
      this.props.history.replace('/home');
      return false;
    }
    return true;
  }

  //会员调用consense接口
  getConsentList() {
    if (this.isLogin) {
      const pathname = this.props.location.pathname; //正进入的那个页面
      const customerId = this.userInfo?.customerId;
      if (!customerId) {
        return;
      }
      findUserConsentList({
        customerId: customerId,
        oktaToken: localItemRoyal.get('oktaToken')
      }).then((result) => {
        if (result.context.requiredList.length !== 0) {
          this.props.history.push({
            pathname: '/required',
            state: { path: pathname }
          });
        }
      });
    }
  }
  //判断是否执行consent跳转
  isGotoRequireConsentLandingPage() {
    const oktaTokenString = this.props?.authState?.accessToken?.value;
    if (oktaTokenString) {
      let oktaToken = 'Bearer ' + oktaTokenString;
      localItemRoyal.set('oktaToken', oktaToken);
      let pathname = this.props.location.pathname;
      // 非/implicit/callback+非required页 调用consense接口
      if (
        localItemRoyal.get('rc-token') &&
        !localItemRoyal.get('rc-register') &&
        //pathname === '/' &&
        pathname !== '/implicit/callback' &&
        pathname !== '/required'
        //pathname !== '/account/information'
      ) {
        this.getConsentList();
      }
    }
  }
  componentDidUpdate() {
    const { history, location } = this.props;
    const { pathname, search, key } = location;
    sessionItemRoyal.set('prevPath', `${pathname}_${key}`);
    const parameters = search;
    parameters.replace('?', '');
    let searchList = parameters.split('&');
    let customerId = '';
    let consentId = '';
    let uuid = '';
    if (searchList.length === 3) {
      customerId = searchList[0].split('=')[1];
      consentId = searchList[1].split('=')[1];
      uuid = searchList[2].split('=')[1];
    }
    if (customerId && consentId && uuid) {
      return;
    } // Dont not go to Required page when from MKT Eamil

    this.isGotoRequireConsentLandingPage();

    if (
      !PDP_Regex.test(pathname) &&
      pathname !== '/product-finder' &&
      pathname !== '/product-finder-recommendation'
    ) {
      sessionItemRoyal.remove('pr-question-params');
      sessionItemRoyal.remove('pf-result');
      sessionItemRoyal.remove('pf-result-before');
      localItemRoyal.remove('pr-petsInfo');
      localStorage.removeItem('pfls');
      localStorage.removeItem('pfls-before');
    }

    if (
      !localItemRoyal.get('rc-token') &&
      pathname.indexOf('/account') !== -1
    ) {
      localItemRoyal.set(
        'okta-redirectUrl-hub',
        `${window.__.env.REACT_APP_ACCESS_PATH.replace(/\/$/gi, '')}/account`
      );
      history.push('/okta-login-page');
    }

    if (
      localItemRoyal.get('rc-token') &&
      !sessionItemRoyal.get('rc-token-lose') &&
      this.isLogin
    ) {
      authToken({ token: `Bearer ${localItemRoyal.get('rc-token')}` });
    }
  }
  componentDidMount() {
    const { location, checkoutStore } = this.props;
    const { pathname, key } = location;
    const curPath = `${pathname}_${key}`;
    const prevPath = sessionItemRoyal.get('prevPath');
    const isNavigateToOtherPage = curPath !== prevPath;

    // 离开某页面时 清除session/local storage数据
    if (isNavigateToOtherPage && prevPath) {
      if (prevPath.includes('/checkout')) {
        sessionItemRoyal.remove('rc-tid');
        sessionItemRoyal.remove('rc-tidList');
        sessionItemRoyal.remove('rc-swishQrcode');
        sessionItemRoyal.remove('rc-redirectResult');
        sessionItemRoyal.remove('rc-businessId');
        sessionItemRoyal.remove('rc-createSwishQrcodeTime');
        sessionItemRoyal.remove('recommend_product');
        sessionItemRoyal.remove('orderSource');
        sessionItemRoyal.remove('appointment-no');
        sessionItemRoyal.remove('isChangeAppoint');
        sessionItemRoyal.remove('oldAppointNo');
      }
      if (prevPath.includes('/confirmation')) {
        if (sessionItemRoyal.get('rc-paywith-login') === 'true') {
          checkoutStore.removeLoginCartData();
        } else {
          checkoutStore.setCartData(
            checkoutStore.cartData.filter((ele) => !ele.selected)
          ); // 只移除selected
          sessionItemRoyal.remove('rc-token');
        }
        sessionItemRoyal.remove('subOrderNumberList');
        sessionItemRoyal.remove('subNumber');
        sessionItemRoyal.remove('oxxoPayUrl');
        sessionItemRoyal.remove('adyenOxxoAction');
        sessionItemRoyal.remove('gaPet');
        sessionItemRoyal.remove('refresh-confirm-page');
      }
      if (prevPath.includes('/prescription')) {
        sessionItemRoyal.remove('clinic-reselect');
      }
      // if (prevPath.includes('/product-finder-recommendation')) {
      //   sessionItemRoyal.set('is-from-product-finder', '1');
      // }
    }

    sessionItemRoyal.set('prevPath', curPath);

    // if (sessionItemRoyal.get('okta-redirectUrl') && (pathname === '/' || pathname === '/home/' || pathname === '/home') ) {
    //   history.push(sessionItemRoyal.get('okta-redirectUrl'))
    //   sessionItemRoyal.remove('okta-redirectUrl')
    // }

    if (window.location.href.indexOf('/#/') !== -1) {
      window.location.href = window.location.href.split('/#/').join('/');
      return null;
    }

    const el = document.querySelector('html');
    el.lang = window.__.env.REACT_APP_HTML_LANG;

    let base = document.getElementsByTagName('base');
    base[0].href = window.__.env.REACT_APP_HOMEPAGE;
  }

  render() {
    return <React.Fragment />;
  }
}

export default withOktaAuth(RouteFilter);
