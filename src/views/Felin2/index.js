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
import cat1 from './image/cat1.png';
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
          name: 'Quest ce que lAtelier Félin?',
          text: 'LAtelier Félin est un magasin dédié au bien-être et à l’équilibre de votre chat, par Royal Canin, expert en nutrition féline. LAtelier Félin est un lieu pour échanger avec des experts, poser vos questions, recevoir des conseils afin de mieux connaître votre chat pour lui apporter les meilleurs soins ainsi que la nourriture la plus appropriée. C’est aussi un lieu pour acheter la meilleure nutrition ainsi que des accessoires ou produits en lien avec la santé et le bien être des chats.'
        },
        {
          name: 'Qui est Royal Canin ?',
          text: 'Royal Canin semploie depuis 1968 à créer la nutrition santé pour animaux la plus précise au monde. Nous contribuons ainsi à créer un monde meilleur pour les animaux de compagnie. Nous concentrons notre attention sur les besoins uniques des chats et des chiens. Cette obsession de la santé animale, nous permet de fournir une nutrition précise et bénéfique pour les aider devenir des animaux magnifiques.'
        },
        {
          name: 'Existe-t-il une initiative similaire pour les chiens ?',
          text: 'oNon pas pour le moment, mais vous pourrez découvrir notre concept store au 126 rue de Turenne jusqu’au 14 avril. Vous y trouverez des activités et des experts “chien”, mais ils nous n’y vendons pas de produits de nutrition. Vous néanmoins aurez l’opportunité de commander nos références pour chien depuis l’Atelier Félin.'
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
          name: 'Comment accéder à mon compte si jai perdu mon mot de passe ?',
          text: 'Lors de votre identification, vous pouvez cocher “mot de passe oublié” et vous recevrez dans les minutes qui suivent un e-mail vous permettant de définir votre nouveau de mot de passe.'
        }
      ],
      list3: [
        {
          name: 'Où trouver lAtelier Félin ?',
          text: 'Nous vous accueillons du 142 Bd Saint Germain, de 12h-20h, du mardi au vendredi, de 10h à 20H le samedi et de 10h à 18H le Dimanche.',
          text1:
            'Accès par le métro : Odéon, Mabillon et Bus : 63, 86, 87, 70, 96.',
          text2: 'Le magasin est adapté aux personnes à mobilité réduite.'
        },
        {
          name: 'Peut-on prendre des photos au sein de lAtelier Félin ?',
          text: 'Oui, aucun problème ! Vous aurez l’opportunité de partager votre expérience grâce à un espace dédié.'
        },
        {
          name: 'Puis-je amener mon chat ?',
          text: 'Oui, nous ne l’encourageons pas spécialement car il ne s’agit pas toujours d’une bonne expérience pour les chats. Mais si le vôtre est habitué à se déplacer, nous pourrons l’accueillir avec plaisir.'
        }
      ],
      list4: [
        {
          name: 'Je souhaite prendre rendez-vous avec un expert, comment faire ?',
          text: 'http',
          text1:
            'Cliquez sur « Rencontrez nos experts » puis sélectionner le créneau avec lexpert de votre choix. Vous recevrez un mail récapitulatif avec toutes les informations concernant votre rendez-vous.'
        },
        {
          name: 'Qui sont les experts ?',
          text: 'Les rendez-vous sont assurés par nos experts en nutrition et en comportement.',
          text1:
            'Ils sont présents pour répondre à vos questions en magasin, et nous vous offrons 15min de leurs précieux conseils.',
          text2:
            'Il est possible de réserver un entretien plus long en payant le service. La liste et la disponibilité des experts est à jour sur notre site.',
          text3:
            'LAtelier Félin nest pas une clinique vétérinaire : pour les chats ayant des problèmes de santé, nous vous redirigerons vers un vétérinaire.'
        },
        {
          name: "Combien coûte une discussion avec l'expert ?",
          table: 'yes'
        },
        {
          name: "Comment se déroule le bilan avec l'expert ?",
          text: 'Notre expert vous posera des questions sur votre chat afin de mener un bilan systémique : alimentation, comportement, environnement etc. Ainsi, à travers cette discussion, vous pourrez mettre en lumière les points sur lesquels vous pouvez jouer pour améliorer le bien-être de votre chat. Vous apprendrez à mieux comprendre et communiquer avec votre chat grâce à la connaissance des félins de nos experts et leur pédagogie.',
          text1:
            'Si vous avez des problèmes particuliers, vous pourrez également en discuter ensemble et notre expert vous donnera des solutions à mettre en place afin de les résoudre.',
          tetx2:
            "A l'issu de ce bilan, repartez avec vos conseils personnalisés ainsi qu'une recommandation de la nutrition parfaitement adaptée à votre chat.\n" +
            "L'Atelier Félin n'est pas une clinique vétérinaire : pour les chats ayant des problèmes de santé, nous vous redirigerons vers un vétérinaire.\n"
        },
        {
          name: 'Peut-on réserver par téléphone ?',
          text: 'La réservation peut se faire aussi par téléphone ou en magasin.'
        },
        {
          name: "Quelle est la politique de remboursement ? A qui et où s'adresser en cas de réclamation ? ",
          text: 'En cas d’achat au sein de l’Atelier Félin, il faudra rapporter votre article non ouvert ni endommagé en magasin afin d’être remboursé.',
          text1:
            'En cas d’achat de rendez-vous avec un expert, celui-ci peut être déplacé ou remboursé si la demande est faite au moins 24h en avance. Pour réaliser le remboursement de ce service, il faut nous appeler au magasin. Au-delà de 24h, la prestation ne vous sera pas remboursée.'
        },
        {
          name: 'Mon paiement est-il sécurisé ?',
          text: "Oui, plus que jamais ! Notre système de commande en ligne est l'un des plus sûrs au monde et nous améliorons constamment nos logiciels pour une sécurité optimale. Royal Canin utilise une technologie de cryptage SSL de pointe, le logiciel de sécurité le plus avancé à ce jour pour les transactions en ligne."
        },
        {
          name: 'Peut-on se faire livrer les croquettes à domicile ?',
          tetx: 'Oui en commandant sur notre site internet vous pourrez être livrés à domicile.'
        },
        {
          name: 'Quelle est votre politique de confidentialité ?'
        },
        {
          name: 'Mes informations personnelles sont-elles protégée ?'
        },
        {
          name: 'Que fait Royal Canin de mes informations personnelles?'
        },
        {
          name: 'Votre site installe-t-il des cookies ?',
          text: "Oui, nous installons temporairement des fichiers sur votre ordinateur lorsque vous êtes sur notre site. Les cookies nous aident à améliorer votre expérience de navigation et de commande. Nous vous recommandons d'autoriser les cookies pour utiliser au mieux notre boutique en ligne et améliorer nos services."
        }
      ],
      maxHeight: null
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
        <GoogleTagManager additionalEvents={event} />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header">
          <div className="header-content">
            <div className="bg-module" />
            <LazyLoad className="w-100">
              <img
                className="pc-block"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/header.jpg`}
                alt=""
              />
              <img
                className="h-block"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/header1.jpg`}
                alt=""
              />
            </LazyLoad>
            <div className="hd-text-cont">
              <div className="introduce fontw-500">
                L’Atelier Félin vous accueille à Paris pour vous conseiller et
                répondre à vos questions sur votre chat.
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
                  width: '16.875rem'
                }}
              >
                Prendre un rendez-vous
              </button>
              <div className="text">
                Profitez de 15min gratuites avec un expert
              </div>
            </div>
          </div>
          <div className="time-content">
            <div className="time font-500">
              Retrouvez-nous au 142 Bd Saint-Germain à Paris pour visiter la
              boutique et prendre un rendez-vous avec un expert!
            </div>
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0">
            <div className="rc-max-width--xxl">
              <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                <div className="rc-column felin-mpd0">
                  <LazyLoad className="w-100">
                    <img
                      className="pc-block time-img"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/img.jpg`}
                      alt=""
                    />
                    <img
                      className="h-block time-img"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/img1.jpg`}
                      alt=""
                    />
                  </LazyLoad>
                </div>
                <div className="rc-column felin-p30">
                  <div className="visit-text">
                    <div className="visit-text-tip font-500">
                      L’ Atelier Félin, la boutique parisienne experte du bien
                      être des chats
                    </div>
                    <div className="visit-text-cont">
                      Notre magasin est dédié au bien-être et à l’équilibre de
                      votre chat, créé par Royal Canin, expert en nutrition
                      féline. Échangez avec nos experts afin de mieux connaître
                      votre chat pour lui apporter le meilleur tout au long de
                      sa vie. Vous pourrez vous y procurer la meilleure
                      nutrition ainsi que des accessoires ou produits en lien
                      avec la santé de votre chat.
                      <div className="mb10" />
                      L’ Atelier Félin est ouvert à tous, du mardi au vendredi
                      de 12h à 20h, le samedi de 10h à 20h et le dimanche de 10h
                      à 18h.
                    </div>
                    <button
                      onClick={this.gotoAddPc}
                      className="rc-btn rc-btn--two  rc-margin-bottom--xs pc-block"
                      style={{
                        width: '13.875rem',
                        fontSize: '0.75rem'
                      }}
                    >
                      Prendre un rendez-vous
                    </button>
                    <button
                      onClick={this.gotoAddH}
                      className="rc-btn rc-btn--two  rc-margin-bottom--xs h-block"
                      style={{
                        width: '16.875rem'
                      }}
                    >
                      Prendre un rendez-vous
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0 mb16">
            <div className="rc-max-width--xxl">
              <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                <div className="rc-column felin-p30">
                  <LazyLoad className="w-100">
                    <div className="visit-text fr">
                      <div className="visit-text-tip font-500">
                        Nos experts à votre écoute
                      </div>
                      <div className="visit-text-cont">
                        Nos <b>comportementalistes</b> sont là pour vous aider à
                        améliorer le bien être de votre chat et vous aider à
                        résoudre les problèmes (malpropreté, agressivité,
                        dégradations, etc.), à mieux le comprendre, et vivre une
                        relation épanouie !
                        <div className="mb10" />
                        Chaque chat est unique et a des besoins spécifiques
                        selon sa race, son âge, ses sensibilités et son mode de
                        vie. Nos <b>experts en nutrition</b> vous conseillerons
                        sur l'alimentation qui lui conviendra le mieux.
                      </div>
                      <button
                        onClick={this.gotoAddPc}
                        className="rc-btn rc-btn--two  rc-margin-bottom--xs pc-block"
                        style={{
                          width: '13.875rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        Prendre un rendez-vous
                      </button>
                      <button
                        onClick={this.gotoAddH}
                        className="rc-btn rc-btn--two  rc-margin-bottom--xs h-block"
                        style={{
                          width: '16.875rem'
                        }}
                      >
                        Prendre un rendez-vous
                      </button>
                    </div>
                  </LazyLoad>
                </div>
                <div className="rc-column felin-mpd0">
                  <LazyLoad className="w-100">
                    <img src={cat1} alt="" style={{ width: '70%' }} />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </div>
          <div className="une-title font-500">
            Une équipe engagée pour vous conseiller
          </div>
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
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      this.setState({
                        reviews: { ...this.state.reviews, visible: true }
                      });
                    }}
                    className="rc-btn rc-btn--two"
                    style={{
                      marginTop: '20px',
                      width: '13.875rem',
                      fontSize: '0.75rem'
                    }}
                  >
                    Voir plus d’avis
                  </button>
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
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile felin-mpd0">
              <div className="rc-max-width--xxl">
                <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                  <div className="rc-column felin-p30">
                    <LazyLoad className="w-100">
                      <div className="nos-cont-text fr">
                        <p className="col0 visit-text-p">Nos évènements</p>
                        <p className="col0 visit-text-p">
                          Rencontrez régulièrement nos profils d’experts et
                          partagez l'expérience avec les autres membres de notre
                          communauté !
                        </p>
                        <p className="col0 visit-text-p">
                          Profitez de notre programmation pour en savoir plus
                          sur les besoins de votre chat et guettez la mise en
                          ligne du planning.
                        </p>
                        <a
                          style={{
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                          href="https://fr-fr.facebook.com/RoyalCaninFrance"
                        >
                          Consulter les évènements sur la page Facebook Royal
                          Canin
                        </a>
                      </div>
                    </LazyLoad>
                  </div>
                  <div className="rc-column felin-mpd0">
                    <LazyLoad className="w-100">
                      <img
                        className="pc-block nos-img-box"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/nos.jpg`}
                        alt=""
                      />
                      <img
                        className="h-block nos-img-box"
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin2/nos1_v2.jpg`}
                        alt=""
                      />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="txt-centr mb16" id="pcexperts">
            <h2 className="size18 font-500 mb16" style={{ color: '#e2001a' }}>
              Réservez une séance avec un expert de l'Atelier Félin
            </h2>
            <div className="problem" id="Voir-fqas">
              Venez rencontrer nos comportementalistes et experts de nutrition
              qui vous guideront pour prendre soin de votre chat. Vous pouvez
              réserver un rendez-vous dans l’atelier ou un appel vidéo.
              Avez-vous des questions?{' '}
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
            <div className="tip">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br /> Curabitur finibus ut urna vitae placerat.
            </div>
          </div>
          <div className="faq-coll">
            <div>
              <h3
                style={{ marginBottom: '0.75rem' }}
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
                      <p>
                        {item.text2 ? (
                          item.text2 === 'http' ? (
                            <span>
                              Tous les derniers dimanche du mois, nous
                              organisons une journée adoption avec des refuges
                              et associations partenaires. Afin de soutenir
                              notre stratégie de développement durable, nous
                              proposerons un point de collecte des emballages RC
                              vides (croquettes et pâtés), qui seront ensuite
                              envoyés dans un usine spécialisée en recyclage.
                              Nhésitez pas à vous inscrire sur notre site{' '}
                              <a
                                style={{
                                  textDecoration: 'underline',
                                  color: 'blue'
                                }}
                                href="https://www.royalcanin.com/fr/shop/latelier/felin"
                              >
                                {' '}
                                (https://www.royalcanin.com/fr/shop/latelier/felin){' '}
                              </a>
                              pour être tenu au courant du projet !
                            </span>
                          ) : (
                            item.text2
                          )
                        ) : (
                          ''
                        )}
                      </p>
                      <p>{item.text3 ? item.text3 : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3
                style={{ marginBottom: '0.75rem', marginTop: '2rem' }}
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
                            color: 'blue'
                          }}
                        >
                          latelierfelin@royalcanin.com
                        </a>
                        , passer nous voir au 142 Bd Saint Germain à Paris , ou
                        appelez-nous au XnuméroX.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3
                style={{ marginBottom: '0.75rem', marginTop: '2rem' }}
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
                style={{ marginBottom: '0.75rem', marginTop: '2rem' }}
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
                style={{ marginBottom: '0.75rem', marginTop: '2rem' }}
                className="font-500 tx-center"
              >
                Rencontrer un expert
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
                              Vous pouvez réserver les créneaux avec les experts
                              sur notre site :{' '}
                              <a
                                style={{
                                  textDecoration: 'underline',
                                  color: 'blue'
                                }}
                                href="https://www.royalcanin.com/fr/shop/latelier/felin"
                              >
                                https://www.royalcanin.com/fr/shop/latelier/felin
                              </a>
                            </span>
                          ) : (
                            item.text
                          )
                        ) : (
                          ''
                        )}
                      </p>
                      <p>{item.text1}</p>
                      <p>{item.text2 ? item.text2 : ''}</p>
                      <p>{item.text3 ? item.text3 : ''}</p>
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
