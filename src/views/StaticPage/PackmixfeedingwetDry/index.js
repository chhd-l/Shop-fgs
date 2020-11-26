import React, { useRef } from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Skeleton from 'react-skeleton-loader';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import image1 from './images/image1.jpg';
import image4B from './images/4B.png';
import image4C from './images/4C.png';
import image4D from './images/4D.png';
import image4E from './images/4E.png';
import imagecat from './images/cat-autoship.png'
import imagedog from './images/dog-autoship.png'
import imagemain from './images/Main-Coon-Adult-1-bis.jpg'
import imageappetite from './images/Appetite-control-1.jpg'
import ShopitemList from '../../../components/ShopItemShow';
import imagePersan from './images/Persan-1-bis.jpg'
import imageBritish from './images/British-Shortair1-bis.jpg'
import imageMini from './images/Mini-Adult-1-bis.jpg'
import imageChihuahua from './images/Chihuahua-1-bis.jpg'
import imageNutrition from './images/nutritional-supplement-educ-packshots-pro-educ-as-packshot.jpg'

import storeLogo from '@/assets/images/storeLogo.png';
import ImageMagnifier from '@/components/ImageMagnifier';
import { formatMoney } from '@/utils/utils';
// import paymentImg from "./img/payment.jpg";
import { inject, observer } from 'mobx-react';
import BannerTip from '@/components/BannerTip';
import { getRecommendationList } from '@/api/recommendation';
import { sitePurchase } from '@/api/cart';
import './index.css';
import { cloneDeep, findIndex, find } from 'lodash';
import { toJS } from 'mobx';
import LoginButton from '@/components/LoginButton';
import Carouselem from '../../../components/Carouselem';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore', 'loginStore', 'clinicStore')
@inject('configStore')
@observer
@injectIntl
class Packfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
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
          <BreadCrumbs />



          <div
            className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
              this.state.errorMsg ? '' : 'hidden'
            }`}
            style={{
              width: '50%',
              margin: '20px auto 0'
            }}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close"
              role="alert"
            >
              {this.state.errorMsg}
            </aside>
          </div>

          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '10px 50px' }}
          >
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div>
                <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                  Quels sont les avantages de nos combinaisons alimentaires pour chiens et chats ?
                </h2>
                <br/>
                <p>
                  Chez ROYAL CANIN®, nous savons que les animaux ont des besoins spécifiques en fonction de leur race, leur taille ou leur âge. Afin de répondre au mieux aux différents profils, nous avons lancé différents packs pour chiens et chats. Ces assortiments permettent de répondre au mieux aux besoins de votre animal, grâce à deux technologies : les croquettes et les bouchées en sauce.
                 <br/>
                  <br/>
                  Choisissez parmi nos assortiments pour chiens et chats le pack le plus adapté à votre animal.
                </p>
              </div>
            </div>
            <div className="rc-column">
              <img src={image1} style={{ width: '100%' }} alt="" />
            </div>

          </div>

          <section
            style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}
          >
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px',

              }}
            >
              Choisissez l'assortiment ROYAL CANIN® le plus adapté à votre chat
            </h2>
            <br/>
          </section>

          {/*//轮播图图图图图图图突突突*/}
         <div style={{width:'80%' ,margin:'0 auto'}}>
          <div className="rc-carousel rc-carousel--cards rc-match-heights" data-js-carousel="" data-rc-cards="true"
               data-rows="6" data-rc-prev="prev" data-rc-next="next" >
            <div className="rc-carousel__card-gal">
              <article className="rc-card rc-card--b">
              <picture className="rc-card__image">
                <img src={imagemain} alt="alt text"/>
              </picture>
              <div className="rc-card__body">
                <header>
                  <h1 className="rc-card__title">Pack Maine Coon Adulte</h1>
                  <p className="rc-card__meta">À partir de 15 mois</p>
                  <h5>62,98 €</h5>
                </header>
              </div>
            </article>

              <article className="rc-card rc-card--b">
                <picture className="rc-card__image">
                  <img src={imagePersan} alt="alt text"/>
                </picture>
                <div className="rc-card__body">
                  <header>
                    <h1 className="rc-card__title">Pack Persan Adulte</h1>
                    <p className="rc-card__meta">À partir de 15 mois</p>
                    <h5>64,98 €</h5>
                  </header>
                </div>
              </article>
              <article className="rc-card rc-card--b">
              <picture className="rc-card__image">
                <img src={imageBritish} alt="alt text"/>
              </picture>
              <div className="rc-card__body">
                <header>
                  <h1 className="rc-card__title">Pack British Shorthair Adulte</h1>
                  <p className="rc-card__meta">À partir de 15 mois</p>
                  <h5 >62,98 €</h5>
                </header>
              </div>
            </article>
              <article className="rc-card rc-card--b">
              <picture className="rc-card__image">
                <img src={imageappetite} alt="alt text"/>
              </picture>
              <div className="rc-card__body">
                <header>
                  <h1 className="rc-card__title">Pack Appetite Control Care</h1>
                  <p className="rc-card__meta">Chats adultes stérilisés de 1 à 7 ans – Tendance à quémander</p>
                  <h5>58.98 €</h5>
                </header>
              </div>
            </article>

            </div>
          </div>
        </div>

          {/*轮播停止*/}
          <br/>
          <br/>
          <section
            style={{ textAlign: 'center', width: '60%', margin: '0 auto' }}
          >
            <h2
              style={{
                color: '#E2001A',
                marginTop: '40px',

              }}
            >
              Choisissez l'assortiment ROYAL CANIN® le plus adapté à votre chien
            </h2>
          </section>
          {/*//轮播图图图*/}
          <div style={{width:'80%' ,margin:'0 auto'}}>
            <div className="rc-carousel rc-carousel--cards rc-match-heights" data-js-carousel="" data-rc-cards="true"
                 data-rows="6" data-rc-prev="prev" data-rc-next="next" >
              <div className="rc-carousel__card-gal">
                <article className="rc-card rc-card--b">
                  <picture className="rc-card__image">
                    <img src={imageMini} alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <h1 className="rc-card__title">Pack Mini Adult</h1>
                      <p className="rc-card__meta">À partir de 10 mois</p>
                      <h5>37.48 €</h5>
                    </header>
                  </div>
                </article>

                <article className="rc-card rc-card--b">
                  <picture className="rc-card__image">
                    <img src={imageChihuahua} alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <h1 className="rc-card__title">Pack Chihuahua Adult</h1>
                      <p className="rc-card__meta">À partir de 8 mois</p>
                      <h5>38.98 €</h5>
                    </header>
                  </div>
                </article>
                <article className="rc-card rc-card--b">
                  <picture className="rc-card__image">
                    <img src={imageNutrition} alt="alt text"/>
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <h1 className="rc-card__title">Educ</h1>
                      <p className="rc-card__meta">Supplément nutritionnel chiot (à partir de 2 mois) et chien adulte</p>
                      <h5 >62,98 €</h5>
                    </header>
                  </div>
                </article>

              </div>
            </div>
          </div>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-categoryCtaBlock">
                  <div className="rc-bg-colour--brand4">
                    <div
                      className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm">
                        <div className="col-12 col-md-4 order-1 order-md-0">
                          <div className="rc-column rc-padding--none">
                            <img className="mx-auto lazyloaded"
                                 src={imagecat}>
                            </img>
                           </div>
                          <div
                            className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <a className="rc-btn rc-btn--sm rc-btn--two w-50"
                               href="/">Chat</a>
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                          <div className="rc-gamma rc-text--center rc-margin-bottom--xs">Commencez dès maintenant votre
                            Abonnement
                          </div>
                          <div
                            className="rc-intro inherit-fontsize rc-text--center rc-padding-x--sm rc-margin-bottom--sm">
                            <p>Découvrez les meilleures formules nutritionnelles et sélectionnez l'Abonnement avant
                              d'acheter</p>
                          </div>
                          <div className="rc-btn-group rc-margin--none rc-padding-x--xs d-none d-md-flex">
                            <a className="rc-btn rc-btn--sm rc-btn--two"
                               href="/">Chat</a>
                            <a className="rc-btn rc-btn--sm rc-btn--two"
                               href="/">Chien</a>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 order-2 order-md-2">
                          <div className="rc-column rc-padding--none">
                            <img className="mx-auto lazyloaded"
                                 src={imagedog}>
                            </img>
                           </div>
                          <div
                            className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <a className="rc-btn rc-btn--sm rc-btn--two w-50"
                               href="/">Chien</a>
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
                  <div
                    className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">Pourquoi
                      choisir Royal Canin ?</h4>
                    <div className="value-proposition__container">
                      <div className="row mx-0">
                        <div
                          className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                          <div
                            className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img className="value-proposition__img lazyloaded"
                                 src={image4B}>
                            </img>
                            <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">Livraison gratuite et rapide</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                          <div
                            className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img className="value-proposition__img lazyloaded"
                                 src={image4C}>
                            </img>
                              <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">Paiement sécurisé</p>
                              </div>
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                          <div
                            className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img className="value-proposition__img lazyloaded"
                                 src={image4D}>

                            </img>
                              <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">Qualité certifiée</p>
                              </div>
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                          <div
                            className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
                            <img
                                 src={image4E}>

                            </img>
                              <div className="pl-3 d-flex align-items-center value-proposition__text">
                                <p className="rc-margin-bottom--none rc-intro">La nutrition santé livrée à votre
                                  domicile
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
