import React from "react";
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

export default class SideMenu extends React.Component {
  render () {
    const { type } = this.props
    return (
      <div className="my__account-navigation rc-column rc-padding-top--xs--desktop rc-padding-bottom--none">
        <h1 className="my__account-header rc-alpha">
          <FormattedMessage id="account.personalArea">
            {txt => (
              <Link
                to="/account"
                title={txt}
                alt={txt}>
                {txt}
              </Link>
            )}
          </FormattedMessage>
        </h1>
        <div>
          <h2 className={['nav_item', 'medium', type === 'Profile' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="account.profile">
              {txt => (
                <Link
                  to="/account/information"
                  title={txt}
                  alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Pets' ? 'active' : ''].join(' ')}>
            <Link
              to="/account/pets"
              title={<FormattedMessage id="pets" />}
              alt={<FormattedMessage id="pets" />}>
              <FormattedMessage id="pets" />
            </Link>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Orders' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="orders">
              {txt => (
                <Link to="/account/orders" title={txt} alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Refunds' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="order.refunds">
              {txt => (
                <Link to="/account/refunds" title={txt} alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'ShippingAddress' ? 'active' : ''].join(' ')}>
            <Link
              to="/account/shippingAddress"
              title={<FormattedMessage id="shippingAddress" />}
              alt={<FormattedMessage id="shippingAddress" />}>
              <FormattedMessage id="shippingAddress" />
            </Link>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Help' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="help">
              {txt => (
                <Link to="/help" title={txt} alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2>
          <hr />
        </div>
      </div>
    )
  }
}