import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyLoad from 'react-lazyload';
import { validData, getDeviceType } from '@/utils/utils';
import GoogleTagManager from '@/components/GoogleTagManager';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Selection from '@/components/Selection';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import 'react-datepicker/dist/react-datepicker.css';
import './index.less';
import LoginButton from '@/components/LoginButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FaceBook_Icon from '@/assets/images/facebookIcon.png';
import Insgram_Icon from '@/assets/images/insgramIcon.png';
import qrcode_border from '@/assets/images/qrcode_border.jpg';
import { getTimeOptions, apptSave, getConsentList } from '@/api/appointment';
import { inject, observer } from 'mobx-react';
import { formatDate } from '@/utils/utils';
import { format } from 'date-fns';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

PRESONAL_INFO_RULE.filter((el) => el.key === 'phoneNumber')[0].regExp = '';

const isMobile = getDeviceType() === 'H5';

function isIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true;
  } else {
    return false;
  }
}

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

function scrollIntoView(element, additionalHeight) {
  const headerElement = document.querySelector(`.Felin`);
  if (element && headerElement) {
    // console.log(getElementTop(element) headerElement.offsetHeight)
    let height =
      Array.from(
        document.querySelectorAll(
          '.rc-header__nav, .search-full-input-container'
        )
      ).reduce((acc, el) => acc + el.offsetHeight, 0) - 1;
    let headerHeight = height + additionalHeight;
    // if (getElementTop(element) > document.documentElement.scrollTop) {
    //   headerHeight = height + additionalHeight;
    // } else {
    //   headerHeight = height + additionalHeight;
    // }
    console.info(
      'getElementTop(element) - headerHeight - additionalHeight - 60',
      getElementTop(element) - headerHeight - additionalHeight - 60
    );
    let scrollYLength =
      getElementTop(element) - headerHeight - additionalHeight - 60;
    if (isIE) {
      // ie不支持scrolloptions
      window.scrollTo(0, scrollYLength);
    } else {
      window.scroll({
        top: getElementTop(element) - headerHeight - additionalHeight - 60,
        behavior: 'smooth'
      });
    }
  }
}

function scrollPaymentPanelIntoView(id, additionalHeight = 0) {
  scrollIntoView(
    document.querySelector(`#${id}`),
    isMobile ? 0 : additionalHeight
  );
}

@inject('loginStore')
@injectIntl
@seoHoc('FelinLandingPage')
@observer
export default class Felin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      consentChecked1: false,
      consentChecked2: false,
      isContactUs: false,
      currentTabIndex: 0,
      topVal: '159px',
      currentDate: new Date(),
      calendarInitObserver: null,
      timeOption: [],
      qrCode1: '',
      languageHeight: 0,
      errMsg: '',
      consentList: {
        requiredList: [],
        optionalList: []
      },
      toDay: new Date()
    };
  }
  componentDidMount() {
    if (this.props.location.search === '?type=contact') {
      this.setState({ isContactUs: true, currentTabIndex: 2 });
      window.scroll({ top: 0 });
    }
    let currentDate = new Date();
    if (
      +currentDate > +new Date('2021-04-20') &&
      +currentDate < +new Date('2021-06-13')
    ) {
      this.setState(
        (prev) => {
          return { currentDate };
        },
        () => {
          this.buildTimeOption();
          getConsentList({ consentGroup: 'appointment' })
            .then((res) => {
              this.setState({ consentList: res.context });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    } else {
      this.setState(
        (prev) => {
          return { currentDate: new Date('2021-04-20') };
        },
        () => {
          this.buildTimeOption();
          getConsentList({ consentGroup: 'appointment' })
            .then((res) => {
              this.setState({ consentList: res.context });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
    if (document.querySelector('.rc-language-banner')) {
      this.setState({ languageHeight: 37 });
    }

    window.addEventListener('scroll', (e) => {
      let height =
        Array.from(
          document.querySelectorAll(
            '.rc-header__nav, .search-full-input-container'
          )
        ).reduce((acc, el) => acc + el.offsetHeight, 0) - 1;
      // if (document.querySelector('.rc-header--scrolled')) {
      //   this.setState({
      //     topVal: height + (isMobile ? 0 : this.state.languageHeight) + 'px'
      //   });
      // } else {
      //   this.setState({
      //     topVal: height + (isMobile ? 0 : this.state.languageHeight) + 'px'
      //   });
      // }
      this.setState({
        topVal: height + (isMobile ? 0 : this.state.languageHeight) + 'px'
      });
    });
    // let timer = setInterval(() => {
    //   let height =
    //     Array.from(
    //       document.querySelectorAll(
    //         '.rc-header__nav, .search-full-input-container'
    //       )
    //     ).reduce((acc, el) => acc + el.offsetHeight, 0) - 1;
    //   if (document.querySelector('.rc-header--scrolled')) {
    //     this.setState({
    //       topVal: height + (isMobile ? 0 : this.state.languageHeight) + 'px'
    //     });
    //   } else {
    //     this.setState({
    //       topVal: height + (isMobile ? 0 : this.state.languageHeight) + 'px'
    //     });
    //   }
    // }, 100);
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

    let iconDom = document.querySelector(
      '.iconfont.font-weight-bold.icon-arrow '
    );
    document.querySelector('#Selection').removeChild(iconDom);
    let needIconDom = document.createElement('span');
    needIconDom.classList.add('icon', 'iconfont');
    needIconDom.innerHTML = `&#xe601;`;
    document.querySelector('#Selection').appendChild(needIconDom);
    document
      .querySelector('.react-calendar__navigation__label__labelText')
      .addEventListener('click', (e) => e.stopImmediatePropagation(), true);

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
  buildTimeOption() {
    let timeOption = [];
    let arr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    arr.forEach((el) => {
      if (el < 19) {
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
          type: 2
        });
        timeOption.push({
          name: `${el}:30 - ${el}:50 ${el >= 12 ? 'PM' : 'AM'}`,
          value: `${el}:30-${el}:50`,
          disabled: false,
          type: 2
        });
      }
    });
    this.setState({ timeOption: timeOption });
    this.getTimeOptions();
  }
  get virtualAppointmentFlag() {
    return false;
  }
  get virtualDisabledFlag() {
    // console.log(this.virtualAppointmentFlag, this.state.selectedTimeObj, 'selectedTimeObj----')
    // return (
    //   !this.virtualAppointmentFlag && this.state.selectedTimeObj.type === 1
    // );
    return false;
  }
  get facetofaceDisabledFlag() {
    return this.virtualAppointmentFlag || this.state.selectedTimeObj.type === 0;
  }
  getTimeOptions() {
    this.setState({ loading: true });
    getTimeOptions({
      apptDate: format(this.state.currentDate, 'YYYYMMDD')
    })
      .then((res) => {
        let { timeOption } = this.state;
        let { appointmentVOList } = res.context;
        timeOption.forEach((timeItem) => {
          timeItem.disabled = false;
          if (
            appointmentVOList.filter(
              (apptItem) => apptItem.apptTime === timeItem.value
            ).length
          ) {
            timeItem.disabled = true;
          }
        });
        this.setState({ loading: false });
      })
      .catch((err) => {
        scrollPaymentPanelIntoView('felinFooter', this.state.languageHeight);
        this.setState({
          loading: false,
          errMsg: "Impossible d'obtenir le temps"
        });
        setTimeout(() => {
          this.setState({ errMsg: '' });
        }, 5000);
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
    // if (name === 'phoneNumber' && window.__.env.REACT_APP_COUNTRY === 'fr') {
    //   value = value.replace(/^[0]/, '+(33)');
    // }
    userInfo[name] = value;
    this.setState({ userInfo });
  };
  inputBlur = async (e) => {
    const { intl } = this.props;
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = PRESONAL_INFO_RULE.filter((e) => e.key === target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    try {
      await validData({
        rule: targetRule,
        data: { [target.name]: value },
        intl
      });
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
      qrCode1,
      toDay
    } = this.state;
    if (step === 1) {
      scrollPaymentPanelIntoView('felinFooter', 0);
      if (
        currentDate < new Date('2021-04-20') ||
        currentDate > new Date('2021-06-13')
      ) {
        this.setState({
          errMsg: 'La date actuelle ne peut pas être sélectionnée'
        });
        setTimeout(() => {
          this.setState({ errMsg: '' });
        }, 5000);
        return false;
      }
      if (
        currentDate.getDay() === 1 ||
        format(currentDate, 'YYYY-MM-DD') === '2021-05-01'
      ) {
        this.setState({
          errMsg: 'La date actuelle ne peut pas être sélectionnée'
        });
        setTimeout(() => {
          this.setState({ errMsg: '' });
        }, 5000);
        return false;
      }
    }
    this.setState({ step: step + 1 }, () => {
      if (step === 2) {
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
      scrollPaymentPanelIntoView('felinFooter', this.state.languageHeight);
      this.currentStep();
      this.updateButtonState();
    });
  }

  ConfirmInfo() {
    let userInfo = localItemRoyal.get('rc-userinfo');
    try {
      let { consentList } = this.state;
      let optionalList = [];
      let requiredList = [];
      if (this.state.consentChecked1) {
        requiredList.push({
          id: consentList.requiredList[0].id,
          selectedFlag: true
        });
      }
      if (this.state.consentChecked2) {
        optionalList.push({
          id: consentList.optionalList[0].id,
          selectedFlag: true
        });
      }
      apptSave({
        customerDetailVO: null,
        id: null,
        apptNo: 'AP' + Math.ceil(Math.random() * 10000000),
        storeId: window.__.env.REACT_APP_STOREID,
        customerId: userInfo ? userInfo.customerId : null,
        type: this.state.felinType,
        apptDate: format(this.state.currentDate, 'YYYYMMDD'),
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
        consumerPhone: this.state.userInfo.phoneNumber,
        optionalList,
        requiredList,
        oktaToken: localItemRoyal.get('oktaToken')
      })
        .then((res) => {
          this.setState({ qrCode1: res.context.settingVO.qrCode1 }, () => {
            if (res.context.settingVO.qrCode1) {
              this.setState(
                {
                  step: this.state.step + 1
                },
                () => {
                  this.currentStep();
                  scrollPaymentPanelIntoView(
                    'felinFooter',
                    this.state.languageHeight
                  );
                }
              );
            }
          });
        })
        .catch((err) => {
          scrollPaymentPanelIntoView('felinFooter', this.state.languageHeight);
          this.setState(
            {
              step: 1,
              nextBtnShow: 1
            },
            () => {
              this.setState({ errMsg: err.message });
              setTimeout(() => {
                this.setState({ errMsg: '' });
              }, 5000);
            }
          );
        });
    } catch (e) {
      console.log(e);
    }
  }

  handleNextStepBtn() {
    this.setState({ step: this.state.step + 1 }, () => {
      this.currentStep();
      this.updateButtonState();
      scrollPaymentPanelIntoView('felinFooter', this.state.languageHeight);
    });
  }
  modifyAppointment() {
    this.setState({ step: 1, nextBtnShow: true }, () => {
      this.currentStep();
    });
  }

  currentStep() {
    let obj = {
      1: 'Calendar',
      2: 'Appointment type',
      3: 'Login',
      4: 'Customer info',
      5: 'Recap',
      6: 'Confirmation'
    };
    this.bookingStepsGA(obj[this.state.step]);
  }

  updateButtonState() {
    let { step, selectedTimeObj, consentChecked1, selectedDate, felinType } =
      this.state;
    console.log(step, this.state.errMsgObj, consentChecked1, 'hahaha');
    if (step === 1 && selectedTimeObj.value && selectedDate) {
      this.setState({ nextBtnEnable: true });
    } else if (step === 2) {
      this.setState({ nextBtnEnable: true });
    } else if (
      step === 4 &&
      Object.values(this.state.errMsgObj).every((el) => el === '') &&
      consentChecked1
    ) {
      // 所有信息必须有值
      if (!Object.values(this.state.userInfo).some((el) => !el)) {
        this.setState({ nextBtnEnable: true });
      }
    } else {
      this.setState({ nextBtnEnable: false });
    }
  }

  handleClickBtn(type, btnName) {
    scrollPaymentPanelIntoView(type);
    window?.dataLayer?.push({
      event: 'atelierFelinButtonClick',
      atelierFelinButtonClickName: btnName
    });
  }

  bookingStepsGA(stepName) {
    window?.dataLayer?.push({
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
      currentTabIndex,
      errMsg,
      consentList
    } = this.state;
    // console.log(consentList, 'consentList');
    const event = {
      page: {
        type: 'Felin',
        theme: '',
        path: this.props.location.pathname
      }
    };
    return (
      <div className="Felin">
        <Canonical />
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
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
                minHeight: '60px',
                paddingTop: '1.5rem',
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
                      scrollPaymentPanelIntoView(
                        'section5',
                        this.state.languageHeight
                      );
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
                      scrollPaymentPanelIntoView(
                        'felinFooter',
                        this.state.languageHeight
                      );
                    }
                  );
                }}
              >
                Réserver un rendez-vous
              </span>
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
            </div>
            <br />
            <div
              className="contactUs"
              style={{
                display: isContactUs ? 'block' : 'none',
                marginTop: '60px'
              }}
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
              <p className="mb-20">Mardi - Dimanche, 10h – 19h</p>
              <p>
                <a href="https://fr-fr.facebook.com/RoyalCaninFrance/">
                  <img
                    style={{
                      display: 'inline-block',
                      width: '50px',
                      marginLeft: '1.25rem'
                    }}
                    alt="facebook icon"
                    src={FaceBook_Icon}
                  />
                </a>
                <a href="https://www.instagram.com/royalcaninfrance/?hl=en">
                  <img
                    style={{
                      display: 'inline-block',
                      width: '50px',
                      marginLeft: '1.25rem'
                    }}
                    alt="insgram icon"
                    src={Insgram_Icon}
                  />
                </a>
              </p>
            </div>
            <div
              style={{
                display: !isContactUs ? 'block' : 'none',
                marginTop: '3rem'
              }}
            >
              <div className="rc-layout-container rc-two-column rc-content-h-middle">
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/logoAtelier felin.png`}
                        alt="logoAterlier icon"
                      />
                    </LazyLoad>
                    <div className="rc-gamma inherit-fontsize mt-2">
                      <h3 className="firstTitle">
                        Un nouveau lieu d'échanges sur la santé et le bien-être
                        de votre chat
                      </h3>
                    </div>

                    <button
                      className="rc-btn rc-btn--one"
                      onClick={() => {
                        scrollPaymentPanelIntoView(
                          'felinFooter',
                          this.state.languageHeight
                        );
                      }}
                    >
                      Rencontrez nos experts félins
                    </button>
                    <p
                      className="mt-3"
                      style={{ fontSize: '.875rem', marginLeft: '.625rem' }}
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
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/felin_cat_sm.gif`}
                        alt="felin cat"
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
                        L’Atelier Félin est fait pour échanger avec des experts,
                        posez-leur vos questions sur le comportement de votre
                        chat, ses habitudes, ses soins et la nutrition la plus
                        appropriée à ses besoins…
                      </p>
                      <p className="mb-20">
                        Des comportementalistes félins sont là pour établir le
                        profil de votre chat et vous apporter des conseils
                        personnalisés et spécifiques à la vie en appartement.
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
                        échangez avec nos experts
                      </button>
                    </div>
                  </h4>
                </div>
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <LazyLoad>
                      <img
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/person@2x_1.jpeg`}
                        alt="felin person"
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
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/grid@2x.png`}
                        alt="felin grid"
                      />
                    </LazyLoad>
                  </h4>
                </div>
                <div className="rc-column">
                  <h4 className="rc-espilon">
                    <div className="content">
                      <div className="rc-gamma inherit-fontsize">
                        <h3>
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
                        recharger en boutique, ou vous faire livrer (Uniquement
                        en Ile de France) une nouvelle dose. Notre livreur
                        repartira avec le contenant vide qui sera reconditionné
                        pour un nouvel usage.
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
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/box@2x_1.jpeg`}
                        alt="box image"
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
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/felin/store@2x_1.jpeg`}
                        alt="store image"
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
                        Venez rencontrer nos associations partenaires et
                        découvrir certains chats qui sont à l’adoption. (le
                        weekend exclusivement)
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
                    <div
                      className={`text-break mt-2 mb-2 ${
                        errMsg ? '' : 'hidden'
                      }`}
                      style={{ width: '500px', margin: '0 auto' }}
                    >
                      <aside
                        className="rc-alert rc-alert--error rc-alert--with-close"
                        role="alert"
                      >
                        <span className="pl-0">{errMsg}</span>
                      </aside>
                    </div>
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
                                marginTop: '.625rem',
                                display: 'inline-block',
                                width: '303px'
                              }}
                            >
                              <input
                                type="text"
                                autocomplete="off"
                                id="datepicker"
                                name="currentDate"
                                placeholder="Sélectionner Un date"
                                style={{
                                  width: '100%',
                                  border: 'none'
                                  // cursor: 'pointer'
                                }}
                                disabled
                                value={formatDate({
                                  date: this.state.currentDate
                                })}
                              />
                            </h4>
                            <span className="icon iconfont iconfont-date">
                              &#xe6b3;
                            </span>
                            <Calendar
                              value={this.state.currentDate}
                              calendarType="us"
                              locale={window.__.env.REACT_APP_CALENDAR_LOCALE}
                              view="month"
                              onViewChange={() => {
                                console.log(111);
                                return;
                              }}
                              tileDisabled={({ activeStartDate, date, view }) =>
                                date.getDay() === 1 ||
                                format(date, 'YYYY-MM-DD') === '2021-05-01'
                              }
                              minDate={
                                new Date(
                                  format(this.state.toDay, 'YYYY-MM-DD')
                                ) > new Date('2021-04-20')
                                  ? new Date(
                                      format(this.state.toDay, 'YYYY-MM-DD')
                                    )
                                  : new Date('2021-04-20')
                              }
                              maxDate={
                                new Date(
                                  format(this.state.toDay, 'YYYY-MM-DD')
                                ) < new Date('2021-06-13')
                                  ? new Date('2021-06-13')
                                  : new Date(
                                      format(this.state.toDay, 'YYYY-MM-DD')
                                    )
                              }
                              onChange={(date) => {
                                if (
                                  format(date, 'YYYY-MM-DD') ===
                                  format(this.state.currentDate, 'YYYY-MM-DD')
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
                              placeholder="Choisissez un créneau horaire"
                              optionList={this.state.timeOption}
                              selectedItemChange={(data) => {
                                console.log(data);
                                this.setState(
                                  {
                                    selectedTimeObj: data,
                                    felinType: this.virtualAppointmentFlag
                                      ? 0
                                      : data.type
                                  },
                                  () => {
                                    this.updateButtonState();
                                  }
                                );
                              }}
                              selectedItemData={{
                                value: this.state.selectedTimeObj.value
                              }}
                              customContainerStyle={{
                                opacity: this.state.loading ? '.6' : '1'
                              }}
                              disabled={this.state.loading}
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
                            <div
                              style={{
                                position: 'relative',
                                opacity: this.virtualDisabledFlag ? '.4' : '1'
                              }}
                            >
                              <input
                                className="rc-input__radio"
                                id="virtuel"
                                value="0"
                                checked={
                                  // this.virtualAppointmentFlag ||
                                  // this.state.selectedTimeObj.type === 0
                                  this.state.felinType === 0
                                }
                                type="radio"
                                name="apptType"
                                disabled={this.virtualDisabledFlag}
                                onChange={(e) => {
                                  this.setState({ felinType: 0 });
                                }}
                              />
                              <label
                                className="rc-input__label--inline"
                                htmlFor="virtuel"
                              >
                                {/* <FormattedMessage id="Virtual appointment" /> */}
                                <FormattedMessage id="Rendez-vous virtuel" />
                              </label>
                            </div>
                            <div
                              style={{
                                position: 'relative',
                                opacity: this.facetofaceDisabledFlag
                                  ? '.4'
                                  : '1'
                              }}
                            >
                              <input
                                className="rc-input__radio"
                                id="facetoface"
                                value="1"
                                checked={
                                  // !this.virtualAppointmentFlag &&
                                  // this.state.selectedTimeObj.type === 1
                                  this.state.felinType === 1
                                }
                                type="radio"
                                name="apptType"
                                disabled={this.facetofaceDisabledFlag}
                                onChange={(e) => {
                                  this.setState({ felinType: 1 });
                                }}
                                // onChange={(e) => this.genderChange(e)}
                              />
                              <label
                                className="rc-input__label--inline"
                                htmlFor="facetoface"
                              >
                                {/* <FormattedMessage id="Face-to-face appointment" /> */}
                                <FormattedMessage id="Rendez-vous face à face" />
                                <p
                                  style={{
                                    fontSize: '.75rem',
                                    marginTop: '.5rem'
                                  }}
                                >
                                  (6 Rue des Coutures Saint-Gervais 75003 Paris)
                                </p>
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
                            style={{ margin: '1.25rem 0 .625rem' }}
                          >
                            {formatDate({ date: this.state.currentDate })}
                          </p>
                          <p
                            className="text-center"
                            style={{
                              margin: '.625rem 0 1.25rem',
                              marginBottom: '40px'
                            }}
                          >
                            {this.state.selectedTimeObj.name}
                          </p>
                          {!this.props.loginStore.isLogin ? (
                            <button
                              className="rc-btn rc-btn--one"
                              style={{ width: '100%' }}
                              onClick={() => this.handleNextStepBtn()}
                            >
                              <FormattedMessage id="Continuer en tant qu'invité" />
                            </button>
                          ) : null}
                          {!this.props.loginStore.isLogin ? (
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
                          ) : (
                            <button
                              className="rc-btn rc-btn--two"
                              style={{ margin: '5px 0', width: '100%' }}
                              onClick={() => this.handleNextStepBtn()}
                            >
                              <FormattedMessage id="Se connecter" />
                            </button>
                          )}
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
                          {consentList.requiredList.length > 0 ? (
                            <div className="rc-input rc-input--stacked">
                              <input
                                className="rc-input__checkbox"
                                id="id-checkbox-consent-1"
                                value="Cat"
                                type="checkbox"
                                name="checkbox-2"
                                checked={this.state.consentChecked1}
                                onClick={() => {
                                  this.setState(
                                    {
                                      consentChecked1:
                                        !this.state.consentChecked1
                                    },
                                    () => {
                                      this.updateButtonState();
                                    }
                                  );
                                }}
                              />
                              <label
                                className="rc-input__label--inline consent"
                                htmlFor="id-checkbox-consent-1"
                              >
                                Les données personnelles, que vous renseignez
                                sont traitées aux fins de confirmer et assurer
                                le suivi du rendez-vous. Elles seront conservées
                                conformément avec notre déclaration de
                                confidentialité que vous pouvez retrouver en
                                ligne sur
                                <br />
                                <a
                                  href="https://www.mars.com/privacy-policy-france"
                                  target="_blank"
                                >
                                  https://www.mars.com/privacy-policy-france
                                  {Boolean(
                                    window.__.env
                                      .REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                                  ) && (
                                    <span className="warning_blank">
                                      <FormattedMessage id="opensANewWindow" />
                                    </span>
                                  )}
                                </a>
                              </label>
                            </div>
                          ) : null}
                          {consentList.optionalList.length > 0 ? (
                            <div className="rc-input rc-input--stacked">
                              <input
                                className="rc-input__checkbox"
                                id="id-checkbox-consent-2"
                                value="Cat"
                                type="checkbox"
                                name="checkbox-2"
                                checked={this.state.consentChecked2}
                                onClick={() => {
                                  this.setState(
                                    {
                                      consentChecked2:
                                        !this.state.consentChecked2
                                    },
                                    () => {
                                      this.updateButtonState();
                                    }
                                  );
                                }}
                              />
                              <label
                                className="rc-input__label--inline consent"
                                htmlFor="id-checkbox-consent-2"
                              >
                                J'accepte de recevoir des communications
                                marketing de la part de Royal Canin dans le
                                cadre de l'Atelier Félin
                              </label>
                            </div>
                          ) : null}

                          <button
                            className="rc-btn rc-btn--two"
                            style={{ width: '100%' }}
                            disabled={!nextBtnEnable}
                            onClick={() => this.handleNextStepBtn()}
                          >
                            <FormattedMessage id="Confirmer mes informations" />
                          </button>
                        </>
                      ) : null}
                      {this.state.step === 5 ? (
                        <div style={{ marginBottom: '1.25rem' }}>
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
                            style={{ margin: '1.25rem 0 .625rem' }}
                          >
                            {formatDate({ date: this.state.currentDate })}
                          </p>
                          <p
                            className="text-center"
                            style={{ margin: '.625rem 0 1.25rem' }}
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
                            style={{ margin: '.625rem 0 40px' }}
                          >
                            {userInfo.phoneNumber}
                          </p>
                          <button
                            className="rc-btn rc-btn--one"
                            style={{ width: '100%' }}
                            onClick={() => this.ConfirmInfo()}
                          >
                            <FormattedMessage id="Confirmer le rendez-vous" />
                          </button>
                          <button
                            className="rc-btn rc-btn--two"
                            style={{ margin: '5px 0', width: '100%' }}
                            onClick={() => this.modifyAppointment()}
                          >
                            <FormattedMessage id="Modifier le rendez-vous" />
                          </button>
                        </div>
                      ) : null}
                      {this.state.step === 1 ||
                      this.state.step === 2 ||
                      this.state.step === 5 ? (
                        <p style={{ textAlign: 'center', fontSize: '.875rem' }}>
                          Du 20 avril au 13 juin 2021, prenez rendez vous pour
                          discuter avec{' '}
                          <span className="red">
                            <strong>
                              nos experts du comportement de votre chat et
                              découvrir l’aliment le plus adapté à ses besoins.
                            </strong>
                          </span>
                          <p style={{ fontSize: '.75rem', marginTop: '1rem' }}>
                            (Dans notre Atelier Félin ou par telephone du Mardi
                            au Dimanche de 10h à 20h.Fermé le lundi et le 1er
                            Mai.)
                          </p>
                        </p>
                      ) : null}
                      {this.state.step === 6 ? (
                        <>
                          <div
                            style={{
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              paddingTop: '.625rem'
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
                              style={{ margin: '1.25rem 0 .625rem' }}
                            >
                              {formatDate({ date: this.state.currentDate })}
                            </p>
                            <p
                              className="text-center"
                              style={{ margin: '.625rem 0 1.25rem' }}
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
                              style={{ margin: '.625rem 0 1.25rem' }}
                            >
                              {userInfo.phoneNumber}
                            </p>
                          </div>
                          <div
                            style={{
                              display: 'inline-block',
                              background: `url(${qrcode_border}) center center`,
                              backgroundSize: '100% 100%',
                              width: '180px',
                              height: '180px',
                              textAlign: 'center',
                              lineHeight: '176px',
                              float: 'right',
                              marginTop: '.75rem'
                            }}
                          >
                            <img
                              style={{
                                display: 'inline-block',
                                width: '160px',
                                height: '160px'
                              }}
                              src={`${this.state.qrCode1}`}
                              alt="qrcode image"
                            />
                          </div>
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
          <Footer />
        </main>
      </div>
    );
  }
}
