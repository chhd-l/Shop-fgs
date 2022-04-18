import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import vetdeimage from './deimage/Product-composition.png';
import decat from './deimage/delangdingpagecat.png';
import dedog from './deimage/delangdingpagedog.png';
import { seoHoc } from '@/framework/common';

import deLPdog from './deimage/deLPdog.png';
import deLPcat from './deimage/deLPcat.png';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;

function Divider() {
  return (
    <div className="experience-component experience-assets-divider">
      <div
        className="rc-border-bottom rc-border-colour--brand4"
        style={{ borderBottomWidth: '4px' }}
      />
    </div>
  );
}

@seoHoc('Home Page')
class ClubLandingPageDeVet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      searchEvent: {}
    };
  }
  componentWillUnmount() {}
  sendGAHeaderSearch = (event) => {
    this.setState({
      searchEvent: event
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

    return (
      <div>
        <Canonical />
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          {...this.props}
          showMiniIcons={true}
          showUserIcon={true}
          sendGAHeaderSearch={this.sendGAHeaderSearch}
        />
        <main className={'rc-content--fixed-header'}>
          <BannerTip />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                    <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                      <div className="rc-column">
                        <div className="lazyload-wrapper">
                          <img
                            alt="With the Subscription, they will always have what they need"
                            className="w-100 lazyloaded"
                            src={vetdeimage}
                          />
                        </div>
                      </div>
                      <div className="rc-column">
                        <div className="rc-padding-y--lg--mobile rc-full-width">
                          <p
                            style={{
                              fontSize: '28px',
                              color: '#E2001A'
                            }}
                          >
                            Eine maßgeschneiderte Ernährung ist eine wesentliche
                            Grundlage für Tiergesundheit
                          </p>
                          <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                            <li className="rc-list__item flex md:items-center">
                              <div>
                                <em className="petCrew iconfont rc-margin-right--xs"></em>
                              </div>
                              <div style={{ fontWeight: 'bolder' }}>
                                Verbesserung der Lebensqualität der Tiere
                              </div>
                            </li>
                            <li className="rc-list__item flex md:items-center">
                              <div>
                                <em className="petCrew iconfont rc-margin-right--xs"></em>
                              </div>
                              <div style={{ fontWeight: 'bolder' }}>
                                Unterstützung von Tieren mit fütterungsbedingten
                                Erkrankungen
                              </div>
                            </li>
                            <li className="rc-list__item flex md:items-center">
                              <div>
                                <em className="petCrew iconfont rc-margin-right--xs"></em>
                              </div>
                              <div style={{ fontWeight: 'bolder' }}>
                                Beeinflussung des Wachstums von Katzen- und
                                Hundewelpen
                              </div>
                            </li>
                            <li className="rc-list__item flex md:items-center">
                              <div>
                                <em className="petCrew iconfont rc-margin-right--xs"></em>
                              </div>
                              <div style={{ fontWeight: 'bolder' }}>
                                Beitrag zum Management von Erkrankungen
                                <sup>1,2</sup>
                              </div>
                            </li>
                          </ul>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                    <p style={{ fontSize: '12px' }}>
                      <sup>1</sup>American Animal Hospital Association (AAHA)
                    </p>
                    <p style={{ fontSize: '12px' }}>
                      <sup>2</sup>World Small Animal Veterinary Association
                      (WSAVA)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div className="">
            <div className="rc-fgs-component-container">
              <div className="hub-category rc-bg-colour--brand3 rc-margin-bottom--xs">
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <span>
                      Die tierärztlichen Nahrungen <br /> von ROYAL CANIN®
                    </span>
                  </h4>
                  <div className="rc-intro inherit-fontsize text-center contact_options__subheading">
                    <p>
                      <span>
                        <p>
                          Seit 1968 widmet sich ROYAL CANIN® den besonderen
                          Ernährungsbedürfnissen von Katzen und Hunden bis ins
                          kleinste Detail. Denn schon kleine
                          Nährstoffunterschiede in der Nahrung können einen
                          großen Unterschied für das Wohlbefinden Ihres
                          Haustieres bedeuten. Das gilt natürlich um so mehr,
                          wenn Tierärzt*innen bei Ihrer Katze oder Ihrem Hund
                          ein{' '}
                          <a style={{ fontWeight: 'bolder' }}>
                            besonderes Bedürfnis
                          </a>{' '}
                          festgestellt haben. Gerade dann kann eine
                          maßgeschneiderte Ernährung helfen, die Gesundheit
                          Ihres Haustieres zu unterstützen und zu erhalten.
                        </p>
                        <p>
                          ROYAL CANIN® bietet deshalb ein umfangreiches Programm
                          an Nahrungen an, die speziell auf die tierärztlich
                          festgestellten besonderen Bedürfnisse von Katzen und
                          Hunden abgestimmt sind. Sprechen Sie mit Ihrer
                          Tierärztin oder Ihrem Tierarzt darüber, mit welcher
                          ROYAL CANIN® Nahrung Sie die Gesundheit Ihres
                          vierbeinigen Begleiters am besten unterstützen können.
                        </p>
                      </span>
                    </p>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column">
                      <div className="header-title">
                        <h1 className="rc-espilon">Für Katzen</h1>
                        <img style={{ height: '100px' }} src={decat} />
                      </div>
                      <div className="rc-layout-container rc-two-column">
                        <div className="rc-column">
                          <a
                            className="rc-moblie-flex flex-wrap justify-content-center"
                            href="/de/cats"
                          >
                            <img src={deLPcat} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="rc-column">
                      <div className="header-title">
                        <h1 className="rc-espilon">Für Hunde</h1>
                        <img style={{ height: '100px' }} src={dedog} />
                      </div>
                      <div className="rc-layout-container rc-two-column">
                        <div className="rc-column ">
                          <a
                            className="rc-moblie-flex flex-wrap justify-content-center"
                            href="/de/dogs"
                          >
                            <img src={deLPdog} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-layouts-cardcarousel">
                  <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile ">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition text-center">
                      <div>
                        <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                          Unser Sortiment
                        </h4>
                      </div>
                      <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                        <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                          <div className="rc-column demobilevideo">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/As_E5h-Zf58"
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="rc-column demobilevideo">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/BWL-VP9Asbc"
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />
          <section>
            <div className="rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
                <div className=" rc-match-heights text-center md:text-left">
                  <div className="DeCenter  align-self-center">
                    <h2 className="rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-center rc-padding-top--none">
                      Produkte für verschiedene Schwerpunkte der Tiergesundheit
                    </h2>
                  </div>
                  <div className="DeCenter col-lg-9">
                    <div className="row custom-gutter">
                      <span className="hidden rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"></span>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Aufzucht &amp; Wachstum"
                          href="/de/aufzucht_wachstum"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250505313217.jpg"
                                alt="Aufzucht &amp; Wachstum product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">
                              Aufzucht &amp; Wachstum
                            </h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Diabetes mellitus"
                          href="/de/diabetes_mellitus"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250443423647.jpg"
                                alt="Diabetes mellitus product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">
                              Diabetes mellitus
                            </h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Gelenke"
                          href="/de/gelenke"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250449533854.jpg"
                                alt="Gelenke product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Gelenke</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Haut &amp; Fell"
                          href="/de/haut_fell"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250439243509.jpg"
                                alt="Haut &amp; Fell product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Haut &amp; Fell</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Herz"
                          href="/de/herz"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250452557607.jpg"
                                alt="Herz product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Herz</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Kastration"
                          href="/de/kastration"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250459262693.jpg"
                                alt="Kastration product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Kastration</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Leber"
                          href="/de/leber"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250447457709.jpg"
                                alt="Leber product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Leber</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Magen-Darm-Trakt"
                          href="/de/magen_darm_trakt"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250445143898.jpg"
                                alt="Magen-Darm-Trakt product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">
                              Magen-Darm-Trakt
                            </h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Maulhöhle"
                          href="/de/maulhohle"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250502527142.jpg"
                                alt="Maulhöhle product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Maulhöhle</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Niere"
                          href="/de/niere"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250448519699.jpg"
                                alt="Niere product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Niere</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Pill Assist"
                          href="/de/pill_assist"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250507286476.jpg"
                                alt="Pill Assist product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Pill Assist</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Prophylaxe"
                          href="/de/prophylaxe"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250506536953.jpg"
                                alt="Prophylaxe product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Prophylaxe</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Übergewicht"
                          href="/de/ubergewicht"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250442139814.jpg"
                                alt="Übergewicht product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Übergewicht</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Untere Harnwege"
                          href="/de/untere_harnwege"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250435180570.jpg"
                                alt="Untere Harnwege product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Untere Harnwege</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Verhalten"
                          href="/de/verhalten"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202011250504018221.jpg"
                                alt="Verhalten product image"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Verhalten</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-6 col-md-3">
                        <a
                          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          title="Alles anzeigen"
                          href="/de/list/keywords"
                        >
                          <picture className="category-cards__card__img">
                            <div className="lazyload-wrapper ">
                              <img
                                src="https://d2cstgstorage.z13.web.core.windows.net/202012140704238285.jpg"
                                alt="Alles anzeigen product image"
                                title="all"
                                style={{ width: '144px' }}
                              />
                            </div>
                          </picture>
                          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Alles anzeigen</h3>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(ClubLandingPageDeVet);
