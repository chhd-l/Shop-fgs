import React from 'react';
import MyModal from '../modules/modal';
import UpdatModal from '../updatModules/modal';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.less';
import '../mobile.less';
import 'react-calendar/dist/Calendar.css';
import { inject, observer } from 'mobx-react';
import img from '../image/img.png';
import cat1 from '../image/cat1.png';
import cat2 from '../image/cat2.png';
import cat3 from '../image/cat3.png';
import one from '../image/one.png';
import two from '../image/two.png';
import three from '../image/three.png';
import four from '../image/four.png';
import five from '../image/five.png';
import WeekCalender from '../week/week-calender';
import {
  gitDict,
  postQueryPrice,
  postSave,
  postUpdate,
  queryDate,
  getAppointByApptNo
} from '@/api/felin';
import moment from 'moment';
import LoginButton from '@/components/LoginButton';
import { getDeviceType } from '../../../utils/utils';
import { postcustomerUpdate } from '../../../api/felin';
import { injectIntl } from 'react-intl-phraseapp';
import { scrollIntoView } from '@/lib/scroll-to-utils';
import { funcUrl } from '@/lib/url-utils';

const localItemRoyal = window.__.localItemRoyal;
PRESONAL_INFO_RULE.filter((el) => el.key === 'phoneNumber')[0].regExp = '';
const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class Pcexperts extends React.Component {
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
          name: 'Comportementalistes'
        },
        {
          valueEn: 'Nutritionist',
          src: cat2,
          name: 'Expert en nutrition'
        }
      ],
      timeList: [
        {
          duration: 15,
          text: 'Échangez avec un expert pour recevoir quelques conseils clefs pour prendre soin de votre chat.'
        },
        {
          duration: 30,
          text: 'Recevez un bilan express avec l’expert sélectionné.'
        },
        {
          duration: 45,
          text: 'Creusez les problématiques identifiées avec l’expert et définissez des solutions pour les traiter sur le long terme.'
        },
        {
          duration: 60,
          text: 'Nous approfondirons chaque aspect de la vie de votre chat pour vous proposer des solutions adaptées à vos possibilités.'
        }
      ],
      isShow: true,
      oneShow: false,
      twoShow: false,
      threeShow: false,
      fourShow: false,
      fiveShow: false,
      maxHeight: null,
      activeMaxKey: null,
      apptTypeList: [], // 线上线下
      expertTypeList: [],
      params: {
        apptTypeId: null, // 线上线下
        expertTypeId: null, // 专家类型
        minutes: null // 时间
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
        employeeIds: [],
        employeeNames: []
      },
      userInfo: undefined,
      apptNo: '',
      appointmentVO: {}
    };
  }

  componentDidMount() {
    let userInfo = this.props.loginStore.userInfo;
    let id = funcUrl({ name: 'id' });
    if (
      id &&
      (getDeviceType() === 'PC' ||
        (getDeviceType() === 'Pad' && document.body.clientWidth > 768))
    ) {
      this.setList(id);
    }
    if (userInfo) {
      this.setState({
        userInfo: {
          ...userInfo
        }
      });
    }
  }

  getDeatalData = async (id) => {
    let appointName = {
      Online: 'Appel video',
      Offline: 'Sur place'
    };

    const { code, context } = await getAppointByApptNo({ apptNo: id });
    if (code === 'K-000000') {
      let type = this.state.apptTypeList.find(
        (item) => item.id === context.apptTypeId
      ).name;
      let expertise = this.state.list.find(
        (item) => item.id === context.expertTypeId
      ).name;
      this.setState(
        {
          votre: {
            type: type,
            expertise: expertise,
            duree: context.minutes,
            date: moment(context.bookSlotVO.dateNo).format('YYYY-MM-DD'),
            heure: moment(
              moment(context.bookSlotVO.startTime, 'YYYY-MM-DD HH:mm')
            ).format('HH:mm')
          },
          appointmentVO: {
            ...this.state.appointmentVO,
            ...context
          },
          params: {
            ...this.state.params,
            apptTypeId: context.apptTypeId,
            minutes: context.minutes,
            expertTypeId: context.expertTypeId
          },
          bookSlotVO: {
            ...this.state.bookSlotVO,
            ...context.bookSlotVO
          }
        },
        () => {
          this.getPirx(context.expertTypeId, context.minutes);
        }
      );
    }
  };
  getPirx = async (expertTypeId, minutes) => {
    const { code, context } = await postQueryPrice({
      expertTypeId,
      serviceTypeId: 6
    });
    if (code === 'K-000000') {
      let timeList = this.state.timeList.map((item) => {
        let _temp = context.priceVOs.find(
          (items) => items.duration === item.duration
        );
        return { ...item, ..._temp };
      });
      let prix = timeList.find((item) => item.duration === minutes).goodsInfoVO
        .marketPrice;
      this.setState(
        {
          timeList,
          votre: {
            ...this.state.votre,
            prix
          },
          isShow: false
        },
        () => {
          this.handleGotoFour();
        }
      );
    }
  };
  // 点击咨询
  handleOneShow = async () => {
    // 线上
    const { context: apptTypeList } = await gitDict({
      type: 'appointment_type'
    });
    // 专家
    const { context: list } = await gitDict({
      type: 'expert_type'
    });
    let expertTypeList = list.goodsDictionaryVOS.map((item) => {
      let _temp = this.state.list.find(
        (items) => items.valueEn === item.valueEn
      );
      return { ...item, ..._temp };
    });
    console.log(apptTypeList);
    this.setState(
      {
        apptTypeList: apptTypeList.goodsDictionaryVOS,
        list: expertTypeList.reverse(),
        isShow: false,
        oneShow: true
      },
      () => {
        let anchorElement = document.getElementById('oneBox');
        window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 3);
      }
    );
  };

  setList = async (id) => {
    // 线上
    const { context: apptTypeList } = await gitDict({
      type: 'appointment_type'
    });
    // 专家
    const { context: list } = await gitDict({
      type: 'expert_type'
    });
    let expertTypeList = list.goodsDictionaryVOS.map((item) => {
      let _temp = this.state.list.find(
        (items) => items.valueEn === item.valueEn
      );
      return { ...item, ..._temp };
    });
    this.setState(
      {
        apptTypeList: apptTypeList.goodsDictionaryVOS,
        list: expertTypeList.reverse()
      },
      () => {
        this.getDeatalData(id);
      }
    );
  };

  // 第二步返回上一步
  handleReturnOne = () => {
    this.setState({
      isShow: true,
      oneShow: false
    });
  };
  // 跳转第三步
  handleGotoThree = async () => {
    const { code, context } = await postQueryPrice({
      expertTypeId: this.state.params.expertTypeId,
      serviceTypeId: 6
    });
    if (code === 'K-000000') {
      let timeList = this.state.timeList.map((item) => {
        let _temp = context.priceVOs.find(
          (items) => items.duration === item.duration
        );
        return { ...item, ..._temp };
      });
      this.setState({
        timeList,
        oneShow: false,
        threeShow: true
      });
    }
  };

  // 返回第二步
  handleReturnTwo = () => {
    this.setState(
      {
        oneShow: true,
        threeShow: false
      },
      () => {
        let anchorElement = document.getElementById('oneBox');
        window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 3);
      }
    );
  };
  // 跳转第四步
  handleGotoFour = () => {
    this.setState(
      {
        threeShow: false,
        fourShow: true
      },
      () => {
        scrollIntoView(document.querySelector(`#Voir-fqas`));
      }
    );
    let type = !!this.state.bookSlotVO.dateNo;
    this.queryDate(type, {
      minutes: this.state.votre.duree,
      bookSlotVO: this.state.bookSlotVO
    });
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
    let id = funcUrl({ name: 'id' });
    if (id) {
      this.postUpdate({
        ...this.state.params,
        apptNo: this.state.appointmentVO.apptNo,
        id: this.state.appointmentVO.id,
        createTime: this.state.appointmentVO.createTime,
        consumerName:
          this.state.userInfo?.contactName ||
          this.state.appointmentVO.consumerName ||
          undefined,
        consumerFirstName:
          this.state.userInfo?.firstName ||
          this.state.appointmentVO.consumerFirstName ||
          undefined,
        consumerLastName:
          this.state.userInfo?.lastName ||
          this.state.appointmentVO.consumerLastName ||
          undefined,
        consumerEmail:
          this.state.userInfo?.email ||
          this.state.appointmentVO.consumerEmail ||
          undefined,
        consumerPhone:
          this.state.userInfo?.contactPhone ||
          this.state.appointmentVO.consumerPhone ||
          undefined,
        customerId:
          this.state.userInfo?.customerId ||
          this.state.appointmentVO.customerId ||
          undefined,
        customerLevelId: this.state.appointmentVO.customerId ? 234 : 233, // 233未登录 234登陆
        bookSlotVO: this.state.bookSlotVO,
        serviceTypeId: 6
      });
    } else {
      this.postSave();
    }
  };
  postSave = async () => {
    const { context } = await postSave({
      ...this.state.params,
      consumerName: this.state.userInfo?.contactName || undefined,
      consumerFirstName: this.state.userInfo?.firstName || undefined,
      consumerLastName: this.state.userInfo?.lastName || undefined,
      consumerEmail: this.state.userInfo?.email || undefined,
      consumerPhone: this.state.userInfo?.contactPhone || undefined,
      customerId: this.state.userInfo?.customerId || undefined,
      customerLevelId: this.state.userInfo?.customerId ? 234 : 233, // 233未登录 234登陆
      bookSlotVO: this.state.bookSlotVO,
      serviceTypeId: 6
    });
    let apptNo = context.appointmentVO.apptNo;
    let appointmentVO = context.appointmentVO;
    if (apptNo) {
      sessionItemRoyal.set('appointment-no', apptNo);
      if (this.state.userInfo) {
        this.props.history.push('/checkout');
      } else {
        this.setState({
          apptNo,
          appointmentVO,
          fourShow: false,
          fiveShow: true
        });
      }
    }
  };
  // 选择专家
  handleActiveBut = (id, name, key, key1, value, key2) => {
    this.setState({
      params: {
        ...this.state.params,
        [key]: id
      },
      votre: {
        ...this.state.votre,
        [key1]: name,
        [key2]: value
      }
    });
  };
  queryDate = (type = false, chooseData = {}) => {
    setTimeout(async () => {
      const resources = await new Promise(async (reslove) => {
        const { code, context } = await queryDate({
          ...this.state.params,
          appointmentTypeId: this.state.params.apptTypeId
        });

        if (code === 'K-000000') {
          let _resources = context.resources;
          if (type) {
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

            if (_resources.length === 0) {
              _resources.push(_temp);
            } else {
              _resources.forEach((item) => {
                if (item.date === _temp.date) {
                  let isLoop = false;
                  item.minuteSlotVOList = item.minuteSlotVOList.map(
                    (it, index) => {
                      const _t = _temp.minuteSlotVOList.find(
                        (ii) => ii.startTime === it.startTime
                      );
                      if (_t) {
                        isLoop = true;
                        it = { ...it, ..._t };
                      }
                      return it;
                    }
                  );
                  if (!isLoop) {
                    item.minuteSlotVOList = item.minuteSlotVOList.concat(
                      _temp.minuteSlotVOList
                    );
                  }
                }
              });
            }
          }
          console.log(_resources, '_resources');
          reslove(_resources);
        }
      });
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
  handleUpdate = async (params) => {
    const { code } = await postcustomerUpdate({
      apptNo: this.state.appointmentVO.apptNo,
      consumerFirstName: params.firstName,
      consumerLastName: params.lastName,
      consumerName: params.firstName + ' ' + params.lastName,
      consumerEmail: params.email,
      consumerPhone: params.phone
    });
    if (code === 'K-000000') {
      this.props.history.push('/checkout');
    }
  };
  postUpdate = async (params) => {
    let id = funcUrl({ name: 'id' });
    const { code, context } = await postUpdate(params);
    if (code === 'K-000000') {
      sessionItemRoyal.set('appointment-no', context.appointmentVO.apptNo);
      sessionItemRoyal.set('oldAppointNo', id);
      sessionItemRoyal.set('isChangeAppoint', true);
      this.props.history.push('/checkout');
    }
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="pc-block">
        {/* 默认页面 */}
        {this.state.isShow ? (
          <div>
            <div className="txt-centr">
              <button
                onClick={this.handleOneShow}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Commencer
              </button>
            </div>
          </div>
        ) : null}
        {/* 第一步第二步 */}
        {this.state.oneShow ? (
          <div id="oneBox">
            <div className="Choisissez">
              <div>
                <div className="size16 mb16 js-center">
                  <img
                    src={one}
                    alt=""
                    className="mr10"
                    style={{ width: '1.25rem' }}
                  />
                  <div>Choisissez un type de rendez-vous</div>
                </div>
                <div className="mb16">
                  {this.state.apptTypeList.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          this.handleActiveBut(
                            item.id,
                            item.name,
                            'apptTypeId',
                            'type'
                          )
                        }
                        className={`border-2 text-xs font-medium p-2  rounded-full mr-4 ${
                          this.state.params.apptTypeId === item.id
                            ? 'bg-red-600 text-white border-red-600'
                            : 'border-gray-400'
                        }`}
                        style={{
                          width: '8.375rem'
                        }}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {this.state.params.apptTypeId ? (
              <div>
                <div className="size16 js-center">
                  <img
                    src={two}
                    alt=""
                    className="mr10"
                    style={{ width: '1.25rem' }}
                  />
                  <div>Choisissez un expert</div>
                </div>
                <ul className="cat-ul mb16">
                  {this.state.list.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() =>
                          this.handleActiveBut(
                            item.id,
                            item.name,
                            'expertTypeId',
                            'expertise'
                          )
                        }
                        className="ul-li"
                        style={{
                          boxShadow:
                            this.state.params.expertTypeId === item.id
                              ? ' 0px 0px 0px 2px #E2001A'
                              : '',
                          cursor: 'pointer'
                        }}
                      >
                        <img src={item.src} alt="" />
                        <div style={{ padding: '0.625rem' }}>
                          <div className="font-500 size14">{item.name}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            <div className="txt-centr">
              <button
                onClick={this.handleReturnOne}
                className="rc-btn rc-btn--two"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Retour à l'étape précédente
              </button>
              <button
                disabled={
                  this.state.params.apptTypeId == null ||
                  this.state.params.expertTypeId === null
                }
                onClick={this.handleGotoThree}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Continuer
              </button>
            </div>
          </div>
        ) : null}
        {/* 选择综合 */}
        {this.state.threeShow || this.state.fourShow || this.state.fiveShow ? (
          <div className="Choisissez votre-selection">
            <div className="mb16 colred size16">Votre sélection</div>
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
              <div>{this.state.votre.prix + ' EUR' || 'FREE'}</div>
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
              <div className="size16 mb16 js-center">
                <img
                  src={three}
                  alt=""
                  className="mr10"
                  style={{ width: '1.25rem' }}
                />
                <div>Choisissez la durée du rendez-vous</div>
              </div>
              <div>
                Vous pourrez passer plus de temps avec nos experts si besoin en
                fonction de leurs disponibilités.
              </div>
            </div>
            <ul className="cat-ul mb16">
              {this.state.timeList.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() =>
                      this.handleActiveBut(
                        item.duration,
                        item.duration,
                        'minutes',
                        'duree',
                        item.goodsInfoVO.marketPrice,
                        'prix'
                      )
                    }
                    className="ul-li pd10"
                    style={{
                      boxShadow:
                        this.state.params.minutes === item.duration
                          ? ' 0px 0px 0px 2px #E2001A'
                          : '0px 0px 0px 2px #f0f0f0'
                    }}
                  >
                    <div>{item.duration} min</div>
                    <div className="list-content size12">{item.text}</div>
                    <div className="js-between">
                      <div>Prix</div>
                      <div>
                        {item.goodsInfoVO?.marketPrice + ' EUR' || 'FREE'}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="txt-centr">
              <button
                onClick={this.handleReturnTwo}
                className="rc-btn rc-btn--two"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Retour à l'étape précédente
              </button>
              <button
                disabled={this.state.params.minutes == null}
                onClick={this.handleGotoFour}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
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
            <div className="size16 js-center mb16">
              <img
                src={four}
                alt=""
                className="mr10"
                style={{ width: '1.25rem' }}
              />
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
                className="rc-btn rc-btn--two"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Retour à l'étape précédente
              </button>
              <button
                disabled={this.state.votre.heure === ''}
                onClick={this.handleGoto}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
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
              <img
                src={five}
                alt=""
                className="mr10"
                style={{ width: '1.25rem' }}
              />
              <div>Créez votre compte afin de confirmer votre sélection</div>
            </div>
            <div className="txt-centr">
              <LoginButton
                beforeLoginCallback={() => {
                  localItemRoyal.set('okta-redirectUrl', '/checkout');
                }}
                btnClass={`rc-btn rc-btn--one  rc-margin-bottom--xs`}
                intl={intl}
                btnStyle={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
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
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Créer un compte
              </button>
              <br />
              <button
                onClick={this.handleLogin}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
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
              textAlign: 'right'
            }}
          >
            <span
              onClick={this.handleCancelUpdate}
              className="rc-icon rc-close rc-iconography"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </UpdatModal>
        {/* 预约时间 Contact us */}
        <div className="txt-centr" style={{ marginBottom: '3rem' }}>
          <MyModal />
        </div>
      </div>
    );
  }
}

export default Pcexperts;
