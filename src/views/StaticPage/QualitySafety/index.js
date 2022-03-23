import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { seoHoc } from '@/framework/common';
import LazyLoad from 'react-lazyload';

import './index.css';
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
                      <div className="rc-margin-left--lg text-center rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
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
                                alt="Alimentation et processus de sécurité Royal Canin"
                                title="Alimentation et processus de sécurité Royal Canin"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/DSC_1225Export_All_Lowres-1.jpg`}
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
                                alt="export all lowres image"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/DSC_0847Export_All_Lowres.jpg`}
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
                              Des matières premières de qualité
                            </h2>
                            <p>
                              Nous choisissons les ingrédients en fonction de
                              leur valeur nutritionnelle élevée et de leurs
                              bénéfices pour la santé des animaux. Par exemple,
                              nous n’utilisons que de la viande et du poisson
                              issus de la chaîne alimentaire humaine. Royal
                              Canin met tout en œuvre pour s’approvisionner en
                              matières premières auprès de fournisseurs agréés
                              proches des centres de production, ce qui soutient
                              l’économie locale, garantit la fraîcheur des
                              produits et réduit l’empreinte carbone.
                            </p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                alt="Des matières premières de qualité"
                                title="Des matières premières de qualité"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/2015-Pet-Center-pictures-Campus-Royal-Canin-000004.jpg`}
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
                  <div className="experience-component experience-assets-textContent">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
                      <h2>Une sélection rigoureuse des fournisseurs</h2>
                      <p>
                        Nous appliquons des critères de sélection rigoureux pour
                        choisir les fournisseurs en mesure de nous aider à
                        maintenir les normes de qualité et de sécurité les plus
                        élevées du secteur. Dans ce cadre, nous conduisons des
                        audits approfondis pour déterminer la valeur
                        nutritionnelle, la qualité de la production, la
                        traçabilité et les normes de développement durable.
                      </p>
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
                      <h2>Ingrédients entièrement traçables</h2>
                      <p>
                        100 % des matières premières utilisées sont analysées et
                        un échantillon de chacune d'entre elles est conservé
                        pendant deux ans. Nous sommes ainsi en mesure de tracer
                        d'un bout à l'autre de la chaîne chaque matière première
                        pendant toute la durée de commercialisation du produit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width"></div>
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
