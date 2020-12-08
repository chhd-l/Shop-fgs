import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import cat from './images/cat.jpg';
import dog from './images/dog.jpg';
import { inject, observer } from 'mobx-react';
import './index.css';
import { setSeoConfig } from '@/utils/utils';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Faq from '../../Payment/Fr/faq';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig()
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
        theme: 'Brand'
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

          {process.env.REACT_APP_LANG == 'fr' ? null: <BannerTip />}
          <br/>
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
                          <h1>À propos de Royal Canin</h1>
                        </div>
                        <div
                          className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                          <h2>Comme chez les humains, la santé est essentielle à la qualité de vie des animaux. Chez
                            Royal Canin, nous étudions méticuleusement le moindre détail pour comprendre les besoins
                            spécifiques des chats et des chiens, et élaborer des aliments qui apportent une solution
                            efficace à leurs problèmes de santé.</h2>
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
                              <h2 className="rc-beta markup-text">Notre histoire</h2>
                              <p>Le vétérinaire Jean Cathary a fondé Royal Canin en France en 1968. Le Dr Cathary rêvait
                                d’une entreprise qui produirait des aliments pour animaux en se basant sur la science,
                                mais aussi sur des principes : mieux connaître les animaux, les respecter en toutes
                                circonstances, et créer des aliments de qualité pour chiens et chats conçus en fonction
                                de leurs besoins et non en fonction des désirs de leurs propriétaires.</p>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">

                                    <img className="w-100 ls-is-cached lazyloaded"
                                         data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw087fcb82/About-us/RAGDOLL_ADULT_-_VET_URINARY_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"
                                         alt="Notre histoire" title="Notre histoire"
                                         src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw087fcb82/About-us/RAGDOLL_ADULT_-_VET_URINARY_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"/>
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
                        <a id="Nos valeurs" name="Nos valeurs" className="page-section-anchor" aria-hidden="true"></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                                         <img className="w-100 ls-is-cached lazyloaded"
                                         data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc3acd034/About-us/YORKSHIRE_TERRIER_PUPPY___MOTHER_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"
                                         alt="Les valeurs de Royal Canin" title="Les valeurs de Royal Canin"
                                         src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwc3acd034/About-us/YORKSHIRE_TERRIER_PUPPY___MOTHER_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"/>
                            </picture>
                          </div>
                          <div className=" col-12 col-lg-6">
                            <div
                              className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">Nos valeurs</h2>
                              <p>Découvrez comment nous incarnons ces valeurs tous les jours depuis 50 ans.</p>
                              <a className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                                 href="https://shop.royalcanin.fr/Values.html" title="En savoir plus">En savoir plus</a>
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
                        <a id="Engagement en faveur de la qualité" name="Engagement en faveur de la qualité"
                           className="page-section-anchor" aria-hidden="true"></a>
                        <div className="row align-items-md-center">
                          <div className=" col-12 col-lg-6">
                            <div className="text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                              <h2 className="rc-beta markup-text">Engagement en faveur de la qualité</h2>
                              <p>La qualité nutritionnelle et la sécurité des aliments sont au cœur de tout ce que nous
                                faisons dans le monde.</p>
                              <a className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club"
                                 href="https://shop.royalcanin.fr/Quality-safety.html" title="En savoir plus">En savoir
                                plus</a>
                            </div>
                          </div>
                          <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                                    <img className="w-100 ls-is-cached lazyloaded"
                                         data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6e30f99/About-us/BENGAL_ADULT___FHN_OUTDOOR_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"
                                         alt="Engagement en faveur de la qualité"
                                         title="Engagement en faveur de la qualité"
                                         src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6e30f99/About-us/BENGAL_ADULT___FHN_OUTDOOR_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622&amp;sfrm=jpg"/>
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
                        <h2>Incroyable jusque dans le moindre détail</h2><p>Découvrez en quoi notre passion pour la
                        santé des animaux est à la base de tout ce que nous entreprenons.</p>
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

export default AboutUs;
