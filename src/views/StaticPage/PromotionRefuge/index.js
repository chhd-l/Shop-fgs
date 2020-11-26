import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';

const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class PromotionRefuge extends React.Component {
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
                    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--xl">
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <source media="(max-width: 640px)" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=350&sh=233&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=700&sh=466&sm=cut&sfrm=png 2x" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=350&sh=233&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=700&sh=466&sm=cut&sfrm=png 2x">
                            </source>
                            <source media="(min-width: 640px) and (max-width: 769px)" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=700&sh=466&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=1400&sh=933&sm=cut&sfrm=png 2x" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=700&sh=466&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=1400&sh=933&sm=cut&sfrm=png 2x">
                            </source>
                            <source media="(min-width: 769px)" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=600&sh=400&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=1200&sh=800&sm=cut&sfrm=png 2x" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=600&sh=400&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=1200&sh=800&sm=cut&sfrm=png 2x">
                            </source>
                            <img className="w-100 lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=600&sh=400&sm=cut&sfrm=png" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwa52ec6c0/promotion-refuge/20201019-Image-banner-LP.jpg?sw=600&sh=400&sm=cut&sfrm=png"></img>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">Nos promotions suite aux adoptions en refuge</h2>
                            <p><span style={{color:'black'}}>Vous avez adopté un compagnon à quatre pattes dans un refuge ou au sein d'une association ? Pour vous remercier d'offrir une seconde chance à un chien ou chat dans le besoin, bénéficiez de réductions sur les produits ROYAL CANIN. </span></p>
                            <p><span style={{color:'black'}}> Découvrez notre formule abonnement et profitez de 10% sur toutes vos commandes ! Des réductions sont également applicables sur notre boutique en ligne : 4€, 5€ ou 12€ de remise sur tous les produits ROYAL CANIN si vous avez adoptez un animal dans un refuge.</span></p>
                            <a className="rc-btn rc-btn--one gtm-content-block-btn js-hnc-try-the-club" href="https://shop.royalcanin.fr/subscription-landing.html" title="En savoir plus">En savoir plus</a>
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
                          123
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
                  <div className="experience-component experience-assets-twoColImgText">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
                        <h2 className="rc-beta rc-margin--none text-center rc-padding-x--lg--mobile">10% de réduction en souscrivant à l’Abonnement</h2>
                      </div>
                      <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
                        <div className="col-6 col-md-3 rc-column">
                          <div className="rc-margin-bottom--sm">
                            <img className="m-auto w-auto lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwba8f57fe/Homepage/pack@2x.png?sw=180&sh=180&sm=cut&sfrm=png" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwba8f57fe/Homepage/pack@2x.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwba8f57fe/Homepage/pack@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" alt="Sachet Royal Canin" title="Sachet Royal Canin" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwba8f57fe/Homepage/pack@2x.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwba8f57fe/Homepage/pack@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwba8f57fe/Homepage/pack@2x.png?sw=180&sh=180&sm=cut&sfrm=png"></img>
                          </div>
                          <p>
                            <span style={{color:'black'}}>Ajoutez les produits nutritionnels </span>
                            <strong style={{color:'black'}}>répondant aux besoins de votre animal</strong>
                            <span style={{color:'black'}}> dans votre panier. </span>
                          </p>
                        </div>
                        <div className="col-6 col-md-3 rc-column">
                          <div className="rc-margin-bottom--sm">
                            <img className="m-auto w-auto lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw3df20153/Homepage/autoship@2x.png?sw=180&sh=180&sm=cut&sfrm=png" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw3df20153/Homepage/autoship@2x.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw3df20153/Homepage/autoship@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" alt="Expédition automatique" title="Expédition automatique" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw3df20153/Homepage/autoship@2x.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw3df20153/Homepage/autoship@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw3df20153/Homepage/autoship@2x.png?sw=180&sh=180&sm=cut&sfrm=png"></img>
                          </div>
                          <p>
                            <span style={{color:'black'}}>Sélectionnez l’ </span>
                            <strong style={{color:'black'}}>expédition automatique </strong>
                            <span style={{color:'black'}}> et entrez votre mode de paiement. </span>
                          </p>
                        </div>
                        <div className="col-6 col-md-3 rc-column">
                          <div className="rc-margin-bottom--sm">
                            <img className="m-auto w-auto lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw7b5d0b72/spt-breeder-reco/icon3.png?sw=180&sh=180&sm=cut&sfrm=png" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw7b5d0b72/spt-breeder-reco/icon3.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw7b5d0b72/spt-breeder-reco/icon3.png?sw=200&sh=200&sm=cut&sfrm=png 2x" alt="Livraison simplifiée" title="Livraison simplifiée" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw7b5d0b72/spt-breeder-reco/icon3.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw7b5d0b72/spt-breeder-reco/icon3.png?sw=200&sh=200&sm=cut&sfrm=png 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw7b5d0b72/spt-breeder-reco/icon3.png?sw=180&sh=180&sm=cut&sfrm=png"></img>
                          </div>
                          <p>
                            <strong style={{color:'black'}}>Recevez votre produit automatiquement  </strong>
                            <span style={{color:'black'}}> en fonction de votre calendrier. </span>
                          </p>
                        </div>
                        <div className="col-6 col-md-3 rc-column">
                          <div className="rc-margin-bottom--sm">
                            <img className="m-auto w-auto lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw71726296/spt-breeder-reco/icon4.png?sw=180&sh=180&sm=cut&sfrm=png" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw71726296/spt-breeder-reco/icon4.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw71726296/spt-breeder-reco/icon4.png?sw=200&sh=200&sm=cut&sfrm=png 2x" alt="Abonnement flexible" title="Abonnement flexible" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw71726296/spt-breeder-reco/icon4.png?sw=180&sh=180&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw71726296/spt-breeder-reco/icon4.png?sw=200&sh=200&sm=cut&sfrm=png 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw71726296/spt-breeder-reco/icon4.png?sw=180&sh=180&sm=cut&sfrm=png"></img>
                          </div>
                          <p>
                            <span style={{color:'black'}}> Modifiez vos préférences à  </span>
                            <strong style={{color:'black'}}>tout moment  </strong>
                            <span style={{color:'black'}}> . </span>
                          </p>
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
                  <div className="experience-component experience-assets-contactOptionsBlock">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile contact_options">
                      <h2 className="rc-beta text-center">Besoin d’aide?</h2>
                      <div className="rc-intro inherit-fontsize text-center contact_options__subheading">
                        <p>
                          <span style={{color:'black'}}>Nos conseillers sont de vrais experts et passionnés. Ils se tiennent à votre disposition pour répondre à toute demande.</span>
                        </p>
                      </div>
                      <div className="rc-layout-container rc-three-column rc-match-heights rc-padding-bottom--lg rc-max-width--lg">
                        <div className="rc-column rc-padding--none">
                          <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                            <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                  <div>
                                    <b style={{color:'#00A4A6'}}>Par téléphone</b>
                                    <p>
                                      Appel Gratuit (depuis un poste fixe) 
                                      <span style={{color:'rgb(23,43,77)'}}>De 8h30 à 12h30 et de 14h à 17h du lundi au vendredi</span>
                                    </p>
                                    <div className="rc-margin-top--xs">
                                      <a href="tel:0800-005-360" style={{color:"#00A4A6"}}>0800-005-360</a>
                                    </div>
                                  </div>
                                </div>
                                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                  <img className="align-self-center widthAuto lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=100&sh=100&sm=cut&sfrm=jpg" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=100&sh=100&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=200&sh=200&sm=cut&sfrm=jpg 2x" alt="Par téléphone" title="Par téléphone" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=100&sh=100&sm=cut&sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=200&sh=200&sm=cut&sfrm=jpg 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw50dca061/Help/customer-service@2x.png?sw=100&sh=100&sm=cut&sfrm=jpg"></img>
                                </div>
                              </div>
                            </div>
                          </article>
                        </div>
                        <div className="rc-column rc-padding--none">
                          <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                            <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                  <div>
                                    <b style={{color:'#00A4A6'}}>Par mail</b>
                                    <p>
                                      Nous vous répondons sous deux jours ouvrés.
                                    </p>
                                    <div className="rc-margin-top--xs">
                                      <a href="https://shop.royalcanin.fr/help/contact" className="rc-styled-link nowrap">Envoyer un email</a>
                                    </div>
                                  </div>
                                </div>
                                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                  <img className="align-self-center widthAuto lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw15f805cd/promotion-refuge/Emailus_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw15f805cd/promotion-refuge/Emailus_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw15f805cd/promotion-refuge/Emailus_icon@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" alt="Par mail" title="Par mail" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw15f805cd/promotion-refuge/Emailus_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw15f805cd/promotion-refuge/Emailus_icon@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw15f805cd/promotion-refuge/Emailus_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png"></img>
                                </div>
                              </div>
                            </div>
                          </article>
                        </div>
                        <div className="rc-column rc-padding--none">
                          <article className="rc-full-width rc-column rc-padding-left--none--desktop">
                            <div className="rc-border-all rc-border-colour--interface fullHeight contact_options__card">
                              <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight">
                                <div className="rc-column rc-double-width rc-padding-top--md--mobile text-center text-md-left rc-padding-right--none--desktop">
                                  <div>
                                    <b style={{color:'#00A4A6'}}>Des questions?</b>
                                    <p>
                                      Vous pouvez également consulter notre rubrique 
                                      <a href="https://staging-eu01-marsuk.demandware.net/on/demandware.store/Sites-Site/default/ViewLdsBusinessManagerScreen-PageDesigner/https://shop.royalcanin.fr/on/demandware.store/Sites-FR-Site/fr_FR/Page-Show?%2520%27cid%27=%2520%27faq%27" target="_self" data-link-type="page" data-link-label="FAQ" data-content-page-id="faq" style={{backgroundColor:'white',color:"rgb(236,0,26)"}}>FAQ</a>qui vous apportera de nombreuses réponses.
                                    </p>
                                  </div>
                                </div>
                                <div className="rc-column rc-content-v-middle rc-padding-top--sm--mobile">
                                  <img className="align-self-center widthAuto lazyloaded" data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwac7da587/promotion-refuge/FAQ_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwac7da587/promotion-refuge/FAQ_icon@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwac7da587/promotion-refuge/FAQ_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwac7da587/promotion-refuge/FAQ_icon@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" alt="FAQ" title="FAQ" srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwac7da587/promotion-refuge/FAQ_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwac7da587/promotion-refuge/FAQ_icon@2x.png?sw=200&sh=200&sm=cut&sfrm=png 2x" src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dwac7da587/promotion-refuge/FAQ_icon@2x.png?sw=100&sh=100&sm=cut&sfrm=png"></img>
                                </div>
                              </div>
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
        </main>
        <Footer />
      </div>
    );
  }
}

export default PromotionRefuge;
