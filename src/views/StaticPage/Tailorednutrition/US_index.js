import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';

import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import LazyLoad from 'react-lazyload';

import { inject, observer } from 'mobx-react';
import BreadCrumbs from '@/components/BreadCrumbs';
import { setSeoConfig } from '@/utils/utils';
import './index.css';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

@inject('checkoutStore', 'loginStore', 'clinicStore', 'configStore')
@injectIntl
@observer
class Tailorednutrition extends React.Component {
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
    setSeoConfig({
      pageName: 'Health and nutrition page'
    }).then(res => {
      this.setState({ seoConfig: res })
    });
  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Health Nutrition',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
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
                          <h1>Health is the Difference</h1>
                        </div>
                        <div
                          className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <h2>Our attention to the unique needs of cats and dogs has taught us that the smallest nutritional difference can make a huge difference to a pet’s health. This obsession with pet health drives us to deliver precise, effective nutrition, and help them become their magnificent best.</h2>
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
                              <h2 className="rc-beta markup-text">What is Tailored Nutrition?</h2>
                              <p>Dogs and cats have unique needs, and we focus on delivering the best possible health nutrition for each of those needs. Each recipe is formulated to deliver the exact level of nutrients that are essential to your pet’s individual health needs.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <LazyLoad>
                              <picture>
                                <img className="w-100 lazyloaded"
                                  src={image1}
                                  alt="Alimentation sur mesure - Chats" title="Alimentation sur mesure - Chats" />
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
                              <picture>
                                <img className="w-100 lazyloaded"
                                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/GERMAN_SHEPHERD_PUPPY___BRAND_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg`}
                                  alt="Alimentation sur mesure - Chiens" title="Alimentation sur mesure - Chiens" />
                              </picture>
                            </LazyLoad>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div
                              className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">Crafted Formulas</h2>
                              <p>Take German Shepherds, for example: we all love them for their courage, loyalty, and intelligence. But for all their strength of body and mind, they have notoriously sensitive stomachs, so we craft their formula with highly digestible proteins and specific fibres to help their insides be as strong as their outsides.</p>
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
                              <h2 className="rc-beta markup-text">Nourishing Their Nature</h2>
                              <p>A Jack Russell in perfect health can jump up to six times their own height. Indoor cats and outdoor cats have very different energy needs. Nourishing their incredible natural potential with specially selected proteins and antioxidants addresses their unique needs.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img className="w-100 lazyloaded"
                                alt="Chiens - Alimentation en fonction de la taille"
                                title="Chiens - Alimentation en fonction de la taille"
                                src={image3} />                            </picture>
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
                            <picture>
                              <img className="w-100 lazyloaded"
                                alt="Alimentation sur mesure - Races" title="Alimentation sur mesure - Races"
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ROYAL_CANIN_50_YEARS_IMAGES_PERSIAN_3_12_Med._Res.___Basic.jpg`} />
                            </picture>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div
                              className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">Unique Formulas For Unique Needs</h2>
                              <p>Many pets have uniquely shaped jaws and behaviour that create challenges to how they eat. That’s why we tailor not only our recipes at a nutritional level, but also design the shape and structure of each kibble to better meet the physical feeding needs of every pet.</p>
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
                        <h2>The Result</h2>
                        <p>The result is nutrition that is designed to address specific health needs with pin-point accuracy. Your pet receives the complete and balanced range of nutrients and amino acids he needs to build strong muscles, maintain a healthy body and support a strong immune system. Giving him all the energy he needs to thrive and live in the very best health possible.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-twoCategories"><div className="rc-max-width--lg rc-padding-x--lg--mobile rc-margin-y--md">
                      <div className=" rc-margin-top--lg">
                        <div className="">
                          <h2 className="rc-alpha inherit-fontsize">Shop Tailored Nutrition For Your Pet</h2>
                          <p className="rc-large-intro rc-margin-bottom--sm"></p>
                        </div>
                        <div className="rc-card-grid rc-match-heights rc-four-column">
                          <div className="rc-grid">
                            <article className="rc-card rc-card--a">
                              <a href="/dogs/">
                                <picture className="" data-rc-feature-objectfillpolyfill-setup="true">

                                  <img className="card__image lazyloaded" data-src={dog} alt="Shop Dog Formulas" title="Shop Dog Formulas" src={dog} />
                                </picture>
                              </a>
                              <div className="rc-card__body">
                                <header>
                                  <a href="/dogs/">
                                    <h4 className="rc-card__title">Shop Dog Formulas</h4></a>
                                  <p className="rc-margin--none"></p>
                                </header>
                              </div>
                            </article>
                          </div>
                          <div className="rc-grid">
                            <article className="rc-card rc-card--a">
                              <a href="/cats/">
                                <picture className="" data-rc-feature-objectfillpolyfill-setup="true">

                                  <img className="card__image lazyloaded" data-src={cat} alt="Shop Cat Formulas" title="Shop Cat Formulas" src={cat} />
                                </picture>
                              </a>
                              <div className="rc-card__body">
                                <header>
                                  <a href="/cats/">
                                    <h4 className="rc-card__title">Shop Cat Formulas</h4></a>
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

            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Tailorednutrition;
