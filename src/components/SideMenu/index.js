import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const menuList = [
  {
    catogery: 'Home',
    icon: <span className="rc-icon rc-grid-view--xs rc-iconography" />,
    langKey: 'home',
    url: '/account'
  },
  {
    catogery: 'Profile',
    icon: <span className="rc-icon rc-user--xs rc-iconography" />,
    langKey: 'account.profile',
    url: '/account/information'
  },
  {
    catogery: 'Pets',
    icon: <span className="rc-icon rc-user--xs rc-iconography" />,
    langKey: 'pets',
    url: '/account/pets'
  },
  {
    catogery: 'Orders',
    icon: <span className="rc-icon rc-cart--xs rc-iconography" />,
    langKey: 'orders',
    url: '/account/orders'
  },
  {
    catogery: 'Subscription',
    icon: <span className="rc-icon rc-cart--xs rc-iconography" />,
    langKey: 'subscription',
    url: '/account/subscription'
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
  },
  {
    catogery: 'Faq',
    icon: <span className="rc-icon rc-cart--xs rc-iconography" />,
    langKey: 'footer.FAQ',
    url: '/FAQ/all'
  }
];

class SideMenu extends React.Component {
  render() {
    const { type } = this.props;
    return (
      <div className="my__account-navigation rc-column rc-padding-top--xs--desktop rc-padding-bottom--none">
        {menuList.map((item, i) => (
          <h2
            key={i}
            className={`nav_item medium ${
              type === item.catogery ? 'active' : ''
            }`}
          >
            {item.icon}
            <FormattedMessage id={item.langKey}>
              {(txt) => (
                <Link to={item.url} title={txt} alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2>
        ))}
      </div>
    );
  }
}

export default SideMenu;
