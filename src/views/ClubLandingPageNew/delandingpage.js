import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import shopbannerNew from './deimage/ShopBannerNEW.jpg';
import vetdeimage from './deimage/Product-composition.png';
import { getDeviceType } from '@/utils/utils';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import stores from '@/store';
import declublogo from './deimage/declublogo.png';

import line from './deimage/Line@4x.png';
import dephone from './deimage/dePhoneicon.png';
import demail from './deimage/deEmailicon.png';
import dehowit1 from './deimage/dehowit1.png';
import dehowit2 from './deimage/dehowit2.png';
import dehowit3 from './deimage/dehowit3.png';
import dehowit4 from './deimage/dehowit4.png';
import number1 from './deimage/number1.png';
import number2 from './deimage/number2.png';
import number3 from './deimage/number3.png';
import number4 from './deimage/number4.png';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';
import vetru from '../ClubLandingPage/vetlandingpage/images/VET@2x.webp';
import logoad from './Components/GetMoreAd/image/logoad.png';
import logoclubad from './Components/GetMoreAd/image/CLUBLOGOSUBSCIPTION@4x.png';
import online1 from './deimage/onlinepic1.png';
import online2 from './deimage/onlinepic2.png';
import online3 from './deimage/onlinepic3.png';
import online4 from './deimage/onlinepic4.png';
import callImgNew from '../../components/HelpComponentsNew/img/phoneicon@4x.png';
import emailImgNew from '../../components/HelpComponentsNew/img/emailicon@4x.png';
import faqImgNew from '../../components/HelpComponentsNew/img/FAQicon@4x.png';
import Logo from '../../components/Logo';
import DeMyList from './demylist';
import PrescriberCode from './Components/DeStoreCode/precriberCode';
import PhoneModal from '../../views/StaticPage/Help/components/phoneModal.js';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const loginStore = stores.loginStore;
const deviceType = getDeviceType();
let RCDrawPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw.jpg`;

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
class ClubLandingPageDe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      searchEvent: {},
      tel: 'tel:0221 937060 650',
      mailAddress: 'mailto:service.de@royalcanin.com',
      showModal: false
    };
  }

  mobileDial = () => {
    this.setState({ showModal: true });
  };
  cancelModal = () => {
    this.setState({ showModal: false });
  };
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
        {this.state.showModal ? (
          <PhoneModal cancelModal={this.cancelModal} />
        ) : null}
        <main className={'rc-content--fixed-header'}>
          <BannerTip />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                    <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                      <div className="rc-column demobilevideo">
                        <iframe
                          width="560"
                          height="315"
                          src="https://www.youtube.com/embed/xxOcjlpqcyc"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="rc-column demobiletext">
                        <div className="rc-padding-y--lg--mobile rc-full-width">
                          <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                            <div
                              className="rc-alpha inherit-fontsize detextcenter"
                              style={{ fontSize: '2em' }}
                            >
                              Die tierärztlichen Nahrungen von ROYAL CANIN®
                            </div>
                            <li className="rc-list__item">
                              Seit 1968 erforscht ROYAL CANIN® die besonderen
                              Ernährungsbedürfnisse von Katzen und Hunden bis
                              ins kleinste Detail. Denn schon kleinste
                              Nährstoffunterschiede in der Nahrung können einen
                              großen Unterschied für das Wohlbefinden Ihres
                              Haustieres bedeuten. Das gilt natürlich um so
                              mehr, wenn Tierärzt*innen bei Ihrer Katze oder
                              Ihrem Hund ein{' '}
                              <a style={{ fontWeight: 'bolder' }}>
                                besonderes Bedürfnis
                              </a>{' '}
                              festgestellt haben.
                            </li>
                            <li className="rc-list__item">
                              Damit wir sicherstellen können, dass ihr Haustier
                              die Nahrung erhält, die es benötigt, benötigen Sie
                              einen{' '}
                              <a style={{ fontWeight: 'bolder' }}>
                                {' '}
                                individuellen Empfehlungscode Ihrer
                                Tierarztpraxis
                              </a>
                              , der bescheinigt, dass Sie eine Empfehlung
                              erhalten haben. Mit diesem Empfehlungscode können
                              Sie dann eine Bestellung in unserem Online-Shop
                              aufgeben.
                            </li>
                          </ul>
                          <br />
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
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <div>
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        Wie funktioniert die Bestellung?
                      </h4>
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'center' }}
                      className="deflexcolumn"
                    >
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit1} className="dehowit01" />
                        </LazyLoad>
                      </div>
                      <div
                        style={{
                          marginLeft: '5vw',
                          marginRight: '5vw',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        className="orderone decenter"
                      >
                        <LazyLoad>
                          <img src={number1} style={{ width: '50px' }} />
                        </LazyLoad>
                      </div>
                      <div
                        className="desktop30vw orderthree"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <p>
                          <a style={{ fontWeight: 'bolder' }}>
                            Besuchen Sie Ihre Tierarztpraxis
                          </a>
                          , um sich beraten zu lassen und eine
                          Nahrungsempfehlung speziell für die besonderen
                          Bedürfnisses Ihrer Katze oder Ihres Hundes zu
                          erhalten. Ihre Praxis händigt Ihnen einen{' '}
                          <a style={{ fontWeight: 'bolder' }}>
                            individuellen Empfehlungscode
                          </a>{' '}
                          aus.
                          <Link to="/prescriptionNavigate">
                            <a style={{ textDecoration: 'underline' }}>
                              Unter diesem Link finden Sie teilnehmende
                              Tierarztpraxen.
                            </a>
                          </Link>
                        </p>
                      </div>
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'center' }}
                      className="deflexcolumn"
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        className="desktop30vw orderthree"
                      >
                        <p className="detextalignright">
                          Geben Sie Ihren individuellen Empfehlungscode{' '}
                          <a style={{ fontWeight: 'bolder' }}>
                            {' '}
                            unten auf dieser Seite
                          </a>{' '}
                          ein.
                        </p>
                      </div>
                      <div
                        style={{
                          marginLeft: '5vw',
                          marginRight: '5vw',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        className="orderone decenter"
                      >
                        <LazyLoad>
                          <img src={number2} style={{ width: '50px' }} />
                        </LazyLoad>
                      </div>
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit2} className="dehowit02" />
                        </LazyLoad>
                      </div>
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'center' }}
                      className="deflexcolumn"
                    >
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit3} className="dehowit03" />
                        </LazyLoad>
                      </div>
                      <div
                        style={{
                          marginLeft: '5vw',
                          marginRight: '5vw',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        className="orderone decenter"
                      >
                        <LazyLoad>
                          <img src={number3} style={{ width: '50px' }} />
                        </LazyLoad>
                      </div>
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        className="desktop30vw orderthree"
                      >
                        <p>
                          Suchen Sie die empfohlene Nahrung Ihrer Tierarztpraxis
                          im Shop heraus und legen Sie diese in der gewünschten
                          Größe in Ihren Warenkorb.
                        </p>
                      </div>
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'center' }}
                      className="deflexcolumn"
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        className="desktop30vw orderthree"
                      >
                        <p className="detextalignright">
                          Wählen Sie Ihre gewünschte Zahlungsmethode aus und
                          schließen Sie Ihre ROYAL CANIN® Bestellung ab. Ihre
                          bestellte Nahrung wird Ihnen in der Regel{' '}
                          <a style={{ fontWeight: 'bolder' }}>
                            {' '}
                            innerhalb von 1-3 Werktagen{' '}
                          </a>{' '}
                          nach Hause geliefert.
                        </p>
                      </div>
                      <div
                        style={{
                          marginLeft: '5vw',
                          marginRight: '5vw',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        className="orderone decenter"
                      >
                        <LazyLoad>
                          <img src={number4} style={{ width: '50px' }} />
                        </LazyLoad>
                      </div>
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit4} className="dehowit04" />
                        </LazyLoad>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <PrescriberCode />

          <Divider />

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <div>
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        Ihre Bestelloptionen
                      </h4>
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'center' }}
                      className="deflexcolumn"
                    >
                      <div
                        style={{
                          boxShadow: ' 0vh 0vh 0.3vh 0.1vh #DCDCDE'
                        }}
                        className="dewidthsmall dedeskmargintop10vh"
                      >
                        <div className=" getmorebutton">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <div>
                              <LazyLoad>
                                <img
                                  className="w-60 lazyloaded"
                                  src={logoad}
                                  style={{ width: '100px' }}
                                />
                              </LazyLoad>
                            </div>
                            <div
                              style={{
                                transform: 'translateY(-10px)'
                              }}
                              className="marginleftpc demobile30"
                            >
                              <p
                                style={{
                                  fontSize: '28px',
                                  fontWeight: 'bolder'
                                }}
                                className="marginToppc "
                              >
                                Einzelbestellung
                              </p>
                            </div>
                          </div>
                        </div>

                        <div style={{ height: '15vh' }}>
                          <div className="rc-column">
                            <div className="rc-padding-y--lg--mobile rc-full-width">
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingoWhite iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a style={{ fontWeight: 'bolder' }}>
                                      kostenloser Versand{' '}
                                    </a>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingoWhite iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a>
                                      <a style={{ fontWeight: 'bolder' }}>
                                        schnelle Lieferung
                                      </a>{' '}
                                      in der Regel innerhalb von 1-3 Werktagen
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="dewithsmall"
                        style={{
                          boxShadow: ' 0vh 0vh 0.3vh 0.1vh #ed001a'
                        }}
                      >
                        <div
                          style={{
                            marginRight: '5vh'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              marginLeft: '3vw',
                              marginTop: '7vh',
                              marginBottom: '2vh'
                            }}
                          >
                            <div>
                              <LazyLoad>
                                <img
                                  className="w-60 lazyloaded"
                                  src={declublogo}
                                  style={{ width: '70px' }}
                                />
                              </LazyLoad>
                            </div>
                            <div
                              style={{
                                marginLeft: '5vh',
                                transform: 'translateY(-10px)'
                              }}
                            >
                              <p
                                style={{
                                  fontSize: '28px',
                                  fontWeight: 'bolder',
                                  color: '#E2001A',
                                  marginBottom: '0px'
                                }}
                              >
                                Regelmäßige
                              </p>
                              <p
                                style={{
                                  fontSize: '28px',
                                  fontWeight: 'bolder',
                                  color: '#E2001A',
                                  margin: '0'
                                }}
                              >
                                Lieferung
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div
                            className="rc-column"
                            style={{
                              padding: '0',
                              marginRight: '3vw',
                              marginLeft: '2vw'
                            }}
                          >
                            <div className="rc-padding-y--lg--mobile rc-full-width">
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a>
                                      {' '}
                                      <a style={{ fontWeight: 'bolder' }}>
                                        {' '}
                                        10% Rabatt{' '}
                                      </a>
                                      auf Ihre Bestellungen
                                    </a>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a>
                                      immer{' '}
                                      <a style={{ fontWeight: 'bolder' }}>
                                        genug Nahrung{' '}
                                      </a>{' '}
                                      für Ihr Tier Zuhause
                                    </a>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a style={{ fontWeight: 'bolder' }}>
                                      keine Mindestlaufzeit oder Kündigungsfrist
                                    </a>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a style={{ fontWeight: 'bolder' }}>
                                      flexibel anpassbar
                                    </a>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a style={{ fontWeight: 'bolder' }}>
                                      kostenloser Versand
                                    </a>
                                  </div>
                                </li>
                                <li className="rc-list__item flex">
                                  <div>
                                    <em className="bingo iconfont rc-margin-right--xs"></em>
                                  </div>
                                  <div style={{ marginLeft: '10px' }}>
                                    <a>
                                      <a style={{ fontWeight: 'bolder' }}>
                                        schnelle Lieferung{' '}
                                      </a>
                                      in der Regel innerhalb von 1-3 Werktagen
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <br />
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
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <div>
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        Die Vorteile des ROYAL CANIN® Online-Shops auf einen
                        Blick:
                      </h4>
                    </div>
                    <div className="mobileunshow">
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div style={{ width: '30vw' }}>
                          <p style={{ color: '#E2001A', fontWeight: 'bolder' }}>
                            Auswahl aus dem tierärztlichen Sortiment von ROYAL
                            CANIN®
                          </p>
                          <p>
                            ROYAL CANIN® bietet ein umfangreiches Programm an
                            Nahrungen an, die speziell auf die
                            <a style={{ fontWeight: 'bolder' }}>
                              {' '}
                              tierärztlich festgestellten besonderen Bedürfnisse
                            </a>{' '}
                            von Katzen und Hunden abgestimmt sind. Finden Sie in
                            unserem Shop die{' '}
                            <a style={{ fontWeight: 'bolder' }}>
                              {' '}
                              ganze Auswahl aus unserem Sortiment
                            </a>
                            .
                          </p>
                        </div>
                        <div
                          style={{
                            marginLeft: '3vw',
                            marginRight: '3vw',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <LazyLoad>
                            <img src={online1} style={{ width: '100px' }} />
                          </LazyLoad>
                        </div>
                        <div
                          style={{
                            marginLeft: '3vw',
                            marginRight: '3vw',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <LazyLoad>
                            <img src={online2} style={{ width: '100px' }} />
                          </LazyLoad>
                        </div>
                        <div style={{ width: '30vw' }}>
                          <p style={{ color: '#E2001A', fontWeight: 'bolder' }}>
                            Direkter Kontakt zu unserem Service-Team
                          </p>
                          <p>
                            Unser erfahrenes Service-Team steht Ihnen bei Fragen
                            rund um den Bestellprozess oder unsere Nahrungen
                            gerne persönlich mit Rat und Tat zur Seite.
                          </p>
                        </div>
                      </div>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div style={{ width: '30vw' }}>
                          <p style={{ color: '#E2001A', fontWeight: 'bolder' }}>
                            Regelmäßige Lieferung
                          </p>
                          <p>
                            Profitieren Sie von unserem flexiblen Angebot der
                            regelmäßigen Lieferung und{' '}
                            <a style={{ fontWeight: 'bolder' }}>
                              sparen Sie 10%
                            </a>{' '}
                            auf alle Ihre Bestellungen!
                          </p>
                        </div>
                        <div
                          style={{
                            marginLeft: '3vw',
                            marginRight: '3vw',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <LazyLoad>
                            <img src={online3} style={{ width: '100px' }} />
                          </LazyLoad>
                        </div>
                        <div
                          style={{
                            marginLeft: '3vw',
                            marginRight: '3vw',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <LazyLoad>
                            <img src={online4} style={{ width: '100px' }} />
                          </LazyLoad>
                        </div>
                        <div style={{ width: '30vw' }}>
                          <p style={{ color: '#E2001A', fontWeight: 'bolder' }}>
                            Schneller und kostenloser Versand
                          </p>
                          <p>
                            Bestellungen im ROYAL CANIN® Shop sind{' '}
                            <a style={{ fontWeight: 'bolder' }}>
                              {' '}
                              frei von Versandkosten
                            </a>{' '}
                            oder Mindestbestellmengen. Dazu liefern wir Ihre
                            bestellte Nahrung bei Lagerbestand in der Regel{' '}
                            <a style={{ fontWeight: 'bolder' }}>
                              innerhalb von 1-3 Werktagen
                            </a>
                            !
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pcunshow">
                      <DeMyList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none ">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                    <a
                      id="undefined"
                      name="undefined"
                      className="page-section-anchor"
                      aria-hidden="true"
                    ></a>
                    <div className="row align-items-md-center">
                      <div className=" col-12 col-lg-5 rc-padding-x--sm--desktop">
                        <picture data-rc-feature-objectfillpolyfill-setup="true">
                          <img
                            className=" lazyloaded"
                            alt="Yorkshire dog pic - Our Values"
                            title="Yorkshire dog pic - Our Values"
                            src={vetdeimage}
                          />
                        </picture>
                      </div>
                      <div className=" col-12 col-lg-7">
                        <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                          <h2 className="rc-beta markup-text">
                            Haben Sie Fragen zu den tierärztlichen Nahrungen von
                            ROYAL CANIN®?
                          </h2>
                          <p>
                            <span>
                              Unser erfahrenes Service-Team steht Ihnen gerne
                              mit Rat und Tat zur Seite. Wir freuen uns auf
                              Ihren Anruf oder eine E-Mail von Ihnen. Unseren
                              Kundenservice erreichen Sie
                            </span>
                          </p>
                          <div className="flex deflexcolumn">
                            <article
                              className="desktop35vw"
                              style={{ padding: '1rem 0' }}
                            >
                              <div className="rc-border-all rc-border-colour--interface fullHeight">
                                <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle fullHeight rc-padding-top--md--mobile">
                                  <div
                                    className="rc-column rc-double-width rc-padding-top--md--mobile"
                                    style={{ marginRight: '-4rem' }}
                                  >
                                    <div className="w-100">
                                      <p
                                        style={{
                                          fontWeight: 'bolder',
                                          marginBottom: '0px',
                                          marginTop: '20px'
                                        }}
                                      >
                                        per Telefon
                                      </p>
                                      <div className="rc-margin-top--xs">
                                        <p
                                          style={{ color: '#E2001A' }}
                                          className="rc-numeric rc-md-up"
                                        >
                                          <a
                                            href={this.state.tel}
                                            style={{
                                              color: '#E2001A',
                                              fontSize: '1rem',
                                              fontWeight: 'bolder'
                                            }}
                                          >
                                            0221 937060 650
                                          </a>
                                        </p>
                                      </div>
                                      <div className="rc-margin-top--xs">
                                        <p
                                          style={{ color: '#E2001A' }}
                                          className="rc-alpha rc-border--none rc-md-down"
                                          onClick={this.mobileDial}
                                        >
                                          0221 937060 650
                                        </p>
                                      </div>
                                      <p
                                        style={{
                                          fontSize: '12px',
                                          marginBottom: '0px'
                                        }}
                                        className="detextnowrap"
                                      >
                                        8:00-17:00 Uhr – Anrufe zum Ortstarif
                                      </p>
                                    </div>
                                  </div>
                                  <div className="rc-column rc-content-v-middle">
                                    <a href={this.state.tel}>
                                      <img
                                        className="align-self-center "
                                        src={dephone}
                                        title="By telephone"
                                        style={{ width: '2.5rem' }}
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </article>
                            <article
                              className="desktop35vw"
                              style={{ padding: '1rem 0 1rem 1rem' }}
                            >
                              <div className="rc-border-all rc-border-colour--interface fullHeight">
                                <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle fullHeight rc-padding-top--md--mobile">
                                  <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                    <div
                                      className="w-100 "
                                      style={{ marginTop: '2rem' }}
                                    >
                                      <p style={{ fontWeight: 'bolder' }}>
                                        per E-Mail
                                      </p>
                                      <p style={{ marginBottom: '35px' }}>
                                        <a
                                          href={this.state.mailAddress}
                                          className="rc-styled-link defontsize24px demargintop15px"
                                          style={{ color: '#E2001A' }}
                                        >
                                          service.de@royalcanin.com
                                        </a>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: '12px',
                                          marginBottom: '0px'
                                        }}
                                        className="w-60"
                                      >
                                        Informationen zur Verarbeitung Ihrer
                                        Daten finden Sie in unserer
                                        <a
                                          href="https://www.mars.com/privacy-policy-germany"
                                          className="rc-styled-link defontsize24px demargintop15px"
                                          style={{ color: '#E2001A' }}
                                        >
                                          Datenschutzerklärung
                                        </a>
                                        .
                                      </p>
                                    </div>
                                  </div>
                                  <div className="rc-column rc-content-v-middle">
                                    <a href={this.state.mailAddress}>
                                      <img
                                        className="align-self-center "
                                        src={demail}
                                        title="By telephone"
                                        style={{ width: '2.5rem' }}
                                      />
                                    </a>
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
          </div>

          <Divider />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <div>
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        Stets informiert mit dem ROYAL CANIN® Newsletter!
                      </h4>
                    </div>
                    <div className="text-center">
                      <a href="https://analytics-eu.clickdimensions.com/royalcanincom-agp6w/pages/sgjjrbkleemouganordtia.html">
                        <button className="rc-btn rc-btn--two">Anmelden</button>
                      </a>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(ClubLandingPageDe);
