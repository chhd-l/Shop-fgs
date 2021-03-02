import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const menuList = [
  {
    catogery: 'Home',
    icon: <span className="iconfont">&#xe697;</span>,
    langKey: 'home',
    url: '/account'
  },
  {
    catogery: 'Profile',

    icon: <span className="iconfont">&#xe69c;</span>,
    langKey: 'account.profile',
    url: '/account/information'
  },
  {
    catogery: 'Pets',
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
    icon: <span className="iconfont">&#xe699;</span>,
    langKey: 'account.ordersTitle',
    url: '/account/orders'
  },
  {
    catogery: 'Subscription',
    icon: <span className="iconfont">&#xe6a2;</span>,
    langKey: 'account.subscriptionTitle',
    url: '/account/subscription'
  },
  {
    catogery: 'Faq',
    icon: <span className="iconfont">&#xe696;</span>,
    langKey: 'footer.FAQ',
    url: '/faq'
  },
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
  render() {
    const { type } = this.props;
    return (
      <div
        className={`my__account-navigation rc-column rc-padding-top--xs--desktop rc-padding-bottom--none ${this.props.customCls}`}
      >
        {menuList.map((item, i) => (
          <h2
            key={i}
            className={`nav_item medium ui-cursor-pointer mb-4 ${type === item.catogery ? 'active red' : ''
              }`}
          >
            <FormattedMessage id={item.langKey}>
              {(txt) => (
                <>
                  {item.icon}
                  <Link to={item.url} title={txt} alt={txt} className="ml-2">
                    {txt}
                  </Link>
                </>
              )}
            </FormattedMessage>
          </h2>
        ))}
        {
          process.env.REACT_APP_HUB ? (<h2
            style={{ borderTop: "1px solid #E9E9E9" }}
            className={`nav_item medium ui-cursor-pointer mb-4 pt-4`}
          >
            <FormattedMessage id="account.monRoyalCanin">
              {(txt) => (
                <>
                  <span className="iconfont iconzhuanfa"></span>
                  <a href="https://mon.royalcanin.fr/connexion/?_ga=2.78648916.173298844.1614564472-578005368.1614332396" title={txt} alt={txt} className="ml-2">
                    {txt}
                  </a>
                </>
              )}
            </FormattedMessage>
          </h2>) : <></>
        }
      </div>
    );
  }
}

export default SideMenu;
