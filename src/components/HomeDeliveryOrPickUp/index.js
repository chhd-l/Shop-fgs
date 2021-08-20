/*********
 *
 * File Name: Pick Up
 * Create Time: ‎2021-‎6-1
 * Author: kzeng@deloitte.com.cn
 * Version: V1.0
 *
 * Description:
 * 1、目前只有俄罗斯选择自提地址时使用。
 * 2、游客和没有地址的新用户UI一样。
 * 3、有地址列表的用户直接展示homeDelivery和pickup
 *
 *********/

import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Loading from '@/components/Loading';
import SearchSelection from '@/components/SearchSelection';
import { validData, formatMoney, getDeviceType } from '@/utils/utils';
import {
  pickupQueryCity,
  pickupQueryCityFee,
  dimensionsByPackage
} from '@/api/payment';
import IMask from 'imask';
import locales from '@/lang';
import './index.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
const CURRENT_LANGFILE = locales;
@inject('configStore')
@injectIntl
@observer
class HomeDeliveryOrPickUp extends React.Component {
  static defaultProps = {
    isLogin: false,
    isCurrentBuyWaySubscription: false, // 是否有订阅商品
    defaultCity: '',
    pageType: '',
    allAddressList: [],
    deliveryOrPickUp: 0,
    intlMessages: '',
    pickupEditNumber: 0,
    updateDeliveryOrPickup: () => {},
    updatePickupEditNumber: () => {},
    updateConfirmBtnDisabled: () => {},
    calculateFreight: () => {},
    updateData: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      pickLoading: false,
      showPickup: true,
      showPickupDetail: false,
      showPickupDetailDialog: false,
      showPickupForm: false,
      pickUpBtnLoading: false,
      searchNoResult: false,
      pickupCity: '',
      courierInfo: [], // 快递公司信息
      selectedItem: null, // 记录选择的内容
      pickupForm: {
        isDefaltAddress: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        comment: '',
        address1: '',
        city: '',
        pickupCode: '', // 快递公司code
        pickupName: '', // 快递公司
        workTime: '', // 快递公司上班时间
        receiveType: 'HOME_DELIVERY', // HOME_DELIVERY , PICK_UP
        formRule: [
          {
            regExp: /\S/,
            errMsg: CURRENT_LANGFILE['payment.errorInfo2'],
            key: 'firstName',
            require: true
          },
          {
            regExp: /\S/,
            errMsg: CURRENT_LANGFILE['payment.errorInfo2'],
            key: 'lastName',
            require: true
          },
          {
            regExp: /^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
            errMsg: CURRENT_LANGFILE['payment.errorInfo2'],
            key: 'phoneNumber',
            require: true
          }
        ]
      },
      pickupErrMsgs: {
        firstName: '',
        lastName: '',
        phoneNumber: ''
      }
    };
  }
  async componentDidMount() {
    // 监听iframe的传值
    window.addEventListener('message', (e) => {
      // 地图上选择快递公司后返回
      if (e?.data?.type == 'get_delivery_point') {
        const { pickupForm, selectedItem } = this.state;
        console.log('666 监听iframe的传值: ', e);
        let obj = e.data.content;
        pickupForm['pickupPrice'] = obj?.price || [];
        pickupForm['pickupDescription'] = obj?.description || [];
        pickupForm['pickupCode'] = obj?.code || [];
        pickupForm['pickupName'] = obj?.courier || [];
        pickupForm['city'] = obj?.address?.city || [];
        pickupForm['address1'] = obj?.address?.fullAddress || [];
        pickupForm['workTime'] = obj?.workTime || [];
        pickupForm['pickup'] = obj || [];
        this.setState(
          {
            courierInfo: obj || null,
            pickupForm
          },
          () => {
            let sitem =
              sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
            if (sitem) {
              sitem = JSON.parse(sitem);
              sitem['pickup'] = obj;
              sessionItemRoyal.set(
                'rc-homeDeliveryAndPickup',
                JSON.stringify(sitem)
              );
            }
            this.setState(
              {
                selectedItem: sitem,
                showPickupDetail: true,
                showPickupForm: true,
                showPickup: false
              },
              () => {
                this.setPickupTelNumberReg();
              }
            );
          }
        );
      }

      // iframe加载完毕后返回
      if (e?.data?.loading == 'succ') {
        this.sendMsgToIframe();
      }
    });

    let sitem = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
    sitem = JSON.parse(sitem);
    // 如果地址列表中存在默认地址，根据默认地址中的city查询
    // 改变了购物车是否存在订阅商品
    // let pickupData = this.props.pickupData;
    // if (pickupData) {
    //   this.setState({
    //     pickupForm: Object.assign(this.state.pickupForm, pickupData, {
    //       phoneNumber: pickupData.consigneeNumber
    //     }),
    //     showPickupForm: true,
    //     showPickupDetail: true,
    //   });
    // }
    let defaultCity = this.props.defaultCity;
    console.log('666 --> defaultCity: ', this.props.defaultCity);
    // 有默认city且无缓存 或者 有缓存且是否有订阅商品发生改变
    let pickupEditNumber = this.props.pickupEditNumber;
    if (
      (defaultCity && !sitem) ||
      (defaultCity && pickupEditNumber == 0) ||
      (pickupEditNumber > 0 &&
        sitem &&
        sitem?.isSubscription != this.props.isCurrentBuyWaySubscription)
    ) {
      // 没有默认城市但是有缓存
      defaultCity
        ? (defaultCity = defaultCity)
        : (defaultCity = sitem?.cityData?.city);
      let res = await pickupQueryCity({ keyword: defaultCity });
      let robj = res?.context?.pickUpQueryCityDTOs || [];
      if (robj) {
        this.handlePickupCitySelectChange(robj[0]);
      } else {
        this.setState({
          searchNoResult: true
        });
      }
    } else if (sitem?.homeAndPickup.length && pickupEditNumber > 0) {
      // 初始化数据，本地存储有数据（当前会话未结束）
      let stype = '';
      let newobj = [];
      let isSelectedItem = false; // 是否有选中项
      sitem?.homeAndPickup.forEach((v, i) => {
        let tp = v.type;
        if (v.selected) {
          stype = tp;
          isSelectedItem = true;
        }
        // 有订阅商品时不显示pickup
        if (
          (tp == 'pickup' && !this.props.isCurrentBuyWaySubscription) ||
          tp == 'homeDelivery'
        ) {
          newobj.push(v);
        }
      });
      sitem.homeAndPickup = newobj;
      this.setState(
        {
          selectedItem: sitem,
          pickupCity: sitem.cityData.city
        },
        () => {
          if (isSelectedItem) {
            this.setItemStatus(stype);
          }
        }
      );
    }
  }
  // 设置手机号输入限制
  setPickupTelNumberReg = () => {
    let telnum = document.getElementById('phoneNumberShippingPickup');
    let telOptions = {
      mask: [{ mask: '+{7} (000) 000-00-00' }]
    };
    let telpval = IMask(telnum, telOptions);
  };
  // 判断输入city是否有返回值
  handlePickupQueryCity = async (city, data) => {
    const { selectedItem } = this.state;
    let flag = false;
    data?.length ? (flag = false) : (flag = true);
    if (flag) {
      this.props.updateDeliveryOrPickup(0);
      this.setState({
        pickupCity: city,
        selectedItem: Object.assign(selectedItem, {
          cityData: [],
          homeAndPickup: []
        })
      });
    }
    this.setState({
      searchNoResult: flag
    });
  };
  // 搜索下拉选择。1、游客和新用户展示homeDelivery和pickup；2、有地址的用户直接展示地图。
  handlePickupCitySelectChange = async (data) => {
    const { isLogin, pickupEditNumber, defaultCity, pageType } = this.props;
    const { selectedItem, pickupForm } = this.state;
    let res = null;
    this.setState({
      pickLoading: true,
      searchNoResult: false
    });
    try {
      // 向子域发送数据
      this.sendMsgToIframe('close');

      // 更新pickup编辑次数
      let pknum = Number(pickupEditNumber) + 1;
      this.props.updatePickupEditNumber(pknum);

      if (!pageType) {
        let goodsInfoDetails = [];
        // 取到购物车里面的 goodsInfoId、购买的sku数量
        if (isLogin) {
          let cartData = this.props.cartData.filter((el) => el.goodsInfoId);
          cartData.forEach((e) => {
            goodsInfoDetails.push({
              goodsInfoId: e.goodsInfoId,
              quantity: e.buyCount
            });
          });
        } else {
          let cartData = this.props.cartData.filter((el) => {
            return el.sizeList;
          });
          cartData.forEach((e) => {
            e.sizeList.map((sl) => {
              if (sl.selected) {
                goodsInfoDetails.push({
                  goodsInfoId: sl.goodsInfoId,
                  quantity: e.quantity
                });
              }
            });
          });
        }
        // 合并包裹
        let ckg = await dimensionsByPackage({
          goodsInfoDetails: goodsInfoDetails
        });
        if (ckg.context?.dimensions) {
          let ckgobj = ckg.context;
          data['dimensions'] = ckgobj.dimensions;
          data['weight'] = ckgobj.weight;
        }
      } else {
        data['dimensions'] = null;
        data['weight'] = null;
      }

      // 根据不同的城市信息查询
      res = await pickupQueryCityFee(data);
      // if (res.context?.tariffs.length && ckg.context?.dimensions) {
      if (res.context?.tariffs.length) {
        // 先重置参数
        this.props.updateDeliveryOrPickup(0);

        // 'COURIER'=> home delivery、'PVZ'=> pickup
        let obj = res.context.tariffs;

        // 有地址的时候，单独展示pickup，如果查询到不支持pickup，给出错误提示
        if (this.props.allAddressList.length) {
          obj = obj.filter((e) => e.type == 'PVZ');
          if (!obj.length) {
            this.setState({
              searchNoResult: true
            });
            return;
          }
        }

        // 有订阅商品时不展示pickup
        let isSubscription = this.props.isCurrentBuyWaySubscription;
        if (isSubscription) {
          obj = obj.filter((e) => e.type == 'COURIER');
        }

        // 先清空数组
        let selitem = Object.assign({}, selectedItem);
        selitem.homeAndPickup = [];

        pickupForm['provinceCode'] = data?.regionIsoCode || '';
        pickupForm['provinceIdStr'] = data.regionFias;
        pickupForm['areaIdStr'] = data.areaFias;
        pickupForm['cityIdStr'] = data.cityFias;
        pickupForm['settlementIdStr'] = data.settlementFias;

        this.setState(
          {
            pickupForm,
            selectedItem: Object.assign({}, selitem)
          },
          () => {
            let hdpu = [];
            obj.forEach((v, i) => {
              let type = v.type;
              // 如果有订阅商品或者只有homeDelivery, 则默认选中 homeDelivery
              if (type == 'COURIER') {
                isSubscription || obj.length == 1 ? (v.selected = true) : '';
                v.type = 'homeDelivery';
                hdpu.push(v);
              }

              // 没有订阅商品时才显示pickup
              if (type == 'PVZ') {
                v.type = 'pickup';
                hdpu.push(v);
              }
            });
            let item = {
              cityData: data,
              homeAndPickup: hdpu,
              isSubscription: isSubscription
            };
            this.setState(
              {
                pickupCity: data.city,
                selectedItem: Object.assign({}, item)
              },
              () => {
                sessionItemRoyal.set(
                  'rc-homeDeliveryAndPickup',
                  JSON.stringify(item)
                );

                // 有订阅商品的时只展示且默认选择 homeDelivery
                if (isSubscription) {
                  this.setItemStatus('homeDelivery');
                }

                // 只显示pickup的情况（会员），1、非checkout页面，2、checkout页面（没有订阅商品时）有地址
                if (
                  pageType === 'onlyPickup' ||
                  (pageType === 'checkout' &&
                    this.props.allAddressList.length &&
                    !isSubscription)
                ) {
                  this.setItemStatus('pickup');
                } else {
                  // 会员有订阅商品的时 homeDelivery
                  // this.setItemStatus('homeDelivery');
                }
              }
            );
          }
        );
      } else {
        if (pickupEditNumber == 0 && defaultCity) {
          this.setState({
            pickupCity: defaultCity
          });
        } else {
          // this.setState({
          //   pickupCity: ''
          // });
        }
        // 先清空数组
        let selitem = Object.assign({}, selectedItem);
        selitem.homeAndPickup = [];
        this.setState({
          selectedItem: Object.assign({}, selitem)
        });
        this.props.updateDeliveryOrPickup(0);
        this.setState({
          searchNoResult: true
        });
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this.setState({
        pickLoading: false
      });
    }
  };
  // 单选按钮选择
  handleRadioChange = (e) => {
    const { selectedItem } = this.state;
    let val = e.currentTarget?.value;
    let sitem = Object.assign({}, selectedItem);

    sitem?.homeAndPickup.forEach((v, i) => {
      if (v.type == val) {
        v['selected'] = true;
      } else {
        v['selected'] = false;
      }
    });
    this.setState(
      {
        selectedItem: Object.assign({}, sitem)
      },
      () => {
        sessionItemRoyal.set('rc-homeDeliveryAndPickup', JSON.stringify(sitem));
        this.setItemStatus(val);
      }
    );
  };
  // 设置状态
  setItemStatus = (val) => {
    const { pickupEditNumber } = this.props;
    const { pickupForm, selectedItem } = this.state;
    this.setState({ pickLoading: true });
    // 处理选择结果
    let pickupItem = null;
    let sitem = Object.assign({}, selectedItem);
    sitem?.homeAndPickup.forEach((v, i) => {
      if (v.type == val) {
        // 选中 pickup
        v.type == 'pickup' ? (pickupItem = v) : null;
      }
    });
    let flag = false;
    if (val == 'homeDelivery') {
      flag = false;
      this.setState({
        showPickupForm: false,
        showPickupDetailDialog: false,
        showPickupDetail: false
      });
    } else if (val == 'pickup') {
      flag = true;
      this.sendMsgToIframe();
    }
    // 设置是否显示pickup
    this.props.updateDeliveryOrPickup(flag ? 2 : 1);
    // 设置按钮状态
    this.props.updateConfirmBtnDisabled(flag);

    let pkobj = {
      city: sitem?.cityData?.city || [],
      item: pickupItem,
      maxDeliveryTime: pickupItem?.maxDeliveryTime || 0,
      minDeliveryTime: pickupItem?.minDeliveryTime || 0,
      receiveType: flag ? 'PICK_UP' : 'HOME_DELIVERY'
    };
    // 再次编辑地址的时候，从缓存中取city数据
    if (pickupEditNumber > 0) {
      let sobj = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
      sobj = JSON.parse(sobj);
      let cityData = sobj?.cityData;
      pkobj['provinceCode'] = cityData?.regionIsoCode || '';
      pkobj['provinceIdStr'] = cityData?.regionFias;
      pkobj['areaIdStr'] = cityData?.areaFias;
      pkobj['cityIdStr'] = cityData?.cityFias;
      pkobj['settlementIdStr'] = cityData?.settlementFias;
    }

    this.setState(
      {
        showPickup: flag,
        pickLoading: false,
        pickupForm: Object.assign(pickupForm, pkobj)
      },
      () => {
        this.props.updateData(this.state.pickupForm);
        this.props.calculateFreight(this.state.pickupForm);
      }
    );
  };
  // 向iframe发送数据
  sendMsgToIframe = (str) => {
    const { pickupCity } = this.state;
    // iframe加载完成后才能向子域发送数据
    let childFrameObj = document.getElementById('pickupIframe');
    let msg = '';
    switch (str) {
      case 'city':
        msg = pickupCity;
        break;
      case 'close':
        msg = 'clearMap';
        break;
      default:
        msg = pickupCity;
        break;
    }
    childFrameObj.contentWindow.postMessage({ msg: msg }, '*');
  };
  // 编辑pickup
  editPickup = () => {
    const { courierInfo } = this.state;
    if (courierInfo) {
      this.sendMsgToIframe();
    }
    this.setState({
      showPickupForm: false,
      showPickupDetail: false,
      showPickup: true
    });
    this.props.updateConfirmBtnDisabled(true);
  };
  // 显示pickup详细
  showPickupDetailDialog = () => {
    this.setState({
      showPickupForm: false,
      showPickupDetailDialog: true,
      showPickupDetail: false
    });
  };
  // 隐藏pickup详细弹框
  hidePickupDetailDialog = () => {
    this.setState({
      showPickupForm: true,
      showPickupDetailDialog: false,
      showPickupDetail: true
    });
  };
  // pickup表单验证
  pickupValidvalidat = async (tname, tvalue) => {
    const { pickupForm, pickupErrMsgs } = this.state;
    let targetRule = pickupForm.formRule.filter((e) => e.key === tname);
    try {
      await validData(targetRule, { [tname]: tvalue });
      this.setState({
        pickupErrMsgs: Object.assign({}, pickupErrMsgs, {
          [tname]: ''
        })
      });
      this.validFormAllPickupData();
    } catch (err) {
      this.props.updateConfirmBtnDisabled(true);
      this.setState({
        pickupErrMsgs: Object.assign({}, pickupErrMsgs, {
          [tname]: err.message
        })
      });
    }
  };
  // 验证表单所有数据
  validFormAllPickupData = async () => {
    const { pickupForm } = this.state;
    try {
      await validData(pickupForm.formRule, pickupForm);
      this.props.updateConfirmBtnDisabled(false);
      this.props.updateData(pickupForm);
    } catch {
      this.props.updateConfirmBtnDisabled(true);
    }
  };
  // 文本框输入改变
  inputChange = (e) => {
    const { pickupForm } = this.state;
    const target = e?.target;
    const tname = target?.name;
    let tvalue = target?.value;
    pickupForm[tname] = tvalue;
    this.setState({ pickupForm }, () => {
      this.pickupValidvalidat(tname, tvalue); // 验证数据
    });
  };
  // 文本框失去焦点
  inputBlur = (e) => {
    const { pickupForm } = this.state;
    const target = e?.target;
    const tname = target?.name;
    const tvalue = target?.value;
    pickupForm[tname] = tvalue;
    this.setState({ pickupForm }, () => {
      this.pickupValidvalidat(tname, tvalue); // 验证数据
    });
  };
  // 文本框
  inputJSX = (key) => {
    const { pickupForm, pickupErrMsgs } = this.state;
    let flag = 1;
    key == 'comment' ? (flag = 0) : (flag = 1);
    let item = {
      fieldKey: key,
      filedType: 'text',
      maxLength: 200,
      requiredFlag: flag
    };
    return (
      <>
        <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
          {key == 'comment' ? (
            <>
              <textarea
                className="rc_input_textarea"
                placeholder={`${this.props.intl.messages['payment.comment']}`}
                id={`${item.fieldKey}ShippingPickup`}
                value={pickupForm[item.fieldKey] || ''}
                onChange={(e) => this.inputChange(e)}
                onBlur={this.inputBlur}
                name={item.fieldKey}
                maxLength={item.maxLength}
              ></textarea>
            </>
          ) : (
            <>
              <input
                className={`rc-input__control ${item.fieldKey}Shipping`}
                id={`${item.fieldKey}ShippingPickup`}
                type={item.filedType}
                value={pickupForm[item.fieldKey] || ''}
                onChange={(e) => this.inputChange(e)}
                onBlur={this.inputBlur}
                name={item.fieldKey}
                maxLength={item.maxLength}
              />
            </>
          )}
          <label className="rc-input__label" htmlFor="id-text1" />
        </span>
        {/* 输入电话号码提示 */}
        {item.fieldKey == 'phoneNumber' && (
          <span className="ui-lighter">
            <FormattedMessage id="examplePhone" />
          </span>
        )}
        {/* 输入提示 */}
        {pickupErrMsgs[item.fieldKey] && item.requiredFlag == 1 ? (
          <div className="text-danger-2">{pickupErrMsgs[item.fieldKey]}</div>
        ) : null}
      </>
    );
  };
  // 设为默认
  handleDefaultChange = () => {
    let data = this.state.pickupForm;
    data.isDefaltAddress = !data.isDefaltAddress;
    this.setState({
      pickupForm: data
    });
  };
  // 清除未搜索到城市提示
  closeSearchErrMsg = () => {
    this.setState({
      searchNoResult: false,
      pickupCity: ''
    });
  };
  render() {
    const { allAddressList, pageType } = this.props;
    const {
      pickLoading,
      showPickup,
      showPickupDetail,
      showPickupDetailDialog,
      showPickupForm,
      pickupCity,
      selectedItem,
      courierInfo,
      searchNoResult,
      pickupForm
    } = this.state;

    const _pickupDefaultCheckBox = (
      <div className="rc-input rc-input--inline w-100 mw-100">
        {
          <input
            id="addr-default-checkbox"
            type="checkbox"
            className="rc-input__checkbox"
            onChange={this.handleDefaultChange}
            value={pickupForm.isDefaltAddress}
            checked={pickupForm.isDefaltAddress}
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
    return (
      <>
        {pickLoading && <Loading />}

        {/* homeDelivery begin */}
        <div
          className="row rc_form_box rc_pickup_box"
          style={{ display: isMobile ? 'block' : 'flex' }}
        >
          <div className="col-md-7">
            {/* 城市搜索 begin */}
            <div className="form-group rc-full-width rc-input--full-width">
              <span
                className={`rc-input rc-input--inline rc-full-width rc-input--full-width pickup_search_box ${
                  searchNoResult ? 'pickup_search_box_errmsg' : null
                }`}
              >
                <SearchSelection
                  queryList={async ({ inputVal }) => {
                    let res = await pickupQueryCity({ keyword: inputVal });
                    let robj = (
                      (res?.context && res?.context?.pickUpQueryCityDTOs) ||
                      []
                    ).map((ele) => Object.assign(ele, { name: ele.city }));
                    // this.handlePickupQueryCity(inputVal, robj);
                    return robj;
                  }}
                  selectedItemChange={(data) =>
                    this.handlePickupCitySelectChange(data)
                  }
                  key={pickupCity}
                  defaultValue={pickupCity}
                  value={pickupCity || ''}
                  freeText={false}
                  name="pickupCity"
                  placeholder={
                    this.props.intlMessages['payment.fillCityOfDelivery']
                  }
                  customStyle={true}
                  isLoadingList={false}
                  isBottomPaging={true}
                />
                {searchNoResult && (
                  <span
                    className="close_search_errmsg"
                    onClick={this.closeSearchErrMsg}
                  ></span>
                )}
              </span>
              {searchNoResult && (
                <div className="text-danger-2" style={{ paddingTop: '.5rem' }}>
                  {this.props.allAddressList.length ? (
                    <FormattedMessage id="payment.noPickup" />
                  ) : (
                    <FormattedMessage id="payment.pickupNoRusult" />
                  )}
                </div>
              )}
            </div>
            {/* 城市搜索 end */}

            {/* 
                要显示选择 homeDelivery or pickup 的场景：
                  1、游客
                  2、会员：地址列表为空
            */}
            {pageType != 'onlyPickup' &&
            !allAddressList.length &&
            selectedItem?.homeAndPickup.length > 0
              ? selectedItem?.homeAndPickup.map((item, index) => (
                  <>
                    <div className="rc_radio_box rc-full-width rc-input--full-width">
                      <div className="rc-input rc-input--inline">
                        <input
                          className="rc-input__radio"
                          value={item.type || ''}
                          id={item.type}
                          checked={item.selected}
                          type="radio"
                          name="homeDeliveryOrPickUp"
                          onChange={this.handleRadioChange}
                        />
                        <label
                          className="rc-input__label--inline"
                          htmlFor={item.type}
                        >
                          {item.type == 'homeDelivery' ? (
                            <FormattedMessage id="payment.homeDelivery" />
                          ) : (
                            <FormattedMessage id="payment.pickupDelivery" />
                          )}
                        </label>
                        <div className="delivery_date_price">
                          {formatMoney(item.deliveryPrice)}
                        </div>
                      </div>
                      <div className="need_delivery_date">
                        {item.minDeliveryTime == item.maxDeliveryTime ? (
                          <FormattedMessage
                            id="payment.deliveryDate2"
                            values={{
                              val: item.minDeliveryTime
                            }}
                          />
                        ) : (
                          <FormattedMessage
                            id="payment.deliveryDate"
                            values={{
                              min: item.minDeliveryTime,
                              max: item.maxDeliveryTime
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </>
                ))
              : null}
            {/* homeDelivery or pickup 选择 end */}
          </div>
        </div>
        {/* homeDelivery end */}

        {/* pickup相关 begin */}
        <div
          className={`pickup_box ${
            this.props.deliveryOrPickUp == 2 ? '' : 'hidden'
          }`}
        >
          {/* 地图 */}
          <div
            className={`pickup_map_box ${
              showPickup ? (isMobile ? 'block' : 'flex') : 'hidden'
            }`}
          >
            <iframe
              src={
                window.__.env.REACT_APP_HOMEPAGE.replace(/\/$/gi, '') +
                '/pickupmap'
              }
              id="pickupIframe"
              className="pickup_iframe"
              style={{ width: '100%', height: '100%' }}
              width="100%"
              height="100%"
              scrolling="no"
              frameBorder="0"
            />
          </div>

          {/* 显示地图上选择的点信息 */}
          {showPickupDetail && courierInfo ? (
            <div className="pickup_infos">
              <div className="info_tit">
                <div className="tit_left">{pickupForm.pickupName}</div>
                <div className="tit_right">
                  {formatMoney(pickupForm.pickupPrice)}
                </div>
              </div>
              <div className="infos">
                <div className="panel_address">{pickupForm.address1}</div>
                <div className="panel_worktime">{pickupForm.workTime}</div>
              </div>
              <div className="info_btn_box">
                <button
                  className="rc-btn rc-btn--sm rc-btn--two mr-0"
                  onClick={this.showPickupDetailDialog}
                >
                  <FormattedMessage id="payment.moreDetails" />
                </button>
                <button
                  className="rc-btn rc-btn--sm rc-btn--one"
                  onClick={this.editPickup}
                >
                  <FormattedMessage id="edit" />
                </button>
              </div>
            </div>
          ) : null}

          {/* pickup详细 */}
          {showPickupDetailDialog && courierInfo ? (
            <div className="pickup_detail_dialog">
              <div className="pk_detail_box">
                <span
                  className="pk_btn_close"
                  onClick={this.hidePickupDetailDialog}
                ></span>
                <div className="pk_tit_box">
                  <div className="pk_detail_title">
                    {pickupForm.pickupName} ({pickupForm.pickupCode})
                  </div>
                  <div className="pk_detail_price">
                    {formatMoney(pickupForm.pickupPrice)}
                  </div>
                </div>
                <div className="pk_detail_address pk_addandtime">
                  {pickupForm.address1}
                </div>
                <div className="pk_detail_worktime pk_addandtime">
                  {pickupForm.workTime}
                </div>
                <div className="pk_detail_dop_title">
                  Дополнительная информация
                </div>
                <div className="pk_detail_description">
                  {pickupForm.pickupDescription}
                </div>
              </div>
            </div>
          ) : null}

          {/* 表单 */}
          <div
            className={`row rc_form_box rc_pickup_form ${
              showPickupForm ? (isMobile ? 'block' : 'flex') : 'hidden'
            }`}
          >
            <div className="col-md-7">
              <div className="form-group required">
                <label
                  className="form-control-label"
                  htmlFor="firstNameShipping"
                >
                  <FormattedMessage id="payment.firstName" />
                </label>
                {this.inputJSX('firstName')}
              </div>
            </div>
            <div className="col-md-7">
              <div className="form-group required">
                <label
                  className="form-control-label"
                  htmlFor="lastNameShipping"
                >
                  <FormattedMessage id="payment.lastName" />
                </label>
                {this.inputJSX('lastName')}
              </div>
            </div>
            <div className="col-md-7">
              <div className="form-group required">
                <label
                  className="form-control-label"
                  htmlFor="phoneNumberShipping"
                >
                  <FormattedMessage id="payment.phoneNumber" />
                </label>
                {this.inputJSX('phoneNumber')}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group ">
                <label className="form-control-label" htmlFor="commentShipping">
                  <FormattedMessage id="payment.comment" />
                </label>
                {this.inputJSX('comment')}
              </div>
            </div>
            <div className="col-md-12">{_pickupDefaultCheckBox}</div>
          </div>
        </div>
        {/* pickup相关 end */}
      </>
    );
  }
}

export default HomeDeliveryOrPickUp;
