import React from 'react';
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
import { getDictionary, validData } from '@/utils/utils';
import { injectIntl } from 'react-intl';
import {
  getSystemConfig,
  getAddressSetting,
  getProvincesList,
  getRegionByCityId,
  getAddressBykeyWord
} from '@/api';
import { FormattedMessage } from 'react-intl';
import { ADDRESS_RULE } from '@/utils/constant';
import './index.less';

class Form extends React.Component {
  static defaultProps = {
    type: 'billing',
    initData: null,
    isLogin: false,
    updateData: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      form: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        countryName: '',
        cityId: '',
        city: '',
        regionId: '',
        region: '',
        provinceNo: '',
        provinceName: '',
        province: '',
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
    const { form } = this.state;
    this.setState({
      formLoading: true
    });

    // 查询国家
    getDictionary({ type: 'country' }).then((res) => {
      console.log(' --------- getDictionary country: ', res);
      if (res) {
        this.setState({
          countryList: res
        });
        form.countryName = res[0].name;
      }
    });

    // 查询州列表（美国 state）
    getProvincesList({ storeId: process.env.REACT_APP_STOREID }).then((res) => {
      console.log(' --------- getProvincesList state: ', res);
      if (res?.context?.systemStates) {
        this.setState({
          stateList: res.context.systemStates
        });
      }
    });
    this.getRegionDataByCityId();
    this.getAddressBykeyWordDuData();

    // 查询form表单配置开关
    getSystemConfig({ configType: 'address_input_type' }).then((res) => {
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
        let addSetSwitch =
          manually == 1 && automatically == 0 ? 'MANUALLY' : 'AUTOMATICALLY';
        // 查询表单数据接口类型
        // MANUALLY // 自己接口
        // AUTOMATICALLY // 自动填充
        getAddressSetting({ addressApiType: addSetSwitch }).then((res) => {
          try {
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
                    return [item.pageRow];
                  });
                  this.setState(
                    {
                      formList: ress
                    },
                    () => {
                      this.setState({
                        formLoading: false
                      });
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
        });
      }
    });
  }
  // 格式化表单json
  formListByRow(array, fn) {
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
  // 根据cityId查询region
  getRegionDataByCityId = async () => {
    try {
      const res = await getRegionByCityId({ cityId: 3 });
      if (res?.context?.systemRegions) {
        console.log(' --------- getRegionByCityId regin: ', res);
        // cityId: 3
        // cityName: "string1"
        // createTime: "2021-03-17 08:24:00.000"
        // delFlag: 0
        // delTime: null
        // id: 108
        // regionName: "string1"
        // regionNo: "string1"
        // storeId: 123456858
        // updateTime: "2021-03-17 08:25:56.000"
        this.setState({
          regionList: res.context.systemRegions
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 根据cityId查询region
  getAddressBykeyWordDuData = async () => {
    try {
      const res = await getAddressBykeyWord({ keyword: 'москва хабар' });
      if (res?.context?.systemRegions) {
        console.log(' --------- getAddressBykeyWordDuData res: ', res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 下拉框下拉选择
  handleSelectedItemChange(key, data) {
    const { form } = this.state;
    console.log(' --------- key: ', key);
    console.log(' --------- data: ', data);
    if (key == 'province') {
      form.provinceName = data.name;
      form.provinceNo = data.no; // 省份简写
    } else if (key == 'country') {
      form.countryName = data.name;
    }
    form[key] = data.value;
    this.setState({ form }, () => {
      this.props.updateData(this.state.form);
    });
  }
  computedList(key) {
    console.log(
      ' --------- computedList key: ',
      key,
      ' ---  list: ',
      this.state[`${key}List`]
    );
    let tmp = '';
    tmp = this.state[`${key}List`].map((c) => {
      return {
        value: c.id,
        name: c.name,
        no: c.no
      };
    });
    if (key == 'province') {
      tmp.unshift({ value: '', name: 'State' });
    } else if (key != 'country') {
      tmp.unshift({ value: '', name: '' });
    }
    return tmp;
  }
  deliveryInputChange = (e) => {
    const { form } = this.state;
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'postCode' || name === 'phoneNumber') {
      value = value.replace(/\s+/g, '');
    }
    if (name === 'phoneNumber' && process.env.REACT_APP_LANG === 'fr') {
      value = value.replace(/^[0]/, '+(33)');
    }
    form[name] = value;
    this.setState({ form }, () => {
      this.props.updateData(this.state.form);
    });
    this.inputBlur(e);
  };
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
  handleCityInputChange = (data) => {
    const { form } = this.state;
    form.city = data.id;
    form.cityName = data.cityName;
    this.setState({ form }, () => {
      this.props.updateData(this.state.form);
    });
  };

  // 文本框
  inputJSX = (item) => {
    const { form } = this.state;
    return (
      <>
        <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
          <input
            className={`rc-input__control shipping${item.fieldKey}`}
            id={`shipping${item.fieldKey}`}
            type={item.filedType}
            value={form.firstName}
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
  // 城市搜索框
  citySearchSelectiontJSX = (item) => {
    const { form } = this.state;
    return (
      <>
        <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
          <CitySearchSelection
            placeholder={true}
            defaultValue={form.cityName}
            key={form.cityName}
            name={item.fieldKey}
            freeText={item.inputFreeTextFlag == 1 ? true : false}
            onChange={this.handleCityInputChange}
          />
        </span>
      </>
    );
  };
  // 下拉框
  dropDownBoxJSX = (item) => {
    const { form } = this.state;
    return (
      <>
        <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
          <Selection
            selectedItemChange={(data) =>
              this.handleSelectedItemChange(item.fieldKey, data)
            }
            optionList={this.computedList(item.fieldKey)}
            selectedItemData={{
              value: form[item.fieldKey]
            }}
            name={item.fieldKey}
            key={form[item.fieldKey]}
          />
        </span>
      </>
    );
  };

  render() {
    const { formLoading, form, formList, errMsgObj } = this.state;
    return (
      <>
        {formLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className="row rc_form_box">
            {formList &&
              formList.map((fobj, idx) => (
                <div className="rc_row_line" key={idx}>
                  {fobj.map((item, index) => (
                    <div
                      className={`col-md-${fobj.length > 1 ? 6 : 12}`}
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
                        item.inputSearchBoxFlag == 0
                          ? this.inputJSX(item)
                          : null}

                        {/* inputSearchBoxFlag 是否允许搜索:0.不允许,1.允许 */}
                        {item.inputSearchBoxFlag == 1
                          ? this.citySearchSelectiontJSX(item)
                          : null}

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

                        {item.fieldKey == 'phoneNumber' && (
                          <span className="ui-lighter">
                            <FormattedMessage id="example" />:{' '}
                            <FormattedMessage id="examplePhone" />
                          </span>
                        )}
                        {item.fieldKey == 'postCode' && (
                          <span className="ui-lighter">
                            <FormattedMessage id="example" />:{' '}
                            <FormattedMessage id="examplePostCode" />
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </>
    );
  }
}

export default Form;

/*
  const RULE = {phoneNumber: process.env.REACT_APP_LANG === 'fr' ? /[+(33)|0]\d{9}$/ : '', postCode: /^\d{5}$/}

  id        int(11)   '主键',
  enableFlag       tinyint(4)  '需求flag:0.关闭,1.开启',
  filedType        tinyint(4)   '字段类型:0.text,1.number',
  inputType        tinyint(4)   '输入类型  0:手动输入,1:自动输入',
  inputFreeTextFlag        tinyint(4)   '是否允许自由输入:0.不允许,1.允许',
  inputSearchBoxFlag        tinyint(4)  '是否允许搜索框:0.不允许,1.允许',
  inputDropDownBoxFlag        tinyint(4)  '是否允许下拉框选择:0.不允许,1.允许',
  maxLength        int(1)  '字段最大长度',
  requiredFlag     tinyint(4)  '是否必填flag:0.关闭,1.开启',
  apiName        varchar(255)  'api名称',
  pageRow        int(4)  '页面行',
  pageCol        int(4)  '页面列',
  dataSource     tinyint(4)  '数据来源:0.fgs,1.api',

  key ?

  fieldName        varchar(255)   '字段名',
  storeId        bigint(20) DEFAULT '-1' COMMENT '商户id (平台默认值-1)',
  delFlag        tinyint(4)  '删除标识,0:未删除1:已删除',


  ============自己需要处理后增加的字段
  regExp: RULE[key],
  errMsg: CURRENT_LANGFILE['enterCorrectPostCode'],


  http://124.71.151.9:8090/addressDisplaySetting/queryByStoreId/MANUALLY
  MANUALLY //
  AUTOMATICALLY // 自动填充 DuData


*/
