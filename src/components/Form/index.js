/*********
 *
 * File Name: Address Form
 * Create Time: ‎2021-‎4-‎20
 * Author: kzeng@deloitte.com.cn
 * Version: V1.0
 *
 * Description:
 * 1、本组件在需要编辑 deliveryAddress 和 billingAddress 及其他编辑地址的地方调用。
 * 2、父组件确认地址按钮由（isValid、formAddressValid）两个变量控制。
 * 3、imask.js 插件，设置文本框输入内容格式。https://imask.js.org/
 *
 *********/
import React from 'react';
import locales from '@/lang';
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
import SearchSelection from '@/components/SearchSelection';
import {
  getDictionary,
  validData,
  datePickerConfig,
  getZoneTime,
  getDeviceType,
  isCanVerifyBlacklistPostCode
} from '@/utils/utils';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Loading from '@/components/Loading';
import {
  getRegionByCityId,
  getProvincesList,
  getAddressBykeyWord,
  getCityList,
  getDeliveryDateAndTimeSlot,
  validPostCodeBlock,
  DQEAddressList
} from '@/api/address';
import { shippingCalculation } from '@/api/cart';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import IMask from 'imask';
import debounce from 'lodash/debounce';
import './index.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
const CURRENT_LANGFILE = locales;
let tempolineCache = {};
@inject('configStore')
@injectIntl
@observer
class Form extends React.Component {
  static defaultProps = {
    type: 'billing',
    initData: null,
    personalData: false,
    showDeliveryDateTimeSlot: false, // 控制是否展示 delivery date 和 time slot
    isCyberBillingAddress: false,
    isLogin: false,
    updateData: () => {},
    calculateFreight: () => {},
    getFormAddressValidFlag: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: false,
      formLoading: false,
      formType: this.props.configStore.addressFormType,
      caninForm: {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        address1: '',
        address2: '',
        country: '',
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
        cityId: '',
        city: '',
        areaId: '',
        area: '',
        regionId: '',
        region: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        stateId: '',
        postCode: '',
        phoneNumber: '',
        consigneeNumber: '',
        entrance: '',
        apartment: '',
        comment: '',
        minDeliveryTime: 0,
        maxDeliveryTime: 0,
        deliveryDate: '',
        deliveryDateId: 0,
        timeSlot: '',
        timeSlotId: 0,
        receiveType: 'HOME_DELIVERY', //  HOME_DELIVERY、PICK_UP ********************** 选择deliveryDate或者pickup时
        pickupCode: null, // 快递公司code
        pickupName: '', // 快递公司
        DuData: null, // 俄罗斯DuData
        formRule: [], // form表单校验规则
        workTime: '', // pickup workTime
        provinceIdStr: '', // pickup计算价格使用
        cityIdStr: '', // pickup计算价格使用
        areaIdStr: '', // pickup计算价格使用
        settlementIdStr: '', // pickup计算价格使用
        isDefalt: false
      },
      addressSettings: [],
      formList: [],
      addressList: [], // 地址列表
      countryList: [], // 国家列表
      stateList: [], // 省份列表
      cityList: [], // city列表
      regionList: [], // region列表
      address1Data: [], // DuData address1
      isDeliveryDateAndTimeSlot: false,
      deliveryDataTimeSlotList: [],
      deliveryDateList: [], // delivery date
      timeSlotList: [], // time slot
      errMsgObj: {}
    };
  }
  componentDidMount() {
    let timer = setInterval(() => {
      let datePickerDom = document.querySelector('.receiveDate');
      // datePickerDom.disabled = true;
      if (datePickerDom) {
        datePickerDom.placeholder = datePickerConfig.format.toUpperCase();
        clearInterval(timer);
      }
    }, 3000);
    const { initData = {} } = this.props;
    const { caninForm } = this.state;
    this.setState({
      formLoading: true
    });
    // 查询国家
    this.getCountryList();
    this.debounceValidvalidationData = debounce(this.validvalidationData, 500);

    // 美国 state 字段统一为 province
    caninForm.stateId = initData.provinceId;
    caninForm.stateNo = initData.provinceNo;
    caninForm.state = initData.province;
    initData.stateId = initData.provinceId;
    initData.stateNo = initData.provinceNo;
    initData.state = initData.province;

    // 土耳其 region 存在 area 中
    caninForm.regionId = initData.areaId;
    initData.regionId = initData.areaId;

    // deliveryDate和timeSlot有值就显示
    // if (initData.deliveryDate && initData.timeSlot && this.props.showDeliveryDateTimeSlot) {
    console.log('666 >>> country: ', window.__.env.REACT_APP_COUNTRY);
    console.log('666 >>> formType: ', this.state.formType);
    // MANUALLY 、 AUTOMATICALLY
    if (this.state.formType === 'AUTOMATICALLY') {
      this.getAddressListByKeyWord(initData.address1);
    }
    // console.log('666  ★ EditForm initData: ', initData);
    // console.log('666 ---- ★ EditForm caninForm: ', caninForm);
    this.setState(
      {
        caninForm: Object.assign(caninForm, initData)
      },
      () => {
        this.updateDataToProps(this.state.caninForm);
        // 获取 session 存储的 address form 数据并处理
        this.setAddressFormData();
      }
    );

    // 如果有areaId
    if (initData?.areaId) {
      this.getRegionDataByCityId(initData.cityId);
    }

    // 重置参数
    this.props.getFormAddressValidFlag(false);
  }

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
  // 根据address1查询地址信息
  getAddressListByKeyWord = async (address1) => {
    let res = null;
    try {
      res = await getAddressBykeyWord({ keyword: address1 });
      if (res?.context && res?.context?.addressList.length) {
        let addls = res.context.addressList;
        // 给查询到的地址拼接 errMsg
        addls.forEach((v, i) => {
          v = this.setDuDataAddressErrMsg(v);
        });
        await this.handleAddressInputChange(addls[0]);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // 0、获取 DeliveryDate 和 TimeSlot
  getDeliveryDateAndTimeSlotData = async (str) => {
    const { caninForm } = this.state;
    let res = null;
    try {
      res = await getDeliveryDateAndTimeSlot({ cityNo: str });
      let flag = false;
      let alldata = {}; // 全部数据
      let ddlist = []; // delivery date
      let tslist = []; // time slot

      let obj = Object.assign({}, caninForm);
      if (res.context && res.context?.timeSlots?.length) {
        flag = true; // 标记
        let robj = res.context.timeSlots;
        robj.forEach((v, i) => {
          // 格式化 delivery date 格式: 星期, 15 月份
          let datestr = this.getFormatDeliveryDateStr(v.date);
          // 所有数据
          alldata[v.date] = v.dateTimeInfos;
          ddlist.push({
            id: datestr,
            name: datestr,
            no: v.date
          });
          if (obj.deliveryDate == v.date) {
            obj.deliveryDateId = datestr;
          }
        });
        // delivery date为空或者过期设置第一条数据为默认值
        if (!obj.deliveryDate || !alldata[obj.deliveryDate]) {
          obj.deliveryDateId = ddlist[0].id;
          obj.deliveryDate = ddlist[0].no;
        }

        // 设置 time slot
        let tsFlag = false;
        alldata[obj.deliveryDate]?.forEach((v, i) => {
          let setime = v.startTime + '-' + v.endTime;
          tslist.push({
            id: setime,
            name: setime,
            startTime: v.startTime,
            endTime: v.endTime,
            sort: v.sort
          });
          if (setime == obj.timeSlot) {
            obj.timeSlotId = setime;
            obj.timeSlot = setime;
            tsFlag = true;
          }
        });
        // time slot为空或者过期设置第一条数据为默认值
        if (!obj.timeSlot || !alldata[obj.deliveryDate] || !tsFlag) {
          obj.timeSlotId = tslist[0].id;
          obj.timeSlot = tslist[0].name;
        }
      } else {
        obj.deliveryDate = '';
        obj.deliveryDateId = 0;
        obj.timeSlot = '';
        obj.timeSlotId = 0;
      }
      this.setState(
        {
          caninForm: Object.assign({}, obj),
          isDeliveryDateAndTimeSlot: flag,
          deliveryDataTimeSlotList: alldata,
          deliveryDateList: ddlist,
          timeSlotList: tslist
        },
        () => {
          this.updateDataToProps(this.state.caninForm);
        }
      );
    } catch (err) {
      // console.warn(err);
      this.setState({
        isDeliveryDateAndTimeSlot: false
      });
    }
  };
  // 设置手机号输入限制
  setPhoneNumberReg = () => {
    let element = document.getElementById('phoneNumberShipping');
    let maskOptions = [];
    let phoneReg = '';
    switch (window.__.env.REACT_APP_COUNTRY) {
      case 'fr':
        phoneReg = [
          { mask: '(+33) 0 00 00 00 00' },
          { mask: '(+33) 00 00 00 00 00' }
        ];
        break;
      case 'us':
        phoneReg = [{ mask: '000-000-0000' }];
        break;
      case 'ru':
        phoneReg = [{ mask: '+{7} (000) 000-00-00' }];
        break;
      case 'mx':
        phoneReg = [{ mask: '+(52) 000 000 0000' }];
        break;
      case 'tr':
        phoneReg = [{ mask: '{0} (000) 000-00-00' }];
        break;
      default:
        phoneReg = [{ mask: '00000000000' }];
        break;
    }
    maskOptions = {
      mask: phoneReg
    };
    let pval = IMask(element, maskOptions);
  };
  // 1、获取 session 存储的 address form 数据并处理
  setAddressFormData = async () => {
    const { caninForm } = this.state;
    // todo
    await this.props.configStore.getSystemFormConfig();
    const localAddressForm = this.props.configStore.localAddressForm;
    // 表单类型，手动输入地址: MANUALLY，自动填充地址: AUTOMATICALLY
    // console.log('获取 session 存储的需要显示的地址字段: ', localAddressForm);
    if (localAddressForm?.settings) {
      this.setState(
        {
          addressSettings: localAddressForm.settings
        },
        () => {
          let narr = null;
          narr = this.state.addressSettings.filter(
            (item) => item.enableFlag == 1
          );
          // 过滤掉不可用的
          if (this.props.isCyberBillingAddress) {
            // 美国加卡不要电话号码
            narr = narr.filter((item) => item.fieldKey != 'phoneNumber');
          } else if (this.props.personalData) {
            // persnalData不需要展示comment
            narr = narr.filter((item) => item.fieldKey != 'comment');
            if (window.__.env.REACT_APP_COUNTRY == 'us') {
              // 美国个人中心只展示：firstName、lastName
              narr = narr.filter((e, i) => {
                return e.fieldKey == 'firstName' || e.fieldKey == 'lastName';
              });
            }
          }

          // 格式化表单json
          let ress = this.formListFormat(narr);
          this.setState(
            {
              formList: ress
            },
            () => {
              if (localAddressForm.formType.manually == 1) {
                // 查询州列表（美国 state）
                this.getUsStateList();
                // 设置控制按钮可点的其中一个参数为 true
                // this.props.getFormAddressValidFlag(true);
              }
              this.setState(
                {
                  formLoading: false
                },
                () => {
                  this.updateDataToProps(caninForm);
                }
              );
              ress.forEach((item) => {
                if (item.fieldKey == 'phoneNumber' && item.requiredFlag == 1) {
                  // 设置手机号输入限制
                  setTimeout(() => {
                    this.setPhoneNumberReg();
                  }, 1000);
                }
              });
            }
          );
        }
      );
    }
    this.setState({
      formLoading: false
    });
  };
  // 2、格式化表单json
  formListFormat(array) {
    const { caninForm, errMsgObj } = this.state;
    let rule = [];
    let ruleTimeSlot = [];
    let cfdata = Object.assign({}, caninForm);

    // 前端写死的文本框默认数据
    let defaultObj = {
      inputType: 0,
      maxLength: 50,
      filedType: 'text',
      requiredFlag: 1,
      enableFlag: 1,
      dataSource: 0,
      apiName: null,
      pageRow: 0,
      pageCol: 0,
      occupancyNum: 1,
      storeId: null,
      createTime: '',
      updateTime: '',
      delFlag: 0,
      delTime: null,
      regExp: {},
      errMsg: ''
    };
    // 绑卡页面添加 email
    let emailObj = Object.assign(
      {
        id: 99999999,
        sequence: 99999999,
        fieldKey: 'email',
        fieldName: 'email',
        inputFreeTextFlag: 1,
        inputSearchBoxFlag: 0,
        inputDropDownBoxFlag: 0
      },
      defaultObj
    );
    // My Contact Information
    // let birthDay = Object.assign(
    //   {
    //     id: 99999998,
    //     sequence: 99999998,
    //     fieldKey: 'account.birthDate',
    //     fieldName: 'birthDate',
    //     inputFreeTextFlag: 0,
    //     inputSearchBoxFlag: 0,
    //     inputDropDownBoxFlag: 0
    //   },
    //   defaultObj
    // );
    // let email = Object.assign(
    //   {
    //     id: 99999997,
    //     sequence: 99999997,
    //     fieldKey: 'Email',
    //     fieldName: 'email',
    //     inputFreeTextFlag: 1,
    //     inputSearchBoxFlag: 0,
    //     inputDropDownBoxFlag: 0,
    //     disabled: true,
    //   },
    //   defaultObj
    // );
    // if (this.props.personalData) {
    //   array.push(birthDay);
    //   array.push(email);
    // }

    // delivery date
    let deliveryDateObj = Object.assign(
      {
        id: 99999998,
        sequence: 12,
        fieldKey: 'deliveryDate',
        fieldName: 'deliveryDate',
        inputFreeTextFlag: 0,
        inputSearchBoxFlag: 0,
        inputDropDownBoxFlag: 1
      },
      defaultObj
    );
    // time slot
    let timeSlotObj = Object.assign(
      {
        id: 99999997,
        sequence: 12,
        fieldKey: 'timeSlot',
        fieldName: 'timeSlot',
        inputFreeTextFlag: 0,
        inputSearchBoxFlag: 0,
        inputDropDownBoxFlag: 1
      },
      defaultObj
    );

    if (this.props.isCyberBillingAddress) {
      array.push(emailObj);
    }

    if (
      window.__.env.REACT_APP_COUNTRY == 'ru' &&
      !this.props.isCyberBillingAddress &&
      !this.props.personalData
    ) {
      array.push(deliveryDateObj);
      array.push(timeSlotObj);
    }
    array.sort((a, b) => a.sequence - b.sequence);
    array.forEach((item) => {
      // filedType '字段类型:0.text,1.number'
      // item.filedType = item.filedType == 0 ? 'text' : 'number';
      item.filedType = 'text';
      let regExp = '';
      let errMsg = '';
      switch (item.fieldKey) {
        case 'postCode':
          window.__.env.REACT_APP_COUNTRY == 'us'
            ? (regExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/)
            : (regExp = /^\d{5}$/);
          errMsg = CURRENT_LANGFILE['enterCorrectPostCode'];
          break;
        case 'email':
          regExp = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
          errMsg = CURRENT_LANGFILE['pleaseEnterTheCorrectEmail'];
          break;
        case 'phoneNumber':
          if (window.__.env.REACT_APP_COUNTRY == 'fr') {
            // 法国
            regExp = /^\(\+[3][3]\)[\s](([0][1-9])|[1-9])[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/;
          } else if (window.__.env.REACT_APP_COUNTRY == 'us') {
            // 美国
            regExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          } else if (window.__.env.REACT_APP_COUNTRY == 'mx') {
            // 墨西哥
            regExp = /^\+\([5][2]\)[\s\-][0-9]{3}[\s\-][0-9]{3}[\s\-][0-9]{4}$/;
          } else if (window.__.env.REACT_APP_COUNTRY == 'ru') {
            // 俄罗斯
            regExp = /^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          } else if (window.__.env.REACT_APP_COUNTRY == 'tr') {
            // 土耳其
            regExp = /^0\s\(?([2-9][0-8][0-9])\)?\s([1-9][0-9]{2})[\-\. ]?([0-9]{2})[\-\. ]?([0-9]{2})(\s*x[0-9]+)?$/;
          } else {
            // 其他国家
            regExp = /\S/;
          }
          errMsg = CURRENT_LANGFILE['enterCorrectPhoneNumber'];
          break;
        default:
          regExp = /\S/;
          let errstr = '';
          if (window.__.env.REACT_APP_COUNTRY == 'ru') {
            errstr = 'payment.errorInfo2';
          } else {
            errstr = 'payment.errorInfo';
          }
          errMsg = CURRENT_LANGFILE[errstr].replace(
            /{.+}/,
            CURRENT_LANGFILE[`payment.${item.fieldKey}`]
          );
      }
      item.regExp = regExp;
      item.errMsg = errMsg;

      // 组装rule
      let ruleItem = {
        regExp: regExp,
        errMsg: errMsg,
        key: item.fieldKey,
        require: item.requiredFlag == 1 ? true : false
      };

      if (
        isCanVerifyBlacklistPostCode &&
        item.fieldKey == 'postCode' &&
        cfdata?.validFlag === 0
      ) {
        // validFlag 1 通过 0 不通过
        let postCodeAlertMessage =
          '* Sorry we are not able to deliver your order in this area.';
        ruleItem.isBlacklist = !cfdata?.validFlag;
        // ruleItem.errBlacklistMsg = postCodeAlertMessage;
        this.setState({
          errMsgObj: Object.assign({}, errMsgObj, {
            [item.fieldKey]: cfdata.alert || ''
          })
        });
      }

      if (item.fieldKey == 'postCode' || item.fieldKey == 'phoneNumber') {
        ruleItem.regExp = regExp;
      }

      item.requiredFlag == 1 &&
      !(item.fieldKey == 'deliveryDate' || item.fieldKey == 'timeSlot')
        ? rule.push(ruleItem)
        : null;
      // 有 deliveryDate 和 timeSlot 的验证规则
      item.requiredFlag == 1 ? ruleTimeSlot.push(ruleItem) : null;

      // 查询城市列表
      if (item.fieldKey == 'city' && item.inputDropDownBoxFlag == 1) {
        this.getAllCityList();
      }
    });

    cfdata.formRule = rule;
    cfdata.formRuleOther = rule;
    cfdata.formRuleRu = ruleTimeSlot;
    cfdata.receiveType = 'HOME_DELIVERY';
    this.setState(
      {
        caninForm: Object.assign(caninForm, cfdata)
      },
      () => {
        // console.log('666 caninForm:', this.state.caninForm);
      }
    );
    return array;
  }
  // 3、查询国家
  getCountryList = async () => {
    const { caninForm } = this.state;
    try {
      const res = await getDictionary({ type: 'country' });
      if (res) {
        let cfm = Object.assign({}, caninForm);
        cfm.country = res[0].value;
        cfm.countryId = res[0].id;
        this.setState({
          countryList: res,
          caninForm: Object.assign(this.state.caninForm, cfm)
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // 4、查询州列表（美国 state）
  getUsStateList = async () => {
    try {
      const res = await getProvincesList({
        storeId: window.__.env.REACT_APP_STOREID
      });
      if (res?.context?.systemStates) {
        let starr = [];
        let obj = res.context.systemStates;
        obj.forEach((item) => {
          let res = {
            id: item.id,
            name: item.stateName,
            no: item.stateNo
          };
          starr.push(res);
        });
        this.setState({
          stateList: Object.assign(obj, starr)
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // 5-1、查询city list
  getAllCityList = async () => {
    this.setState({
      dataLoading: true
    });
    try {
      const res = await getCityList();
      if (res?.context?.systemCityVO) {
        let starr = [];
        let obj = res.context.systemCityVO;
        obj.forEach((item) => {
          let res = {
            id: item.id,
            name: item.cityName,
            no: item.cityNo
          };
          starr.push(res);
        });
        this.setState({
          cityList: Object.assign(obj, starr)
        });
      }
      this.setState({
        dataLoading: false
      });
    } catch (err) {
      console.warn(err);
      this.setState({
        dataLoading: false
      });
    }
  };
  // 5-2、根据cityId查询region
  getRegionDataByCityId = async (cityId) => {
    const { caninForm } = this.state;
    this.setState({
      dataLoading: true
    });
    try {
      const res = await getRegionByCityId({ cityId: cityId });
      if (res?.context?.systemRegions) {
        let regarr = [];
        let obj = res.context.systemRegions;
        obj.forEach((item) => {
          let robj = {
            id: item.id,
            name: item.regionName,
            no: item.regionNo
          };
          regarr.push(robj);
          // 赋值region
          if (caninForm?.areaId == item.id) {
            caninForm.areaId = item.id;
            caninForm.area = item.regionName;
            caninForm.regionId = item.id;
            caninForm.region = item.regionName;
            this.setState({
              caninForm
            });
          }
        });
        this.setState({
          regionList: Object.assign(obj, regarr)
        });
      }
      this.setState({
        dataLoading: false
      });
    } catch (err) {
      console.warn(err);
      this.setState({
        dataLoading: false
      });
    }
  };
  // 6、根据地址查询运费
  getShippingCalculation = async (data) => {
    this.setState({
      dataLoading: true
    });
    try {
      let res = await shippingCalculation({
        postalCode: data.postCode,
        regionFias: data.provinceId, // 此处的provinceId是DuData地址返回的字符串，并非我们系统里的id
        areaFias: data.areaId || null,
        cityFias: data.cityId,
        settlementFias: data.settlementId || null
      });
      // console.log('★ -------------- 2、计算运费 res: ', res);
      if (res?.context?.success && res?.context?.tariffs[0]) {
        let calculation = res?.context?.tariffs[0];
        return calculation;
      } else {
        this.setState({
          errMsgObj: {
            ['address1']: this.getIntlMsg('payment.wrongAddress')
          }
        });
        this.props.getFormAddressValidFlag(false);
      }
    } catch (err) {
      console.warn(err);
      this.props.getFormAddressValidFlag(false);
    } finally {
      this.setState({
        dataLoading: false
      });
    }
  };
  // 7、this.props.updateData
  updateDataToProps = (data) => {
    const { isDeliveryDateAndTimeSlot } = this.state;
    let newForm = Object.assign({}, data);
    // 处理法国电话号码格式，(+33) 0X XX XX XX XX 保存为: (+33) X XX XX XX XX
    if (window.__.env.REACT_APP_COUNTRY == 'fr') {
      let tvalue = newForm.phoneNumber;
      if (tvalue?.length > 19) {
        newForm['phoneNumber'] = tvalue.replace(/0/, '');
      }
    }

    if (isDeliveryDateAndTimeSlot) {
      newForm.formRule = newForm.formRuleRu;
    } else {
      newForm.formRule = newForm.formRuleOther;
    }
    newForm.consigneeNumber = newForm.phoneNumber;
    this.props.updateData(newForm);
  };
  // 下拉框选择
  handleSelectedItemChange(key, data) {
    const { caninForm, deliveryDataTimeSlotList } = this.state;
    let cform = Object.assign({}, caninForm);
    cform[key + 'Id'] = data.value;
    if (key == 'state') {
      cform.provinceId = data.value;
      cform.province = data.name;
      cform.provinceNo = data.no; // 省份简写

      cform.stateId = data.value;
      cform.state = data.name;
      cform.stateNo = data.no; // 省份简写
    } else if (key == 'country') {
      cform.country = data.name;
    } else if (key == 'city') {
      cform.city = data.name;
      cform.areaId = '';
      cform.area = '';
      cform.regionId = '';
      cform.region = '';
      this.setState({
        regionList: []
      });
      // 获取本地存储的需要显示的地址字段
      const localAddressForm = this.props.configStore.localAddressForm;
      if (localAddressForm['region']) {
        this.getRegionDataByCityId(data.value);
      }
    } else if (key == 'region') {
      cform.area = data.name;
      cform.areaId = data.value;
      cform.region = data.name;
      cform.regionId = data.value;
    } else if (key == 'deliveryDate') {
      cform.deliveryDate = data.no;
      cform.deliveryDateId = data.value;
      let tslist = [];
      deliveryDataTimeSlotList[data.no]?.forEach((r) => {
        let setime = r.startTime + '-' + r.endTime;
        tslist.push({
          id: setime,
          name: setime,
          startTime: r.startTime,
          endTime: r.endTime,
          sort: r.sort
        });
      });
      cform.timeSlotId = tslist[0].id;
      cform.timeSlot = tslist[0].name;
      this.setState({
        timeSlotList: tslist
      });
    } else if (key == 'timeSlot') {
      cform.timeSlot = data.name;
      cform.timeSlotId = data.value;
    }
    this.setState(
      {
        caninForm: Object.assign(caninForm, cform)
      },
      () => {
        // console.log('666  key: '+key+' data: ',data);
        this.updateDataToProps(this.state.caninForm);
        // 验证数据
        this.validvalidationData(key, data.value);
      }
    );
  }
  // 处理数组
  computedList(key) {
    let tmp = '';
    tmp = this.state[`${key}List`].map((c) => {
      return {
        value: c.id,
        name: c.name,
        no: c.no
      };
    });
    if (key == 'state') {
      if (window.__.env.REACT_APP_COUNTRY === 'uk') {
        tmp.unshift({ value: '', name: 'County' });
      } else {
        tmp.unshift({ value: '', name: 'State' });
      }
    } else if (key != 'country' && key != 'deliveryDate' && key != 'timeSlot') {
      tmp.unshift({ value: '', name: '' });
    }
    return tmp;
  }
  // 判断是否是数字
  isNumber = (value) => {
    value = value.replace(/-/g, '');
    return isNaN(value) ? false : true;
  };
  // 文本框输入改变
  inputChange = (e) => {
    const { caninForm } = this.state;
    const target = e.target;
    let tvalue = target.type === 'checkbox' ? target.checked : target.value;
    const tname = target.name;
    if (tname == 'postCode') {
      tvalue = tvalue.replace(/\s+/g, '');
      if (!this.isNumber(tvalue)) {
        tvalue = '';
        return;
      }
      switch (window.__.env.REACT_APP_COUNTRY) {
        case 'us':
          tvalue = tvalue
            .replace(/\s/g, '')
            .replace(/-$/, '')
            .replace(/(\d{5})(?:\d)/g, '$1-');
          break;
        default:
          tvalue = tvalue.replace(/\s+/g, '');
          break;
      }
    }
    console.log('666 >> tname: ', tname);
    caninForm[tname] = tvalue;

    this.setState({ caninForm }, () => {
      this.updateDataToProps(this.state.caninForm);
      if (tname == 'postCode' && isCanVerifyBlacklistPostCode) {
        this.debounceValidvalidationData(tname, tvalue);
      } else {
        this.validvalidationData(tname, tvalue);
      }
    });
  };
  // 文本框失去焦点
  inputBlur = (e) => {
    const { caninForm } = this.state;
    const target = e?.target;
    const tname = target?.name;
    const tvalue =
      target?.type === 'checkbox' ? target?.checked : target?.value;
    caninForm[tname] = tvalue;
    this.setState({ caninForm }, () => {
      this.updateDataToProps(this.state.caninForm);
      this.validvalidationData(tname, tvalue);
    });
  };

  // 查询选择类型的文本框失去焦点
  selectInputBlur = (e) => {
    const target = e?.target;
    const tname = target?.name;
    const tvalue =
      target?.type === 'checkbox' ? target?.checked : target?.value;
    // 验证数据
    this.validvalidationData(tname, tvalue);
  };
  // 验证数据
  validvalidationData = async (tname, tvalue) => {
    const { errMsgObj, caninForm, isDeliveryDateAndTimeSlot } = this.state;
    let targetRule = null;

    if (isDeliveryDateAndTimeSlot) {
      targetRule = caninForm.formRuleRu.filter((e) => e.key === tname);
    } else {
      targetRule = caninForm.formRule.filter((e) => e.key === tname);
    }
    let postCodeAlertMessage =
      '* Sorry we are not able to deliver your order in this area.';

    try {
      // 邮编需要黑名单校验
      if (
        tname == 'postCode' &&
        targetRule[0].regExp.test(tvalue) &&
        isCanVerifyBlacklistPostCode
      ) {
        const res = await validPostCodeBlock(tvalue);
        console.log('res-validvalidationData', res);
        const data = res?.context || {};
        // validFlag 1 通过 0 不通过
        if (res.code === 'K-000000' && !!data?.validFlag) {
          targetRule[0].isBlacklist = false;
          this.setState({
            errMsgObj: Object.assign({}, errMsgObj, {
              [tname]: ''
            })
          });
        } else {
          targetRule[0].isBlacklist = true;
          postCodeAlertMessage = data.alert;

          this.props.getFormAddressValidFlag(false);

          this.setState({
            errMsgObj: Object.assign({}, errMsgObj, {
              [tname]: postCodeAlertMessage
            })
          });
        }
      }

      await validData(targetRule, { [tname]: tvalue });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: ''
        })
      });
      if (window.__.env.REACT_APP_COUNTRY != 'ru') {
        // 俄罗斯需要先校验 DuData 再校验所有表单数据
        this.validFormAllData(); // 验证表单所有数据
      }
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: !!err.message
            ? err.message
            : tname == 'postCode' && postCodeAlertMessage
        })
      });
    }
  };
  // 验证表单所有数据
  validFormAllData = async () => {
    const { caninForm, isDeliveryDateAndTimeSlot } = this.state;
    try {
      // 验证整个表单
      if (isDeliveryDateAndTimeSlot) {
        await validData(caninForm.formRuleRu, caninForm);
      } else {
        await validData(caninForm.formRule, caninForm);
      }
      this.props.getFormAddressValidFlag(true);
    } catch {
      this.props.getFormAddressValidFlag(false);
    }
  };
  // 城市搜索框失去焦点
  handleCitySearchSelectionBlur = (e) => {
    this.selectInputBlur(e);
  };
  // 城市搜索选择
  handleCityInputChange = (data) => {
    const { caninForm } = this.state;
    caninForm.cityId = data.id;
    caninForm.city = data.cityName;
    this.setState({ caninForm }, () => {
      this.updateDataToProps(this.state.caninForm);
      // 验证数据
      this.validvalidationData('city', caninForm.city);
    });
  };

  // DuData地址搜索选择 1
  handleAddressInputChange = async (data) => {
    console.log('666 DuData地址搜索选择 data: ', data);
    const { caninForm } = this.state;
    this.setState({
      address1Data: data
    });
    // 判断选中的地址是否有错误信息
    let errMsg = data.errMsg;
    if (!errMsg) {
      // DuData相关参数
      caninForm.province = data.province;
      caninForm.area = data.area;
      caninForm.settlement = data.settlement;
      caninForm.street = data.street;
      caninForm.house = data.house;
      caninForm.housing = data.block;
      caninForm.entrance = data.entrance;
      caninForm.apartment = data.flat;

      // 这里的Id都是DuData返回的字符串
      caninForm.provinceIdStr = data.provinceId;
      caninForm.cityIdStr = data.cityId;
      caninForm.areaIdStr = data.areaId;
      caninForm.settlementIdStr = data.settlementId;

      // 赋值查询到的地址信息
      caninForm.DuData = data;
      caninForm.address1 = data.unrestrictedValue;
      caninForm.city = data.city;
      caninForm.postCode = data.postCode;

      this.setState({ caninForm }, async () => {
        // 判断暂存地址 tempolineCache 中是否有要查询的地址
        const key = data.unrestrictedValue;
        let calculation = tempolineCache[key];
        if (!calculation) {
          calculation = await this.getShippingCalculation(data);
          // 把地址暂存到 tempolineCache
          tempolineCache[key] = calculation;
        }

        // Москва 和 Московская 不请求查询运费接口
        // delivery fee= 400, MinDeliveryTime= 1, MaxDeliveryTime= 2
        if (data.province == 'Москва' || data.province == 'Московская') {
          calculation = {
            deliveryPrice: 400,
            price: 400,
            maxDeliveryTime: 2,
            minDeliveryTime: 1
          };
        }

        // 赋值查询到的地址信息
        caninForm.calculation = calculation;
        caninForm.minDeliveryTime = calculation.minDeliveryTime;
        caninForm.maxDeliveryTime = calculation.maxDeliveryTime;
        // 重置地址相关信息并清空错误提示
        this.setState(
          {
            caninForm,
            errMsgObj: {
              ['address1']: ''
            }
          },
          () => {
            // console.log('666 ★ DuData地址搜索选择 caninForm: ',this.state.caninForm)
            // 控制按钮状态
            this.props.getFormAddressValidFlag(true);
            // purchases接口计算运费
            this.props.calculateFreight(this.state.caninForm);
            // delivery date and time slot
            if (this.props.showDeliveryDateTimeSlot) {
              this.getDeliveryDateAndTimeSlotData(data?.provinceId);
            } else {
              this.updateDataToProps(caninForm);
            }
          }
        );
      });
    } else {
      // errMsg = this.getIntlMsg('payment.wrongAddress');
      // 显示错误信息
      this.setState({
        errMsgObj: {
          ['address1']: this.getIntlMsg('payment.pleaseInput') + errMsg
        },
        isDeliveryDateAndTimeSlot: false
      });
    }
  };
  // 对应的国际化字符串
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };
  // 地址搜索框失去焦点 2
  handleSearchSelectionBlur = (e) => {
    const { caninForm } = this.state;
    const target = e.target;
    const value = target.value;
    if (value == '') {
      this.props.getFormAddressValidFlag(false);
      caninForm.address1 = '';
      this.setState(
        {
          caninForm,
          address1Data: []
        },
        () => {
          this.updateDataToProps(this.state.caninForm);
          this.selectInputBlur(e);
        }
      );
    }
  };
  // 地址搜索框输入值接收，控制按钮状态 3
  getSearchInputChange = (e) => {
    const target = e?.target;
    const tname = target?.name;
    const tvalue = target?.value;
    this.props.getFormAddressValidFlag(false);
    // 验证数据
    this.validvalidationData(tname, tvalue);
  };

  // 处理查询到的DuData地址信息，拼装errMsg
  setDuDataAddressErrMsg = (data) => {
    // DuData                   we
    // -------------------------------
    // address1                 street    √
    // postalCode               postCode  √
    // house                    house     √
    // city                     city      √
    // districtCode             province    √
    // settlement               settlement  √
    let errArr = [];
    let streets = this.getIntlMsg('payment.streets'),
      postCode = this.getIntlMsg('payment.postCode'),
      house = this.getIntlMsg('payment.house'),
      city = this.getIntlMsg('payment.city'),
      province = this.getIntlMsg('payment.state'),
      settlement = this.getIntlMsg('payment.settlement');

    data.street ? '' : errArr.push(streets);
    data.postCode ? '' : errArr.push(postCode);
    data.house ? '' : errArr.push(house);
    data.city ? '' : errArr.push(city);
    data.province ? '' : errArr.push(province);
    data.settlement ? '' : errArr.push(settlement);

    data.errMsg = errArr.join(',');
    return data;
  };
  // 地址搜索框
  addressSearchSelectionJSX = (item) => {
    const { caninForm } = this.state;
    return (
      <>
        <SearchSelection
          queryList={async ({ inputVal }) => {
            let res = await getAddressBykeyWord({ keyword: inputVal });
            // console.log('666 >>> inputVal: ',inputVal);
            // let res = await DQEAddressList(inputVal);

            let robj = (
              (res?.context && res?.context?.addressList) ||
              []
            ).map((ele) => Object.assign(ele, { name: ele.unrestrictedValue }));
            if (robj.length) {
              // 给查询到的地址拼接 errMsg
              robj.forEach((item) => {
                item = this.setDuDataAddressErrMsg(item);
              });
            } else {
              this.props.getFormAddressValidFlag(false);
            }
            return robj;
          }}
          selectedItemChange={(data) => this.handleAddressInputChange(data)}
          searchSelectionBlur={this.handleSearchSelectionBlur}
          searchInputChange={this.getSearchInputChange}
          key={caninForm[item.fieldKey]}
          defaultValue={caninForm[item.fieldKey]}
          value={caninForm[item.fieldKey] || ''}
          freeText={item.inputFreeTextFlag == 1 ? true : false}
          name={item.fieldKey}
          placeholder={
            this.props.placeholder
              ? this.props.intl.messages.inputSearchText
              : ''
          }
          customStyle={true}
          isLoadingList={false}
          isBottomPaging={true}
        />
      </>
    );
  };
  // 文本框
  inputJSX = (item) => {
    const { caninForm } = this.state;
    // uk和fr,才有postCode校验
    const isVerifyPostCodeBlacklist =
      item.fieldKey === 'postCode' && isCanVerifyBlacklistPostCode;

    return (
      <>
        <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
          <input
            className={`rc-input__control ${item.fieldKey}Shipping`}
            id={`${item.fieldKey}Shipping`}
            type={item.filedType}
            value={caninForm[item.fieldKey] || ''}
            onChange={(e) => this.inputChange(e)}
            onBlur={this.inputBlur}
            name={item.fieldKey}
            disabled={item?.disabled ? true : false}
            maxLength={item.maxLength}
          />
          <label className="rc-input__label" htmlFor="id-text1" />
        </span>
      </>
    );
  };
  // 文本域
  textareaJSX = (item) => {
    const { caninForm } = this.state;
    return (
      <>
        <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
          <textarea
            className="rc_input_textarea"
            placeholder={`${this.props.intl.messages['payment.comment']}`}
            id={`${item.fieldKey}Shipping`}
            value={caninForm[item.fieldKey] || ''}
            onChange={(e) => this.inputChange(e)}
            onBlur={this.inputBlur}
            name={item.fieldKey}
            maxLength={item.maxLength}
          ></textarea>
          <label className="rc-input__label" htmlFor="id-text1" />
        </span>
      </>
    );
  };
  // 城市搜索框
  citySearchSelectiontJSX = (item) => {
    const { caninForm } = this.state;
    return (
      <>
        <span
          className="rc-select rc-full-width rc-input--full-width rc-select-processed"
          style={{ marginTop: '0' }}
        >
          {/* 城市搜索框 value = fieldkey */}
          <CitySearchSelection
            placeholder={false}
            defaultValue={caninForm[item.fieldKey]}
            key={caninForm[item.fieldKey]}
            name={item.fieldKey}
            freeText={item.inputFreeTextFlag == 1 ? true : false}
            onChange={this.handleCityInputChange}
            searchSelectionBlur={this.handleCitySearchSelectionBlur}
          />
        </span>
      </>
    );
  };
  // 下拉框
  dropDownBoxJSX = (item) => {
    const { caninForm } = this.state;
    return (
      <>
        <span
          className={`rc-select rc-full-width rc-input--full-width rc-select-processed ${
            item.fieldKey == 'state' ? 'rc_first_noselect' : ''
          }`}
          style={{ marginTop: '0' }}
        >
          {/* 下拉框 key 和 value 为 id , fieldKey+'Id' */}
          {item.fieldKey == 'state' ? (
            <Selection
              selectedItemChange={(data) =>
                this.handleSelectedItemChange(item.fieldKey, data)
              }
              optionList={this.computedList(item.fieldKey)}
              choicesInput={true}
              emptyFirstItem={
                window.__.env.REACT_APP_COUNTRY === 'uk' ? 'County' : 'State'
              }
              name={item.fieldKey}
              selectedItemData={{ value: caninForm[item.fieldKey + 'Id'] }}
              key={caninForm[item.fieldKey + 'Id']}
            />
          ) : (
            <Selection
              selectedItemChange={(data) =>
                this.handleSelectedItemChange(item.fieldKey, data)
              }
              optionList={this.computedList(item.fieldKey)}
              choicesInput={true}
              name={item.fieldKey}
              selectedItemData={{ value: caninForm[item.fieldKey + 'Id'] }}
              key={caninForm[item.fieldKey + 'Id']}
            />
          )}
        </span>
      </>
    );
  };
  // birthData onchange
  onDateChange(date) {
    const { caninForm } = this.state;
    let newdate = format(date, 'yyyy/MM/dd');
    caninForm['birthdate'] = date ? newdate : '';
    this.setState({ caninForm }, () => {
      this.updateDataToProps(this.state.caninForm);
      // 验证数据
      this.validvalidationData('birthdate', newdate);
    });
  }
  // email and birthData
  emailAndBirthDataJSX = () => {
    const { caninForm } = this.state;
    return (
      <>
        {/* email */}
        <div className="col-md-6">
          <div className="form-group require">
            <label className="form-control-label" htmlFor="emailShipping">
              <FormattedMessage id="account.Email" />
            </label>
            <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
              <input
                type="email"
                className="rc-input__control emailShipping"
                id="email"
                data-name="profile_personalInfo"
                alt="birthday E-mail"
                name="email"
                value={caninForm.email || ''}
                maxLength="50"
                disabled
              />
              <label className="rc-input__label" htmlFor="id-text1" />
            </span>
          </div>
        </div>
        {/* birthData */}
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-control-label" htmlFor="birthDateShipping">
              <FormattedMessage id="account.birthDate" />
            </label>
            <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
              <DatePicker
                className="receiveDate birthDateShipping"
                style={{ padding: '.95rem 0' }}
                placeholder={datePickerConfig.format}
                dateFormat={datePickerConfig.format}
                locale={datePickerConfig.locale}
                maxDate={new Date()}
                selected={
                  caninForm.birthdate ? getZoneTime(caninForm.birthdate) : ''
                }
                onChange={(date) => this.onDateChange(date)}
              />
            </span>
          </div>
        </div>
      </>
    );
  };

  render() {
    const {
      dataLoading,
      formLoading,
      formList,
      errMsgObj,
      isDeliveryDateAndTimeSlot
    } = this.state;
    return (
      <>
        {formLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div
            className="row rc_form_box"
            style={{ display: isMobile ? 'block' : 'flex' }}
          >
            {formList &&
              formList.map((item, index) => (
                <>
                  <div
                    className={`col-md-${item.occupancyNum == 1 ? 6 : 12} ${
                      !isDeliveryDateAndTimeSlot &&
                      (item.fieldKey == 'deliveryDate' ||
                        item.fieldKey == 'timeSlot')
                        ? 'hidden'
                        : ''
                    }`}
                    key={index}
                  >
                    {/* requiredFlag '是否必填: 0.关闭,1.开启' */}
                    <div
                      className={`form-group ${
                        item.requiredFlag == 1 ? 'required' : ''
                      }`}
                    >
                      <label
                        className="form-control-label"
                        htmlFor={`${item.fieldKey}Shipping`}
                      >
                        {item.fieldKey == 'deliveryDate' ? (
                          <FormattedMessage id={`payment.deliveryDateText`} />
                        ) : (
                          <FormattedMessage id={`payment.${item.fieldKey}`} />
                        )}
                      </label>

                      {/* 当 inputFreeTextFlag=1，inputSearchBoxFlag=0 时，为普通文本框（text、number） */}
                      {item.inputFreeTextFlag == 1 &&
                      item.inputSearchBoxFlag == 0 ? (
                        <>
                          {item.fieldKey == 'comment'
                            ? this.textareaJSX(item)
                            : this.inputJSX(item)}
                        </>
                      ) : null}

                      {/* 只是 searchbox */}
                      {item.inputFreeTextFlag == 0 &&
                      item.inputDropDownBoxFlag == 0 &&
                      item.inputSearchBoxFlag == 1
                        ? this.citySearchSelectiontJSX(item)
                        : null}

                      {/* inputSearchBoxFlag 是否允许搜索:0.不允许,1.允许 */}
                      {item.inputDropDownBoxFlag == 0 &&
                      item.inputFreeTextFlag == 1 &&
                      item.inputSearchBoxFlag == 1 ? (
                        <>
                          {item.fieldKey == 'address1'
                            ? this.addressSearchSelectionJSX(item)
                            : null}
                          {item.fieldKey == 'city'
                            ? this.citySearchSelectiontJSX(item)
                            : null}
                        </>
                      ) : null}

                      {/* inputDropDownBoxFlag 是否是下拉框选择:0.不是,1.是 */}
                      {/* 当 inputDropDownBoxFlag=1，必定：inputFreeTextFlag=0 && inputSearchBoxFlag=0 */}
                      {item.inputFreeTextFlag == 0 &&
                      item.inputSearchBoxFlag == 0 &&
                      item.inputDropDownBoxFlag == 1
                        ? this.dropDownBoxJSX(item)
                        : null}

                      {/* 输入邮编提示 */}
                      {item.fieldKey == 'postCode' && (
                        <span className="ui-lighter">
                          <FormattedMessage id="example" />:{' '}
                          <FormattedMessage id="examplePostCode" />
                        </span>
                      )}
                      {/* 输入电话号码提示 */}
                      {item.fieldKey == 'phoneNumber' && (
                        <span className="ui-lighter">
                          <FormattedMessage id="examplePhone" />
                        </span>
                      )}
                      {/* 输入提示 */}
                      {errMsgObj[item.fieldKey] && item.requiredFlag == 1 ? (
                        <div className="text-danger-2">
                          {errMsgObj[item.fieldKey]}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* 这是一个空的div，deliveryDate和timeSlot存在时显示 */}
                  {item.fieldKey == 'phoneNumber' ? (
                    <>
                      <div
                        className={`col-md-6 ${
                          isDeliveryDateAndTimeSlot ? '' : 'hidden'
                        }`}
                      ></div>
                    </>
                  ) : null}

                  {/* 个人中心添加 email 和 birthData */}
                  {this.props.personalData &&
                    item.fieldKey == 'lastName' &&
                    this.emailAndBirthDataJSX()}
                </>
              ))}

            {/* 根据接口返回判断是否显示 DeliveryDate 和 TimeSlot */}
          </div>
        )}

        {dataLoading ? <Loading /> : null}
      </>
    );
  }
}

export default Form;
