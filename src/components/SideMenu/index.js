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
            <FormattedMessage id="pets">
              {txt => (
                <Link
                  to="/account/pets"
                  title={txt}
                  alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Subscription' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="subscription">
              {txt => (
                <Link
                  to="/account/subscription"
                  title={txt}
                  alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
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
          {/* <h2 className={['nav_item', 'medium', type === 'ReturnOrder' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="order.returnOrder">
              {txt => (
                <Link to="/account/return-order" title={txt} alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2> */}
          <h2 className={['nav_item', 'medium', type === 'ShippingAddress' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="shippingAddress">
              {txt => (
                <Link
                  to="/account/shippingAddress"
                  title={txt}
                  alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'PaymentMethod' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="paymentMethod">
              {txt => (
                <Link
                  to="/account/paymentMethod"
                  title={txt}
                  alt={txt}>
                  {txt}
                </Link>
              )}
            </FormattedMessage>
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
