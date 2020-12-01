import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import Help from './Fr/help'
import { FormattedMessage, injectIntl } from 'react-intl';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import autoship from './images/autoship.png';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import cat from './images/cat.png';
import dog from './images/dog.png';
import wof from './images/wof.png'
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import './index.css';
import imagecat from '../PackmixfeedingwetDry/images/cat-autoship.png';
import imagedog from '../PackmixfeedingwetDry/images/dog-autoship.png';

@inject(
  'configStore',
)
@observer
@injectIntl
class SubscriptionLanding extends React.Component {
  componentDidMount(){
    setSeoConfig({
      goodsId: '',
      categoryId: '',
      pageName: 'Subscription Page'
    })
  }
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: ''
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
          <br/>
          <br/>
          <div className="rc-max-width--md text-center rc-padding-x--sm">
            <h2 className="rc-beta text-center">Avec l'Abonnement, ils auront toujours ce dont ils ont besoin</h2>
            <div className="rc-intro inherit-fontsize children-nomargin rc-margin-bottom--md--mobile">
              <p className='rc text-center'>Certaines choses ne devraient jamais s'épuiser. La nourriture de votre animal de compagnie en fait
                partie. Dites-nous simplement où et quand l'expédier, et nous nous assurerons que tout ce dont il a
                besoin arrive directement à votre porte.</p>
            </div>

          </div>

          <div
            className="rc-layout-container rc-two-column"
            style={{ padding: '20px' }}
          >
            <div
              className="rc-column"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '420px'
              }}
            >
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <img src={wof} className="wof"></img><span><FormattedMessage id="subscriptionLanding.description1" /></span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <img src={wof} className="wof"></img><span><FormattedMessage id="subscriptionLanding.description2" /></span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <img src={wof} className="wof"></img><span><FormattedMessage id="subscriptionLanding.description3" /></span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <img src={wof} className="wof"></img><span><FormattedMessage id="subscriptionLanding.description4" /></span>
                </div>
                {/* <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <FormattedMessage id="subscriptionLanding.description2" />
                </div>
                <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <FormattedMessage id="subscriptionLanding.description3" />
                </div>
                <div>
                  <i className="rc-icon rc-rate-fill--xs rc-brand1"></i>
                  <FormattedMessage id="subscriptionLanding.description4" />
                </div> */}
                <div style={{ marginTop: '20px' }}>
                  <button
                    className="rc-btn rc-btn--one"
                    onClick={() => {
                      this.props.history.push('/list/cats');
                    }}
                  >
                    <FormattedMessage id="subscriptionLanding.catButton" />
                  </button>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button
                    className="rc-btn rc-btn--one"
                    onClick={() => {
                      this.props.history.push('/list/dogs');
                    }}
                  >
                    <FormattedMessage id="subscriptionLanding.dogButton" />
                  </button>
                </div>
              </div>
            </div>

            <div className="rc-column">
              <img src={autoship} />
            </div>

          </div>
          <section
            style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}
          >
            <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
              Comment cela fonctionne-t-il ?
            </h2>
          </section>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
            <div
              className="rc-layout-container rc-four-column"
              style={{ padding: '20px' }}
            >
              <div className="rc-column" style={{ textAlign: 'center' }}>
                <img
                  src={icon1}
                  style={{
                    width: '180px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                  alt=""
                />
                <p>
                  Ajoutez les produits nutritionnels <strong>répondant aux besoins de
                  votre animal</strong> dans votre panier.
                </p>
              </div>
              <div className="rc-column" style={{ textAlign: 'center' }}>
                <img
                  src={icon2}
                  style={{
                    width: '180px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                  alt=""
                />
                <p>
                  Sélectionnez l<strong>'expédition automatique</strong> et entrez votre mode de
                  paiement.
                </p>
              </div>
              <div className="rc-column" style={{ textAlign: 'center' }}>
                <img
                  src={icon3}
                  style={{
                    width: '180px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                  alt=""
                />
                <p>
                  <strong>Recevez votre produit automatiquement</strong> en fonction de votre
                  calendrier.
                </p>
              </div>
              <div className="rc-column" style={{ textAlign: 'center' }}>
                <img
                  src={icon4}
                  style={{
                    width: '180px',
                    display: 'inline-block',
                    marginBottom: '20px'
                  }}
                  alt=""
                />
                <p>Modifiez vos préférences à <strong>tout moment</strong>.</p>
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




          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#E2001A', marginTop: '40px' }}>
                Besoin d'aide ?
              </h2>
              <p>
                Nos conseillers sont de vrais experts et passionnés. Ils se
                tiennent à votre disposition pour répondre à toute demande.
              </p>
            </section>
            {
              process.env.REACT_APP_LANG == 'fr'
              ?
              <Help/>
              :
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
                                      <img
                                        className="align-self-center widthAuto"
                                        src={callImg}
                                        alt="By telephone"
                                        title="By telephone"
                                      />
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
                                      <img
                                        className="align-self-center widthAuto"
                                        src={emailImg}
                                        alt="By email"
                                        title="By email"
                                      />
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
                                  <img src={helpImg} alt=" " title=" " />
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

            }

          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default SubscriptionLanding;
