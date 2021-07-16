/*********
 *
 * File Name: Pick Up
 * Create Time: ‎2021-‎6-1
 * Author: kzeng@deloitte.com.cn
 * Version: V1.0
 *
 * Description:
 * 1、目前只有俄罗斯选择自提地址时使用。
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
      hdpuLoading: false,
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
        firstName: '',
        lastName: '',
        phoneNumber: '',
        comment: '',
        address1: '',
        city: '',
        pickupCode: '', // 快递公司code
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
        const { pickupForm } = this.state;
        // console.log('666 监听iframe的传值: ', e);
        let obj = e.data.content;
        pickupForm['pickupCode'] = obj?.code || [];
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
    let defaultCity = this.props.defaultCity;
    console.log('666 this.props.defaultCity: ', this.props.defaultCity);
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
        : (defaultCity = sitem?.city?.city);
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
          pickupCity: sitem.city.city
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
  // 搜索下拉选择
  handlePickupCitySelectChange = async (data) => {
    const { isLogin, pickupEditNumber } = this.props;
    const { selectedItem } = this.state;
    let res = null;
    this.setState({
      hdpuLoading: true,
      searchNoResult: false
    });
    try {
      // 向子域发送数据
      this.sendMsgToIframe('close');

      // 更新pickup编辑次数
      let pknum = Number(pickupEditNumber) + 1;
      this.props.updatePickupEditNumber(pknum);

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
        let cartData = this.props.cartData.filter((el) =>
          el.sizeList.filter((sl) => sl.selected)
        );
        cartData.forEach((e) => {
          goodsInfoDetails.push({
            goodsInfoId: e.sizeList[0].goodsInfoId,
            quantity: e.quantity
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

      // 根据不同的城市信息查询
      res = await pickupQueryCityFee(data);
      if (res.context?.tariffs.length && ckg.context?.dimensions) {
        // 先重置参数
        this.props.updateDeliveryOrPickup(0);

        // type: 'COURIER'=> home delivery、'PVZ'=> pickup
        let obj = res.context.tariffs;

        // 是否有订阅商品
        let isSubscription = this.props.isCurrentBuyWaySubscription;

        // 先清空数组
        let selitem = Object.assign({}, selectedItem);
        selitem.homeAndPickup = [];
        this.setState(
          {
            selectedItem: Object.assign({}, selitem)
          },
          () => {
            // 有订阅商品的时只展示且默认选择 homeDelivery
            if (isSubscription && obj.length == 1 && obj[0].type == 'PVZ') {
              this.setState({
                pickupCity: '',
                searchNoResult: true
              });
              return;
            }

            let hdpu = [];
            obj.forEach((v, i) => {
              let type = v.type;
              if (type == 'COURIER') {
                // 如果有订阅商品或者只有homeDelivery, 则默认选中 homeDelivery
                isSubscription || obj.length == 1 ? (v.selected = true) : '';
                v.type = 'homeDelivery';
                hdpu.push(v);
              }
              if (type == 'PVZ') {
                if (isSubscription) {
                  // 有订阅商品时不显示pickup
                  v.selected = false;
                } else {
                  // 没有订阅商品时才显示pickup
                  v.type = 'pickup';
                  hdpu.push(v);
                }
              }
            });
            let item = {
              city: data,
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
                if (isSubscription || obj.length == 1) {
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
        hdpuLoading: false
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
    const { pickupForm, selectedItem } = this.state;
    // 处理选择结果
    let pickupItem = null;
    let sitem = Object.assign({}, selectedItem);
    sitem?.homeAndPickup.forEach((v, i) => {
      if (v.type == val) {
        // 选中 pickup
        v.type == 'pickup' ? (pickupItem = v) : null;
      }
    });
    pickupForm['city'] = sitem?.city?.city || [];
    pickupForm['item'] = pickupItem;
    pickupForm['maxDeliveryTime'] = pickupItem?.maxDeliveryTime || 0;
    pickupForm['minDeliveryTime'] = pickupItem?.minDeliveryTime || 0;

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
    pickupForm['receiveType'] = flag ? 'PICK_UP' : 'HOME_DELIVERY';
    this.setState(
      {
        showPickup: flag,
        pickupForm
      },
      () => {
        // console.log('666 ★ pickupForm: ', pickupForm);
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
  render() {
    const {
      hdpuLoading,
      showPickup,
      showPickupDetail,
      showPickupDetailDialog,
      showPickupForm,
      pickupCity,
      selectedItem,
      courierInfo,
      searchNoResult
    } = this.state;
    return (
      <>
        {hdpuLoading ? <Loading /> : null}
        <div
          className="row rc_form_box rc_pickup_box"
          style={{ display: isMobile ? 'block' : 'flex' }}
        >
          <div className="col-md-7">
            <div className="form-group rc-full-width rc-input--full-width">
              <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                <SearchSelection
                  queryList={async ({ inputVal }) => {
                    let res = await pickupQueryCity({ keyword: inputVal });
                    let robj = (
                      (res?.context && res?.context?.pickUpQueryCityDTOs) ||
                      []
                    ).map((ele) => Object.assign(ele, { name: ele.city }));
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
              </span>
              {searchNoResult && (
                <div className="text-danger-2" style={{ paddingTop: '.5rem' }}>
                  <FormattedMessage id="payment.pickupNoRusult" />
                </div>
              )}
            </div>

            {/* begin */}
            {selectedItem?.homeAndPickup.length > 0 &&
              selectedItem?.homeAndPickup.map((item, index) => (
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
              ))}
            {/* end */}
          </div>
        </div>

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
              src={'/pickupmap'}
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
          {showPickupDetail && courierInfo && (
            <div className="pickup_infos">
              <div className="info_tit">
                <div className="tit_left">{courierInfo.courier}</div>
                <div className="tit_right">
                  {formatMoney(courierInfo.price)}
                </div>
              </div>
              <div className="infos">
                <div className="panel_address">
                  {courierInfo.address?.fullAddress}
                </div>
                <div className="panel_worktime">{courierInfo.workTime}</div>
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
          )}

          {/* pickup详细 */}
          {showPickupDetailDialog && courierInfo && (
            <div className="pickup_detail_dialog">
              <div className="pk_detail_box">
                <span
                  className="pk_btn_close"
                  onClick={this.hidePickupDetailDialog}
                ></span>
                <div className="pk_tit_box">
                  <div className="pk_detail_title">
                    {courierInfo.courier} ({courierInfo.code})
                  </div>
                  <div className="pk_detail_price">
                    {formatMoney(courierInfo.price)}
                  </div>
                </div>
                <div className="pk_detail_address pk_addandtime">
                  {courierInfo.address?.fullAddress}
                </div>
                <div className="pk_detail_worktime pk_addandtime">
                  {courierInfo.workTime}
                </div>
                <div className="pk_detail_dop_title">
                  Дополнительная информация
                </div>
                <div className="pk_detail_description">
                  {courierInfo.description}
                </div>
              </div>
            </div>
          )}

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
                <label className="form-control-label" for="phoneNumberShipping">
                  <FormattedMessage id="payment.phoneNumber" />
                </label>
                {this.inputJSX('phoneNumber')}
              </div>
            </div>
            <div className="col-md-12 ">
              <div className="form-group ">
                <label className="form-control-label" for="commentShipping">
                  <FormattedMessage id="payment.comment" />
                </label>
                {this.inputJSX('comment')}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomeDeliveryOrPickUp;
