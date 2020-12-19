import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { setSeoConfig } from '@/utils/utils';
import LazyLoad from 'react-lazyload';

import './index.css';

const localItemRoyal = window.__.localItemRoyal;
class QualitySafety extends React.Component {
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig();
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
                        <h1>Engagement en faveur de la qualité et de la sécurité alimentaire</h1>
                      </div>
                      <div
                        className="rc-margin-left--lg text-center rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                        <p>Au cours des cinquante dernières années, Royal Canin a placé la qualité nutritionnelle et la
                          sécurité des aliments au cœur de ses activités dans le monde entier. Cette attention portée au
                          moindre détail nous aide à fournir la nutrition santé la plus précise et la plus efficace pour
                          les animaux de compagnie.</p>
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
                            <h2 className="rc-beta markup-text">Alimentation et processus de sécurité Royal Canin</h2>
                            <p>L’excellence de nos procédés de fabrication nous permet de produire des aliments sûrs et
                              de grande qualité dans le monde entier. Nos experts en approvisionnement usent des mêmes
                              processus de sélection et d’achat pour l’ensemble des matières premières et des
                              fournisseurs, afin de garantir que tous nos produits sont soumis aux mêmes normes
                              nutritionnelles rigoureuses.</p><p>Grâce à des audits précis des fournisseurs locaux,
                            toutes les matières premières utilisées dans nos usines sont totalement conformes. Chaque
                            livraison est inspectée en laboratoire, où sont testés tous les indicateurs de sécurité
                            alimentaire (qualité nutritionnelle, protéines, lipides et digestibilité, ainsi que présence
                            de mycotoxines et oxydation), avant de rejoindre nos centres de production.&nbsp;</p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <LazyLoad>
                                  <img className="w-100 lazyloaded"
                                       data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwf48ac3b5/Quality-safety/DSC_1225Export_All_Lowres-1.jpg?sw=622&amp;sfrm=jpg"
                                       alt="Alimentation et processus de sécurité Royal Canin"
                                       title="Alimentation et processus de sécurité Royal Canin"
                                       src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwf48ac3b5/Quality-safety/DSC_1225Export_All_Lowres-1.jpg?sw=622&amp;sfrm=jpg"/>
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
                                <img src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb1da6192/Quality-safety/DSC_0847Export_All_Lowres.jpg?sw=622&amp;sfrm=jpg"/>
                              </LazyLoad>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div
                            className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">Qualité constante</h2>
                            <p>Partout dans le monde, les 1800 agents de production alimentaire suivent le même
                              processus rigoureux garantissant constance et qualité. Des contrôles de qualité des
                              systèmes sont réalisés à chaque étape de la production et un test final est effectué sur
                              l’ensemble des lignes de produits avant expédition. Chaque année, 500 000 analyses sont
                              pratiquées dans le monde. Nos distributeurs respectent les normes de sécurité et de
                              logistique, et leurs conditions de stockage et de transport font régulièrement l’objet de
                              contrôles. Ces procédures garantissent la qualité, la sécurité et la valeur nutritionnelle
                              optimale de nos produits.&nbsp;</p>
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
                            <h2 className="rc-beta markup-text">Des matières premières de qualité</h2>
                            <p>Nous choisissons les ingrédients en fonction de leur valeur nutritionnelle élevée et de
                              leurs bénéfices pour la santé des animaux. Par exemple, nous n’utilisons que de la viande
                              et du poisson issus de la chaîne alimentaire humaine. Royal Canin met tout en œuvre pour
                              s’approvisionner en matières premières auprès de fournisseurs agréés proches des centres
                              de production, ce qui soutient l’économie locale, garantit la fraîcheur des produits et
                              réduit l’empreinte carbone.</p>
                          </div>
                        </div>
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <LazyLoad>
                                  <img className="w-100 ls-is-cached lazyloaded"
                                       data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw97202e87/Quality-safety/2015-Pet-Center-pictures-Campus-Royal-Canin-000004.jpg?sw=622&amp;sfrm=jpg"
                                       alt="Des matières premières de qualité" title="Des matières premières de qualité"
                                       src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw97202e87/Quality-safety/2015-Pet-Center-pictures-Campus-Royal-Canin-000004.jpg?sw=622&amp;sfrm=jpg"/>
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
                    <div
                      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext text-center ">
                      <h2>Une sélection rigoureuse des fournisseurs</h2><p>Nous appliquons des critères de sélection
                      rigoureux pour choisir les fournisseurs en mesure de nous aider à maintenir les normes de qualité
                      et de sécurité les plus élevées du secteur. Dans ce cadre, nous conduisons des audits approfondis
                      pour déterminer la valeur nutritionnelle, la qualité de la production, la traçabilité et les
                      normes de développement durable.</p>
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
                      <h2>Ingrédients entièrement traçables</h2><p>100 % des matières premières utilisées sont analysées
                      et un échantillon de chacune d'entre elles est conservé pendant deux ans. Nous sommes ainsi en
                      mesure de tracer d'un bout à l'autre de la chaîne chaque matière première pendant toute la durée
                      de commercialisation du produit.</p>
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



        </main>
        <Footer />
      </div>
    );
  }
}

export default QualitySafety;
