import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { FormattedMessage } from 'react-intl';
import '../css/user.less';

const localItemRoyal = window.__.localItemRoyal;
const userInfo = localItemRoyal.get('rc-userinfo') || null;

export const UnLoginUserBox = (props) => {
  const { self, history } = props;
  const { reimbursementsRouter } = self.props;
  return (
    <div className={`user-unLogin-popover`}>
      <div className="already">
        <FormattedMessage id="header.User.alreadyRegistered" />
      </div>
      <LoginButton
        btnStyle={{ width: '14rem', margin: '.5rem 0', padding: '5px 0' }}
        history={history}
      />
      <div className="newUser">
        <FormattedMessage id="header.User.newUser" />
        <Link className="medium pl-1" to="/register">
          <FormattedMessage id="header.User.registerNow" />
        </Link>
      </div>
      <div
        className="Offers pt-2 pb-2"
        onClick={() => {
          self.toUrl(reimbursementsRouter);
        }}
      >
        <span className="iconfont">&#xe60b;</span>{' '}
        <span>
          <FormattedMessage id="header.User.offersAndreimbursements" />
        </span>
      </div>

      {process.env.REACT_APP_HUB_VET_PORTAL &&
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

export const LoginUserBox = (props) => {
  const { self } = props;
  const {
    homeRouter,
    personInformationRouter,
    petsRouter,
    subscriptionsRouter,
    offersRouter,
    faqRouter,
    monRoyalCaninRouter
  } = self.props;
  const menuList = [
    {
      link: '/account',
      text: (
        <>
          <span className="iconfont">&#xe697;</span>{' '}
          <span>
            <FormattedMessage id="header.User.home" />
          </span>
        </>
      )
    },
    {
      link: personInformationRouter,
      text: (
        <>
          <span className="iconfont">&#xe69c;</span>{' '}
          <span>
            <FormattedMessage id="header.User.myPersonalInformation" />
          </span>
        </>
      )
    },
    {
      link: petsRouter,
      text: (
        <>
          <span className="iconfont">&#xe69a;</span>{' '}
          <span>
            <FormattedMessage id="header.User.pets" />
          </span>
        </>
      )
    },
    {
      link: '/account/orders',
      text: (
        <>
          <span className="iconfont">&#xe699;</span>{' '}
          <span>
            <FormattedMessage id="header.User.myOrders" />
          </span>
        </>
      )
    },
    {
      link: subscriptionsRouter,
      text: (
        <>
          <span className="iconfont">&#xe6a2;</span>{' '}
          <span>
            <FormattedMessage id="header.User.mySubscriptions" />
          </span>
        </>
      )
    },
    {
      link: '/faq',
      text: (
        <>
          <span className="iconfont">&#xe696;</span>{' '}
          <span>
            <FormattedMessage id="header.User.faq" />
          </span>
        </>
      )
    }
  ];
  return (
    <div className={`user-login-popover`}>
      <div className="Media">
        <div className="Media-figure">
          {userInfo && userInfo.firstName && userInfo.firstName.slice(0, 1)}
        </div>
        <div className="Media-body">
          <div className="fullName">
            {userInfo && [userInfo.firstName, userInfo.lastName].join(' ')}
          </div>
          <LogoutButton containerStyle={{ background: '#fff' }} />
        </div>
      </div>
      {menuList.map((item, i) => (
        <Link
          key={i}
          className="basicItem w-100"
          to={item.link}
          style={{ display: 'block' }}
        >
          {item.text}
        </Link>
      ))}
      <div
        className="basicItem"
        onClick={() => {
          self.toUrl(monRoyalCaninRouter);
        }}
        style={{ borderTop: '1px solid #DEDEDE', paddingTop: '5px' }}
      >
        <span className="iconfont iconzhuanfa" />
        <span>
          <FormattedMessage id="header.User.monRoyalCanin" />
        </span>
      </div>
    </div>
  );
};
