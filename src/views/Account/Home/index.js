import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { setSeoConfig } from '@/utils/utils';
import { myAccountPushEvent } from '@/utils/GA';
import accountSLogo from '@/assets/images/account_s_logo.png';
import ApplePayImg from '@/assets/images/ApplePay.png';
import GooglePayImg from '@/assets/images/GooglePay.png';
import './index.less';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href;

const itemList = [
  {
    icon: (
      <svg
        className="svg-icon account-home-icon"
        aria-hidden="true"
        style={{ width: '2.6rem' }}
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
        style={{ width: '2.6rem' }}
      >
        <use xlinkHref="#iconMypets" />
      </svg>
    ),
    titleLangKey: 'account.petsTitle',
    textLangKey: 'account.petsTip',
    link: '/account/pets/'
  },
  {
    icon: (
      <svg
        className="svg-icon account-home-icon"
        aria-hidden="true"
        style={{ width: '2.6rem' }}
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
        style={{ width: '2.6rem' }}
      >
        <use xlinkHref="#iconMySubsciptions1" />
      </svg>
    ),
    titleLangKey: 'account.subscriptionTitle',
    textLangKey: 'account.subscriptionTip',
    link: '/account/subscription'
  }
  // 暂时注释，因为faq页面还没做好，需要隐藏
  // {
  //   icon: (
  //     <svg
  //       className="svg-icon account-home-icon"
  //       aria-hidden="true"
  //       style={{ width: '2.6rem' }}
  //     >
  //       <use xlinkHref="#iconFAQ" />
  //     </svg>
  //   ),
  //   titleLangKey: 'account.faqTitle',
  //   textLangKey: 'account.faqTip',
  //   link: '/faq',
  //   href: '/about-us/faqs',
  //   isHubOuterLink: true
  // }
];

function Container({ className, item, children }) {
  return item.isHubOuterLink ? (
    <DistributeHubLinkOrATag
      className={className}
      to={item.link}
      href={item.href}
    >
      {children}
    </DistributeHubLinkOrATag>
  ) : (
    <Link to={item.link} className={className}>
      {children}
    </Link>
  );
}

@inject('loginStore', 'configStore')
@observer
class AccountHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      }
    };
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  componentDidMount() {
    myAccountPushEvent('Overview');

    setSeoConfig({
      pageName: 'Account index'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });
  }

  render() {
    const event = {
      page: {
        type: 'Account',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
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
              <SideMenu type="Home" customCls="order-1 order-md-0 rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop order-0 order-md-0">
                <p className="mb-0">
                  <FormattedMessage
                    id="account.warmNotice"
                    values={{
                      val: this.userInfo && this.userInfo.firstName,
                      br: <br />
                    }}
                  />
                </p>
                <div className="clearfix" />
                <div className="dashboard__profile-cards">
                  <div className="my__account-navigation row rc-padding-top--xs--desktop rc-padding-bottom--none">
                    {itemList.map((item, i) => (
                      <Container
                        className="col-12 col-md-4 mb-3 my__account_padding05"
                        item={item}
                        key={i}
                      >
                        <div className="d-flex margin-left0 align-items-center border w-100 h-100 m-2 p-3 text-break nav_content">
                          <div>{item.icon}</div>
                          <div className="ml-3">
                            <h3 className="rc-delta profileTextColor mb-1">
                              <strong>
                                <FormattedMessage id={item.titleLangKey} />
                              </strong>
                            </h3>
                            <p>
                              <FormattedMessage id={item.textLangKey} />
                            </p>
                          </div>
                        </div>
                      </Container>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {process.env.REACT_APP_GOOGLEPLAY_APP_LINK &&
          process.env.REACT_APP_APP_STORE_LINK ? (
            <div className="accountHomeFooterLink">
              <h2>
                <img src={accountSLogo} />
              </h2>
              <p className="brandName">Royal Canin & Moi</p>
              <p className="content">
                L'application qui vous accompagne tout <br /> au long de la vie
                de votre compagnon{' '}
              </p>
              <div className="payBtn">
                <a href={process.env.REACT_APP_GOOGLEPLAY_APP_LINK}>
                  <img src={GooglePayImg} />
                </a>
                <a href={process.env.REACT_APP_APP_STORE_LINK}>
                  <img src={ApplePayImg} />
                </a>
              </div>
            </div>
          ) : null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default AccountHome;
