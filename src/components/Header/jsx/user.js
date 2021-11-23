import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { UnLoginUserBox, LoginUserBox } from './UserBox';
import { getDeviceType } from '@/utils/utils.js';
import stores from '@/store';
import { isLimitLogin } from '@/components/LoginButton/utils';

import '../css/user.less';

const loginStore = stores.loginStore;

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const clientWidth = document.body.clientWidth;

const UserJSX = (props) => {
  const isLogin = !!localItemRoyal.get('rc-token');
  const userInfo = localItemRoyal.get('rc-userinfo') || null;

  const firstNameLetter =
    userInfo && userInfo.firstName && userInfo.firstName.slice(0, 1);
  const { self, showUserIcon, history, showCart, showCenter } = props;
  const defaultJSX = (
    <>
      {showUserIcon ? (
        <>
          {isLogin ? (
            <span className="rc-md-up" style={{ marginRight: '-.8rem' }}>
              {self.userInfo && self.userInfo.firstName}
            </span>
          ) : null}

          <span
            id="main_mini_cart"
            className="minicart inlineblock"
            onMouseOver={self.handleCenterMouseOver}
            onMouseOut={self.handleCenterMouseOut}
            onClick={self.loginIcon}
          >
            {isLogin && !isMobile ? (
              <FormattedMessage id="personal">
                {(txt) => (
                  <Link
                    to="/account"
                    className="minicart-link position-relative"
                    data-loc="miniCartOrderBtn"
                    title={txt}
                  >
                    <em className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography" />
                    <span
                      className="rc-md-down"
                      style={{
                        bottom: '-1.45rem',
                        position: 'absolute',
                        right: '.3rem',
                        fontSize: '.95em'
                      }}
                    >
                      {self.userInfo && self.userInfo.firstName}
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
                    <em className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography" />
                  </div>
                )}
              </FormattedMessage>
            )}

            {!isLogin ? (
              <div
                className={`popover popover-bottom ${showCenter ? 'show' : ''}`}
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
                      // style="cursor:pointer"
                      style={{ cursor: 'pointer' }}
                      className="rc-styled-link"
                      // className="rc-styled-link"
                      onClick={() => {
                        // if (
                        //   window.__.env.REACT_APP_COUNTRY == 'us' &&
                        //   isLimitLogin()
                        // ) {
                        //   // 美国4/17的美国中部时间早8点到晚4点不能登录账户
                        //   return loginStore.changeLimitLoginModal(true);
                        // }
                        // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=https%3A%2F%2Fshopuat.466920.com%3Forigin%3Dregister'
                        // window.location.href =
                        //   window.__.env.REACT_APP_RegisterPrefix +
                        //   window.encodeURIComponent(
                        //     window.__.env.REACT_APP_RegisterCallback
                        //   );
                        // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=http%3A%2F%2Flocalhost%3A3000%3Forigin%3Dregister'
                        // this.signUp()
                        if (!window.__.env.REACT_APP_STOREID) {
                          return;
                        }
                        if (
                          window.__.env.REACT_APP_COUNTRY === 'tr' ||
                          window.__.env.REACT_APP_COUNTRY === 'ru' ||
                          window.__.env.REACT_APP_COUNTRY === 'fr' ||
                          window.__.env.REACT_APP_COUNTRY === 'us' ||
                          window.__.env.REACT_APP_COUNTRY === 'de' ||
                          window.__.env.REACT_APP_COUNTRY === 'uk'
                        ) {
                          localItemRoyal.set(
                            'okta-redirectUrl',
                            history &&
                              history.location.pathname +
                                history.location.search
                          );
                          history.push('/register');
                        } else {
                          window.location.href =
                            window.__.env.REACT_APP_RegisterPrefix +
                            window.encodeURIComponent(
                              window.__.env.REACT_APP_RegisterCallback
                            );
                        }
                      }}
                    >
                      <FormattedMessage id="signUp" />
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`popover popover-bottom ${showCenter ? 'show' : ''}`}
                style={{ minWidth: '15rem' }}
                onMouseOver={self.handleMouseOver}
                onMouseOut={self.handleMouseOut}
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
                      <Link to="/account/information" className="click-hover">
                        <span className="iconfont">&#xe69c;</span>{' '}
                        <FormattedMessage id="account.profile" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <Link to="/account/pets" className="click-hover">
                        <span className="iconfont">&#xe69a;</span>{' '}
                        <FormattedMessage id="account.pets" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <Link to="/account/orders" className="click-hover">
                        <span className="iconfont">&#xe699;</span>{' '}
                        <FormattedMessage id="account.ordersTitle" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <Link to="/account/subscription" className="click-hover">
                        <span className="iconfont">&#xe6a2;</span>{' '}
                        <FormattedMessage id="account.subscriptionTitle" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <DistributeHubLinkOrATag
                        href="/about-us/faqs"
                        to="/faq"
                        className="click-hover"
                      >
                        <span className="iconfont">&#xe696;</span>{' '}
                        <FormattedMessage id="footer.FAQ" />
                      </DistributeHubLinkOrATag>
                    </div>
                  </div>
                  <LogoutButton />
                </div>
              </div>
            )}
          </span>
        </>
      ) : null}
    </>
  );

  return +window.__.env.REACT_APP_HUB ? (
    //clientWidth用于兼容 ipad pro展示
    !isMobile || clientWidth > 769 ? (
      // <li onMouseOver={self.handleMouseOver} onMouseOut={self.handleMouseOut} onClick={self.loginIcon}>
      <div
        onMouseOver={self.handleMouseOver}
        onMouseOut={self.handleMouseOut}
        onClick={self.loginIcon}
      >
        {/* 未登录 */}
        {!isLogin && (
          // <a className="rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography">
          <div className="rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography">
            <UnLoginUserBox
              className={`${showCart ? '' : 'rc-hidden'}`}
              self={self}
              {...props}
            />
          </div>
        )}
        {/* 登录 */}
        {isLogin && (
          // <a className="brefName ui-cursor-pointer">
          <div className="brefName ui-cursor-pointer">
            <Link to="/account" className="text-white">
              {firstNameLetter}
            </Link>{' '}
            <LoginUserBox
              className={`${showCart ? '' : 'rc-hidden'}`}
              self={self}
              {...props}
            />
          </div>
        )}
      </div>
    ) : null
  ) : (
    defaultJSX
  );
};

export default UserJSX;
