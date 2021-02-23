import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import LazyLoad from 'react-lazyload';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

import './index.css';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

class Values extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
    }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig().then(res => {
      this.setState({ seoConfig: res })
    });
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
      <div className="recommendation">
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
                          <h1>Health Is Our Obsession</h1>
                        </div>
                        <div
                          className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <p>The health and wellbeing of every cat and dog is at the center of everything we do.</p>
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
                            <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2>Respect Their Nature</h2><p>We respect cats and dogs for the incredible animals they are. This respect is born from a deep knowledge of their true nature and their unique functional needs. It informs every decision we make about our products and services, while shaping the way we behave as a business.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <LazyLoad>
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <img className="w-100 lazyloaded" alt="Les animaux de compagnie en premier" title="Les animaux de compagnie en premier" src={image1} />
                              </picture>
                            </LazyLoad>
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
                            <LazyLoad>
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <img className="w-100 lazyloaded"
                                  alt="Une passion pour les animaux de compagnie"
                                  title="Une passion pour les animaux de compagnie"
                                  src={image2} />
                              </picture>
                            </LazyLoad>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2>Precision in Everything</h2>
                              <p>Our deep knowledge and experience has given us a precise understanding of the needs of pets, and the nutrients required to keep them at their magnificent best. This precision ensures the high performance of every aspect of our products - from the shape, texture, palatability and digestibility, to the safety and traceability.</p>
                              <p><br /></p>
                              <h2>A Passion For Pets</h2>
                              <p>We put our heart and soul into everything we do, and act with a genuine commitment to make a better world for pets and pet owners worldwide.</p>
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
                            <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2>Never Stop Learning</h2>
                              <p>The more we genuinely understand, the better placed we are to provide nutritional solutions that make a real, positive difference. We never stop learning and never take anything for granted. That’s why we maintain an ongoing dialogue with scientific and professional experts as well as cat and dog owners.</p>
                              <p><br /></p>
                              <h2>Health Is Our Obsession</h2>
                              <p>Everything we do is driven by our passion for the health and wellbeing of every cat and dog.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <LazyLoad>
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <img className="w-100 lazyloaded"
                                  alt="L'obsession pour la santé animale"
                                  title="L'obsession pour la santé animale"
                                  src={image3} />
                              </picture>
                            </LazyLoad>
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
                            <LazyLoad>
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <img className="w-100 lazyloaded"
                                  alt="Une passion pour les animaux de compagnie"
                                  title="Une passion pour les animaux de compagnie"
                                  src={image4} />
                              </picture>
                            </LazyLoad>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2>Sustainability</h2>
                              <p>Our approach to sustainability ensures we show pets, people and the planet the respect they deserve.</p>
                              <p><br /></p>
                              <h2>Committed to Quality</h2>
                              <p>Nutritional quality and product safety sit at the heart of everything we do worldwide.</p>
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
                    <div className="experience-component experience-assets-ctaBlock"><div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="d-flex justify-content-center">
                        <div className="rc-border-all rc-border-colour--interface rc-padding--sm rc-padding--lg--mobile text-center col-lg-4">
                          <h5 className="rc-beta markup-text">Tailored Nutrition</h5>
                          <p>Our work is based on a vast and growing scientific understanding of pet health and nutrition.</p>
                          <a className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club" href="/Tailorednutrition" title="Learn more">Learn more</a>
                        </div>
                      </div>
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

export default Values;
