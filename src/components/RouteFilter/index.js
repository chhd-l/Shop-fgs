import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadJS } from '@/utils/utils';
import { inject } from 'mobx-react';
import { findUserConsentList } from '@/api/consent';
//import { getProductPetConfig } from '@/api/payment';
import { toJS } from 'mobx';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('configStore', 'loginStore', 'checkoutStore', 'clinicStore')
class RouteFilter extends Component {
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  // UNSAFE_componentWillMount() {
  //   const { history, location, configStore } = this.props;
  //   const { pathname } = location;
  //   // 默认了clinic后，再次编辑clinic
  //   if (
  //     pathname === '/prescription' &&
  //     sessionItemRoyal.get('clinic-reselect') === 'true'
  //   ) {
  //     return false;
  //   }
  //   // 不开启地图，不进入此页面
  //   if (pathname === '/prescription' && !configStore.prescriberMap) {
  //     this.props.history.replace('/checkout');
  //     return false;
  //   }

  //   if (pathname === '/prescription') {
  //     if (this.isLogin) {
  //       let needPrescriber;
  //       if (this.props.checkoutStore.autoAuditFlag) {
  //         needPrescriber =
  //           this.props.checkoutStore.loginCartData.filter(
  //             (el) => el.prescriberFlag
  //           ).length > 0;
  //       } else {
  //         needPrescriber = this.props.checkoutStore.AuditData.length > 0;
  //       }
  //       if (
  //         !needPrescriber ||
  //         localItemRoyal.get(`rc-linkedAuditAuthorityFlag`)
  //       ) {
  //         history.replace('/checkout');
  //       }
  //     } else {
  //       let needPrescriber;
  //       if (this.props.checkoutStore.autoAuditFlag) {
  //         needPrescriber =
  //           this.props.checkoutStore.cartData.filter((el) => el.prescriberFlag)
  //             .length > 0;
  //       } else {
  //         needPrescriber = this.props.checkoutStore.AuditData.length > 0;
  //       }
  //       if (
  //         !needPrescriber ||
  //         localItemRoyal.get(`rc-linkedAuditAuthorityFlag`)
  //       ) {
  //         history.replace('/checkout');
  //       }
  //     }
  //   }
  //   if (
  //     pathname === '/prescription' &&
  //     (localItemRoyal.get(`rc-linkedAuditAuthorityFlag`) ||
  //       localItemRoyal.get(`rc-linkedAuditAuthorityFlag`) === undefined) &&
  //     ((localItemRoyal.get(`rc-clinic-id-link`) &&
  //       localItemRoyal.get(`rc-clinic-name-link`)) ||
  //       (localItemRoyal.get(`rc-clinic-id-select`) &&
  //         localItemRoyal.get(`rc-clinic-name-select`)) ||
  //       (localItemRoyal.get(`rc-clinic-id-default`) &&
  //         localItemRoyal.get(`rc-clinic-name-default`)))
  //   ) {
  //     if (localItemRoyal.get(`rc-linkedAuditAuthorityFlag`)) {
  //       if (this.props.clinicStore.linkClinicId) {
  //         this.props.clinicStore.setSelectClinicId(
  //           this.props.clinicStore.linkClinicId
  //         );
  //         this.props.clinicStore.setSelectClinicName(
  //           this.props.clinicStore.linkClinicName
  //         );
  //       }
  //     } else if (
  //       !this.props.clinicStore.linkClinicId &&
  //       !this.props.clinicStore.selectClinicId &&
  //       this.props.clinicStore.defaultClinicId
  //     ) {
  //       this.props.clinicStore.setSelectClinicId(
  //         this.props.clinicStore.defaultClinicId
  //       );
  //       this.props.clinicStore.setSelectClinicName(
  //         this.props.clinicStore.defaultClinicName
  //       );
  //     }
  //     history.replace('/checkout');
  //     return false;
  //   }

  //   if (
  //     pathname.indexOf('/account') !== -1 &&
  //     !localItemRoyal.get('rc-token')
  //   ) {
  //     history.push('/home');
  //     return false;
  //   }

  //   if (
  //     pathname === '/confirmation' &&
  //     !sessionItemRoyal.get('subOrderNumberList')
  //   ) {
  //     history.push('/home');
  //     return false;
  //   }

  //   return true;
  // }
  // router refresh=true后，此生命周期无效
  async shouldComponentUpdate(nextProps) {
    // 默认了clinic后，再次编辑clinic
    if (
      nextProps.location.pathname === '/prescription' &&
      sessionItemRoyal.get('clinic-reselect') === 'true'
    ) {
      return false;
    }
    // 不开启地图，不进入此页面
    if (
      nextProps.location.pathname === '/prescription' &&
      !this.props.configStore.prescriberMap
    ) {
      this.props.history.replace('/checkout');
      return false;
    }

    if (nextProps.location.pathname === '/prescription') {
      console.log(toJS(this.props.checkoutStore.autoAuditFlag), 'AuditData');
      if (this.props.checkoutStore.autoAuditFlag) {
        this.props.history.replace('/checkout');
      }

      // if(this.isLogin) {
      //   let res = await getProductPetConfig({goodsInfos: this.props.checkoutStore.loginCartData})
      //   let AuditData = res.goodsInfos.filter(el => el.auditCatFlag)
      //   this.props.checkoutStore.setAuditData(AuditData)
      // }else {
      //   let paramData = this.props.checkoutStore.cartData.map(el => {
      //     el.goodsInfoId = el.sizeList.filter(item => item.selected)[0].goodsInfoId
      //     return el
      //   })
      //   let res = await getProductPetConfig({goodsInfos: paramData})
      //   console.log(res, 'res')
      //   debugger
      //   return false
      //   // this.AuditData = res.goodsInfos.filter(el => el.auditCatFlag)
      // }
      // this.props.history.replace('/checkout');
      // return false;
    }

    if (
      nextProps.location.pathname === '/prescription' &&
      ((localItemRoyal.get(`rc-clinic-id-link`) &&
        localItemRoyal.get(`rc-clinic-name-link`)) ||
        (localItemRoyal.get(`rc-clinic-id-select`) &&
          localItemRoyal.get(`rc-clinic-name-select`)) ||
        (localItemRoyal.get(`rc-clinic-id-default`) &&
          localItemRoyal.get(`rc-clinic-name-default`)))
    ) {
      this.props.history.replace('/checkout');
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
  async componentDidMount() {
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
      }
      if (prevPath.includes('/prescription')) {
        sessionItemRoyal.remove('clinic-reselect');
      }
      if (prevPath.includes('/product-finder/question/')) {
        sessionItemRoyal.remove('product-finder-edit-order');
      }
    }

    sessionItemRoyal.set('prevPath', curPath);

    // 会员首页+非/implicit/callback+非required页+account/information页面 调用consense接口
    if (
      localItemRoyal.get('rc-token') &&
      !localItemRoyal.get('rc-register') &&
      pathname === '/' &&
      pathname !== '/implicit/callback' &&
      pathname !== '/required' &&
      pathname !== '/account/information'
    ) {
      this.getConsentList();
    }

    if (
      !localItemRoyal.get('rc-token') &&
      pathname.indexOf('/account') !== -1
    ) {
      sessionItemRoyal.set(
        'okta-redirectUrl-hub',
        process.env.REACT_APP_ACCESS_PATH + '/account'
      );
      history.push('/okta-login-page');
    }
    if (
      //游客+从url输入required ===>直接跳回首页
      !localItemRoyal.get('rc-token') &&
      pathname.indexOf('/required') !== -1 &&
      sessionItemRoyal.get('fromLoginPage') !== 'true'
    ) {
      history.push('/home');
    }

    if (window.location.href.indexOf('/#/') !== -1) {
      window.location.href = window.location.href.split('/#/').join('/');
      return null;
    }
    if (window.location.href.indexOf('.html') !== -1) {
      window.location.href = window.location.href.split('.html')[0];
    }

    if (pathname !== '/login') {
      loadJS({
        url: process.env.REACT_APP_ONTRUST_SRC,
        dataSets: {
          domainScript: process.env.REACT_APP_ONTRUST_DOMAIN_SCRIPT,
          documentLanguage: 'true'
        }
      });
    }
    if (process.env.REACT_APP_CONSENT_SCRIPT) {
      loadJS({
        url: process.env.REACT_APP_CONSENT_SCRIPT,
        id: 'global-script'
      });
    }

    if (
      process.env.REACT_APP_MARS_FOOTER &&
      !/^\/implicit\/callback|^\/required|^\/refuge|^\/okta-login-page|^\/okta-logout-page/.test(
        pathname
      )
    ) {
      loadJS({
        url: process.env.REACT_APP_MARS_FOOTER
      });
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
  //总的调用consense接口
  getConsentList() {
    if (this.isLogin) {
      this.doFindUserConsentList();
    }
  }
  //1.会员调用consense接口
  doFindUserConsentList() {
    let customerId = this.userInfo && this.userInfo.customerId;
    if (!customerId) {
      return;
    }
    findUserConsentList({ customerId }).then((result) => {
      this.isExistRequiredListFun(result);
    });
  }
  render() {
    return <React.Fragment />;
  }
}

export default withRouter(RouteFilter);
