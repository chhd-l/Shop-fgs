import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import {
  getAddressList,
  saveAddress,
  getAddressBykeyWord,
  getDeliveryDateAndTimeSlot,
  editAddress
} from '@/api/address';
import {
  pickupQueryCity,
  pickupQueryCityFee,
  dimensionsByPackage
} from '@/api/payment';
import { shippingCalculation } from '@/api/cart';
// import SearchSelection from '@/components/SearchSelection';
import {
  getDictionary,
  validData,
  matchNamefromDict,
  formatMoney,
  getDeviceType,
  isCanVerifyBlacklistPostCode,
  formatDate,
  formatJPDate,
  formatJPTime
} from '@/utils/utils';
import { searchNextConfirmPanel, isPrevReady } from '../modules/utils';
// import { ADDRESS_RULE } from '@/utils/constant';
import { AddressForm } from '@/components/Address';
import HomeDeliveryOrPickUp from '@/components/HomeDeliveryOrPickUp';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import AddressPreview from './Preview';
import './list.less';
import { felinAddr } from '../PaymentMethod/paymentMethodsConstant';
import cn from 'classnames';
import AddressPanelContainer from './AddressPanelContainer';
import moment from 'moment';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isFromFelin = sessionItemRoyal.get('appointment-no');
const COUNTRY = window.__.env.REACT_APP_COUNTRY;

/**
 * address list(delivery/billing) - member
 */
@inject('checkoutStore', 'configStore', 'paymentStore', 'addressStore')
// @injectIntl * 不能引入，引入后Payment中无法使用该组件 ref
@observer
class AddressList extends React.Component {
  static defaultProps = {
    visible: true,
    type: 'delivery',
    intlMessages: null,
    showDeliveryDateTimeSlot: false,
    showOperateBtn: true,
    deliveryOrPickUp: 0,
    saveAddressNumber: 0, // 保存Delivery地址次数
    updateSaveAddressNumber: () => {},
    titleVisible: true,
    isValidationModal: true, // 是否显示验证弹框
    isAddOrEdit: () => {},
    updateValidationStaus: () => {},
    updateFormValidStatus: () => {},
    calculateFreight: () => {},
    updateData: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      typeForGA: 'Add',
      isHomeDeliveryOpen: this.props.configStore?.isHomeDeliveryOpen,
      isPickupOpen: this.props.configStore?.isPickupOpen,
      defaultCity: '', // 默认地址中的城市
      confirmBtnDisabled: false,
      deliveryOrPickUpFlag: false,
      addOrEditPickup: false,
      showDeliveryOrPickUp: 0, // 控制没有地址时的展示，0：都没有，1：home delivery，2：pickup
      choiseHomeDeliveryOrPickUp: 1, // 控制有地址时的展示，0：都没有，1：home delivery，2：pickup
      pickupFormData: [], // pickup 表单数据
      pickupEditNumber: 0, // pickup 编辑次数，用来判断当前是否编辑过
      homeAndPickup: [],
      shippingMethodType: 'homeDelivery', // 配送方式，要考虑新用户和会员有没有地址的不同
      pickupData: [], // 组件传过来的数据
      pickupAddress: [], // 查询到的地址列表里的pickup数据
      pickupCalculation: null,
      allAddressList: [],
      deliveryAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
        country: '',
        cityId: '',
        city: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        postCode: '',
        phoneNumber: '',
        comment: '',
        entrance: '',
        apartment: '',
        street: '',
        house: '',
        housing: '',
        isDefalt: false,
        minDeliveryTime: 0,
        maxDeliveryTime: 0,
        deliveryDate: null,
        timeSlot: null,
        receiveType: null, // HOME_DELIVERY , PICK_UP
        pickupCode: null, // 地图选择后得到的编码
        pickupName: null, // 快递公司
        paymentMethods: null, // 支付方式
        pickupDescription: null,
        pickupPrice: null,
        DuData: null, // 俄罗斯DuData
        email: ''
      },
      cityList: [],
      errMsg: '',
      loading: true,
      saveLoading: false,
      btnConfirmLoading: false,
      addOrEdit: false,
      addressList: [],
      countryList: [],
      foledMore: true,
      successTipVisible: false,
      saveErrorMsg: '',
      selectedId: '',
      homeDeliverySelectedId: '',
      isValid: false,
      formAddressValid: false,
      listBtnLoading: false,
      validationLoading: false, // 地址校验loading
      listValidationModalVisible: false, // 地址校验查询开关
      selectListValidationOption: 'suggestedAddress',
      wrongAddressMsg: null,
      validationAddress: null, // 建议地址
      jpCutOffTime: '',
      bugData: {}
    };
    this.addOrEditAddress = this.addOrEditAddress.bind(this);
    this.addOrEditPickupAddress = this.addOrEditPickupAddress.bind(this);
    this.handleCancelAddOrEditPickup =
      this.handleCancelAddOrEditPickup.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.timer = null;
    this.confirmListValidationAddress =
      this.confirmListValidationAddress.bind(this);
    this.editFormRef = React.createRef();
  }
  async componentDidMount() {
    const { deliveryAddress } = this.state;

    getDictionary({ type: 'country' }).then((res) => {
      let cfm = deliveryAddress;
      cfm.country = res[0].value;
      cfm.countryId = res[0].id;
      this.setState({
        countryList: res,
        deliveryAddress: Object.assign(this.state.deliveryAddress, cfm)
      });
    });

    if (isFromFelin) {
      //from felin下单情况下，地址信息不可编辑
      this.setState({
        addressList: felinAddr,
        selectedId: felinAddr[0].deliveryAddressId,
        loading: false
      });
    } else {
      this.setState(
        {
          listBtnLoading: false,
          wrongAddressMsg: JSON.parse(localItemRoyal.get('rc-wrongAddressMsg'))
        },
        async () => {
          await this.queryAddressList({ init: true });
        }
      );
    }
  }
  get isDeliverAddress() {
    return this.props.type === 'delivery';
  }
  get panelStatus() {
    const tmpKey = this.isDeliverAddress
      ? 'deliveryAddrPanelStatus'
      : 'billingAddrPanelStatus';
    return this.props.paymentStore[tmpKey];
  }
  get curPanelKey() {
    return this.isDeliverAddress ? 'deliveryAddr' : 'billingAddr';
  }
  // 对应的国际化字符串
  getIntlMsg = (str) => {
    return this.props.intlMessages[str];
  };
  // 查询地址列表
  async queryAddressList({ init = false } = {}) {
    this.setState({ loading: true });
    const { saveAddressNumber } = this.props;
    const { selectedId } = this.state;
    try {
      this.setState({ loading: true });
      let res = await getAddressList();
      let allAddress = res.context;
      // if (!allAddress.length) {
      //   this.updateConfirmBtnDisabled(true);
      // }
      let addressList = res.context.filter((ele) => {
        return (
          ele.type === this.props.type.toUpperCase() &&
          ele.receiveType != 'PICK_UP'
        );
      });
      // 默认地址
      const defaultAddressItem = find(addressList, (ele) => {
        return ele.isDefaltAddress === 1 && !!ele.validFlag;
      });

      // 有默认地址选中默认地址，没有默认地址选中第一个地址
      // 邮编属于黑名单不能选中
      let tmpId =
        selectedId ||
        (defaultAddressItem && defaultAddressItem.deliveryAddressId) ||
        (addressList.length &&
          addressList.find((item) => item.validFlag === 1)
            ?.deliveryAddressId) ||
        '';

      Array.from(
        addressList,
        (ele) => (ele.selected = ele.deliveryAddressId === tmpId)
      );

      // 有数据并且 type=billing，判断是否有billingAddress
      if (this.props.type == 'billing') {
        let isbill = 0,
          isadde = true;
        if (addressList.length > 0) {
          for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].type == 'BILLING') {
              isbill++;
            }
          }
          isbill > 0 ? (isadde = false) : (isadde = true);
        } else {
          isadde = true;
        }
        // props.isAddOrEdit() -> payment中用来判断是否添加或者编辑地址
        this.props.isAddOrEdit(isadde);
      }

      const tmpObj =
        find(allAddress, (ele) => ele.deliveryAddressId === tmpId) || null;

      // 查询银行卡列表
      // this.isDeliverAddress && this.props.paymentStore.setDefaultCardDataFromAddr(tmpObj);
      this.props.updateData(tmpObj);
      let editaddObj = [];
      addressList.forEach(async (v, i) => {
        v.stateNo = v.state?.stateNo || '';
        // state对象暂时用不到
        delete v.state;
        if (window.__.env.REACT_APP_COUNTRY == 'ru' && saveAddressNumber == 0) {
          // 根据 address 取到 DuData返回的provinceId
          let dudata = await getAddressBykeyWord({ keyword: v.address1 });
          if (dudata?.context && dudata?.context?.addressList.length > 0) {
            let addls = dudata.context.addressList[0];
            // 再根据 provinceId 获取到 cutOffTime
            let vdres = await getDeliveryDateAndTimeSlot({
              cityNo: addls?.provinceId
            });
            console.log('vdres', vdres);
            if (vdres.context && vdres.context?.timeSlots?.length) {
              let tobj = vdres.context.timeSlots[0];
              v.deliveryDate = tobj.date;
              v.timeSlot =
                tobj.dateTimeInfos[0].startTime +
                '-' +
                tobj.dateTimeInfos[0].endTime;
            } else {
              v.deliveryDate = '';
              v.timeSlot = '';
            }
            console.log('666 >>> ★ 修改地址： ', v);
            // 修改地址
            editaddObj = await editAddress(v);
            // if (addressList.length == i + 1) {
            //   this.setState({
            //     loading: false
            //   });
            // }
          }
        }
      });
      // console.log('666 >>> 获取地址列表 selectedId： ',tmpId);
      this.setState(
        {
          // loading: false,
          addressList: addressList,
          allAddressList: allAddress,
          addOrEdit: !addressList.length,
          selectedId: tmpId,
          homeDeliverySelectedId: tmpId
        },
        async () => {
          if (window.__.env.REACT_APP_COUNTRY === 'ru') {
            // let addData = defaultAddressItem;
            // 地址列表有数据时(包含pickup)，判断是否有默认地址
            if (res.context) {
              // defaultAddressItem ? (addData = defaultAddressItem) : (addData = addressList[0]);

              let pickupAddress = allAddress.filter(
                (e) => e.receiveType == 'PICK_UP'
              );

              // 没有pickup的时候清除缓存的城市信息
              if (!pickupAddress?.length) {
                let hpobj =
                  sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
                if (hpobj) {
                  hpobj = JSON.parse(hpobj);
                  if (hpobj?.cityData) {
                    hpobj['cityData'] = null;
                    sessionItemRoyal.set(
                      'rc-homeDeliveryAndPickup',
                      JSON.stringify(hpobj)
                    );
                  }
                }
                this.setState({
                  defaultCity: ''
                });
              }

              this.setState(
                {
                  showDeliveryOrPickUp: 1,
                  pickupAddress
                },
                async () => {
                  if (allAddress.length) {
                    // 设置默认城市
                    if (pickupAddress.length) {
                      this.setState({
                        defaultCity: pickupAddress[0].city
                      });
                    }

                    await this.getHomeDeliveryAndPickupInfo();
                  }
                }
              );
            }

            // 俄罗斯 没有地址的用户需要显示选择 homeDelivery、pickup
            this.setState({
              addOrEdit: false
            });
            // 如果没有地址
            if (!allAddress.length) {
              this.setState({
                deliveryOrPickUpFlag: true,
                choiseHomeDeliveryOrPickUp: 0
              });
            }
          } else {
            this.setState({
              showDeliveryOrPickUp: 1 // home delivery
            });
            // 按钮状态可用
            this.updateConfirmBtnDisabled(false);
            if (isCanVerifyBlacklistPostCode && !tmpId) {
              this.updateConfirmBtnDisabled(true);
            }
          }

          // 更新delivery address保存次数
          let snum = Number(saveAddressNumber);
          await this.props.updateSaveAddressNumber(snum + 1);

          this.setState({
            loading: false
          });
        }
      );
    } catch (err) {
      this.setState({
        errMsg: err.message,
        loading: false
      });
    }
  }
  // 判断 delivery date和time slot是否过期
  deliveryDateStaleDateOrNot = async (data) => {
    let flag = true;
    // 提示重新选择
    let errMsg = this.getIntlMsg('payment.reselectTimeSlot');

    let deliveryDate = data?.deliveryDate; // deliveryDate 日期
    let timeSlot = data?.timeSlot;

    // 20210616
    let dldate = '';

    let deliveryDateFlag = false;
    let timeSlotFlag = false;
    let cutOffTime = '';
    // 根据 address 取到 DuData返回的provinceId
    let dudata = await getAddressBykeyWord({ keyword: data.address1 });
    let vdres = [];
    if (dudata?.context && dudata?.context?.addressList.length > 0) {
      let addls = dudata.context.addressList[0];
      // 再根据 provinceId 获取到 cutOffTime
      vdres = await getDeliveryDateAndTimeSlot({ cityNo: addls?.provinceId });
      console.log('list', vdres);
      if (vdres.context && vdres.context?.timeSlots?.length) {
        if (!deliveryDate || !timeSlot) {
          this.showErrMsg(errMsg);
          return false;
        }
        // deliveryDate: 2021-06-11
        let nyrArr = deliveryDate?.split('-');
        // 20210616
        dldate = Number(nyrArr[0] + '' + nyrArr[1] + '' + nyrArr[2]);

        let tobj = vdres.context.timeSlots;
        cutOffTime = vdres.context?.cutOffTime;
        // console.log('666  ----->  tobj: ', tobj);
        tobj.forEach((v, i) => {
          if (v.date == deliveryDate) {
            deliveryDateFlag = true;
            (v?.dateTimeInfos).forEach((o, j) => {
              let sltime = o.startTime + '-' + o.endTime;
              if (sltime == timeSlot) {
                // console.log('666  ----->  timeSlot: ', timeSlot);
                timeSlotFlag = true;
              }
            });
          }
        });
      } else {
        return 'no timeslot';
      }
    }
    // 如果时间不存在
    if (!deliveryDateFlag || !timeSlotFlag) {
      this.showErrMsg(errMsg);
      return false;
    }

    let localTime = vdres.defaultLocalDateTime.split(' ');
    let lnyr = localTime[0].split('-');
    let today = lnyr[0] + '' + lnyr[1] + '' + lnyr[2];
    let lsfm = localTime[1].split(':');
    let todayHour = lsfm[0];
    let todayMinutes = lsfm[1];

    // 当天16点前下单，明天配送；过了16点，后天配送。
    // 判断当前时间段，如果是当天过了16点提示重新选择。

    // 已过期（俄罗斯时间）
    // 当天或者当天之前的时间算已过期时间
    if (today >= dldate) {
      this.showErrMsg(errMsg);
      flag = false;
    } else {
      // 其他时间
      // 明天配送的情况（当前下单时间没有超过 16 点）
      // 如果选择的时间是明天，判断当前时间是否超过16点，超过16点提示重选
      let nowTime = Number(todayHour + '' + todayMinutes);
      let ctt = cutOffTime.split(':');
      cutOffTime
        ? (cutOffTime = Number(ctt[0] + '' + ctt[1]))
        : (cutOffTime = 1600);
      if (dldate == today + 1 && nowTime > cutOffTime) {
        this.showErrMsg(errMsg);
        flag = false;
      }
      // 后天配送的情况（当前下单时间超过 16 点）
    }
    return flag;
  };
  // 会员确认地址列表信息，并展示封面
  clickConfirmAddressPanel = async () => {
    const {
      configStore: { localAddressForm: laddf }
    } = this.props;
    const {
      homeDeliverySelectedId,
      allAddressList,
      addressList,
      wrongAddressMsg
    } = this.state;
    const tmpObj =
      find(
        addressList,
        (ele) => ele.deliveryAddressId === homeDeliverySelectedId
      ) || null;
    this.setState({
      selectedId: homeDeliverySelectedId
    });
    // 判断地址完整性
    let dfarr = laddf.settings;
    dfarr = (dfarr || []).filter(
      (item) => item.enableFlag == 1 && item.requiredFlag == 1
    );
    let errMsgArr = [];
    dfarr.forEach((v, i) => {
      let akey = v.fieldKey;
      // state 对应数据库字段 province
      v.fieldKey === 'state' && (akey = 'province');
      // region 对应数据库字段 area
      v.fieldKey === 'region' && (akey = 'area');
      // phoneNumber 对应数据库字段 consigneeNumber
      v.fieldKey === 'phoneNumber' && (akey = 'consigneeNumber');

      let fky = wrongAddressMsg[akey];
      // 判断city和cityId 是否均为空
      if (v.fieldKey === 'city') {
        if (tmpObj.city || tmpObj.cityId) {
          akey = '';
        }
      }
      // 判断country和countryId 是否均为空
      if (v.fieldKey === 'country') {
        if (tmpObj.country || tmpObj.countryId) {
          akey = '';
        }
      }

      if (akey && !tmpObj[akey]) {
        errMsgArr.push(fky);
      }
    });
    errMsgArr = errMsgArr.join(', ');
    // 如果地址字段有缺失，提示错误信息
    if (errMsgArr.length) {
      this.showErrMsg(wrongAddressMsg['title'] + errMsgArr);
      return;
    }

    this.updateSelectedData('confirm');

    if (window.__.env.REACT_APP_COUNTRY != 'ru') {
      this.confirmToNextPanel();
    }
  };
  // 处理地址信息，拼装errMsg
  getDuDataAddressErrMsg = (data) => {
    const { wrongAddressMsg } = this.state;
    let errArr = [];
    let streets = wrongAddressMsg['streets'],
      postCode = wrongAddressMsg['postCode'],
      house = wrongAddressMsg['house'],
      city = wrongAddressMsg['city'],
      province = wrongAddressMsg['province'],
      settlement = wrongAddressMsg['settlement'];

    !data.street && errArr.push(streets);
    !data.postCode && errArr.push(postCode);
    !data.house && errArr.push(house);
    !data.city && errArr.push(city);
    !data.province && errArr.push(province);
    !data.settlement && errArr.push(settlement);

    return errArr.join(',');
  };
  // 根据address1查询地址信息，再根据查到的信息计算运费
  getAddressListByKeyWord = async (obj) => {
    const { addressList } = this.state;
    // console.log('666 ★★ -------------- 根据address1查询地址信息 obj: ', obj);
    try {
      let address1 = obj.address1;
      let res = await getAddressBykeyWord({ keyword: address1 });
      if (res?.context && res?.context?.addressList.length > 0) {
        // 根据地址获取到的地址列表匹配当前选中的地址
        let addls = res.context.addressList;
        let dladdress = Object.assign({}, obj);

        dladdress.DuData = addls[0];
        if (dladdress.DuData) {
          // Москва 和 Московская 不请求查询运费接口，delivery fee=400, MinDeliveryTime:1,MaxDeliveryTime:2
          if (
            dladdress.DuData.province == 'Москва' ||
            dladdress.DuData.province == 'Московская'
          ) {
            let calculation = {
              deliveryPrice: 400,
              price: 400,
              maxDeliveryTime: 2,
              minDeliveryTime: 1
            };
            dladdress.calculation = calculation;
            dladdress.minDeliveryTime = calculation.minDeliveryTime;
            dladdress.maxDeliveryTime = calculation.maxDeliveryTime;
            addressList.forEach((item, i) => {
              if (item.deliveryAddressId == dladdress.deliveryAddressId) {
                addressList[i] = dladdress;
              }
            });
            this.setState(
              {
                addressList,
                deliveryAddress: dladdress
              },
              () => {
                this.props.updateData(this.state.deliveryAddress);
                // purchases接口计算运费
                this.calculateFreight(this.state.deliveryAddress);

                // 查询银行卡列表
                // this.isDeliverAddress && this.props.paymentStore.setDefaultCardDataFromAddr(this.state.deliveryAddress);

                this.confirmToNextPanel();
                this.setState({
                  validationLoading: false
                });
              }
            );
          } else {
            // 计算运费
            this.getShippingCalculation(dladdress);
          }
        } else {
          this.setState({
            validationLoading: false
          });
          this.showErrMsg(this.state.wrongAddressMsg['wrongAddress']);
        }
      } else {
        // 地址列表为空的时候
        this.setState({
          validationLoading: false
        });
        this.showErrMsg(this.state.wrongAddressMsg['wrongAddress']);
      }
    } catch (err) {
      console.warn(err);
      this.setState({
        validationLoading: false
      });
    }
  };
  // 俄罗斯 计算运费
  getShippingCalculation = async (obj) => {
    const { addressList } = this.state;
    // console.log('666 >>> ★★ --- 计算运费 obj: ', obj);
    try {
      let data = obj.DuData;
      let res = await shippingCalculation({
        postalCode: data.postCode,
        regionFias: data.provinceId, // 此处的provinceId是DuData地址返回的字符串，并非我们系统里的id
        areaFias: data.areaId || null,
        cityFias: data.cityId,
        settlementFias: data.settlementId || null
      });
      if (res?.context?.success && res?.context?.tariffs[0]) {
        let calculation = res?.context?.tariffs[0];
        let newaddr = Object.assign({}, obj);
        // 赋值查询到的地址信息
        newaddr.calculation = calculation;
        addressList.forEach((item, i) => {
          if (item.deliveryAddressId == newaddr.deliveryAddressId) {
            addressList[i] = newaddr;
            this.setState(
              {
                addressList,
                deliveryAddress: newaddr
              },
              () => {
                this.calculateFreight(this.state.deliveryAddress);

                // 查询银行卡列表
                // this.isDeliverAddress && this.props.paymentStore.setDefaultCardDataFromAddr(this.state.deliveryAddress);

                this.confirmToNextPanel();
                this.setState({
                  validationLoading: false
                });
              }
            );
          }
        });
      } else {
        this.setState({
          validationLoading: false
        });
        this.showErrMsg(this.state.wrongAddressMsg['wrongAddress']);
      }
    } catch (err) {
      console.warn(err);
      this.setState({
        validationLoading: false
      });
    }
  };
  confirmToNextPanel({ init = false } = {}) {
    if (this.curPanelKey !== 'deliveryAddr') {
      return false;
    }
    const { selectedId } = this.state;
    const data = find(
      this.state.addressList,
      (ele) => ele.deliveryAddressId === selectedId
    );
    const { paymentStore } = this.props;
    if (this.curPanelKey === 'deliveryAddr') {
      paymentStore.setStsToCompleted({ key: 'billingAddr' });
    }

    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey: this.curPanelKey
    });

    if (data) {
      paymentStore.setStsToCompleted({
        key: this.curPanelKey,
        isFirstLoad: init
      });

      const isReadyPrev = isPrevReady({
        list: toJS(paymentStore.panelStatus),
        curKey: this.curPanelKey
      });

      isReadyPrev && paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
    } else {
      // 没有地址的情况
      paymentStore.setStsToPrepare({ key: nextConfirmPanel.key });
    }
    this.setState({
      showDeliveryOrPickUp: 0,
      deliveryOrPickUpFlag: false
    });
  }
  // 选择地址
  selectAddress(e, idx) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { allAddressList, addressList } = this.state;

    Array.from(addressList, (a) => (a.selected = false));

    addressList[idx].selected = true;

    this.setState(
      {
        // pickupFormData: [],
        addressList: addressList,
        allAddressList: allAddressList,
        selectedId: addressList[idx].deliveryAddressId,
        homeDeliverySelectedId: addressList[idx].deliveryAddressId
      },
      () => {
        this.updateSelectedData();
        if (window.__.env.REACT_APP_COUNTRY == 'ru') {
          this.getHomeDeliveryPrice(
            addressList[idx].city,
            addressList[idx].receiveType
          );
        }
      }
    );
  }
  // 处理选择的地址数据
  updateSelectedData(str) {
    const { homeDeliverySelectedId, addressList, wrongAddressMsg } = this.state;
    const tmpObj =
      find(
        addressList,
        (ele) => ele.deliveryAddressId === homeDeliverySelectedId
      ) || null;
    // 俄罗斯DuData
    if (window.__.env.REACT_APP_COUNTRY == 'ru' && str == 'confirm') {
      // 判断地址完整性
      let errmsg = this.getDuDataAddressErrMsg(tmpObj);
      if (errmsg) {
        this.showErrMsg(wrongAddressMsg['title'] + errmsg);
      } else {
        this.setState({
          validationLoading: true
        });
        // 根据address1查询地址信息，再根据查到的信息计算运费
        this.getAddressListByKeyWord(tmpObj);
      }
    } else {
      this.props.updateData(tmpObj);
      if (this.props.type == 'delivery') {
        this.calculateFreight(tmpObj);
      }
    }
  }
  // 编辑 homeDelivery 地址
  addOrEditAddress(idx = -1) {
    const { type } = this.props;
    const { deliveryAddress, addressList } = this.state;
    this.currentOperateIdx = idx;
    this.props.isAddOrEdit(true); // payment中用来判断是否添加或者编辑地址
    this.props.updateValidationStaus(true);
    let tmpDeliveryAddress = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      areaId: '',
      area: '',
      rfc: '',
      countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
      country: '',
      county: '',
      cityId: '',
      city: '',
      provinceNo: '',
      provinceId: '',
      province: '',
      postCode: '',
      phoneNumber: '',
      comment: '',
      entrance: '',
      apartment: '',
      street: '',
      house: '',
      housing: '',
      deliveryDate: '',
      deliveryDateId: 0,
      timeSlot: '',
      timeSlotId: 0,
      isDefalt: false
    };
    this.setState({
      typeForGA: idx > -1 ? 'Edit' : 'Add'
    });
    if (idx > -1) {
      const tmp = addressList[idx];
      // console.log(tmp)
      // debugger

      tmpDeliveryAddress = {
        firstName: tmp.firstName,
        lastName: tmp.lastName,
        address1: tmp.address1,
        address2: tmp.address2,
        rfc: tmp.rfc,
        countryId: tmp.countryId,
        country: tmp.country,
        county: tmp?.county,
        cityId: tmp.cityId,
        city: tmp.city,
        areaId: tmp.areaId,
        area: tmp.area,
        provinceNo: tmp.provinceNo,
        provinceId: tmp.provinceId,
        province: tmp.province,
        postCode: tmp.postCode,
        phoneNumber: tmp.consigneeNumber,
        comment: tmp.comment || '',
        entrance: tmp.entrance || '',
        apartment: tmp.apartment || '',
        street: tmp.street || '',
        house: tmp.house || '',
        housing: tmp.housing || '',
        deliveryDate: tmp.deliveryDate || '',
        deliveryDateId: tmp.deliveryDate || '',
        timeSlot: tmp.timeSlot || '',
        timeSlotId: tmp.timeSlot || '',
        isDefalt: tmp.isDefaltAddress === 1 ? true : false,
        email: tmp.email,
        firstNameKatakana: tmp.firstNameKatakana,
        lastNameKatakana: tmp.lastNameKatakana
      };

      //日本
      // if (window.__.env.REACT_APP_COUNTRY === 'jp') {
      //   tmpDeliveryAddress.region = tmp.area;
      // }
      if (isCanVerifyBlacklistPostCode) {
        tmpDeliveryAddress.alert = tmp?.alert || '';
        tmpDeliveryAddress.validFlag = tmp?.validFlag;
      }
      this.setState({
        selectedId: tmp.deliveryAddressId,
        homeDeliverySelectedId: tmp.deliveryAddressId
      });
    } else {
      // 新增时删除属性
      if (isCanVerifyBlacklistPostCode) {
        delete deliveryAddress.validFlag;
        delete deliveryAddress.alert;
      }
    }

    this.setState(
      {
        deliveryAddress: Object.assign({}, deliveryAddress, tmpDeliveryAddress)
      },
      () => {
        this.setState({
          addOrEdit: true
        });
        this.props.paymentStore.setStsToEdit({
          key: this.curPanelKey,
          hideOthers: this.isDeliverAddress ? true : false
        });

        this.updateDeliveryAddress(this.state.deliveryAddress);
      }
    );
    if (this.isDeliverAddress) {
      this.scrollToTitle();
    }
  }
  handleDefaultChange = () => {
    let data = this.state.deliveryAddress;
    data.isDefalt = !data.isDefalt;
    this.setState({
      deliveryAddress: data
    });
  };
  updateBugData = (bugData) => {
    this.setState({ bugData });
  };
  updateDeliveryAddress = async (data) => {
    console.log(444, data);
    const { intl } = this.props;
    try {
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      this.setState({
        isValid: false
      });
      await validData({ rule: data.formRule, data, intl }); // 数据验证
      this.setState({ isValid: true, saveErrorMsg: '' }, () => {
        // 设置按钮状态
        this.props.updateFormValidStatus(this.state.isValid);
        this.props.updateData(data);
      });
    } catch (err) {
      // console.warn(' err msg: ', err);
      console.log(err.message);
      this.setState({ isValid: false }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    } finally {
      console.log(555, data);
      this.setState({ deliveryAddress: data });
    }
  };
  // 计算运费
  calculateFreight = (data) => {
    this.props.calculateFreight(data);
  };
  // 根据传过来的地址信息或者默认地址计算运费
  recalculateFreight = (data) => {
    const { addressList, homeDeliverySelectedId } = this.state;
    let obj = data;
    if (addressList.length && data.receiveType == 'HOME_DELIVERY') {
      obj = find(
        addressList,
        (ele) => ele.deliveryAddressId === homeDeliverySelectedId
      );
    }
    this.calculateFreight(obj);
  };
  // 俄罗斯地址校验flag，控制按钮是否可用
  getFormAddressValidFlag = (flag) => {
    console.log('666 >>> address1地址校验flag : ', flag);
    const { deliveryAddress, isValid } = this.state;
    this.setState(
      {
        formAddressValid: flag
      },
      () => {
        if (flag) {
          this.updateDeliveryAddress(deliveryAddress);
        }
      }
    );
  };
  scrollToTitle() {
    const widget = document.querySelector(`#J-address-title-${this.props.id}`);
    const headerWidget = document.querySelector('.rc-header__scrolled')
      ? document.querySelector('.rc-header__scrolled')
      : document.querySelector('.rc-header__nav');
    if (widget && headerWidget) {
      window.scrollTo({
        top:
          this.getElementToPageTop(widget) -
          950 -
          this.getElementToPageTop(headerWidget),
        behavior: 'smooth'
      });
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  handleClickCancel = () => {
    this.setState({ addOrEdit: false, saveErrorMsg: '' });
    this.scrollToTitle();
  };
  // 保存地址
  async handleSavePromise() {
    this.setState({ saveLoading: true });
    try {
      const { deliveryAddress, addressList } = this.state;

      // console.log(deliveryAddress)
      // debugger

      const originData = addressList[this.currentOperateIdx];
      //日本需求加unspecified
      // if(deliveryAddress.timeSlot == 'unspecified'){
      //   deliveryAddress.timeSlot = ''
      //   deliveryAddress.timeSlotId = ''
      // }

      let params = Object.assign({}, deliveryAddress, {
        consigneeName:
          deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
        consigneeNumber: deliveryAddress.phoneNumber,
        customerId: originData ? originData.customerId : '',
        deliveryAddress:
          deliveryAddress.address1 + ' ' + deliveryAddress.address2,
        deliveryAddressId: originData ? originData.deliveryAddressId : '',
        isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
        region: deliveryAddress.province, // DuData相关参数
        type: this.props.type.toUpperCase(),
        isValidated: deliveryAddress.validationResult
      });

      //临时处理bug-不是莫斯科地址传的莫斯科地址的问题
      if (Object.keys(this.state.bugData).length > 0) {
        params = Object.assign(params, {
          city: this.state.bugData.city,
          cityIdStr: this.state.bugData.cityIdStr,
          province: this.state.bugData.province,
          provinceIdStr: this.state.bugData.provinceIdStr
        });
      }

      if (window.__.env.REACT_APP_COUNTRY === 'jp') {
        params.area = deliveryAddress.region; //日本需求store portal用的是region字段，shop新增地址用area字段
      }

      const tmpPromise =
        this.currentOperateIdx > -1 ? editAddress : saveAddress;
      let res = await tmpPromise(params);

      let tmpObj = res?.context;
      if (tmpObj.deliveryAddressId) {
        this.setState({
          selectedId: tmpObj.deliveryAddressId,
          homeDeliverySelectedId: tmpObj.deliveryAddressId
        });
      }
      this.isDeliverAddress && this.scrollToTitle();

      // 查询运费
      if (
        window.__.env.REACT_APP_COUNTRY === 'ru' &&
        tmpObj?.receiveType === 'HOME_DELIVERY'
      ) {
        await this.getHomeDeliveryPrice(tmpObj?.city, tmpObj?.receiveType);
      }
      await this.queryAddressList();
      this.showSuccessMsg();
      this.setState({
        addOrEdit: false,
        saveLoading: false
      });

      this.clickConfirmAddressPanel();
    } catch (err) {
      console.log(err);
      this.setState({
        saveLoading: false,
        addOrEdit: true
      });
      if (err?.message) {
        this.props.catchErrorMessage(err.message);
      }
      // throw new Error(err.message);
    } finally {
      this.setState({
        loading: false,
        saveLoading: false
      });
    }
  }
  /**
   * 1 新增/编辑地址
   * 2 确认地址信息，并返回到封面
   * 3 ★ 俄罗斯需要根据地址先计算运费
   */
  handleSave = async ({ isThrowError = true } = {}) => {
    try {
      const { isValid, addOrEdit, deliveryAddress } = this.state;
      if (!isValid || !addOrEdit) {
        return false;
      }

      // ★★★★★★ 自动更新deliveryDate和timeSlot后暂时用不到这段 ★★★★★★
      // if (deliveryAddress?.deliveryDate) {
      //   // 判断 deliveryDate 是否过期
      //   if (!this.deliveryDateStaleDateOrNot(deliveryAddress)) {
      //     return;
      //   }
      // }

      // 地址验证
      this.setState({
        saveLoading: true
      });
      const res = await this.props.addressStore.validAddr({
        data: deliveryAddress
      });
      await this.getListValidationData(res, true);
    } catch (err) {
      console.log(err);
      if (isThrowError) throw new Error();
    }
  };
  // 选择地址
  chooseListValidationAddress = (e) => {
    this.setState({
      selectListValidationOption: e.target.value
    });
  };
  // 获取地址验证查询到的数据
  getListValidationData = async (
    data,
    showListValidationModalVisible = false
  ) => {
    this.setState({
      validationLoading: false
    });
    if (data && data != null) {
      // 有校验地址，获取并设置地址校验返回的数据
      this.setState(
        {
          validationAddress: data
        },
        () => {
          if (showListValidationModalVisible) {
            this.setState({ listValidationModalVisible: true });
          }
        }
      );
      throw new Error();
    } else {
      // 没有校验地址，直接下一步
      await this.showNextPanel();
    }
  };
  // 下一步
  showNextPanel = async () => {
    this.setState({
      listValidationModalVisible: false,
      saveLoading: false,
      listBtnLoading: false
    });
    this.props.updateValidationStaus(true);
    // 不校验地址，进入下一步
    await this.handleSavePromise();
  };
  // 点击地址验证确认按钮
  confirmListValidationAddress = () => {
    const { deliveryAddress, selectListValidationOption, validationAddress } =
      this.state;
    this.setState({
      listBtnLoading: true
    });
    let oldDeliveryAddress = JSON.parse(JSON.stringify(deliveryAddress));
    let theform = [];
    if (selectListValidationOption == 'suggestedAddress') {
      deliveryAddress.address1 = validationAddress.address1;
      deliveryAddress.city = validationAddress.city;
      deliveryAddress.postCode = validationAddress.postalCode;

      deliveryAddress.province = validationAddress.provinceCode;
      deliveryAddress.provinceId = validationAddress.provinceId
        ? validationAddress.provinceId
        : deliveryAddress.provinceId;

      // 地址校验返回参数
      deliveryAddress.validationResult = validationAddress.validationResult;
      theform = Object.assign({}, deliveryAddress);
    } else {
      theform = JSON.parse(JSON.stringify(oldDeliveryAddress));
    }
    this.setState(
      {
        deliveryAddress: Object.assign({}, theform)
      },
      () => {
        // 下一步
        this.showNextPanel();
      }
    );
  };
  showErrMsg(msg) {
    this.setState({
      saveErrorMsg: msg
    });
    this.scrollToTitle();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        saveErrorMsg: ''
      });
    }, 5000);
  }
  showSuccessMsg() {
    this.setState({
      successTipVisible: true
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        successTipVisible: false
      });
    }, 2000);
  }
  toggleFoldBtn = () => {
    this.setState((curState) => ({
      foledMore: !curState.foledMore
    }));
  };
  // 编辑地址
  handleClickEdit = () => {
    this.props.paymentStore.setStsToEdit({
      key: this.curPanelKey,
      hideOthers: true
    });
    // 设置home delivery状态
    this.setRuDeliveryOrPickUp();
  };
  ValidationAddressModalJSX = () => {
    const {
      deliveryAddress,
      listValidationModalVisible,
      selectListValidationOption,
      validationAddress
    } = this.state;
    return (
      <>
        <ValidationAddressModal
          btnLoading={this.state.listBtnLoading}
          defaultValidationAddress={validationAddress}
          address={deliveryAddress}
          updateValidationData={(res) => this.getListValidationData(res)}
          selectValidationOption={selectListValidationOption}
          handleChooseValidationAddress={(e) =>
            this.chooseListValidationAddress(e)
          }
          hanldeClickConfirm={() => this.confirmListValidationAddress()}
          validationModalVisible={listValidationModalVisible}
          close={() => {
            this.setState({
              listValidationModalVisible: false,
              validationLoading: false,
              saveLoading: false,
              listBtnLoading: false,
              loading: false
            });
            this.props.updateValidationStaus(true);
          }}
        />
      </>
    );
  };
  // 处理要显示的字段
  setAddressFields = (data) => {
    const {
      configStore: {
        localAddressForm: { fieldKeyEnableStatus }
      }
    } = this.props;
    let farr = [data.address1, data.city];
    if (fieldKeyEnableStatus?.state) {
      farr.push(data.province);
    }
    if (fieldKeyEnableStatus?.region) {
      farr.push(data.area);
    }
    return farr.join(', ');
  };

  //日本 处理要显示的字段
  jpSetAddressFields = (data) => {
    return [data.province, data.city, data.area, data.address1].join(', ');
  };

  // ************************ pick up 相关

  // 计算homeDelivery运费
  getHomeDeliveryPrice = async (city, deliveryType, callback) => {
    const { allAddressList, addressList, pickupAddress } = this.state;
    if (!city) {
      return;
    }
    // console.log('666 >>> deliveryType : ', deliveryType);
    try {
      this.setState({ validationLoading: true });
      let res = await pickupQueryCity({ keyword: city });
      let robj = res?.context?.pickUpQueryCityDTOs || [];
      if (robj) {
        let data = robj[0];

        let goodsInfoDetails = [];
        // 取到购物车里面的 goodsInfoId、购买的sku数量
        let cartData = this.props.cartData.filter((el) => el.goodsInfoId);
        cartData.forEach((e) => {
          goodsInfoDetails.push({
            goodsInfoId: e.goodsInfoId,
            quantity: e.buyCount
          });
        });
        // 合并包裹
        let ckg = await dimensionsByPackage({
          goodsInfoDetails: goodsInfoDetails
        });
        // console.log('666 >>> list 合并包裹: ', ckg);
        if (ckg.context?.dimensions) {
          let ckgobj = ckg.context;
          data['dimensions'] = ckgobj?.dimensions;
          data['weight'] = ckgobj?.weight;
        }

        // 根据城市信息查询运费
        let rfee = await pickupQueryCityFee(data);
        if (rfee.context?.tariffs?.length) {
          let tariffs = rfee.context.tariffs;
          this.setState(
            {
              homeAndPickup: Object.assign([], tariffs)
            },
            () => {
              let addstr = '';
              // 有homeDelivery地址，没有pickup地址
              if (addressList.length && !pickupAddress.length) {
                addstr = 'COURIER';
              }
              // 有pickup地址，没有homeDelivery地址
              if (!addressList.length && pickupAddress.length) {
                addstr = 'PVZ';
              }
              // 两个都有时，如果有默认地址，则选择默认
              if (addressList.length && pickupAddress.length) {
                allAddressList.forEach((e) => {
                  // 有默认地址
                  if (e.isDefaltAddress == 1) {
                    if (e.receiveType === 'PICK_UP') {
                      addstr = 'PVZ';
                    } else {
                      addstr = 'COURIER';
                    }
                  }
                });
                !addstr && (addstr = 'COURIER');
              }

              if (tariffs?.length) {
                let hpobj =
                  sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
                if (hpobj) {
                  hpobj = JSON.parse(hpobj);
                }
                let homeDeliveryPrice = 0;
                tariffs.map((e, i) => {
                  let tp = e.type;
                  e.selected = false;
                  if (tp == addstr) {
                    e.selected = true;
                  } else {
                    e.selected = false;
                  }
                  tariffs.length === 1 && (e.selected = true);
                  if (tariffs.length === 1 && deliveryType === 'PICK_UP') {
                    e.selected = true;
                    this.handleRadioChange('homeDelivery');
                  }

                  // 修改类型名称，方便阅读
                  tp === 'COURIER'
                    ? (e.type = 'homeDelivery')
                    : (e.type = 'pickup');
                  if (e.type == 'homeDelivery') {
                    // 'COURIER'=> home delivery
                    let hdAddr = tariffs.filter(
                      (e) => e.type == 'homeDelivery'
                    );
                    homeDeliveryPrice = hdAddr[0]?.deliveryPrice;
                    e.deliveryPrice = homeDeliveryPrice;
                    if (hpobj?.homeAndPickup) {
                      hpobj.homeAndPickup.map((e) => {
                        if (e.type === 'homeDelivery') {
                          e.deliveryPrice = homeDeliveryPrice;
                        }
                      });
                    }
                  }

                  if (e.type == 'pickup') {
                    // 'PVZ'=> pickup
                    let pkAddr = tariffs.filter((e) => e.type == 'pickup');
                    if (city === pickupAddress[0]?.city) {
                      e.maxDeliveryTime = pkAddr[0]?.maxDeliveryTime;
                      e.minDeliveryTime = pkAddr[0]?.minDeliveryTime;
                      this.setState({
                        pickupCalculation: pkAddr[0]
                      });
                    }
                    if (!pkAddr.length) {
                      tariffs.splice(i, 1);
                      this.handleRadioChange('homeDelivery');
                    }
                  }
                });

                // 修改本地存储信息
                if (deliveryType === 'HOME_DELIVERY') {
                  // homeDelivery地址通过queryCityFee接口查询的结果不决定pickup地址是否展示
                  let hmapk = this.state.homeAndPickup;
                  hmapk.forEach((hp) => {
                    if (hp.type === 'homeDelivery') {
                      hp.deliveryPrice = homeDeliveryPrice;
                    }
                  });
                  this.setState({
                    homeAndPickup: Object.assign([], hmapk)
                  });
                } else {
                  // pickup delivery
                  if (!hpobj) {
                    hpobj = {
                      cityData: null,
                      homeAndPickup: tariffs
                    };
                  }
                }
                // 修改本地存储的信息
                sessionItemRoyal.set(
                  'rc-homeDeliveryAndPickup',
                  JSON.stringify(hpobj)
                );
              }
              callback && callback();
            }
          );
        }
      }
      this.setState({ validationLoading: false });
    } catch {
      this.setState({ validationLoading: false });
    }
  };
  // 根据默认地址设置信息
  getHomeDeliveryAndPickupInfo = async () => {
    const { saveAddressNumber } = this.props;
    const {
      homeAndPickup,
      allAddressList,
      addressList,
      pickupAddress,
      selectedId,
      isPickupOpen
    } = this.state;

    let hdpk = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
    if (hdpk) {
      hdpk = JSON.parse(hdpk);
    }

    // 设置homeDelivery deliveryPrice初始值
    let homedobj = find(homeAndPickup, (e) => e.type == 'homeDelivery');
    let obj = [];
    if (saveAddressNumber === 1) {
      obj = [
        {
          deliveryPrice: homedobj?.deliveryPrice ?? 0,
          selected: false,
          type: 'homeDelivery'
        }
      ];
      // pickup 开关打开状态
      if (isPickupOpen) {
        obj.push({
          deliveryPrice: pickupAddress[0]?.pickupPrice || 0,
          selected: false,
          type: 'pickup'
        });
      }
    } else {
      obj = hdpk?.homeAndPickup;
    }
    // ★★★★★ 设置默认选中项（按优先级）
    // 1、上一次选择
    // 2、有homeDelivery地址，没有pickup地址
    // 3、有pickup地址，没有homeDelivery地址
    // 4、有设置默认地址
    let addstr = null;
    if (hdpk?.homeAndPickup && saveAddressNumber > 1) {
      // console.log('666 >>> 1、上一次选择');
      hdpk.homeAndPickup.map((pk) => {
        if (pk.selected) {
          addstr = pk.type;
        }
      });
    } else {
      // 2、有homeDelivery地址，没有pickup地址
      if (addressList.length && !pickupAddress.length) {
        // console.log('666 >>> 2、有homeDelivery地址，没有pickup地址');
        addstr = 'homeDelivery';
      }
      // 3、有pickup地址，没有homeDelivery地址
      if (!addressList.length && pickupAddress.length) {
        // console.log('666 >>> 3、有pickup地址，没有homeDelivery地址');
        addstr = 'pickup';
        this.handleRadioChange(addstr);
      }
      // 4、两个都有时，如果有默认地址，则选择默认
      if (addressList.length && pickupAddress.length) {
        allAddressList.forEach((e) => {
          // 有默认地址
          if (e.isDefaltAddress == 1) {
            if (e.receiveType === 'PICK_UP') {
              addstr = 'pickup';
            } else {
              addstr = 'homeDelivery';
            }
          }
        });
        !addstr && (addstr = 'homeDelivery');
        // console.log('666 >>> 4、both ： ',addstr);
      }
    }

    obj.map((e) => {
      let tp = e.type;
      if (tp == addstr) {
        e.selected = true;
      } else {
        e.selected = false;
      }
    });

    // 没有默认地址也没有缓存
    if (!addstr) {
      obj[0].selected = true;
    }

    this.updateShippingMethodType(addstr);
    this.setState(
      {
        homeAndPickup: obj
      },
      async () => {
        // 存储选择的数据
        let item = null;
        if (!hdpk) {
          item = {
            cityData: hdpk?.cityData || null,
            homeAndPickup: obj
          };
        } else {
          item = hdpk;
          item['homeAndPickup'] = obj;
        }
        sessionItemRoyal.set('rc-homeDeliveryAndPickup', JSON.stringify(item));
        // 计算homeDelivery运费 , 打开/刷新 页面后的第一次执行
        if (saveAddressNumber === 1) {
          // homeDelivery
          const tmpObj =
            find(
              allAddressList,
              (ele) => ele.deliveryAddressId === selectedId
            ) || null;
          if (tmpObj) {
            await this.getHomeDeliveryPrice(
              tmpObj?.city,
              tmpObj?.receiveType,
              this.handleRadioChange.bind(this, addstr)
            );
          }
          if (pickupAddress.length) {
            await this.getHomeDeliveryPrice(
              pickupAddress[0]?.city,
              pickupAddress[0]?.receiveType,
              this.handleRadioChange.bind(this, addstr)
            );
          }
        }
      }
    );
  };
  // 新增或者编辑pickup address
  addOrEditPickupAddress = (str) => {
    this.updateConfirmBtnDisabled(true);
    this.setState({
      addOrEditPickup: true,
      deliveryOrPickUpFlag: true,
      showDeliveryOrPickUp: 0, // 0：都没有，1：home delivery，2：pickup
      choiseHomeDeliveryOrPickUp: 0 // 0：都没有，1：home delivery，2：pickup
    });
  };
  // 取消新增或编辑pickup
  handleCancelAddOrEditPickup = () => {
    const { pickupAddress, pickupFormData } = this.state;
    this.setState(
      {
        pickupFormData: Object.assign({}, pickupFormData, pickupAddress[0]),
        addOrEditPickup: false,
        deliveryOrPickUpFlag: true,
        showDeliveryOrPickUp: 1, // 0：都没有，1：home delivery，2：pickup
        choiseHomeDeliveryOrPickUp: 2 // 0：都没有，1：home delivery，2：pickup
      },
      () => {
        // 修改按钮状态
        if (pickupAddress.length) {
          this.setState({
            confirmBtnDisabled: false
          });
        }
        // 修改本地存储的信息
        let sobj = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
        if (sobj) {
          sobj = JSON.parse(sobj);
        }
        if (sobj?.cityData) {
          sobj['cityData'] = null;
          sessionItemRoyal.set(
            'rc-homeDeliveryAndPickup',
            JSON.stringify(sobj)
          );
        }
      }
    );
  };
  // 单选按钮选择
  handleRadioChange = async (e) => {
    const {
      addressList,
      homeAndPickup,
      pickupAddress,
      selectedId,
      pickupFormData
    } = this.state;
    let addressObj = null;
    let val = e?.currentTarget?.value || e;
    let sitem = Object.assign([], homeAndPickup);
    sitem.forEach((v, i) => {
      if (v.type == val) {
        v['selected'] = true;
      } else {
        v['selected'] = false;
      }
    });
    // console.log('666 >>> 单选按钮选择 val: ', val);
    this.updateShippingMethodType(val);
    // 设置按钮状态
    let btnStatus = false;
    let theAddressId = '';
    val == 'pickup' ? (btnStatus = true) : (btnStatus = false);
    if (val == 'pickup' && pickupAddress.length) {
      addressObj = pickupAddress[0];
      btnStatus = false;
      let pkup = pickupAddress[0];
      theAddressId = pkup.deliveryAddressId;
      this.setState(
        {
          pickupFormData: Object.assign(pickupFormData, pkup),
          selectedId: theAddressId,
          homeDeliverySelectedId: theAddressId
        },
        () => {
          let pickupFormData = this.state.pickupFormData;
          pickupFormData.pickup = this.state.homeAndPickup.filter(
            (el) => el.type === 'pickup'
          )[0];
          this.props.updateData(pickupFormData);
        }
      );
    } else {
      if (addressList.length) {
        // 选择homeDelivery更新 selectedId
        addressObj = find(
          addressList,
          (ele) => ele.deliveryAddressId === selectedId
        );
        if (!addressObj) {
          // 有默认地址选中默认地址，没有默认地址选中第一个地址
          const defaultAddressItem = find(addressList, (ele) => {
            return ele.isDefaltAddress === 1;
          });
          theAddressId =
            defaultAddressItem?.deliveryAddressId ??
            addressList[0].deliveryAddressId;
          addressObj = find(
            addressList,
            (ele) => ele.deliveryAddressId === theAddressId
          );
          Array.from(addressList, (a) => (a.selected = false));
          addressList.forEach((e) => {
            if (e.deliveryAddressId === theAddressId) {
              e.selected = true;
            }
          });
          this.setState(
            {
              selectedId: theAddressId,
              homeDeliverySelectedId: theAddressId
            },
            () => {
              // console.log('666 >>> pickup selectedId: ', selectedId);
            }
          );
        }
        this.setState({
          addressList
          //   pickupFormData: []
        });
        addressObj.calculation = this.state.homeAndPickup.filter(
          (el) => el.type === 'homeDelivery'
        )[0];
        this.props.updateData(addressObj);
      } else {
        btnStatus = true;
      }
    }
    this.updateConfirmBtnDisabled(btnStatus);

    this.scrollToTitle();

    let yourChoise = val == 'homeDelivery' ? 1 : 2;
    this.setState(
      {
        choiseHomeDeliveryOrPickUp: yourChoise,
        homeAndPickup: Object.assign([], sitem)
      },
      () => {
        // 存储选择的数据
        let sobj = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
        if (sobj) {
          sobj = JSON.parse(sobj);
        }
        let item = {
          cityData: sobj?.cityData || null,
          homeAndPickup: sitem
        };
        sessionItemRoyal.set('rc-homeDeliveryAndPickup', JSON.stringify(item));
        // 计算运费
        if (addressObj) {
          this.calculateFreight(addressObj);
        }
      }
    );
  };
  // 设置home delivery状态
  setRuDeliveryOrPickUp() {
    if (window.__.env.REACT_APP_COUNTRY === 'ru') {
      // let btndisabled = true; // 按钮状态
      let ichoise = 0;
      let obj = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
      if (obj) {
        obj = JSON.parse(obj);
      }
      let hpk = obj?.homeAndPickup || null;
      if (hpk) {
        // 判断并设置之前的选择
        hpk.map((e) => {
          if (e.selected) {
            if (e.type == 'homeDelivery') {
              // btndisabled = false;
              ichoise = 1;
            } else {
              // btndisabled = true;
              ichoise = 2;
            }
          }
        });
      }

      this.setState({
        addOrEditPickup: false,
        deliveryOrPickUpFlag: true,
        showDeliveryOrPickUp: 1, // 0：都没有，1：home delivery，2：pickup
        choiseHomeDeliveryOrPickUp: ichoise // 0：都没有，1：home delivery，2：pickup
      });

      // console.log('666 设置home delivery状态');

      // 修改按钮状态
      this.updateConfirmBtnDisabled(false);
    } else {
      this.setState({
        addOrEditPickup: false,
        deliveryOrPickUpFlag: false,
        showDeliveryOrPickUp: 1, // home delivery
        choiseHomeDeliveryOrPickUp: 1 // home delivery
      });
    }
  }
  // 修改按钮状态
  updateConfirmBtnDisabled = (flag) => {
    // console.log('666 >>> 修改按钮状态： ', flag);
    this.setState({
      confirmBtnDisabled: flag
    });
  };
  // 更新 showDeliveryOrPickUp
  updateDeliveryOrPickup = (num) => {
    const { addressList } = this.state;
    let flag = null;
    !addressList.length && num == 1 ? (flag = true) : (flag = false);
    // console.log('666 更新 showDeliveryOrPickUp: ', num);
    this.setState(
      {
        showDeliveryOrPickUp: num,
        addOrEdit: flag
      },
      () => {
        this.props.paymentUpdateDeliveryOrPickup(num);
      }
    );
  };
  // 更新 pickup编辑次数
  updatePickupEditNumber = (num) => {
    // console.log('666  更新 pickupEditNumber: ', num);
    this.setState({
      pickupEditNumber: num
    });
  };
  // 更新pickup数据
  updatePickupData = (data) => {
    // console.log('666 >>> updatePickupData: ', data);
    this.setState({
      pickupFormData: data
    });
  };
  // 更新 shippingMethodType
  updateShippingMethodType = (data) => {
    // console.log('666 >>> shippingMethodType: ', data);
    this.setState({
      shippingMethodType: data
    });
  };
  // 确认 pickup
  clickConfirmPickup = async () => {
    const {
      deliveryAddress,
      pickupFormData,
      pickupCalculation,
      wrongAddressMsg
    } = this.state;

    // 如果地址字段有缺失，提示错误信息
    if (!pickupFormData?.consigneeNumber) {
      let fky = wrongAddressMsg['title'] + wrongAddressMsg['phoneNumber'];
      this.showErrMsg(fky);
      return;
    }

    this.setState({
      btnConfirmLoading: true,
      loading: true
    });
    try {
      await this.getHomeDeliveryPrice(
        pickupFormData.city,
        pickupFormData?.receiveType
      );

      let receiveType = pickupFormData.receiveType;
      let tempAddress = Object.keys(deliveryAddress).reduce((pre, cur) => {
        return Object.assign(pre, { [cur]: '' });
      }, {});

      let pkobj = this.state.homeAndPickup.filter((e) => {
        return e.type == 'pickup';
      });
      let minDeliveryTime =
        pickupFormData.minDeliveryTime || pkobj[0]?.minDeliveryTime;
      let maxDeliveryTime =
        pickupFormData.maxDeliveryTime || pkobj[0]?.maxDeliveryTime;

      // console.log('666 >>> maxDeliveryTime: ', maxDeliveryTime);

      let pkaddr = pickupFormData?.pickup?.address || null;
      let deliveryAdd = Object.assign({}, tempAddress, {
        calculation: pickupCalculation,
        firstName: pickupFormData.firstName,
        lastName: pickupFormData.lastName,
        consigneeName: pickupFormData.firstName + ' ' + pickupFormData.lastName,
        consigneeNumber: pickupFormData.consigneeNumber,
        address1: pickupFormData.address1,
        deliveryAddress: pickupFormData.address1,
        city: pickupFormData.city,
        comment: pickupFormData.comment,
        pickupPrice: pickupFormData?.pickupPrice,
        pickupDescription: pickupFormData?.pickupDescription,
        pickupCode: pickupFormData?.pickupCode, // 快递公司code
        pickupName: pickupFormData?.pickupName, // 快递公司
        paymentMethods: pickupFormData?.paymentMethods, // 支付方式
        workTime: pickupFormData.workTime, // 快递公司上班时间
        receiveType: pickupFormData.receiveType, // HOME_DELIVERY , PICK_UP
        deliverWay: receiveType == 'HOME_DELIVERY' ? 1 : 2, // 1: HOMEDELIVERY , 2: PICKUP
        type: 'DELIVERY',
        country: deliveryAddress.country,
        countryId: deliveryAddress.countryId,
        // isDefaltAddress: pickupFormData?.isDefaltAddress,
        isDefaltAddress: pickupFormData.isDefaltAddress ? 1 : 0,
        minDeliveryTime: minDeliveryTime,
        maxDeliveryTime: maxDeliveryTime,
        province: pkaddr?.region || pickupFormData.province,
        provinceIdStr: pkaddr?.regionFias || pickupFormData.provinceIdStr,
        provinceCode: pickupFormData?.provinceCode,
        cityIdStr: pkaddr?.cityFias || pickupFormData.cityIdStr,
        areaIdStr: pkaddr?.areaFias || pickupFormData.areaIdStr,
        settlementIdStr:
          pkaddr?.settlementFias || pickupFormData.settlementIdStr,
        postalCode: pkaddr?.zip || pickupFormData.postCode
      });

      // 查询地址列表，筛选 pickup 地址
      let addres = await getAddressList();
      let pkup = addres.context.filter((e) => {
        return e.receiveType == 'PICK_UP';
      });
      // 判断是否存在有 pickup 地址
      const tmpPromise = pkup.length ? editAddress : saveAddress;
      if (pkup.length) {
        deliveryAdd.deliveryAddressId = pkup[0].deliveryAddressId;
        deliveryAdd.customerId = pkup[0].customerId;
      }

      let res = await tmpPromise(deliveryAdd);
      if (res.context?.deliveryAddressId) {
        let deliveryAddressId = res.context.deliveryAddressId;
        let selectedId = deliveryAddressId;
        deliveryAdd.deliveryAddressId = deliveryAddressId;
        this.setState({
          selectedId: selectedId
        });

        this.setState(
          {
            pickupData: Object.assign({}, pickupFormData, deliveryAdd)
          },
          async () => {
            let newPickupData = this.state.pickupData;
            // pickup 相关信息传到 Payment
            // deliveryAdd['pickup'] = pickupFormData.pickup;
            // console.log('666 >>> -----------------------------------');
            if (newPickupData.receiveType == 'PICK_UP') {
              newPickupData.pickup =
                newPickupData.pickup ||
                this.state.homeAndPickup.filter(
                  (el) => el.type === 'pickup'
                )[0];
            } else {
              newPickupData.calculation =
                newPickupData.calculation ||
                this.state.homeAndPickup.filter(
                  (el) => el.type === 'homeDelivery'
                )[0];
            }
            this.props.updateData(newPickupData);
            this.calculateFreight(newPickupData);

            // 收起 panel
            const { paymentStore } = this.props;
            if (this.curPanelKey === 'deliveryAddr') {
              paymentStore.setStsToCompleted({ key: 'billingAddr' });
            }
            // 下一个最近的未complete的panel
            const nextConfirmPanel = searchNextConfirmPanel({
              list: toJS(paymentStore.panelStatus),
              curKey: this.curPanelKey
            });
            paymentStore.setStsToCompleted({
              key: this.curPanelKey,
              isFirstLoad: false
            });
            const isReadyPrev = isPrevReady({
              list: toJS(paymentStore.panelStatus),
              curKey: this.curPanelKey
            });
            isReadyPrev &&
              paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
            this.setState({
              addOrEdit: false,
              showDeliveryOrPickUp: 0,
              deliveryOrPickUpFlag: false
            });

            // 查询地址列表
            // await this.queryAddressList();
            this.scrollToTitle();
            this.showSuccessMsg();
          }
        );
      }
    } catch (err) {
      this.setState({
        saveErrorMsg: err.message
      });
    } finally {
      this.setState({
        btnConfirmLoading: false,
        loading: false
      });
    }
  };

  render() {
    const { panelStatus } = this;
    const { showOperateBtn } = this.props;
    const {
      shippingMethodType,
      isHomeDeliveryOpen,
      isPickupOpen,
      deliveryOrPickUpFlag,
      confirmBtnDisabled,
      showDeliveryOrPickUp,
      choiseHomeDeliveryOrPickUp,
      isValid,
      formAddressValid,
      deliveryAddress,
      addOrEdit,
      addOrEditPickup,
      loading,
      foledMore,
      saveErrorMsg,
      successTipVisible,
      selectedId,
      validationLoading,
      listValidationModalVisible,
      pickupFormData,
      pickupData,
      homeAndPickup,
      addressList,
      allAddressList,
      pickupAddress,
      pickupEditNumber
    } = this.state;

    // 地址列表
    const _list = addressList.map((item, i) => {
      return (
        <div
          className={cn(
            'rounded address-item mb-3',
            `${item.selected ? 'selected' : 'border'}`,
            {
              forbid: !item?.validFlag && isCanVerifyBlacklistPostCode,
              'address-item-none': foledMore && !item.selected && i !== 0,
              'border-bottom-0': !item.selected && i !== addressList.length - 1
            }
          )}
          key={item.deliveryAddressId}
          onClick={
            isCanVerifyBlacklistPostCode
              ? !!item.validFlag
                ? (e) => this.selectAddress(e, i)
                : null
              : (e) => this.selectAddress(e, i)
          }
        >
          <div className="row align-items-center pt-3 pb-3 ml-3 mr-3 align_items_wrap">
            <div
              className="d-flex col-10 col-md-8 pl-1 pr-1"
              style={{ flexDirection: 'column' }}
            >
              <span className="font-weight-bold">{item.consigneeName}</span>
              <p>{item.consigneeNumber}</p>
              <p>
                {this.setAddressFields(item)}
                {item.deliveryDate && item.timeSlot ? (
                  <>
                    <br />
                    {/* 格式化 delivery date 格式: 星期, 15 月份 */}
                    {item.deliveryDate == 'Unspecified'
                      ? ''
                      : formatDate({
                          date: item.deliveryDate,
                          formatOption: {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long'
                          }
                        })}{' '}
                    {item.timeSlot === 'Unspecified' ? (
                      <FormattedMessage id="Unspecified" />
                    ) : (
                      item.timeSlot
                    )}
                  </>
                ) : null}
                {item.selected &&
                item.timeSlot &&
                this.props.saveAddressNumber < 2 ? (
                  <span style={{ display: 'block' }}>
                    <FormattedMessage id="payment.editDeliveryDateAndTime" />
                  </span>
                ) : null}

                {item?.county && ', ' + item.county}

                {', ' +
                  matchNamefromDict(this.state.countryList, item.countryId)}
              </p>

              {!item?.validFlag && isCanVerifyBlacklistPostCode ? (
                <div className="address-item-forbid">{item.alert}</div>
              ) : null}
            </div>
            <div className="col-12 col-md-4 md:mt-0 mt-1 pl-0 pr-0 text-right font-weight-bold address_opt_btn ">
              <span
                className="border-bottom-2"
                onClick={this.addOrEditAddress.bind(this, i)}
              >
                <FormattedMessage id="edit" />
              </span>
              <span className="select_this_address border-bottom-2">
                <FormattedMessage id="selectThisAddress" />
              </span>
            </div>
          </div>
        </div>
      );
    });

    //日本 地址列表
    const jp_list = addressList.map((item, i) => {
      return (
        <div
          className={cn(
            'rounded address-item mb-3',
            `${item.selected ? 'selected' : 'border'}`,
            {
              forbid: !item?.validFlag && isCanVerifyBlacklistPostCode,
              'address-item-none': foledMore && !item.selected && i !== 0,
              'border-bottom-0': !item.selected && i !== addressList.length - 1
            }
          )}
          key={item.deliveryAddressId}
          onClick={
            isCanVerifyBlacklistPostCode
              ? !!item.validFlag
                ? (e) => this.selectAddress(e, i)
                : null
              : (e) => this.selectAddress(e, i)
          }
        >
          <div className="row align-items-center pt-3 pb-3 ml-3 mr-3 align_items_wrap">
            <div
              className="d-flex col-10 col-md-8 pl-1 pr-1"
              style={{ flexDirection: 'column' }}
            >
              <span>{item.consigneeName}</span>
              <span>
                {item.firstNameKatakana} {item.lastNameKatakana}
              </span>
              <span>
                {COUNTRY === 'jp' ? '〒' + item.postCode : item.postCode}
              </span>
              <p>{this.jpSetAddressFields(item)}</p>
              <p>{item.consigneeNumber}</p>
              <span>
                {item.deliveryDate && item.timeSlot ? (
                  <>
                    {/* 格式化 delivery date 格式: 星期, 15 月份 */}
                    {item.deliveryDate !== 'Unspecified' && (
                      <>
                        <FormattedMessage id="Deliverytime" />
                        {formatJPDate(item.deliveryDate)}
                      </>
                    )}

                    {item.timeSlot === 'Unspecified' ? (
                      <FormattedMessage id="Unspecified" />
                    ) : (
                      formatJPTime(item.timeSlot)
                    )}
                  </>
                ) : null}
              </span>
            </div>
            <div className="col-12 col-md-4 md:mt-0 mt-1 pl-0 pr-0 text-right font-weight-bold address_opt_btn ">
              <span
                className="border-bottom-2"
                onClick={this.addOrEditAddress.bind(this, i)}
              >
                <FormattedMessage id="edit" />
              </span>
              <span className="select_this_address border-bottom-2">
                <FormattedMessage id="selectThisAddress" />
              </span>
            </div>
          </div>
        </div>
      );
    });

    const addressListTypes = {
      jp: jp_list,
      default: _list
    };

    const addressListTypeFun = (country) => {
      let addressListType =
        addressListTypes[country] || addressListTypes['default'];
      return addressListType;
    };

    // 显示更多地址
    const _foldBtn = (
      <div
        className="font-weight-bold text-center ui-cursor-pointer more_addr_box"
        onClick={this.toggleFoldBtn}
      >
        <span>
          {foledMore ? (
            <>
              <span className="iconfont iconDown font-bold mr-1" />
              <FormattedMessage id="moreAddress" />
            </>
          ) : (
            <>
              <span className="iconfont iconUp font-bold mr-1" />
              <FormattedMessage id="unfoldAddress" />
            </>
          )}
        </span>
      </div>
    );
    // 勾选默认地址框
    const _defaultCheckBox = (
      <div className="rc-input rc-input--inline w-100 mw-100">
        <input
          id="addr-default-checkbox"
          type="checkbox"
          className="rc-input__checkbox"
          style={{ zIndex: '1', width: '90%', height: '100%' }}
          onChange={this.handleDefaultChange}
          value={deliveryAddress.isDefalt}
          checked={deliveryAddress.isDefalt}
        />
        <label
          className={`rc-input__label--inline text-break`}
          htmlFor="addr-default-checkbox"
        >
          <FormattedMessage id="setDefaultAddress" />
        </label>
      </div>
    );

    // 表单1
    const _form = (
      <fieldset
        className={`shipping-address-block rc-fieldset position-relative ${
          addOrEdit || loading ? '' : 'hidden'
        }`}
      >
        {addOrEdit && (
          <AddressForm
            key={deliveryAddress}
            ref={this.editFormRef}
            type={this.props.type}
            isLogin={true}
            initData={deliveryAddress}
            showDeliveryDateTimeSlot={this.props.showDeliveryDateTimeSlot}
            getFormAddressValidFlag={this.getFormAddressValidFlag}
            updateData={this.updateDeliveryAddress}
            updateBugData={this.updateBugData}
            calculateFreight={this.calculateFreight}
            onSearchSelectionFocus={() => {
              this.props.onSearchSelectionFocus(this.state.typeForGA);
            }}
            onSearchSelectionChange={() => {
              this.props.onSearchSelectionChange(this.state.typeForGA);
            }}
            onSearchSelectionError={(errorMessage) => {
              this.props.onSearchSelectionError(
                errorMessage,
                this.state.typeForGA
              );
            }}
          />
        )}

        {this.state.saveLoading ? (
          <Loading positionAbsolute="true" customStyle={{ zIndex: 9 }} />
        ) : null}
        <div className="rc-layout-container ml-1 mr-1">
          <div className="rc-column rc-padding-y--none rc-padding-left--none--md-down rc-padding-right--none--md-down d-flex flex-wrap justify-content-between align-items-center pl-0 pr-0">
            <div>{this.isDeliverAddress ? _defaultCheckBox : null}</div>
            {showOperateBtn ? (
              <>
                <div className="rc-md-up">
                  {allAddressList.length > 0 ? (
                    <>
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickCancel}
                        style={{ cursor: 'pointer' }}
                      >
                        <FormattedMessage id="cancel" />
                      </span>{' '}
                      <FormattedMessage id="or" />{' '}
                    </>
                  ) : null}
                  <button
                    className="rc-btn rc-btn--one submitBtn"
                    name="contactPreference"
                    type="submit"
                    onClick={this.handleSave.bind(this, {
                      isThrowError: false
                    })}
                    disabled={isValid && formAddressValid ? false : true}
                  >
                    <FormattedMessage id="save" />
                  </button>
                </div>

                <div className="rc-md-down rc-full-width text-right">
                  {addressList.length > 0 && (
                    <>
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickCancel}
                        style={{ cursor: 'pointer' }}
                      >
                        <FormattedMessage id="cancel" />
                      </span>{' '}
                      <FormattedMessage id="or" />{' '}
                    </>
                  )}

                  <button
                    className="rc-btn rc-btn--one submitBtn"
                    name="contactPreference"
                    type="submit"
                    onClick={this.handleSave.bind(this, {
                      isThrowError: false
                    })}
                    disabled={isValid && formAddressValid ? false : true}
                  >
                    <FormattedMessage id="save" />
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </fieldset>
    );

    return (
      <AddressPanelContainer
        panelStatus={panelStatus}
        titleVisible={this.props.titleVisible}
        titleId={`J-address-title-${this.props.id}`}
        isFromFelin={isFromFelin}
        isDeliverAddress={this.isDeliverAddress}
        handleClickEdit={this.handleClickEdit}
        previewJSX={
          <AddressPreview
            key={pickupData}
            form={
              shippingMethodType === 'pickup'
                ? pickupData
                : addressList.filter(
                    (a) => a.deliveryAddressId === selectedId
                  )[0]
            }
          />
        }
      >
        {this.props.children}
        <div
          className={`mt-1 ${
            this.props.visible ? '' : 'hidden'
          } payment-addressList`}
        >
          <div
            className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
              saveErrorMsg ? '' : 'hidden'
            }`}
          >
            <aside
              className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
              role="alert"
            >
              <span className="pl-0">{saveErrorMsg}</span>
              <button
                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                aria-label="Close"
                onClick={() => {
                  this.setState({ saveErrorMsg: '' });
                }}
              >
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="close" />
                </span>
              </button>
            </aside>
          </div>
          <aside
            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
              successTipVisible ? '' : 'hidden'
            }`}
            role="alert"
          >
            <span className="pl-0">
              <FormattedMessage id="saveSuccessfullly" />
            </span>
          </aside>

          {/* 俄罗斯 pickup 相关 begin */}
          {deliveryOrPickUpFlag &&
          choiseHomeDeliveryOrPickUp == 0 &&
          !panelStatus.isCompleted ? (
            <>
              <HomeDeliveryOrPickUp
                {...this.props}
                key={this.state.defaultCity}
                initData={pickupFormData}
                isLogin={true}
                defaultCity={this.state.defaultCity}
                pageType="checkout"
                updateDeliveryOrPickup={this.updateDeliveryOrPickup}
                updatePickupEditNumber={this.updatePickupEditNumber}
                updateConfirmBtnDisabled={this.updateConfirmBtnDisabled}
                updateData={this.updatePickupData}
                updateShippingMethodType={this.updateShippingMethodType}
                allAddressList={allAddressList}
                deliveryOrPickUp={showDeliveryOrPickUp}
                intlMessages={this.props.intlMessages}
                cartData={this.props.cartData}
                calculateFreight={this.recalculateFreight}
                pickupEditNumber={pickupEditNumber}
                onSearchSelectionError={(errorMessage) => {
                  this.props.onSearchSelectionError(errorMessage, 'Add');
                }}
              />
            </>
          ) : null}
          {/* 俄罗斯 pickup 相关 end */}

          {/* 编辑地址 */}
          <div
            className={cn(`rc_address_list`, {
              'addr-container': !addOrEdit,
              'pt-3 pb-3': loading
            })}
          >
            {loading ? (
              <Skeleton color="#f5f5f5" count={2} width="100%" />
            ) : this.state.errMsg ? (
              <span className="pt-2 pb-2">{this.state.errMsg}</span>
            ) : (
              <>
                {/* deliveryAddress列表编辑状态 */}
                {panelStatus.isEdit ? (
                  <>
                    {/* 俄罗斯，地址空-> 显示选择 homeDelivery 和 pickup */}
                    {/* 其他国家，不显示选择 homeDelivery 和 pickup */}
                    {!addOrEdit ? (
                      <>
                        {/* ---- homeDelivery address ---- */}
                        {showDeliveryOrPickUp == 1 &&
                        choiseHomeDeliveryOrPickUp != 0 ? (
                          <>
                            <div className="home_delivery_box home_delivery_box_border">
                              {/* 选择 homeDelivery */}
                              {window.__.env.REACT_APP_COUNTRY == 'ru' &&
                              homeAndPickup.length
                                ? homeAndPickup.map((item, index) => (
                                    <>
                                      {item.type == 'homeDelivery' ? (
                                        <div
                                          className={`rc-input rc-input--inline rc_list_radio_box ${
                                            choiseHomeDeliveryOrPickUp == 1
                                              ? 'radio_mb1'
                                              : ''
                                          }`}
                                        >
                                          <input
                                            type="radio"
                                            id={item.type + `List`}
                                            className="rc-input__radio"
                                            checked={item.selected}
                                            name="homeDeliveryOrPickUp"
                                            value={item.type || ''}
                                            onChange={this.handleRadioChange}
                                          />
                                          <label
                                            className="rc-input__label--inline hdpk_input_label"
                                            htmlFor={item.type + `List`}
                                          >
                                            <FormattedMessage id="payment.homeDelivery" />
                                          </label>
                                          {item.deliveryPrice > 0 ? (
                                            <div className="delivery_date_price">
                                              {formatMoney(item.deliveryPrice)}
                                            </div>
                                          ) : null}
                                        </div>
                                      ) : null}
                                    </>
                                  ))
                                : null}

                              {/* homeDelivery 地址 */}
                              {showDeliveryOrPickUp == 1 &&
                              choiseHomeDeliveryOrPickUp == 1 ? (
                                <>
                                  {/* 地址列表 */}
                                  <div className="addr-container-scroll">
                                    {addressList.length ? (
                                      addressListTypeFun(
                                        window.__.env.REACT_APP_COUNTRY
                                      )
                                    ) : (
                                      <div className="text-center">
                                        <FormattedMessage id="order.noDataTip" />
                                      </div>
                                    )}
                                  </div>

                                  {/* 更多地址 */}
                                  {addressList.length > 1 && _foldBtn}
                                </>
                              ) : null}
                            </div>

                            {/* 新增 homeDelivery 地址 */}
                            {choiseHomeDeliveryOrPickUp == 1 ? (
                              <div className="add_address_pk_btn">
                                <p
                                  className={`font-weight-bold red m-0 align-items-center text-nowrap flex ${
                                    addOrEdit ? 'hidden' : ''
                                  }`}
                                  onClick={this.addOrEditAddress.bind(this, -1)}
                                >
                                  <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus" />
                                  <span>
                                    <FormattedMessage id="newAddress" />
                                  </span>
                                </p>
                              </div>
                            ) : null}
                          </>
                        ) : null}

                        {/* ---- pickup address ---- */}
                        {isPickupOpen &&
                        homeAndPickup.length &&
                        choiseHomeDeliveryOrPickUp != 0
                          ? homeAndPickup.map((item, index) => (
                              <>
                                {item.type == 'pickup' ? (
                                  <div className="home_delivery_box home_delivery_box_border">
                                    {/* 选择pickup */}
                                    <div
                                      className={`rc-input rc-input--inline rc_list_radio_box ${
                                        choiseHomeDeliveryOrPickUp == 2
                                          ? 'radio_mb1'
                                          : ''
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        id={item.type + `List`}
                                        className="rc-input__radio"
                                        checked={item.selected}
                                        name="homeDeliveryOrPickUp"
                                        value={item.type || ''}
                                        onChange={this.handleRadioChange}
                                      />
                                      <label
                                        className="rc-input__label--inline hdpk_input_label"
                                        htmlFor={item.type + `List`}
                                      >
                                        <FormattedMessage id="payment.pickupDelivery" />
                                      </label>

                                      {item.deliveryPrice > 0 ? (
                                        <div className="delivery_date_price">
                                          {formatMoney(item.deliveryPrice)}
                                        </div>
                                      ) : null}
                                    </div>

                                    {choiseHomeDeliveryOrPickUp == 2 && (
                                      <>
                                        {/* pickup地址 */}
                                        {pickupAddress.map(
                                          (ele) =>
                                            ele && (
                                              <>
                                                <div className="pickup_point_info">
                                                  <p className="tit font-weight-bold">
                                                    {ele.pickupName}
                                                  </p>
                                                  <p>{ele.address1}</p>
                                                  <p>{ele.workTime}</p>
                                                </div>
                                                <div className="change_pickup_point_btn">
                                                  <button
                                                    className={`rc-btn rc-btn--md rc-btn--two`}
                                                    onClick={this.addOrEditPickupAddress.bind(
                                                      'edit'
                                                    )}
                                                  >
                                                    <FormattedMessage id="payment.changePickup" />
                                                  </button>
                                                </div>
                                              </>
                                            )
                                        )}

                                        {/* 添加 pickup 地址 */}
                                        {!pickupAddress?.length && (
                                          <div className="add_address_pk_btn pd_r1">
                                            {/* <p className={`red m-0 align-items-center text-nowrap ${addOrEdit ? 'hidden' : ''}`} */}
                                            <p
                                              className="font-weight-bold red m-0 align-items-center text-nowrap flex"
                                              onClick={this.addOrEditPickupAddress.bind(
                                                'add'
                                              )}
                                            >
                                              <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus" />
                                              <span>
                                                <FormattedMessage id="payment.addPickup" />
                                              </span>
                                            </p>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                ) : null}
                              </>
                            ))
                          : null}

                        {/* 该按钮，只用来确认地址列表 */}
                        {this.isDeliverAddress && (
                          <div className="d-flex justify-content-end mt-3 rc_btn_list_js">
                            {/* 取消按钮 */}
                            {addOrEditPickup && (
                              <div className="rc-padding-y--none d-flex align-items-center mr-4">
                                <span
                                  className="rc-styled-link"
                                  onClick={this.handleCancelAddOrEditPickup.bind()}
                                  style={{
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #D7D7D7'
                                  }}
                                >
                                  <FormattedMessage id="cancel" />
                                </span>
                              </div>
                            )}

                            {/* 确认地址按钮 */}
                            <button
                              className={`rc-btn rc-btn--one rc_btn_homedelivery_confirm ${
                                this.state.btnConfirmLoading
                                  ? 'ui-btn-loading'
                                  : ''
                              }`}
                              disabled={confirmBtnDisabled}
                              onClick={
                                shippingMethodType === 'pickup'
                                  ? this.clickConfirmPickup
                                  : this.clickConfirmAddressPanel
                              }
                            >
                              <FormattedMessage id="yes2" />
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      _form
                    )}
                  </>
                ) : null}
              </>
            )}
          </div>
          {validationLoading && <Loading positionFixed="true" />}
          {listValidationModalVisible ? this.ValidationAddressModalJSX() : null}
        </div>
      </AddressPanelContainer>
    );
  }
}

export default AddressList;
// export default injectIntl(AddressList, { forwardRef: true });
