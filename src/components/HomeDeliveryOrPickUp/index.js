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
      pickUpBtnLoading: false,
      homeAndPickup: [],
      pickupCity: '',
      clinlcInfo: [], // 诊所信息
      selectedItem: null // 记录选择的内容
    };
  }
  componentDidMount() {
    // // 地图控件点击事件
    // document.addEventListener('kaktusEvent', (event) => {
    //   console.log('666 map event detail: ', event.detail);
    //   this.setState(
    //     {
    //       clinlcInfo: event?.detail?.content || null
    //     },
    //     () => {
    //       console.log('666 clinlcInfo: ', this.state.clinlcInfo);
    //     }
    //   );
    //   // this.props.updateConfirmBtnDisabled(false);
    // });
    window.addEventListener('message', function (e) {
      console.log('666 获取子级B页面返回值: ', e.date);
      // console.log(e.data);
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
          setTimeout(() => {
            this.setItemStatus(stype);
          }, 1000);
        }
      );
    }
  }
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
    }
    this.setState({
      showPickup: flag
    });
  };
  // 编辑pickup
  editPickup = () => {
    this.setState({
      showPickupDetail: false,
      showPickup: true
    });
  };
  // 显示pickup详细
  showPickupDetailDialog = () => {
    this.setState({
      showPickupDetailDialog: true
    });
  };
  // 隐藏pickup详细
  hidePickupDetailDialog = () => {
    this.setState({
      showPickupDetailDialog: false
    });
  };
  render() {
    const {
      hdpuLoading,
      showPickup,
      showPickupDetail,
      showPickupDetailDialog,
      pickupCity,
      homeAndPickup
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

        {/* <div
          className={`pickup_box ${
            this.props.deliveryOrPickUp == 2 ? '' : 'hidden'
          }`}
        > */}
        <div className="pickup_box">
          <div className={`pickup_map_box ${showPickup ? '' : 'hidden'}`}>
            <iframe
              src={'/pickupmap'}
              className="pickup_iframe"
              style={{ width: '100%', height: '100%' }}
              width="100%"
              height="100%"
              scrolling="no"
              frameBorder="0"
            />
          </div>
          {/* 显示地图上选择的信息 */}
          <div className={`pickup_infos ${showPickupDetail ? '' : 'hidden'}`}>
            {/* <div className="pickup_infos"> */}
            <div className="info_tit">
              <div className="tit_left">СДЭК</div>
              <div className="tit_right">{formatMoney(55)}</div>
            </div>
            <div className="infos">
              <div className="panel_address">
                Проектируемый пр-д №3723, вл. 12
              </div>
              <div className="panel_worktime">
                Пн-Пт 09:00-21:00, Сб-Вс 10:00-21:00
              </div>
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

          {/* pickup详细 */}
          <div
            className={`pickup_detail_dialog ${
              showPickupDetailDialog ? '' : 'hidden'
            }`}
          >
            <div className="pk_detail_box">
              <span
                className="pk_btn_close"
                onClick={this.hidePickupDetailDialog}
              ></span>
              <div className="pk_tit_box">
                <div className="pk_detail_title">СДЭК (MSK123)</div>
                <div className="pk_detail_price">110 ₽</div>
              </div>
              <div className="pk_detail_address pk_addandtime">
                пос.Малаховка, Касимовское шоссе, 3б литера О
              </div>
              <div className="pk_detail_worktime pk_addandtime">
                Пн-Пт 10:00-19:00
              </div>
              <div className="pk_detail_dop_title">
                Дополнительная информация
              </div>
              <div className="pk_detail_description">
                Ориентир Малаховское кладбище, остановка Опытный завод, автобусы
                325,37,40,313,327,328,332,369,369м,376,376б,939, маршрутки
                44к,57. От остановки пройти направо 100м, свернуть во дворы идти
                вдоль дома.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomeDeliveryOrPickUp;
