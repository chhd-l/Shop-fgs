import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleTagManager from '@/components/GoogleTagManager';
import MyModal from './modules/modal';
import UpdatModal from './updatModules/modal';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import 'react-datepicker/dist/react-datepicker.css';
import './index.less';
import 'react-calendar/dist/Calendar.css';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import header from './image/header.png';
import img from './image/img.png';
import cat1 from './image/cat1.png';
import cat2 from './image/cat2.png';
import cat3 from './image/cat3.png';
import thak from './image/thak.png';
import nos from './image/nos.png';
import one from './image/one.png';
import two from './image/two.png';
import three from './image/three.png';
import four from './image/four.png';
import five from './image/five.png';
import open from './image/open.png';
import close from './image/close.png';
import LazyLoad from 'react-lazyload';
import Rate from '../../components/Rate';
import WeekCalender from './week/week-calender';
import { gitDict, postSave, postUpdate, queryDate } from '../../api/felin';
import moment from 'moment';
import LoginButton from '@/components/LoginButton';

import Reviews from './Reviews/Reviews';

const pageLink = window.location.href;
const localItemRoyal = window.__.localItemRoyal;
PRESONAL_INFO_RULE.filter((el) => el.key === 'phoneNumber')[0].regExp = '';
const sessionItemRoyal = window.__.sessionItemRoyal;

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
      key: '',
      resources: [],
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      visible: false,
      visibleUpdate: false,
      list: [
        {
          valueEn: 'Behaviorist',
          src: cat1,
          name: 'Comportementalistes',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        },
        {
          valueEn: 'Nutritionist',
          src: cat2,
          name: 'Expert en nutrition',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        },
        {
          valueEn: 'Osteopathist',
          src: cat3,
          name: 'Ostéopathes',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        }
      ],
      timeList: [
        {
          time: '15',
          text: 'Rapide et facile, échangez avec un expert pour reçevoir ses conseils et commencer le suivi de votre chat.',
          num: 'FREE'
        },
        {
          time: '30',
          text: 'Allez plus en détails avec lexpert sélectionné.',
          num: 'XX EUR'
        },
        {
          time: '45',
          text: 'Prenez le temps de vous offrir une session complète.',
          num: 'XX EUR'
        }
      ],
      activeOne: null,
      timeIndex: null,
      butIndex: null,
      isShow: true,
      oneShow: false,
      twoShow: false,
      threeShow: false,
      fourShow: false,
      fiveShow: false,
      activeKey: '',
      activeKey1: '',
      activeKey2: '',
      maxHeight: null,
      activeMaxKey: null,
      apptTypeList: [], // 线上线下
      expertTypeList: [],
      params: {
        appointmentTypeId: '', // 线上线下
        expertTypeId: '', // 专家类型
        minutes: '' // 时间
      },
      votre: {
        type: '',
        expertise: '',
        duree: '',
        prix: '',
        date: '',
        heure: ''
      },
      bookSlotVO: {
        dateNo: '',
        startTime: '',
        endTime: '',
        employeeIds: []
      },
      userInfo: undefined,
      appointmentNo: ''
    };
  }

  componentDidMount() {
    let userInfo = this.props.loginStore.userInfo;
    if (userInfo) {
      this.setState({
        userInfo: {
          ...userInfo
        }
      });
    }
  }

  hanldeOpen = () => {
    this.setState({
      visible: true
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  gotoAdd = () => {
    let anchorElement = document.getElementById('experts');
    window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
  };
  goto = () => {
    let anchorElement = document.getElementById('faq');
    window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
  };
  // 点击咨询
  handleOneShow = async () => {
    // 线上
    const {
      code: code1,
      context: apptTypeList,
      message: message1
    } = await gitDict({
      type: 'appointment_type'
    });
    // 专家
    const {
      code: code2,
      context: list,
      message: message2
    } = await gitDict({
      type: 'expert_type'
    });
    let expertTypeList = list.goodsDictionaryVOS.map((item) => {
      let _temp = this.state.list.find(
        (items) => items.valueEn === item.valueEn
      );
      return { ...item, ..._temp };
    });
    this.setState({
      apptTypeList: apptTypeList.goodsDictionaryVOS,
      list: expertTypeList,
      isShow: false,
      oneShow: true
    });
  };
  // 第二步选择专家
  handleActive = (index) => {
    this.setState({
      activeOne: index
    });
  };
  // 第二步返回上一步
  handleReturnOne = () => {
    this.setState({
      isShow: true,
      oneShow: false
    });
  };
  // 跳转第三步
  handleGotoThree = () => {
    this.setState({
      oneShow: false,
      threeShow: true
    });
  };

  // 返回第二步
  handleReturnTwo = () => {
    this.setState({
      oneShow: true,
      threeShow: false
    });
  };
  // 跳转第四步
  handleGotoFour = () => {
    this.setState({
      threeShow: false,
      fourShow: true
    });
    this.queryDate();
  };
  // 返回第三步
  handleReturnThree = () => {
    this.setState({
      threeShow: true,
      fourShow: false
    });
  };
  // 最终跳转
  handleGoto = () => {
    this.postSave();
  };
  postSave = async () => {
    const { context } = await postSave({
      apptTypeId: this.state.params.appointmentTypeId,
      consumerName: this.state.userInfo?.contactName || undefined,
      consumerFirstName: this.state.userInfo?.firstName || undefined,
      consumerLastName: this.state.userInfo?.lastName || undefined,
      consumerEmail: this.state.userInfo?.communicationEmail || undefined,
      consumerPhone: this.state.userInfo?.communicationPhone || undefined,
      customerId: this.state.userInfo?.customerId || undefined,
      customerLevelId: this.state.userInfo?.customerId ? 234 : 233, // 233未登录 234登陆
      bookSlotVO: this.state.bookSlotVO,
      minutes: this.state.params.minutes,
      expertTypeId: this.state.params.expertTypeId,
      serviceTypeId: 6
    });
    let appointmentNo = context.appointmentVO.apptNo;
    if (appointmentNo) {
      sessionItemRoyal.set('appointment-no', appointmentNo);
      if (this.state.userInfo) {
        this.props.history.push('/checkout');
      } else {
        this.setState({
          appointmentNo: appointmentNo,
          fourShow: false,
          fiveShow: true
        });
      }
    }
  };
  // 选择专家
  handleActiveBut = (index, id, name, key, key1, key2, value, key3) => {
    this.setState({
      params: {
        ...this.state.params,
        [key]: id
      },
      [key1]: index,
      votre: {
        ...this.state.votre,
        [key2]: name,
        [key3]: value
      }
    });
  };

  change = (val, num) => {
    this.setState({
      activeKey: num === 1 ? val : '',
      activeKey1: num === 2 ? val : '',
      activeKey2: num === 3 ? val : ''
    });
  };
  handleClick = (e, index) => {
    this.setState({
      activeMaxKey: index
    });
    e.target.classList.toggle('active');
    var panel = e.target.nextElementSibling
      ? e.target.nextElementSibling
      : e.target.parentNode.parentNode.nextElementSibling;
    if (panel.style.maxHeight) {
      this.setState({
        maxHeight: null
      });
    } else {
      this.setState({
        maxHeight: panel.scrollHeight + 'px'
      });
    }
  };

  queryDate = (type = false, chooseData = {}) => {
    setTimeout(async () => {
      const resources = await new Promise(async (reslove) => {
        const { code, context } = await queryDate({
          ...this.state.params
        });

        if (code === 'K-000000') {
          let _resources = context.resources;
          if (type && minutes === chooseData.minutes) {
            let _temp = {
              date: chooseData.bookSlotVO.dateNo,
              minutes: chooseData.minutes,
              minuteSlotVOList: []
            };
            _temp.minuteSlotVOList.push({
              ...chooseData.bookSlotVO,
              type: 'primary',
              disabled: true
            });
            console.log(_temp, '=_temp');
            if (_resources.length == 0) {
              _resources.push(_temp);
            } else {
              _resources.map((item) => {
                if (item.dateNo === _temp.dateNo) {
                  item.minuteSlotVOList.map((it) => {
                    if (it.startTime === _temp.startTime) {
                      it = { ...it, ..._temp };
                    }
                  });
                }
              });
            }
          }
          console.log(1);
          reslove(_resources);
        }
      });
      console.log(resources, 222);
      this.setState({
        resources,
        key: +new Date()
      });
    });
  };
  onChange = (data) => {
    this.setState({
      votre: {
        ...this.state.votre,
        date: moment(data.dateNo).format('YYYY-MM-DD'),
        heure: data.time
      },
      bookSlotVO: {
        ...data
      }
    });
  };
  handleLogin = (val) => {
    this.setState({
      visibleUpdate: true
    });
  };
  handleCancelUpdate = () => {
    this.setState({
      visibleUpdate: false
    });
  };
  handleUpdate = (params) => {
    console.log(params);
  };
  postUpdate = async (params) => {
    const { context } = await postUpdate({
      appointmentNo: this.state.appointmentNo,
      apptTypeId: this.state.params.appointmentTypeId,
      consumerName: this.state.userInfo?.lastName || undefined,
      consumerFirstName: params.firstName,
      consumerLastName: params.lastName,
      consumerEmail: params.email,
      consumerPhone: params.phone,
      customerId: this.state.userInfo?.customerId || undefined,
      customerLevelId: this.state.userInfo?.customerId ? 234 : 233, // 233未登录 234登陆
      bookSlotVO: this.state.bookSlotVO,
      minutes: this.state.params.minutes,
      expertTypeId: this.state.params.expertTypeId,
      serviceTypeId: 6
    });
  };
  render() {
    let appointName = {
      Online: 'Appel video',
      Offline: 'Sur place'
    };
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
    const expandIcon = (props) => {
      if (props.isActive) {
        return <img src={close} alt="" />;
      } else {
        return <img src={open} alt="" />;
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
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header">
          <div className="header-content">
            <img src={header} alt="" />
            <div className="hd-text-cont">
              <div className="introduce">
                Venez rencontrer nos experts à l'Atelier Félin, une boutique
                dédiée à la santé et au bien-être de votre chat
              </div>
              <button
                onClick={this.gotoAdd}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
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
            <div className="time">
              Ouvert à tous du mardi au dimanche, de 10h à 19h
            </div>
            <div className="place">142 Bld Saint Germain 75006 PARIS</div>
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile mb160">
            <div className="rc-max-width--xxl">
              <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                <div className="rc-column">
                  <LazyLoad>
                    <img className="w-100 lazyloaded" src={img}></img>
                  </LazyLoad>
                </div>
                <div className="rc-column flx-around">
                  <div className="visit-text">
                    <div className="visit-text-tip">
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
          <div className="txt-centr">
            <h2 className="rc-beta fwt size30">
              Réservez une séance avec un expert de l'Atelier Félin
            </h2>
            <div className="problem">
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
          {this.state.isShow ? (
            <div id="experts">
              <div className="size24 txt-centr">
                Réservez un rendez-vous avec un de nos experts
              </div>
              <div className="cat-ul mb28">
                {this.state.list.map((item, index) => {
                  return (
                    <div
                      className={index === 1 ? 'ul-li mglr40' : 'ul-li'}
                      key={index}
                    >
                      <img src={item.src} alt="" />
                      <div style={{ padding: '0.625rem' }}>
                        <div className="mt16">{item.name}</div>
                        <div className="mt8">{item.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="txt-centr">
                <button
                  onClick={this.handleOneShow}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Reserver un rendez-vous
                </button>
              </div>
            </div>
          ) : null}
          {/* 第一步第二步 */}
          {this.state.oneShow ? (
            <div>
              <div className="Choisissez">
                <div>
                  <div className="size24 mb32 js-center">
                    <img src={one} alt="" className="mr10" />
                    <div>Choisissez un type de rendez-vous</div>
                  </div>
                  <div className="mb32">
                    {this.state.apptTypeList.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() =>
                            this.handleActiveBut(
                              index,
                              item.id,
                              appointName[item.name],
                              'appointmentTypeId',
                              'butIndex',
                              'type'
                            )
                          }
                          className={`rc-btn ${
                            this.state.butIndex === index
                              ? 'rc-btn-active '
                              : ''
                          } rc-margin-bottom--xs`}
                          style={{
                            width: '9.375rem'
                          }}
                        >
                          {appointName[item.name]}
                        </button>
                      );
                    })}
                  </div>
                  <div className="size24 js-center">
                    <img src={two} alt="" className="mr10" />
                    <div>Choisissez un expert</div>
                  </div>
                </div>
              </div>
              <ul className="cat-ul mb28">
                {this.state.list.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        this.handleActiveBut(
                          index,
                          item.id,
                          item.name,
                          'expertTypeId',
                          'activeOne',
                          'expertise'
                        )
                      }
                      className={index === 1 ? 'ul-li mglr40' : 'ul-li'}
                      style={{
                        boxShadow:
                          this.state.activeOne === index
                            ? ' 0px 0px 0px 2px #E2001A'
                            : '',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={item.src} alt="" />
                      <div style={{ padding: '0.625rem' }}>
                        <div className="mt16">{item.name}</div>
                        <div className="mt8">{item.text}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="txt-centr">
                <button
                  onClick={this.handleReturnOne}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Retour à l'étape précédente
                </button>
                <button
                  disabled={
                    this.state.activeOne == null || this.state.butIndex === null
                  }
                  onClick={this.handleGotoThree}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Continuer
                </button>
              </div>
            </div>
          ) : null}
          {/* 选择综合 */}
          {this.state.threeShow ||
          this.state.fourShow ||
          this.state.fiveShow ? (
            <div className="Choisissez votre-selection">
              <div className="mb16 colred size18">Votre sélection</div>
              <div className="js-between mb16">
                <div>Type</div>
                <div>{this.state.votre.type}</div>
              </div>
              <div className="js-between mb16">
                <div>Expertise</div>
                <div>{this.state.votre.expertise}</div>
              </div>
              <div className="js-between mb16">
                <div>Durée</div>
                <div>{this.state.votre.duree} min</div>
              </div>
              <div className="js-between mb16">
                <div>Prix</div>
                <div>{this.state.votre.prix}</div>
              </div>
              <div className="js-between mb16">
                <div>Date</div>
                <div>{this.state.votre.date}</div>
              </div>
              <div className="js-between">
                <div>Heure</div>
                <div>{this.state.votre.heure}</div>
              </div>
            </div>
          ) : null}
          {/* 第三步 */}
          {this.state.threeShow ? (
            <div>
              <div className="Choisissez">
                <div className="size24 mb16 js-center">
                  <img src={three} alt="" className="mr10" />
                  <div>Choisissez la durée du rendez-vous</div>
                </div>
                <div>
                  Vous pourrez passer plus de temps avec nos experts si besoin
                  en fonction de leurs disponibilités.
                </div>
              </div>
              <ul className="cat-ul mb28">
                {this.state.timeList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        this.handleActiveBut(
                          index,
                          item.time,
                          item.time,
                          'minutes',
                          'timeIndex',
                          'duree',
                          item.num,
                          'prix'
                        )
                      }
                      className={
                        index === 1 ? 'ul-li mglr40 pd10' : 'ul-li pd10'
                      }
                      style={{
                        boxShadow:
                          this.state.timeIndex === index
                            ? ' 0px 0px 0px 2px #E2001A'
                            : '0px 0px 0px 2px #f0f0f0'
                      }}
                    >
                      <div>{item.time} min</div>
                      <div className="list-content">{item.text}</div>
                      <div className="js-between">
                        <div>Prix</div>
                        <div>{item.num}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="txt-centr">
                <button
                  onClick={this.handleReturnTwo}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Retour à l'étape précédente
                </button>
                <button
                  disabled={this.state.timeIndex == null}
                  onClick={this.handleGotoFour}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Continuer
                </button>
              </div>
            </div>
          ) : null}
          {/*第四步*/}
          {this.state.fourShow ? (
            <div>
              <div className="size24 js-center mb28">
                <img src={four} alt="" className="mr10" />
                <div>Choisissez un créneau</div>
              </div>
              <div
                style={{ width: '700px', margin: 'auto', marginBottom: '40px' }}
              >
                <WeekCalender
                  onChange={this.onChange}
                  key={this.state.key}
                  data={this.state.resources}
                />
              </div>
              <div className="txt-centr">
                <button
                  onClick={this.handleReturnThree}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Retour à l'étape précédente
                </button>
                <button
                  disabled={this.state.votre.heure === ''}
                  onClick={this.handleGoto}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Continuer
                </button>
              </div>
            </div>
          ) : null}
          {/* 第五步 */}
          {this.state.fiveShow && !this.state.userInfo ? (
            <div>
              <div className="size24 js-center mb28">
                <img src={five} alt="" className="mr10" />
                <div>Créez votre compte afin de confirmer votre sélection</div>
              </div>
              <div className="txt-centr">
                <LoginButton
                  beforeLoginCallback={() => {
                    localItemRoyal.set('okta-redirectUrl', '/checkout');
                  }}
                  btnClass={`rc-btn rc-btn--one  rc-margin-bottom--xs`}
                  history={this.props.history}
                  btnStyle={{
                    width: '16.875rem'
                  }}
                >
                  Connexion
                </LoginButton>
                <br />
                <button
                  onClick={() => {
                    if (!window.__.env.REACT_APP_STOREID) {
                      return;
                    }
                    if (
                      window.__.env.REACT_APP_COUNTRY === 'tr' ||
                      window.__.env.REACT_APP_COUNTRY === 'ru' ||
                      window.__.env.REACT_APP_COUNTRY === 'fr' ||
                      window.__.env.REACT_APP_COUNTRY === 'us' ||
                      window.__.env.REACT_APP_COUNTRY === 'de' ||
                      window.__.env.REACT_APP_COUNTRY === 'uk'
                    ) {
                      localItemRoyal.set(
                        'okta-redirectUrl',
                        this.props.history &&
                          this.props.history.location.pathname +
                            this.props.history.location.search
                      );
                      this.props.history.push('/register');
                    } else {
                      window.location.href =
                        window.__.env.REACT_APP_RegisterPrefix +
                        window.encodeURIComponent(
                          window.__.env.REACT_APP_RegisterCallback
                        );
                    }
                  }}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Créer un compte
                </button>
                <br />
                <button
                  onClick={this.handleLogin}
                  className="rc-btn rc-btn--one  rc-margin-bottom--xs mb28"
                  style={{
                    width: '16.875rem'
                  }}
                >
                  Continuer en tant qu'invité
                </button>
              </div>
            </div>
          ) : null}
          <UpdatModal
            visible={this.state.visibleUpdate}
            handleUpdate={this.handleUpdate}
          >
            <div
              style={{
                textAlign: 'right',
                padding: '1.25rem',
                paddingBottom: '0'
              }}
            >
              <span
                onClick={this.handleCancelUpdate}
                className="rc-icon rc-close rc-iconography"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </UpdatModal>
          {/* 预约时间 */}
          <div className="txt-centr" style={{ marginBottom: '10rem' }}>
            <div
              onClick={this.hanldeOpen}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                marginTop: '1.25rem',
                display: this.state.visible ? 'none' : 'block'
              }}
            >
              Contactez-nous
            </div>
            <MyModal visible={this.state.visible}>
              <div
                style={{
                  textAlign: 'right',
                  padding: '1.25rem',
                  paddingBottom: '0'
                }}
              >
                <span
                  onClick={this.handleCancel}
                  className="rc-icon rc-close rc-iconography"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </MyModal>
          </div>
          <div className="comment" style={{ flexDirection: 'column' }}>
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile">
              <div className="rc-max-width--xxl">
                <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                  <div className="rc-column" style={{ marginRight: '2.5rem' }}>
                    <LazyLoad>
                      <div className="comment-slider">
                        <Slider {...settings}>
                          <div>
                            <div className="rate-cont">
                              <span style={{ marginRight: '1rem' }}>4.0</span>
                              <Rate
                                color=""
                                def={2}
                                disabled
                                style={{ fontSize: 34 }}
                              />
                            </div>
                            <div className="comment-text">
                              "J'ai reçu des conseils très intéressants pour mon
                              chat qui est très peureux."
                            </div>
                          </div>
                          <div>
                            <div className="rate-cont">
                              <span style={{ marginRight: '1rem' }}>4.0</span>
                              <Rate color="" def={3} disabled />
                            </div>
                            <div className="comment-text">
                              "J'ai reçu des conseils très intéressants pour mon
                              chat qui est très peureux."
                            </div>
                          </div>
                          <div>
                            <div className="rate-cont">
                              <span style={{ marginRight: '1rem' }}>4.0</span>
                              <Rate color="" def={4} disabled />
                            </div>
                            <div className="comment-text">
                              "J'ai reçu des conseils très intéressants pour mon
                              chat qui est très peureux."
                            </div>
                          </div>
                        </Slider>
                        <button
                          className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                          style={{
                            width: '16.875rem'
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
                    </LazyLoad>
                  </div>
                  <div className="rc-column">
                    <img src={thak} alt="" />
                  </div>
                </div>
              </div>
            </div>
            {/*评论列表*/}
            <Reviews
              id="111"
              visible={this.state.reviews.visible}
              onClose={() => {
                this.setState({
                  reviews: { ...this.state.reviews, visible: false }
                });
              }}
            />
          </div>

          <div className="nos-cont js-center">
            <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile">
              <div className="rc-max-width--xxl">
                <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                  <div className="rc-column">
                    <LazyLoad>
                      <img src={nos} alt="" className="nos-img" />
                    </LazyLoad>
                  </div>
                  <div className="rc-column">
                    <div
                      className="nos-cont-text"
                      style={{ marginLeft: '3.125rem' }}
                    >
                      <h3 className="size30 mb16">Nos évènements</h3>
                      <p className="size24 col0">
                        Rencontrez régulièrement nos profils d’experts et
                        partagez l'expérience avec les autres membres de notre
                        communauté !
                      </p>
                      <p className="size16">
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
          <div className="une-title">
            Une équipe engagée pour vous conseiller
          </div>
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile  rc-margin-y--lg--mobile">
            <div className="rc-max-width--xxl">
              <div className="rc-layout-container rc-two-column rc-content-h-middle flx-center">
                <div className="rc-column rc-triple-width rc-padding--none--mobile product-tiles-container pt-0 flx-center">
                  <div className="rc-layout-container rc-three-column rc-layout-grid rc-match-heights product-tiles flx-center">
                    <div className="col-md-2  col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                    <div className="col-md-2 col-2 pr-0 pl-md-2 pr-md-2  mb-3 pl-0 mglr16">
                      <img src={cat1} alt="" />
                      <div className="mtb10">Alexandre Blavier</div>
                      <div className="col0">Expertise</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Faq-cont" id="faq">
            <div className="size24 col0">FAQs</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br /> Curabitur finibus ut urna vitae placerat.
            </div>
          </div>
          <div className="faq-coll">
            <div>
              <h3 style={{ marginBottom: '0.75rem' }}>Nous contacter</h3>
              {this.state.list.map((item, index) => {
                return (
                  <div key={index}>
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index)}
                    >
                      {item.name}
                      <div
                        style={{
                          float: 'right'
                        }}
                      >
                        {this.state.activeMaxKey === index &&
                        this.state.maxHeight ? (
                          <img src={close} alt="" />
                        ) : (
                          <img src={open} alt="" />
                        )}
                      </div>
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
              <h3 style={{ marginBottom: '0.75rem', marginTop: '1.25rem' }}>
                Nous contacter
              </h3>
              {this.state.list.map((item, index) => {
                return (
                  <div key={index}>
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index + 'a')}
                    >
                      {item.name}
                      <div
                        style={{
                          float: 'right'
                        }}
                      >
                        {this.state.activeMaxKey === index + 'a' &&
                        this.state.maxHeight ? (
                          <img src={close} alt="" />
                        ) : (
                          <img src={open} alt="" />
                        )}
                      </div>
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
              <h3 style={{ marginBottom: '0.75rem', marginTop: '1.25rem' }}>
                Nous contacter
              </h3>
              {this.state.list.map((item, index) => {
                return (
                  <div key={index}>
                    <button
                      className="accordion"
                      onClick={(e) => this.handleClick(e, index + 'b')}
                    >
                      {item.name}
                      <div
                        style={{
                          float: 'right'
                        }}
                      >
                        {this.state.activeMaxKey === index + 'b' &&
                        this.state.maxHeight ? (
                          <img src={close} alt="" />
                        ) : (
                          <img src={open} alt="" />
                        )}
                      </div>
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
