import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import helpImg from '@/assets/images/profile/Help.jpg';
import myOrderImg from '@/assets/images/profile/My Order.jpg';
import myPetImg from '@/assets/images/profile/My pet.jpg';
import myProfileImg from '@/assets/images/profile/My profile.jpg';
import paymentImg from '@/assets/images/profile/Payment.jpg';
import subscriptionImg from '@/assets/images/profile/Subscription.jpg';
import addressImg from '@/assets/images/profile/Address.png';
import './index.css';

@inject('loginStore', 'configStore')
@observer
class AccountHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  render() {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <h4>
                  <FormattedMessage id="welcome" />{' '}
                  {this.userInfo && this.userInfo.firstName}
                </h4>
                <p>
                  <FormattedMessage id="account.warmNotice" />
                </p>
                <div className="clearfix"></div>
                <div className="dashboard__profile-cards">
                  <div className="my__account-navigation row rc-padding-top--xs--desktop rc-padding-bottom--none">
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <Link to="/account/information">
                          <FormattedMessage id="account.profile">
                            {(txt) => (
                              <img src={myProfileImg} alt={txt} title={txt} />
                            )}
                          </FormattedMessage>
                        </Link>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="account.profile">
                            {(txt) => (
                              <Link
                                to="/account/information"
                                title={txt}
                                alt={txt}
                              >
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p>
                          <FormattedMessage id="account.profileTip" />
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <Link to="/account/pets/petForm">
                          <FormattedMessage id="pets">
                            {(txt) => (
                              <img src={myPetImg} alt={txt} title={txt} />
                            )}
                          </FormattedMessage>
                        </Link>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="pets">
                            {(txt) => (
                              <Link
                                to="/account/pets/petForm"
                                title={txt}
                                alt={txt}
                              >
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p>
                          <FormattedMessage id="account.petsTip" />
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <Link to="/account/subscription">
                          <FormattedMessage id="subscription">
                            {(txt) => (
                              <img
                                src={subscriptionImg}
                                alt={txt}
                                title={txt}
                              />
                            )}
                          </FormattedMessage>
                        </Link>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="subscription">
                            {(txt) => (
                              <Link
                                to="/account/subscription"
                                title={txt}
                                alt={txt}
                              >
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p>
                          <FormattedMessage id="account.subscriptionTip" />
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <FormattedMessage id="orders">
                          {(txt) => (
                            <Link to="/account/orders" title={txt}>
                              <img src={myOrderImg} alt={txt} />
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="orders">
                            {(txt) => (
                              <Link to="/account/orders" title={txt} alt={txt}>
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p>
                          <FormattedMessage id="account.ordersTip" />
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <FormattedMessage id="shippingAddress">
                          {(txt) => (
                            <Link to="/account/shippingAddress" title={txt}>
                              <img src={addressImg} alt={txt} />
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="shippingAddress">
                            {(txt) => (
                              <Link
                                to="/account/shippingAddress"
                                title={txt}
                                alt={txt}
                              >
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p>
                          <FormattedMessage id="account.shippingAddressTip" />
                        </p>
                      </div>
                    </div>
                    {this.props.configStore.profilePaymentMethod && (
                      <div className="col-12 col-md-4">
                        <div className="profileDashboardImage">
                          <FormattedMessage id="shippingAddress">
                            {(txt) => (
                              <Link to="/account/paymentMethod" title={txt}>
                                <img src={paymentImg} alt={txt} />
                              </Link>
                            )}
                          </FormattedMessage>
                        </div>
                        <div>
                          <h3 className="rc-delta profileTextColor">
                            <FormattedMessage id="paymentMethod">
                              {(txt) => (
                                <Link
                                  to="/account/paymentMethod"
                                  title={txt}
                                  alt={txt}
                                >
                                  <b>{txt}</b>
                                </Link>
                              )}
                            </FormattedMessage>
                          </h3>
                          <p>
                            <FormattedMessage id="account.paymentMethodTip" />
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="col-12 col-md-4">
                      <div className="profileDashboardImage">
                        <FormattedMessage id="help">
                          {(txt) => (
                            <Link to="/help" title={txt}>
                              <img src={helpImg} alt={txt} />
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div>
                        <h3 className="rc-delta profileTextColor">
                          <FormattedMessage id="help">
                            {(txt) => (
                              <Link
                                to="/help"
                                title={txt}
                                target="_blank"
                                alt={txt}
                              >
                                <b>{txt}</b>
                              </Link>
                            )}
                          </FormattedMessage>
                        </h3>
                        <p>
                          <FormattedMessage id="account.helpTip" />
                        </p>
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
    );
  }
}

export default AccountHome;
