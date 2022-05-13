import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { myAccountPushEvent } from '@/utils/GA';
import accountSLogo from '@/assets/images/account_s_logo.png';
import ApplePayImg from '@/assets/images/ApplePay.png';
import GooglePayImg from '@/assets/images/GooglePay.png';
import './index.less';
import { itemList } from './config';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

function Container({ className, item, children }) {
  return item.isOuter ? (
    <a className={className} href={item.href} target="_blank">
      {children}
    </a>
  ) : item.isHubOuterLink ? (
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
@seoHoc('Account index')
@observer
class AccountHome extends React.Component {
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  componentDidMount() {
    myAccountPushEvent('Overview');
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
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl pt-2">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Home" customCls="order-0 rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop order-0">
                <p className="mb-0">
                  {window.__.env.REACT_APP_COUNTRY !== 'uk' ? (
                    <FormattedMessage
                      id="account.warmNotice"
                      values={{
                        val: this.userInfo && this.userInfo.firstName,
                        br: <br />
                      }}
                    />
                  ) : null}
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
                        <div className="d-flex margin-left0 align-items-center border w-100 h-100 m-2 px-3 py-12 text-break nav_content position-relative">
                          <div
                            style={{
                              top: '2%',
                              right: '2%',
                              position: 'absolute'
                            }}
                          >
                            {item.rightTopIcon}
                          </div>
                          {item.iconSrc ? (
                            <img
                              className="account-home-icon inline-block"
                              src={item.iconSrc}
                              alt={item.titleLangKey}
                            />
                          ) : (
                            item.icon
                          )}
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
          {window.__.env.REACT_APP_GOOGLEPLAY_APP_LINK &&
          window.__.env.REACT_APP_APP_STORE_LINK ? (
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
                <a href={window.__.env.REACT_APP_GOOGLEPLAY_APP_LINK}>
                  <img src={GooglePayImg} />
                </a>
                <a href={window.__.env.REACT_APP_APP_STORE_LINK}>
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
