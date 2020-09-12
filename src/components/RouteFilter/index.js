import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { queryStoreCateIds } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import { findUserConsentList,getStoreOpenConsentList} from "@/api/consent"

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('configStore','loginStore')
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

    // 德国店铺，不进入此页面
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
      !sessionItemRoyal.get('orderNumber')
    ) {
      this.props.history.push('/');
      return false;
    }
    return true;
  }
  //判断consent接口是否存在必填项
  isExistRequiredListFun(result){
    let pathname = this.props.location.pathname //正进入的那个页面
        if (result.code === 'K-000000' && result.context.requiredList.length!==0) {
          this.props.history.push({ pathname: "/required", state:{path:pathname }});
      }
  }
  //判断consent接口是否存在选填项
  isExistOptionalListFun(result){
    let pathname = this.props.location.pathname //正进入的那个页面
        if (result.code === 'K-000000' && result.context.optionalList.length!==0) {
          this.props.history.push({ pathname: "/required", state:{path:pathname }});
      }
  }

  //总的调用consense接口
  getConsentList(){
    this.isLogin
      ? this.doFindUserConsentList()
      : this.doGetStoreOpenConsentList()
  }
  //1.会员调用consense接口
  doFindUserConsentList(){
    findUserConsentList({}).then((result)=>{
      this.isExistRequiredListFun(result)
    })
  }
  //2.游客调用consense接口
  doGetStoreOpenConsentList(){
      const isRequiredCheckedAll = sessionItemRoyal.get('isRequiredChecked')
      isRequiredCheckedAll
      ?
      console.log('该跳转哪个页面就跳转哪个页面')
      : //游客: 没有全部确认consense
      getStoreOpenConsentList({}).then((result)=>{
        this.isExistRequiredListFun(result)
      })
  }
  async componentDidMount() {
    let pathname = this.props.location.pathname 
    // 非首页+非/implicit/callback+非required页 调用consense接口
    if (pathname!=='/'&&pathname!== '/implicit/callback' &&pathname!== '/required') {
      this.getConsentList()
    }
    
    if (
      !localItemRoyal.get('rc-token') &&
      this.props.location.pathname.indexOf('/account') !== -1
    ) {
      this.props.history.push('/');
    }

    if (window.location.href.indexOf('/#/') !== -1) {
      window.location.href = window.location.href.split('/#/').join('/');
    }
    if (
      this.props.location.pathname === '/payment/payment' &&
      !localItemRoyal.get('rc-token')
    ) {
      loadJS(
        'https://js.paymentsos.com/v2/latest/secure-fields.min.js',
        function () {
          window.POS.setPublicKey(process.env.REACT_APP_PaymentKEY_VISITOR);
          window.POS.setEnvironment(process.env.REACT_APP_PaymentENV);
          const style = {
            base: {
              secureFields: {
                width: 'calc(100% - 45px)'
              },
              pan: {
                display: 'inline-block',
                width: '50%'
              },
              expirationDate: {
                display: 'inline-block',
                width: '30%'
              },
              cvv: {
                display: 'inline-block',
                width: '20%'
              }
            }
          };
          window.POS.setStyle(style);
          window.POS.initSecureFields('card-secure-fields');
          try {
            document
              .getElementById('zoozIframe')
              .setAttribute('scrolling', 'no');
          } catch (e) {}
          if (document.getElementById('payment-form')) {
            document
              .getElementById('payment-form')
              .addEventListener('submit', function (event) {
                console.log(document.getElementById('cardholder-name'));
                event.preventDefault();
                const additionalData = {
                  holder_name: document.getElementById('cardholder-name').value // This field is mandatory
                };
                window.POS.createToken(additionalData, function (result) {
                  console.log(result, 'result');
                  // Grab the token here
                  sessionItemRoyal.set('payosdata', result);
                });
              });
          }
        }
      );
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

function loadJS(url, callback, dataSets) {
  var script = document.createElement('script'),
    fn = callback || function () {};
  script.type = 'text/javascript';
  script.charset = 'UTF-8';

  if (dataSets) {
    for (let key in dataSets) {
      script.dataset[key] = dataSets[key];
    }
  }
  //IE
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    //其他浏览器
    script.onload = function () {
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

export default withRouter(RouteFilter);
