import React from 'react';
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
import { getDictionary, validData } from '@/utils/utils';
import { injectIntl } from 'react-intl';
import { queryCityByName } from '@/api';
import { FormattedMessage } from 'react-intl';

class Form extends React.Component {
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
        city: '',
        cityName: '',
        provinceNo: '',
        provinceName: '',
        province: '',
        postCode: '',
        phoneNumber: ''
      },
      adss: [
        {
          addressDisplaySettings: [
            {
              id: 3,
              sequence: 1,
              fieldName: 'First name',
              filedType: 0,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 25,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 1,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 4,
              sequence: 2,
              fieldName: 'Last name',
              filedType: 0,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 25,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 1,
              pageCol: 2,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 5,
              sequence: 3,
              fieldName: 'Address1',
              filedType: 0,
              inputFreeTextFlag: 0,
              inputSearchBoxFlag: 1,
              inputDropDownBoxFlag: 0,
              maxLength: 25,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 5,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 6,
              sequence: 4,
              fieldName: 'Address2',
              filedType: 0,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 25,
              requiredFlag: 0,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 6,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 7,
              sequence: 5,
              fieldName: 'City',
              filedType: 0,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 1,
              inputDropDownBoxFlag: 0,
              maxLength: 8,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 3,
              pageCol: 2,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 8,
              sequence: 6,
              fieldName: 'State',
              filedType: 0,
              inputFreeTextFlag: 0,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 1,
              maxLength: 10,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 3,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 9,
              sequence: 7,
              fieldName: 'Country',
              filedType: 0,
              inputFreeTextFlag: 0,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 1,
              maxLength: 10,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 2,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 10,
              sequence: 8,
              fieldName: 'Region',
              filedType: 0,
              inputFreeTextFlag: 0,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 1,
              maxLength: 10,
              requiredFlag: 0,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 2,
              pageCol: 2,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 11,
              sequence: 9,
              fieldName: 'Phone number',
              filedType: 1,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 10,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 4,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 12,
              sequence: 10,
              fieldName: 'Post code',
              filedType: 1,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 10,
              requiredFlag: 1,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 4,
              pageCol: 2,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 13,
              sequence: 11,
              fieldName: 'Entrance',
              filedType: 0,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 10,
              requiredFlag: 0,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 7,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 14,
              sequence: 12,
              fieldName: 'Apartment',
              filedType: 0,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 10,
              requiredFlag: 0,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 7,
              pageCol: 2,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 15,
              sequence: 13,
              fieldName: 'Comment',
              filedType: 0,
              inputFreeTextFlag: 1,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 25,
              requiredFlag: 0,
              enableFlag: 1,
              dataSource: 0,
              apiName: null,
              pageRow: 8,
              pageCol: 1,
              storeId: 123456858,
              createTime: '2021-03-08 08:26:06.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            },
            {
              id: 81,
              sequence: 0,
              fieldName: 'chacao',
              filedType: 0,
              inputFreeTextFlag: 0,
              inputSearchBoxFlag: 0,
              inputDropDownBoxFlag: 0,
              maxLength: 0,
              requiredFlag: 0,
              enableFlag: 0,
              dataSource: 0,
              apiName: 'chacao',
              pageRow: 0,
              pageCol: 0,
              storeId: 123456858,
              createTime: '2021-03-10 07:22:04.000',
              updateTime: '2021-03-11 10:47:23.000',
              delFlag: 0,
              delTime: null
            }
          ]
        }
      ],
      formGroup: [],
      countryList: [] // 国家列表
    };
  }
  componentDidMount() {
    console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★');
    const { adss } = this.state;
    this.setState({
      formLoading: true
    });
    // 过滤掉不可用的
    let narr = adss[0].addressDisplaySettings.filter(
      (item) => item.enableFlag == 1
    );
    let ress = this.formGroupByRow(narr, (item) => {
      return [item.pageRow];
    });
    this.setState(
      {
        formGroup: ress
      },
      () => {
        setTimeout(() => {
          this.setState({
            formLoading: false
          });
        }, 1000);
      }
    );

    getDictionary({ type: 'country' }).then((res) => {
      const { form } = this.state;
      this.setState({
        countryList: res
      });
      form.countryName = res[0].name;
    });
  }
  // filedType        tinyint(4)   '字段类型:0.text,1.number',
  formGroupByRow(array, fn) {
    const groups = {};
    array.forEach((item) => {
      item.filedType = item.filedType == 0 ? 'text' : 'number';
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

  computedList(key) {
    let tmp = '';
    if (key == 'province') {
      tmp = this.state[`${key}List`].map((c) => {
        return {
          value: c.id.toString(),
          name: c.stateName,
          stateNo: c.stateNo
        };
      });
      tmp.unshift({ value: '', name: 'State' });
    } else {
      tmp = this.state[`${key}List`].map((c) => {
        return {
          value: c.id.toString(),
          name: c.name
        };
      });
      tmp.unshift({ value: '', name: '' });
    }
    return tmp;
  }
  deliveryInputChange = (e) => {};
  inputBlur = async (e) => {};
  handleCityInputChange = (data) => {
    const { form } = this.state;
    form.city = data.id;
    form.cityName = data.cityName;
    this.setState({ form }, () => {
      this.props.updateData(this.state.form);
    });
  };
  render() {
    const { formLoading, form, formGroup } = this.state;

    // inputType        tinyint(4)   '输入类型  0:手动输入,1:自动输入',
    // inputFreeTextFlag        tinyint(4)   '是否允许自由输入:0.不允许,1.允许',
    // inputSearchBoxFlag        tinyint(4)  '是否允许搜索框:0.不允许,1.允许',
    // inputDropDownBoxFlag        tinyint(4)  '是否允许下拉框选择:0.不允许,1.允许',
    return (
      <div style={{ padding: '30px' }}>
        {formLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div className="row">
            {formGroup &&
              formGroup.map((fobj) => (
                <>
                  {fobj.map((item, index) => (
                    <div
                      className={`col-md-${fobj.length > 1 ? 6 : 12}`}
                      key={index}
                    >
                      <div className="form-group required">
                        <label
                          className="form-control-label"
                          htmlFor="shippingFirstName"
                        >
                          {/* <FormattedMessage id="payment.firstName" /> */}
                          {item.fieldName}
                        </label>
                        <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                          {/* 当 inputFreeTextFlag=1，inputSearchBoxFlag=0 时，为普通文本框（text、number） */}
                          {item.inputFreeTextFlag == 1 &&
                          item.inputSearchBoxFlag == 0 ? (
                            <input
                              className="rc-input__control shippingFirstName"
                              // id="shippingFirstName"
                              type={item.filedType}
                              // value={form.firstName}
                              onChange={this.deliveryInputChange}
                              onBlur={this.inputBlur}
                              name={item.fieldName}
                              maxLength={item.maxLength}
                            />
                          ) : null}

                          {/* inputSearchBoxFlag 是否允许搜索:0.不允许,1.允许 */}
                          {item.inputSearchBoxFlag == 1 ? (
                            <CitySearchSelection
                              placeholder={true}
                              defaultValue={form.cityName}
                              key={form.cityName}
                              freeText={
                                item.inputFreeTextFlag == 1 ? true : false
                              }
                              onChange={this.handleCityInputChange}
                            />
                          ) : null}

                          {/* inputDropDownBoxFlag 是否是下拉框选择:0.不是,1.是 */}
                          {/* 当 inputDropDownBoxFlag=1，必定：inputFreeTextFlag=0 && inputSearchBoxFlag=0 */}
                          {item.inputDropDownBoxFlag == 1 ? (
                            <Selection
                              selectedItemChange={(data) =>
                                this.handleSelectedItemChange('country', data)
                              }
                              optionList={this.computedList('country')}
                              selectedItemData={{
                                value: form.country
                              }}
                              key={form.country}
                            />
                          ) : null}

                          <label
                            className="rc-input__label"
                            htmlFor="id-text1"
                          />
                        </span>
                        {/* {errMsgObj.firstName && (
                          <div className="text-danger-2">{errMsgObj.firstName}</div>
                        )} */}
                      </div>
                    </div>
                  ))}
                </>
              ))}
          </div>
        )}
      </div>
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
*/
