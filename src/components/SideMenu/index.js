import React from "react";
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

export default class SideMenu extends React.Component {
  render () {
    const { type } = this.props
    return (
      <div class="my__account-navigation rc-column rc-padding-top--xs--desktop rc-padding-bottom--none">
        <h1 class="my__account-header rc-alpha">
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
                <a
                  href="/ru/account/pet-carnet"
                  title={txt}
                  alt={txt}>
                  {txt}
                </a>
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
          <h2 className={['nav_item', 'medium', type === 'FeedSubscription' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="account.feedSubscription">
              {txt => (
                <a href="/ru/account/subscription" title={txt} alt={txt}>
                  {txt}
                </a>
              )}
            </FormattedMessage>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'PaymentMethod' ? 'active' : ''].join(' ')}>
            <FormattedMessage id="account.paymentMethod">
              {txt => (
                <a href="/on/demandware.store/Sites-RU-Site/ru_RU/PaymentInstruments-List" title={txt} alt={txt}>
                  {txt}
                </a>
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