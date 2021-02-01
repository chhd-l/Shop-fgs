import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import Carouselem from '@/components/Carouselem';
import './index.css';
import LazyLoad from 'react-lazyload';
import { list1 } from './goods';
import { Link } from 'react-router-dom';

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
                    <div
                      className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile rc-max-width--xl"
                      style={{ maxWidth: '1400px' }}
                    >
                      <a className="page-section-anchor" aria-hidden="true"></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                className="w-100 lazyloaded"
                                alt="Aliments pour chats"
                                title="Aliments pour chats"
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/CAT-1A.jpg`}
                              />
                            </LazyLoad>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              La nutrition santé la plus précise pour les chats
                            </h2>
                            <p>
                              Chaque formule a été conçue pour fournir une
                              nutrition adaptée aux besoins de santé de votre
                              chat, quels que soient sa race, son âge ou son
                              mode de vie.
                            </p>
                            <Link
                              className="rc-btn rc-btn--two gtm-content-block-btn js-hnc-try-the-club"
                              to="/cats"
                              title="Afficher tous les produits"
                            >
                              Afficher tous les produits
                            </Link>
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
                      <div className="product-reco">
                        <div className="rc-max-width--lg">
                          <div className="rc-margin-bottom--sm rc-padding--none">
                            <h4 className="rc-gamma text-center">
                              Nos meilleures ventes
                            </h4>
                          </div>
                          <Carouselem list={list1} />
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
                        <p>
                          La qualité nutritionnelle et la sécurité des aliments
                          sont au cœur de tout ce que nous faisons dans le
                          monde.{' '}
                        </p>
                      </div>
                      <Link
                        to="/Quality-safety"
                        className="rc-btn rc-btn--one "
                      >
                        En savoir plus
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-valueProposition">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        Pourquoi choisir Royal Canin ?
                      </h4>
                      <div className="value-proposition__container">
                        <div className="row mx-0">
                          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                              <LazyLoad>
                                <img
                                  className="value-proposition__img lazyloaded"
                                  alt="Camion Royal Canin"
                                  title="Camion Royal Canin"
                                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/4B.png`}
                                />
                              </LazyLoad>
                              <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                  Livraison gratuite et rapide
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                              <LazyLoad>
                                <img
                                  className="value-proposition__img lazyloaded"
                                  alt="Serveur de paiement sécurisé"
                                  title="Serveur de paiement sécurisé"
                                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/4C.png`}
                                />
                              </LazyLoad>
                              <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                  Paiement sécurisé
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                              <LazyLoad>
                                <img
                                  className="value-proposition__img lazyloaded"
                                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/4D.png`}
                                />
                              </LazyLoad>
                              <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                  Qualité certifiée
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                              <LazyLoad>
                                <img
                                  className="value-proposition__img lazyloaded"
                                  src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/4E.png`}
                                />
                              </LazyLoad>
                              <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">
                                  La nutrition santé livrée à votre domicile
                                </p>
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
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-contentBlock">
                    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile  rc-max-width--lg">
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <LazyLoad>
                              <img
                                className="w-100 lazyloaded"
                                src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CatNutrition/CAT 6A.jpg`}
                              />
                            </LazyLoad>
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              Les chats ont besoin d'une alimentation adaptée à
                              leurs besoins{' '}
                            </h2>
                            <p>
                              Depuis plus de 50 ans, nous étudions les besoins
                              nutritionnels et physiologiques de tous les chats
                            </p>
                            <a
                              className="rc-btn rc-btn--two gtm-content-block-btn js-hnc-try-the-club"
                              href="https://www.royalcanin.com/fr/cats/kitten/kitten-feeding-and-nutrition"
                              title="En savoir plus"
                            >
                              En savoir plus
                            </a>
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

export default CatNutrition;
