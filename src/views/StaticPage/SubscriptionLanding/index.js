import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import Help from './Fr/help';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import autoship from './images/autoship.png';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import wof from './images/wof.png';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import './index.css';
import imagecat from '../PackmixfeedingwetDry/images/cat-autoship.png';
import imagedog from '../PackmixfeedingwetDry/images/dog-autoship.png';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

@inject('configStore')
@observer
@injectIntl
class SubscriptionLanding extends React.Component {
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
  componentDidMount() {
    setSeoConfig({
      goodsId: '',
      categoryId: '',
      pageName: 'Subscription Page'
    }).then(res => {
      this.setState({seoConfig: res})
    });
  }
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: '',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };

    return (
      <div className="recommendation">
        <Helmet>
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
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
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-pawListBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-max-width--lg rc-padding-y--sm">
                      <div className="rc-max-width--md text-center rc-padding-x--sm">
                        <h2 className="rc-beta text-center">
                          Avec l'Abonnement, ils auront toujours ce dont ils ont
                          besoin
                        </h2>
                        <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
                          <h2>
                            Certaines choses ne devraient jamais s'épuiser. La
                            nourriture de votre animal de compagnie en fait
                            partie. Dites-nous simplement où et quand
                            l'expédier, et nous nous assurerons que tout ce dont
                            il a besoin arrive directement à votre porte.
                          </h2>
                        </div>
                        <div className="d-block d-md-none rc-text--center">
                          <Link to="/cats">
                            <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                              Voir les formules pour chat
                            </button>
                          </Link>
                          <Link to="/dogs">
                            <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                              Voir les formules pour chien
                            </button>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                        <div className="rc-column">
                          <div className="rc-padding-y--lg--mobile rc-full-width">
                            <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                10% de réduction sur toutes les commandes en
                                Abonnement
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                Suspendre, modifier ou annuler à tout moment
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                Livraison offerte
                              </li>
                              <li className="rc-list__item">
                                <i className="wof rc-margin-right--xs"></i>
                                Ligne d'assistance téléphonique gratuite sur la
                                nutrition
                              </li>
                            </ul>
                            <div className="d-none d-md-block rc-btn-group m-0 rc-column rc-padding-x--none">
                              <Link to="/cats">
                                <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                                  Voir les formules pour chat
                                </button>
                              </Link>
                              <Link to="/dogs">
                                <button className="rc-btn rc-btn--one rc-margin-bottom--xs">
                                  Voir les formules pour chien
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column">
                          <img
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=1068 2x"
                            alt="Avec l'Abonnement, ils auront toujours ce dont ils ont besoin"
                            className="w-100 lazyloaded"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=1068 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwb45832a1/autoship.png?sw=534"
                          ></img>
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
                <div className="experience-component experience-assets-twoColImgText">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
                      <h2 className="rc-beta rc-margin--none text-center rc-padding-x--lg--mobile">
                        Comment cela fonctionne-t-il ?
                      </h2>
                    </div>
                    <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image-one"
                            title="image-one"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw87812924/subscription/icon1.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          Ajoutez les produits nutritionnels{' '}
                          <strong>répondant aux besoins de votre animal</strong>{' '}
                          dans votre panier.
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image two"
                            title="image two"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw3c4b7b6c/subscription/icon2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          Sélectionnez l'<strong>expédition automatique</strong>{' '}
                          et entrez votre mode de paiement.
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image three"
                            title="image three"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwa6fed565/subscription/icon3.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          <strong>Recevez votre produit automatiquement</strong>{' '}
                          en fonction de votre calendrier.
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            data-src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                            data-srcset="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            alt="image four"
                            title="image four"
                            srcSet="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=200&amp;sh=200&amp;sm=cut&amp;sfrm=png 2x"
                            src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dwc93c533a/subscription/icon4.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png"
                          ></img>
                        </div>
                        <h7>
                          Modifiez vos préférences à{' '}
                          <strong>tout moment</strong>.
                        </h7>
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
                <div className="experience-component experience-assets-categoryCtaBlock">
                  <div className="rc-bg-colour--brand4">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                      <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm">
                        <div className="col-12 col-md-4 order-1 order-md-0">
                          <div className="rc-column rc-padding--none">
                            <LazyLoad>
                            <img className="mx-auto lazyloaded"
                                 src={imagecat}>
                            </img>
                            </LazyLoad>
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <a
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              href="/"
                            >
                              Chat
                            </a>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                          <div className="rc-gamma rc-text--center rc-margin-bottom--xs">
                            <FormattedMessage id="subscription.banner.title" />
                          </div>
                          <div className="rc-intro inherit-fontsize rc-text--center rc-padding-x--sm rc-margin-bottom--sm">
                            <p>
                              <FormattedMessage id="subscription.banner.subTitle" />
                            </p>
                          </div>
                          <div className="rc-btn-group rc-margin--none rc-padding-x--xs d-none d-md-flex">
                            <Link
                              to="/product-finder"
                              className="rc-btn rc-btn--one"
                            >
                              <FormattedMessage id="header.toBegin" />
                            </Link>
                            {/* <a className="rc-btn rc-btn--sm rc-btn--two"
                               href="/">Chat</a>
                            <a className="rc-btn rc-btn--sm rc-btn--two"
                               href="/">Chien</a> */}
                          </div>
                        </div>
                        <div className="col-12 col-md-4 order-2 order-md-2">
                          <div className="rc-column rc-padding--none">
                            <LazyLoad>
                            <img className="mx-auto lazyloaded"
                                 src={imagedog}>
                            </img>
                            </LazyLoad>
                          </div>
                          <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                            <a
                              className="rc-btn rc-btn--sm rc-btn--two w-50"
                              href="/"
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

          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                <FormattedMessage id="subscription.help.title" />

              </h2>
              <p>
                <FormattedMessage id="subscription.help.subTitle" />
              </p>
            </section>
            {process.env.REACT_APP_LANG == 'fr' ? (
              <Help />
            ) : (
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile"></div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                            <div className="rc-column rc-double-width rc-padding--none">
                              <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#00BCA3' }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>
                                          {
                                            this.props.configStore
                                              .contactTimePeriod
                                          }
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-numeric rc-md-up"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-alpha rc-border--none rc-md-down"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                      <img
                                        className="align-self-center widthAuto"
                                        src={callImg}
                                        alt="By telephone"
                                        title="By telephone"
                                      />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#0087BD' }}>
                                          <font
                                            style={{ verticalAlign: 'inherit' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <FormattedMessage id="help.byEmail" />
                                            </font>
                                          </font>
                                        </b>
                                        <p>
                                          <span
                                            style={{ color: 'rgb(0, 0, 0)' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <font
                                                style={{
                                                  verticalAlign: 'inherit'
                                                }}
                                              >
                                                <FormattedMessage id="help.tip3" />
                                              </font>
                                            </font>
                                          </span>
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            className="rc-numeric rc-md-up"
                                            style={{
                                              color: 'rgb(0, 135, 189)'
                                            }}
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactEmail
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                      <img
                                        className="align-self-center widthAuto"
                                        src={emailImg}
                                        alt="By email"
                                        title="By email"
                                      />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                            <div className="rc-column rc-triple-width">
                              <div
                                className="background-cover"
                                style={{
                                  backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                                }}
                              >
                                <picture className="rc-card__image">
                                  <LazyLoad>
                                  <img src={helpImg} alt=" " title=" " />
                                  </LazyLoad>
                                </picture>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default SubscriptionLanding;
