import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { queryStoreCateIds, loadJS } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import { findUserConsentList, getStoreOpenConsentList } from '@/api/consent';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('configStore', 'loginStore')
class RouteFilter extends Component {
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  shouldComponentUpdate(nextProps) {
    const lang = process.env.REACT_APP_LANG;
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
      this.props.history.replace('/payment/payment');
      return false;
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
      this.props.history.replace('/payment/payment');
      return false;
    }

    if (
      nextProps.location.pathname.indexOf('/account') !== -1 &&
      !localItemRoyal.get('rc-token')
    ) {
      this.props.history.push('/');
      return false;
    }

    if (
      nextProps.location.pathname === '/confirmation' &&
      !sessionItemRoyal.get('subOrderNumberList')
    ) {
      this.props.history.push('/');
      return false;
    }
    return true;
  }
  //判断consent接口是否存在必填项
  isExistRequiredListFun(result) {
    let pathname = this.props.location.pathname; //正进入的那个页面
    if (
      result.code === 'K-000000' &&
      result.context.requiredList.length !== 0
    ) {
      this.props.history.push({
        pathname: '/required',
        state: { path: pathname }
      });
    }
  }

  //总的调用consense接口
  getConsentList() {
    if (this.isLogin) {
      this.doFindUserConsentList();
    }
  }
  //1.会员调用consense接口
  doFindUserConsentList() {
    findUserConsentList({}).then((result) => {
      this.isExistRequiredListFun(result);
    });
  }
  async componentDidMount() {
    let pathname = this.props.location.pathname 
    // 会员首页+非/implicit/callback+非required页+account/information页面 调用consense接口
    if ((localItemRoyal.get('rc-token')&&pathname=='/')&&pathname!== '/implicit/callback'&&pathname!== '/required'&&pathname!=='/account/information') {
      this.getConsentList()
    }

    if (
      !localItemRoyal.get('rc-token') &&
      this.props.location.pathname.indexOf('/account') !== -1
    ) {
      this.props.history.push('/');
    }
    if (
      //游客+从url输入required ===>直接跳回首页
      !localItemRoyal.get('rc-token') &&
      this.props.location.pathname.indexOf('/required') !== -1 && sessionItemRoyal.get('fromLoginPage')!='true' 
    ) {
      this.props.history.push('/');
    }

    if (window.location.href.indexOf('/#/') !== -1) {
      window.location.href = window.location.href.split('/#/').join('/');
    }
    if (this.props.location.pathname !== '/login') {
      loadJS(process.env.REACT_APP_ONTRUST_SRC, function () {}, {
        domainScript: process.env.REACT_APP_ONTRUST_DOMAIN_SCRIPT,
        documentLanguage: 'true'
      });
    }

    queryStoreCateIds();
  }
  render() {
    return <React.Fragment />;
  }
}

export default withRouter(RouteFilter);
