import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import HubSalesCategory from '@/components/HubSalesCategory';
import { salesCategoryFilterRule2 } from '@/components/HubSalesCategory/utils';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';
import PaymentSecureHome from '@/assets/images/home/Payment-secure@2x.png';
import premiumHome from '@/assets/images/home/premium@2x.png';
import reimbursedHome from '@/assets/images/home/reimbursed@2x.png';
import shippmentHome from '@/assets/images/home/shippment@2x.png';
import phoneImg from '@/assets/images/online-store-phone.png';
import emailImg from '@/assets/images/online-store-email.png';
import messageImg from '@/assets/images/online-store-message.png';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import './index.less';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;

const mailAddress = 'mailto:suivi.dtc.france@royalcanin.com';

function Divider() {
  return (
    <div className="experience-component experience-assets-divider">
      <div className="rc-border-bottom rc-border-colour--brand4 border-b-4" />
    </div>
  );
}

function OnlineStoreHeader() {
  return (
    <div className="experience-region experience-main">
      <div className="experience-component experience-layouts-1column">
        <div className="row rc-margin-x--none">
          <div className="rc-full-width">
            <div className="experience-component experience-assets-headingBlock">
              <div className="rc-max-width--md text-center rc-margin-y--md mb-0">
                <div className="rc-alpha inherit-fontsize">
                  <div className="text-xl">
                    <FormattedMessage id="onlineStore.header.title" />
                  </div>
                </div>
                <div className="text-center rc-intro inherit-fontsize children-nomargin heading-block-content">
                  <p>
                    <FormattedMessage id="onlineStore.header.content" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvantageTips() {
  const defaultIconList = [
    { img: PaymentSecureHome, langKey: 'home.point1' },
    { img: reimbursedHome, langKey: 'home.point2' },
    { img: premiumHome, langKey: 'home.point3' },
    { img: shippmentHome, langKey: 'home.point4' }
  ];
  const iconList =
    {
      us: [
        { img: PaymentSecureHome, langKey: 'home.point1' },
        {
          img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CLUB-BENEFITS_FREE-SHIPPING.webp`,
          langKey: 'home.point2'
        },
        { img: premiumHome, langKey: 'home.point3' },
        {
          img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/question@2x_home_us.webp`,
          langKey: 'home.point4'
        }
      ]
    }[window.__.env.REACT_APP_COUNTRY] || defaultIconList;
  return (
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="online-store-advantageTips rc-full-width">
          <div className="experience-component experience-assets-centeredIconList">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
              <div className="rc-sm-down">
                <div className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list mx-auto text-center">
                  {iconList.map((ele, i) => (
                    <div className="col-6 centered-icon-list__icon" key={i}>
                      <FormattedMessage id={ele.langKey}>
                        {(txt) => (
                          <>
                            <LazyLoad height={200}>
                              <img
                                src={ele.img}
                                srcSet={ele.img}
                                className="mx-auto"
                                alt={txt}
                                title={txt}
                              />
                            </LazyLoad>
                            <p className="rc-meta text-center markup-text">
                              {txt}
                            </p>
                          </>
                        )}
                      </FormattedMessage>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rc-sm-up">
                <div className="d-flex justify-content-center bottom-content__icon-list text-center">
                  {iconList.map((ele, i) => (
                    <div className="centered-icon-list__icon" key={i}>
                      <FormattedMessage id={ele.langKey}>
                        {(txt) => (
                          <>
                            <LazyLoad height={200}>
                              <img
                                src={ele.img}
                                srcSet={ele.ele}
                                className="mx-auto"
                                alt={txt}
                                title={txt}
                              />
                            </LazyLoad>
                            <p className="rc-meta text-center markup-text">
                              {txt}
                            </p>
                          </>
                        )}
                      </FormattedMessage>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

@inject('configStore')
@seoHoc()
class OnlineStore extends React.Component {
  BottomInfo = () => {
    const phone = this.props.configStore.storeContactPhoneNumber;
    return (
      <div>
        <div className="online-store-bottomInfo experience-region experience-main">
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-headingBlock">
                  <div className="rc-max-width--md text-center rc-margin-y--md">
                    <div className="rc-alpha inherit-fontsize">
                      <div className="text-xl">
                        <FormattedMessage id="onlineStore.footer.title" />
                      </div>
                    </div>
                    <div className="text-center rc-intro inherit-fontsize children-nomargin heading-block-content">
                      <p>
                        <FormattedMessage
                          id="onlineStore.footer.content"
                          values={{
                            val1: <br />
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">
          <div className="rc-column rc-padding--none">
            <article className="rc-full-width rc-column">
              <div className="rc-border-all rc-border-colour--interface fullHeight">
                <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                  <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                    <div className="w-100">
                      <strong>
                        <font style={{ verticalAlign: 'inherit' }}>
                          <a
                            href="javascript:;"
                            style={{
                              verticalAlign: 'inherit',
                              cursor: 'auto',
                              color: '#6C6C6C'
                            }}
                          >
                            <FormattedMessage id="onlineStore.BottomInfo.phone.title" />
                          </a>
                        </font>
                      </strong>
                      <div className="rc-margin-top--xs">
                        <p
                          className="rc-numeric rc-md-up text-nowrap"
                          style={{
                            color: 'rgb(0, 135, 189)'
                          }}
                        >
                          <a
                            href={'tel:' + phone}
                            className="rc-styled-link text-xl text-rc-red"
                          >
                            {phone}
                          </a>
                        </p>
                      </div>
                      <p>
                        <span style={{ color: '#828282', fontSize: '.75rem' }}>
                          <font
                            style={{
                              verticalAlign: 'inherit'
                            }}
                          >
                            <font
                              style={{
                                verticalAlign: 'inherit'
                              }}
                            >
                              <FormattedMessage
                                id="onlineStore.BottomInfo.phone.content2"
                                values={{
                                  val1: <br />
                                }}
                              />
                            </font>
                          </font>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="rc-column rc-content-v-middle">
                    <LazyLoad>
                      <img
                        className="align-self-center widthAuto"
                        src={phoneImg}
                        alt="By email"
                        title="By email"
                      />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="rc-column rc-padding--none">
            <article className="rc-full-width rc-column">
              <div className="rc-border-all rc-border-colour--interface fullHeight">
                <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                  <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                    <div className="w-100">
                      <strong>
                        <font style={{ verticalAlign: 'inherit' }}>
                          <a
                            href="javascript:;"
                            style={{
                              verticalAlign: 'inherit',
                              cursor: 'auto',
                              color: '#6C6C6C'
                            }}
                          >
                            <FormattedMessage id="onlineStore.BottomInfo.email.title" />
                          </a>
                        </font>
                      </strong>
                      <p style={{ marginBottom: '2rem' }}>
                        <span style={{ color: '#828282', fontSize: '.75rem' }}>
                          <font
                            style={{
                              verticalAlign: 'inherit'
                            }}
                          >
                            <font
                              style={{
                                verticalAlign: 'inherit'
                              }}
                            >
                              <FormattedMessage id="onlineStore.BottomInfo.email.content1" />
                            </font>
                          </font>
                        </span>
                      </p>
                      <div className="rc-margin-top--xs">
                        <p
                          className="rc-numeric rc-md-up text-nowrap"
                          style={{
                            color: 'rgb(0, 135, 189)'
                          }}
                        >
                          <a
                            href={mailAddress}
                            style={{
                              fontSize: '1.125rem',
                              color: '#000',
                              borderBottom: '1px solid #DADADA'
                            }}
                          >
                            <FormattedMessage id="onlineStore.BottomInfo.email.content2" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rc-column rc-content-v-middle">
                    <LazyLoad>
                      <img
                        className="align-self-center widthAuto"
                        src={emailImg}
                        alt="By email"
                        title="By email"
                      />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="rc-column rc-padding--none">
            <article className="rc-full-width rc-column">
              <div className="rc-border-all rc-border-colour--interface fullHeight">
                <div className="rc-layout-container rc-five-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                  <div className="rc-column rc-quad-width rc-padding-top--md--mobile">
                    <div className="w-100">
                      <strong>
                        <font style={{ verticalAlign: 'inherit' }}>
                          <a
                            href="javascript:;"
                            style={{
                              verticalAlign: 'inherit',
                              cursor: 'auto',
                              color: '#6C6C6C'
                            }}
                          >
                            <FormattedMessage id="onlineStore.BottomInfo.faq.title" />
                          </a>
                        </font>
                      </strong>
                      <p>
                        <span style={{ color: '#828282', fontSize: '.75rem' }}>
                          <font
                            style={{
                              verticalAlign: 'inherit'
                            }}
                          >
                            <font
                              style={{
                                verticalAlign: 'inherit'
                              }}
                            >
                              <FormattedMessage
                                id="onlineStore.BottomInfo.faq.content1"
                                values={{ val1: <br /> }}
                              />
                            </font>
                          </font>
                        </span>
                      </p>
                      <div className="rc-margin-top--xs">
                        <p
                          className="rc-numeric rc-md-up text-nowrap"
                          style={{
                            color: '#000'
                          }}
                        >
                          <DistributeHubLinkOrATag
                            href="/about-us/faqs"
                            to="/faq"
                            style={{
                              fontSize: '1.125rem',
                              color: '#000',
                              borderBottom: '1px solid #DADADA'
                            }}
                          >
                            <FormattedMessage id="onlineStore.BottomInfo.faq.content2" />
                          </DistributeHubLinkOrATag>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rc-column rc-content-v-middle">
                    <LazyLoad>
                      <img
                        className="align-self-center widthAuto"
                        src={messageImg}
                        alt="By email"
                        title="By email"
                      />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  };

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: location.pathname,
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
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <OnlineStoreHeader />
          <HubSalesCategory rule={salesCategoryFilterRule2} />
          <Divider />
          <AdvantageTips />
          <Divider />
          {/* <BottomInfo /> */}
          {this.BottomInfo()}
          <Footer />
        </main>
      </div>
    );
  }
}

export default OnlineStore;
