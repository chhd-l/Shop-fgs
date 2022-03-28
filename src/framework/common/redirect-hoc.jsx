import React, { Component } from 'react';
import { funcUrl } from '@/lib/url-utils';
import Loading from '@/components/Loading';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;

/**
 * 处理邮件链接redirect参数
 * 1. 带有toOkta=true时, 在render中处理跳转登录逻辑
 * 2. 没带toOkta=true时, 或没带toOkta参数时, 在componentDidMount中直接push对应链接
 */
const redirectHoc = (WrappedComponent) => {
  return class extends Component {
    componentDidMount() {
      const hasToOktaSearchParam = funcUrl({ name: 'toOkta' }) === 'true';
      if (!hasToOktaSearchParam) {
        const oktaRedirectUrl = this.generateRedirectUrl();
        if (oktaRedirectUrl) {
          this.props.history.push(oktaRedirectUrl);
        }
      }
    }
    /**
     * 处理邮件链接redirect参数, 针对redirect=order/subscription/baseinfo/pets特殊处理，其他直接跳转shop内置路由
     */
    generateRedirectUrl = () => {
      const redirectSearchVal = funcUrl({ name: 'redirect' });
      let ret = '';
      switch (redirectSearchVal) {
        case 'order':
          ret = '/account/orders';
          break;
        case 'orders':
          ret = '/account/orders';
          break;
        case 'appointDetail':
          ret = '/account/appointments';
          break;
        case 'subscription':
          ret = '/account/subscription';
          break;
        case 'baseinfo':
          ret = '/account/information';
          break;
        case 'pets':
          ret = '/account/pets';
          break;
        default:
          if (redirectSearchVal) {
            ret = `/${redirectSearchVal}`;
          }
      }
      if (redirectSearchVal) {
        ret += this.props.history.location.search;
        if (
          redirectSearchVal === 'checkout' &&
          funcUrl({ name: 'appointmentNo' })
        ) {
          //feline通过邮件进入checkout页面之前需将appointmentNo存入session
          sessionItemRoyal.set(
            'appointment-no',
            funcUrl({ name: 'appointmentNo' })
          );
        }
      }

      return ret;
    };
    render() {
      // 重定向到登录页面
      const hasToOktaSearchParam = funcUrl({ name: 'toOkta' }) === 'true';
      if (hasToOktaSearchParam) {
        const oktaRedirectUrl = this.generateRedirectUrl();
        if (oktaRedirectUrl) {
          localItemRoyal.set('okta-redirectUrl', oktaRedirectUrl);
        }
        this.props.oktaAuth.signInWithRedirect(
          window.__.env.REACT_APP_HOMEPAGE
        );
        return <Loading bgColor={'#fff'} />;
      }

      if (funcUrl({ name: 'origin' }) === 'forgot') {
        this.props.oktaAuth.signInWithRedirect(
          window.__.env.REACT_APP_HOMEPAGE
        );
        return <Loading bgColor={'#fff'} />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default redirectHoc;
