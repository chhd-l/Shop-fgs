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

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class CatNutrition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {

  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand'
      }
    };
    return (
      <div className="recommendation">
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
                  <div className="experience-component experience-assets-contentBlock">
                    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--xl" style={{ maxWidth: '1400px' }}>
                      <a className="page-section-anchor" aria-hidden="true"></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <source media="(max-width:640px)" data-srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=350&sh=233&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=700&sh=466&sm=cut&sfrm=jpg 2x" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=350&sh=233&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=700&sh=466&sm=cut&sfrm=jpg 2x">
                            </source>
                            <source media="(min-width:640px) and (max-width:769px)" data-srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=700&sh=466&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=1400&sh=933&sm=cut&sfrm=jpg 2x" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=700&sh=466&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=1400&sh=933&sm=cut&sfrm=jpg 2x">
                            </source>
                            <source media="(min-width:769px)" data-srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=600&sh=400&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=1200&sh=800&sm=cut&sfrm=jpg 2x" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=600&sh=400&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=1200&sh=800&sm=cut&sfrm=jpg 2x">
                            </source>
                            <img className="w-100 lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=600&sh=400&sm=cut&sfrm=jpg" alt="Aliments pour chats" title="Aliments pour chats" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwb6af62fc/Breed-Cats-&-Dogs/CAT-1A.jpg?sw=600&sh=400&sm=cut&sfrm=jpg"></img>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">La nutrition santé la plus précise pour les chats</h2>
                            <p>Chaque formule a été conçue pour fournir une nutrition adaptée aux besoins de santé de votre chat, quels que soient sa race, son âge ou son mode de vie.</p>
                            <a className="rc-btn rc-btn--two gtm-content-block-btn js-hnc-try-the-club" href="https://shop.royalcanin.fr/cats/" title="Afficher tous les produits">Afficher tous les produits</a>
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
                  <div className="experience-component experience-assets-importContentAsset">
                    <div className="content-asset">
                      <div className="product-reco rc-sm-up">
                        <div className="rc-max-width--lg">
                          <div className="rc-margin-bottom--sm rc-padding--none">
                            <h4 className="rc-gamma text-center">Nos meilleures ventes</h4>
                          </div>
                          <div class="rc-carousel rc-carousel--cards rc-match-heights" data-js-carousel="" data-rc-cards="true" data-rows="6" data-rc-prev="prev" data-rc-next="next">
                              <div class="rc-carousel__card-gal">
                                <article class="rc-card rc-card--b">
                                  <button class="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography" aria-label="Like">
                                    <span class="rc-screen-reader-text">Like</span>
                                  </button>
                                  <picture class="rc-card__image">
                                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text" />
                                  </picture>
                                  <div class="rc-card__body">
                                    <header>
                                      <p class="rc-card__meta">Meta 1</p>
                                      <h1 class="rc-card__title">Headline</h1>
                                    </header>
                                  </div>
                                </article>
                                <article class="rc-card rc-card--b">
                                  <button class="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography" aria-label="Like">
                                    <span class="rc-screen-reader-text">Like</span>
                                  </button>
                                  <picture class="rc-card__image">
                                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text" />
                                  </picture>
                                  <div class="rc-card__body">
                                    <header>
                                      <p class="rc-card__meta">Meta 1</p>
                                      <h1 class="rc-card__title">Headline</h1>
                                    </header>
                                  </div>
                                </article>
                                <article class="rc-card rc-card--b">
                                  <button class="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography" aria-label="Like">
                                    <span class="rc-screen-reader-text">Like</span>
                                  </button>
                                  <picture class="rc-card__image">
                                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text" />
                                  </picture>
                                  <div class="rc-card__body">
                                    <header>
                                      <p class="rc-card__meta">Meta 1</p>
                                      <h1 class="rc-card__title">Headline</h1>
                                    </header>
                                  </div>
                                </article>
                                <article class="rc-card rc-card--b">
                                  <button class="rc-card__action rc-btn rc-btn--action rc-btn--action--inverse rc-icon rc-like--xs rc-iconography" aria-label="Like">
                                    <span class="rc-screen-reader-text">Like</span>
                                  </button>
                                  <picture class="rc-card__image">
                                    <img src="https://placehold.it/800x600?text=4:3" alt="alt text" />
                                  </picture>
                                  <div class="rc-card__body">
                                    <header>
                                      <p class="rc-card__meta">Meta 1</p>
                                      <h1 class="rc-card__title">Headline</h1>
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
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-headingBlock">
                    <div className="rc-max-width--md text-center rc-margin-y--md">
                      <div className="rc-beta inherit-fontsize">
                        <h3>Notre engagement en faveur de la qualité</h3>
                      </div>
                      <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--sm heading-block-content">
                        <p>La qualité nutritionnelle et la sécurité des aliments sont au cœur de tout ce que nous faisons dans le monde. </p>
                      </div>
                      <a href="https://shop.royalcanin.fr/Quality-safety.html" className="rc-btn rc-btn--one ">En savoir plus</a>
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

export default CatNutrition;
