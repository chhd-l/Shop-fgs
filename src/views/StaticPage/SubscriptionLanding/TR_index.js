import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import autoship from './images/autoship.png';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import cat from './images/cat.png';
import dog from './images/dog.png';
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import './index.css';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

class Help extends React.Component {
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
      this.setState({seoConfig: res})
    });
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    };

    return (
      <div className="recommendation">
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
        <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <section
            style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}
          >
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              <FormattedMessage id="subscriptionLanding.title1" />
            </h2>
            <p>
              <FormattedMessage id="subscriptionLanding.content1" />
            </p>
          </section>

          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px' }}
          >
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <FormattedMessage id="subscriptionLanding.description1" />
                </div>
                <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <FormattedMessage id="subscriptionLanding.description2" />
                </div>
                <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <FormattedMessage id="subscriptionLanding.description3" />
                </div>
                <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <FormattedMessage id="subscriptionLanding.description4" />
                </div>
                {/* <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i><FormattedMessage id="subscriptionLanding.description4"/>
                </div> */}
                <div style={{ marginTop: '20px' }}>
                  <Link className="rc-btn rc-btn--one" to="/cats">
                    <FormattedMessage id="subscriptionLanding.catButton" />
                  </Link>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Link className="rc-btn rc-btn--one" to="/dogs">
                    <FormattedMessage id="subscriptionLanding.dogButton" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="rc-column">
              <LazyLoad>
                <img src={autoship} style={{ width: '100%' }} alt="" />
              </LazyLoad>
            </div>
          </div>
          <section
            style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}
          >
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              Abonelik hizmeti nasıl çalışır?
            </h2>
          </section>
          <div
            className="rc-layout-container rc-four-column"
            style={{ padding: '20px' }}
          >
            <div className="rc-column" style={{ textAlign: 'center' }}>
              <LazyLoad>
                <img
                  alt=""
                  src={icon1}
                  style={{
                    width: '100px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                />
              </LazyLoad>
              <p>
                Ürün arama özelliğini kullanarak,&nbsp;
                <strong>evcil hayvanınıza en uygun mamayı bulun.</strong>
              </p>
            </div>
            <div className="rc-column" style={{ textAlign: 'center' }}>
              <LazyLoad>
                <img
                  alt=""
                  src={icon2}
                  style={{
                    width: '100px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                />
              </LazyLoad>
              <p>
                <strong>Teslimat sıklığını</strong>,&nbsp;
                <strong>adresinizi</strong>&nbsp;ve&nbsp;
                <strong>ödeme yönteminizi</strong>&nbsp;belirleyin.
              </p>
            </div>
            <div className="rc-column" style={{ textAlign: 'center' }}>
              <LazyLoad>
                <img
                  alt=""
                  src={icon3}
                  style={{
                    width: '100px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                />
              </LazyLoad>
              <p>
                Ürünlerinizi,<strong>&nbsp;istediğiniz zaman</strong>
                &nbsp;kapınıza teslim edelim.
              </p>
            </div>
            <div className="rc-column" style={{ textAlign: 'center' }}>
              <LazyLoad>
                <img
                  alt=""
                  src={icon4}
                  style={{
                    width: '100px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                />
              </LazyLoad>
              <p>
                Teslimat tarihlerinizi&nbsp;<strong>dilediğiniz zaman</strong>
                &nbsp;değiştirin
              </p>
            </div>
          </div>
          <div
            className="rc-layout-container rc-three-column"
            style={{ padding: '20px', background: '#eee' }}
          >
            <div className="rc-column" style={{ textAlign: 'center' }}>
              <LazyLoad>
                <img
                  src={cat}
                  style={{
                    width: '100%',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                  alt=""
                />
              </LazyLoad>
            </div>
            <div className="rc-column" style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A' }}>Hemen Başlayın!</h2>
              <p>
                Evcil hayvanınız için en uygun beslenme seçeneklerini keşfedin,
                ve satın almadan önce Aboonelik seçeneğini tercih edin.
              </p>
              <div>
                <Link className="rc-btn rc-btn--sm rc-btn--two" to="/cats">
                  Kedi
                </Link>{' '}
                <Link className="rc-btn rc-btn--sm rc-btn--two" to="/dogs">
                  Köpek
                </Link>
              </div>
            </div>
            <div className="rc-column" style={{ textAlign: 'center' }}>
              <LazyLoad>
                <img
                  src={dog}
                  style={{
                    width: '100%',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                  alt=""
                />
              </LazyLoad>
            </div>
          </div>
          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                Sorularınız mı var?
              </h2>
              <p style={{ width: '60%', margin: '0 auto' }}>
                Herhangi bir konuda yardıma ihtiyacınız varsa,
                <br />
                ekibimiz sorularınızı cevaplamak ve kusursuz bir alışveriş
                deneyimi yaşamanıza yardımcı olmak için burada. Bize aşağıdaki
                kanallar üzerinden ulaşabilirsiniz:
              </p>
            </section>
            <div className="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">
              <div className="rc-column rc-padding--none">
                <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                  <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                    <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                      <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                        <div style={{ width: '100%' }}>
                          <b style={{ color: '#00A4A6' }}>
                            <FormattedMessage id="help.byTelephone" />
                          </b>
                          <p>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              {this.props.configStore.contactTimePeriod}
                            </span>
                          </p>
                          <div className="rc-margin-top--xs">
                            <a
                              href="tel: 1-844-673-3772"
                              style={{ color: '#00A4A6' }}
                              className="rc-numeric"
                            >
                              {this.props.configStore.storeContactPhoneNumber}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                        <LazyLoad>
                          <img
                            className="align-self-center widthAuto ls-is-cached lazyloaded"
                            data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                            alt="call us"
                            title="call us"
                            srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                            src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwde2878c8/Subscription/customer-service@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                          />
                        </LazyLoad>
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
                        <div style={{ width: '100%' }}>
                          <b style={{ color: '#0087BD' }}>
                            <FormattedMessage id="help.byEmail" />
                          </b>
                          <p>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              <FormattedMessage id="help.tip3" />
                            </span>
                          </p>
                          <div className="rc-margin-top--xs">
                            <div
                              href="https://shop.royalcanin.com/help/contact"
                              style={{ color: '#0087BD' }}
                              className="rc-numeric"
                            >
                              {this.props.configStore.storeContactEmail}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                        <LazyLoad>
                          <img
                            className="align-self-center widthAuto ls-is-cached lazyloaded"
                            data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                            alt="email us"
                            title="email us"
                            srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                            src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw70840603/Subscription/Emailus_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                          />
                        </LazyLoad>
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
                        <div>
                          <b>Have a question?</b>
                          <p>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              Check out our&nbsp;
                            </span>
                            <Link
                              to="/faq"
                              rel="noopener noreferrer"
                              data-link-type="external"
                              style={{
                                color: 'rgb(236, 0, 26)',
                                backgroundColor: 'rgb(255, 255, 255)'
                              }}
                            >
                              FAQs
                            </Link>
                            <span style={{ color: 'rgb(102, 102, 102)' }}>
                              &nbsp;to find the answers you're looking for.
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                        <LazyLoad>
                          <img
                            className="align-self-center widthAuto ls-is-cached lazyloaded"
                            data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                            alt="faq"
                            title="faq"
                            srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=jpg 2x"
                            src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw2cc60c6d/Subscription/FAQ_icon@2x.png?sw=100&amp;sh=100&amp;sm=cut&amp;sfrm=jpg"
                          />
                        </LazyLoad>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            {/* <div className="experience-region experience-main">
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile"></div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
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
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-alpha rc-border--none rc-md-down"
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
                                      <img
                                        className="align-self-center widthAuto"
                                        src={callImg}
                                        alt="By telephone"
                                        title="By telephone"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#0087BD' }}>
                                          <font
                                            style={{ verticalAlign: 'inherit' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <FormattedMessage id="help.byEmail" />
                                            </font>
                                          </font>
                                        </b>
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
                                        <div className="rc-margin-top--xs">
                                          <p
                                            className="rc-numeric rc-md-up"
                                            style={{
                                              color: 'rgb(0, 135, 189)'
                                            }}
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactEmail
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <img
                                        className="align-self-center widthAuto"
                                        src={emailImg}
                                        alt="By email"
                                        title="By email"
                                      />
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
                                  <img src={helpImg} alt=" " title=" " />
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
            </div> */}
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;