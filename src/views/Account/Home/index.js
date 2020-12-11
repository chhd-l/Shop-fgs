import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { setSeoConfig } from '@/utils/utils';
import './index.less';

const itemList = [
  {
    icon: (
      <svg
        className="svg-icon account-home-icon"
        aria-hidden="true"
        style={{ width: '2.3rem', height: '2.3rem' }}
      >
        <use xlinkHref="#iconMyinformation" />
      </svg>
    ),
    titleLangKey: 'account.profile',
    textLangKey: 'account.profileTip',
    link: '/account/information'
  },
  {
    icon: (
      <svg
        className="svg-icon account-home-icon"
        aria-hidden="true"
        style={{ width: '3.2rem', height: '3.2rem' }}
      >
        <use xlinkHref="#iconMypets" />
      </svg>
    ),
    titleLangKey: 'account.petsTitle',
    textLangKey: 'account.petsTip',
    link: '/account/pets/petForm'
  },
  {
    icon: (
      <svg
        className="svg-icon account-home-icon"
        aria-hidden="true"
        style={{ width: '5rem', height: '5rem' }}
      >
        <use xlinkHref="#iconMyorders1" />
      </svg>
    ),
    titleLangKey: 'account.ordersTitle',
    textLangKey: 'account.ordersTip',
    link: '/account/orders'
  },
  {
    icon: (
      <svg
        className="svg-icon account-home-icon"
        aria-hidden="true"
        style={{ width: '2.8em', height: '2.8em' }}
      >
        <use xlinkHref="#iconMySubsciptions1" />
      </svg>
    ),
    titleLangKey: 'account.subscriptionTitle',
    textLangKey: 'account.subscriptionTip',
    link: '/account/subscription'
  },
  {
    icon: (
      <svg
        className="svg-icon account-home-icon"
        aria-hidden="true"
        style={{ width: '5rem', height: '5rem' }}
      >
        <use xlinkHref="#iconFAQ" />
      </svg>
    ),
    titleLangKey: 'account.faqTitle',
    textLangKey: 'account.faqTip',
    link: '/faq/all'
  }
];

@inject('loginStore', 'configStore')
@observer
class AccountHome extends React.Component {
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  componentDidMount() {
    setSeoConfig({
      pageName: 'Account index'
    });
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
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl pt-2">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Home" customCls="order-1 order-md-0" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop order-0 order-md-0">
                <p className="mb-0">
                  <FormattedMessage
                    id="account.warmNotice"
                    values={{ val: this.userInfo && this.userInfo.firstName }}
                  />
                </p>
                <div className="clearfix" />
                <div className="dashboard__profile-cards rc-md-up">
                  <div className="my__account-navigation row rc-padding-top--xs--desktop rc-padding-bottom--none">
                    {itemList.map((item, i) => (
                      <Link
                        key={i}
                        className="col-12 col-md-4 mb-3"
                        to={item.link}
                      >
                        <div className="d-flex align-items-center border m-2 w-100 h-100 p-3 text-break nav_content">
                          {item.icon}
                          <div className="ml-3">
                            <h3 className="rc-delta profileTextColor mb-1">
                              <b>
                                <FormattedMessage id={item.titleLangKey} />
                              </b>
                            </h3>
                            <p>
                              <FormattedMessage id={item.textLangKey} />
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
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
