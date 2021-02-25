import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import { inject, observer } from 'mobx-react';
import './index.css';
import { setSeoConfig } from '@/utils/utils';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      intl: this.props.intl.messages
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig(
      { pageName: "About Us Page" }
    ).then(res => {
      this.setState({ seoConfig: res })
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription} />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
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
          {/* {process.env.REACT_APP_LANG == 'fr' ? null: <BannerTip />} */}
          <br />
          <BreadCrumbs />
          <div className="storefront-page">
            <nav
              className="rc-progress rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs rc-margin-top--xs "
              data-progress-setup="true">

            </nav>
            <div className="experience-region experience-main">

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-headingBlock">
                      <div className="rc-max-width--md text-center rc-margin-y--md">
                        <div className="rc-alpha inherit-fontsize">
                          <h1><FormattedMessage id="aboutUs.title" /></h1>
                        </div>
                        <div
                          className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <h2><FormattedMessage id="aboutUs.description" /></h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div
                        className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a id={this.state.intl['aboutUs.history']} name={this.state.intl['aboutUs.history']} className="page-section-anchor" aria-hidden="true"></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text"><FormattedMessage id="aboutUs.history" /></h2>
                              <p><FormattedMessage id="aboutUs.historyDetail" /></p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img className="w-100 ls-is-cached lazyloaded"
                                alt={this.state.intl['aboutUs.history']} title={this.state.intl['aboutUs.history']}
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/RAGDOLL_ADULT_-_VET_URINARY_Med._Res.___Basic.jpg`} />
                            </picture>
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
                    <div className="experience-component experience-assets-contentBlock">
                      <div
                        className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a id={this.state.intl['aboutUs.ourValues']} name={this.state.intl['aboutUs.ourValues']} className="page-section-anchor" aria-hidden="true"></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img className="w-100 ls-is-cached lazyloaded"
                                alt={this.state.intl['aboutUs.ourValues']} title={this.state.intl['aboutUs.ourValues']}
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/YORKSHIRE_TERRIER_PUPPY___MOTHER_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg`} />
                            </picture>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div
                              className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text"><FormattedMessage id="aboutUs.ourValues" /></h2>
                              <p><FormattedMessage id="aboutUs.ourValuesDetail" /></p>
                              <Link className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                                to="/Tailorednutrition" title="En savoir plus"><FormattedMessage id="aboutUs.learnMore" /></Link>
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
                    <div className="experience-component experience-assets-contentBlock">
                      <div
                        className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a id={this.state.intl['aboutUs.FoodQualityandSafety']} name={this.state.intl['aboutUs.FoodQualityandSafety']}
                          className="page-section-anchor" aria-hidden="true"></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text"><FormattedMessage id="aboutUs.FoodQualityandSafety" /></h2>
                              <p><FormattedMessage id="aboutUs.FoodQualityandSafetyDetail" /></p>
                              <Link className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                                to="/Quality-safety" title="En savoir plus"><FormattedMessage id="aboutUs.learnMore" /></Link>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img className="w-100 ls-is-cached lazyloaded"
                                alt={this.state.intl['aboutUs.FoodQualityandSafety']}
                                title={this.state.intl['aboutUs.FoodQualityandSafety']}
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/BENGAL_ADULT___FHN_OUTDOOR_EMBLEMATIC_Med._Res.___Basic.jpg`} />
                            </picture>
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
                    <div className="experience-component experience-assets-textContent">
                      <div
                        className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
                        <h2><FormattedMessage id="aboutUs.IncredibleDetail" /></h2>
                        <p><FormattedMessage id="aboutUs.SeeHowWeDo" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-singleYoutubeVideo">
                      <div className="rc-max-width--md rc-padding-x--lg">
                        <div className="rc-video-wrapper">
                          <iframe
                            src="https://www.youtube.com/embed/FYwO1fiYoa8?enablejsapi=1&amp;origin=https%3A%2F%2Fshop.royalcanin.fr"
                            title="making a better world for pets" allowFullScreen="" frameBorder="0"></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {process.env.REACT_APP_LANG == 'en' ? (
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">

                      <div className="experience-component experience-assets-twoCategories">
                        <div className="rc-max-width--lg rc-padding-x--lg--mobile rc-margin-y--md">
                          <div className=" rc-margin-top--lg">

                            <div>
                              <h2 className="rc-alpha inherit-fontsize"><FormattedMessage id="aboutUs.shopTile" /></h2>
                              <p className="rc-large-intro rc-margin-bottom--sm"></p>
                            </div>

                            <div className="rc-card-grid rc-match-heights rc-four-column">

                              <div className="rc-grid">
                                <article className="rc-card rc-card--a">
                                  <Link to="/dogs/">
                                    <LazyLoad>
                                      <img src={dog} style={{ width: '100%' }} alt="" />
                                    </LazyLoad>
                                  </Link>
                                  <div className="rc-card__body">
                                    <header>
                                      <Link to="/dogs/">
                                        <h4 className="rc-card__title"><FormattedMessage id="aboutUs.shopDog" /></h4></Link>
                                      <p className="rc-margin--none"></p>
                                    </header>
                                  </div>
                                </article>
                              </div>

                              <div className="rc-grid">
                                <article className="rc-card rc-card--a">
                                  <Link to="/cats/">
                                    <LazyLoad>
                                      <img src={cat} style={{ width: '100%' }} alt="" />
                                    </LazyLoad>
                                  </Link>
                                  <div className="rc-card__body">
                                    <header>
                                      <Link to="/cats/">
                                        <h4 className="rc-card__title"><FormattedMessage id="aboutUs.shopCat" /></h4></Link>
                                      <p className="rc-margin--none"></p>
                                    </header>
                                  </div>
                                </article>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}


            </div>
          </div>
        </main>
        <Footer />
      </div >
    );
  }
}

export default AboutUs;
