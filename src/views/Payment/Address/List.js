import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import find from 'lodash/find';
import { getAddressList, saveAddress, editAddress } from '@/api/address';
import {
  getAddressBykeyWord,
  addressValidation,
  getDeliveryDateAndTimeSlot,
  getPickupCityList,
  getPickupCityInfo
} from '@/api';
import { shippingCalculation } from '@/api/cart';
import SearchSelection from '@/components/SearchSelection';
import {
  getDictionary,
  validData,
  matchNamefromDict,
  formatMoney,
  getDeviceType
} from '@/utils/utils';
import { searchNextConfirmPanel, isPrevReady } from '../modules/utils';
// import { ADDRESS_RULE } from '@/utils/constant';
import EditForm from '@/components/Form';
import HomeDeliveryOrPickUp from '@/components/HomeDeliveryOrPickUp';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import AddressPreview from './Preview';
import './list.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
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
    isCurrentBuyWaySubscription: false, // 是否有订阅商品
    showDeliveryDateTimeSlot: false,
    showOperateBtn: true,
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
      listSaveAddressNumber: 0,
      defaultCity: '', // 默认地址中的城市
      confirmBtnDisabled: false,
      deliveryOrPickUpFlag: false,
      selectDeliveryOrPickUp: 0, // 0：pickup和delivery home都没有，1：home delivery，2：pickup
      pickupFormData: [], // pickup 表单数据
      pickupAddress: [],
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
      isValid: false,
      formAddressValid: false,
      listBtnLoading: false,
      validationLoading: false, // 地址校验loading
      listValidationModalVisible: false, // 地址校验查询开关
      selectListValidationOption: 'suggestedAddress',
      wrongAddressMsg: null,
      validationAddress: null // 建议地址
    };
    this.addOrEditAddress = this.addOrEditAddress.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.timer = null;
    this.confirmListValidationAddress = this.confirmListValidationAddress.bind(
      this
    );
    this.editFormRef = React.createRef();
  }
  async componentDidMount() {
    const { deliveryAddress } = this.state;

    // 设置home delivery状态
    this.setRuDeliveryOrPickUp();

    getDictionary({ type: 'country' }).then((res) => {
      let cfm = deliveryAddress;
      cfm.country = res[0].value;
      cfm.countryId = res[0].id;
      this.setState({
        countryList: res,
        deliveryAddress: Object.assign(this.state.deliveryAddress, cfm)
      });
    });

    // 查询 city list
    // this.getAllCityList();

    this.queryAddressList({ init: true });

    this.setState({
      listBtnLoading: false,
      wrongAddressMsg: JSON.parse(localItemRoyal.get('rc-wrongAddressMsg'))
    });
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
  // 星期
  getWeekDay = (day) => {
    let weekArr = [
      this.getIntlMsg('payment.Sunday'),
      this.getIntlMsg('payment.Monday'),
      this.getIntlMsg('payment.Tuesday'),
      this.getIntlMsg('payment.Wednesday'),
      this.getIntlMsg('payment.Thursday'),
      this.getIntlMsg('payment.Friday'),
      this.getIntlMsg('payment.Saturday')
    ];
    return weekArr[day];
  };
  // 月份
  getMonth = (num) => {
    num = Number(num);
    let monthArr = [
      '0',
      this.getIntlMsg('payment.January'),
      this.getIntlMsg('payment.February'),
      this.getIntlMsg('payment.March'),
      this.getIntlMsg('payment.April'),
      this.getIntlMsg('payment.May'),
      this.getIntlMsg('payment.June'),
      this.getIntlMsg('payment.July'),
      this.getIntlMsg('payment.August'),
      this.getIntlMsg('payment.September'),
      this.getIntlMsg('payment.October'),
      this.getIntlMsg('payment.November'),
      this.getIntlMsg('payment.December')
    ];
    return monthArr[num];
  };
  // delivery date 格式转换: 星期, 15 月份
  getFormatDeliveryDateStr = (date) => {
    // 获取明天几号
    let mdate = new Date();
    let tomorrow = mdate.getDate() + 1;
    // 获取星期
    var week = new Date(date).getDay();
    let weekday = this.getWeekDay(week);
    // 获取月份
    let ymd = date.split('-');
    let month = this.getMonth(ymd[1]);

    // 判断是否有 ‘明天’ 的日期
    let thisday = Number(ymd[2]);
    let daystr = '';
    if (tomorrow == thisday) {
      daystr = this.getIntlMsg('payment.tomorrow');
    } else {
      daystr = weekday;
    }
    return daystr + ', ' + ymd[2] + ' ' + month;
  };
  // 查询 city list
  getAllCityList = async () => {
    try {
      const res = await getCityList();
      if (res?.context?.systemCityVO) {
        let starr = [];
        let obj = res.context.systemCityVO;
        obj.forEach((item) => {
          let res = {
            cityId: item.id,
            city: item.cityName
          };
          starr.push(res);
        });
        this.setState({
          cityList: Object.assign(obj, starr)
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // 查询地址列表
  async queryAddressList({ init = false } = {}) {
    this.setState({ loading: true });
    const { selectedId } = this.state;
    try {
      this.setState({ loading: true });
      let res = await getAddressList();
      let addressList = res.context.filter((ele) => {
        return (
          ele.type === this.props.type.toUpperCase() &&
          ele.receiveType != 'PICK_UP'
        );
      });

      const defaultAddressItem = find(addressList, (ele) => {
        return ele.isDefaltAddress === 1;
      });
      // 设置默认城市
      if (defaultAddressItem) {
        this.setState({
          defaultCity: defaultAddressItem.city
        });
      }

      let tmpId =
        selectedId ||
        (defaultAddressItem && defaultAddressItem.deliveryAddressId) ||
        (addressList.length && addressList[0].deliveryAddressId) ||
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
        find(addressList, (ele) => ele.deliveryAddressId === tmpId) || null;
      this.isDeliverAddress &&
        this.props.paymentStore.setDefaultCardDataFromAddr(tmpObj);

      this.props.updateData(tmpObj);
      let editaddObj = [];
      addressList.forEach(async (v, i) => {
        v.stateNo = v.state?.stateNo || '';
        // state对象暂时用不到
        delete v.state;
        if (
          window.__.env.REACT_APP_COUNTRY == 'ru' &&
          this.state.listSaveAddressNumber == 0
        ) {
          // 根据 address 取到 DuData返回的provinceId
          let dudata = await getAddressBykeyWord({ keyword: v.address1 });
          if (dudata?.context && dudata?.context?.addressList.length > 0) {
            let addls = dudata.context.addressList[0];
            // 再根据 provinceId 获取到 cutOffTime
            let vdres = await getDeliveryDateAndTimeSlot({
              cityNo: addls?.provinceId
            });
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
            // 修改地址
            editaddObj = await editAddress(v);
            // console.log('666  length: ', addressList.length + '  ' + i);
            // if (addressList.length == i + 1) {
            //   this.setState({
            //     loading: false
            //   });
            // }
          }
        }
      });
      // 更新delivery address保存次数
      let snum = this.props.saveAddressNumber;
      this.setState({
        listSaveAddressNumber: snum + 1
      });
      await this.props.updateSaveAddressNumber(snum + 1);
      this.setState(
        {
          addressList,
          addOrEdit: !addressList.length,
          selectedId: tmpId
        },
        () => {
          // this.updateSelectedData();
          // this.confirmToNextPanel({ init });
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

    let deliveryDate = data.deliveryDate; // deliveryDate 日期
    let timeSlot = data.timeSlot;
    // console.log('666  ----->  deliveryDate: ', deliveryDate);
    // console.log('666  ----->  timeSlot: ', timeSlot);

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

    // console.log('666  ----->  localTime: ' + localTime[0] + ' ' + localTime[1]);
    // console.log('666  ----->  dldate: ' + dldate);
    // 已过期（俄罗斯时间）
    // 当天或者当天之前的时间算已过期时间
    if (today >= dldate) {
      console.log('666  ----->  今天或者更早');
      this.showErrMsg(errMsg);
      flag = false;
    } else {
      // 其他时间
      // 明天配送的情况（当前下单时间没有超过 16 点）
      // 如果选择的时间是明天，判断当前时间是否超过16点，超过16点提示重选
      let nowTime = Number(todayHour + '' + todayMinutes);
      // console.log('666  ----->  nowTime: ', nowTime);
      let ctt = cutOffTime.split(':');
      cutOffTime
        ? (cutOffTime = Number(ctt[0] + '' + ctt[1]))
        : (cutOffTime = 1600);
      if (dldate == today + 1 && nowTime > cutOffTime) {
        console.log('666  ----->  明天');
        this.showErrMsg(errMsg);
        flag = false;
      }
      // 后天配送的情况（当前下单时间超过 16 点）
    }
    return flag;
  };
  /**
   * 会员确认地址列表信息，并展示封面
   */
  clickConfirmAddressPanel = async () => {
    const { selectedId, addressList, wrongAddressMsg } = this.state;
    const tmpObj =
      find(addressList, (ele) => ele.deliveryAddressId === selectedId) || null;
    // console.log('666 ★★ ---- 处理选择的地址数据 tmpObj: ', tmpObj);

    if (window.__.env.REACT_APP_COUNTRY == 'ru') {
      // 判断 deliveryDate、timeSlot 是否过期
      this.setState({ btnConfirmLoading: true });
      let yesOrNot = await this.deliveryDateStaleDateOrNot(tmpObj);
      this.setState({ btnConfirmLoading: false });
      if (!yesOrNot) {
        return;
      }
    }

    // 判断地址完整性
    const laddf = this.props.configStore.localAddressForm;
    let dfarr = laddf.settings;
    dfarr = (dfarr || []).filter(
      (item) => item.enableFlag == 1 && item.requiredFlag == 1
    );
    let errMsgArr = [];
    dfarr.forEach((v, i) => {
      let akey = v.fieldKey;
      // state 对应数据库字段 province
      v.fieldKey == 'state' ? (akey = 'province') : v.fieldKey;
      // region 对应数据库字段 area
      v.fieldKey == 'region' ? (akey = 'area') : v.fieldKey;
      // phoneNumber 对应数据库字段 consigneeNumber
      v.fieldKey == 'phoneNumber' ? (akey = 'consigneeNumber') : v.fieldKey;

      let fky = wrongAddressMsg[akey];
      // 判断city和cityId 是否均为空
      if (v.fieldKey == 'city') {
        tmpObj.city || tmpObj.cityId ? (akey = '') : akey;
      }
      // 判断country和countryId 是否均为空
      if (v.fieldKey == 'country') {
        tmpObj.country || tmpObj.countryId ? (akey = '') : akey;
      }
      if (akey) tmpObj[akey] ? '' : errMsgArr.push(fky);
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
  // 处理选择的地址数据
  updateSelectedData(str) {
    const { selectedId, addressList, wrongAddressMsg } = this.state;
    const tmpObj =
      find(addressList, (ele) => ele.deliveryAddressId === selectedId) || null;
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
        this.props.calculateFreight(tmpObj);
      }
      this.isDeliverAddress &&
        this.props.paymentStore.setDefaultCardDataFromAddr(tmpObj);
    }
  }
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

    data.street ? '' : errArr.push(streets);
    data.postCode ? '' : errArr.push(postCode);
    data.house ? '' : errArr.push(house);
    data.city ? '' : errArr.push(city);
    data.province ? '' : errArr.push(province);
    data.settlement ? '' : errArr.push(settlement);

    return errArr.join(',');
  };
  // 根据address1查询地址信息，再根据查到的信息计算运费
  getAddressListByKeyWord = async (obj) => {
    const { addressList } = this.state;
    // console.log('183 ★★ -------------- 根据address1查询地址信息 obj: ', obj);
    try {
      let address1 = obj.address1;
      let res = await getAddressBykeyWord({ keyword: address1 });
      if (res?.context && res?.context?.addressList.length > 0) {
        // 根据地址获取到的地址列表匹配当前选中的地址
        let addls = res.context.addressList;
        let dladdress = Object.assign({}, obj);
        // addls.forEach((item) => {
        //   if (item.unrestrictedValue == address1) {
        //     dladdress.DuData = item;
        //   }
        // });
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
                this.props.calculateFreight(this.state.deliveryAddress);
                this.isDeliverAddress &&
                  this.props.paymentStore.setDefaultCardDataFromAddr(
                    this.state.deliveryAddress
                  );
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
    // console.log('214 ★★ -------------- 计算运费 obj: ', obj);
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
                this.props.calculateFreight(this.state.deliveryAddress);
                this.isDeliverAddress &&
                  this.props.paymentStore.setDefaultCardDataFromAddr(
                    this.state.deliveryAddress
                  );
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
      selectDeliveryOrPickUp: 0,
      deliveryOrPickUpFlag: false
    });
  }
  // 选择地址
  selectAddress(e, idx) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let { addressList } = this.state;
    Array.from(addressList, (a) => (a.selected = false));
    addressList[idx].selected = true;
    this.setState(
      {
        addressList: addressList,
        selectedId: addressList[idx].deliveryAddressId
      },
      () => {
        this.updateSelectedData();
      }
    );
  }
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

    if (idx > -1) {
      const tmp = addressList[idx];
      tmpDeliveryAddress = {
        firstName: tmp.firstName,
        lastName: tmp.lastName,
        address1: tmp.address1,
        address2: tmp.address2,
        rfc: tmp.rfc,
        countryId: tmp.countryId,
        country: tmp.country,
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
        email: tmp.email
      };
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
  updateDeliveryAddress = async (data) => {
    try {
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      this.setState({
        isValid: false
      });
      await validData(data.formRule, data); // 数据验证

      this.setState({ isValid: true, saveErrorMsg: '' }, () => {
        // 设置按钮状态
        this.props.updateFormValidStatus(this.state.isValid);
        this.props.updateData(data);
      });
    } catch (err) {
      console.warn(' err msg: ', err);
      this.setState({ isValid: false }, () => {
        this.props.updateFormValidStatus(this.state.isValid);
      });
    } finally {
      this.setState({ deliveryAddress: data });
    }
  };
  // 计算运费
  calculateFreight = (data) => {
    this.props.calculateFreight(data);
  };
  // 俄罗斯地址校验flag，控制按钮是否可用
  getFormAddressValidFlag = (flag) => {
    // console.log('address1地址校验flag : ', flag);
    const { deliveryAddress } = this.state;
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
      const originData = addressList[this.currentOperateIdx];
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
      // let params = {
      //   address1: deliveryAddress.address1,
      //   address2: deliveryAddress.address2,
      //   areaId: deliveryAddress.areaId,
      //   firstName: deliveryAddress.firstName,
      //   lastName: deliveryAddress.lastName,
      //   countryId: deliveryAddress.countryId,
      //   country: deliveryAddress.country,
      //   cityId: deliveryAddress.cityId,
      //   city: deliveryAddress.city,
      //   consigneeName: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
      //   consigneeNumber: deliveryAddress.phoneNumber,
      //   customerId: originData ? originData.customerId : '',
      //   deliveryAddress: deliveryAddress.address1 + ' ' + deliveryAddress.address2,
      //   deliveryAddressId: originData ? originData.deliveryAddressId : '',
      //   isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0,
      //   postCode: deliveryAddress.postCode,
      //   rfc: deliveryAddress.rfc,
      //   email: deliveryAddress.email,
      //   comment: deliveryAddress?.comment,

      //   region: deliveryAddress.province, // DuData相关参数
      //   area: deliveryAddress.area,
      //   settlement: deliveryAddress.settlement,
      //   street: deliveryAddress.street || '',
      //   house: deliveryAddress.house || '',
      //   housing: deliveryAddress.housing || '',
      //   entrance: deliveryAddress.entrance || '',
      //   apartment: deliveryAddress.apartment || '',

      //   deliveryDate: deliveryAddress.deliveryDate || '',
      //   timeSlot: deliveryAddress.timeSlot || '',
      //   receiveType: deliveryAddress.receiveType || '',

      //   type: this.props.type.toUpperCase()
      // };

      const tmpPromise =
        this.currentOperateIdx > -1 ? editAddress : saveAddress;
      let res = await tmpPromise(params);
      if (res.context.deliveryAddressId) {
        this.setState({
          selectedId: res.context.deliveryAddressId
        });
      }
      this.isDeliverAddress && this.scrollToTitle();
      await this.queryAddressList();
      this.showSuccessMsg();
      this.setState({
        addOrEdit: false,
        saveLoading: false
      });

      this.clickConfirmAddressPanel();
    } catch (err) {
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
      if (deliveryAddress?.deliveryDate) {
        // 判断 deliveryDate 是否过期
        if (!this.deliveryDateStaleDateOrNot(deliveryAddress)) {
          return;
        }
      }
      // 地址验证
      this.setState({
        saveLoading: true
      });
      const res = await this.props.addressStore.validAddr({
        data: deliveryAddress
      });
      await this.getListValidationData(res, true);
    } catch (err) {
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
    const {
      deliveryAddress,
      selectListValidationOption,
      validationAddress
    } = this.state;
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
    this.setState((curState) => ({ foledMore: !curState.foledMore }));
  };
  titleJSXForPrepare() {
    const { titleVisible } = this.props;
    return (
      <h5 className={`mb-0 text-nowrap`}>
        {titleVisible ? (
          <>
            <em className="rc-icon rc-indoors--xs rc-iconography" />{' '}
            <FormattedMessage id="payment.deliveryTitle" />
          </>
        ) : null}
      </h5>
    );
  }
  titleJSXForEdit() {
    const { titleVisible } = this.props;
    const { addOrEdit, selectDeliveryOrPickUp } = this.state;
    return (
      <>
        <h5 className={`mb-0 text-nowrap red`}>
          {titleVisible ? (
            <>
              <em className="rc-icon rc-indoors--xs rc-brand1" />{' '}
              <FormattedMessage id="payment.deliveryTitle" />
            </>
          ) : null}
        </h5>
        {selectDeliveryOrPickUp == 1 && (
          <p
            className={`red rc-margin-top--xs ui-cursor-pointer inlineblock m-0 align-items-center text-nowrap ${
              addOrEdit ? 'hidden' : ''
            }`}
            onClick={this.addOrEditAddress.bind(this, -1)}
          >
            <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus" />
            <span>
              <FormattedMessage id="newAddress" />
            </span>
          </p>
        )}
      </>
    );
  }
  titleJSXForCompeleted() {
    const { titleVisible } = this.props;
    return (
      <>
        <h5 className={`mb-0 text-nowrap`}>
          {titleVisible ? (
            <>
              <em className="rc-icon rc-indoors--xs rc-iconography" />{' '}
              <FormattedMessage id="payment.deliveryTitle" />
              <span className="iconfont font-weight-bold green ml-2">
                &#xe68c;
              </span>
            </>
          ) : null}
        </h5>{' '}
        <p onClick={this.handleClickEdit} className="rc-styled-link mb-1">
          <FormattedMessage id="edit" />
        </p>
      </>
    );
  }
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
    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore.localAddressForm;
    let farr = [data.address1, data.city];
    if (window.__.env.REACT_APP_COUNTRY == 'us') {
      farr.push(data.province);
    } else {
      let country = matchNamefromDict(this.state.countryList, data.countryId);
      farr.unshift(country);
      if (localAddressForm['region']) {
        farr.push(data.area);
      }
    }
    return farr.join(',');
  };

  // ************ pick up 相关
  // 设置home delivery状态
  setRuDeliveryOrPickUp() {
    let deliveryOrPickUp = 0;
    let btndisabled = false;
    if (window.__.env.REACT_APP_COUNTRY === 'ru') {
      deliveryOrPickUp = 0; // both not
      btndisabled = true;
      this.setState({
        deliveryOrPickUpFlag: true
      });
    } else {
      deliveryOrPickUp = 1; // home delivery
      btndisabled = false;
    }
    this.setState({
      selectDeliveryOrPickUp: deliveryOrPickUp,
      confirmBtnDisabled: btndisabled
    });
  }
  // 修改按钮状态
  updateConfirmBtnDisabled = (flag) => {
    this.setState({
      confirmBtnDisabled: flag
    });
  };
  // 更新pickup数据
  updatePickupData = (data) => {
    // console.log('666 updatePickupData: ', data);
    this.setState({
      pickupFormData: data
    });
  };
  // 更新 selectDeliveryOrPickUp
  updateDeliveryOrPickup = (num) => {
    this.setState({
      selectDeliveryOrPickUp: num
    });
  };
  // 确认 pickup
  clickConfirmPickup = async () => {
    const { deliveryAddress, pickupFormData } = this.state;
    this.setState({
      btnConfirmLoading: true,
      saveLoading: true
    });
    try {
      let receiveType = pickupFormData.receiveType;
      let deliveryAdd = Object.assign({}, deliveryAddress, {
        firstName: pickupFormData.firstName,
        lastName: pickupFormData.lastName,
        consigneeNumber: pickupFormData.phoneNumber,
        consigneeName: pickupFormData.firstName + ' ' + pickupFormData.lastName,
        address1: pickupFormData.address1,
        deliveryAddress: pickupFormData.address1,
        city: pickupFormData.city,
        comment: pickupFormData.comment,
        pickupCode: pickupFormData.pickupCode, // 快递公司code
        workTime: pickupFormData.workTime, // 快递公司上班时间
        receiveType: pickupFormData.receiveType, // HOME_DELIVERY , PICK_UP
        deliverWay: receiveType == 'HOME_DELIVERY' ? 2 : 3, // 1: EXPRESS, 2: HOMEDELIVERY , 3: PICKUP
        type: 'DELIVERY',
        deliveryDate: '',
        timeSlot: '',
        isDefaltAddress: 0
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
        let selectedId = res.context.deliveryAddressId;
        this.setState({
          selectedId: selectedId
        });

        this.setState(
          {
            pickupAddress: pickupFormData
          },
          () => {
            console.log('666 ★★★  pickupFormData: ', this.state.pickupFormData);
            console.log('666 ★★★  deliveryAdd: ', deliveryAdd);

            // pickup 相关信息传到 Payment
            deliveryAdd['pickup'] = pickupFormData.pickup;
            this.props.updateData(deliveryAdd);

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
              selectDeliveryOrPickUp: 0,
              deliveryOrPickUpFlag: false
            });

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
        saveLoading: false
      });
    }
  };
  render() {
    const { panelStatus } = this;
    const { showOperateBtn } = this.props;
    const {
      deliveryOrPickUpFlag,
      confirmBtnDisabled,
      selectDeliveryOrPickUp,
      isValid,
      formAddressValid,
      deliveryAddress,
      addOrEdit,
      loading,
      foledMore,
      addressList,
      saveErrorMsg,
      successTipVisible,
      selectedId,
      validationLoading,
      listValidationModalVisible,
      pickupFormData,
      pickupAddress
    } = this.state;

    const _list = addressList.map((item, i) => (
      <div
        className={`rounded address-item ${
          item.selected ? 'selected' : 'border'
        } ${foledMore && !item.selected ? 'hidden' : ''} ${
          !item.selected && i !== addressList.length - 1
            ? 'border-bottom-0'
            : ''
        }`}
        key={item.deliveryAddressId}
        onClick={(e) => this.selectAddress(e, i)}
      >
        <div className="row align-items-center pt-3 pb-3 ml-2 mr-2">
          <div className="d-flex align-items-center justify-content-center col-2 col-md-1 address-name pl-0 pr-0">
            {item.selected ? (
              <svg width="24" height="32">
                <path
                  d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0"
                  fill="#E2001A"
                  fillRule="evenodd"
                />
              </svg>
            ) : (
              <svg width="24" height="32">
                <path
                  d="M12 15c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m0-15C5.383 0 0 5.109 0 11.388c0 5.227 7.216 16.08 9.744 19.47A2.793 2.793 0 0 0 12 32c.893 0 1.715-.416 2.256-1.142C16.784 27.468 24 16.615 24 11.388 24 5.109 18.617 0 12 0"
                  fill="#c4c4c4"
                  fillRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div
            className="col-10 col-md-8 pl-1 pr-1"
            style={{
              wordBreak: 'keep-all'
              // overflow: 'hidden',
              // whiteSpace: 'nowrap',
              // textOverflow: 'ellipsis'
            }}
          >
            <span>{[item.consigneeName, item.consigneeNumber].join(', ')}</span>
            {item.isDefaltAddress === 1 ? (
              <span className="icon-default rc-border-colour--brand1 rc-text-colour--brand1">
                <FormattedMessage id="default" />
              </span>
            ) : null}
            <br />
            <p>
              {this.setAddressFields(item)}
              {/* {window.__.env.REACT_APP_COUNTRY == 'us' ? [
                item.address1,
                item.city,
                item.province
              ].join(', ')
                : [
                  matchNamefromDict(this.state.countryList, item.countryId),
                  item.address1,
                  item.city,
                  localAddressForm['region'] && item.area,
                ].join(', ')} */}
              {item.deliveryDate && item.timeSlot ? (
                <>
                  <br />
                  {/* 格式化 delivery date 格式: 星期, 15 月份 */}
                  {this.getFormatDeliveryDateStr(item.deliveryDate)}{' '}
                  {item.timeSlot}
                </>
              ) : null}
              {item.selected &&
              item.timeSlot &&
              this.props.saveAddressNumber < 2 ? (
                <span style={{ display: 'block' }}>
                  <FormattedMessage id="payment.editDeliveryDateAndTime" />
                </span>
              ) : null}
            </p>
          </div>
          <div className="col-12 col-md-3 mt-md-0 mt-1 text-right">
            <span
              className="addr-btn-edit border-left pl-2"
              onClick={this.addOrEditAddress.bind(this, i)}
            >
              <FormattedMessage id="edit" />
            </span>
          </div>
        </div>
      </div>
    ));
    const _foldBtn = (
      <div
        className="text-center pt-2 pb-2 ui-cursor-pointer"
        onClick={this.toggleFoldBtn}
      >
        <span>
          {foledMore ? (
            <>
              <FormattedMessage id="moreAddress" />
              &nbsp;
              <b className="addr-switch switch-on" />
            </>
          ) : (
            <>
              <FormattedMessage id="unfoldAddress" />
              <b className="addr-switch switch-off" />
            </>
          )}
        </span>
      </div>
    );
    const _defaultCheckBox = (
      <div className="rc-input rc-input--inline w-100 mw-100">
        {
          <input
            id="addr-default-checkbox"
            type="checkbox"
            className="rc-input__checkbox"
            onChange={this.handleDefaultChange}
            value={deliveryAddress.isDefalt}
            checked={deliveryAddress.isDefalt}
          />
        }
        <label
          className={`rc-input__label--inline text-break`}
          htmlFor="addr-default-checkbox"
        >
          <FormattedMessage id="setDefaultAddress" />
        </label>
      </div>
    );

    const _title = (
      <div
        id={`J-address-title-${this.props.id}`}
        className="bg-transparent d-flex justify-content-between align-items-center flex-wrap"
      >
        {panelStatus.isPrepare
          ? this.titleJSXForPrepare()
          : panelStatus.isEdit
          ? this.titleJSXForEdit()
          : panelStatus.isCompleted
          ? this.titleJSXForCompeleted()
          : null}
      </div>
    );
    const _form = (
      <fieldset
        className={`shipping-address-block rc-fieldset position-relative ${
          addOrEdit || loading ? '' : 'hidden'
        }`}
      >
        {addOrEdit && (
          <EditForm
            ref={this.editFormRef}
            type={this.props.type}
            isLogin={true}
            initData={deliveryAddress}
            showDeliveryDateTimeSlot={this.props.showDeliveryDateTimeSlot}
            getFormAddressValidFlag={this.getFormAddressValidFlag}
            updateData={this.updateDeliveryAddress}
            calculateFreight={this.calculateFreight}
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
                  {addressList.length > 0 && (
                    <>
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickCancel}
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
                <div className="rc-md-down rc-full-width text-right">
                  {addressList.length > 0 && (
                    <>
                      <span
                        className="rc-styled-link"
                        onClick={this.handleClickCancel}
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
      <>
        {this.props.children}
        <div
          className={`mt-1 ${
            this.props.visible ? '' : 'hidden'
          } payment-addressList`}
        >
          {_title}
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
          {deliveryOrPickUpFlag && (
            <>
              <HomeDeliveryOrPickUp
                key={this.state.defaultCity}
                defaultCity={this.state.defaultCity}
                isCurrentBuyWaySubscription={
                  this.props.isCurrentBuyWaySubscription
                }
                updateDeliveryOrPickup={this.updateDeliveryOrPickup}
                updateConfirmBtnDisabled={this.updateConfirmBtnDisabled}
                updateData={this.updatePickupData}
                deliveryOrPickUp={selectDeliveryOrPickUp}
                intlMessages={this.props.intlMessages}
              />
            </>
          )}
          {/* 俄罗斯 pickup 相关 end */}

          <div
            className={`${!addOrEdit ? 'addr-container' : ''} ${
              loading ? 'pt-3 pb-3' : ''
            }`}
          >
            {loading ? (
              <Skeleton color="#f5f5f5" count={2} width="100%" />
            ) : this.state.errMsg ? (
              <span className="pt-2 pb-2">{this.state.errMsg}</span>
            ) : (
              <>
                {panelStatus.isEdit ? (
                  <>
                    {!addOrEdit ? (
                      addressList.length ? (
                        <>
                          {selectDeliveryOrPickUp == 1 && (
                            <>
                              {/* 地址列表 */}
                              <div className="addr-container-scroll">
                                {_list}
                              </div>

                              {/* 更多地址 */}
                              {addressList.length > 1 && _foldBtn}
                            </>
                          )}

                          {/* 该按钮，只用来确认地址列表 */}
                          {this.isDeliverAddress && (
                            <div className="d-flex justify-content-end mt-3 rc_btn_list_js">
                              <button
                                className={`rc-btn rc-btn--one rc_btn_list_confirm ${
                                  this.state.btnConfirmLoading
                                    ? 'ui-btn-loading'
                                    : ''
                                }`}
                                disabled={confirmBtnDisabled}
                                onClick={
                                  pickupFormData?.receiveType == 'PICK_UP'
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
                        <FormattedMessage id="order.noDataTip" />
                      )
                    ) : null}

                    {_form}
                  </>
                ) : panelStatus.isCompleted ? (
                  <>
                    <AddressPreview
                      key={this.state.pickupAddress}
                      form={
                        pickupFormData?.receiveType == 'PICK_UP'
                          ? pickupAddress || null
                          : addressList.filter(
                              (a) => a.deliveryAddressId === selectedId
                            )[0] || null
                      }
                    />
                  </>
                ) : null}
              </>
            )}
          </div>
          {validationLoading && <Loading positionFixed="true" />}
          {listValidationModalVisible ? this.ValidationAddressModalJSX() : null}
        </div>
      </>
    );
  }
}

export default AddressList;
