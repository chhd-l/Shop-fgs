import React, { useEffect, useState } from 'react';

import { inject, observer } from 'mobx-react';
import Loading from '@/components/Loading';
const localItemRoyal = window.__.localItemRoyal;
/**
 *
 * @param {*} param0
 * @returns
 * 判断是否登录，并设置重定向url为 create-petPage
 * 本页面只做是否登录判断
 */

const index = ({ loginStore, ...resTprops }) => {
  //   isLogin: false
  // limitLoginModal: false
  // loginModal: false
  // userInfo: null
  console.log('resTprops ', resTprops);
  useEffect(() => {
    isToLogin();
  }, []);

  const isToLogin = () => {
    // 设置重定向路由到宠物创建选择页面
    localItemRoyal.set('okta-redirectUrl', '/account/pets/petForm');
    const isLogin = loginStore?.isLogin;
    if (isLogin) {
      // 登录了就去宠物创建页面
      resTprops.history.push('/account/pets/petForm');
    } else {
      // 没有登录就去注册页面
      resTprops.history.push('/register');
    }
  };
  return <React.Fragment />;
};

export default inject('loginStore')(observer(index));
