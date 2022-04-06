import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import './index.css';

import image1 from './images/image1.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
@seoHoc()
class QualitySafety extends React.Component {
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

          <div className="experience-region experience-main">
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-headingBlock">
                    <div className="rc-max-width--md text-center rc-margin-y--md">
                      <div className="rc-alpha inherit-fontsize">
                        <h1>
                          <FormattedMessage id="qualitySafety.title" />
                        </h1>
                      </div>
                      <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                        <p>
                          <FormattedMessage id="qualitySafety.description" />
                        </p>
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
                        id="undefined"
                        name="undefined"
                        className="page-section-anchor"
                        aria-hidden="true"
                      ></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              <FormattedMessage id="qualitySafety.foodTitle" />
                            </h2>
                            <p>
                              <FormattedMessage id="qualitySafety.foodDetail" />
                            </p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                className="w-100 lazyloaded"
                                alt="Royal Canin Food and Safety Processes"
                                title="Royal Canin Food and Safety Processes"
                                src={image1}
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

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-contentBlock">
                    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                      <a
                        id="undefined"
                        name="undefined"
                        className="page-section-anchor"
                        aria-hidden="true"
                      ></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                alt="Consistent Quality image"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/DSC_0847Export_All_Lowres.jpg`}
                                title="Consistent Quality"
                              />
                            </LazyLoad>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              <FormattedMessage id="qualitySafety.consistentTitle" />
                            </h2>
                            <p>
                              <FormattedMessage id="qualitySafety.consistentDetail" />
                            </p>
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
                        id="undefined"
                        name="undefined"
                        className="page-section-anchor"
                        aria-hidden="true"
                      ></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              <FormattedMessage id="qualitySafety.materialsTitle" />
                            </h2>
                            <p>
                              <FormattedMessage id="qualitySafety.materialsDetail" />
                            </p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                alt="A school of fish swimming in the sea"
                                title="A school of fish swimming in the sea"
                                src={image3}
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

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-contentBlock">
                    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                      <a
                        id="undefined"
                        name="undefined"
                        className="page-section-anchor"
                        aria-hidden="true"
                      ></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                src={image4}
                                alt="A woman in a factory checking a clipboard"
                                title="A woman in a factory checking a clipboard"
                              />
                            </LazyLoad>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              <FormattedMessage id="qualitySafety.rigorousTitle" />
                            </h2>
                            <p>
                              <FormattedMessage id="qualitySafety.rigorousDetail" />
                            </p>
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
                        id="undefined"
                        name="undefined"
                        className="page-section-anchor"
                        aria-hidden="true"
                      ></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              <FormattedMessage id="qualitySafety.ingredientsTitle" />
                            </h2>
                            <p>
                              <FormattedMessage id="qualitySafety.ingredientsDetail" />
                            </p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                alt="A selection of samples in beakers"
                                title="A selection of samples in beakers"
                                src={image5}
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

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-twoCategories">
                    <div className="rc-max-width--lg rc-padding-x--lg--mobile rc-margin-y--md">
                      <div
                        className="rc-margin--md rc-padding--sm rc-border-all rc-border-colour--brand1 two-categories-border rc-margin-top--lg"
                        style={{ borderWidth: '3px', borderRadius: '5px' }}
                      >
                        <div className="text-center">
                          <h2 className="rc-alpha inherit-fontsize">
                            <FormattedMessage id="qualitySafety.shopTile" />
                          </h2>
                          <p className="rc-large-intro rc-margin-bottom--sm"></p>
                        </div>
                        <div className="rc-card-grid rc-match-heights rc-four-column">
                          <div className="rc-grid">
                            <article className="rc-card rc-card--a">
                              <Link to="/dogs/">
                                <picture
                                  className=""
                                  data-rc-feature-objectfillpolyfill-setup="true"
                                >
                                  <img
                                    className="card__image lazyloaded"
                                    data-src={dog}
                                    alt="Shop Dog Formulas"
                                    title="Shop Dog Formulas"
                                    src={dog}
                                  />
                                </picture>
                              </Link>
                              <div className="rc-card__body">
                                <header>
                                  <Link to="/dogs/">
                                    <h4 className="rc-card__title">
                                      <FormattedMessage id="qualitySafety.shopDog" />
                                    </h4>
                                  </Link>
                                  <p className="rc-margin--none"></p>
                                </header>
                              </div>
                            </article>
                          </div>
                          <div className="rc-grid">
                            <article className="rc-card rc-card--a">
                              <Link to="/cats/">
                                <picture
                                  className=""
                                  data-rc-feature-objectfillpolyfill-setup="true"
                                >
                                  <img
                                    className="card__image lazyloaded"
                                    data-src={cat}
                                    alt="Shop Cat Formulas"
                                    title="Shop Cat Formulas"
                                    src={cat}
                                  />
                                </picture>
                              </Link>
                              <div className="rc-card__body">
                                <header>
                                  <Link to="/cats/">
                                    <h4 className="rc-card__title">
                                      <FormattedMessage id="qualitySafety.shopCat" />
                                    </h4>
                                  </Link>
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

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-textContent">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
                      <h2>
                        <FormattedMessage id="qualitySafety.FoodQualityandSafety" />
                      </h2>
                      <p>
                        <FormattedMessage id="qualitySafety.foodQualityDetail" />
                      </p>
                      <p>
                        <br />
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default QualitySafety;
