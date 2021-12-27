import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import './index.css';

let menuList = [
  {
    catogery: 'Home',
    isShow: true,
    icon: <span className="iconfont">&#xe697;</span>,
    langKey: 'home',
    url: '/account'
  },
  {
    catogery: 'Profile',
    isShow: true,
    icon: <span className="iconfont">&#xe69c;</span>,
    langKey: 'account.profile',
    url: '/account/information'
  },
  {
    catogery: 'Pets',
    isShow: true,
    icon: <span className="iconfont text-lg -ml-0.5">&#xe69a;</span>,
    langKey: 'account.pets',
    url: '/account/pets'
  },
  {
    catogery: 'Appointments',
    isShow:
      window.__.env.REACT_APP_GA_ENV !== 'prd' &&
      window.__.env.REACT_APP_COUNTRY === 'fr',
    icon: <span className="iconfont icontime" />,
    langKey: 'account.appointment',
    url: '/account/appointments'
  },
  {
    catogery: 'Orders',
    isShow: true,
    icon: <span className="iconfont">&#xe699;</span>,
    langKey: 'account.ordersTitle',
    url: '/account/orders'
  },
  {
    catogery: 'Subscription',
    isShow: true,
    icon: <span className="iconfont">&#xe6a2;</span>,
    langKey: 'account.subscriptionTitle',
    url: '/account/subscription'
  },
  {
    catogery: 'Faq',
    isShow: true,
    icon: <span className="iconfont">&#xe696;</span>,
    langKey: 'footer.FAQ',
    url: '/faq',
    href:
      window.__.env.REACT_APP_COUNTRY === 'ru'
        ? '/about-us/faq'
        : '/about-us/faqs',
    isHubOuterLink: true
  }
  // {
  //   catogery: 'Faq',
  //   icon: <span className="iconfont iconzhuanfa"></span>,
  //   langKey: 'account.monRoyalCanin',
  //   url: '/faq'
  // },
  // {
  //   catogery: 'ShippingAddress',
  //   icon: <span className="rc-icon rc-cart--xs rc-iconography" />,
  //   langKey: 'shippingAddress',
  //   url: '/account/shippingAddress'
  // },
  // {
  //   catogery: 'PaymentMethod',
  //   icon: <span className="rc-icon rc-cart--xs rc-iconography" />,
  //   langKey: 'paymentMethod',
  //   url: '/account/paymentMethod'
  // }
];
class SideMenu extends React.Component {
  static defaultProps = {
    customCls: ''
  };
  componentDidMount() {
    if (window.__.env.LOYALTY_PROGRAMME_LINK) {
      menuList.push({
        catogery: 'loyaltyProgramme',
        isShow: Boolean(window.__.env.LOYALTY_PROGRAMME_LINK),
        icon: <span className="iconfont iconLogoff icon-loyaltyProgramme" />,
        langKey: 'account.loyaltyProgramme',
        href: window.__.env.LOYALTY_PROGRAMME_LINK,
        isOuterLink: true
      });
    }
  }
  render() {
    const { type } = this.props;
    return (
      <div
        className={`my__account-navigation rc-column rc-padding-top--xs--desktop rc-padding-bottom--none ${this.props.customCls}`}
      >
        {/* 俄罗斯隐藏掉 Faq */}
        {menuList.map((item, i) => (
          <h2
            key={i}
            className={`nav_item medium ui-cursor-pointer mb-4 ${
              type === item.catogery ? 'active red' : ''
            } ${item.isShow ? '' : 'hidden'}
            `}
          >
            <FormattedMessage id={item.langKey}>
              {(txt) => (
                <>
                  {item.icon}
                  <span className="ml-2">
                    {item.isOuterLink ? (
                      <a href={item.href} target="_blank">
                        {txt}
                      </a>
                    ) : item.isHubOuterLink ? (
                      <DistributeHubLinkOrATag to={item.url} href={item.href}>
                        {txt}
                      </DistributeHubLinkOrATag>
                    ) : (
                      <Link to={item.url} title={txt} alt={txt}>
                        {txt}
                      </Link>
                    )}
                  </span>
                </>
              )}
            </FormattedMessage>
          </h2>
        ))}
        {window.__.env.REACT_APP_HUB_MONROYALCANIN ? (
          <h2
            style={{ borderTop: '1px solid #E9E9E9' }}
            className={`nav_item medium ui-cursor-pointer mb-4 pt-4`}
          >
            <FormattedMessage id="account.monRoyalCanin">
              {(txt) => (
                <>
                  <span className="iconfont iconzhuanfa" />
                  <a
                    href={window.__.env.REACT_APP_HUB_MONROYALCANIN}
                    title={txt}
                    alt={txt}
                    className="ml-2"
                  >
                    {txt}
                  </a>
                </>
              )}
            </FormattedMessage>
          </h2>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default SideMenu;
