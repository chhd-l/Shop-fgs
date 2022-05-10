import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleTagManager from '@/components/GoogleTagManager';
import Pcexperts from './experts/pcexperts';
import Hexperts from './experts/hexperts';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import 'react-datepicker/dist/react-datepicker.css';
import './index.less';
import './mobile.less';
import 'react-calendar/dist/Calendar.css';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import img from './image/img.png';
import thak from './image/thak.png';
import cat1 from './image/new.png';
import header1 from './image/header1.png';
import LazyLoad from 'react-lazyload';
import Rate from '../../components/Rate';
import Reviews from './Reviews/Reviews';
import Conseiller from './components/conseiller';
import ConseillerTwo from './components/conseillerTwo';
import { scrollIntoView } from '@/lib/scroll-to-utils';

const pageLink = window.location.href;
PRESONAL_INFO_RULE.filter((el) => el.key === 'phoneNumber')[0].regExp = '';

@inject('loginStore')
@observer
class Felin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {
        visible: false,
        list: []
      },
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      visible: false,
      list: [
        {
          name: "Qu'est ce que l'Atelier Félin?",
          text: "L'Atelier Félin est un magasin dédié au bien-être et à l’équilibre de votre chat où vous pouvez poser vos questions et recevoir des conseils afin de mieux connaître votre chat. C’est aussi un lieu pour acheter des aliments des gammes Royal Canin ainsi que des accessoires en lien avec le bien être des chats en bonne santé."
        },
        {
          name: 'Qui est Royal Canin ?',
          text: 'Royal Canin semploie depuis 1968 à créer la nutrition santé pour animaux la plus précise au monde. Nous contribuons ainsi à créer un monde meilleur pour les animaux de compagnie.',
          text1:
            ' Nous concentrons notre attention sur les besoins uniques des chats et des chiens. Cette obsession de la santé animale, nous permet de fournir une nutrition précise et bénéfique pour les aider devenir des animaux magnifiques.'
        },
        {
          name: 'Existe-t-il une initiative similaire pour les chiens ?',
          text: 'Non pas pour le moment, mais vous pourrez découvrir notre concept store « à la découverte Royal Canin » au 126 rue de Turenne jusqu’au 14 avril. Vous y trouverez des activités pour comprendre votre chat ou chien, mais nous n’y vendons pas d’aliments Royal Canin. Vous aurez néanmoins  l’opportunité de commander nos références pour chien depuis l’Atelier Félin.'
        }
      ],
      list1: [
        {
          name: "J'ai une question sur le concept, à qui puis-je m'adresser ?",
          text: 'Nous serons ravis de vous aider ! Ecrivez-nous un petit mot au 142 Bd Saint Germain, ou appelez-nous au XnuméroX.'
        }
      ],
      list2: [
        {
          name: 'Comment créer mon compte Royal Canin ?',
          text: 'Cliquez en haut à droite de notre site sur “Mon compte” puis cliquez sur “Créer un compte”. La création de votre compte vous permet d’accéder à l’historique de vos commandes, à votre wishlist et informations personnelles.'
        },
        {
          name: "Comment accéder à mon compte si j'ai perdu mon mot de passe ?",
          text: 'Lors de votre identification, vous pouvez cocher “mot de passe oublié” et vous recevrez dans les minutes qui suivent un e-mail vous permettant de définir votre nouveau de mot de passe.'
        }
      ],
      list3: [
        {
          name: "Où trouver l'Atelier Félin ?",
          text: 'Nous vous accueillons au 142 Bd Saint Germain, de 12h-20h, du mardi au vendredi, de 10h à 20H le samedi et de 12h à 18H le dimanche.',
          text1:
            'Accès par le métro : Odéon, Mabillon et Bus : 63, 86, 87, 70, 96.',
          text2: 'Le magasin est adapté aux personnes à mobilité réduite.'
        },
        {
          name: "Peut-on prendre des photos au sein de l'Atelier Félin ?",
          text: 'Oui, aucun problème ! Vous aurez l’opportunité de partager votre expérience grâce à un espace dédié.'
        },
        {
          name: 'Puis-je amener mon chat ?',
          text: 'Oui, nous ne l’encourageons pas spécialement car il ne s’agit pas toujours d’une bonne expérience pour les chats. Mais si le vôtre est habitué à se déplacer, nous pourrons l’accueillir avec plaisir.'
        }
      ],
      list4: [
        {
          name: 'Je souhaite prendre rendez-vous avec un conseiller, comment faire ?',
          text: 'http',
          text1:
            'Cliquez sur « Prendre un rendez-vous» puis sélectionner le créneau de votre choix. Vous recevrez un mail récapitulatif avec toutes les informations concernant votre rendez-vous.'
        },
        {
          name: 'Qui sont les conseillers ?',
          text: 'Les rendez-vous sont assurés par nos conseillers en nutrition Royal Canin et des conseillers en comportement.',
          text1:
            'Ils sont présents pour répondre à vos questions en magasin ou en ligne.',
          text2:
            'Les rendez-vous pour des conseils nutritionnels sont offerts.',
          text3:
            'Pour les conseils en comportement, nous vous offrons 15min pour obtenir des précieux conseils. Il est possible de réserver un entretien plus long en payant le service. La liste et la disponibilité est à jour sur notre site.',
          text4:
            "Nous vous rappelons que l'Atelier Félin ne propose pas des consultations vétérinaires. Si votre chat a des problèmes de santé, veuillez contacter votre vétérinaire habituel."
        },
        {
          name: 'Combien coûte un entretien avec un comportementaliste ?',
          table: 'yes'
        },
        {
          name: 'Comment se déroule une session avec un conseiller ?',
          text: `Notre conseiller vous posera des questions sur votre chat afin de mener un bilan systémique : alimentation, comportement, environnement etc. Ainsi, à travers cette discussion, vous pourrez mettre en lumière les points sur lesquels vous pouvez jouer pour améliorer le bien-être de votre chat.`,
          ttbr: true,
          text1: `Si vous rencontrez des situations particulières avec votre chat, vous pourrez également en discuter ensemble et notre conseiller vous donnera des solutions à mettre en place.`,
          ttbr2: true,
          text2:
            "A l'issu de ce bilan, repartez avec vos conseils personnalisés ainsi qu'une recommandation nutritionnelle de la gamme Royal Canin adaptée à votre chat.",
          text3:
            "L'Atelier Félin n'est pas une clinique vétérinaire : pour les chats ayant des problèmes de santé, nous vous redirigerons toujours vers votre vétérinaire habituel."
        },
        {
          name: 'Peut-on réserver par téléphone ?',
          text: 'La réservation peut se faire aussi par téléphone ou en magasin.'
        },
        {
          name: "Quelle est la politique de remboursement ? A qui et où s'adresser en cas de réclamation ? ",
          text: 'En cas d’achat au sein de l’Atelier Félin, il faudra rapporter votre article non ouvert ni endommagé en magasin afin d’être remboursé.',
          text1:
            'En cas d’achat de rendez-vous avec un conseiller en comportement, celui-ci peut être déplacé ou remboursé si la demande est faite au moins 24h en avance. Pour réaliser le remboursement de ce service, il faut nous appeler ou nous envoyer un mail à latelierfelin@royalcanin.com. Au-delà de 24h, la prestation ne vous sera pas remboursée.'
        },
        {
          name: 'Mon paiement est-il sécurisé ?',
          text: "Oui, plus que jamais ! Notre système de commande en ligne est l'un des plus sûrs au monde et nous améliorons constamment nos logiciels pour une sécurité optimale. Royal Canin utilise une technologie de cryptage SSL de pointe, le logiciel de sécurité le plus avancé à ce jour pour les transactions en ligne."
        },
        {
          name: 'Peut-on se faire livrer les croquettes à domicile ?',
          text: 'Oui en commandant sur notre site internet vous pourrez être livrés à domicile.',
          list: [
            {
              name: 'Quelle est votre politique de confidentialité ?',
              type1: '1'
            },
            {
              name: 'Mes informations personnelles sont-elles protégée ?',
              type2: '1'
            },
            {
              name: 'Que fait Royal Canin de mes informations personnelles?',
              type3: '1'
            },
            {
              name: 'Votre site installe-t-il des cookies ?',
              text: "Oui, nous installons temporairement des fichiers sur votre ordinateur lorsque vous êtes sur notre site. Les cookies nous aident à améliorer votre expérience de navigation et de commande. Nous vous recommandons d'autoriser les cookies pour utiliser au mieux notre boutique en ligne et améliorer nos services."
            }
          ]
        }
      ],
      maxHeight: null,
      maxHeightTwo: null
    };
    this.hasRePositioned = false;
  }

  componentDidMount() {
    // this.scrollEventPanelIntoView();
  }

  scrollEventPanelIntoView() {
    const { history } = this.props;
    if (
      history.location.pathname.includes('/felin/event') &&
      !this.hasRePositioned
    ) {
      this.hasRePositioned = true;
      scrollIntoView(document.querySelector(`#event`));
    }
  }

  gotoAddPc = () => {
    let anchorElement = document.getElementById('pcexperts');
    window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 6);
  };
  gotoAddH = () => {
    let anchorElement = document.getElementById('hexperts');
    window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
  };
  goto = () => {
    let anchorElement = document.getElementById('faq');
    window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
  };

  handleClick = (e, index) => {
    e.target.classList.toggle('active');
    var panel = e.target.nextElementSibling
      ? e.target.nextElementSibling
      : e.target.parentNode.parentNode.nextElementSibling;
    if (panel.style.maxHeight) {
      this.setState({
        maxHeight: null,
        activeMaxKey: null
      });
    } else {
      this.setState({
        maxHeight: panel.scrollHeight + 'px',
        activeMaxKey: index
      });
    }
  };
  handleClickTwo = (e, index) => {
    let height = this.state.maxHeight.split('px')[0];
    e.target.classList.toggle('active');
    var panel = e.target.nextElementSibling
      ? e.target.nextElementSibling
      : e.target.parentNode.parentNode.nextElementSibling;
    if (panel.style.maxHeight) {
      this.setState({
        activeMaxKeyTwo: null,
        maxHeightTwo: null,
        maxHeight: parseInt(height) - parseInt(panel.scrollHeight) + 'px'
      });
    } else {
      this.setState({
        maxHeightTwo: panel.scrollHeight + 'px',
        maxHeight: parseInt(height) + parseInt(panel.scrollHeight) + 'px',
        activeMaxKeyTwo: index
      });
    }
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    const event = {
      page: {
        type: 'Felin',
        theme: '',
        path: this.props.location.pathname
      }
    };
    return (
      <div>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header">
          <div className="header-content">
            <div className="bg-module" />
            <img
              className="pc-block"
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/header.jpg`}
              alt=""
            />
            <img className="h-block" src={header1} alt="" />
            <div className="hd-text-cont">
              <div className="introduce fontw-500">
                L’ Atelier Félin vous accueille à Paris et en ligne pour vous
                conseiller et répondre à vos questions sur votre chat.
              </div>
              <button
                onClick={this.gotoAddPc}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs pc-block"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Prendre un rendez-vous
              </button>
              <button
                onClick={this.gotoAddH}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs h-block"
                style={{
                  width: '9.875rem',
                  fontSize: '0.75rem',
                  padding: '0.5rem 0'
                }}
              >
                Prendre un rendez-vous
              </button>
              {/* <div className="text">
                Profitez de 15min gratuites avec un expert
              </div> */}
            </div>
          </div>
          <div className="time-content">
            <h2 className="rc-beta font-weight-bold h2style">
              Retrouvez-nous au 142 Bd Saint-Germain à Paris !
            </h2>
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0">
            <div className="rc-max-width--lg">
              <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                <div className="rc-column felin-mpd0">
                  <LazyLoad className="w-100 h-100">
                    <img
                      className="pc-block time-img"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/img.jpg`}
                      alt=""
                    />
                    <img
                      className="h-block time-img"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/img.jpg`}
                      alt=""
                    />
                  </LazyLoad>
                </div>
                <div className="rc-column felin-p20">
                  <div className="visit-text">
                    <div className="visit-text-cont mb10">
                      L’Atelier félin est dédié au bien-être et à l’équilibre de
                      votre chat. Échangez avec nos conseillers afin de mieux
                      connaître votre chat et pour lui apporter le meilleur tout
                      au long de sa vie. Vous pourrez y procurer les gammes
                      nutritionnelles Royal Canin adaptées aux besoins
                      spécifiques de votre chat ainsi que des accessoires en
                      lien avec la bonne santé de votre chat.
                      <div className="mb10" />
                      Nous sommes ouverts à tous, du mardi au vendredi de 12h à
                      20h, le samedi de 10h à 20h et le dimanche de 12h à 18h.
                    </div>
                    <button
                      onClick={this.gotoAddPc}
                      className="rc-btn rc-btn--two  rc-margin-bottom--xs pc-block"
                      style={{
                        width: '10.875rem',
                        fontSize: '0.75rem',
                        float: 'right',
                        padding: '0.6rem 0'
                      }}
                    >
                      Prendre un rendez-vous
                    </button>
                    <button
                      onClick={this.gotoAddH}
                      className="rc-btn rc-btn--two  rc-margin-bottom--xs h-block"
                      style={{
                        width: '10.875rem',
                        fontSize: '0.75rem',
                        padding: '0.6rem 0'
                      }}
                    >
                      Prendre un rendez-vous
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pc-block rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0 mb16">
            <div className="rc-max-width--lg">
              <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                <div className="rc-column felin-p20">
                  <LazyLoad className="w-100">
                    <div className="visit-text fr">
                      <div className="visit-text-cont mb10">
                        <b>Des conseils en comportement</b> vous aideront à
                        améliorer le bien-être de votre chat, à mieux le
                        comprendre, et vivre une relation épanouie !
                        <div className="mb10" />
                        Chaque chat est unique et a des besoins spécifiques
                        selon sa race, son âge, ses sensibilités et son mode de
                        vie. En fonction des besoins nutritionnels de votre chat
                        en bonne santé, nous vous conseillerons sur
                        l'alimentation Royal Canin qui lui conviendra le mieux.
                      </div>
                      <button
                        onClick={this.gotoAddPc}
                        className="rc-btn rc-btn--two  rc-margin-bottom--xs pc-block"
                        style={{
                          width: '10.875rem',
                          fontSize: '0.75rem',
                          float: 'right',
                          padding: '0.6rem 0'
                        }}
                      >
                        Prendre un rendez-vous
                      </button>
                    </div>
                  </LazyLoad>
                </div>
                <div className="rc-column felin-mpd0">
                  <LazyLoad className="w-100 h-100">
                    <img src={cat1} alt="" className="cat-img" />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </div>
          <div className="h-block rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0">
            <div className="rc-max-width--lg">
              <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                <div className="rc-column felin-mpd0">
                  <LazyLoad className="w-100 h-100">
                    <img src={cat1} alt="" className="cat-img" />
                  </LazyLoad>
                </div>
                <div className="rc-column felin-p20">
                  <div className="visit-text">
                    <div className="visit-text-cont mb10">
                      <b>Des conseils en comportement</b> vous aideront à
                      améliorer le bien-être de votre chat, à mieux le
                      comprendre, et vivre une relation épanouie !
                      <div className="mb10" />
                      Chaque chat est unique et a des besoins spécifiques selon
                      sa race, son âge, ses sensibilités et son mode de vie. En
                      fonction des besoins nutritionnels de votre chat en bonne
                      santé, nous vous conseillerons sur l'alimentation Royal
                      Canin qui lui conviendra le mieux.
                    </div>
                    <button
                      onClick={this.gotoAddH}
                      className="rc-btn rc-btn--two  rc-margin-bottom--xs h-block"
                      style={{
                        width: '10.875rem',
                        fontSize: '0.75rem',
                        padding: '0.6rem 0'
                      }}
                    >
                      Prendre un rendez-vous
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="rc-beta font-weight-bold h2style txt-centr">
            Des conseillers en nutrition Royal Canin à votre écoute !
          </h2>
          <Conseiller />
          <ConseillerTwo />
          {/*评论展示*/}
          <div
            id="comment"
            className="comment"
            style={{
              flexDirection: 'column',
              display: this.state.reviews.list.length === 0 ? 'none' : 'block'
            }}
          >
            <div className="comment-slider-box">
              <img className="comment-img" src={thak} alt="" />
              <div className="comment-slider">
                <Slider {...settings}>
                  {this.state.reviews.list.map((item, index) => {
                    if (index > 2) {
                      return null;
                    }
                    return (
                      <div key={index}>
                        <div className="rate-cont">
                          <span style={{ marginRight: '1rem' }}>
                            {item.rate}.0
                          </span>
                          <Rate
                            color=""
                            def={item.rate}
                            disabled
                            style={{ fontSize: 20 }}
                          />
                        </div>
                        <div className="comment-text">{item.description}</div>
                      </div>
                    );
                  })}
                </Slider>
                <div style={{ textAlign: 'center', marginTop: '0.625rem' }}>
                  <span
                    onClick={() => {
                      this.setState({
                        reviews: { ...this.state.reviews, visible: true }
                      });
                    }}
                    className="but-dec"
                    style={{
                      fontSize: '1.125rem'
                    }}
                  >
                    Voir plus d’avis
                  </span>
                </div>
              </div>
            </div>
            <Reviews
              visible={this.state.reviews.visible}
              onClose={() => {
                this.setState({
                  reviews: { ...this.state.reviews, visible: false }
                });
              }}
              onList={(list) => {
                if (this.state.reviews.list.length === 0) {
                  this.setState({
                    reviews: { ...this.state.reviews, list: list }
                  });
                }
                setTimeout(() => {
                  this.scrollEventPanelIntoView();
                });
              }}
            />
          </div>
          <div id="event" className="nos-cont">
            <div className="pc-block rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0">
              <div className="rc-max-width--lg">
                <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                  <div className="rc-column felin-p20">
                    <LazyLoad className="w-100">
                      <div className="nos-cont-text fr">
                        <p className="col0 visit-text-p">
                          Rencontrez régulièrement des conseillers et partagez
                          l’expérience avec les autres membres de notre
                          communauté !
                        </p>
                        <p className="col0 visit-text-p">
                          Profitez de notre programmation avec les journées
                          d’adoption, découverte de races et ateliers pour les
                          enfants.
                        </p>
                        <a
                          style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '1.125rem'
                          }}
                          href="https://www.eventbrite.fr/o/latelier-felin-45685917373"
                          target="_blank"
                        >
                          Suivre nos évènements
                        </a>
                      </div>
                    </LazyLoad>
                  </div>
                  <div className="rc-column felin-mpd0">
                    <LazyLoad className="w-100 h-100">
                      <img
                        className="pc-block nos-img-box"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/nos.jpg`}
                        alt=""
                      />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-block rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0">
              <div className="rc-max-width--lg">
                <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                  <div className="rc-column felin-mpd0">
                    <LazyLoad className="w-100 h-100">
                      <img
                        className="h-block nos-img-box"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/nos1_v2.jpg`}
                        alt=""
                      />
                    </LazyLoad>
                  </div>
                  <div className="rc-column felin-p20">
                    <LazyLoad className="w-100">
                      <div className="nos-cont-text fr">
                        <p className="col0 visit-text-p">
                          Rencontrez régulièrement des conseillers et partagez
                          l’expérience avec les autres membres de notre
                          communauté !
                        </p>
                        <p className="col0 visit-text-p">
                          Profitez de notre programmation avec les journées
                          d’adoption, découverte de races et ateliers pour les
                          enfants.
                        </p>
                        <a
                          style={{
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                          href="https://www.eventbrite.fr/o/latelier-felin-45685917373"
                          target="_blank"
                        >
                          Suivre nos évènements
                        </a>
                      </div>
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="txt-centr mb16" id="pcexperts">
            <h2
              className="rc-beta font-weight-bold h2style"
              style={{ color: '#e2001a' }}
            >
              Réservez une séance avec un conseiller de l’Atelier Félin
            </h2>
            <div className="problem" id="Voir-fqas">
              Venez prendre des conseils pour prendre soin de votre chat en
              bonne santé. Vous pouvez réserver un rendez-vous dans l’atelier ou
              un appel vidéo.
              <br />
              <strong>
                L'Atelier Félin ne propose pas des consultations vétérinaires.
              </strong>{' '}
              Si votre chat a des problèmes de santé, veuillez contacter votre
              vétérinaire habituel.
              <br />
              Avez-vous des questions ?{' '}
              <span onClick={this.goto} style={{ cursor: 'pointer' }}>
                Voir FAQs
              </span>
            </div>
          </div>
          {/* 默认页面 */}
          <Pcexperts history={this.props.history} />
          <Hexperts history={this.props.history} />
          <div className="Faq-cont" id="faq">
            <div className="title col0 font-500">FAQs</div>
          </div>
          <div className="faq-coll">
            <div>
              <h3
                style={{ marginBottom: '0.75rem', color: '#e2001a' }}
                className="font-500 tx-center"
              >
                À propos
              </h3>
              {this.state.list.map((item, index) => {
                return (
                  <div key={index} className="fqabox">
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index)}
                      style={{
                        marginBottom:
                          this.state.activeMaxKey === index ? '10px' : '0'
                      }}
                    >
                      <div
                        style={{
                          float: 'right',
                          height: '1.5rem'
                        }}
                      >
                        {this.state.activeMaxKey === index &&
                        this.state.maxHeight ? (
                          <span
                            className="iconfont iconUp"
                            style={{ fontSize: '1.25rem' }}
                          />
                        ) : (
                          <span
                            className="iconfont iconDown"
                            style={{ fontSize: '1.25rem' }}
                          />
                        )}
                      </div>
                      {item.name}
                    </button>
                    <div
                      className="panel"
                      style={{
                        maxHeight:
                          this.state.activeMaxKey === index
                            ? this.state.maxHeight
                            : null
                      }}
                    >
                      <p>{item.text}</p>
                      <p>{item.text1}</p>
                      <p>{item.text2 ? item.text2 : ''}</p>
                      <p>{item.text3 ? item.text3 : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                  color: '#e2001a'
                }}
                className="font-500 tx-center"
              >
                Nous contacter
              </h3>
              {this.state.list1.map((item, index) => {
                return (
                  <div key={index} className="fqabox">
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index + 'a')}
                      style={{
                        marginBottom:
                          this.state.activeMaxKey === index + 'a' ? '10px' : '0'
                      }}
                    >
                      <div
                        style={{
                          float: 'right',
                          height: '1.5rem'
                        }}
                      >
                        {this.state.activeMaxKey === index + 'a' &&
                        this.state.maxHeight ? (
                          <span
                            className="iconfont iconUp"
                            style={{ fontSize: '1.25rem' }}
                          />
                        ) : (
                          <span
                            className="iconfont iconDown"
                            style={{ fontSize: '1.25rem' }}
                          />
                        )}
                      </div>
                      {item.name}
                    </button>
                    <div
                      className="panel"
                      style={{
                        maxHeight:
                          this.state.activeMaxKey === index + 'a'
                            ? this.state.maxHeight
                            : null
                      }}
                    >
                      <p>
                        Nous serons ravis de vous aider ! Ecrivez-nous un mail à
                        <a
                          style={{
                            textDecoration: 'underline',
                            color: 'blue',
                            marginLeft: '0.3125rem'
                          }}
                          href="mailto:latelierfelin@royalcanin.com"
                        >
                          latelierfelin@royalcanin.com
                        </a>
                        , passer nous voir au 142 Bd Saint Germain à Paris , ou
                        appelez-nous au{' '}
                        <b style={{ color: '#e2001a' }}>0 800 41 51 61.</b>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                  color: '#e2001a'
                }}
                className="font-500 tx-center"
              >
                Mon compte
              </h3>
              {this.state.list2.map((item, index) => {
                return (
                  <div key={index} className="fqabox">
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index + 'b')}
                      style={{
                        marginBottom:
                          this.state.activeMaxKey === index + 'b' ? '10px' : '0'
                      }}
                    >
                      <div
                        style={{
                          float: 'right',
                          height: '1.5rem'
                        }}
                      >
                        {this.state.activeMaxKey === index + 'b' &&
                        this.state.maxHeight ? (
                          <span
                            className="iconfont iconUp"
                            style={{ fontSize: '1.25rem' }}
                          />
                        ) : (
                          <span
                            className="iconfont iconDown"
                            style={{ fontSize: '1.25rem' }}
                          />
                        )}
                      </div>
                      {item.name}
                    </button>
                    <div
                      className="panel"
                      style={{
                        maxHeight:
                          this.state.activeMaxKey === index + 'b'
                            ? this.state.maxHeight
                            : null
                      }}
                    >
                      <p>{item.text}</p>
                      <p>{item.text1}</p>
                      <p>{item.text2 ? item.text2 : ''}</p>
                      <p>{item.text3 ? item.text3 : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                  color: '#e2001a'
                }}
                className="font-500 tx-center"
              >
                Organiser ma visite
              </h3>
              {this.state.list3.map((item, index) => {
                return (
                  <div key={index} className="fqabox">
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index + 'c')}
                      style={{
                        marginBottom:
                          this.state.activeMaxKey === index + 'c' ? '10px' : '0'
                      }}
                    >
                      <div
                        style={{
                          float: 'right',
                          height: '1.5rem'
                        }}
                      >
                        {this.state.activeMaxKey === index + 'c' &&
                        this.state.maxHeight ? (
                          <span
                            className="iconfont iconUp"
                            style={{ fontSize: '1.25rem' }}
                          />
                        ) : (
                          <span
                            className="iconfont iconDown"
                            style={{ fontSize: '1.25rem' }}
                          />
                        )}
                      </div>
                      {item.name}
                    </button>
                    <div
                      className="panel"
                      style={{
                        maxHeight:
                          this.state.activeMaxKey === index + 'c'
                            ? this.state.maxHeight
                            : null
                      }}
                    >
                      <p>{item.text}</p>
                      <p>{item.text1}</p>
                      <p>{item.text2 ? item.text2 : ''}</p>
                      <p>{item.text3 ? item.text3 : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3
                style={{
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                  color: '#e2001a'
                }}
                className="font-500 tx-center"
              >
                Rencontrer un conseiller
              </h3>
              {this.state.list4.map((item, index) => {
                return (
                  <div key={index} className="fqabox">
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index + 'd')}
                      style={{
                        marginBottom:
                          this.state.activeMaxKey === index + 'd' ? '10px' : '0'
                      }}
                    >
                      <div
                        style={{
                          float: 'right',
                          height: '1.5rem'
                        }}
                      >
                        {this.state.activeMaxKey === index + 'd' &&
                        this.state.maxHeight ? (
                          <span
                            className="iconfont iconUp"
                            style={{ fontSize: '1.25rem' }}
                          />
                        ) : (
                          <span
                            className="iconfont iconDown"
                            style={{ fontSize: '1.25rem' }}
                          />
                        )}
                      </div>
                      {item.name}
                    </button>
                    <div
                      className="panel"
                      style={{
                        maxHeight:
                          this.state.activeMaxKey === index + 'd'
                            ? this.state.maxHeight
                            : null
                      }}
                    >
                      <p>
                        {item.text ? (
                          item.text === 'http' ? (
                            <span>
                              Vous pouvez réserver un créneau sur notre site :{' '}
                              <a
                                style={{
                                  textDecoration: 'underline',
                                  color: 'blue'
                                }}
                                href="https://www.royalcanin.com/fr/shop/felin"
                                target="_blank"
                              >
                                https://www.royalcanin.com/fr/shop/felin
                              </a>
                            </span>
                          ) : (
                            item.text
                          )
                        ) : (
                          ''
                        )}
                      </p>
                      <p>{item.ttbr ? <br /> : ''}</p>
                      <p dangerouslySetInnerHTML={{ __html: item.text1 }} />
                      <p>{item.ttbr2 ? <br /> : ''}</p>
                      <p>{item.text2 ? item.text2 : ''}</p>
                      <p>{item.text3 ? item.text3 : ''}</p>
                      <p>{item.text4 ? item.text4 : ''}</p>
                      {item.table ? (
                        <table className="tableStyle tCenter">
                          <tbody>
                            <tr className="tableTitle">
                              <td>Expert RDV 30mn</td>
                              <td>40,00 €</td>
                            </tr>
                            <tr className="tableTitle">
                              <td>Expert RDV 45mn</td>
                              <td>55,00 €</td>
                            </tr>
                            <tr className="tableTitle">
                              <td>Expert RDV 60mn</td>
                              <td>70,00 €</td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        ''
                      )}
                      {item.list &&
                        item.list.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="fqabox"
                              style={{ border: item.text ? '0' : '' }}
                            >
                              <button
                                className="accordion"
                                onClick={(e) =>
                                  this.handleClickTwo(e, index + 'e')
                                }
                                style={{
                                  marginBottom:
                                    this.state.activeMaxKeyTwo === index + 'e'
                                      ? '10px'
                                      : '0'
                                }}
                              >
                                <div
                                  style={{
                                    float: 'right',
                                    height: '1.5rem'
                                  }}
                                >
                                  {this.state.activeMaxKeyTwo === index + 'e' &&
                                  this.state.maxHeightTwo ? (
                                    <span
                                      className="iconfont iconUp"
                                      style={{ fontSize: '1.25rem' }}
                                    />
                                  ) : (
                                    <span
                                      className="iconfont iconDown"
                                      style={{ fontSize: '1.25rem' }}
                                    />
                                  )}
                                </div>
                                {item.name}
                              </button>
                              <div
                                className="panel"
                                style={{
                                  maxHeight:
                                    this.state.activeMaxKeyTwo === index + 'e'
                                      ? this.state.maxHeightTwo
                                      : null
                                }}
                              >
                                <p>{item.text ? item.text : ''}</p>
                                <p>
                                  {item.type1 ? (
                                    <span>
                                      Vous pouvez consulter notre politique de
                                      confidentialité en suivant ce lien.{' '}
                                      <a
                                        style={{
                                          textDecoration: 'underline',
                                          color: 'blue'
                                        }}
                                        target="_blank"
                                        href="https://www.mars.com/privacy-policy-france"
                                      >
                                        https://www.mars.com/privacy-policy-france
                                      </a>
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                  {item.type2 ? (
                                    <span>
                                      Notre site utilise un protocole SSL pour
                                      encrypter toutes les données personnelles
                                      envoyées lors du paiement. Pour plus
                                      d'informations sur la sécurisation et
                                      l'utilisation de vos données, veuillez
                                      consulter notre Politique de
                                      confidentialité.
                                      <a
                                        style={{
                                          textDecoration: 'underline',
                                          color: 'blue'
                                        }}
                                        target="_blank"
                                        href="https://www.mars.com/privacy-policy-france"
                                      >
                                        https://www.mars.com/privacy-policy-france
                                      </a>
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                  {item.type3 ? (
                                    <span>
                                      La confidentialité de vos données
                                      personnelles est essentielle à nos yeux.
                                      Nous ne partageons vos données qu'avec les
                                      entreprises fournissant des services en
                                      notre nom. Ces entreprises n'ont pas le
                                      droit d'utiliser les données que nous
                                      partageons avec elles à d'autres fins et
                                      doivent les garder confidentielles, sauf
                                      si vous consentez à leur utilisation. Pour
                                      plus d'informations, veuillez consulter
                                      nos "Conditions générales".
                                      <a
                                        style={{
                                          textDecoration: 'underline',
                                          color: 'blue'
                                        }}
                                        target="_blank"
                                        href="https://www.royalcanin.com/fr/general-sales-conditions"
                                      >
                                        https://www.royalcanin.com/fr/general-sales-conditions
                                      </a>
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default Felin;
