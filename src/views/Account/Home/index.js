import React from "react"
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';
import './index.css'

export default class AccountHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: localStorage.getItem("rc-userinfo") ? JSON.parse(localStorage.getItem("rc-userinfo")) : null
    }
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true); 
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  render () {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <h4><FormattedMessage id="welcome" /> {this.state.userInfo && this.state.userInfo.firstName}</h4>
                <p><FormattedMessage id="account.warmNotice" /></p>
                <div className="clearfix"></div>
                <div className="dashboard__profile-cards">
                  <div className="my__account-navigation row rc-padding-top--xs--desktop rc-padding-bottom--none">
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <Link to="/account/information">
                          <FormattedMessage id="account.profile">
                            {txt => (
                              <img
                                src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwdb6e2062/images/dashboard/My profile.jpg"
                                alt={txt}
                                title={txt} />
                            )}
                          </FormattedMessage>
                        </Link>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="account.profile">
                            {txt => (
                              <Link
                                to="/account/information"
                                title={txt}
                                alt={txt}>
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p><FormattedMessage id="account.profileTip" /></p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <Link to="/account/pets/petForm">
                          <FormattedMessage id="pets">
                            {txt => (
                              <img
                                src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwa1d75ed1/images/dashboard/My pet.jpg"
                                alt={txt}
                                title={txt} />
                            )}
                          </FormattedMessage>
                        </Link>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="pets">
                            {txt => (
                              <Link
                                to="/account/pets/petForm"
                                title={txt}
                                alt={txt}>
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p><FormattedMessage id="account.petsTip" /></p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <FormattedMessage id="orders">
                          {txt => (
                            <Link to="/account/orders" title={txt}>
                              <img
                                src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwb0f9538d/images/dashboard/My%20Order.jpg"
                                alt={txt} />
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="orders">
                            {txt => (
                              <Link to="/account/orders" title={txt} alt={txt}>
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p><FormattedMessage id="account.ordersTip" /></p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <FormattedMessage id="shippingAddress">
                          {txt => (
                            <Link
                              to="/account/shippingAddress"
                              title={txt}>
                              <img
                                src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dwf7c65124/images/dashboard/Payment.jpg"
                                alt={txt} />
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="shippingAddress">
                            {txt => (
                              <Link
                                to="/account/shippingAddress"
                                title={txt}
                                alt={txt}>
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p><FormattedMessage id="account.shippingAddressTip" /></p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <FormattedMessage id="help">
                          {txt => (
                            <Link to="/help" title={txt}>
                              <img
                                src="https://www.shop.royal-canin.ru/on/demandware.static/Sites-RU-Site/-/default/dweb723ffe/images/dashboard/Help.jpg"
                                alt={txt} />
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="help">
                            {txt => (
                              <Link
                                to="/help"
                                title={txt}
                                target="_blank"
                                alt={txt}>
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p><FormattedMessage id="account.helpTip" /></p>
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