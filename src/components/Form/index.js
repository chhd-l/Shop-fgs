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
  getFormatDate,
  getZoneTime,
  getDeviceType
} from '@/utils/utils';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Loading from '@/components/Loading';
import {
  getSystemConfig,
  getAddressSetting,
  getProvincesList,
  getRegionByCityId,
  getAddressBykeyWord,
  getCityList,
  getDeliveryDateAndTimeSlot
} from '@/api';
import { shippingCalculation } from '@/api/cart';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import IMask from 'imask';
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
      formSettingSwitch: 'MANUALLY',
      caninForm: {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        address1: '',
        address2: '',
        country: '',
        countryId: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
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
        entrance: '',
        apartment: '',
        comment: '',
        minDeliveryTime: 0,
        maxDeliveryTime: 0,
        DuData: null, // 俄罗斯DuData
        formRule: [] // form表单校验规则
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

    // console.log('112 -------------★ EditForm initData: ', initData);
    // console.log('113-------------★ EditForm caninForm: ', caninForm);
    this.setState({ caninForm: Object.assign(caninForm, initData) }, () => {
      this.updateDataToProps(this.state.caninForm);
    });

    // 获取 session 存储的 address form 数据并处理
    this.setAddressFormData();

    // 如果有areaId
    if (initData?.areaId) {
      this.getRegionDataByCityId(initData.cityId);
    }

    // 重置参数
    this.props.getFormAddressValidFlag(false);
  }
  // 0、获取 DeliveryDate 和 TimeSlot
  getDeliveryDateAndTimeSlot = async (str) => {
    let res = null;
    try {
      res = await getDeliveryDateAndTimeSlot({ cityNo: str });
      let flag = false;
      let ddts = {};
      let ddlist = [];
      let tslist = [];
      if (res.context) {
        flag = true;
        let robj = res.context;
        robj.forEach((v, i) => {
          ddts[v.date] = v.dateTimeInfos;
          ddlist.push({
            value: i,
            name: v.date,
            date: v.date,
            weekDay: v.weekDay
          });

          (v?.dateTimeInfos).forEach((r, j) => {
            i == 0
              ? tslist.push({
                  value: j,
                  name: r.startTime + ' - ' + r.endTime,
                  startTime: r.startTime,
                  endTime: r.endTime,
                  sort: r.sort
                })
              : '';
          });
        });
      }
      this.setState({
        isDeliveryDateAndTimeSlot: flag,
        deliveryDataTimeSlotList: ddts,
        deliveryDateList: ddlist,
        timeSlotList: tslist
      });
    } catch (err) {
      console.warn(err);
    } finally {
      return res;
    }
  };
  // 设置手机号输入限制
  setPhoneNumberReg = () => {
    let element = document.getElementById('phoneNumberShipping');
    let maskOptions = [];
    let phoneReg = '';
    switch (process.env.REACT_APP_COUNTRY) {
      case 'FR':
        phoneReg = [
          { mask: '(+33) 0 00 00 00 00' },
          { mask: '(+33) 00 00 00 00 00' }
        ];
        break;
      case 'US':
        phoneReg = [{ mask: '000-000-0000' }];
        break;
      case 'RU':
        phoneReg = [{ mask: '+{7} (000) 000-00-00' }];
        break;
      case 'MX':
        phoneReg = [{ mask: '+(52) 000 000 00' }];
        break;
      case 'TR':
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
  setAddressFormData = () => {
    const { caninForm } = this.state;
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
          } else {
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
    const { caninForm } = this.state;
    let rule = [];
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
      process.env.REACT_APP_COUNTRY == 'RU' &&
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
          process.env.REACT_APP_COUNTRY == 'US'
            ? (regExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/)
            : (regExp = /^\d{5}$/);
          errMsg = CURRENT_LANGFILE['enterCorrectPostCode'];
          break;
        case 'email':
          regExp = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
          errMsg = CURRENT_LANGFILE['pleaseEnterTheCorrectEmail'];
          break;
        case 'phoneNumber':
          if (process.env.REACT_APP_COUNTRY == 'FR') {
            // 法国
            regExp = /^\(\+[3][3]\)[\s](([0][1-9])|[1-9])[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/;
          } else if (process.env.REACT_APP_COUNTRY == 'US') {
            // 美国
            regExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          } else if (process.env.REACT_APP_COUNTRY == 'MX') {
            // 墨西哥
            regExp = /^\+\([5][2]\)[\s\-][0-9]{3}[\s\-][0-9]{3}[\s\-][0-9]{2}$/;
          } else if (process.env.REACT_APP_COUNTRY == 'RU') {
            // 俄罗斯
            regExp = /^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          } else if (process.env.REACT_APP_COUNTRY == 'TR') {
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
          if (process.env.REACT_APP_COUNTRY == 'RU') {
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
      if (item.fieldKey == 'postCode' || item.fieldKey == 'phoneNumber') {
        ruleItem.regExp = regExp;
      }
      rule.push(ruleItem);

      // 查询城市列表
      if (item.fieldKey == 'city' && item.inputDropDownBoxFlag == 1) {
        this.getAllCityList();
      }
    });

    cfdata.formRule = rule;
    this.setState({
      caninForm: Object.assign(caninForm, cfdata)
    });
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
        storeId: process.env.REACT_APP_STOREID
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
            this.setState(
              {
                caninForm
              },
              () => {
                console.log(
                  '479 -- ★  根据cityId查询region caninForm: ',
                  caninForm
                );
              }
            );
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
      console.log('★ -------------- 2、计算运费 res: ', res);
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
    let newForm = Object.assign({}, data);
    // 处理法国电话号码格式，(+33) 0X XX XX XX XX 保存为: (+33) X XX XX XX XX
    if (process.env.REACT_APP_COUNTRY == 'FR') {
      let tvalue = newForm.phoneNumber;
      if (tvalue?.length > 19) {
        newForm['phoneNumber'] = tvalue.replace(/0/, '');
      }
    }
    this.props.updateData(newForm);
  };
  // 下拉框选择
  handleSelectedItemChange(key, data) {
    const { caninForm, deliveryDataTimeSlotList } = this.state;
    caninForm[key + 'Id'] = data.value;
    if (key == 'state') {
      caninForm.provinceId = data.value;
      caninForm.province = data.name;
      caninForm.provinceNo = data.no; // 省份简写

      caninForm.stateId = data.value;
      caninForm.state = data.name;
      caninForm.stateNo = data.no; // 省份简写
    } else if (key == 'country') {
      caninForm.country = data.name;
    } else if (key == 'city') {
      caninForm.city = data.name;
      caninForm.areaId = '';
      caninForm.area = '';
      caninForm.regionId = '';
      caninForm.region = '';
      this.setState({
        regionList: []
      });
      // 获取本地存储的需要显示的地址字段
      const localAddressForm = this.props.configStore.localAddressForm;
      if (localAddressForm['region']) {
        this.getRegionDataByCityId(data.value);
      }
    } else if (key == 'region') {
      caninForm.area = data.name;
      caninForm.areaId = data.value;
      caninForm.region = data.name;
      caninForm.regionId = data.value;
    } else if (key == 'deliveryDate') {
      caninForm.deliveryDate = data.name;
      let tslist = [];
      deliveryDataTimeSlotList[data.name]?.forEach((r, j) => {
        tslist.push({
          value: j,
          name: r.startTime + ' - ' + r.endTime,
          startTime: r.startTime,
          endTime: r.endTime,
          sort: r.sort
        });
      });
      this.setState({
        timeSlotList: tslist
      });
    } else if (key == 'timeSlot') {
      caninForm.timeSlot = data.name;
    }
    this.setState({ caninForm }, () => {
      this.updateDataToProps(this.state.caninForm);
    });
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
      tmp.unshift({ value: '', name: 'State' });
    } else if (key != 'country') {
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
      switch (process.env.REACT_APP_COUNTRY) {
        case 'US':
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
    caninForm[tname] = tvalue;
    this.setState({ caninForm }, () => {
      this.updateDataToProps(this.state.caninForm);
      this.validvalidationData(tname, tvalue);
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
      // 验证数据
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
    const { errMsgObj, caninForm } = this.state;
    const targetRule = caninForm.formRule.filter((e) => e.key === tname);
    try {
      await validData(targetRule, { [tname]: tvalue });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: ''
        })
      });
      if (process.env.REACT_APP_COUNTRY != 'RU') {
        // 俄罗斯需要先校验 DuData 再校验所有表单数据
        this.validFormAllData(); // 验证表单所有数据
      }
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: err.message
        })
      });
    }
  };
  // 验证表单所有数据
  validFormAllData = async () => {
    const { caninForm } = this.state;
    try {
      await validData(caninForm.formRule, caninForm); // 验证整个表单
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
    });
  };

  // DuData地址搜索选择 1
  handleAddressInputChange = async (data) => {
    console.log('★ -------------- DuData地址搜索选择 data: ', data);
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
            // 控制按钮状态
            this.props.getFormAddressValidFlag(true);
            // purchases接口计算运费
            this.props.calculateFreight(this.state.caninForm);
            // delivery date and time slot
            if (!this.props.isCyberBillingAddress && !this.props.personalData) {
              this.getDeliveryDateAndTimeSlot(data?.cityId);
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
        }
      });
    }
  };
  // 提示消息 1-1
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
    // districtCode             province
    // settlement               settlement
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
          value={caninForm[item.fieldKey]}
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
    return (
      <>
        <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
          <input
            className={`rc-input__control ${item.fieldKey}Shipping`}
            id={`${item.fieldKey}Shipping`}
            type={item.filedType}
            value={caninForm[item.fieldKey]}
            onChange={(e) => this.inputChange(e)}
            onBlur={this.inputBlur}
            name={item.fieldKey}
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
            value={caninForm[item.fieldKey]}
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
              emptyFirstItem="State"
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
    caninForm['birthdate'] = date ? format(date, 'yyyy/MM/dd') : '';
    this.setState({ caninForm }, () => {
      this.updateDataToProps(this.state.caninForm);
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
                value={caninForm.email}
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
