import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import Help from './Fr/help';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import autoship from './images/us_autoship.png';
import icon1 from './images/us_icon1.png';
import icon2 from './images/us_icon2.png';
import icon3 from './images/us_icon3.png';
import icon4 from './images/us_icon4.png';
import emailImg from './images/Emailus_icon.png';
import callImg from './images/customer-service.png';
import helpImg from './images/FAQ_icon.png';
import wof from './images/wof.png';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import './index.css';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const pageLink = window.location.href
@inject('configStore')
@observer
@injectIntl
class SubscriptionLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      }
    };
  }
  componentDidMount() {
    setSeoConfig({
      goodsId: '',
      categoryId: '',
      pageName: 'Subscription Page'
    }).then(res => {
      this.setState({ seoConfig: res })
    });
  }
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };

    return (
      <div className="subscriptionLanding">
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription} />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-pawListBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-max-width--lg rc-padding-y--sm">
                      <div className="rc-max-width--md text-center rc-padding-x--sm">
                        <h2 className="rc-beta text-center">IT’S MORE THAN FREE DELIVERY</h2>
                        <div className="rc-intro inherit-fontsize children-nomargin">
                          <p>At Royal Canin®, we know that caring for a new pet can bring a lot of questions. That’s why we offer exclusive benefits like 24/7 access to veterinarians and more through the Royal Canin Club. Joining is easy — sign up for automatic shipping on your pet’s tailored formulas to become a member today.<br /><br /></p>
                          <p>Your <strong>free</strong> membership includes:</p>
                          <p>&nbsp;</p>
                          <p>&nbsp;</p>
                          <br />
                          <br />
                        </div>
                      </div>

                      <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                        <div className="rc-column">
                          <div className="rc-padding-y--lg--mobile rc-full-width">
                            <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                <strong>Royal Canin Pet Advisor Live</strong> - chat with veterinarians around the clock about your pet’s health, nutrition, behavior and more.
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                <strong>Special Savings + FREE Shipping</strong> - save 30% on your first order and another 5% on every autoship order.
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                <strong>Expert Recommendations</strong> - receive recommendations for pet food and products as your pet grows.
                              </li>
                            </ul>
                            <div className="d-none d-md-block rc-btn-group m-0 rc-column rc-padding-x--none">
                              <Link to="/cats">
                                <button className="rc-btn rc-btn--one rc-margin-right--xs">Shop Cat Formulas</button>
                              </Link>
                              <Link to="/dogs">
                                <button className="rc-btn rc-btn--one">Shop Dog Formulas</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column">
                          <LazyLoad>
                            <img alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin" className="w-100 lazyloaded" src={autoship} />
                          </LazyLoad>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-assets-divider">
            <div className="rc-border-bottom rc-border-colour--brand4" style={{ borderBottomWidth: '4px' }}></div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-importContentAsset">
                  <div className="content-asset">
                    <div className="rc-max-width--lg rc-padding-y--md rc-padding-y--xl--mobile">
                      <div className="rc-max-width--md text-center rc-margin-y--md rc-padding-x--sm">
                        <h2 className="rc-beta text-center">How to Join Royal Canin Club</h2>
                      </div>
                      <div className="row text-center">
                        <div className="col-6 col-md-3">
                          <img className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs" src={icon1} alt="" />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p>Find your <strong>handpicked nutrition products</strong> in your cart.</p>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <img className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs" src={icon2} alt="" />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p>Select <strong>automatic shipping</strong> and input your payment method.</p>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <img className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs" src={icon3} alt="" />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p><strong>Receive your product automatically</strong> based on your schedule. Change or cancel <strong>at any time</strong>.</p>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <img className="mx-auto rc-margin-bottom--xs rc-padding-bottom--xs" src={icon4} alt="" />
                          <div className="inherit-fontsize rc-large-body rc-padding-top--xs children-nomargin">
                            <p>Get your exclusive<strong> Royal Canin Club </strong>perks, including access to Royal Canin Pet Advisor Live.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-importContentAsset">
                  <div className="content-asset">
                    <div className="rc-bg-colour--brand4">
                      <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm">
                        <div className="col-12 col-md-4 order-1 order-md-0">
                          <div className="rc-column rc-padding--none">
                            <img src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship-landing/cat.webp`} alt="Cat image" />
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <Link className="rc-btn rc-btn--sm rc-btn--two w-50" to="/cats/">Cat</Link>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                          <div className="rc-gamma rc-text--center">Get Started</div>
                          <div className="rc-intro inherit-fontsize rc-text--center">
                            <p>Find your pet’s precise formula, and be sure to choose automatic shipping at checkout.</p>
                          </div>
                          <div className="rc-btn-group rc-margin--none rc-padding-x--xs d-none d-md-flex">
                            <Link className="rc-btn rc-btn--sm rc-btn--two" to="/cats/">Cat</Link>
                            <Link className="rc-btn rc-btn--sm rc-btn--two" to="/dogs/">Dog</Link>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 order-2 order-md-2">
                          <div className="rc-column rc-padding--none">
                            <img src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/autoship-landing/dog.webp`} alt="Dog image" />
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <Link className="rc-btn rc-btn--sm rc-btn--two w-50" to="/dogs/">Dog</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none ">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contactOptionsBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile contact_options">
                    <h2 className="rc-beta text-center">Need help?</h2>
                    <div className="rc-intro inherit-fontsize text-center contact_options__subheading">
                      <p><span style={{ color: 'rgb(102, 102, 102)' }}>As true pet lovers and experts in tailored nutrition, we're here to help you give your pet the healthiest life possible.</span></p>
                    </div>
                    <div className="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">

                      <div className="rc-column rc-padding--none">
                        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                          <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                <div className="w-100">
                                  <b style={{ color: '#00A4A6' }}>Call us</b>
                                  <p>
                                    <span style={{ color: 'rgb(102, 102, 102)' }}>Monday through Friday from 8:00 a.m. to 4:30 p.m. CT.</span>
                                  </p>
                                  <div className="rc-margin-top--xs">
                                    <a href="tel: 1-844-673-3772" style={{ color: '#00A4A6' }} className="rc-numeric nowrap">1-844-673-3772</a>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                <img className="align-self-center widthAuto lazyloaded" alt="call us" title="call us" src={callImg} />
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="rc-column rc-padding--none">
                        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                          <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                <div className="w-100">
                                  <b style={{ color: '#0087BD' }}>Email Us</b>
                                  <p>
                                    <span style={{ color: 'rgb(102, 102, 102)' }}>We will respond as soon as possible.</span>
                                  </p>
                                  <div className="rc-margin-top--xs">
                                    <a href="https://shop.royalcanin.com/help/contact" style={{ color: '#0087BD' }} className="rc-numeric nowrap">Send us an Email</a>
                                  </div>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                <img className="align-self-center widthAuto lazyloaded" alt="email us" title="email us" src={emailImg} />
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="rc-column rc-padding--none">
                        <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                          <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                            <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                              <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                <div className="w-100">
                                  <b>Have a question?</b>
                                  <p>
                                    <span style={{ color: 'rgb(102, 102, 102)' }}>Check out our&nbsp;</span><a href="https://shop.royalcanin.com/faq.html" target="_blank" rel="noopener noreferrer" data-link-type="external" data-link-label="https://shop.royalcanin.com/faq.html" style={{ color: 'rgb(236, 0, 26)', backgroundColor: 'rgb(255, 255, 255)' }}>FAQs</a><span style={{ color: 'rgb(102, 102, 102)' }}>&nbsp;to find the answers you're looking for.</span>
                                  </p>
                                </div>
                              </div>
                              <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                <img className="align-self-center widthAuto lazyloaded" alt="faq" title="faq" src={helpImg} />
                              </div>
                            </div>
                          </div>
                        </article>
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

export default SubscriptionLanding;
