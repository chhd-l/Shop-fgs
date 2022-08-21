/*********
 *
 * File Name: Address Form
 * Create Time: 2021-4-20
 * Author: kzeng@deloitte.com.cn
 * Version: V1.0
 *
 * Description:
 * 1、本组件在需要编辑 deliveryAddress 和 billingAddress 及其他编辑地址的地方调用。
 * 2、父组件确认地址按钮由（isValid、formAddressValid）两个变量控制。
 * 3、imask.js 插件，设置文本框输入内容格式。https://imask.js.org/
 *
 *********/
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {
  Selection,
  CitySearchSelection,
  Loading,
  NormalSkeleton as Skeleton
} from '@/components';
import { DqeSearchSelection2 as SearchSelection } from '@/components';
import {
  getDictionary,
  validData,
  getZoneTime,
  isMobile,
  isCanVerifyBlacklistPostCode,
  formatDate
} from '@/utils/utils';
import find from 'lodash/find';
import {
  getRegionByCityId,
  getProvincesList,
  getAddressBykeyWord,
  getCityList,
  getDeliveryDateAndTimeSlot,
  validPostCodeBlock,
  DQEAddressList,
  queryOpenedApi,
  returnDQE
} from '@/api/address';
import { shippingCalculation } from '@/api/cart';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import IMask from 'imask';
import debounce from 'lodash/debounce';
import { EMAIL_REGEXP } from '@/utils/constant';
import './index.less';
import { format } from 'date-fns';
import { DatePickerComponent, Input } from '@/components/Common';
import { phoneNumberMask } from '@/utils/constant';
import { InitFormStatus } from './Constant';
import FastRegisterCard from './FastRegisterCard';
import SearchAddressPreview from './SearchAddressPreview';

const COUNTRY = window.__.env.REACT_APP_COUNTRY;
let tempolineCache = {};
var compositionFlag = true;

//因为email没有配置，额外前端手动加一项
const addEmailItem = (ress) => {
  const copyFirstNameItem = ress.filter((item) => item.fieldKey == 'firstName');
  const emailItem = {
    ...copyFirstNameItem[0],
    ...{ fieldKey: 'email', fieldName: 'email', id: 1 }
  };
  return [...ress, emailItem].sort((item1, item2) => item1.id - item2.id);
};

function ToCDB(str) {
  var tmp = '';
  for (var i = 0; i < str.length; i++) {
    console.log('char', str.charCodeAt(i));
    if (str.charCodeAt(i) == 12288) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
      continue;
    } else if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
}

@inject('configStore', 'loginStore')
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
    getFormAddressValidFlag: () => {},
    getJpNameValidFlag: () => {}
  };
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get emailItem() {
    return this.state.formList.filter((item) => item.fieldKey == 'email');
  }
  get firstNameItem() {
    return this.state.formList.filter((item) => item.fieldKey == 'firstName');
  }
  get lastNameItem() {
    return this.state.formList.filter((item) => item.fieldKey == 'lastName');
  }
  get address1Item() {
    return this.state.formList.filter((item) => item.fieldKey == 'address1');
  }

  constructor(props) {
    super(props);
    this.state = {
      dataLoading: false,
      formLoading: false,
      apiType: '',
      caninForm: {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        address1: '',
        address2: '',
        country: '',
        countryId: '',
        cityId: '',
        city: '',
        county: '',
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
        formRule: [], // form表单校验规 则
        workTime: '', // pickup workTime
        provinceIdStr: '', // pickup计算价格使用
        cityIdStr: '', // pickup计算价格使用
        areaIdStr: '', // pickup计算价格使用
        settlementIdStr: '', // pickup计算价格使用
        isDefalt: false
      },
      newAddress1: '',
      addrSearchSelectFlag: false, // 是否选择搜到的地址（DaData 或者 DQE）
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
      postCodeFiledType: 0, // 0、text，1、number，2、Letter & Number'
      errMsgObj: {},
      curItemStatus: {},
      showSearchAddressPreview: true
    };
    this.timer = null;
  }
  async componentDidMount() {
    const {
      configStore: { localAddressForm },
      initData = {}
    } = this.props;

    //日本
    if (COUNTRY === 'jp') {
      // console.log(initData);
      // debugger;
      if (initData.area) {
        //保存delivery address是保存在area的，才会有值
        initData.region = initData.area;
      }
      //initData.region = initData.area;
    }

    const { caninForm } = this.state;
    this.setState({
      formLoading: true
    });
    // 查询国家
    await this.getCountryList();
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

    this.setState(
      {
        caninForm: Object.assign(caninForm, initData)
      },
      async () => {
        // console.log(this.state.caninForm)
        // debugger
        // 获取 DuData、DQE 等开关
        // addressApiType: 0、validation ，1、suggestion
        // isOpen: 0、关 , 1、开
        let qoa = await queryOpenedApi();
        let res = qoa?.context?.addressApiSettings || null;
        if (res) {
          let asobj = null;
          // DQE 、DADATA、FEDEX
          asobj =
            find(
              res,
              (e) => e.name == 'DQE' || e.name == 'DADATA' || e.name == 'FEDEX'
            ) || null;
          if (asobj && asobj?.isOpen == 1 && asobj?.addressApiType == 1) {
            this.setState({
              apiType: asobj?.name
            });
          }
        }

        if (localAddressForm.formType === 'AUTOMATICALLY' && COUNTRY === 'ru') {
          await this.getAddressListByKeyWord(initData.address1);
        }

        this.updateDataToProps();
        // 获取 session 存储的 address form 数据并处理
        this.setAddressFormData();

        //模拟 日本查询DeliveryDate
        if (this.props.showDeliveryDateTimeSlot && COUNTRY === 'jp') {
          this.getDeliveryDateAndTimeSlotData('');
        }
      }
    );

    // 如果有areaId
    if (initData?.areaId) {
      this.getRegionDataByCityId(initData.cityId);
    }
    // 重置参数
    this.props.getFormAddressValidFlag(false);
  }
  // 根据address1查询地址信息
  getAddressListByKeyWord = async (address1) => {
    const { apiType } = this.state;

    let res = null;
    let addls = null;
    try {
      // 自动填充
      if (apiType === 'DADATA') {
        res = await getAddressBykeyWord({ keyword: address1 });
        if (res?.context && res?.context?.addressList.length) {
          addls = res.context.addressList;
          // 给查询到的地址拼接 errMsg
          addls.forEach((v, i) => {
            v = this.setDuDataAddressErrMsg(v);
          });
        }
      } else if (apiType === 'DQE') {
        // address1 = address1.replace(/\|/g, '，');
        res = await DQEAddressList(address1);
        addls = res.context;
        let guojia = COUNTRY.toUpperCase();
        addls.map((item) => {
          let newitem = {
            address1: item?.address1,
            area: null,
            areaId: null,
            block: null,
            city: item?.localite,
            cityId: null,
            country: guojia,
            countryCode: guojia,
            entrance: null,
            flat: null,
            floor: null,
            house: null,
            houseId: null,
            postCode: item?.codePostal,
            state: item?.county,
            provinceId: null,
            settlement: null,
            settlementId: null,
            street: item?.voie,
            streetId: null,
            streetWithNoType: null,
            unrestrictedValue: item?.label
          };
          Object.assign(item, newitem);
        });
      }
      await this.handleAddressInputChange(addls[0]);
    } catch (err) {
      console.warn(err);
    }
  };
  //格式化日期
  formatDateFun = (v) => {
    let dateStr = 'Unspecified';
    if (v.date) {
      dateStr = formatDate({
        date: v.date,
        formatOption: { weekday: 'long', day: '2-digit', month: 'long' }
      });
    }
    return dateStr;
  };
  //
  getAllData = (v, alldata) => {
    if (v.date == null) {
      alldata['Unspecified'] = v.dateTimeInfos;
    } else {
      alldata[v.date] = v.dateTimeInfos;
    }
  };
  getDdList = (datestr, v, ddlist) => {
    ddlist.push({
      id: datestr,
      name: datestr,
      no: v.date || 'Unspecified'
    });
  };
  // 0、获取 DeliveryDate 和 TimeSlot
  getDeliveryDateAndTimeSlotData = async (str) => {
    const { caninForm } = this.state;
    let res = null;
    try {
      res = await getDeliveryDateAndTimeSlot({ cityNo: str });
      const cutOffTime = Number(res.context.cutOffTime.substring(0, 2));
      localStorage.setItem('cutOffTime', cutOffTime);
      let flag = false;
      let alldata = {}; // 全部数据
      let ddlist = []; // delivery date
      let tslist = []; // time slot

      let obj = Object.assign({}, caninForm);

      if (res?.context?.timeSlots?.length) {
        flag = true; // 标记
        let robj = res.context.timeSlots;
        console.log({ robj });

        const isBelongDelievryDate = () => {
          let result = find(robj, (item) => item.date == obj.deliveryDate)
            ? true
            : false;
          return result;
        };

        robj.forEach((v, i) => {
          // 格式化 delivery date 格式: 星期, 15 月份
          let dateStr = this.formatDateFun(v);

          //获取全部数据
          this.getAllData(v, alldata);

          // 获取delivery date
          this.getDdList(dateStr, v, ddlist);

          if (obj.deliveryDate == v.date) {
            obj.deliveryDateId = dateStr;
          }

          if (COUNTRY == 'jp') {
            obj.deliveryDate = 'Unspecified';
            obj.deliveryDateId = 'Unspecified';
          }
        });

        // delivery date为空或者过期设置第一条数据为默认值

        if (
          COUNTRY == 'ru' &&
          (!obj.deliveryDate || !alldata[obj.deliveryDate])
        ) {
          obj.deliveryDateId = ddlist[0].id;
          obj.deliveryDate = ddlist[0].no;
        }

        // 设置 time slot
        //let tsFlag = false;

        alldata[obj.deliveryDate]?.forEach((v, i) => {
          let setime = v.startTime + '-' + v.endTime;
          tslist.push({
            id: setime,
            name: setime,
            startTime: v.startTime,
            endTime: v.endTime,
            sort: v.sort
          });
          // if (setime == obj.timeSlot) {
          //   obj.timeSlotId = setime;
          //   obj.timeSlot = setime;
          //   tsFlag = true;
          // }
        });

        // if(COUNTRY == 'jp') {
        //   tslist.unshift({
        //     id: '',
        //     name: 'unspecified',
        //     startTime: '',
        //     endTime: '',
        //     sort: 0})
        // }

        // console.log(tslist)
        // debugger

        // if (obj.timeSlot == 'Unspecified') {
        //   obj.timeSlotId = 'Unspecified';
        //   obj.timeSlot = 'Unspecified';
        // } else if (obj.deliveryDate == 'Unspecified') {
        //   obj.deliveryDate = 'Unspecified';
        //   obj.deliveryDateId = 'Unspecified';
        // } else if (!obj.timeSlot || !alldata[obj.deliveryDate] || !tsFlag) {
        //   if (COUNTRY == 'jp') {
        //     obj.timeSlotId = 'Unspecified';
        //     obj.timeSlot = 'Unspecified';
        //   } else {
        //     obj.timeSlotId = tslist[0].id;
        //     obj.timeSlot = tslist[0].name;
        //   }
        // }

        //time slot不为Unspecified，就设置第一条数据为默认值
        // if (obj.timeSlot == 'Unspecified') {
        //   obj.timeSlotId = 'Unspecified';
        //   obj.timeSlot = 'Unspecified';
        // } else if (obj.timeSlot === '' && obj.timeSlotId == 0) {
        //   obj.timeSlotId = 'Unspecified';
        //   obj.timeSlot = 'Unspecified';
        // } else if(COUNTRY == 'jp'){
        //   obj.timeSlotId = tslist[0]?.id || 'Unspecified';
        //   obj.timeSlot = tslist[0]?.name || 'Unspecified';
        // }

        if (COUNTRY == 'jp') {
          obj.timeSlotId = 'Unspecified';
          obj.timeSlot = 'Unspecified';
        } else {
          obj.timeSlotId = tslist[0]?.id;
          obj.timeSlot = tslist[0]?.name;
        }
      } else {
        obj.deliveryDate = '';
        obj.deliveryDateId = 0;
        obj.timeSlot = '';
        obj.timeSlotId = 0;
      }

      console.log('obj', obj);
      // debugger

      this.setState(
        {
          caninForm: Object.assign({}, obj),
          isDeliveryDateAndTimeSlot: flag,
          deliveryDataTimeSlotList: alldata,
          deliveryDateList: ddlist,
          timeSlotList: tslist
        },
        () => {
          this.updateDataToProps();
        }
      );
    } catch (err) {
      console.warn('678', err);
      this.setState({
        isDeliveryDateAndTimeSlot: false
      });
    }
  };
  //设置postcode输入限制
  setPostCodeReg = () => {
    let element = document.getElementById('postCodeShipping');
    if (!element) return; //没有postCode输入框就不执行
    let maskOptions = [];
    let postReg = '';
    postReg = [{ mask: '000-0000' }];
    maskOptions = {
      mask: postReg
    };
    jpPostCodeMask = IMask(element, maskOptions);
  };
  // 设置手机号输入限制
  setPhoneNumberReg = () => {
    let element = document.getElementById('phoneNumberShipping');
    console.log({ element });
    let maskOptions = [];
    let phoneReg = '';
    switch (COUNTRY) {
      case 'fr':
        phoneReg = [
          { mask: '(+33) 0 00 00 00 00' },
          { mask: '(+33) 00 00 00 00 00' }
        ];
        break;
      case 'us':
        phoneReg = [{ mask: '000-000-0000' }];
        break;
      case 'nl':
        phoneReg = [{ mask: '(+31) 000 00 00 00' }];
        break;
      case 'uk':
        phoneReg = [
          { mask: '(+44) 00 00 00 00 00' },
          { mask: '(+44) 000 00 00 00 00' }
        ];
        break;
      case 'ru':
        phoneReg = [
          {
            mask: '+{7}(Y00)000-00-00',
            lazy: false,
            blocks: {
              Y: {
                mask: IMask.MaskedEnum,
                enum: ['0', '1', '2', '3', '4', '5', '6', '9']
              }
            }
          }
        ];
        break;
      case 'mx':
        phoneReg = [{ mask: '+(52) 000 000 0000' }];
        break;
      case 'tr':
        phoneReg = [{ mask: '{0} (000) 000-00-00' }];
        break;
      // case 'jp':
      //   phoneReg = /^[0]\d{0,10}$/;
      //   // phoneReg = [
      //   //   {
      //   //     mask: 'Y0000000000',
      //   //     lazy: true,
      //   //     blocks: {
      //   //       Y: {
      //   //         mask: IMask.MaskedEnum,
      //   //         enum: ['0']
      //   //       }
      //   //     }
      //   //   }
      //   // ];
      //   break;
      default:
        phoneReg = [{ mask: '00000000000' }];
        break;
    }
    maskOptions = {
      mask: phoneReg
    };
    if (COUNTRY != 'jp') {
      IMask(element, maskOptions);
    }

    // if (COUNTRY == 'ru' && this.isLogin) {
    //   this.setState({ caninForm: phoneNumberMask(this.state.caninForm) });
    // }
  };
  // 1、获取 session 存储的 address form 数据并处理
  setAddressFormData = async () => {
    const {
      configStore: { getSystemFormConfig, localAddressForm }
    } = this.props;

    await getSystemFormConfig();

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
            if (COUNTRY == 'us') {
              // 美国个人中心只展示：firstName、lastName
              narr = narr.filter((e, i) => {
                return e.fieldKey == 'firstName' || e.fieldKey == 'lastName';
              });
            }
          }

          // 格式化表单json
          let ress = this.formListFormat(narr);

          ress = addEmailItem(ress);

          this.setState(
            {
              formList: ress
            },
            () => {
              if (localAddressForm.formType === 'MANUALLY') {
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
                  this.updateDataToProps();
                }
              );
              ress.forEach((item) => {
                if (item.fieldKey == 'phoneNumber' && item.requiredFlag == 1) {
                  // 设置手机号输入限制
                  setTimeout(() => {
                    this.setPhoneNumberReg();
                    if (COUNTRY == 'jp') {
                      //this.setPostCodeReg();
                    }
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
    const {
      intl: { messages, formatMessage }
    } = this.props;
    const { caninForm, errMsgObj } = this.state;
    let rule = [];
    let ruleTimeSlot = [];
    let cfdata = Object.assign({}, caninForm);

    // 前端写死的文本框默认数据
    let defaultObj = {
      inputType: 0,
      maxLength: 50,
      filedType: 'text',
      // requiredFlag: 1,
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
        inputDropDownBoxFlag: 0,
        requiredFlag: 1
      },
      defaultObj
    );
    // delivery date
    let deliveryDateObj = Object.assign(
      {
        id: 99999998,
        sequence: 12,
        fieldKey: 'deliveryDate',
        fieldName: 'deliveryDate',
        inputFreeTextFlag: 0,
        inputSearchBoxFlag: 0,
        inputDropDownBoxFlag: 1,
        requiredFlag: COUNTRY === 'jp' ? 0 : 1
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
        inputDropDownBoxFlag: 1,
        requiredFlag: COUNTRY === 'jp' ? 0 : 1
      },
      defaultObj
    );

    if (this.props.isCyberBillingAddress) {
      array.push(emailObj);
    }

    if (
      (COUNTRY == 'ru' || COUNTRY == 'jp') &&
      !this.props.isCyberBillingAddress &&
      !this.props.personalData
    ) {
      array.push(deliveryDateObj);
      array.push(timeSlotObj);
    }
    array.sort((a, b) => a.sequence - b.sequence);
    array.forEach((item) => {
      // filedType '字段类型:0、text，1、number，2、Letter & Number'
      let regExp = '';
      let errMsg = '';
      switch (item.fieldKey) {
        case 'postCode':
          let ft = item.filedType;
          this.setState({
            postCodeFiledType: ft
          });
          if (ft === 0 || ft === 1) {
            COUNTRY == 'us'
              ? (regExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/)
              : COUNTRY == 'jp'
              ? (regExp = /^[0-9]{3}-[0-9]{4}$/)
              : (regExp = /^\d{5}$/);
          } else {
            regExp = /\S/;
          }
          errMsg = formatMessage({ id: 'enterCorrectPostCode' });
          break;
        case 'email':
          regExp = EMAIL_REGEXP;
          errMsg = formatMessage({ id: 'pleaseEnterTheCorrectEmail' });
          break;
        case 'phoneNumber':
          if (COUNTRY == 'fr') {
            // 法国
            regExp =
              /^\(\+[3][3]\)[\s](([0][1-9])|[1-9]|[0-9]{2})[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/;
          } else if (COUNTRY == 'uk') {
            // 英国
            regExp =
              /^\(\+[4][4]\)[\s](([0][0-9][0-9])|[0-9][0-9])[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/;
          } else if (COUNTRY == 'us') {
            // 美国
            regExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          } else if (COUNTRY == 'mx') {
            // 墨西哥
            regExp = /^\+\([5][2]\)[\s\-][0-9]{3}[\s\-][0-9]{3}[\s\-][0-9]{4}$/;
          } else if (COUNTRY == 'ru') {
            // 俄罗斯
            regExp =
              /^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          } else if (COUNTRY == 'tr') {
            // 土耳其
            regExp =
              /^0\s\(?([2-9][0-8][0-9])\)?\s([0-9][0-9]{2})[\-\. ]?([0-9]{2})[\-\. ]?([0-9]{2})(\s*x[0-9]+)?$/;
          } else if (COUNTRY == 'jp') {
            regExp = /^[0]\d{9,10}$/;
          } else {
            // 其他国家
            regExp = /\S/;
          }
          errMsg = formatMessage({ id: 'enterCorrectPhoneNumber' });
          break;
        default:
          regExp = /\S/;
          let errstr = '';
          if (COUNTRY == 'ru') {
            errstr = 'payment.errorInfo2';
          } else {
            errstr = 'payment.errorInfo';
          }

          errMsg = formatMessage(
            { id: errstr },
            { val: messages[`payment.${item.fieldKey}`] }
          );
      }

      //item.filedType = 'text';
      item.regExp = regExp;
      item.errMsg = errMsg;

      //增加表单初始状态
      item.Status = 'empty';
      item.InitFormStatus = { ...InitFormStatus };

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
        this.setState(
          {
            errMsgObj: Object.assign({}, errMsgObj, {
              [item.fieldKey]: cfdata.alert || ''
            })
          },
          () => {
            if (this.state.errMsgObj?.address1) {
              this.props.onSearchSelectionError?.(
                this.state.errMsgObj?.address1
              ); // 还没做英语翻译，没找到地方……
            }
          }
        );
      }

      if (COUNTRY == 'jp') {
        item.fieldKey == 'firstNameKatakana' &&
          this.jpNameKatakanaValid(item.fieldKey, cfdata.firstNameKatakana);
        setTimeout(() => {
          item.fieldKey == 'lastNameKatakana' &&
            this.jpNameKatakanaValid(item.fieldKey, cfdata.lastNameKatakana);
        }, 100);
      }

      if (item.fieldKey == 'postCode' || item.fieldKey == 'phoneNumber') {
        ruleItem.regExp = regExp;
      }

      if (
        item.requiredFlag == 1 &&
        !(item.fieldKey == 'deliveryDate' || item.fieldKey == 'timeSlot')
      )
        rule.push(ruleItem);
      // 有 deliveryDate 和 timeSlot 的验证规则
      if (item.requiredFlag == 1) ruleTimeSlot.push(ruleItem);

      // 查询城市列表
      if (item.fieldKey == 'city' && item.inputDropDownBoxFlag == 1) {
        this.getAllCityList();
      }
    });

    cfdata.formRule = rule;
    cfdata.formRuleOther = rule;
    cfdata.formRuleRu = ruleTimeSlot;
    cfdata.receiveType = 'HOME_DELIVERY';

    this.setState({
      caninForm: Object.assign(caninForm, cfdata)
    });
    return array;
  }
  // 3、查询国家
  getCountryList = async () => {
    try {
      const res = await getDictionary({ type: 'country' });
      if (res) {
        this.setState({
          countryList: res,
          caninForm: Object.assign({}, this.state.caninForm, {
            country: res[0].value,
            countryId: res[0].id
          })
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
  updateDataToProps = () => {
    const { caninForm, isDeliveryDateAndTimeSlot } = this.state;
    let ctl = find(this.state.countryList, (e) => e.value);

    let newForm = Object.assign({}, caninForm, {
      country: ctl.value,
      countryId: ctl.id
    });

    // 处理法国、英国电话号码格式，(+33) 0X XX XX XX XX 保存为: (+33) X XX XX XX XX
    if (COUNTRY == 'fr' || COUNTRY == 'uk') {
      let tvalue = newForm.phoneNumber;
      if (tvalue?.length > 19 && tvalue[6] === '0') {
        // newForm['phoneNumber'] = tvalue.replace(/0/, '');
        newForm['phoneNumber'] = tvalue.slice(0, 6) + tvalue.slice(7);
      }
      console.log('luky111', newForm['phoneNumber']);
    }

    if (isDeliveryDateAndTimeSlot) {
      newForm.formRule = newForm.formRuleRu;
    } else {
      newForm.formRule = newForm.formRuleOther;
    }
    newForm.consigneeNumber = newForm.phoneNumber;

    caninForm.country = ctl.value;
    caninForm.countryId = ctl.id;
    this.setState(
      {
        caninForm
      },
      () => {
        // isDeliveryDateAndTimeSlot，临时解决
        if (!isDeliveryDateAndTimeSlot) {
          newForm.deliveryDate = '';
          newForm.deliveryDateId = '';
          newForm.timeSlot = '';
          newForm.timeSlotId = '';
        }
        this.props.updateData(newForm);
        this.validvalidationData('country', newForm.countryId);
      }
    );
  };
  // 下拉框选择
  handleSelectedItemChange(key, data) {
    // 获取本地存储的需要显示的地址字段
    const {
      configStore: {
        localAddressForm: { fieldKeyEnableStatus }
      }
    } = this.props;
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
      cform.countryId = data.value;
    } else if (key == 'city') {
      cform.city = data.name;
      cform.areaId = '';
      cform.area = '';
      cform.regionId = '';
      cform.region = '';
      this.setState({
        regionList: []
      });

      if (fieldKeyEnableStatus?.region) {
        this.getRegionDataByCityId(data.value);
      }
    } else if (key == 'region') {
      cform.area = data.name;
      cform.areaId = data.value;
      cform.region = data.name;
      cform.regionId = data.value;
    } else if (key == 'deliveryDate') {
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
      cform.deliveryDate = tslist[0]?.id ? data.no : 'Unspecified';
      cform.deliveryDateId = tslist[0]?.name ? data.value : 'Unspecified';
      if (COUNTRY == 'jp') {
        cform.timeSlotId = 'Unspecified';
        cform.timeSlot = 'Unspecified';
      }
      this.setState({
        timeSlotList: tslist
      });
    } else if (key == 'timeSlot') {
      cform.timeSlot = data.value;
      cform.timeSlotId = data.value;
    }
    this.setState(
      {
        caninForm: Object.assign(caninForm, cform)
      },
      () => {
        this.updateDataToProps(this.state.caninForm);
        // 验证数据
        this.validvalidationData(key, data.value);
      }
    );
  }
  // 处理数组
  computedList(key) {
    //console.log('timeSlotList', this.state.timeSlotList);
    let tmp = '';
    tmp = this.state[`${key}List`].map((c) => {
      return {
        value: c.id,
        name: c.name,
        no: c.no
      };
    });
    if (key == 'state' && COUNTRY != 'jp') {
      tmp.unshift({ value: '', name: 'State' });
    } else if (key != 'country' && key != 'deliveryDate' && key != 'timeSlot') {
      tmp.unshift({ value: '', name: '' });
    }

    // if (COUNTRY == 'jp' && key == 'deliveryDate') {
    //   //日本deliveryDate才有Unspecified
    //   tmp.unshift({
    //     value: 'Unspecified',
    //     name: <FormattedMessage id="Unspecified" />
    //   });
    // }

    if (key == 'timeSlot' && COUNTRY == 'jp') {
      //日本.俄罗斯timeSlot才有Unspecified
      tmp.unshift({
        value: 'Unspecified',
        name: <FormattedMessage id="Unspecified" />
      });
    }

    return tmp;
  }
  // 判断是否是数字
  isNumber = (value) => {
    value = value.replace(/-/g, '');
    return isNaN(value) ? false : true;
  };
  compositionStart = () => {
    //jpPostCodeMask.destroy();
    compositionFlag = false;
  };
  compositionEnd = (e) => {
    compositionFlag = true;

    const { caninForm, postCodeFiledType } = this.state;
    const target = e.target;
    let tvalue = target.value;
    const tname = target.name;

    switch (tname) {
      case 'postCode':
        if (COUNTRY == 'jp') {
          tvalue = ToCDB(tvalue);
          // if (tvalue.length == 3) {
          //   tvalue = tvalue + '-';
          // }
          tvalue = tvalue
            .replace(/\s/g, '')
            .replace(/-$/, '')
            .replace(/(\d{3})(\d{4})/g, '$1-$2');
        }
        break;
      case 'phoneNumber':
        if (COUNTRY == 'jp') {
          tvalue = ToCDB(tvalue);
        }
        break;
    }

    caninForm[tname] = tvalue;
    this.setState({ caninForm }, () => {
      this.updateDataToProps();
      if (tname == 'postCode' && isCanVerifyBlacklistPostCode) {
        this.debounceValidvalidationData(tname, tvalue);
      } else {
        this.validvalidationData(tname, tvalue);
      }
    });
  };
  // 文本框输入改变
  inputChange = (e) => {
    const { caninForm, postCodeFiledType } = this.state;
    const target = e.target;
    let tvalue = target.type === 'checkbox' ? target.checked : target.value;
    const tname = target.name;
    switch (tname) {
      case 'firstName':
      case 'lastName':
        if (COUNTRY == 'jp' && tvalue?.length == 49) {
          // this.props.showErrMsg('リクエストを処理できない場合は、後でもう一度お試しいただくか、サポートにお問い合わせください');
        }
        // 德国shop first name, last name去掉空格 - 的限制
        // tvalue = tvalue.replace(COUNTRY === 'de' ? /[-|\s]/gi : '', '');
        //tvalue = tvalue;
        break;
      case 'postCode':
        if (COUNTRY == 'jp') {
          if (compositionFlag) {
            if (tvalue.length < 6) {
              tvalue = tvalue
                .replace(/\s/g, '')
                .replace(/-$/, '')
                .replace(/(\d{3})(?:\d)/g, '$1-');
            }
          }
        }
        // 可以输入字母+数字
        if (COUNTRY != 'jp' && postCodeFiledType !== 2) {
          tvalue = tvalue.replace(/\s+/g, '');
          if (!this.isNumber(tvalue)) {
            tvalue = '';
            return;
          }
        }
        switch (COUNTRY) {
          case 'us':
            tvalue = tvalue
              .replace(/\s/g, '')
              .replace(/-$/, '')
              .replace(/(\d{5})(?:\d)/g, '$1-');
            break;
          case 'jp':
            break;
          default:
            if (postCodeFiledType !== 2) {
              tvalue = tvalue.replace(/\s+/g, '');
            } else {
              // 添加字母+数字格式限制
            }
            break;
        }
        break;
    }
    caninForm[tname] = tvalue;

    this.setState({ caninForm }, () => {
      this.updateDataToProps();
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
      this.updateDataToProps();
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

  jpNameKatakanaValid = (name, value) => {
    if (COUNTRY !== 'jp') return;
    const { errMsgObj } = this.state;
    if (['firstNameKatakana', 'lastNameKatakana'].indexOf(name) > -1) {
      const jpNameReg = /^(?=.*?[\u30A1-\u30FC])[\u30A1-\u30FC\s]*$/;
      const jpNameValid = jpNameReg.test(value);
      if (jpNameValid) {
        this.setState(
          {
            errMsgObj: Object.assign({}, errMsgObj, {
              [name]: ''
            })
          },
          () => {
            const { firstNameKatakana, lastNameKatakana } = errMsgObj;
            if (!firstNameKatakana && !lastNameKatakana)
              this.props.getJpNameValidFlag(true);
          }
        );
      } else {
        this.setState(
          {
            errMsgObj: Object.assign({}, errMsgObj, {
              [name]: this.getIntlMsg('registerIllegalSymbol')
            })
          },
          () => {
            const { firstNameKatakana, lastNameKatakana } = errMsgObj;
            if (firstNameKatakana || lastNameKatakana)
              this.props.getJpNameValidFlag(false);
          }
        );
      }
    }
  };

  // 验证数据
  validvalidationData = async (tname, tvalue) => {
    const { errMsgObj, caninForm, isDeliveryDateAndTimeSlot } = this.state;

    if (!caninForm?.formRuleRu?.length) {
      return;
    }
    let targetRule = null;
    this.jpNameKatakanaValid(tname, tvalue);

    if (isDeliveryDateAndTimeSlot) {
      targetRule = caninForm?.formRuleRu.filter((e) => e.key === tname);
    } else {
      targetRule = caninForm?.formRule.filter((e) => e.key === tname);
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
      console.log('targetRule', targetRule);
      await validData({
        rule: targetRule,
        data: { [tname]: tvalue },
        intl: this.props.intl
      });

      //checkout大改造
      this.clearErrMsgObj(tname);
      this.setFormItemStatus(tname, 'inputOk');

      if (COUNTRY != 'ru') {
        // 俄罗斯需要先校验 DuData 再校验所有表单数据
        this.validFormAllData(); // 验证表单所有数据
      }
    } catch (err) {
      this.setFormItemStatus(tname, 'inputErr');
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
    const { intl } = this.props;
    const { caninForm, isDeliveryDateAndTimeSlot } = this.state;
    try {
      // 验证整个表单
      if (isDeliveryDateAndTimeSlot) {
        await validData({ rule: caninForm.formRuleRu, data: caninForm, intl });
      } else {
        //console.log(444,caninForm.formRule)
        await validData({ rule: caninForm.formRule, data: caninForm, intl });
      }
      this.props.getFormAddressValidFlag(true);
    } catch (err) {
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
      this.updateDataToProps();
      // 验证数据
      this.validvalidationData('city', caninForm.city);
    });
  };

  // 对应的国际化字符串
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };
  // 地址搜索框失去焦点 2
  handleSearchSelectionBlur = (e) => {
    const { caninForm, apiType } = this.state;
    const target = e.target;
    const tvalue = target?.value;
    const tname = target?.name;
    if (tvalue == '') {
      this.props.getFormAddressValidFlag(false);
      caninForm.address1 = '';
      this.setState(
        {
          caninForm,
          address1Data: []
        },
        () => {
          this.updateDataToProps();
          this.selectInputBlur(e);
        }
      );
    }
    if (apiType === 'DQE' && tvalue) {
      setTimeout(() => {
        if (!this.state.addrSearchSelectFlag) {
          caninForm[tname] = this.state.newAddress1;
          this.setState({
            caninForm
          });
        }
      }, 1000);
    }
  };
  // 地址搜索选择 1 (DuData、DQE)
  handleAddressInputChange = async (data) => {
    console.log('data', data);
    const { caninForm, apiType } = this.state;

    this.setState({
      address1Data: data,
      addrSearchSelectFlag: true
    });
    if (apiType === 'DADATA') {
      // 判断选中的地址是否有错误信息
      let errMsg = data.errMsg;
      let errMsgEn = data.errMsgEn;
      if (!errMsg) {
        // DuData相关参数
        caninForm.province = data.province;
        caninForm.area = data.area;
        caninForm.settlement = data.settlement;
        caninForm.street = data.street;
        caninForm.house = data.house;
        caninForm.housing = data.block;
        if (data.entrance != null && data.flat != null) {
          //Datata返回数据为空，就不去把空值赋值给caniform
          caninForm.entrance = data.entrance;
          caninForm.apartment = data.flat;
        }

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

        //临时处理bug-不是莫斯科地址传的莫斯科地址的问题
        this.props.updateBugData &&
          this.props.updateBugData({
            cityIdStr: data.cityId,
            city: data.city,
            province: data.province,
            provinceIdStr: data.provinceId
          });

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
          caninForm.minDeliveryTime = calculation?.minDeliveryTime;
          caninForm.maxDeliveryTime = calculation?.maxDeliveryTime;

          // 重置地址相关信息并清空错误提示
          this.setState(
            {
              caninForm: caninForm,
              errMsgObj: {
                ['address1']: ''
              }
            },
            () => {
              // 控制按钮状态
              this.props.getFormAddressValidFlag(true);
              // purchases接口计算运费
              this.props.calculateFreight(this.state.caninForm);
              // delivery date and time slot
              if (this.props.showDeliveryDateTimeSlot) {
                this.getDeliveryDateAndTimeSlotData(data?.provinceId);
              } else {
                this.updateDataToProps();
              }
            }
          );
        });
      } else {
        // 显示错误信息
        this.setState(
          {
            errMsgObj: {
              ['address1']: this.getIntlMsg('payment.pleaseInput') + errMsg
            },
            isDeliveryDateAndTimeSlot: false
          },
          () => {
            let errMsgEnStr = `Please input: ${errMsgEn}`;
            this.props.onSearchSelectionError?.(errMsgEnStr);
          }
        );
      }
    } else if (apiType === 'DQE') {
      returnDQE({
        idVoie: data.idvoie,
        streetNumber: data.selectedListeNumero,
        pays: data.pays
      });
      Object.assign(caninForm, {
        address1: data.address1,
        deliveryAddress: data.label,
        city: data.city,
        county: data?.county || null,
        postCode: data.postCode
      });
      this.setState(
        {
          newAddress1: data.label,
          caninForm
        },
        () => {
          this.validvalidationData('address1', this.state.caninForm.address1);
          this.validvalidationData('postCode', this.state.caninForm.postCode);
          this.updateDataToProps();
        }
      );
    }
  };
  // 地址搜索框输入值接收，控制按钮状态 3
  getSearchInputChange = (e) => {
    const { apiType, caninForm } = this.state;
    //fix bug start
    Object.assign(caninForm, {
      address1: e.target.value,
      deliveryAddress: e.target.value
    });
    //fix bug end
    const target = e?.target;
    const tname = target?.name;
    const tvalue = target?.value;
    if (apiType === 'DADATA') {
      this.props.getFormAddressValidFlag(false);
    } else {
      this.setState({
        newAddress1: tvalue,
        addrSearchSelectFlag: false,
        caninForm
      });
    }
    // 验证数据
    this.validvalidationData(tname, tvalue);
    this.updateDataToProps();
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
    let errArrEn = [];
    let streets = this.getIntlMsg('payment.streets'),
      postCode = this.getIntlMsg('payment.postCode'),
      house = this.getIntlMsg('payment.house'),
      city = this.getIntlMsg('payment.city'),
      province = this.getIntlMsg('payment.state'),
      settlement = this.getIntlMsg('payment.settlement');
    let streetsEn = 'streets',
      postCodeEn = 'postCode',
      houseEn = 'house',
      cityEn = 'city',
      provinceEn = 'state',
      settlementEn = 'settlement';

    !data.street && errArr.push(streets);
    !data.postCode && errArr.push(postCode);
    !data.house && errArr.push(house);
    !data.city && errArr.push(city);
    !data.province && errArr.push(province);
    !data.settlement && errArr.push(settlement);

    !data.street && errArrEn.push(streetsEn);
    !data.postCode && errArrEn.push(postCodeEn);
    !data.house && errArrEn.push(houseEn);
    !data.city && errArrEn.push(cityEn);
    !data.province && errArrEn.push(provinceEn);
    !data.settlement && errArrEn.push(settlementEn);

    data.errMsg = errArr.join(',');
    data.errMsgEn = errArrEn.join(',');
    return data;
  };
  // 地址搜索框
  addressSearchSelectionJSX = (item) => {
    const { caninForm, apiType } = this.state;

    return (
      <>
        <SearchSelection
          {...this.props}
          queryList={async ({ inputVal }) => {
            let res = null;
            let robj = null;
            // 自动填充
            if (apiType === 'DADATA') {
              res = await getAddressBykeyWord({ keyword: inputVal });
              robj = ((res?.context && res?.context?.addressList) || []).map(
                (ele) => Object.assign(ele, { name: ele.unrestrictedValue })
              );
            } else if (apiType === 'DQE') {
              res = await DQEAddressList(inputVal);
              robj = (res?.context || []).map((item) =>
                Object.assign(item, {
                  name: item.label,
                  newName: item.address1
                })
              );
              let guojia = COUNTRY.toUpperCase();
              robj.map((item) => {
                let newitem = {
                  address1: item?.address1,
                  area: null,
                  areaId: null,
                  block: null,
                  city: item?.localite,
                  cityId: null,
                  country: guojia,
                  countryCode: guojia,
                  entrance: null,
                  flat: null,
                  floor: null,
                  house: null,
                  houseId: null,
                  postCode: item?.codePostal,
                  state: item?.county,
                  provinceId: null,
                  settlement: null,
                  settlementId: null,
                  street: item?.voie,
                  streetId: null,
                  streetWithNoType: null,
                  unrestrictedValue: item?.label
                };
                Object.assign(item, newitem);
              });
            }

            if (robj.length) {
              // 给查询到的地址拼接 errMsg
              robj.forEach((item) => {
                item = this.setDuDataAddressErrMsg(item);
              });
            } else {
              if (COUNTRY === 'ru') {
                this.props.getFormAddressValidFlag(false);
              }
            }
            return robj;
          }}
          timeout={apiType === 'DADATA' ? 80 : 1000}
          selectedItemChange={(data) => this.handleAddressInputChange(data)}
          searchSelectionBlur={this.handleSearchSelectionBlur}
          searchInputChange={this.getSearchInputChange}
          // key={caninForm[item.fieldKey]}
          defaultValue={caninForm[item.fieldKey]}
          value={caninForm[item.fieldKey] || ''}
          freeText={item.inputFreeTextFlag == 1 ? true : false}
          name={item.fieldKey}
          prefixIcon={
            <span className="absolute left-0 top-1 iconfont iconSearch text-gray-400"></span>
          }
          // placeholder={
          //   this.props.placeholder
          //     ? this.props.intl.messages.inputSearchText
          //     : ''
          // }
          placeholder={item.fieldKey}
          customStyle={true}
          isLoadingList={false}
          isBottomPaging={true}
        />
      </>
    );
  };
  maxLengthFun = (item) => {
    let maxLength = 0;
    if (item.fieldKey == 'postCode' && COUNTRY == 'jp') {
      maxLength = 8;
    } else if (item.fieldKey == 'phoneNumber' && COUNTRY == 'jp') {
      maxLength = 11;
    } else if (item?.fieldKey == 'lastName' && COUNTRY == 'jp') {
      maxLength = 49;
    } else {
      maxLength = item.maxLength;
    }
    return maxLength;
  };
  // 文本框
  inputJSX = (item) => {
    const { caninForm } = this.state;
    return (
      <>
        <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
          <input
            className={`rc-input__control ${item.fieldKey}Shipping`}
            id={`${item.fieldKey}Shipping`}
            type={item.filedType}
            //value={getInputValue(item)}
            value={caninForm[item.fieldKey] || ''}
            onChange={this.inputChange}
            onCompositionStart={this.compositionStart}
            onCompositionEnd={this.compositionEnd}
            onBlur={this.inputBlur}
            name={item.fieldKey}
            disabled={item?.disabled ? true : false}
            maxLength={this.maxLengthFun(item)}
            autoComplete="off"
          />
          <label className="rc-input__label" htmlFor="id-text1" />
        </span>
      </>
    );
  };
  //checkout大改造
  clearErrMsgObj = (tname) => {
    const { errMsgObj } = this.state;
    const newErrMsgObj = { ...errMsgObj };
    newErrMsgObj[tname] = '';
    this.setState({ errMsgObj: newErrMsgObj });
  };
  //checkout大改造
  setFormItemStatus = (tname, status) => {
    const { caninForm } = this.state;
    const formList = [...this.state.formList];

    formList.forEach((list) => {
      if (list.fieldKey == tname) {
        list.Status = status;
      }
    });
    this.setState({ formList });
  };
  //checkout大改造
  newInputCommon = (e) => {
    const tname = e.target.name;
    const { caninForm } = this.state;
    const formList = [...this.state.formList];

    formList.forEach((list) => {
      if (list.fieldKey == tname) {
        if (caninForm[tname] == '') {
          list.Status = 'empty';
        }
        if (caninForm[tname] != '') {
          list.Status = 'normal';
        }
      }
    });
    this.setState({ formList });
  };

  //checkout大改造
  newInputFous = (e) => {};
  //checkout大改造
  newInputBlur = (e) => {};
  //checkout大改造
  newInputChange = (e) => {
    const { caninForm, postCodeFiledType } = this.state;
    const target = e.target;
    let tvalue = target.type === 'checkbox' ? target.checked : target.value;
    const tname = target.name;

    switch (tname) {
      case 'postCode':
        // if (COUNTRY == 'jp') {
        //   if (compositionFlag) {
        //     if (tvalue.length < 6) {
        //       tvalue = tvalue
        //         .replace(/\s/g, '')
        //         .replace(/-$/, '')
        //         .replace(/(\d{3})(?:\d)/g, '$1-');
        //     }
        //   }
        // }
        // 可以输入字母+数字
        // if (COUNTRY != 'jp' && postCodeFiledType !== 2) {
        //   tvalue = tvalue.replace(/\s+/g, '');
        //   if (!this.isNumber(tvalue)) {
        //     tvalue = '';
        //     return;
        //   }
        // }
        switch (COUNTRY) {
          case 'us':
            tvalue = tvalue
              .replace(/\s/g, '')
              .replace(/-$/, '')
              .replace(/(\d{5})(?:\d)/g, '$1-');
            break;
          case 'jp':
            if (compositionFlag) {
              //日本圆角输入
              if (tvalue.length < 6) {
                tvalue = tvalue
                  .replace(/\s/g, '')
                  .replace(/-$/, '')
                  .replace(/(\d{3})(?:\d)/g, '$1-');
              }
            }
            break;
          default:
            if (postCodeFiledType !== 2) {
              tvalue = tvalue.replace(/\s+/g, '');
            }
            break;
        }
        break;
    }
    caninForm[tname] = tvalue;

    //checkout大改造
    if (tvalue == 0) {
      this.clearErrMsgObj(tname);
      this.setFormItemStatus(tname, 'empty');
      return;
    }

    //checkout大改造
    this.newInputCommon(e);

    this.setState({ caninForm }, () => {
      this.updateDataToProps();
      if (tname == 'postCode' && isCanVerifyBlacklistPostCode) {
        this.debounceValidvalidationData(tname, tvalue);
      } else {
        this.validvalidationData(tname, tvalue);
      }
    });
  };
  //checkout大改造
  newInputJSX = (item) => {
    const { caninForm } = this.state;

    const statusObj = item.InitFormStatus[item.Status];
    return (
      <>
        <div className="w-100">
          <label className="flex flex-col">
            {
              <span
                className={cn('text-sm my-1', {
                  visible: statusObj['showLabel'],
                  invisible: !statusObj['showLabel']
                })}
              >
                {/* <FormattedMessage id={`payment.${item.fieldKey}`} /> */}
                {item.fieldKey}
              </span>
            }

            <div className="relative">
              <input
                className={`${statusObj['border']} w-full text-14 py-2 placeholder-primary placeholder-opacity-50 ${statusObj['borderColorCss']}`}
                onFocus={this.newInputFous}
                id={`${item.fieldKey}Shipping`}
                type={item.filedType}
                value={caninForm[item.fieldKey] || ''}
                //onChange={this.inputChange}
                onChange={this.newInputChange}
                onCompositionStart={this.compositionStart}
                onCompositionEnd={this.compositionEnd}
                //onBlur={this.inputBlur}
                onBlur={this.newInputBlur}
                name={item.fieldKey}
                disabled={item?.disabled ? true : false}
                maxLength={this.maxLengthFun(item)}
                autoComplete="off"
                placeholder={item.fieldKey}
              />
              <i
                className={cn(
                  'absolute right-0 top-1 iconfont',
                  statusObj['iconCss']
                )}
              ></i>
            </div>
          </label>
        </div>
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
            autoComplete="new-password"
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
            // {...this.props}
          />
        </span>
      </>
    );
  };
  // 下拉框
  dropDownBoxJSX = (item) => {
    const { caninForm, countryList } = this.state;

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
              key={caninForm[item.fieldKey + 'Id']}
              selectedItemChange={(data) =>
                this.handleSelectedItemChange(item.fieldKey, data)
              }
              optionList={this.computedList(item.fieldKey)}
              choicesInput={true}
              emptyFirstItem={'State'}
              name={item.fieldKey}
              selectedItemData={{ value: caninForm[item.fieldKey + 'Id'] }}
            />
          ) : (
            <Selection
              key={caninForm[item.fieldKey + 'Id']}
              selectedItemChange={(data) =>
                this.handleSelectedItemChange(item.fieldKey, data)
              }
              optionList={this.computedList(item.fieldKey)}
              choicesInput={true}
              name={item.fieldKey}
              selectedItemData={{
                value:
                  item.fieldKey === 'country'
                    ? countryList[0].id
                    : caninForm[item.fieldKey + 'Id']
              }}
            />
          )}
        </span>
      </>
    );
  };
  // birthData onchange
  onDateChange(date) {
    const { caninForm } = this.state;
    let newdate = format(new Date(date), 'yyyy-MM-dd');
    caninForm['birthdate'] = date ? newdate : '';
    this.setState({ caninForm }, () => {
      this.updateDataToProps();
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
                autoComplete="new-password"
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
              <DatePickerComponent
                className="receiveDate birthDateShipping"
                style={{ padding: '.95rem 0' }}
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
          <Skeleton height="10%" count={4} />
        ) : (
          <div>
            <div className="flex">
              <div className="w-full md:w-80 flex flex-col mr-0 md:mr-20">
                <div className="mb-10 w-100">
                  {this.emailItem.length > 0 &&
                    this.newInputJSX(this.emailItem[0])}
                </div>
                <div className="mb-10 w-100">
                  {this.firstNameItem.length > 0 &&
                    this.newInputJSX(this.firstNameItem[0])}
                </div>
                <div className="mb-10 w-100">
                  {this.lastNameItem.length > 0 &&
                    this.newInputJSX(this.lastNameItem[0])}
                </div>
              </div>
              <FastRegisterCard />
            </div>

            <div className="mb-4 w-100">
              {this.state.showSearchAddressPreview && (
                <SearchAddressPreview data={this.state.caninForm} />
              )}
              {!this.state.showSearchAddressPreview &&
                this.address1Item.length > 0 &&
                this.addressSearchSelectionJSX(this.address1Item[0])}
            </div>

            {false &&
              formList?.map((item, index) => (
                <Fragment key={index}>
                  <div
                    className={`col-md-12 ${
                      isDeliveryDateAndTimeSlot &&
                      item.fieldKey == 'deliveryDate' &&
                      COUNTRY === 'jp'
                        ? ''
                        : 'hidden'
                    }`}
                  >
                    <div
                      className="text-22 pt-4 pb-2"
                      style={{ color: '#888888' }}
                    >
                      <FormattedMessage id="payment.delivery.title" />
                    </div>
                    <div className="text-16 pb-8">
                      <FormattedMessage id="payment.delivery.content" />
                    </div>
                  </div>

                  <div
                    className={`hidden col-md-${
                      item.occupancyNum == 1 ? 6 : 12
                    } ${
                      !isDeliveryDateAndTimeSlot &&
                      (item.fieldKey == 'deliveryDate' ||
                        item.fieldKey == 'timeSlot')
                        ? 'hidden'
                        : ''
                    }`}
                  >
                    {/* requiredFlag '是否必填: 0.关闭,1.开启' */}
                    <div className="form-group">
                      {/* 当 inputFreeTextFlag=1，inputSearchBoxFlag=0 时，为普通文本框（text、number） */}
                      {item.inputFreeTextFlag == 1 &&
                      item.inputSearchBoxFlag == 0 ? (
                        <>
                          {item.fieldKey == 'comment'
                            ? this.textareaJSX(item)
                            : //: item.fieldKey == 'phoneNumber'?this.phoneNumberInputJSX(item):this.inputJSX(item)}
                              this.newInputJSX(item)}
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

                      {/* 输入提示 */}
                      {errMsgObj[item.fieldKey] && item.requiredFlag == 1 ? (
                        <div className="text-form-err">
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
                </Fragment>
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
