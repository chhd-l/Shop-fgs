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
    langKey: 'pets',
    url: '/account/pets'
  },
  {
    catogery: 'Orders',
    icon: <span className="iconfont">&#xe699;</span>,
    langKey: 'orders',
    url: '/account/orders'
  },
  {
    catogery: 'Subscription',
    icon: <span className="iconfont">&#xe6a2;</span>,
    langKey: 'subscription',
    url: '/account/subscription'
  },
  {
    catogery: 'Faq',
    icon: <span className="iconfont">&#xe696;</span>,
    langKey: 'footer.FAQ',
    url: '/FAQ/all'
  },
  {
    catogery: 'ShippingAddress',
    icon: <span className="rc-icon rc-cart--xs rc-iconography" />,
    langKey: 'shippingAddress',
    url: '/account/shippingAddress'
  },
  {
    catogery: 'PaymentMethod',
    icon: <span className="rc-icon rc-cart--xs rc-iconography" />,
    langKey: 'paymentMethod',
    url: '/account/paymentMethod'
  }
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
            className={`nav_item medium ui-cursor-pointer ${
              type === item.catogery ? 'active red' : ''
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
      </div>
    );
  }
}

export default SideMenu;
