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
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import Loading from '@/components/Loading';
import SearchSelection from '@/components/SearchSelection';
import { validData, formatMoney, getDeviceType } from '@/utils/utils';
import {
  pickupQueryCity,
  pickupQueryCityFee,
  dimensionsByPackage
} from '@/api/payment';
import IMask from 'imask';
import './index.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
@inject('configStore')
@injectIntl
@observer
class HomeDeliveryOrPickUp extends React.Component {
  static defaultProps = {
    initData: null,
    isLogin: false,
    defaultCity: '',
    pageType: '',
    allAddressList: [],
    deliveryOrPickUp: 0,
    intlMessages: '',
    pickupEditNumber: 0,
    updateShippingMethodType: () => {},
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
      showPickup: false,
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
        consigneeNumber: '',
        comment: '',
        address1: '',
        city: '',
        paymentMethods: '', // 支付方式
        pickupCode: '', // 快递公司code
        pickupName: '', // 快递公司
        workTime: '', // 快递公司上班时间
        receiveType: '', // HOME_DELIVERY , PICK_UP
        formRule: [
          {
            regExp: /\S/,
            errMsg: this.props.intl.messages['payment.errorInfo2'],
            key: 'firstName',
            require: true
          },
          {
            regExp: /\S/,
            errMsg: this.props.intl.messages['payment.errorInfo2'],
            key: 'lastName',
            require: true
          },
          {
            regExp:
              /^(\+7|7|8)?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
            errMsg: this.props.intl.messages['payment.errorInfo2'],
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
  onSearchSelectionError = () => {
    if (!this.props.onSearchSelectionError) {
      return;
    }
    let { pageType } = this.props;
    let errMsgEn =
      (pageType == 'checkout' && this.props.allAddressList.length) ||
      pageType == 'onlyPickup'
        ? 'PVZ is not currently available for the selected town' //this.props.intl.messages['payment.noPickup']
        : 'Please enter the address in the delivery area of the online store. You can find the delivery area on the delivery terms page'; //this.props.intl.messages['payment.pickupNoRusult'];
    this.props.onSearchSelectionError?.(errMsgEn);
  };
  async componentDidMount() {
    let initData = this.props.initData;
    initData.formRule = this.state.pickupForm.formRule; //保留俄罗斯的正则验证
    const {
      intl: { messages }
    } = this.props;

    this.setState(
      {
        pickupForm: Object.assign(this.state.pickupForm, initData)
      },
      () => {
        console.log('666 >>> pickupForm : ', this.state.pickupForm);
      }
    );

    // 监听iframe的传值
    window.addEventListener('message', (e) => {
      // console.log('666 ★ 地图返回 type: ', e?.data?.type);
      // console.log('666 ★ 地图返回 loading: ', e?.data?.loading);

      // 地图上选择快递公司后返回
      if (e?.data?.type == 'get_delivery_point') {
        this.validFormAllPickupData();

        const { pickupForm, selectedItem } = this.state;
        // console.log('666 监听地图点的传值: ', e);
        let obj = e.data.content;
        pickupForm['pickupPrice'] = obj?.price || '';
        pickupForm['pickupDescription'] = obj?.description || '';
        pickupForm['pickupCode'] = obj?.code || '';
        pickupForm['pickupName'] = obj?.courier || '';

        // ★★ 自提点返回支付方式：
        // 1. cod: cash & card，shop展示cod和卡支付
        // 2. cod: cash 或 card，shop展示cod和卡支付
        // 3. 无返回，shop展示卡支付
        let pickupPayMethods = null;
        let payway = obj?.paymentMethods || [];
        if (payway.length) {
          pickupPayMethods = payway[0].split('_')[0].toLocaleLowerCase();
        }
        pickupForm['paymentMethods'] = pickupPayMethods;

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
    if (sitem) {
      sitem = JSON.parse(sitem);
    }

    let defaultCity = this.props.defaultCity;
    console.log('666 >>> defaultCity : ', defaultCity);

    // 有默认city且无缓存 或者 有缓存
    let pickupEditNumber = this.props.pickupEditNumber;
    if (
      (defaultCity && !sitem) ||
      (defaultCity && pickupEditNumber == 0) ||
      pickupEditNumber > 0
    ) {
      // 没有默认城市但是有缓存
      defaultCity = defaultCity || sitem?.cityData?.city;

      let res = await pickupQueryCity({ keyword: defaultCity });
      let robj = res?.context?.pickUpQueryCityDTOs || [];
      if (robj) {
        this.handlePickupCitySelectChange(robj[0]);
      } else {
        this.setState({
          searchNoResult: true
        });
        this.onSearchSelectionError();
      }
    } else if (sitem?.homeAndPickup?.length && pickupEditNumber > 0) {
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
        if (tp == 'pickup' || tp == 'homeDelivery') {
          newobj.push(v);
        }
      });

      sitem.homeAndPickup = newobj;
      this.setState(
        {
          selectedItem: sitem,
          pickupCity: sitem?.cityData?.city || defaultCity
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
      mask: [
        {
          mask: '+{7}(Y00)000-00-00',
          lazy: false,
          blocks: {
            Y: {
              mask: IMask.MaskedEnum,
              enum: ['0', '1', '2', '3', '4', '5', '6', '9']
            } //枚举 Y值只能使用这些值
          }
        }
      ]
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
    this.setState(
      {
        searchNoResult: flag
      },
      () => {
        if (flag) {
          this.onSearchSelectionError();
        }
      }
    );
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

      if (pageType === 'checkout') {
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
        // console.log('666 >>> 合并包裹: ', ckg);
        if (ckg.context?.dimensions) {
          let ckgobj = ckg.context;
          data['dimensions'] = ckgobj?.dimensions;
          data['weight'] = ckgobj?.weight;
        } else {
          data['dimensions'] = null;
          data['weight'] = null;
        }
      }

      pickupForm['provinceCode'] = data?.regionIsoCode || '';
      pickupForm['provinceIdStr'] = data.regionFias;
      pickupForm['areaIdStr'] = data.areaFias;
      pickupForm['cityIdStr'] = data.cityFias;
      pickupForm['settlementIdStr'] = data.settlementFias;

      let tmpres = null;
      let obj = [];
      // 根据不同的城市信息查询
      res = await pickupQueryCityFee(data);
      if (res.context?.tariffs.length) {
        // 先重置参数
        this.props.updateDeliveryOrPickup(0);
        // 'COURIER'=> home delivery、'PVZ'=> pickup
        obj = res.context.tariffs;
        // 有地址的时候，单独展示pickup，如果查询到不支持pickup，给出错误提示
        let hmobj = obj.filter((e) => e.type == 'COURIER');
        let pkobj = obj.filter((e) => e.type == 'PVZ');
        if (this.props.allAddressList.length) {
          if (!pkobj.length) {
            this.setState({
              searchNoResult: true
            });
            this.onSearchSelectionError();
            return;
          }
        } else {
          // ★ 新用户或者游客下单
          if (data.region == 'Москва' || data.region == 'Московская') {
            // 俄罗斯和俄罗斯区域：
            // ★★ 如果Tempoline接口只返回 pickup ，显示 homeDelivery和pickup。
            if (pkobj.length && !hmobj.length) {
              tmpres = {
                deliveryPrice: 400,
                minDeliveryTime: 1,
                maxDeliveryTime: 2,
                selected: true,
                type: 'COURIER'
              };
            }
          }
          tmpres && obj.unshift(tmpres);
        }

        // 先清空数组
        let selitem = Object.assign({}, selectedItem);
        selitem.homeAndPickup = [];

        this.setState(
          {
            pickupForm,
            selectedItem: Object.assign({}, selitem)
          },
          () => {
            let hdpu = [];
            obj.forEach((v, i) => {
              let type = v.type;
              v.selected = false;
              // 只有homeDelivery, 则默认选中 homeDelivery
              if (type == 'COURIER') {
                obj.length == 1 && (v.selected = true);
                v.type = 'homeDelivery';
                hdpu.push(v);
              }

              // 选中pickup
              if (type == 'PVZ') {
                if (
                  pageType === 'checkout' &&
                  this.props.allAddressList.length
                ) {
                  v.selected = true;
                }
                v.type = 'pickup';
                hdpu.push(v);
              }
            });
            let item = {
              cityData: data,
              homeAndPickup: hdpu
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
                // 只显示pickup的情况（会员），1、非checkout页面，2、checkout页面有地址
                if (
                  pageType === 'onlyPickup' ||
                  (pageType === 'checkout' && this.props.allAddressList.length)
                ) {
                  this.setItemStatus('pickup');
                }
                // checkout页面新用户或者游客，只有homeDelivery的情况
                if (
                  pageType === 'checkout' &&
                  !this.props.allAddressList.length &&
                  hdpu.length == 1 &&
                  hdpu[0].type == 'homeDelivery'
                ) {
                  this.setItemStatus('homeDelivery');
                }
              }
            );
          }
        );
      } else {
        // 先清空数组
        let selitem = Object.assign({}, selectedItem);
        selitem.homeAndPickup = [];

        // 区分 俄罗斯和俄罗斯区域、其他地区
        if (data.region == 'Москва' || data.region == 'Московская') {
          // 俄罗斯和俄罗斯区域：
          // 1、如果Tempoline接口只返回 pickup ，显示 homeDelivery和pickup；
          // 2、如果Tempoline接口返回 pickup 和 homeDelivery，显示 homeDelivery和pickup；
          // 3、★★ 如果Tempoline接口没返回，显示 homeDelivery。
          obj.push({
            deliveryPrice: 400,
            minDeliveryTime: 1,
            maxDeliveryTime: 2,
            selected: true,
            type: 'homeDelivery'
          });
          console.log(
            '666 >>> 莫斯科、莫斯科区域 接口没返回, 显示 homeDelivery: ',
            obj
          );
          this.setState(
            {
              pickupForm,
              selectedItem: Object.assign({}, selitem)
            },
            () => {
              let hdpu = [];
              obj.forEach((v, i) => {
                let type = v.type;
                // 只有homeDelivery, 则默认选中 homeDelivery
                if (type == 'homeDelivery') {
                  v.selected = true;
                  hdpu.push(v);
                }
              });
              let item = {
                cityData: data,
                homeAndPickup: hdpu
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
                  // 只显示pickup的情况（会员），1、非checkout页面，2、checkout页面有地址
                  if (
                    pageType === 'onlyPickup' ||
                    (pageType === 'checkout' &&
                      this.props.allAddressList.length)
                  ) {
                    this.setItemStatus('pickup');
                  }
                  // checkout页面新用户或者游客，只有homeDelivery的情况
                  if (
                    pageType === 'checkout' &&
                    !this.props.allAddressList.length &&
                    hdpu.length == 1 &&
                    hdpu[0].type == 'homeDelivery'
                  ) {
                    this.setItemStatus('homeDelivery');
                  }
                }
              );
            }
          );
        } else {
          // 其他区域：
          // 1、如果Tempoline接口只返回 pickup，显示 pickup；
          // 2、如果Tempoline接口返回 pickup 和 homeDelivery，都显示；
          // 3、如果Tempoline接口只返回 homeDelivery，显示 homeDelivery；
          // 4、如果Tempoline接口没返回，提示错误信息。
          this.props.updateDeliveryOrPickup(0);
          this.setState({
            searchNoResult: true
          });
          this.onSearchSelectionError();
          if (pickupEditNumber == 0 && defaultCity) {
            this.setState({
              pickupCity: defaultCity
            });
          }
          this.setState({
            selectedItem: Object.assign({}, selitem)
          });
        }
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
        v.type == 'pickup' && (pickupItem = v);
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
    // 设置 shippingMethodType
    this.props.updateShippingMethodType(val);
    // 设置是否显示pickup
    this.props.updateDeliveryOrPickup(flag ? 2 : 1);
    // 设置按钮状态
    this.props.updateConfirmBtnDisabled(flag);

    let pkobj = {
      city: sitem?.cityData?.city || [],
      calculation: pickupItem,
      maxDeliveryTime: pickupItem?.maxDeliveryTime || 0,
      minDeliveryTime: pickupItem?.minDeliveryTime || 0,
      receiveType: flag ? 'PICK_UP' : 'HOME_DELIVERY'
    };

    // 再次编辑地址的时候，从缓存中取city数据
    if (pickupEditNumber > 0) {
      let sobj = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
      if (sobj) {
        sobj = JSON.parse(sobj);
      }
      let cityData = sobj?.cityData;
      pkobj['provinceCode'] = cityData?.regionIsoCode || '';
      pkobj['provinceIdStr'] = cityData?.regionFias;
      pkobj['areaIdStr'] = cityData?.areaFias;
      pkobj['cityIdStr'] = cityData?.cityFias;
      pkobj['settlementIdStr'] = cityData?.settlementFias;
      let filteredTariffs;
      if (pkobj.receiveType === 'PICK_UP') {
        filteredTariffs =
          (sitem.homeAndPickup || []).filter((el) => el.type === 'pickup')[0] ||
          {};
      } else {
        filteredTariffs =
          (sitem.homeAndPickup || []).filter(
            (el) => el.type === 'homeDelivery'
          )[0] || {};
      }
      console.log('selectedItem2', filteredTariffs);
      pkobj.contractNumber = filteredTariffs?.contractNumber;
      pkobj.courier = filteredTariffs?.courier;
      pkobj.courierCode = filteredTariffs?.courierCode;
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
    const { intl } = this.props;
    const { pickupForm, pickupErrMsgs } = this.state;
    let targetRule = pickupForm.formRule.filter((e) => e.key === tname);
    try {
      await validData({
        rule: targetRule,
        data: { [tname]: tvalue },
        intl
      });
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
    const { intl } = this.props;
    const { pickupForm } = this.state;
    try {
      await validData({ rule: pickupForm.formRule, data: pickupForm, intl });
      this.props.updateConfirmBtnDisabled(false);
      pickupForm.consigneeNumber = pickupForm.phoneNumber;
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
    const { intl } = this.props;
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
                placeholder={intl.messages['payment.comment']}
                id={`${item.fieldKey}ShippingPickup`}
                value={pickupForm[item.fieldKey] || ''}
                onChange={(e) => this.inputChange(e)}
                onBlur={this.inputBlur}
                name={item.fieldKey}
                maxLength={item.maxLength}
              />
            </>
          ) : (
            <>
              <input
                className={`rc-input__control ${item.fieldKey}Shipping`}
                id={`${item.fieldKey}ShippingPickup`}
                autocomplete="off"
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
    const { isLogin, allAddressList, pageType } = this.props;
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
                  {...this.props}
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
                  {(pageType == 'checkout' &&
                    this.props.allAddressList.length) ||
                  pageType == 'onlyPickup' ? (
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
                />
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
            {isLogin && (
              <>
                <div className="col-md-12">{_pickupDefaultCheckBox}</div>
              </>
            )}
          </div>
        </div>
        {/* pickup相关 end */}
      </>
    );
  }
}

export default HomeDeliveryOrPickUp;
