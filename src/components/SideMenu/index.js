import React from "react";
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

export default class SideMenu extends React.Component {
  render () {
    const { type } = this.props
    return (
      <div class="my__account-navigation rc-column rc-padding-top--xs--desktop rc-padding-bottom--none">
        <h1 class="my__account-header rc-alpha">
          <Link
            to="/account"
            title={<FormattedMessage id="account.personalArea" />}
            alt={<FormattedMessage id="account.personalArea" />}>
            <FormattedMessage id="account.personalArea" />
          </Link>
        </h1>
        <div>
          <h2 className={['nav_item', 'medium', type === 'Profile' ? 'active' : ''].join(' ')}>
            <Link
              to="/account/information"
              title={<FormattedMessage id="account.profile" />}
              alt={<FormattedMessage id="account.profile" />}>
              <FormattedMessage id="account.profile" />
            </Link>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Pets' ? 'active' : ''].join(' ')}>
            <a
              href="/ru/account/pet-carnet"
              title={<FormattedMessage id="pets" />}
              alt={<FormattedMessage id="pets" />}>
              <FormattedMessage id="pets" />
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Orders' ? 'active' : ''].join(' ')}>
            <a
              href="/ru/account/orders"
              title={<FormattedMessage id="orders" />}
              alt={<FormattedMessage id="orders" />}>
              <FormattedMessage id="orders" />
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'FeedSubscription' ? 'active' : ''].join(' ')}>
            <a
              href="/ru/account/subscription"
              title={<FormattedMessage id="account.feedSubscription" />}
              alt={<FormattedMessage id="account.feedSubscription" />}>
              <FormattedMessage id="account.feedSubscription" />
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'PaymentMethod' ? 'active' : ''].join(' ')}>
            <a
              href="/on/demandware.store/Sites-RU-Site/ru_RU/PaymentInstruments-List"
              title={<FormattedMessage id="account.paymentMethod" />}
              alt={<FormattedMessage id="account.paymentMethod" />}>
              <FormattedMessage id="account.paymentMethod" />
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Help' ? 'active' : ''].join(' ')}>
            <Link
              to="/help"
              title={<FormattedMessage id="help" />}
              alt={<FormattedMessage id="help" />}>
              <FormattedMessage id="help" />
            </Link>
          </h2>
          <hr />
        </div>
      </div>
    )
  }
}