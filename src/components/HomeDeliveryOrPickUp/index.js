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
import { formatMoney, getDeviceType } from '@/utils/utils';
import { getPickupCityList, getPickupCityInfo } from '@/api';
import IMask from 'imask';
import './index.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
@inject('configStore')
@injectIntl
@observer
class HomeDeliveryOrPickUp extends React.Component {
  static defaultProps = {
    isLogin: false,
    deliveryOrPickUp: 0,
    intlMessages: '',
    updateDeliveryOrPickup: () => {},
    updateConfirmBtnDisabled: () => {}
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
      homeAndPickup: [],
      pickupCity: '',
      clinlcInfo: [], // 诊所信息
      selectedItem: null // 记录选择的内容
    };
  }
  componentDidMount() {
    // 监听iframe的传值
    window.addEventListener('message', (e) => {
      if (e?.data?.type == 'get_delivery_point') {
        console.log('666 监听iframe的传值: ', e);
        let obj = e.data.content;
        this.setState(
          {
            clinlcInfo: obj || null
          },
          () => {
            console.log('666 clinlcInfo: ', this.state.clinlcInfo);
            this.setState({
              showPickupDetail: true,
              showPickup: false
            });
            this.props.updateConfirmBtnDisabled(false);
          }
        );
      }
      if (e?.data?.loading == 'succ') {
        // iframe加载完毕后执行
        this.sendMsgToIframe();
      }
    });

    let sitem = sessionItemRoyal.get('rc-homeDeliveryAndPickup') || null;
    // 初始化
    if (sitem) {
      sitem = JSON.parse(sitem);
      let stype = '';
      sitem?.homeAndPickup.forEach((v, i) => {
        if (v.selected) {
          stype = v.type;
        }
      });
      this.setState(
        {
          selectedItem: sitem,
          homeAndPickup: sitem.homeAndPickup,
          pickupCity: sitem.city.city
        },
        () => {
          this.setItemStatus(stype);
          this.setRuPhoneNumberReg();
        }
      );
    }
  }
  // 设置手机号输入限制
  setRuPhoneNumberReg = () => {
    let element = document.getElementById('phoneNumberShipping');
    let maskOptions = {
      mask: [{ mask: '+{7} (000) 000-00-00' }]
    };
    let pval = IMask(element, maskOptions);
  };
  // 搜索下拉选择
  handlePickupCitySelectChange = async (data) => {
    let res = null;
    this.setState({
      hdpuLoading: true
    });
    try {
      res = await getPickupCityInfo(data);
      if (res.context?.tariffs) {
        // 先重置参数
        this.props.updateDeliveryOrPickup(0);
        this.setState(
          {
            homeAndPickup: []
          },
          () => {
            // type: 'COURIER'=> home delivery、'PVZ'=> pickup
            let obj = res.context.tariffs;
            let hdpu = [];
            obj.forEach((v, i) => {
              let type = v.type;
              if (type == 'COURIER' || type == 'PVZ') {
                type == 'COURIER'
                  ? (v.type = 'homeDelivery')
                  : (v.type = 'pickup');
                hdpu.push(v);
              }
            });
            let item = {
              city: data,
              homeAndPickup: hdpu
            };

            this.setState(
              {
                pickupCity: data.city,
                homeAndPickup: hdpu,
                selectedItem: Object.assign({}, item)
              },
              () => {
                sessionItemRoyal.set(
                  'rc-homeDeliveryAndPickup',
                  JSON.stringify(item)
                );
              }
            );
          }
        );
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
    let flag = false;
    if (val == 'homeDelivery') {
      flag = false;
      this.props.updateDeliveryOrPickup(1);
      this.props.updateConfirmBtnDisabled(false);
    } else if (val == 'pickup') {
      flag = true;
      this.props.updateDeliveryOrPickup(2);
      this.props.updateConfirmBtnDisabled(true);
      this.sendMsgToIframe();
    }
    this.setState({
      showPickup: flag
    });
  };
  // 向iframe发送数据
  sendMsgToIframe = () => {
    const { pickupCity } = this.state;
    // iframe加载完成后才能向子域发送数据
    let childFrameObj = document.getElementById('pickupIframe');
    childFrameObj.contentWindow.postMessage({ city: pickupCity }, '*');
  };
  // 编辑pickup
  editPickup = () => {
    const { clinlcInfo } = this.state;
    if (clinlcInfo) {
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
  // 文本框输入改变
  inputChange = (e) => {
    const { caninForm } = this.state;
    const target = e.target;
    let tvalue = target.type === 'checkbox' ? target.checked : target.value;
    const tname = target.name;
    caninForm[tname] = tvalue;
    this.setState({ caninForm }, () => {});
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
      // 验证数据
    });
  };
  render() {
    const {
      hdpuLoading,
      showPickup,
      showPickupDetail,
      showPickupDetailDialog,
      showPickupForm,
      pickupCity,
      homeAndPickup,
      clinlcInfo
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
                    let res = await getPickupCityList({ keyword: inputVal });
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
                  value={pickupCity}
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
            </div>

            {/* begin */}
            {homeAndPickup.length > 0 &&
              homeAndPickup.map((item, index) => (
                <>
                  <div className="rc_radio_box rc-full-width rc-input--full-width">
                    <div className="rc-input rc-input--inline">
                      <input
                        className="rc-input__radio"
                        value={item.type}
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
          {showPickupDetail && clinlcInfo && (
            <div className="pickup_infos">
              <div className="info_tit">
                <div className="tit_left">{clinlcInfo.courier}</div>
                <div className="tit_right">{formatMoney(clinlcInfo.price)}</div>
              </div>
              <div className="infos">
                <div className="panel_address">
                  {clinlcInfo.address?.fullAddress}
                </div>
                <div className="panel_worktime">{clinlcInfo.workTime}</div>
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
          {showPickupDetailDialog && clinlcInfo && (
            <div className="pickup_detail_dialog">
              <div className="pk_detail_box">
                <span
                  className="pk_btn_close"
                  onClick={this.hidePickupDetailDialog}
                ></span>
                <div className="pk_tit_box">
                  <div className="pk_detail_title">
                    {clinlcInfo.courier} ({clinlcInfo.code})
                  </div>
                  <div className="pk_detail_price">
                    {formatMoney(clinlcInfo.price)}
                  </div>
                </div>
                <div className="pk_detail_address pk_addandtime">
                  {clinlcInfo.address?.fullAddress}
                </div>
                <div className="pk_detail_worktime pk_addandtime">
                  {clinlcInfo.workTime}
                </div>
                <div className="pk_detail_dop_title">
                  Дополнительная информация
                </div>
                <div className="pk_detail_description">
                  {clinlcInfo.description}
                </div>
              </div>
            </div>
          )}

          {/* 表单 */}
          <div className={`row rc_form_box ${showPickupForm ? '' : 'hidden'}`}>
            <div className="col-md-7">
              <div className="form-group required">
                <label
                  className="form-control-label"
                  htmlFor="firstNameShipping"
                >
                  <FormattedMessage id="payment.firstName" />
                </label>
                <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                  <input
                    className="rc-input__control firstNameShipping"
                    id="firstNameShipping"
                    type="text"
                    value=""
                    onChange={this.inputChange}
                    onBlur={this.inputBlur}
                    name="firstName"
                    maxLength="200"
                  />
                  <label className="rc-input__label" htmlFor="id-text1" />
                </span>
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
                <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                  <input
                    className="rc-input__control lastNameShipping"
                    id="lastNameShipping"
                    type="text"
                    onChange={this.inputChange}
                    onBlur={this.inputBlur}
                    name="lastName"
                    maxLength="200"
                  />
                  <label className="rc-input__label" htmlFor="id-text1" />
                </span>
              </div>
            </div>
            <div className="col-md-7">
              <div className="form-group required">
                <label className="form-control-label" for="phoneNumberShipping">
                  <FormattedMessage id="payment.phoneNumber" />
                </label>
                <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                  <input
                    className="rc-input__control phoneNumberShipping"
                    id="phoneNumberShipping"
                    type="text"
                    onChange={this.inputChange}
                    onBlur={this.inputBlur}
                    name="phoneNumber"
                    maxlength="18"
                  />
                  <label className="rc-input__label" for="id-text1"></label>
                </span>
                <span className="ui-lighter">
                  <FormattedMessage id="examplePhone" />
                </span>
              </div>
            </div>
            <div className="col-md-12 ">
              <div className="form-group ">
                <label className="form-control-label" for="commentShipping">
                  <FormattedMessage id="payment.comment" />
                </label>
                <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                  <textarea
                    className="rc_input_textarea"
                    placeholder={`${this.props.intlMessages['payment.comment']}`}
                    id="commentShipping"
                    name="comment"
                    onChange={this.inputChange}
                    onBlur={this.inputBlur}
                    maxlength="500"
                  ></textarea>
                  <label className="rc-input__label" for="id-text1"></label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomeDeliveryOrPickUp;
