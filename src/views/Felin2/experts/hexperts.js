import React from 'react';
import MyModal from '../modules/modal';
import UpdatModal from '../updatModules/modal';
import { PRESONAL_INFO_RULE } from '@/utils/constant';
import 'react-datepicker/dist/react-datepicker.css';
import './hindex.less';
import 'react-calendar/dist/Calendar.css';
import { inject, observer } from 'mobx-react';
import cat1 from '../image/cat1.png';
import cat2 from '../image/cat2.png';
import cat3 from '../image/cat3.png';
import WeekCalender from '../week1/week-calender';
import { GARecommendationProduct } from '@/utils/GA';
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
import { getDeviceType, getAppointmentInfo } from '@/utils/utils';
import { getLoginDetails, getDetails } from '@/api/details';
import { injectIntl } from 'react-intl-phraseapp';
import { postcustomerUpdate } from '../../../api/felin';
import { scrollIntoView } from '@/lib/scroll-to-utils';
import { funcUrl } from '@/lib/url-utils';
import Modal from '@/components/Modal';

const localItemRoyal = window.__.localItemRoyal;
PRESONAL_INFO_RULE.filter((el) => el.key === 'phoneNumber')[0].regExp = '';
const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class Hcexperts extends React.Component {
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
          name: 'Expert en comportement',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        },
        {
          valueEn: 'Nutritionist',
          src: cat2,
          name: 'Expert en nutrition',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare erat sit amet turpis vulputate, a consectetur mi dapibus.'
        }
      ],
      timeList: [
        {
          duration: 15,
          text: 'Séance découverte avec l’expert sélectionné.'
        },
        {
          duration: 30,
          text: 'Échangez avec un expert pour recevoir quelques conseils clefs selon les besoins de votre chat.'
        },
        {
          duration: 45,
          text: "Creusez les problématiques identifiées avec l'expert et recevez des conseils pour améliorer le bien être de votre chat."
        },
        {
          duration: 60,
          text: 'Nous approfondirons chaque aspect de la vie de votre chat pour vous proposer des solutions adaptées à vos possibilités.'
        }
      ],
      timeList2: [
        {
          duration: 15,
          text: 'Séance découverte.'
        },
        {
          duration: 30,
          text: 'Des conseils clefs selon les besoins de votre chat.'
        },
        {
          duration: 45,
          text: 'Recevez des conseils plus détaillés pour le bien-être de votre chat.'
        },
        {
          duration: 60,
          text: 'Nous approfondirons différents aspects de la vie de votre chat pour vous proposer des solutions adaptées à vos possibilités.'
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
        apptTypeId: '', // 线上线下
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
        employeeIds: [],
        employeeNames: []
      },
      userInfo: undefined,
      apptNo: '',
      appointmentVO: {},
      errModalText: '',
      errModalVisible: false
    };
  }

  componentDidMount() {
    let id = funcUrl({ name: 'id' });
    let userInfo = this.props.loginStore.userInfo;
    if (
      id &&
      (getDeviceType() === 'H5' ||
        (getDeviceType() === 'Pad' && document.body.clientWidth <= 768))
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
  getDeatalData = async (id) => {
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
      console.log(prix);
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
    window?.dataLayer?.push({
      event: 'AtelierFelinStepLoad',
      atelierFelinStepName: 'Apointment type',
      atelierFelinStepNumber: '1'
    });
    this.setState({
      apptTypeList: apptTypeList.goodsDictionaryVOS,
      list: expertTypeList.reverse(),
      isShow: false,
      oneShow: true
    });
  };

  // 第一步返回上一步
  handleReturn = () => {
    this.setState({
      isShow: true,
      oneShow: false
    });
  };
  // 第二步返回上一步
  handleReturnOne = () => {
    this.setState({
      oneShow: true,
      twoShow: false
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
      let timeList2 = this.state.timeList2.map((item) => {
        let _temp = context.priceVOs.find(
          (items) => items.duration === item.duration
        );
        return { ...item, ..._temp };
      });
      window?.dataLayer?.push({
        event: 'AtelierFelinStepLoad',
        atelierFelinStepName: 'Apointment duration',
        atelierFelinStepNumber: '2'
      });
      this.setState({
        timeList,
        timeList2,
        twoShow: false,
        threeShow: true
      });
    }
  };

  // 返回第二步
  handleReturnTwo = () => {
    this.setState({
      twoShow: true,
      threeShow: false
    });
  };
  // 跳转第四步
  handleGotoFour = () => {
    window?.dataLayer?.push({
      event: 'AtelierFelinStepLoad',
      atelierFelinStepName: 'Timeslot selection',
      atelierFelinStepNumber: '3'
    });
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
      consumerEmail: this.state.userInfo?.communicationEmail || undefined,
      consumerPhone: this.state.userInfo?.communicationPhone || undefined,
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
        await this.queryAppointInfo(apptNo);
        this.props.history.push('/checkout');
      } else {
        window?.dataLayer?.push({
          event: 'AtelierFelinStepLoad',
          atelierFelinStepName: 'Login invite',
          atelierFelinStepNumber: '4'
        });
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
    // 根据name是否为Appel vidéo
    let { list } = this.state;
    let editList;
    if (key1 === 'type') {
      if (name == 'Appel vidéo') {
        editList = list.map((item) => {
          if (item.id == '11') {
            item.name = 'Conseiller en nutrition Royal Canin';
          }
          return item;
        });
      } else {
        editList = list.map((item) => {
          if (item.id == '11') {
            item.name = 'Expert en nutrition';
          }
          return item;
        });
      }
    }
    this.setState(
      {
        params: {
          ...this.state.params,
          [key]: id
        },
        votre: {
          ...this.state.votre,
          [key1]: name,
          [key2]: value
        }
      },
      () => {
        if (key1 === 'expertise') {
          this.handleGotoThree();
        } else if (key1 === 'duree') {
          this.setState(
            {
              bookSlotVO: {
                ...this.state.bookSlotVO,
                dateNo: ''
              },
              votre: {
                ...this.state.votre,
                date: '',
                heure: ''
              }
            },
            () => {
              this.handleGotoFour();
            }
          );
        }
      }
    );
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
              _resources.map((item) => {
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
          reslove(_resources);
        }
      });
      console.log(resources, 'console.log(_resources);');
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
      await this.queryAppointInfo(this.state.appointmentVO.apptNo);
      sessionItemRoyal.set(
        'guestInfo',
        JSON.stringify({
          firstName: params.firstName,
          lastName: params.lastName,
          phone: params.phone,
          email: params.email
        })
      );
      this.props.history.push('/checkout');
    }
  };
  queryAppointInfo = async (appointNo) => {
    //不做ga
    return;
  };

  postUpdate = async (params) => {
    try {
      let id = funcUrl({ name: 'id' });
      const { code, context } = await postUpdate(params);
      if (code === 'K-000000') {
        await this.queryAppointInfo(context.appointmentVO.apptNo);
        sessionItemRoyal.set('appointment-no', context.appointmentVO.apptNo);
        sessionItemRoyal.set('oldAppointNo', id);
        sessionItemRoyal.set('isChangeAppoint', true);
        this.props.history.push('/checkout');
      }
    } catch (err) {
      this.setState({ errModalVisible: true, errModalText: err.message });
    }
  };
  getTimeListJsx = (arrList) => {
    return (
      <>
        {arrList.map((item, index) => {
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
                <div>{item.goodsInfoVO?.marketPrice + ' EUR' || 'FREE'}</div>
              </div>
            </li>
          );
        })}
      </>
    );
  };
  render() {
    const { intl, history } = this.props;
    const { twoShow, threeShow, fourShow, fiveShow } = this.state;

    return (
      <div id="hexperts" className="h-block hexperts">
        {/* 默认页面 */}
        {this.state.isShow ? (
          <div className="txt-centr">
            <button
              onClick={this.handleOneShow}
              className="rc-btn rc-btn--one  rc-margin-bottom--xs"
              style={{
                width: '16.875rem'
              }}
            >
              Commencer
            </button>
          </div>
        ) : (
          <ul className="number-ul">
            <li className="opacity1">1</li>
            <div
              className={`line ${
                twoShow || threeShow || fourShow || fiveShow ? 'opacity1' : ''
              }`}
            />
            <li
              className={`${
                twoShow || threeShow || fourShow || fiveShow ? 'opacity1' : ''
              }`}
            >
              2
            </li>
            <div
              className={`line ${
                threeShow || fourShow || fiveShow ? 'opacity1' : ''
              }`}
            />
            <li
              className={`${
                threeShow || fourShow || fiveShow ? 'opacity1' : ''
              }`}
            >
              3
            </li>
            <div className={`line ${fourShow || fiveShow ? 'opacity1' : ''}`} />
            <li className={`${fourShow || fiveShow ? 'opacity1' : ''}`}>4</li>
            <div className={`line ${fiveShow ? 'opacity1' : ''}`} />
            <li className={`${fiveShow ? 'opacity1' : ''}`}>5</li>
          </ul>
        )}
        {/* 第一步 */}
        {this.state.oneShow ? (
          <div>
            <div className="js-center mb16">
              <div>Choisissez un type de rendez-vous</div>
            </div>
            <div className="onebox">
              {this.state.apptTypeList.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      this.handleActiveBut(
                        item.id,
                        item.name,
                        'apptTypeId',
                        'type'
                      );
                      this.setState({
                        twoShow: true,
                        oneShow: false
                      });
                    }}
                    className={`border text-xs font-medium p-2 rounded-full ${
                      this.state.params.apptTypeId === item.id
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-400'
                    }`}
                    style={{
                      width: '9.375rem'
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div className="js-center mt20">
              <span
                onClick={this.handleReturn}
                className="but-dec"
                style={{
                  width: '9.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Retour à l'étape précédente
              </span>
            </div>
          </div>
        ) : null}
        {/* 第二步选择专家 */}
        {this.state.twoShow ? (
          <div>
            <div className="js-center mb16">
              <div>Choisissez un expert</div>
            </div>
            {this.state.list.map((item, index) => {
              return (
                <div className="js-center mb16" key={index}>
                  <button
                    onClick={() => {
                      this.handleActiveBut(
                        item.id,
                        item.name,
                        'expertTypeId',
                        'expertise'
                      );
                    }}
                    className={`border text-xs font-medium p-2 rounded-full ${
                      this.state.params.expertTypeId === item.id
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-400'
                    }`}
                    style={{
                      width: '9.75rem'
                    }}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
            <div className="js-center mt20">
              <span
                onClick={this.handleReturnOne}
                className="but-dec"
                style={{
                  width: '9.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Retour à l'étape précédente
              </span>
            </div>
          </div>
        ) : null}
        {/* 第三步 */}
        {this.state.threeShow ? (
          <div className="pdlr30">
            <div>
              <div className="size18 mb16 js-center">
                <div>Choisissez la durée du rendez-vous</div>
              </div>
              <div className="size16 txt-centr mb16">
                Vous pourrez passer plus de temps avec nos experts si besoin en
                fonction de leurs disponibilités.
              </div>
            </div>
            <ul className="h-ul">
              {this.state.votre.type === 'Appel vidéo'
                ? this.getTimeListJsx(this.state.timeList2)
                : this.getTimeListJsx(this.state.timeList)}
              {/* {this.state.timeList.map((item, index) => {
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
                    style={{
                      boxShadow:
                        this.state.params.minutes == item.duration
                          ? ' 0px 0px 0px 2px #E2001A'
                          : '0px 0px 0px 2px #f0f0f0'
                    }}
                  >
                    <div className="size18">{item.duration} min</div>
                    <div className="list-content size12">{item.text}</div>
                    <div className="js-between">
                      <div className="size12">Prix</div>
                      <div className="size12">
                        {item.goodsInfoVO?.marketPrice + ' EUR' || 'FREE'}
                      </div>
                    </div>
                  </li>
                );
              })} */}
            </ul>
            <div className="txt-centr">
              <span
                onClick={this.handleReturnTwo}
                className="but-dec"
                style={{
                  width: '9.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Retour à l'étape précédente
              </span>
            </div>
          </div>
        ) : null}
        {/* 第四步选时间段 */}
        {this.state.fourShow ? (
          <div>
            <div className="size24 js-center mb28">
              <div>Choisissez un créneau</div>
            </div>
            <div
              style={{ width: '100%', margin: 'auto', marginBottom: '40px' }}
            >
              <WeekCalender
                onChange={this.onChange}
                key={this.state.key}
                data={this.state.resources}
              />
            </div>
            <div className="txt-centr">
              <button
                disabled={this.state.votre.heure === ''}
                onClick={this.handleGoto}
                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                style={{
                  width: '8.875rem'
                }}
              >
                Confirmer
              </button>
              <br />
              <span
                onClick={this.handleReturnThree}
                className="but-dec"
                style={{
                  width: '9.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Retour à l'étape précédente
              </span>
            </div>
          </div>
        ) : null}
        {/* 第五步 */}
        {this.state.fiveShow && !this.state.userInfo ? (
          <div>
            <div className="size18 txt-centr mb28">
              <div>Créez votre compte afin de confirmer votre sélection</div>
            </div>
            <div className="size16 txt-centr mb16">
              <div>Vous avez déjà un compte ? Identifiez-vous</div>
            </div>
            <div className="txt-centr">
              <LoginButton
                beforeLoginCallback={() => {
                  localItemRoyal.set('okta-redirectUrl', '/checkout');
                }}
                btnClass={`rc-btn rc-btn--one  rc-margin-bottom--xs`}
                intl={intl}
                btnStyle={{
                  width: '16.875rem'
                }}
              >
                Connexion
              </LoginButton>
              <br />
              <button
                onClick={() => {
                  if (+window.__.env.REACT_APP_CUSTOM_REGISTER) {
                    localItemRoyal.set(
                      'okta-redirectUrl',
                      history.location.pathname + history.location.search
                    );
                    history.push('/register');
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
              <span
                onClick={this.handleLogin}
                className="but-dec"
                style={{
                  width: '13.875rem',
                  fontSize: '0.75rem'
                }}
              >
                Continuer en tant qu'invité
              </span>
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
        {/* 选择综合 */}
        {this.state.twoShow ||
        this.state.threeShow ||
        this.state.fourShow ||
        this.state.fiveShow ? (
          <div className="Choisissez votre-selection">
            <div className="mb16 colred size18">Votre sélection</div>
            {this.state.votre.type ? (
              <div className="js-between mb16">
                <div>Type</div>
                <div>{this.state.votre.type}</div>
              </div>
            ) : null}
            {this.state.votre.expertise ? (
              <div className="js-between mb16">
                <div>Expertise</div>
                <div>{this.state.votre.expertise}</div>
              </div>
            ) : null}
            {this.state.votre.duree ? (
              <div className="js-between mb16">
                <div>Durée</div>
                <div>{this.state.votre.duree} min</div>
              </div>
            ) : null}
            <div className="js-between mb16">
              <div>Prix</div>
              <div>{this.state.votre.prix + ' EUR' || 'FREE'}</div>
            </div>
            {this.state.votre.date ? (
              <div className="js-between mb16">
                <div>Date</div>
                <div>{this.state.votre.date}</div>
              </div>
            ) : null}
            {this.state.votre.heure ? (
              <div className="js-between">
                <div>Heure</div>
                <div>{this.state.votre.heure}</div>
              </div>
            ) : null}
          </div>
        ) : null}
        {/*预约时间 Contact us*/}
        <div className="txt-centr" style={{ marginBottom: '3.75rem' }}>
          <MyModal />
        </div>
        <Modal
          key="3"
          visible={this.state.errModalVisible}
          modalText={this.state.errModalText}
          close={() => {
            this.setState({ errModalVisible: false });
          }}
          hanldeClickConfirm={() => {
            this.setState({ errModalVisible: false });
          }}
        />
      </div>
    );
  }
}

export default Hcexperts;
