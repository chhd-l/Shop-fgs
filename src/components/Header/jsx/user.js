import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { UnLoginUserBox, LoginUserBox } from './UserBox';
import { getDeviceType } from '@/utils/utils.js';

import '../css/user.less';

const localItemRoyal = window.__.localItemRoyal;
const isMobile = getDeviceType() === 'H5';

const isLogin = !!localItemRoyal.get('rc-token');
const userInfo = localItemRoyal.get('rc-userinfo') || null;

const UserJSX = (props) => {
  const firstNameLetter =
    userInfo && userInfo.firstName && userInfo.firstName.slice(0, 1);
  const { self, showUserIcon, history, showCart, showCenter } = props;
  const defaultJSX = (
    <>
      {showUserIcon ? (
        <>
          <span className="rc-md-up">
            {self.userInfo && self.userInfo.firstName}
          </span>
          <span
            id="main_mini_cart"
            className="minicart inlineblock"
            onMouseOver={self.handleCenterMouseOver}
            onMouseOut={self.handleCenterMouseOut}
          >
            {self.isLogin ? (
              <FormattedMessage id="personal">
                {(txt) => (
                  <Link
                    to="/account"
                    className="minicart-link position-relative"
                    data-loc="miniCartOrderBtn"
                    title={txt}
                  >
                    <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography" />
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
                    <i className="minicart-icon rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography" />
                  </div>
                )}
              </FormattedMessage>
            )}

            {!self.isLogin ? (
              <div
                className={`popover popover-bottom ${showCenter ? 'show' : ''}`}
                style={{ minWidth: '15rem' }}
              >
                <div className="container cart">
                  <div className="login-style">
                    <LoginButton
                      btnStyle={{ width: '11rem', margin: '.5rem 0' }}
                      history={history}
                    />
                    <div>
                      <FormattedMessage id="account.notRegistred" />
                    </div>
                    <span
                      className="rc-styled-link"
                      onClick={() => {
                        // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=https%3A%2F%2Fshopuat.466920.com%3Forigin%3Dregister'
                        // window.location.href =
                        //   process.env.REACT_APP_RegisterPrefix +
                        //   window.encodeURIComponent(
                        //     process.env.REACT_APP_RegisterCallback
                        //   );
                        // window.location.href = 'https://prd-weu1-rc-df-ciam-app-webapp-uat.cloud-effem.com/?redirect_uri=http%3A%2F%2Flocalhost%3A3000%3Forigin%3Dregister'
                        // this.signUp()
                        if (!process.env.REACT_APP_STOREID) {
                          return;
                        }
                        if (process.env.REACT_APP_LANG === 'fr') {
                          history.push('/register');
                        } else {
                          window.location.href =
                            process.env.REACT_APP_RegisterPrefix +
                            window.encodeURIComponent(
                              process.env.REACT_APP_RegisterCallback
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
                      <Link to="/faq" className="click-hover">
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
    </>
  );
  return isMobile
    ? null
    : {
        //hub专用
        1: (
          <li
            onMouseOver={self.handleMouseOver}
            onMouseOut={self.handleMouseOut}
            onClick={self.loginIcon}
          >
            {/* 未登录 */}
            {!isLogin && (
              <a className="rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography">
                {showCart ? <UnLoginUserBox self={self} {...props} /> : null}
              </a>
            )}
            {/* 登录 */}
            {isLogin && (
              <a className="brefName">
                <Link to="/account" className="text-white">{firstNameLetter}</Link>{' '}
                {showCart ? <LoginUserBox self={self} {...props} /> : null}
              </a>
            )}
          </li>
        )
      }[process.env.REACT_APP_HUB] || defaultJSX;
};

export default UserJSX;
