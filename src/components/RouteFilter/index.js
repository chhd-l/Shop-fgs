import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadJS } from '@/utils/utils';
import { inject } from 'mobx-react';
import { findUserConsentList } from '@/api/consent';
//import { getProductPetConfig } from '@/api/payment';
import { toJS } from 'mobx';
import { PDP_Regex } from '@/utils/constant';
import { withOktaAuth } from '@okta/okta-react';
import { authToken } from '@/api/login';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('configStore', 'loginStore', 'checkoutStore', 'clinicStore')
@withRouter
class RouteFilter extends Component {
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  // router refresh=true后，此生命周期无效
  async shouldComponentUpdate(nextProps) {
    // 默认了clinic后，再次编辑clinic
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
      this.props.history.push('/home');
      return false;
    }

    if (
      nextProps.location.pathname === '/confirmation' &&
      !sessionItemRoyal.get('subOrderNumberList')
    ) {
      this.props.history.push('/home');
      return false;
    }
    return true;
  }

  //会员调用consense接口
  getConsentList() {
    if (this.isLogin) {
      let customerId = this.userInfo && this.userInfo.customerId;
      if (!customerId) {
        return;
      }
      findUserConsentList({
        customerId: customerId,
        oktaToken: localItemRoyal.get('oktaToken')
      }).then((result) => {
        this.isExistRequiredListFun(result);
      });
    }
  }
  //判断是否执行consent跳转
  isGotoRequireConsentLandingPage() {
    const oktaTokenString =
      this.props.authState && this.props.authState.accessToken
        ? this.props.authState.accessToken.value
        : '';

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
    let parameters = this.props.location.search;
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
  }
  componentDidMount() {
    const { history, location, checkoutStore } = this.props;
    const { pathname, key } = location;
    const curPath = `${pathname}_${key}`;
    const prevPath = sessionItemRoyal.get('prevPath');
    const isNavigateToOtherPage = curPath !== prevPath;

    // 离开某页面时 清除session/local storage数据
    if (isNavigateToOtherPage && prevPath) {
      if (prevPath.includes('/checkout')) {
        sessionItemRoyal.remove('rc-tid');
        sessionItemRoyal.remove('rc-tidList');
        sessionItemRoyal.remove('recommend_product');
        sessionItemRoyal.remove('orderSource');
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
      }
      if (prevPath.includes('/prescription')) {
        sessionItemRoyal.remove('clinic-reselect');
      }
      // if (prevPath.includes('/product-finder-recommendation')) {
      //   sessionItemRoyal.set('is-from-product-finder', '1');
      // }
    }
    if (
      localItemRoyal.get('rc-token') &&
      !sessionStorage.get('rc-token-lose') &&
      this.isLogin
    ) {
      authToken({ token: `Bearer ${localItemRoyal.get('rc-token')}` });
    }
    if (pathname === '/product-finder') {
      sessionItemRoyal.remove('product-finder-edit-order');
      sessionItemRoyal.remove('pf-result');
    }
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

    sessionItemRoyal.set('prevPath', curPath);

    if (
      !localItemRoyal.get('rc-token') &&
      pathname.indexOf('/account') !== -1
    ) {
      localItemRoyal.set(
        'okta-redirectUrl-hub',
        window.__.env.REACT_APP_ACCESS_PATH[
          window.__.env.REACT_APP_ACCESS_PATH.length - 1
        ] === '/'
          ? window.__.env.REACT_APP_ACCESS_PATH + 'account'
          : window.__.env.REACT_APP_ACCESS_PATH + '/account'
      );
      history.push('/okta-login-page');
    }
    // if (sessionItemRoyal.get('okta-redirectUrl') && (pathname === '/' || pathname === '/home/' || pathname === '/home') ) {
    //   history.push(sessionItemRoyal.get('okta-redirectUrl'))
    //   sessionItemRoyal.remove('okta-redirectUrl')
    // }

    if (window.location.href.indexOf('/#/') !== -1) {
      window.location.href = window.location.href.split('/#/').join('/');
      return null;
    }

    if (pathname !== '/login') {
      // loadJS({
      //   url: window.__.env.REACT_APP_ONTRUST_SRC,
      //   dataSets: {
      //     domainScript: window.__.env.REACT_APP_ONTRUST_DOMAIN_SCRIPT,
      //     documentLanguage: 'true'
      //   }
      // });
    }
    // if (window.__.env.REACT_APP_CONSENT_SCRIPT) {
    //   loadJS({
    //     url: window.__.env.REACT_APP_CONSENT_SCRIPT,
    //     id: 'global-script'
    //   });
    // }
    if (
      window.__.env.REACT_APP_MARS_FOOTER &&
      !/^\/implicit\/callback|^\/required|^\/refuge|^\/okta-login-page|^\/okta-logout-page/.test(
        pathname
      )
    ) {
      // 特殊页面，不加
      if (pathname != '/pickupmap') {
        loadJS({
          url: window.__.env.REACT_APP_MARS_FOOTER
        });
      }
    }
  }
  //判断consent接口是否存在必填项
  isExistRequiredListFun(result) {
    let pathname = this.props.location.pathname; //正进入的那个页面

    if (result.context.requiredList.length !== 0) {
      this.props.history.push({
        pathname: '/required',
        state: { path: pathname }
      });
    }
  }

  get userInfo() {
    return this.props.loginStore.userInfo;
  }

  render() {
    return <React.Fragment />;
  }
}

export default withOktaAuth(RouteFilter);
