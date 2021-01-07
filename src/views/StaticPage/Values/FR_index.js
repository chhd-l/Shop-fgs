import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import LazyLoad from 'react-lazyload';
import { setSeoConfig } from '@/utils/utils';
import { Helmet } from 'react-helmet';

import './index.css';
import FrTips from '../Help/fr/frTips';
import FrFaq from '../Help/fr/frFaq';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href

class Help extends React.Component {
  constructor(props){
    super(props)
    this.state={
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
      this.setState({seoConfig: res})
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
        <BannerTip/>

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
                          <h1>La santé est notre obsession</h1>
                        </div>
                        <div
                          className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <p>Tout ce que nous faisons est motivé par notre passion pour la santé et le bien-être de
                            chaque chien et chat.</p>
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
                              <h2>Respecter leur nature</h2><p>Nous respectons les chats et les chiens pour ce qu'ils
                              sont : des animaux de compagnie incroyables. Ce respect est né d'une connaissance
                              approfondie de leur vraie nature et de leurs besoins uniques. Ce respect guide chacune de
                              nos décisions quant à nos produits et services, tout en façonnant notre attitude en tant
                              qu'entreprise.</p><p><br/></p><h2>Les animaux de compagnie en premier</h2><p>Nous faisons
                              toujours passer les besoins des animaux de compagnie en premier. Cela nous donne un
                              objectif clair pour orienter nos recherches, renforce la qualité nutritionnelle de tous
                              nos produits et aide les chats et les chiens à vivre plus longtemps et en meilleure
                              santé.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                             <img className="w-100 lazyloaded"
                                         data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw62f4b1b6/Values/POMERANIAN_ADULT___BRAND_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"
                                         alt="Les animaux de compagnie en premier"
                                         title="Les animaux de compagnie en premier"
                                         src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw62f4b1b6/Values/POMERANIAN_ADULT___BRAND_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"/>
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
                              <img className="w-100 lazyloaded"
                                         data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5420afb8/Values/BRITISH_SHORT_HAIR_ADULT_-_BREED_EMBLEMATIC_High_Res.___Print.jpg?sw=622&amp;sfrm=jpg"
                                         alt="Une passion pour les animaux de compagnie"
                                         title="Une passion pour les animaux de compagnie"
                                         src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5420afb8/Values/BRITISH_SHORT_HAIR_ADULT_-_BREED_EMBLEMATIC_High_Res.___Print.jpg?sw=622&amp;sfrm=jpg"/>
                            </picture>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2>Une précision absolue</h2><p>Nos connaissances et notre expérience approfondies nous
                              ont permis de bien comprendre les besoins des animaux de compagnie et les nutriments
                              nécessaires pour les garder en parfaite santé. Cette précision garantit la haute
                              performance de nos aliments, que ce soit leur forme, leur texture, leur appétence, leur
                              digestibilité, leur innocuité ou leur traçabilité.</p><p><br/></p><h2>Une passion pour les
                              animaux de compagnie</h2><p>Nous mettons tout notre cœur et notre âme dans tout ce que
                              nous faisons, et notre passion pour rendre le monde meilleur pour les animaux de compagnie
                              et leurs maître est authentique.</p>
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
                              <h2>La quête du savoir</h2><p>Notre compréhension approfondie des besoins des chiens et
                              des chats nous permet de créer la nutrition santé pour animaux la plus précise au monde.
                              Nous n'arrêtons jamais d'apprendre et ne tenons jamais rien pour acquis. C'est pourquoi,
                              nous collaborons avec des experts scientifiques, vétérinaires et comportementaux, et nous
                              entretenons un dialogue permanent avec les possesseurs de chats et de chiens du monde
                              entier.</p><p><br/></p><h2>L'obsession pour la santé animale</h2><p>Toutes nos actions sont
                              motivées par notre passion pour la santé et le bien-être de chaque chien et chat.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img className="w-100 lazyloaded"
                                         data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw1b6e9848/Values/LABRADOR_PUPPY_-_BIRTH___GROWTH_EMBLEMATIC_Med._Res.___Basic-(1).jpg?sw=622&amp;sfrm=jpg"
                                         alt="L'obsession pour la santé animale"
                                         title="L'obsession pour la santé animale"
                                         src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw1b6e9848/Values/LABRADOR_PUPPY_-_BIRTH___GROWTH_EMBLEMATIC_Med._Res.___Basic-(1).jpg?sw=622&amp;sfrm=jpg"/>
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
                        <h3>Développement durable</h3><p>Grâce à notre approche en matière de développement durable,
                        nous sommes sûrs d'offrir aux animaux, aux personnes et à la planète le respect qu’ils
                        méritent.</p><p><br/></p><h3>Science, Santé et Nutrition</h3><p>Notre travail s’appuie sur un
                        vaste socle évolutif de connaissances scientifiques en matière de santé et de nutrition
                        animale.&nbsp;</p>
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
          </div>




        </main>
        <Footer />
      </div>
    );
  }
}

export default Help;
