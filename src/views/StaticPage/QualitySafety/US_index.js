import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';

import './index.css';

import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href
class QualitySafety extends React.Component {
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
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig().then(res => {
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
          <BreadCrumbs />

          <div className="experience-region experience-main">

            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-headingBlock">
                    <div className="rc-max-width--md text-center rc-margin-y--md">
                      <div className="rc-alpha inherit-fontsize">
                        <h1><FormattedMessage id="qualitySafety.title" /></h1>
                      </div>
                      <div
                        className="rc-margin-left--lg text-center rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                        <p><FormattedMessage id="qualitySafety.description" /></p>
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
                      <a id="undefined" name="undefined" className="page-section-anchor" aria-hidden="true"></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text"><FormattedMessage id="qualitySafety.foodTitle" /></h2>
                            <p><FormattedMessage id="qualitySafety.foodDetail" /></p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img className="w-100 lazyloaded"
                                alt="Alimentation et processus de sécurité Royal Canin"
                                title="Alimentation et processus de sécurité Royal Canin"
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/DSC_1225Export_All_Lowres-1.jpg`} />
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
                    <div
                      className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                      <a id="undefined" name="undefined" className="page-section-anchor" aria-hidden="true"></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/DSC_0847Export_All_Lowres.jpg`} />
                            </LazyLoad>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div
                            className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text"><FormattedMessage id="qualitySafety.consistentTitle" /></h2>
                            <p><FormattedMessage id="qualitySafety.consistentDetail" /></p>
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
                      <a id="undefined" name="undefined" className="page-section-anchor" aria-hidden="true"></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text"><FormattedMessage id="qualitySafety.materialsTitle" /></h2>
                            <p><FormattedMessage id="qualitySafety.materialsDetail" /></p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img className="w-100 ls-is-cached lazyloaded"
                                alt="Des matières premières de qualité" title="Des matières premières de qualité"
                                src={image3} />
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
                    <div
                      className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                      <a id="undefined" name="undefined" className="page-section-anchor" aria-hidden="true"></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img src={image4} />
                            </LazyLoad>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div
                            className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text"><FormattedMessage id="qualitySafety.rigorousTitle" /></h2>
                            <p><FormattedMessage id="qualitySafety.rigorousDetail" /></p>
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
                      <a id="undefined" name="undefined" className="page-section-anchor" aria-hidden="true"></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text"><FormattedMessage id="qualitySafety.ingredientsTitle" /></h2>
                            <p><FormattedMessage id="qualitySafety.ingredientsDetail" /></p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img className="w-100 ls-is-cached lazyloaded"
                                alt="Des matières premières de qualité" title="Des matières premières de qualité"
                                src={image5} />
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
                  <div className="experience-component experience-assets-twoCategories"><div className="rc-max-width--lg rc-padding-x--lg--mobile rc-margin-y--md">
                    <div className="rc-margin--md rc-padding--sm rc-border-all rc-border-colour--brand1 two-categories-border rc-margin-top--lg" style={{ borderWidth: '3px', borderRadius: '5px' }}>
                      <div className="text-center">
                        <h2 className="rc-alpha inherit-fontsize"><FormattedMessage id="qualitySafety.shopTile" /></h2>
                        <p className="rc-large-intro rc-margin-bottom--sm"></p>
                      </div>
                      <div className="rc-card-grid rc-match-heights rc-four-column">
                        <div className="rc-grid">
                          <article className="rc-card rc-card--a">
                            <Link to="/dogs/">
                              <picture className="" data-rc-feature-objectfillpolyfill-setup="true">
                                <img className="card__image lazyloaded" data-src={dog} alt="Shop Dog Formulas" title="Shop Dog Formulas" src={dog} />
                              </picture>
                            </Link>
                            <div className="rc-card__body">
                              <header>
                                <Link to="/dogs/">
                                  <h4 className="rc-card__title"><FormattedMessage id="qualitySafety.shopDog" /></h4></Link>
                                <p className="rc-margin--none"></p>
                              </header>
                            </div>
                          </article>
                        </div>
                        <div className="rc-grid">
                          <article className="rc-card rc-card--a">
                            <Link to="/cats/">
                              <picture className="" data-rc-feature-objectfillpolyfill-setup="true">

                                <img className="card__image lazyloaded" data-src={cat} alt="Shop Cat Formulas" title="Shop Cat Formulas" src={cat} />
                              </picture>
                            </Link>
                            <div className="rc-card__body">
                              <header>
                                <Link to="/cats/">
                                  <h4 className="rc-card__title"><FormattedMessage id="qualitySafety.shopCat" /></h4></Link>
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
                    <div
                      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
                      <h2><FormattedMessage id="qualitySafety.FoodQualityandSafety" /></h2>
                      <p><FormattedMessage id="qualitySafety.foodQualityDetail" /></p>
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

export default QualitySafety;
