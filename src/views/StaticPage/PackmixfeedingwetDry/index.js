import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import image1 from './images/image1.jpg';
import image4B from './images/4B.png';
import image4C from './images/4C.png';
import image4D from './images/4D.png';
import image4E from './images/4E.png';
import imagecat from './images/cat-autoship.png';
import imagedog from './images/dog-autoship.png';

import BannerTip from '@/components/BannerTip';
import LazyLoad from 'react-lazyload';
import { list1, list2 } from './goods';

import './index.css';

const localItemRoyal = window.__.localItemRoyal;

class Packfeed extends React.Component {
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {}

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand'
      }
    };
    return (
      <div className="recommendation recommendation_PackmixfeedingwetDry">
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
          <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--xl">
            <a
              id="undefined"
              name="undefined"
              className="page-section-anchor"
              aria-hidden="true"
            ></a>
            <div className="row align-items-md-center">
              <div className=" col-12 col-lg-6">
                <div className=" text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                  <h2 className="rc-beta markup-text" style={{fontSize: '2rem'}}>
                    Quels sont les avantages de nos combinaisons alimentaires
                    pour chiens et chats ?
                  </h2>
                  <p>
                    Chez ROYAL CANIN®, nous savons que les animaux ont des
                    besoins spécifiques en fonction de leur race, leur taille ou
                    leur âge. Afin de répondre au mieux aux différents profils,
                    nous avons lancé différents packs pour chiens et chats. Ces
                    assortiments permettent de répondre au mieux aux besoins de
                    votre animal, grâce à deux technologies : les croquettes et
                    les bouchées en sauce.
                  </p>
                  <p>
                    Choisissez parmi nos assortiments pour chiens et chats le
                    pack le plus adapté à votre animal.
                  </p>
                </div>
              </div>
              <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
              <LazyLoad>
                <img src={image1} style={{ width: '100%' }} alt="" />
              </LazyLoad>

                {/* <picture data-rc-feature-objectfillpolyfill-setup="true">
                  <source
                    media="(max-width: 640px)"
                    data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=350&amp;sh=233&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=700&amp;sh=466&amp;sm=cut&amp;sfrm=jpg 2x"
                    srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=350&amp;sh=233&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=700&amp;sh=466&amp;sm=cut&amp;sfrm=jpg 2x"
                  />
                  <source
                    media="(min-width: 640px) and (max-width: 769px)"
                    data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=700&amp;sh=466&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=1400&amp;sh=933&amp;sm=cut&amp;sfrm=jpg 2x"
                    srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=700&amp;sh=466&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=1400&amp;sh=933&amp;sm=cut&amp;sfrm=jpg 2x"
                  />
                  <source
                    media="(min-width: 769px)"
                    data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=600&amp;sh=400&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=1200&amp;sh=800&amp;sm=cut&amp;sfrm=jpg 2x"
                    srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=600&amp;sh=400&amp;sm=cut&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=1200&amp;sh=800&amp;sm=cut&amp;sfrm=jpg 2x"
                  />
                  <img
                    className="w-100 lazyloaded"
                    data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=600&amp;sh=400&amp;sm=cut&amp;sfrm=jpg"
                    alt="Les packs de croquettes ROYAL CANIN®"
                    title="Les packs de croquettes ROYAL CANIN®"
                    src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/fr_FR/dw5c67f24b/Pack-mix-feeding-wet-dry/Bundle-LP-image.jpg?sw=600&amp;sh=400&amp;sm=cut&amp;sfrm=jpg"
                  />
                </picture> */}
              </div>
            </div>
          </div>
          <div className="rc-max-width--lg rc-padding-x--lg--mobile">
            <div className="rc-margin-bottom--sm rc-padding--none">
              <h4 className="rc-gamma text-center">
                Choisissez l'assortiment ROYAL CANIN® le plus adapté à votre
                chat
              </h4>
            </div>
            {/* <section
            style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}
          >
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px'
              }}
            >
              Choisissez l'assortiment ROYAL CANIN® le plus adapté à votre chat
            </h2>
            <br />
          </section> */}

            {/*//轮播图图图图图图图突突突*/}
            <div style={{ margin: '0 auto' }}>
              <div
                className="rc-carousel rc-carousel--cards rc-match-heights"
                data-js-carousel=""
                data-rc-cards="true"
                data-rows="6"
                data-rc-prev="prev"
                data-rc-next="next"
              >
                <div className="rc-carousel__card-gal">
                  {list1.map((item, index) => {
                    return (
                      <article
                        className="rc-card rc-card--b align-self-stretch tns-item tns-slide-active"
                        id="tns2-item1"
                      >
                        <a
                          href={`/fr${item.linkUrl}`}
                          className="rc-card__link rc-card--product rc-full-width h-100 rc-margin--none"
                        >
                          {/* <Link key={index} to={item.linkUrl}> */}
                          <article className="rc-card rc-card--b rc-padding--sm--mobile rc-padding--xs--desktop rc-padding-x--xs h-100 priceRangeFormat">
                            <div className="row h-100">
                              <picture
                                className="mx-auto col-4 col-sm-3 col-md-12 rc-margin-bottom--xs--desktop"
                                data-rc-feature-objectfillpolyfill-setup="true"
                              >
                                <LazyLoad style={{ width: '100%' }}>
                                  <img
                                    className="m-auto lazyloaded"
                                    alt={item.title}
                                    title={item.title}
                                    src={item.imageUrl}
                                    alt="alt text"
                                  />
                                </LazyLoad>
                                {/* <img
                            className="m-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_fr/default/dw9e6ef833/mkt/00001/Main-Coon-Adult-1-bis.jpg?sw=150&amp;sfrm=jpg"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_fr/default/dw9e6ef833/mkt/00001/Main-Coon-Adult-1-bis.jpg?sw=150&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_fr/default/dw9e6ef833/mkt/00001/Main-Coon-Adult-1-bis.jpg?sw=300&amp;sfrm=jpg 2x"
                           
                            srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_fr/default/dw9e6ef833/mkt/00001/Main-Coon-Adult-1-bis.jpg?sw=150&amp;sfrm=jpg, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_fr/default/dw9e6ef833/mkt/00001/Main-Coon-Adult-1-bis.jpg?sw=300&amp;sfrm=jpg 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_fr/default/dw9e6ef833/mkt/00001/Main-Coon-Adult-1-bis.jpg?sw=150&amp;sfrm=jpg"
                          /> */}
                              </picture>
                              <div className="text-left text-md-center col-8 col-sm-9 col-md-12 d-flex flex-column rc-padding-left--none--mobile align-self-center align-self-md-start">
                                <header>
                                  <h3
                                    style={{ lineHeight: '2rem' }}
                                    className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop"
                                  >
                                    {item.title}
                                  </h3>
                                </header>
                                <div className="Product-Key-words"></div>
                                <div className="rc-card__price rc-margin-top--xs">
                                  <span>
                                    <span>
                                      <span className="sales">
                                        <span
                                          className="value"
                                          content={item.price}
                                        >
                                          {item.price} €
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="rc-card__meta text-center col-12">
                                {item.subTitle}
                              </div>
                            </div>
                          </article>
                          {/* </Link> */}
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/*轮播停止*/}
          <br />
          <br />
          <div className="rc-max-width--lg rc-padding-x--lg--mobile">
            <div className="rc-margin-bottom--sm rc-padding--none">
              <h4 className="rc-gamma text-center">
                Choisissez l'assortiment ROYAL CANIN® le plus adapté à votre
                chien
              </h4>
            </div>
            {/* <section
            style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}
          >
            <h2
              style={{
                color: '#E2001A',
              }}
            >
              Choisissez l'assortiment ROYAL CANIN® le plus adapté à votre chien
            </h2>
          </section> */}
            {/*//轮播图图图*/}
            <div style={{ margin: '0 auto' }}>
              <div
                className="rc-carousel rc-carousel--cards rc-match-heights"
                data-js-carousel=""
                data-rc-cards="true"
                data-rows="6"
                data-rc-prev="prev"
                data-rc-next="next"
              >
                <div className="rc-carousel__card-gal">
                  {list2.map((item, index) => {
                    return (
                      <article
                        className="rc-card rc-card--b align-self-stretch tns-item tns-slide-active"
                        id="tns1-item2"
                      >
                        <a
                          href={`/fr${item.linkUrl}`}
                          data-pid={index}
                          target=""
                          className="rc-card__link rc-card--product rc-full-width h-100 rc-margin--none"
                        >
                          <article className="rc-card rc-card--b rc-padding--sm--mobile rc-padding--xs--desktop rc-padding-x--xs h-100 priceRangeFormat">
                            <div className="row h-100">
                              <picture
                                className="mx-auto col-4 col-sm-3 col-md-12 rc-margin-bottom--xs--desktop"
                                data-rc-feature-objectfillpolyfill-setup="true"
                              >
                                <LazyLoad style={{ width: '100%' }}>
                                  <img
                                    className="m-auto lazyloaded"
                                    alt={item.title}
                                    title={item.title}
                                    src={item.imageUrl}
                                    alt="alt text"
                                  />
                                </LazyLoad>
                              </picture>
                              <div className="text-left text-md-center col-8 col-sm-9 col-md-12 d-flex flex-column rc-padding-left--none--mobile align-self-center align-self-md-start">
                                <header>
                                  <h3
                                    style={{ lineHeight: '2rem' }}
                                    className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop"
                                  >
                                    {item.title}
                                  </h3>
                                </header>
                                <div className="Product-Key-words"></div>
                                <div className="rc-card__price rc-margin-top--xs">
                                  <span>
                                    <span>
                                      <span className="sales">
                                        <span
                                          className="value"
                                          content={item.price}
                                        >
                                          {item.price} €
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="rc-card__meta text-center col-12">
                                {item.subTitle}
                              </div>
                            </div>
                          </article>
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-categoryCtaBlock">
                  <div className="rc-bg-colour--brand4">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm">
                        <div className="col-12 col-md-4 order-1 order-md-0">
                          <div className="rc-column rc-padding--none">
                            <LazyLoad>
                              <img
                                className="mx-auto lazyloaded"
                                src={imagecat}
                              />
                            </LazyLoad>
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <a
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              href="/fr/cats"
                            >
                              Chat
                            </a>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                          <div className="rc-gamma rc-text--center rc-margin-bottom--xs">
                            Commencez dès maintenant votre Abonnement
                          </div>
                          <div className="rc-intro inherit-fontsize rc-text--center rc-padding-x--sm rc-margin-bottom--sm">
                            <p>
                              Découvrez les meilleures formules nutritionnelles
                              et sélectionnez l'Abonnement avant d'acheter
                            </p>
                          </div>
                          <div className="rc-btn-group rc-margin--none rc-padding-x--xs d-none d-md-flex">
                            <a
                              className="rc-btn rc-btn--sm rc-btn--two"
                              href="/fr/cats"
                            >
                              Chat
                            </a>
                            <a
                              className="rc-btn rc-btn--sm rc-btn--two"
                              href="/fr/dogs"
                            >
                              Chien
                            </a>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 order-2 order-md-2">
                          <div className="rc-column rc-padding--none">
                            <LazyLoad>
                              <img
                                className="mx-auto lazyloaded"
                                src={imagedog}
                              />
                            </LazyLoad>
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <a
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              href="/fr/dogs"
                            >
                              Chien
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
                                src={image4B}
                              />
                            </LazyLoad>
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                              <p className="rc-margin-bottom--none rc-intro">
                                Livraison gratuite et rapide
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                          <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <LazyLoad>
                              <img
                                className="value-proposition__img lazyloaded"
                                src={image4C}
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
                                src={image4D}
                              />
                            </LazyLoad>
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                              <p className="rc-margin-bottom--none rc-intro">
                                Qualité certifiée
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                          <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <LazyLoad>
                              <img src={image4E} />
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
        </main>
        <Footer />
      </div>
    );
  }
}

export default Packfeed;
