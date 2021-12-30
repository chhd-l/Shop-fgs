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
          name: 'Où puis-je vous trouver ? Quelles sont vos horaires douverture ?',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        },
        {
          name: 'Jai une question sur le concept, à qui puis-je madresser ?',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        }
      ],
      list1: [
        {
          name: 'Comment créer mon compte Royal Canin ?',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        },
        {
          name: 'Comment accéder à mon compte si jai perdu mon mot de passe ?',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        },
        {
          name: 'Jai une question sur le concept, à qui puis-je madresser ?',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        }
      ],
      list2: [
        {
          name: 'Je souhaite prendre rendez-vous, comment faire ?',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
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
                Venez rencontrer nos experts à l'Atelier Félin, une boutique
                dédiée à la santé et au bien-être de votre chat
              </div>
              <button
                onClick={this.gotoAddPc}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs pc-block"
                style={{
                  width: '16.875rem'
                }}
              >
                Reserver un rendez-vous
              </button>
              <button
                onClick={this.gotoAddH}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs h-block"
                style={{
                  width: '16.875rem'
                }}
              >
                Reserver un rendez-vous
              </button>
              <div className="text">
                Profitez de 15min de consultation gratuites
              </div>
            </div>
          </div>
          <div className="time-content">
            <div className="time font-500">
              Ouvert à tous du Mardi au Samedi de 10h à 18h et le Dimanche de
              10h à 18h
            </div>
            <div className="place">142 Bld Saint Germain 75006 PARIS</div>
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
                      Venez nous rendre visite
                    </div>
                    <div className="visit-text-cont">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Fusce ornare erat sit amet turpis vulputate, a consectetur
                      mi dapibus.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="txt-centr" id="pcexperts">
            <h2 className="size18 font-500" style={{ color: '#e2001a' }}>
              Réservez une séance avec un expert de l'Atelier Félin
            </h2>
            <div className="problem" id="Voir-fqas">
              Venez rencontrer nos comportementalistes, experts de nutrition et
              ostéopathes qui vous guideront pour prendre soin de votre chat.
              Vous pouvez réserver une rendez-vous dans l’atelier ou un appel
              video. Avez-vous des questions?{' '}
              <span onClick={this.goto} style={{ cursor: 'pointer' }}>
                Voir FAQs
              </span>
            </div>
          </div>
          {/* 默认页面 */}
          <Pcexperts history={this.props.history} />
          <Hexperts history={this.props.history} />
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
                            style={{ fontSize: 34 }}
                          />
                        </div>
                        <div className="comment-text">{item.description}</div>
                      </div>
                    );
                  })}
                </Slider>
                <button
                  className="rc-btn rc-btn--one rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem',
                    marginTop: '20px'
                  }}
                  onClick={() => {
                    this.setState({
                      reviews: { ...this.state.reviews, visible: true }
                    });
                  }}
                >
                  Laisser un avis
                </button>
              </div>
              <img className="comment-img" src={thak} alt="" />
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
                  <div className="rc-column felin-p30">
                    <div className="nos-cont-text">
                      <h3 className="mb16 font-500 visit-text-h3">
                        Nos évènements
                      </h3>
                      <p className="col0 visit-text-p">
                        Rencontrez régulièrement nos profils d’experts et
                        partagez l'expérience avec les autres membres de notre
                        communauté !
                      </p>
                      <p className="visit-text-p1">
                        Profitez de notre programmation pour en savoir plus sur
                        les besoins de votre chat et guettez la mise en ligne du
                        planning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="une-title font-500">
            Une équipe engagée pour vous conseiller
          </div>
          <Conseiller />
          <ConseillerTwo />
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
                Nous contacter
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
                      <p>{item.text}</p>
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
                Rendez-vous
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
