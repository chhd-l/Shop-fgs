import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import './index.css';
import { seoHoc } from '@/framework/common';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Canonical from '@/components/Canonical';

@injectIntl
@seoHoc('About Us Page')
class AboutUs extends React.Component {
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
    const {
      intl: { messages }
    } = this.props;
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header showMiniIcons={true} showUserIcon={true} {...this.props} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <h1 style={{ display: 'none' }}>{'Royal canin'}</h1>
          <BannerTip />
          {/* {window.__.env.REACT_APP_COUNTRY == 'fr' ? null: <BannerTip />} */}
          <br />
          <BreadCrumbs />
          <div className="storefront-page">
            <nav
              className="rc-progress rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs rc-margin-top--xs "
              data-progress-setup="true"
            />
            <div className="experience-region experience-main">
              {/* <div className="experience-component experience-layouts-1column">
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
              </div> */}

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-contentBlock">
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a
                          id={messages['aboutUs.history']}
                          name={messages['aboutUs.history']}
                          className="page-section-anchor"
                          aria-hidden="true"
                        />
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">
                                <FormattedMessage id="aboutUs.history" />
                              </h2>
                              <p>
                                <FormattedMessage id="aboutUs.historyDetail" />
                              </p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                alt={messages['aboutUs.history']}
                                title={messages['aboutUs.history']}
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/RAGDOLL_ADULT_-_VET_URINARY_Med._Res.___Basic.jpg`}
                              />
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
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a
                          id={messages['aboutUs.ourValues']}
                          name={messages['aboutUs.ourValues']}
                          className="page-section-anchor"
                          aria-hidden="true"
                        />
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                alt={messages['aboutUs.ourValues']}
                                title={messages['aboutUs.ourValues']}
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/YORKSHIRE_TERRIER_PUPPY___MOTHER_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg`}
                              />
                            </picture>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">
                                <FormattedMessage id="aboutUs.ourValues" />
                              </h2>
                              <p>
                                <FormattedMessage id="aboutUs.ourValuesDetail" />
                              </p>
                              <Link
                                className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                                to="/Tailorednutrition"
                                title="En savoir plus"
                              >
                                <FormattedMessage id="aboutUs.ourValuesBtn" />
                              </Link>
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
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <a
                          id={messages['aboutUs.FoodQualityandSafety']}
                          name={messages['aboutUs.FoodQualityandSafety']}
                          className="page-section-anchor"
                          aria-hidden="true"
                        />
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">
                                <FormattedMessage id="aboutUs.FoodQualityandSafety" />
                              </h2>
                              <p>
                                <FormattedMessage id="aboutUs.FoodQualityandSafetyDetail" />
                              </p>
                              <Link
                                className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                                to="/Quality-safety"
                                title="En savoir plus"
                              >
                                <FormattedMessage id="aboutUs.foodQualityAndSafetyBtn" />
                              </Link>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                alt={messages['aboutUs.FoodQualityandSafety']}
                                title={messages['aboutUs.FoodQualityandSafety']}
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/BENGAL_ADULT___FHN_OUTDOOR_EMBLEMATIC_Med._Res.___Basic.jpg`}
                              />
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
                      <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
                        <h2>
                          <FormattedMessage id="aboutUs.IncredibleDetail" />
                        </h2>
                        <p>
                          <FormattedMessage id="aboutUs.SeeHowWeDo" />
                        </p>
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
                            title="making a better world for pets"
                            allowFullScreen=""
                            frameBorder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {window.__.env.REACT_APP_COUNTRY == 'us' ? (
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-twoCategories">
                        <div className="rc-max-width--lg rc-padding-x--lg--mobile rc-margin-y--md">
                          <div className=" rc-margin-top--lg">
                            <div>
                              <h2 className="rc-alpha inherit-fontsize">
                                <FormattedMessage id="aboutUs.shopTile" />
                              </h2>
                              <p className="rc-large-intro rc-margin-bottom--sm" />
                            </div>

                            <div className="rc-card-grid rc-match-heights rc-four-column">
                              <div className="rc-grid">
                                <article className="rc-card rc-card--a">
                                  <Link to="/dogs/">
                                    <LazyLoad>
                                      <img
                                        src={dog}
                                        style={{ width: '100%' }}
                                        alt="dog image"
                                      />
                                    </LazyLoad>
                                  </Link>
                                  <div className="rc-card__body">
                                    <header>
                                      <Link to="/dogs/">
                                        <h4 className="rc-card__title">
                                          <FormattedMessage id="aboutUs.shopDog" />
                                        </h4>
                                      </Link>
                                      <p className="rc-margin--none" />
                                    </header>
                                  </div>
                                </article>
                              </div>

                              <div className="rc-grid">
                                <article className="rc-card rc-card--a">
                                  <Link to="/cats/">
                                    <LazyLoad>
                                      <img
                                        src={cat}
                                        style={{ width: '100%' }}
                                        alt="cat image"
                                      />
                                    </LazyLoad>
                                  </Link>
                                  <div className="rc-card__body">
                                    <header>
                                      <Link to="/cats/">
                                        <h4 className="rc-card__title">
                                          <FormattedMessage id="aboutUs.shopCat" />
                                        </h4>
                                      </Link>
                                      <p className="rc-margin--none" />
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
          <Footer />
        </main>
      </div>
    );
  }
}

export default AboutUs;
