import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyLoad from 'react-lazyload';
import dateIcon from '@/assets/images/date.png';
import { getFormatDate, datePickerConfig, validData } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
import Selection from '@/components/Selection';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import 'react-datepicker/dist/react-datepicker.css';
import './index.less';
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import { loadJS } from '@/utils/utils';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FaceBook_Icon from '@/assets/images/facebookIcon.png';
import Insgram_Icon from '@/assets/images/insgramIcon.png';
import { getTimeOptions, apptSave } from '@/api/appointment';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function Divider() {
  return (
    <div
      className="rc-border-bottom rc-border-colour--brand4"
      style={{ borderBottomWidth: '4px' }}
    />
  );
}

function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

function scrollIntoView(element) {
  const headerElement = document.querySelector(`.Felin`);
  if (element && headerElement) {
    // console.log(getElementTop(element) headerElement.offsetHeight)
    let headerHeight = 54;
    if (getElementTop(element) > document.documentElement.scrollTop) {
      headerHeight = 54;
    } else {
      headerHeight = 120;
    }
    window.scroll({
      top: getElementTop(element) - headerHeight - 60,
      behavior: 'smooth'
    });
  }
}

function scrollPaymentPanelIntoView(id) {
  scrollIntoView(document.querySelector(`#${id}`));
}

export default class Felin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      loading: false,
      saveLoading: false,
      showModal: false,
      isAdd: true,
      errorMsg: '',
      successMsg: '',
      userInfo: {
        username: '',
        phoneNumber: '',
        email: ''
      },
      countryList: [],
      isValid: false,
      curType: 'delivery',
      errMsgObj: {},
      selectedDate: new Date(),
      step: 1,
      selectedTimeObj: {
        name: '',
        value: ''
      },
      nextBtnEnable: false,
      nextBtnShow: true,
      felinType: 0,
      consentChecked: false,
      isContactUs: false,
      currentTabIndex: 0,
      topVal: '159px',
      currentDate: new Date(),
      calendarInitObserver: null,
      timeOption: [],
      qrCode1: ''
    };
  }
  componentDidMount() {
    let timeOption = [];
    let arr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    arr.map((el) => {
      if (el <= 18) {
        timeOption.push({
          name: `${el}:00 - ${el}:20 ${el >= 12 ? 'PM' : 'AM'}`,
          value: `${el}:00-${el}:20`,
          disabled: false,
          type: 1
        });
        timeOption.push({
          name: `${el}:30 - ${el}:50 ${el >= 12 ? 'PM' : 'AM'}`,
          value: `${el}:30-${el}:50`,
          disabled: false,
          type: 1
        });
      } else {
        timeOption.push({
          name: `${el}:00 - ${el}:20 ${el >= 12 ? 'PM' : 'AM'}`,
          value: `${el}:00-${el}:20`,
          disabled: false,
          type: 0
        });
        timeOption.push({
          name: `${el}:30 - ${el}:50 ${el >= 12 ? 'PM' : 'AM'}`,
          value: `${el}:30-${el}:50`,
          disabled: false,
          type: 0
        });
      }
    });
    this.setState({ timeOption: timeOption });
    this.getTimeOptions();
    window.addEventListener('scroll', (e) => {
      if (document.querySelector('.rc-header--scrolled')) {
        this.setState({ topVal: '54px' });
      } else {
        this.setState({ topVal: '120px' });
      }
    });
    let timer = setInterval(() => {
      if (document.querySelector('.rc-header--scrolled')) {
        this.setState({ topVal: '54px' });
      } else {
        this.setState({ topVal: '120px' });
      }
    }, 100);
    document.querySelector(
      '.react-calendar__navigation__prev-button'
    ).innerHTML = `<span class="icon iconfont">
      &#xe6fa;
    </span>`;
    document.querySelector(
      '.react-calendar__navigation__next-button'
    ).innerHTML = `<span class="icon iconfont">
      &#xe6f9;
    </span>`;
    // document.querySelector('.iconfont.font-weight-bold.icon-arrow').innerHTML = `&#xe601;`
    let iconDom = document.querySelector(
      '.iconfont.font-weight-bold.icon-arrow '
    );
    document.querySelector('#Selection').removeChild(iconDom);
    let needIconDom = document.createElement('span');
    needIconDom.classList.add('icon', 'iconfont');
    needIconDom.innerHTML = `&#xe601;`;
    document.querySelector('#Selection').appendChild(needIconDom);

    // 日历出现在视口中发送ga埋点
    const calendarDom = document.querySelector('#appointment-calendar');
    let calendarInitObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      window.dataLayer && this.bookingStepsGA('Calendar');
    });
    if (localItemRoyal.get('rc-userinfo')) {
      let userInfo = localItemRoyal.get('rc-userinfo');
      this.setState({
        userInfo: {
          username: userInfo.customerName,
          email: userInfo.email,
          phoneNumber: userInfo.contactPhone
        }
      });
      if (sessionItemRoyal.get('from-felin')) {
        let felinInfo = JSON.parse(sessionItemRoyal.get('felin-info'));
        this.setState(
          {
            step: 4,
            currentDate: new Date(felinInfo.currentDate),
            felinType: felinInfo.felinType,
            selectedTimeObj: felinInfo.selectedTimeObj,
            nextBtnShow: false
          },
          () => {
            sessionItemRoyal.remove('from-felin');
            sessionItemRoyal.remove('felin-info');
          }
        );
      }
    }
    this.setState(
      {
        calendarDom,
        calendarInitObserver
      },
      () => {
        this.state.calendarInitObserver.observe(calendarDom);
      }
    );
  }
  get virtualAppointmentFlag() {
    let { currentDate } = this.state;
    return (
      +format(currentDate, 'yyyyMMdd') >= 20210420 &&
      +format(currentDate, 'yyyyMMdd') <= 20210502
    );
  }
  getTimeOptions() {
    getTimeOptions({
      apptDate: format(this.state.currentDate, 'yyyyMMdd')
    }).then((res) => {
      let { timeOption } = this.state;
      let { appointmentVOList } = res.context;
      timeOption.map((timeItem) => {
        if (
          appointmentVOList.filter(
            (apptItem) => apptItem.apptTime === timeItem.value
          ).length
        ) {
          timeItem.disabled = true;
        }
      });
    });
  }

  componentWillUnmount() {
    this.state.calendarInitObserver &&
      this.state.calendarInitObserver.disconnect(this.state.calendarDom);
    this.setState({
      calendarInitObserver: null
    });
  }

  handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    let { userInfo } = this.state;
    if (name === 'postCode' || name === 'phoneNumber') {
      value = value.replace(/\s+/g, '');
    }
    if (name === 'phoneNumber' && process.env.REACT_APP_LANG === 'fr') {
      value = value.replace(/^[0]/, '+(33)');
    }
    userInfo[name] = value;
    this.setState({ userInfo });
  };
  inputBlur = async (e) => {
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = PRESONAL_INFO_RULE.filter((e) => e.key === target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    try {
      await validData(targetRule, { [target.name]: value });
      this.setState(
        {
          errMsgObj: Object.assign({}, errMsgObj, {
            [target.name]: ''
          })
        },
        () => {
          this.updateButtonState();
        }
      );
    } catch (err) {
      console.log(err, 'err');
      this.setState(
        {
          errMsgObj: Object.assign({}, errMsgObj, {
            [target.name]: err.message
          })
        },
        () => {
          this.updateButtonState();
        }
      );
    }
  };
  goNextStep() {
    let {
      step,
      selectedTimeObj,
      selectedDate,
      felinType,
      currentDate,
      userInfo,
      qrCode1
    } = this.state;
    this.setState({ step: step + 1 }, () => {
      if (step === 2) {
        // console.log(step, 'step')
        this.setState({ nextBtnShow: false });
      }
      sessionItemRoyal.set(
        'felin-info',
        JSON.stringify({
          userInfo,
          currentDate: +currentDate,
          felinType,
          qrCode1,
          step,
          selectedTimeObj
        })
      );
      // let felinForm = {
      //   selectedDate:
      // }
      let obj = {
        2: 'Appointment type',
        3: 'Login',
        4: 'Customer info',
        5: 'Recap',
        6: 'Confirmation'
      };
      this.bookingStepsGA(obj[this.state.step]);

      this.updateButtonState();
    });
  }
  updateButtonState() {
    let {
      step,
      selectedTimeObj,
      consentChecked,
      selectedDate,
      felinType
    } = this.state;
    if (step === 1 && selectedTimeObj.value && selectedDate) {
      this.setState({ nextBtnEnable: true });
    } else if (step === 2) {
      this.setState({ nextBtnEnable: true });
    } else if (
      step === 4 &&
      Object.values(this.state.errMsgObj).every((el) => el === '') &&
      consentChecked
    ) {
      this.setState({ nextBtnEnable: true });
    } else {
      this.setState({ nextBtnEnable: false });
    }
  }

  handleClickBtn(type, btnName) {
    scrollPaymentPanelIntoView(type);
    dataLayer.push({
      event: 'atelierFelinButtonClick',
      atelierFelinButtonClickName: btnName
    });
  }

  bookingStepsGA(stepName) {
    dataLayer.push({
      event: 'atelierFelinBookingSteps',
      atelierFelinBookingStepsName: stepName
    });
  }

  render() {
    let {
      userInfo,
      errMsgObj,
      nextBtnEnable,
      nextBtnShow,
      isContactUs,
      currentTabIndex
    } = this.state;
    return (
      <div className="Felin">
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <div
            className="rc-bg-colour--brand3 pt-4 pb-4"
            style={{ position: 'relative' }}
          >
            <div
              className="d-flex justify-content-center tabs"
              style={{
                position: 'fixed',
                top: this.state.topVal,
                width: '100%',
                height: '60px',
                paddingTop: '24px',
                background: '#fff',
                zIndex: '10'
              }}
            >
              <span
                className={`ui-cursor-pointer ${
                  currentTabIndex === 0 ? 'active' : ''
                }`}
                onClick={() => {
                  this.setState(
                    { isContactUs: false, currentTabIndex: 0 },
                    () => {
                      scrollPaymentPanelIntoView('section5');
                    }
                  );
                }}
              >
                En savoir plus
              </span>
              <span
                className={`ui-cursor-pointer ${
                  currentTabIndex === 1 ? 'active' : ''
                }`}
                onClick={() => {
                  this.setState(
                    { isContactUs: false, currentTabIndex: 1 },
                    () => {
                      scrollPaymentPanelIntoView('felinFooter');
                    }
                  );
                }}
              >
                Réserver un rendez-vous
              </span>
              {/* <Link to="/help/contact"> */}
              <span
                className={`ui-cursor-pointer ${
                  currentTabIndex === 2 ? 'active' : ''
                }`}
                style={{ color: '#666' }}
                onClick={() => {
                  this.setState({ isContactUs: true, currentTabIndex: 2 });
                  window.scroll({ top: 0 });
                }}
              >
                Contacter L'Atelier Félin
              </span>
              {/* </Link> */}
            </div>
            <br />
            <div
              className="contactUs"
              style={{ display: isContactUs ? 'block' : 'none' }}
            >
              <div className="rc-gamma inherit-fontsize">
                <h3>Contacter l’Atelier Félin</h3>
              </div>
              <p className="mb-20">
                Contactez-nous pour en savoir plus sur l’Atelier Félin et notre
                mission.
              </p>
              <p>latelierfelin@royalcanin.com</p>
              <p className="mb-20">0986568097</p>
              <p>6 Rue des Coutures Saint-Gervais</p>
              <p className="mb-20">75003 Paris</p>
              <p>Horaires d’ouverture :</p>
              <p className="mb-20">Mardi - Dimanche, 10h - 18h</p>
              <p>
                <a href="https://fr-fr.facebook.com/RoyalCaninFrance/">
                  <img
                    style={{
                      display: 'inline-block',
                      width: '50px',
                      marginLeft: '20px'
                    }}
                    alt=""
                    src={FaceBook_Icon}
                  />
                </a>
                <a href="https://www.instagram.com/royalcaninfrance/?hl=en">
                  <img
                    style={{
                      display: 'inline-block',
                      width: '50px',
                      marginLeft: '20px'
                    }}
                    alt=""
                    src={Insgram_Icon}
                  />
                </a>
              </p>
            </div>
            <div style={{ display: !isContactUs ? 'block' : 'none' }}>
              <div className="rc-layout-container rc-two-column rc-content-h-middle">
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/logoAtelier felin.png`}
                        alt=""
                      />
                    </LazyLoad>
                    <div className="rc-gamma inherit-fontsize mt-2">
                      <h3 className="firstTitle">
                        Un nouveau lieu d’échanges sur la santé et le bien-être
                        de votre chat, au coeur de Paris
                      </h3>
                    </div>

                    <button
                      className="rc-btn rc-btn--one"
                      onClick={() => {
                        scrollPaymentPanelIntoView('felinFooter');
                      }}
                    >
                      Venez rencontrer nos comportementalistes félins
                    </button>
                    <p
                      className="mt-3"
                      style={{ fontSize: '14px', marginLeft: '10px' }}
                    >
                      L'Atelier Félin est ouvert uniquement du 20 avril au 13
                      juin 2021
                    </p>
                  </h4>
                </div>
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        loop="infinite"
                        src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/felin_cat_sm.gif`}
                        alt=""
                      />
                    </LazyLoad>
                  </h4>
                </div>
              </div>
              <div className="rc-layout-container rc-two-column rc-content-h-middle">
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <div className="content">
                      <div className="rc-gamma inherit-fontsize">
                        <h3>
                          Vous vivez en appartement avec votre chat ? Posez
                          toutes vos questions à nos experts
                        </h3>
                      </div>
                      <p className="mb-20">
                        L’Atelier Félin est fait pour vous : venez rencontrer
                        des experts, posez-leur vos questions sur le
                        comportement de votre chat, ses habitudes, ses soins et
                        la nutrition la plus appropriée à ses besoins…
                      </p>
                      <p className="mb-20">
                        Des comportementalistes félins et vétérinaires vous
                        accueillent pour établir le profil de votre chat et vous
                        apporter des conseils personnalisés et spécifiques à la
                        vie en appartement.
                      </p>
                      <button
                        className="rc-btn rc-btn--two"
                        onClick={() => {
                          this.handleClickBtn(
                            'felinFooter',
                            'Meet our experts'
                          );
                        }}
                      >
                        Venez rencontrer nos experts
                      </button>
                    </div>
                  </h4>
                </div>
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/person@2x_1.jpeg`}
                        alt=""
                      />
                    </LazyLoad>
                  </h4>
                </div>
              </div>
              <Divider />
              <div className="rc-layout-container rc-two-column rc-content-h-middle">
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/grid@2x.png`}
                        alt=""
                      />
                    </LazyLoad>
                  </h4>
                </div>
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <div className="content">
                      <div className="rc-gamma inherit-fontsize">
                        <h3 className="hahaha">
                          Obtenez une recommandation personnalisée pour son
                          alimentation
                        </h3>
                      </div>
                      <p className="mb-20">
                        Chaque chat est unique et a des besoins spécifiques
                        selon sa race, son âge, ses sensibilités et son mode de
                        vie.
                      </p>
                      <p className="mb-20">
                        En définissant les besoins nutritionnels de votre chat,
                        nous déterminerons ensemble l'aliment qui lui conviendra
                        le mieux.
                      </p>
                      <button
                        className="rc-btn rc-btn--two"
                        onClick={() => {
                          this.handleClickBtn(
                            'section5',
                            'discover the world of cats in our store'
                          );
                        }}
                      >
                        Venez découvrir l’univers du chat dans notre magasin
                      </button>
                    </div>
                  </h4>
                </div>
              </div>
              <Divider />
              <div className="rc-layout-container rc-two-column rc-content-h-middle">
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <div className="content">
                      <div className="rc-gamma inherit-fontsize">
                        <h3>
                          Faites l’expérience de notre nouveau service de
                          distribution de croquettes personnalisé et plus
                          durable
                        </h3>
                      </div>
                      <p className="mb-20">
                        Toutes nos croquettes sont distribuées à la demande et
                        servies dans un contenant réutilisable et consigné.
                        Lorsque votre contenant est vide, vous pouvez le
                        recharger en boutique, ou vous faire livrer une nouvelle
                        dose. Notre livreur repartira avec le contenant vide qui
                        sera reconditionné pour un nouvel usage.
                      </p>
                      <button
                        className="rc-btn rc-btn--two"
                        onClick={() => {
                          this.handleClickBtn(
                            'section5',
                            'discover the world of cats in our store'
                          );
                        }}
                      >
                        Venez découvrir l’univers du chat dans notre magasin
                      </button>
                    </div>
                  </h4>
                </div>
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/box@2x_1.jpeg`}
                        alt=""
                      />
                    </LazyLoad>
                  </h4>
                </div>
              </div>
              <Divider />
              <div
                id="section5"
                className="rc-layout-container rc-two-column rc-content-h-middle"
              >
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/store@2x_1.jpeg`}
                        alt=""
                      />
                    </LazyLoad>
                  </h4>
                </div>
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <div className="content">
                      <div className="rc-gamma inherit-fontsize">
                        <h3>Découvrez l’Atelier Félin</h3>
                      </div>
                      <p className="mb-20">
                        L’Atelier Félin est un lieu unique de Royal Canin,
                        spécialiste de la santé animale et de la nutrition.
                      </p>
                      <p className="mb-20">
                        Nous vous accueillons au coeur du marais, au 6 Rue des
                        Coutures Saint-Gervais, du 20 avril au 13 juin 2021.
                      </p>
                      <p className="mb-20">
                        Venez rencontrer nos associations partenaires pour
                        adopter des chats (le weekend exclusivement).
                      </p>
                    </div>
                  </h4>
                </div>
              </div>
              <Divider />

              <div className="rc-padding--sm rc-max-width--xl">
                <div className="row">
                  <div
                    id="felinFooter"
                    className="col-12 text-center"
                    style={{ paddingTop: '50px' }}
                  >
                    <div className="rc-gamma inherit-fontsize">
                      {this.state.step < 6 ? (
                        <h3 style={{ display: 'inline-block' }}>
                          Réservez un rendez-vous avec un de nos experts dès à
                          présent.
                        </h3>
                      ) : (
                        <h3 style={{ display: 'inline-block' }}>
                          Rendez-vous confirmé.
                        </h3>
                      )}
                    </div>
                    <div
                      style={{
                        width: this.state.step < 6 ? '320px' : '450px',
                        display: 'inline-block',
                        textAlign: 'left'
                      }}
                    >
                      {this.state.step === 1 ? (
                        <div id="appointment-calendar">
                          <p style={{ fontWeight: '500' }}>
                            Choisissez un rendez-vous
                          </p>
                          <div>
                            <h4
                              className="rc-card__meta order-Id"
                              style={{
                                marginTop: '10px',
                                display: 'inline-block',
                                width: '303px'
                              }}
                            >
                              <input
                                type="text"
                                autocomplete="off"
                                id="datepicker"
                                placeholder="Sélectionner une date"
                                style={{
                                  width: '100%',
                                  border: 'none'
                                  // cursor: 'pointer'
                                }}
                                disabled
                                value={getFormatDate(
                                  this.state.currentDate,
                                  null,
                                  'fr'
                                )}
                              />
                            </h4>
                            <span className="icon iconfont iconfont-date">
                              &#xe6b3;
                            </span>
                            <Calendar
                              value={this.state.currentDate}
                              calendarType="US"
                              locale={process.env.REACT_APP_Adyen_locale}
                              view="month"
                              onClickYear={() => {
                                return;
                              }}
                              minDate={new Date()}
                              onChange={(date) => {
                                if (
                                  format(date, 'yyyy-MM-dd') ===
                                  format(this.state.currentDate, 'yyyy-MM-dd')
                                ) {
                                  return false;
                                }
                                this.setState({ currentDate: date }, () => {
                                  this.getTimeOptions();
                                });
                              }}
                              // navigationLabel={() => `ahahahax`}
                            />
                          </div>
                          <div>
                            <Selection
                              placeholder="Choisissez une créneau horaire"
                              optionList={this.state.timeOption}
                              selectedItemChange={(data) => {
                                console.log(data);
                                this.setState({ selectedTimeObj: data }, () => {
                                  this.updateButtonState();
                                });
                              }}
                              selectedItemData={{
                                value: this.state.selectedTimeObj.value
                              }}
                              enableBlur={false}
                            />
                          </div>
                        </div>
                      ) : null}
                      {this.state.step === 2 ? (
                        <>
                          <p
                            className="text-center"
                            style={{ fontWeight: '500' }}
                          >
                            Mon rendez-vous
                          </p>
                          <div
                            style={{ padding: '.5rem 0', margin: '30px 40px' }}
                          >
                            <div style={{ position: 'relative' }}>
                              <input
                                className="rc-input__radio"
                                id="female"
                                value="0"
                                checked={
                                  this.virtualAppointmentFlag ||
                                  this.state.selectedTimeObj.type === 0
                                }
                                type="radio"
                                name="gender"
                                disabled={
                                  !this.virtualAppointmentFlag &&
                                  this.state.selectedTimeObj.type === 1
                                }
                                onChange={(e) => {
                                  this.setState({ felinType: 0 });
                                }}
                              />
                              <label
                                className="rc-input__label--inline"
                                htmlFor="female"
                              >
                                {/* <FormattedMessage id="Virtual appointment" /> */}
                                <FormattedMessage id="Rendez-vous virtuel" />
                              </label>
                            </div>
                            <div style={{ position: 'relative' }}>
                              <input
                                className="rc-input__radio"
                                id="male"
                                value="1"
                                checked={
                                  !this.virtualAppointmentFlag &&
                                  this.state.selectedTimeObj.type === 1
                                }
                                type="radio"
                                name="gender"
                                disabled={
                                  this.virtualAppointmentFlag ||
                                  this.state.selectedTimeObj.type === 0
                                }
                                onChange={(e) => {
                                  this.setState({ felinType: 1 });
                                }}
                                // onChange={(e) => this.genderChange(e)}
                              />
                              <label
                                className="rc-input__label--inline"
                                htmlFor="male"
                              >
                                {/* <FormattedMessage id="Face-to-face appointment" /> */}
                                <FormattedMessage id="Rendez-vous face à face" />
                              </label>
                            </div>
                          </div>
                        </>
                      ) : null}
                      {this.state.step === 3 ? (
                        <>
                          <p
                            className="text-center"
                            style={{ fontWeight: '500', marginTop: '30px' }}
                          >
                            Mon rendez-vous
                          </p>
                          <p
                            className="text-center"
                            style={{ fontWeight: '500' }}
                          >
                            Consultation expert
                          </p>
                          <p
                            className="text-center"
                            style={{
                              margin: '10px 0 20px',
                              marginBottom: '40px'
                            }}
                          >
                            {this.state.selectedTimeObj.name}
                          </p>
                          <button
                            className="rc-btn rc-btn--one"
                            style={{ width: '100%' }}
                            onClick={() => {
                              this.setState({ step: this.state.step + 1 });
                            }}
                          >
                            <FormattedMessage id="Continuer en tant qu'invité" />
                          </button>
                          {/* <button
                          className="rc-btn rc-btn--two"
                          style={{ margin: '5px 0', width: '100%' }}
                        >
                          <FormattedMessage id="Se connecter" />
                        </button> */}
                          <LoginButton
                            className="rc-btn rc-btn--two"
                            btnStyle={{ margin: '5px 0', width: '100%' }}
                            history={this.props.history}
                            beforeLoginCallback={async () => {
                              sessionItemRoyal.set('from-felin', true);
                            }}
                          >
                            Se connecter
                          </LoginButton>
                        </>
                      ) : null}
                      {this.state.step === 4 ? (
                        <>
                          <div className="row">
                            <div className="form-group col-lg-12 pull-left required">
                              {/* <label
                                className="form-control-label rc-full-width"
                                htmlFor="address"
                              >
                                <FormattedMessage id="payment.firstName" />
                              </label> */}
                              <span
                                className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  type="text"
                                  className="rc-input__control"
                                  id="username"
                                  name="username"
                                  required=""
                                  aria-required="true"
                                  value={userInfo.username}
                                  onChange={this.handleInputChange}
                                  onBlur={this.inputBlur}
                                  maxLength="50"
                                  autoComplete="address-line"
                                  placeholder="Votre nom (obligatoire)"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="username"
                                />
                              </span>
                              {errMsgObj.username && (
                                <div className="text-danger-2">
                                  {errMsgObj.username}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-lg-12 pull-left required">
                              {/* <label
                                className="form-control-label rc-full-width"
                                htmlFor="lastName"
                              >
                                <FormattedMessage id="payment.lastName" />
                              </label> */}
                              <span
                                className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  type="text"
                                  className="rc-input__control"
                                  id="email"
                                  name="email"
                                  required=""
                                  aria-required="true"
                                  value={userInfo.email}
                                  onChange={this.handleInputChange}
                                  onBlur={this.inputBlur}
                                  maxLength="50"
                                  autoComplete="address-line"
                                  placeholder="Votre adresse e-mail (obligatoire)"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="email"
                                />
                              </span>
                              {errMsgObj.email && (
                                <div className="text-danger-2">
                                  {errMsgObj.email}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-lg-12 pull-left required">
                              {/* <label
                                className="form-control-label rc-full-width"
                                htmlFor="address"
                              >
                                <FormattedMessage id="payment.address1" />
                              </label> */}
                              <span
                                className="rc-input rc-input--label rc-margin--none rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  type="text"
                                  className="rc-input__control"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  required=""
                                  aria-required="true"
                                  value={userInfo.phoneNumber}
                                  onChange={this.handleInputChange}
                                  onBlur={this.inputBlur}
                                  maxLength="50"
                                  autoComplete="address-line"
                                  placeholder="Votre numéro de téléphone (obligatoire)"
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="phoneNumber"
                                />
                              </span>
                              {errMsgObj.phoneNumber && (
                                <div className="text-danger-2">
                                  {errMsgObj.phoneNumber}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="rc-input rc-input--stacked">
                            <input
                              className="rc-input__checkbox"
                              id="id-checkbox-cat-2"
                              value="Cat"
                              type="checkbox"
                              name="checkbox-2"
                              checked={this.state.consentChecked}
                              onClick={() => {
                                this.setState(
                                  {
                                    consentChecked: !this.state.consentChecked
                                  },
                                  () => {
                                    this.updateButtonState();
                                  }
                                );
                              }}
                            />
                            <label
                              className="rc-input__label--inline"
                              for="id-checkbox-cat-2"
                            >
                              Les données personnelles, que vous renseignez sont
                              traitées aux fins de confirmer et assurer le suivi
                              du rendez-vous Elles seront conservées en accord
                              avec les règles de gestion des données privées que
                              vous pourrez retrouver en ligne sur
                              https://www.mars.com/privacy-policy-france
                            </label>
                          </div>
                          <button
                            className="rc-btn rc-btn--two"
                            style={{ width: '100%' }}
                            disabled={!nextBtnEnable}
                            onClick={() => {
                              let userInfo = localItemRoyal.get('rc-userinfo');
                              try {
                                apptSave({
                                  customerDetailVO: null,
                                  id: null,
                                  apptNo:
                                    'AP' + Math.ceil(Math.random() * 10000000),
                                  storeId: process.env.REACT_APP_STOREID,
                                  customerId: userInfo
                                    ? userInfo.customerId
                                    : null,
                                  type: this.state.felinType,
                                  apptDate: format(
                                    this.state.currentDate,
                                    'yyyyMMdd'
                                  ),
                                  apptTime: this.state.selectedTimeObj.value,
                                  status: 0,
                                  qrCode1: null,
                                  qrCode2: null,
                                  qrCode3: null,
                                  createTime: null,
                                  updateTime: null,
                                  delFlag: 0,
                                  delTime: null,
                                  consumerName: this.state.userInfo.username,
                                  consumerEmail: this.state.userInfo.email,
                                  consumerPhone: this.state.userInfo.phoneNumber
                                }).then((res) => {
                                  console.log(res, 'res');
                                  this.setState(
                                    { qrCode1: res.context.settingVO.qrCode1 },
                                    () => {
                                      if (res.context.settingVO.qrCode1) {
                                        this.setState({
                                          step: this.state.step + 1
                                        });
                                      }
                                    }
                                  );
                                });
                              } catch (e) {
                                console.log(e);
                              }
                            }}
                          >
                            <FormattedMessage id="Confirmer mes informations" />
                          </button>
                        </>
                      ) : null}
                      {this.state.step === 5 ? (
                        <div style={{ marginBottom: '20px' }}>
                          <p
                            className="text-center"
                            style={{ fontWeight: '500', marginTop: '30px' }}
                          >
                            Mon rendez-vous
                          </p>
                          <p
                            className="text-center"
                            style={{ fontWeight: '500' }}
                          >
                            Consultation expert
                          </p>
                          <p
                            className="text-center"
                            style={{ margin: '10px 0 20px' }}
                          >
                            {this.state.selectedTimeObj.name}
                          </p>
                          <p
                            className="text-center"
                            style={{ fontWeight: '500' }}
                          >
                            {userInfo.username}
                          </p>
                          <p className="text-center">{userInfo.email}</p>
                          <p
                            className="text-center"
                            style={{ margin: '10px 0 40px' }}
                          >
                            {userInfo.phoneNumber}
                          </p>
                          <button
                            className="rc-btn rc-btn--one"
                            style={{ width: '100%' }}
                            onClick={() => {
                              this.setState({ step: this.state.step + 1 });
                            }}
                          >
                            <FormattedMessage id="Confirmer le rendez-vous" />
                          </button>
                          <button
                            className="rc-btn rc-btn--two"
                            style={{ margin: '5px 0', width: '100%' }}
                            onClick={() => {
                              this.setState({ step: 1, nextBtnShow: true });
                            }}
                          >
                            <FormattedMessage id="Modifier le rendez-vous" />
                          </button>
                        </div>
                      ) : null}
                      {this.state.step === 1 ||
                      this.state.step === 2 ||
                      this.state.step === 5 ? (
                        <p style={{ textAlign: 'center', fontSize: '14px' }}>
                          L'Atelier Félin est ouvert du 20 avril au 13 juin
                          2021, tous les jours de 10h à 18h en magasin, et de
                          18h à 20h en ligne par visioconférence. Fermé le lundi
                          et le 1er mai. Toutes les réservations et abonnements
                          seront annulés après le 13 juin.
                        </p>
                      ) : null}
                      {this.state.step === 6 ? (
                        <>
                          <div
                            style={{
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              paddingTop: '10px'
                            }}
                          >
                            <p
                              className="text-center"
                              style={{ fontWeight: '500' }}
                            >
                              Mon rendez-vous
                            </p>
                            <p
                              className="text-center"
                              style={{ fontWeight: '500' }}
                            >
                              Consultation expert
                            </p>
                            <p
                              className="text-center"
                              style={{ margin: '10px 0 20px' }}
                            >
                              {this.state.selectedTimeObj.name}
                            </p>
                            <p
                              className="text-center"
                              style={{ fontWeight: '500' }}
                            >
                              {userInfo.username}
                            </p>
                            <p className="text-center">{userInfo.email}</p>
                            <p
                              className="text-center"
                              style={{ margin: '10px 0 20px' }}
                            >
                              {userInfo.phoneNumber}
                            </p>
                          </div>
                          <img
                            style={{
                              display: 'inline-block',
                              width: '180px',
                              // marginLeft: '100px',
                              float: 'right',
                              marginTop: '12px'
                            }}
                            // src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/qrcode.png`}
                            src={`${this.state.qrCode1}`}
                            alt=""
                          />
                        </>
                      ) : null}
                    </div>
                    {nextBtnShow ? (
                      <div style={{ width: '100%', textAlign: 'right' }}>
                        <button
                          className="rc-btn rc-btn--two"
                          onClick={this.goNextStep.bind(this)}
                          disabled={!nextBtnEnable}
                        >
                          <FormattedMessage id="next" />
                        </button>
                      </div>
                    ) : null}
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
