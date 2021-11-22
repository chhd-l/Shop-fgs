import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';

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
    icon: (
      <span
        className="iconfont"
        style={{ fontSize: '1.1rem', marginLeft: '-.1rem' }}
      >
        &#xe69a;
      </span>
    ),
    langKey: 'account.pets',
    url: '/account/pets'
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
      window.__.env.REACT_APP_COUNTRY == 'ru'
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
        icon: <span className="iconfont iconLogoff" />,
        langKey: 'account.loyaltyProgramme',
        href: window.__.env.LOYALTY_PROGRAMME_LINK,
        isHubOuterLink: true
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
                  {item.isHubOuterLink ? (
                    <DistributeHubLinkOrATag
                      to={item.url}
                      href={item.href}
                      className="ml-2"
                    >
                      {txt}
                    </DistributeHubLinkOrATag>
                  ) : (
                    <Link to={item.url} title={txt} alt={txt} className="ml-2">
                      {txt}
                    </Link>
                  )}
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
