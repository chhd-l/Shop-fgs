import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { FormattedMessage } from 'react-intl';
import '../css/user.less';

const localItemRoyal = window.__.localItemRoyal;

export const UnLoginUserBox = ({ history, className }) => {
  return (
    <div className={`user-unLogin-popover ${className}`}>
      <div className="already">
        <FormattedMessage id="header.User.alreadyRegistered" />
      </div>
      <LoginButton
        className="rc-btn rc-btn--one mt-1 mb-1"
        btnStyle={{ width: '14rem', padding: '5px 0' }}
        history={history}
      />
      <div className="newUser">
        <FormattedMessage id="header.User.newUser" />
        <Link className="medium pl-2 ui-cursor-pointer" to="/register">
          <FormattedMessage id="header.User.registerNow" />
        </Link>
      </div>
      {process.env.REACT_APP_HUB_MONROYALCANIN ? (
        <a
          className="Offers pt-2 pb-2111 text-left mt-1"
          href={process.env.REACT_APP_HUB_MONROYALCANIN}
          style={{ display: 'block' }}
        >
          <span className="iconfont iconzhuanfa mr-3 rc-text-colour--iconography" />
          <FormattedMessage id="header.User.monRoyalCanin" />
        </a>
      ) : null}

      {0 &&
      process.env.REACT_APP_HUB_VET_PORTAL &&
      process.env.REACT_APP_HUB_BREEDER_PORTAL ? (
        <div className="border-top pt-2">
          <div className="brandName">
            <FormattedMessage id="header.User.royalCaninPartner" />
          </div>
          <div className="breeder">
            <a href={process.env.REACT_APP_HUB_BREEDER_PORTAL}>
              <FormattedMessage id="header.User.breederPortal" />
            </a>
            <span>
              <FormattedMessage id="header.User.or" />
            </span>
            <a href={process.env.REACT_APP_HUB_VET_PORTAL}>
              <FormattedMessage id="header.User.vetPortal" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const LoginUserBox = ({ self, className }) => {
  const {
    personInformationRouter,
    petsRouter,
    subscriptionsRouter
  } = self.props;
  const menuList = [
    {
      link: '/account',
      isShow: true,
      text: (
        <>
          <span className="iconfont rc-text-colour--iconography">&#xe697;</span>{' '}
          <span>
            <FormattedMessage id="header.User.home" />
          </span>
        </>
      )
    },
    {
      link: personInformationRouter,
      isShow: true,
      text: (
        <>
          <span className="iconfont rc-text-colour--iconography">&#xe69c;</span>{' '}
          <span>
            <FormattedMessage id="header.User.myPersonalInformation" />
          </span>
        </>
      )
    },
    {
      link: petsRouter,
      isShow: true,
      text: (
        <>
          <span className="iconfont rc-text-colour--iconography">&#xe69a;</span>{' '}
          <span>
            <FormattedMessage id="header.User.pets" />
          </span>
        </>
      )
    },
    {
      link: '/account/orders',
      isShow: true,
      text: (
        <>
          <span className="iconfont rc-text-colour--iconography">&#xe699;</span>{' '}
          <span>
            <FormattedMessage id="header.User.myOrders" />
          </span>
        </>
      )
    },
    {
      link: subscriptionsRouter,
      isShow: true,
      text: (
        <>
          <span className="iconfont rc-text-colour--iconography">&#xe6a2;</span>{' '}
          <span>
            <FormattedMessage id="header.User.mySubscriptions" />
          </span>
        </>
      )
    },
    {
      link: '/faq',
      href:
        process.env.REACT_APP_COUNTRY == 'RU'
          ? '/about-us/faq'
          : '/about-us/faqs',
      isHubOuterLink: true,
      isShow: true,
      text: (
        <>
          <span className="iconfont rc-text-colour--iconography">&#xe696;</span>{' '}
          <span>
            <FormattedMessage id="header.User.faq" />
          </span>
        </>
      )
    }
  ];
  const userInfo = localItemRoyal.get('rc-userinfo') || null;
  return (
    <div className={`user-login-popover ${className}`}>
      <div className="Media">
        <Link to="/account" className="Media-figure">
          {userInfo && userInfo.firstName && userInfo.firstName.slice(0, 1)}
        </Link>
        <div className="Media-body">
          <Link to="/account" className="fullName">
            {userInfo && [userInfo.firstName, userInfo.lastName].join(' ')}
          </Link>
          <LogoutButton
            containerClassName="logoff-style medium ui-cursor-pointer text-left"
            containerStyle={{ background: '#fff', color: '#444' }}
            btnClassName="ml-2"
          />
        </div>
      </div>
      {menuList.map((item, i) => (
        <React.Fragment key={i}>
          {item.isShow && (
            <>
              {item.isHubOuterLink ? (
                <DistributeHubLinkOrATag
                  href={item.href}
                  to={item.link}
                  className={`basicItem w-100`}
                >
                  {item.text}
                </DistributeHubLinkOrATag>
              ) : (
                <>
                  <Link className={`basicItem w-100`} to={item.link}>
                    {item.text}
                  </Link>
                </>
              )}
            </>
          )}
        </React.Fragment>
      ))}
      {process.env.REACT_APP_HUB_MONROYALCANIN ? (
        <a
          className="basicItem"
          href={process.env.REACT_APP_HUB_MONROYALCANIN}
          style={{ borderTop: '1px solid #DEDEDE', paddingTop: '5px' }}
        >
          <span className="iconfont iconzhuanfa rc-text-colour--iconography" />
          <span>
            <FormattedMessage id="header.User.monRoyalCanin" />
          </span>
        </a>
      ) : null}
      {0 &&
      process.env.REACT_APP_HUB_VET_PORTAL &&
      process.env.REACT_APP_HUB_BREEDER_PORTAL ? (
        <div className="border-top pt-2">
          <div className="brandName">
            <FormattedMessage id="header.User.royalCaninPartner" />
          </div>
          <div className="breeder">
            <a href={process.env.REACT_APP_HUB_BREEDER_PORTAL}>
              <FormattedMessage id="header.User.breederPortal" />
            </a>
            <span>
              <FormattedMessage id="header.User.or" />
            </span>
            <a href={process.env.REACT_APP_HUB_VET_PORTAL}>
              <FormattedMessage id="header.User.vetPortal" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};
