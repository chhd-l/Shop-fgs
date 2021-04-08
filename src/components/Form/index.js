//billaddress灵活配置组件
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
  getFormatDate
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
  getCityList
} from '@/api';
import { shippingCalculation } from '@/api/cart';
import { FormattedMessage, injectIntl } from 'react-intl';
import IMask from 'imask';
import './index.less';

const CURRENT_LANGFILE = locales;
@injectIntl
class Form extends React.Component {
  static defaultProps = {
    type: 'billing',
    initData: null,
    personalData: false,
    isCyberBillingAddress: false,
    isLogin: false,
    russiaAddressValidFlag: true,
    updateData: () => {},
    getRussiaAddressValidFlag: () => {}
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
      errMsgObj: {}
    };
  }
  componentDidMount() {
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

    // console.log('91 -------------★ EditForm initData: ', initData);
    //console.log('92-------------★ EditForm caninForm: ', caninForm);

    this.setState({ caninForm: Object.assign(caninForm, initData) }, () => {
      this.props.updateData(this.state.caninForm);
    });

    // 1、查询form表单配置开关
    this.getSystemFormConfig();
  }
  // 1、查询form表单配置开关
  getSystemFormConfig = async () => {
    const { caninForm } = this.state;
    try {
      const res = await getSystemConfig({ configType: 'address_input_type' });
      if (res?.context?.configVOList) {
        let manually = '',
          automatically = '';
        let robj = res.context.configVOList;
        robj.forEach((item) => {
          if (item.configKey == 'address_input_type_manually') {
            manually = item.context;
          } else if (item.configKey == 'address_input_type_automatically') {
            automatically = item.context;
          }
        });
        let fromSetSwitch =
          manually == 1 && automatically == 0 ? 'MANUALLY' : 'AUTOMATICALLY';
        this.setState({
          formSettingSwitch: fromSetSwitch
        });
        // 根据接口类型查询表单数据
        this.getAddressSettingByApi(manually, automatically);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 2、根据接口类型（自己接口: MANUALLY，自动填充: AUTOMATICALLY）查询表单数据
  getAddressSettingByApi = async (manually, automatically) => {
    const { formSettingSwitch, caninForm } = this.state;
    try {
      const res = await getAddressSetting({
        addressApiType: formSettingSwitch
      });
      if (res?.context?.addressDisplaySettings) {
        this.setState(
          {
            addressSettings: res.context.addressDisplaySettings
          },
          () => {
            let narr = null;
            // 过滤掉不可用的
            if (this.props.isCyberBillingAddress) {
              // 美国加卡不要电话号码
              narr = this.state.addressSettings.filter(
                (item) => item.enableFlag == 1 && item.fieldKey != 'phoneNumber'
              );
            } else if (this.props.personalData) {
              narr = this.state.addressSettings.filter(
                (item) => item.enableFlag == 1 && item.fieldKey != 'comment'
              );
            } else {
              narr = this.state.addressSettings.filter(
                (item) => item.enableFlag == 1
              );
            }

            let ress = this.formListByRow(narr, (item) => {
              return [item.sequence];
            });
            this.setState(
              {
                formList: ress
              },
              () => {
                if (manually == 1) {
                  // 查询州列表（美国 state）
                  this.getUsStateList();
                }
                this.setState(
                  {
                    formLoading: false
                  },
                  () => {
                    this.props.updateData(caninForm);
                  }
                );
              }
            );
          }
        );
      } else {
        this.setState({
          formLoading: false
        });
      }
    } catch (err) {
      this.setState({
        formLoading: false
      });
    }
  };
  // 3、格式化表单json
  formListByRow(array, fn) {
    const { caninForm } = this.state;
    const groups = {};
    let rule = [];

    // 绑卡页面添加 email
    let emailObj = {
      id: 99999999,
      sequence: 99999999,
      inputType: 0,
      fieldKey: 'email',
      fieldName: 'email',
      filedType: 'text',
      inputFreeTextFlag: 1,
      inputSearchBoxFlag: 0,
      inputDropDownBoxFlag: 0,
      maxLength: 50,
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
    if (this.props.isCyberBillingAddress) {
      array.push(emailObj);
    }

    array.forEach((item) => {
      // filedType '字段类型:0.text,1.number'
      // item.filedType = item.filedType == 0 ? 'text' : 'number';
      item.filedType = 'text';
      let regExp = '';
      let errMsg = '';
      switch (item.fieldKey) {
        case 'postCode':
          process.env.REACT_APP_LANG == 'en'
            ? (regExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/)
            : (regExp = /^\d{5}$/);
          errMsg = CURRENT_LANGFILE['enterCorrectPostCode'];
          break;
        case 'email':
          regExp = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
          errMsg = CURRENT_LANGFILE['pleaseEnterTheCorrectEmail'];
          break;
        case 'phoneNumber':
          if (process.env.REACT_APP_LANG == 'fr') {
            regExp = /[+(33)|0]\d{9}$/;
          } else if (process.env.REACT_APP_LANG == 'en') {
            regExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
          } else if (process.env.REACT_APP_LANG == 'ru') {
            regExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          } else if (process.env.REACT_APP_LANG == 'mx') {
          } else if (process.env.REACT_APP_LANG == 'de') {
          } else if (process.env.REACT_APP_LANG == 'tr') {
            regExp = /^0\s\(?([2-9][0-8][0-9])\)?\s([2-9][0-9]{2})[\-\. ]?([0-9]{2})[\-\. ]?([0-9]{2})(\s*x[0-9]+)?$/;
          } else {
            regExp = /\S/;
          }
          errMsg = CURRENT_LANGFILE['enterCorrectPhoneNumber'];
          break;
        default:
          regExp = /\S/;
          let errstr = '';
          if (process.env.REACT_APP_LANG == 'ru') {
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
      let ruleItem = {};
      if (item.fieldKey == 'postCode' || item.fieldKey == 'phoneNumber') {
        ruleItem = {
          regExp: regExp,
          errMsg: errMsg,
          key: item.fieldKey,
          require: item.requiredFlag == 1 ? true : false
        };
      } else {
        ruleItem = {
          errMsg: errMsg,
          key: item.fieldKey,
          require: item.requiredFlag == 1 ? true : false
        };
      }

      rule.push(ruleItem);

      // 利用对象的key值唯一性的，创建数组
      const group = JSON.stringify(fn(item));
      groups[group] = groups[group] || [];
      groups[group].push(item);

      // 查询城市列表
      if (item.fieldKey == 'city' && item.inputDropDownBoxFlag == 1) {
        this.getAllCityList();
      }
    });

    caninForm.formRule = rule;
    this.setState({
      caninForm
    });
    // 最后再利用map循环处理分组出来
    return Object.keys(groups).map((group) => {
      return groups[group];
    });
  }
  // 4、查询国家
  getCountryList = async () => {
    const { caninForm } = this.state;
    try {
      const res = await getDictionary({ type: 'country' });
      if (res) {
        let cfm = caninForm;
        cfm.country = res[0].value;
        cfm.countryId = res[0].id;
        this.setState({
          countryList: res,
          caninForm: Object.assign(this.state.caninForm, cfm)
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 5、查询州列表（美国 state）
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
      console.log(err);
    }
  };
  // 6-1、查询city list
  getAllCityList = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };
  // 6-2、根据cityId查询region
  getRegionDataByCityId = async (cityId) => {
    try {
      const res = await getRegionByCityId({ cityId: cityId });
      if (res?.context?.systemRegions) {
        let regarr = [];
        let obj = res.context.systemRegions;
        obj.forEach((item) => {
          let res = {
            id: item.id,
            name: item.regionName,
            no: item.regionNo
          };
          regarr.push(res);
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
  // 7-1、根据address1查询地址信息
  // 俄罗斯地址没有办法用不完整的地址匹配，因为模糊查询出来是一个地址列表
  getAddressListByKeyWord = async (address1) => {
    // const { caninForm } = this.state;
    try {
      // let address1 = caninForm.address1;
      let res = await getAddressBykeyWord({ keyword: address1 });
      console.log('★ -------------- 7-1、根据address1查询地址信息 res: ', res);
      if (res?.context && res?.context?.addressList.length > 0) {
        let addls = res.context.addressList;
        addls.forEach((item) => {
          if (item.unrestrictedValue == address1) {
            console.log('★ ----------- item: ', item);
            this.getDuDataAddressIntegrity(item);
          }
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // 7-2、根据地址查询运费
  getShippingCalculation = async (data) => {
    const { caninForm } = this.state;
    this.setState({
      dataLoading: true
    });
    try {
      let res = await shippingCalculation({
        sourceRegionFias: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
        sourceAreaFias: null,
        sourceCityFias: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
        sourceSettlementFias: null,
        sourcePostalCode: null,
        regionFias: data.provinceId,
        areaFias: data.areaId,
        cityFias: data.cityId,
        settlementFias: data.settlementId,
        postalCode: data.postCode,
        weight: '1',
        insuranceSum: 0,
        codSum: 0,
        dimensions: {
          height: '1',
          width: '1',
          depth: '1'
        }
      });
      console.log('★ -------------- 2、计算运费 res: ', res);
      if (res?.context?.success && res?.context?.tariffs[0]) {
        let calculation = res?.context?.tariffs[0];
        // 赋值查询到的地址信息
        caninForm.calculation = calculation;
        caninForm.minDeliveryTime = calculation.minDeliveryTime;
        caninForm.maxDeliveryTime = calculation.maxDeliveryTime;
        // 清空错误信息
        this.setState(
          {
            caninForm,
            errMsgObj: {
              ['address1']: ''
            }
          },
          () => {
            this.props.getRussiaAddressValidFlag(true);
            this.props.updateData(this.state.caninForm);
          }
        );
      } else {
        this.setState({
          errMsgObj: {
            ['address1']: this.getIntlMsg('payment.wrongAddress')
          }
        });
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this.setState({
        dataLoading: false
      });
    }
  };
  // 下拉框选择
  handleSelectedItemChange(key, data) {
    const { caninForm } = this.state;
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
      this.setState({
        regionList: [],
        dataLoading: true
      });
      this.getRegionDataByCityId(data.value);
    } else if (key == 'region') {
      caninForm.region = data.name;
    }
    this.setState({ caninForm }, () => {
      this.props.updateData(this.state.caninForm);
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
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name == 'postCode') {
      value = value.replace(/\s+/g, '');
      if (!this.isNumber(value)) {
        value = '';
        return;
      }
      switch (process.env.REACT_APP_LANG) {
        case 'en':
          value = value
            .replace(/\s/g, '')
            .replace(/-$/, '')
            .replace(/(\d{5})(?:\d)/g, '$1-');
          break;
        default:
          value = value.replace(/\s+/g, '');
          break;
      }
    }
    if (name == 'phoneNumber') {
      let element = document.getElementById('shippingphoneNumber');
      let maskOptions = {};
      let phoneReg = '';
      switch (process.env.REACT_APP_LANG) {
        case 'fr':
          phoneReg = '+{33}000000000';
          break;
        case 'en':
          phoneReg = '000-000-0000';
          break;
        case 'ru':
          phoneReg = '+{7} (000) 000-00-00';
          break;
        case 'mx':
          phoneReg = '+ (52) 000000 00';
          break;
        case 'de':
          phoneReg = '0000 000000 000';
          break;
        case 'tr':
          phoneReg = '{0} (000) 000-00-00';
          break;
        default:
          phoneReg = '00000000000';
          break;
      }
      maskOptions = { mask: phoneReg };
      let pval = IMask(element, maskOptions);
      value = pval._value;
    }
    caninForm[name] = value;
    this.setState({ caninForm }, () => {
      this.props.updateData(this.state.caninForm);
    });
    this.inputBlur(e);
  };
  // 文本框失去焦点
  inputBlur = async (e) => {
    const { errMsgObj, caninForm } = this.state;
    const target = e?.target;
    const tname = target?.name;
    const targetRule = caninForm.formRule.filter((e) => e.key === tname);
    const value = target?.type === 'checkbox' ? target?.checked : target?.value;
    try {
      await validData(targetRule, { [tname]: value });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: ''
        })
      });
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: err.message
        })
      });
    }
  };
  // 城市搜索框失去焦点
  handleCitySearchSelectionBlur = (e) => {
    this.inputBlur(e);
  };
  // 城市搜索选择
  handleCityInputChange = (data) => {
    const { caninForm } = this.state;
    caninForm.cityId = data.id;
    caninForm.city = data.cityName;
    this.setState({ caninForm }, () => {
      this.props.updateData(this.state.caninForm);
    });
  };

  // DuData地址搜索选择 1
  handleAddressInputChange = async (data) => {
    console.log('★ -------------- DuData地址搜索选择 data: ', data);
    const { caninForm } = this.state;
    this.setState({
      address1Data: data
    });
    const integrity = this.getDuDataAddressIntegrity(data);
    if (integrity) {
      // DuData相关参数
      caninForm.province = data.region;
      caninForm.area = data.area;
      caninForm.settlement = data.settlement;
      caninForm.street = data.street;
      caninForm.house = data.house;
      caninForm.housing = data.block;

      // 赋值查询到的地址信息
      caninForm.DuData = data;
      caninForm.address1 = data.unrestrictedValue;
      caninForm.city = data.city;
      caninForm.postCode = data.postCode;
      this.setState({ caninForm }, () => {
        // 根据地址查询运费
        this.getShippingCalculation(data);
      });
    }
  };
  // 提示消息 1-1
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };
  // 判断是否是完整地址 1-2
  getDuDataAddressIntegrity = (data) => {
    // 根据地址组装对应的提示信息
    let errMsg = '';
    let streets = this.getIntlMsg('payment.streets'),
      postCode = this.getIntlMsg('payment.postCode'),
      house = this.getIntlMsg('payment.house');

    let dstreet = data?.street,
      dpcode = data?.postCode,
      dhouse = data?.house;
    if (dstreet == null || dpcode == null || dhouse == null) {
      this.props.getRussiaAddressValidFlag(false);
      if (dstreet == null) {
        errMsg = streets;
      }
      if (dpcode == null) {
        errMsg = postCode;
      }
      if (dhouse == null) {
        errMsg = house;
      }
      if (dstreet == null && dpcode == null) {
        errMsg = streets + ', ' + postCode;
      }
      if (dstreet == null && dhouse == null) {
        errMsg = streets + ', ' + house;
      }
      if (dpcode == null && dhouse == null) {
        errMsg = postCode + ', ' + house;
      }
      errMsg = this.getIntlMsg('payment.pleaseInput') + errMsg;
      if (dstreet == null && dpcode == null && dhouse == null) {
        errMsg = this.getIntlMsg('payment.wrongAddress');
      }
      // 显示错误信息
      this.setState({
        errMsgObj: {
          ['address1']: errMsg
        }
      });
      return false;
    } else {
      return true;
    }
  };
  // 地址搜索框失去焦点 2
  handleSearchSelectionBlur = (e) => {
    const { caninForm } = this.state;
    const target = e.target;
    const value = target.value;
    if (value == '') {
      this.props.getRussiaAddressValidFlag(false);
      caninForm.address1 = '';
      this.setState(
        {
          caninForm,
          address1Data: []
        },
        () => {
          this.props.updateData(this.state.caninForm);
          this.inputBlur(e);
        }
      );
    }
  };
  // 地址搜索框输入值接收，控制按钮状态 3
  getSearchInputChange = (val) => {
    if (val == '') {
      this.props.getRussiaAddressValidFlag(false);
    } else {
      this.props.getRussiaAddressValidFlag(true);
    }
  };

  // 地址搜索框
  addressSearchSelectionJSX = (item) => {
    const { caninForm } = this.state;
    return (
      <>
        <SearchSelection
          queryList={async ({ inputVal }) => {
            let res = await getAddressBykeyWord({
              keyword: inputVal
            });
            return (
              (res?.context && res?.context?.addressList) ||
              []
            ).map((ele) => Object.assign(ele, { name: ele.unrestrictedValue }));
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
            className={`rc-input__control shipping${item.fieldKey}`}
            id={`shipping${item.fieldKey}`}
            type={item.filedType}
            value={caninForm[item.fieldKey]}
            onChange={(e) => this.inputChange(e, item)}
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
            id={`shipping${item.fieldKey}`}
            value={caninForm[item.fieldKey]}
            onChange={(e) => this.inputChange(e, item)}
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
    caninForm['birthdate'] = format(date, 'yyyy-MM-dd');
    this.setState({ caninForm }, () => {
      this.props.updateData(this.state.caninForm);
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
            <label className="form-control-label" htmlFor="shippingEmail">
              <FormattedMessage id="account.Email" />
            </label>
            <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
              <input
                type="email"
                className="rc-input__control shippingEmail"
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
            <label className="form-control-label" htmlFor="shippingEmail">
              <FormattedMessage id="account.birthDate" />
            </label>
            <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
              <DatePicker
                className="receiveDate"
                style={{ padding: '.95rem 0' }}
                placeholder="Select Date"
                dateFormat={datePickerConfig.format}
                locale={datePickerConfig.locale}
                maxDate={new Date()}
                selected={
                  caninForm.birthdate
                    ? new Date(caninForm.birthdate)
                    : new Date()
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
      caninForm,
      formList,
      errMsgObj
    } = this.state;
    return (
      <>
        {formLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className="row rc_form_box">
            {/* {JSON.stringify(formList)} */}
            {formList &&
              formList.map((fobj, idx) => (
                <>
                  {fobj.map((item, index) => (
                    <>
                      <div
                        className={`col-md-${item.occupancyNum == 1 ? 6 : 12}`}
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
                            htmlFor={`shipping${item.fieldKey}`}
                          >
                            <FormattedMessage id={`payment.${item.fieldKey}`} />
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

                          {/* inputSearchBoxFlag 是否允许搜索:0.不允许,1.允许 */}
                          {item.inputFreeTextFlag == 1 &&
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
                          {errMsgObj[item.fieldKey] &&
                          item.requiredFlag == 1 ? (
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
                </>
              ))}
          </div>
        )}

        {dataLoading ? <Loading /> : null}
      </>
    );
  }
}

export default Form;
