import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { inject, observer } from 'mobx-react';
import { setSeoConfig, getDeviceType, getOktaCallBackUrl } from '@/utils/utils';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';
import stores from '@/store';
import kittencute from './img/kittencute.png';
import kittenimgone from './img/kittenimgone.png';
import kittenimgtwo from './img/kittenimgtwo.png';

import BreadCrumbs from '../../components/BreadCrumbs';
import Logo from '../../components/Logo';
import Help from '../StaticPage/SubscriptionLanding/Fr/help';

const localItemRoyal = window.__.localItemRoyal;
const loginStore = stores.loginStore;
const pageLink = window.location.href;
const deviceType = getDeviceType();
let RCDrawPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw.jpg`;

let isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

@inject('configStore')
@observer
@injectIntl
class DedicatedLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      searchEvent: {},
      showKitten: false,
      selectLine: true
    };
  }

  async componentDidMount() {
    if (localItemRoyal.get('login-again')) {
      loginStore.changeLoginModal(true);
      var callOktaCallBack = getOktaCallBackUrl(
        localItemRoyal.get('okta-session-token')
      );
      localItemRoyal.remove('login-again');
      window.location.href = callOktaCallBack;
    } // Cross-store login
    setSeoConfig({ pageName: 'Home Page' }).then((res) => {
      this.setState({ seoConfig: res });
    });
    if (localItemRoyal.get('logout-redirect-url')) {
      let url = localItemRoyal.get('logout-redirect-url');
      localItemRoyal.remove('logout-redirect-url');
      location.href = url;
    }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  sendGAHeaderSearch = (event) => {
    this.setState({
      searchEvent: event
    });
  };

  changeShowKitten = () => {
    this.setState({
      showKitten: !this.state.showKitten
    });
  };
  changeSetLine = () => {
    this.setState({
      selectLine: !this.state.selectLine
    });
  };

  render() {
    const { history, match, location } = this.props;

    const event = {
      page: {
        type: 'Homepage',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };

    const parametersString = history.location.search;
    if (parametersString.indexOf('redirect=order') >= 0) {
      localItemRoyal.set(
        'okta-redirectUrl',
        '/account/orders' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=subscription') >= 0) {
      localItemRoyal.set(
        'okta-redirectUrl',
        '/account/subscription' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=baseinfo') >= 0) {
      localItemRoyal.set('okta-redirectUrl', '/account/information');
    }
    if (parametersString.indexOf('redirect=pets') >= 0) {
      localItemRoyal.set('okta-redirectUrl', '/account/pets');
    }
    if (parametersString.indexOf('toOkta=true') >= 0) {
      this.props.oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE);
      return <Loading bgColor={'#fff'} />;
    }
    if (parametersString.indexOf('origin=forgot') >= 0) {
      this.props.oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE);
      return <Loading bgColor={'#fff'} />;
    }

    if (localItemRoyal.get('login-again')) {
      return null;
    }
    const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';
    const showKitten = this.state.showKitten;
    const selectLine = this.state.selectLine;

    return (
      <div>
        <div
          className={'modal'}
          style={
            showKitten
              ? {
                  width: '100vw',
                  height: '300vh',
                  position: 'absolute',
                  display: 'block',
                  background: '#000',
                  opacity: '0.80'
                }
              : {}
          }
        ></div>
        {!Ru ? (
          <Helmet>
            <link rel="canonical" href={pageLink} />
            <title>{this.state.seoConfig.title}</title>
            <meta
              name="description"
              content={this.state.seoConfig.metaDescription}
            />
            <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
          </Helmet>
        ) : (
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
        )}
        <GoogleTagManager
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          match={match}
          location={location}
          history={history}
          sendGAHeaderSearch={this.sendGAHeaderSearch}
        />
        <main className={'rc-content--fixed-header'}>
          <BannerTip />
          <BreadCrumbs />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-pawListBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-max-width--lg rc-padding-y--sm">
                      <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                        <div className="rc-column">
                          <div className="rc-full-width">
                            <h2 className="rc-beta ">
                              Recevez votre kit chaton gratuit pour vous
                              féliciter de votre adoption !
                            </h2>
                            <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                              <li className="rc-list__item">
                                Avec le code promotionnel qui vous a été
                                communiqué vous pouvez à la fin de votre
                                commande obtenir votre kit de nutrition adaptée
                                pour votre chaton.
                              </li>
                              <li className="rc-list__item">
                                Sélectionnez le kit d’aliment chaton et
                                ajoutez-le à votre panier
                              </li>
                            </ul>
                            <div className=" rc-btn-group m-0 rc-column rc-padding-x--none kittycenter">
                              <button
                                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                                style={{
                                  paddingLeft: '80px',
                                  paddingRight: '80px'
                                }}
                                onClick={() => this.changeShowKitten()}
                              >
                                J’en profite
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column">
                          <LazyLoad>
                            <img
                              className="w-100 lazyloaded"
                              src={kittencute}
                            ></img>
                          </LazyLoad>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isMobile ? (
            <div
              style={{
                display: showKitten ? 'block' : 'none',
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: 'translate(-50%,0%)',
                opacity: '100',
                zIndex: '1100'
              }}
              className="kitty80"
            >
              <article className="rc-card rc-card--a">
                <div className="rc-card__body">
                  <div
                    className="flex "
                    style={{ justifyContent: 'flex-end' }}
                    onClick={() => this.changeShowKitten()}
                  >
                    <span
                      className="rc-icon rc-close rc-iconography"
                      style={{ width: '15px' }}
                    ></span>
                  </div>
                  <header style={{ marginBottom: '25px' }}>
                    <h1
                      className="rc-card__title rc-delta text-center "
                      style={{ fontSize: '26px' }}
                    >
                      Sélectionnez votre kit
                    </h1>
                  </header>
                  <div
                    className="flex flex-md-column kittyflexdirection"
                    style={{ justifyContent: 'space-evenly' }}
                  >
                    <div style={{ marginRight: '5px' }}>
                      <p className="text-center" style={{ color: '#E2001A' }}>
                        Moins de 4 mois
                      </p>
                      <article className="rc-card rc-card--a">
                        <picture className="rc-card__image">
                          <img
                            src={kittenimgone}
                            alt="Kitten and puppy playing with ball"
                          />
                        </picture>
                        <div style={{ marginBottom: '5px' }}>
                          <header>
                            <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                              - 1 sac de croquette Mother & BabyCat
                            </p>
                            <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                              - 1 boite de mousse Mother & BabyCat
                            </p>
                          </header>
                        </div>
                      </article>
                    </div>
                    <div style={{ marginLeft: '5px' }}>
                      <p className="text-center" style={{ color: '#E2001A' }}>
                        Plus de 4 mois
                      </p>
                      <article className="rc-card rc-card--a">
                        <picture className="rc-card__image">
                          <img
                            src={kittenimgtwo}
                            alt="Kitten and puppy playing with ball"
                          />
                        </picture>
                        <div style={{ marginBottom: '5px' }}>
                          <header>
                            <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                              - 1 sac de croquette Kitten{' '}
                            </p>
                            <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                              - 1 sachet de nutrition fraicheur Kitten
                            </p>
                          </header>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E3E3E3',
                    paddingTop: '15px',
                    paddingBottom: '15px'
                  }}
                  className="text-center"
                >
                  <button className="rc-btn rc-btn--one">
                    Ajouter et voir mon panier
                  </button>
                </div>
              </article>
            </div>
          ) : (
            <div
              className="rc-layout-container rc-news-article-card--sidebar-present "
              style={{
                display: showKitten ? 'block' : 'none',
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: 'translate(-50%,0%)',
                opacity: '100',
                zIndex: '1100'
              }}
            >
              <div className="rc-column " style={{ width: '950px' }}>
                <article className="rc-card rc-card--a">
                  <div className="rc-card__body">
                    <div
                      className="flex "
                      style={{ justifyContent: 'flex-end' }}
                      onClick={() => this.changeShowKitten()}
                    >
                      <span
                        className="rc-icon rc-close rc-iconography"
                        style={{ width: '15px' }}
                      ></span>
                    </div>
                    <header style={{ marginBottom: '25px' }}>
                      <h1
                        className="rc-card__title rc-delta text-center "
                        style={{ fontSize: '26px' }}
                      >
                        Sélectionnez votre kit
                      </h1>
                    </header>
                    <div
                      className="flex "
                      style={{ justifyContent: 'space-evenly' }}
                    >
                      <div style={{ marginRight: '5px' }}>
                        <p className="text-center" style={{ color: '#E2001A' }}>
                          Moins de 4 mois
                        </p>
                        <article
                          className="rc-card rc-card--a"
                          onClick={() => this.changeSetLine()}
                          style={
                            selectLine
                              ? { boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E2001A' }
                              : null
                          }
                        >
                          <picture className="rc-card__image">
                            <img
                              src={kittenimgone}
                              alt="Kitten and puppy playing with ball"
                            />
                          </picture>
                          <div style={{ marginBottom: '5px' }}>
                            <header>
                              <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                                - 1 sac de croquette Mother & BabyCat
                              </p>
                              <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                                - 1 boite de mousse Mother & BabyCat
                              </p>
                            </header>
                          </div>
                        </article>
                      </div>
                      <div style={{ marginLeft: '5px' }}>
                        <p className="text-center" style={{ color: '#E2001A' }}>
                          Plus de 4 mois
                        </p>
                        <article
                          className="rc-card rc-card--a"
                          onClick={() => this.changeSetLine()}
                          style={
                            selectLine
                              ? { boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E2001A' }
                              : null
                          }
                        >
                          <picture className="rc-card__image">
                            <img
                              src={kittenimgtwo}
                              alt="Kitten and puppy playing with ball"
                            />
                          </picture>
                          <div style={{ marginBottom: '5px' }}>
                            <header>
                              <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                                - 1 sac de croquette Kitten{' '}
                              </p>
                              <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                                - 1 sachet de nutrition fraicheur Kitten
                              </p>
                            </header>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E3E3E3',
                      paddingTop: '15px',
                      paddingBottom: '15px'
                    }}
                    className="text-center"
                  >
                    <button className="rc-btn rc-btn--one">
                      Ajouter et voir mon panier
                    </button>
                  </div>
                </article>
              </div>
            </div>
          )}

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
                          <LazyLoad>
                            <img
                              className="m-auto w-auto lazyloaded"
                              alt="image one"
                              title="image one"
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon1@1x.png`}
                            ></img>
                          </LazyLoad>
                        </div>

                        <h7>
                          <FormattedMessage
                            id="subscription.ad.list1"
                            values={{
                              val1: <br />,
                              val2: (
                                <strong>
                                  répondant aux besoins de votre animal
                                </strong>
                              ),
                              val3: <br />
                            }}
                          />
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <LazyLoad>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon2.png`}
                              alt="image two"
                              title="image two"
                            ></img>
                          </LazyLoad>
                        </div>
                        <h7>
                          <FormattedMessage
                            id="subscription.ad.list2"
                            values={{
                              val1: <strong>l'expédition automatique</strong>
                            }}
                          />
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <LazyLoad>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon3.png`}
                              alt="image three"
                              title="image three"
                            ></img>
                          </LazyLoad>
                        </div>

                        <h7>
                          <FormattedMessage
                            id="subscription.ad.list3"
                            values={{
                              val1: (
                                <strong>
                                  Recevez votre produit automatiquement
                                </strong>
                              )
                            }}
                          />
                        </h7>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            alt="image four"
                            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon4.png`}
                            title="image four"
                          ></img>
                        </div>
                        <h7>
                          <FormattedMessage
                            id="subscription.ad.list4"
                            values={{
                              val1: <strong>tout moment</strong>
                            }}
                          />
                        </h7>
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
            {window.__.env.REACT_APP_COUNTRY == 'fr' ? (
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
                                    <img
                                      src={helpImg}
                                      alt="help icon"
                                      title=" "
                                    />
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
          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(DedicatedLandingPage);
