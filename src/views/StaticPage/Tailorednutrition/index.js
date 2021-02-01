import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
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
      pageName:'Health and nutrition page'
    }).then(res => {
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
                          <h1>La santé est notre obsession&nbsp;</h1>
                        </div>
                        <div
                          className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <h2>Notre passion pour la santé animale nous a inspiré de nombreuses innovations pour tous les
                            chats et les chiens&nbsp;quels que soient leur âge,&nbsp;leur sensibilité, leur race, leur
                            mode de vie et leurs besoins spécifiques. Depuis plus de 50 ans, nous élaborons des aliments
                            qui soutiennent la santé et favorisent le bien-être des chiots, chatons, chiens et chats
                            dans le monde entier.</h2>
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
                              <h2 className="rc-beta markup-text">Qu'est-ce qu'une alimentation sur mesure?</h2>
                              <p>Nous concevons des aliments pour répondre avec une grande précision à des besoins
                                uniques. Chaque aliment fournit à chaque chat ou chaque chien un complexe complet et
                                équilibré de nutriments et d'acides aminés dont il a besoin pour soutenir sa
                                musculature, préserver son organisme en bonne santé, l'aider à renforcer ses défenses
                                naturelles.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture>
                             <img className="w-100 lazyloaded"
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/SACRED_BIRMAN_KITTEN___BIRTH___GROWTH___BRAND_EMBLEMATIC_Med._Res.___Basic-1.jpg`}
                                alt="Alimentation sur mesure - Chats" title="Alimentation sur mesure - Chats"/>
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
                            <LazyLoad>
                              <img className="w-100 lazyloaded"
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/GERMAN_SHEPHERD_PUPPY___BRAND_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg`}
                                alt="Alimentation sur mesure - Chiens" title="Alimentation sur mesure - Chiens"/>                              
                            </LazyLoad>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div
                              className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">Formules élaborées</h2>
                              <p>Prenez l'exemple du berger allemand : il est particulièrement apprécié pour son
                                courage, sa fidélité et son intelligence. Cependant, malgré sa grande force physique et
                                mentale, le berger allemand est connu pour sa sensibilité digestive. Nous avons donc
                                élaboré une formule adaptée qui contient des protéines facilement assimilables et des
                                fibres spécifiques pour qu'il soit aussi fort à l'intérieur qu'à l'extérieur.</p>
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
                              <h2 className="rc-beta markup-text">Nourrir leur santé</h2>
                              <p>Un jack russell en parfaite santé peut sauter à une hauteur équivalente à six fois sa
                                taille. Favoriser son incroyable potentiel naturel avec des protéines et des
                                antioxydants spécialement sélectionnés permet de répondre à ses besoins spécifiques.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                                    <img className="w-100 lazyloaded"
                                         alt="Chiens - Alimentation en fonction de la taille"
                                         title="Chiens - Alimentation en fonction de la taille"
                                         src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/JACK_RUSSEL_TERRIER_ADULT_-_VET_VHN_Med._Res.___Basic.jpg`}/>                            </picture>
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
                                         src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/ROYAL_CANIN_50_YEARS_IMAGES_PERSIAN_3_12_Med._Res.___Basic.jpg`}/>
                            </picture>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div
                              className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">Des aliments conçus pour répondre à des besoins
                                uniques</h2>
                              <p>De nombreux animaux de compagnie ont une mâchoire spécifique et un comportement
                                particulier qui modifient leur façon de manger. C'est pour cette raison que nous
                                adaptons non seulement nos recettes au niveau nutritionnel, mais que nous étudions aussi
                                la forme et la texture de chaque croquette pour mieux répondre aux besoins physiques de
                                chaque animal.</p>
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
                        <h2>Le résultat</h2><p>Le résultat est une alimentation conçue pour répondre à des besoins de
                        santé particuliers avec une grande précision. Cette alimentation apporte à votre animal un
                        ensemble complet et équilibré de nutriments et d'acides aminés dont il a besoin pour développer
                        des muscles forts, garder un corps en bonne santé et renforcer son système immunitaire.
                        Donnez-lui toute l’énergie nécessaire pour s’épanouir et avoir la meilleure santé possible.</p>
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

export default Tailorednutrition;
