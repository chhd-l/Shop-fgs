import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import PhoneModal from './components/phoneModal.js';
import FrTips from './fr/frTips';
import FrFaq from './fr/frFaq';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl-phraseapp';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import { inject, observer } from 'mobx-react';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';
import './index.less';
import Canonical from '@/components/Canonical/index.jsx';

const localItemRoyal = window.__.localItemRoyal;

@inject('configStore')
@seoHoc('Contact Us Page')
@observer
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      mailAddress: '',
      showModal: false
    };
  }

  componentWillUnmount() {}
  componentDidMount() {
    const tel = 'tel:' + this.props.configStore.storeContactPhoneNumber;
    const mailAddress = 'mailto:' + this.props.configStore.storeContactEmail;

    this.setState({ tel, mailAddress });
  }
  mobileDial = () => {
    this.setState({ showModal: true });
  };
  cancelModal = () => {
    this.setState({ showModal: false });
  };
  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.state.showModal ? (
          <PhoneModal cancelModal={this.cancelModal} />
        ) : null}
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <div className="experience-region experience-main">
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="md:text-left rc-margin-top--lg--mobile text-center rc-margin-y--sm">
                            <div className="rc-padding-bottom--none--mobile text-center rc-padding-top--lg">
                              <h1 className="rc-beta">
                                <FormattedMessage id="help.title" />
                              </h1>
                            </div>
                            <div className=" text-center">
                              <div className="rc-large-body inherit-fontsize children-nomargin">
                                <p>
                                  {window.__.env.REACT_APP_COUNTRY ==
                                  'de' ? null : (
                                    <FormattedMessage id="help.tip1" />
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center md:text-left">
                            <div className="rc-column rc-double-width rc-padding--none">
                              <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#00BCA3' }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>
                                          {
                                            this.props.configStore
                                              .contactTimePeriod
                                          }
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-numeric rc-md-up"
                                          >
                                            <a
                                              href={this.state.tel}
                                              style={{ color: '#00BCA3' }}
                                            >
                                              {/* <FormattedMessage id="help.tel" /> */}
                                              {
                                                this.props.configStore
                                                  .storeContactPhoneNumber
                                              }
                                            </a>
                                          </p>
                                        </div>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-alpha rc-border--none rc-md-down"
                                            onClick={this.mobileDial}
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                        <img
                                          className="align-self-center widthAuto"
                                          src={callImg}
                                          alt="By telephone"
                                          title="By telephone"
                                        />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <strong>
                                          <font
                                            style={{ verticalAlign: 'inherit' }}
                                          >
                                            <a
                                              href={this.state.mailAddress}
                                              style={{
                                                verticalAlign: 'inherit',
                                                color: '#0087BD'
                                              }}
                                            >
                                              <FormattedMessage id="help.byEmail" />
                                            </a>
                                          </font>
                                        </strong>
                                        <p>
                                          <span
                                            style={{ color: 'rgb(0, 0, 0)' }}
                                          >
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
                                                <FormattedMessage id="help.tip3" />
                                              </font>
                                            </font>
                                          </span>
                                        </p>
                                        {window.__.env.REACT_APP_COUNTRY ===
                                        'de' ? (
                                          <div className="rc-margin-top--xs">
                                            <span
                                              style={{ color: 'rgb(0, 0, 0)' }}
                                            >
                                              <font
                                                style={{
                                                  verticalAlign: 'inherit'
                                                }}
                                              >
                                                <FormattedMessage id="help.protectionDeclaration" />
                                              </font>
                                            </span>
                                            <span>
                                              <a
                                                href="https://www.mars.com/privacy-policy-germany"
                                                style={{
                                                  fontSize: '1rem',
                                                  color: 'rgb(0, 135, 189)',
                                                  lineHeight: '1.5rem'
                                                }}
                                                className="rc-styled-link"
                                              >
                                                <FormattedMessage id="help.protectionDeclarationUrl" />
                                              </a>
                                            </span>
                                          </div>
                                        ) : null}
                                        <div className="rc-margin-top--xs">
                                          <p
                                            className="rc-numeric"
                                            style={{
                                              color: 'rgb(0, 135, 189)'
                                            }}
                                          >
                                            <span>
                                              <a
                                                href={this.state.mailAddress}
                                                style={{
                                                  fontSize: '1rem',
                                                  color: 'rgb(0, 135, 189)',
                                                  lineHeight: '1.5rem'
                                                }}
                                                className="rc-styled-link"
                                              >
                                                {/* <FormattedMessage id="help.email" /> */}
                                                {
                                                  this.props.configStore
                                                    .storeContactEmail
                                                }
                                              </a>
                                            </span>
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
                            <div className="rc-column rc-triple-width">
                              <div
                                className="background-cover"
                                style={{
                                  backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                                }}
                              >
                                <picture className="rc-card__image">
                                  <LazyLoad>
                                    <img
                                      src={helpImg}
                                      alt="help-icon"
                                      title=" "
                                    />
                                  </LazyLoad>
                                </picture>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {window.__.env.REACT_APP_COUNTRY == 'fr' ? (
            <div>
              <FrTips />
              <FrFaq />
            </div>
          ) : null}
          <Footer />
        </main>
      </div>
    );
  }
}

export default Help;
