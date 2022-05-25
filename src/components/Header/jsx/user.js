import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { UnLoginUserBox, LoginUserBox } from './UserBox';
import { getDeviceType } from '@/utils/utils.js';
import '../css/user.less';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const clientWidth = document.body.clientWidth;

const UserJSX = (props) => {
  const {
    self,
    showUserIcon,
    history,
    showCart,
    showCenter,
    intl,
    loginStore: { isLogin, userInfo }
  } = props;
  const firstNameLetter = userInfo?.firstName && userInfo.firstName.slice(0, 1);
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
                      intl={intl}
                    />
                    <div>
                      <FormattedMessage id="account.notRegistred" />
                    </div>
                    <span
                      // style="cursor:pointer"
                      className="rc-styled-link cursor-pointer inline-block"
                      // className="rc-styled-link"
                      onClick={() => {
                        if (+window.__.env.REACT_APP_CUSTOM_REGISTER) {
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
                        <span className="iconfont iconhome" />{' '}
                        <FormattedMessage id="account.home" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <Link to="/account/information" className="click-hover">
                        <span className="iconfont iconInformation" />{' '}
                        <FormattedMessage id="account.profile" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <Link to="/account/pets" className="click-hover">
                        <span className="iconfont iconPets" />{' '}
                        <FormattedMessage id="account.pets" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <Link to="/account/orders" className="click-hover">
                        <span className="iconfont iconOrders" />{' '}
                        <FormattedMessage id="account.ordersTitle" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <Link to="/account/subscription" className="click-hover">
                        <span className="iconfont iconSubscriptions" />{' '}
                        <FormattedMessage id="account.subscriptionTitle" />
                      </Link>
                    </div>
                    <div className="link-style">
                      <DistributeHubLinkOrATag
                        href="/about-us/faqs"
                        to="/faq"
                        className="click-hover"
                      >
                        <span className="iconfont iconfaq" />{' '}
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

  return window.__.env.REACT_APP_HUB ? (
    //clientWidth用于兼容 ipad pro展示
    // !isMobile || clientWidth > 769 ? (
    // <li onMouseOver={self.handleMouseOver} onMouseOut={self.handleMouseOut} onClick={self.loginIcon}>
    <div
      onMouseOver={self.handleMouseOver}
      onMouseOut={self.handleMouseOut}
      onClick={self.loginIcon}
    >
      {/* 未登录 */}
      {!isLogin && (
        // <a className="rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography">
        <div className="rc-btn rc-btn rc-btn--icon rc-icon less-width-xs rc-user--xs rc-iconography whitespace-nowrap">
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
          {isMobile ? (
            <span onClick={self.handleMouseOver} className="text-white">
              {firstNameLetter}
            </span>
          ) : (
            <Link to="/account" className="text-white">
              {firstNameLetter}
            </Link>
          )}
          <LoginUserBox
            className={`${showCart ? '' : 'rc-hidden'}`}
            self={self}
            {...props}
          />
        </div>
      )}
    </div>
  ) : (
    defaultJSX
  );
};

export default inject('loginStore')(observer(UserJSX));
