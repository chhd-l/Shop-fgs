import React from "react";

export default class SideMenu extends React.Component {
  render () {
    const { type } = this.props
    return (
      <div class="my__account-navigation rc-column rc-padding-top--xs--desktop rc-padding-bottom--none">
        <h1 class="my__account-header rc-alpha">
          <a href="/ru/account" title="Personal Area" alt="Personal Area">
            Personal Area
          </a>
        </h1>
        <div>
          <h2 className={['nav_item', 'medium', type === 'Profile' ? 'active' : ''].join(' ')}>
            <a href="/ru/account/information" title="Profile" alt="Profile">
              Profile
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Pets' ? 'active' : ''].join(' ')}>
            <a href="/ru/account/pet-carnet" title="Pets" alt="Pets">
              Pets
          </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Orders' ? 'active' : ''].join(' ')}>
            <a href="/ru/account/orders" title="Orders" alt="Orders">
              Orders
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'FeedSubscription' ? 'active' : ''].join(' ')}>
            <a href="/ru/account/subscription" title="Feed subscription" alt="Feed subscription">
              Feed subscription
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'PaymentMethod' ? 'active' : ''].join(' ')}>
            <a href="/on/demandware.store/Sites-RU-Site/ru_RU/PaymentInstruments-List" title="Payment method" alt="Payment method">
              Payment method
            </a>
          </h2>
          <h2 className={['nav_item', 'medium', type === 'Help' ? 'active' : ''].join(' ')}>
            <a href="/ru/help/faq.html" title="Help" alt="Help">
              Help
            </a>
          </h2>
          <hr />
        </div>
      </div>
    )
  }
}