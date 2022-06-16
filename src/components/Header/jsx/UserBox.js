import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { FormattedMessage } from 'react-intl-phraseapp';
import '../css/user.less';

const localItemRoyal = window.__.localItemRoyal;

export const UnLoginUserBox = ({ history, className, intl }) => {
  return (
    <div className={`user-unLogin-popover ${className}`}>
      {window.__.env.REACT_APP_HUB_B2B_LOGIN ? (
        <p className="user-private">
          <FormattedMessage id="header.User.private" />{' '}
        </p>
      ) : null}
      <div className="already">
        <FormattedMessage id="header.User.alreadyRegistered" />
      </div>
      <LoginButton
        className="rc-btn rc-btn--one mt-1 mb-1 bg-rc-red"
        btnStyle={{ width: '14rem', padding: '5px 0' }}
        intl={intl}
      />
      <div className="newUser">
        <FormattedMessage id="header.User.newUser" />
        <Link
          className="medium pl-2 ui-cursor-pointer 1212"
          onClick={() => {
            localItemRoyal.set(
              'okta-redirectUrl',
              history && history.location.pathname + history.location.search
            );
            console.log(
              'history && history.location.pathname + history.location.search',
              history && history.location.pathname + history.location.search
            );
          }}
          to="/register"
        >
          <FormattedMessage id="header.User.registerNow" />
        </Link>
      </div>
      {window.__.env.REACT_APP_HUB_MONROYALCANIN ? (
        <a
          className="Offers pt-2 pb-2111 text-left mt-1"
          href={window.__.env.REACT_APP_HUB_MONROYALCANIN}
          style={{ display: 'block' }}
        >
          <span className="iconfont iconzhuanfa mr-3 rc-text-colour--iconography" />
          <FormattedMessage id="header.User.monRoyalCanin" />
        </a>
      ) : null}

      {0 &&
      window.__.env.REACT_APP_HUB_VET_PORTAL &&
      window.__.env.REACT_APP_HUB_BREEDER_PORTAL ? (
        <div className="border-top pt-2">
          <div className="brandName">
            <FormattedMessage id="header.User.royalCaninPartner" />
          </div>
          <div className="breeder">
            <a href={window.__.env.REACT_APP_HUB_BREEDER_PORTAL}>
              <FormattedMessage id="header.User.breederPortal" />
            </a>
            <span>
              <FormattedMessage id="header.User.or" />
            </span>
            <a href={window.__.env.REACT_APP_HUB_VET_PORTAL}>
              <FormattedMessage id="header.User.vetPortal" />
            </a>
          </div>
        </div>
      ) : null}
      {/* "REACT_APP_HUB_B2B_LOGIN":"1",
"REACT_APP_HUB_B2B_BREEDER_PRO":"https://www.royalcanin.com/se/about-us/pro",
"REACT_APP_HUB_B2B_STORES_SPT":"https://webshop.royalcanin.com/se/sv/customer/account/login/",
"REACT_APP_HUB_B2B_VETERINARIANS_VET":"https://webshop.royalcanin.com/se/sv/customer/account/login/" */}
      {window.__.env.REACT_APP_HUB_B2B_LOGIN ? (
        <p className="user-entrepreneurs">
          <FormattedMessage id="header.User.entrepreneurs" />{' '}
        </p>
      ) : null}
      {window.__.env.REACT_APP_HUB_B2B_LOGIN &&
      window.__.env.REACT_APP_HUB_B2B_BREEDER_PRO &&
      window.__.env.REACT_APP_HUB_B2B_STORES_SPT &&
      window.__.env.REACT_APP_HUB_B2B_VETERINARIANS_VET ? (
        <div>
          <a
            className="b2b-login"
            href={window.__.env.REACT_APP_HUB_B2B_BREEDER_PRO}
          >
            <FormattedMessage id="header.User.breederPRO" />
            <span className="iconfont iconLogoff rc-text-colour--iconography" />
          </a>
          <a
            className="b2b-login"
            href={window.__.env.REACT_APP_HUB_B2B_STORES_SPT}
          >
            <FormattedMessage id="header.User.storesSPT" />
            <span className="iconfont iconLogoff rc-text-colour--iconography" />
          </a>
          <a
            className="b2b-login"
            href={window.__.env.REACT_APP_HUB_B2B_VETERINARIANS_VET}
          >
            <FormattedMessage id="header.User.veterinariansVET" />
            <span className="iconfont iconLogoff rc-text-colour--iconography" />
          </a>
        </div>
      ) : null}
    </div>
  );
};

export const LoginUserBox = ({ self, className }) => {
  const { personInformationRouter, petsRouter, subscriptionsRouter } =
    self.props;
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
        window.__.env.REACT_APP_COUNTRY == 'ru'
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
    },
    {
      href: window.__.env.LOYALTY_PROGRAMME_LINK,
      isShow: Boolean(window.__.env.LOYALTY_PROGRAMME_LINK),
      text: (
        <>
          <span className="iconfont iconLogoff icon-loyaltyProgramme" />{' '}
          <span>
            <FormattedMessage id="account.loyaltyProgramme" />
          </span>
        </>
      ),
      isOuterLink: true
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
              {item.isOuterLink ? (
                <a
                  className={`basicItem w-100`}
                  href={item.href}
                  target="_blank"
                >
                  {item.text}
                </a>
              ) : item.isHubOuterLink ? (
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
      {window.__.env.REACT_APP_HUB_MONROYALCANIN ? (
        <a
          className="basicItem"
          href={window.__.env.REACT_APP_HUB_MONROYALCANIN}
          style={{ borderTop: '1px solid #DEDEDE', paddingTop: '5px' }}
        >
          <span className="iconfont iconzhuanfa rc-text-colour--iconography" />
          <span>
            <FormattedMessage id="header.User.monRoyalCanin" />
          </span>
        </a>
      ) : null}
      {0 &&
      window.__.env.REACT_APP_HUB_VET_PORTAL &&
      window.__.env.REACT_APP_HUB_BREEDER_PORTAL ? (
        <div className="border-top pt-2">
          <div className="brandName">
            <FormattedMessage id="header.User.royalCaninPartner" />
          </div>
          <div className="breeder">
            <a href={window.__.env.REACT_APP_HUB_BREEDER_PORTAL}>
              <FormattedMessage id="header.User.breederPortal" />
            </a>
            <span>
              <FormattedMessage id="header.User.or" />
            </span>
            <a href={window.__.env.REACT_APP_HUB_VET_PORTAL}>
              <FormattedMessage id="header.User.vetPortal" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};
