import React from 'react';
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
import SearchSelection from '@/components/SearchSelection';
import { getDictionary, validData, datePickerConfig } from '@/utils/utils';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { injectIntl } from 'react-intl';
import {
  getSystemConfig,
  getAddressSetting,
  getProvincesList,
  getRegionByCityId,
  getAddressBykeyWord,
  getCityList
} from '@/api';
import { FormattedMessage } from 'react-intl';
import { ADDRESS_RULE } from '@/utils/constant';
import './index.less';

class Form extends React.Component {
  static defaultProps = {
    type: 'billing',
    initData: null,
    personalData: false,
    isLogin: false,
    updateData: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      formSettingSwitch: '',
      caninForm: {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        address1: '',
        DaData: null,
        address2: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        countryName: '',
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
        comment: ''
      },
      addressSettings: [],
      formList: [],
      countryList: [], // 国家列表
      stateList: [], // 省份列表
      cityList: [], // city列表
      regionList: [], // region列表
      errMsgObj: {}
    };
  }
  componentDidMount() {
    const { initData = {} } = this.props;
    const { caninForm } = this.state;
    this.setState({
      formLoading: true
    });
    // 美国 state 字段统一为 province
    caninForm.stateId = initData.provinceId;
    initData.stateId = initData.provinceId;
    // console.log('-------------★ EditForm initData: ', initData);
    // console.log('-------------★ EditForm caninForm: ', caninForm);
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
            // 过滤掉不可用的
            let narr = this.state.addressSettings.filter(
              (item) => item.enableFlag == 1
            );
            let ress = this.formListByRow(narr, (item) => {
              return [item.sequence];
            });
            this.setState(
              {
                formList: ress
              },
              () => {
                this.setState({
                  formLoading: false
                });
                if (manually == 1) {
                  // 查询国家
                  this.getCountryList();
                  // 查询州列表（美国 state）
                  this.getUsStateList();
                  // 查询城市列表
                  this.getAllCityList();
                }
                if (automatically == 1) {
                  // 俄罗斯DuData，根据关键字查询地址信息
                  this.getAddressBykeyWordDuData();
                }
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
    array.forEach((item) => {
      // filedType '字段类型:0.text,1.number'
      item.filedType = item.filedType == 0 ? 'text' : 'number';
      // regExp: RULE[key],
      // errMsg: CURRENT_LANGFILE['enterCorrectPostCode'],
      item.regExp = '';
      item.errMsg = '';

      const group = JSON.stringify(fn(item));
      // 利用对象的key值唯一性的，创建数组
      groups[group] = groups[group] || [];
      groups[group].push(item);
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
        this.setState({
          countryList: res
        });
        caninForm.countryName = res[0].name;
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 5-1、俄罗斯DuData，根据关键字查询地址信息
  getAddressBykeyWordDuData = async () => {
    try {
      const res = await getAddressBykeyWord({ keyword: 'москва хабар' });
      if (res?.context?.systemRegions) {
        console.log(' ★★★--------- getAddressBykeyWordDuData res: ', res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 5-2、查询州列表（美国 state）
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
  getRegionDataByCityId = async () => {
    const { caninForm } = this.state;
    try {
      const res = await getRegionByCityId({ cityId: 3 });
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
    } catch (err) {
      console.log(err);
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
    } else if (key == 'country') {
      caninForm.countryName = data.name;
    }
    this.setState({ caninForm }, () => {
      this.props.updateData(this.state.caninForm);
    });
  }
  computedList(key) {
    const { caninForm } = this.state;
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
  // 文本框输入改变
  deliveryInputChange = (e) => {
    const { caninForm } = this.state;
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'postCode' || name === 'phoneNumber') {
      value = value.replace(/\s+/g, '');
    }
    if (name === 'phoneNumber' && process.env.REACT_APP_LANG === 'fr') {
      value = value.replace(/^[0]/, '+(33)');
    }
    caninForm[name] = value;
    this.setState({ caninForm }, () => {
      this.props.updateData(this.state.caninForm);
    });
    this.inputBlur(e);
  };
  // 文本框失去焦点
  inputBlur = async (e) => {
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    try {
      await validData(targetRule, { [target.name]: value });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: ''
        })
      });
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: err.message
        })
      });
    }
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
  // DuData地址搜索选择
  handleAddressInputChange = (data) => {
    const { caninForm } = this.state;
    caninForm.address1 = data.unrestrictedValue;
    caninForm.DaData = data;
    this.setState({ caninForm }, () => {
      this.props.updateData(this.state.caninForm);
    });
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
            type={item.fieldKey}
            value={caninForm[item.fieldKey]}
            onChange={this.deliveryInputChange}
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
            id={`shipping${item.fieldKey}`}
            value={caninForm[item.fieldKey]}
            onChange={this.deliveryInputChange}
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
            placeholder={true}
            defaultValue={caninForm[item.fieldKey]}
            key={caninForm[item.fieldKey]}
            name={item.fieldKey}
            freeText={item.inputFreeTextFlag == 1 ? true : false}
            onChange={this.handleCityInputChange}
          />
        </span>
      </>
    );
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
            return ((res?.context && res?.context?.addressList) || []).map(
              (ele) =>
                Object.assign(ele, {
                  name: ele.unrestrictedValue
                })
            );
          }}
          selectedItemChange={(data) => this.handleAddressInputChange(data)}
          key={caninForm[item.fieldKey]}
          defaultValue={caninForm[item.fieldKey]}
          value={caninForm[item.fieldKey]}
          freeText={item.inputFreeTextFlag == 1 ? true : false}
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
  // 下拉框
  dropDownBoxJSX = (item) => {
    const { caninForm } = this.state;
    return (
      <>
        <span
          className="rc-select rc-full-width rc-input--full-width rc-select-processed rc_first_noselect"
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
                alt="E-mail"
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
    const { formLoading, caninForm, formList, errMsgObj } = this.state;
    return (
      <>
        {formLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className="row rc_form_box">
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
                          {item.inputFreeTextFlag == 0 &&
                          item.inputSearchBoxFlag == 1 ? (
                            <>
                              {item.fieldKey == 'address1'
                                ? this.addressSearchSelectionJSX(item)
                                : null}
                            </>
                          ) : null}
                          {item.inputFreeTextFlag == 1 &&
                          item.inputSearchBoxFlag == 1 ? (
                            <>
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
                          {errMsgObj[item.fieldKey] && (
                            <div className="text-danger-2">
                              {errMsgObj[item.fieldKey]}
                            </div>
                          )}
                          {/* 输入电话号码提示 */}
                          {item.fieldKey == 'phoneNumber' && (
                            <span className="ui-lighter">
                              <FormattedMessage id="example" />:{' '}
                              <FormattedMessage id="examplePhone" />
                            </span>
                          )}
                          {/* 输入邮编提示 */}
                          {item.fieldKey == 'postCode' && (
                            <span className="ui-lighter">
                              <FormattedMessage id="example" />:{' '}
                              <FormattedMessage id="examplePostCode" />
                            </span>
                          )}
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
      </>
    );
  }
}

export default Form;
