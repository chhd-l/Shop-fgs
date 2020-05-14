import React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
// import './index.css'

export default class AccountHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
  }
  render () {
    return (
      <div>
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main class="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div class="rc-padding--sm rc-max-width--xl">
            <div class="rc-layout-container rc-five-column">
              <SideMenu />
              <div class="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <h4>Welcome Ken</h4>
                <p>Here you can manage your profile, edit pet information, check status on orders and subscriptions.</p>
                <div class="clearfix"></div>
                <div class="dashboard__profile-cards">
                  <div class="my__account-navigation row rc-padding-top--xs--desktop rc-padding-bottom--none">
                    <div class="col-12 col-md-4">
                      <div class="profileDashboardImage">
                        <a href="/ru/account/information">
                          <img src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwdb6e2062/images/dashboard/My profile.jpg" alt="Profile" title="Profile" />
                        </a>
                      </div>
                      <div>
                        <h3 class="rc-delta profileTextColor">
                          <a href="/ru/account/information" title="Profile" alt="Profile">
                            <b>Profile</b>
                          </a>
                        </h3>
                        <p>View and edit your personal information.</p>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="profileDashboardImage">
                        <a href="/ru/account/pet-carnet">
                          <img src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwa1d75ed1/images/dashboard/My pet.jpg" alt="Pets" title="Pets" />
                        </a>
                      </div>
                      <div>
                        <h3 class="rc-delta profileTextColor">
                          <a href="/ru/account/pet-carnet" title="Pets" alt="Pets">
                            <b>Pets</b>
                          </a>
                        </h3>
                        <p>Create and manage your pet profiles.</p>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="profileDashboardImage">
                        <a href="/ru/account/orders" title="Orders">
                          <img src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwb0f9538d/images/dashboard/My%20Order.jpg" alt="Orders" />
                        </a>
                      </div>
                      <div>
                        <h3 class="rc-delta profileTextColor">
                          <a href="/ru/account/orders" title="Orders" alt="Orders">
                            <b>Orders</b>
                          </a>
                        </h3>
                        <p>Check the status of current orders and see the history of previous ones.</p>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="profileDashboardImage">
                        <a href="/ru/account/subscription" title="Feed subscription">
                          <img src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dw6082c6cd/images/dashboard/Autoship.jpg" alt="Feed subscription" />
                        </a>
                      </div>
                      <div>
                        <h3 class="rc-delta profileTextColor">
                          <a href="/ru/account/subscription" title="Feed subscription" alt="Feed subscription">
                            <b>Feed subscription</b>
                          </a>
                        </h3>
                        <p>View and change your Subscription settings.</p>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="profileDashboardImage">
                        <a href="/on/demandware.store/Sites-RU-Site/ru_RU/PaymentInstruments-List" title="Payment method">
                          <img src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwf7c65124/images/dashboard/Payment.jpg" alt="Payment method" />
                        </a>
                      </div>
                      <div>
                        <h3 class="rc-delta profileTextColor">
                          <a href="/on/demandware.store/Sites-RU-Site/ru_RU/PaymentInstruments-List" title="Payment method" alt="Payment method">
                            <b>Payment method</b>
                          </a>
                        </h3>
                        <p>View and update payment information</p>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="profileDashboardImage">
                        <a href="/ru/help/faq.html" title="Help">
                          <img src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dweb723ffe/images/dashboard/Help.jpg" alt="Help" />
                        </a>
                      </div>
                      <div>
                        <h3 class="rc-delta profileTextColor">
                          <a href="/ru/help/faq.html" title="Help" alt="Help">
                            <b>Help</b>
                          </a>
                        </h3>
                        <p>If you have questions, we are always ready to help you and your pet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}