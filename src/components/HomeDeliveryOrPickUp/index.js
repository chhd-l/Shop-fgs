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
      pickUpBtnLoading: false,
      pickUpBoxPosition: '',
      homeAndPickup: [],
      pickupCity: '',
      clinlcInfo: [], // 诊所信息
      selectedItem: null // 记录选择的内容
    };
  }
  componentDidMount() {
    // 初始化地图控件。必须在完全绘制页面后调用。
    document.addEventListener('DOMContentLoaded', (e) => {
      kaktusMap({
        domain: 'shop4995727',
        host: '//app.kak2c.ru'
      });
    });
    // 地图控件点击事件
    document.addEventListener('kaktusEvent', (event) => {
      this.resetPara();
      console.log('666 map event detail: ', event.detail);
      this.setState(
        {
          clinlcInfo: event?.detail?.content || null
        },
        () => {
          console.log('666 clinlcInfo: ', this.state.clinlcInfo);
        }
      );
      // this.props.updateConfirmBtnDisabled(false);
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
  // 重置地图父盒子定位
  resetPara = () => {
    this.setState({
      pickUpBoxPosition: ''
    });
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
            homeAndPickup: [],
            pickUpBoxPosition: ''
          },
          () => {
            // 加一条测试数据
            let testPickup = {
              codPrice: 0,
              contractNumber: 'LOGSIS',
              courier: 'LOGSIS',
              courierCode: 'LOGSIS',
              deliveryCode: '6f410205-005c-47d1-b9a9-0295c6b52100',
              deliveryPrice: 550,
              dlvPrice: null,
              fioCyrillic: false,
              insurancePrice: 0,
              maxDeliveryTime: 4,
              minDeliveryTime: 2,
              price: 550,
              product: null,
              type: 'PVZ'
            };
            // type: 'COURIER'=> home delivery、'PVZ'=> pickup
            let obj = res.context.tariffs;
            let hdpu = [];
            obj.push(testPickup); // 测试数据
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
    const { selectedItem } = this.state;
    if (val == 'homeDelivery') {
      this.props.updateDeliveryOrPickup(1);
      this.props.updateConfirmBtnDisabled(false);
      this.setState({
        pickUpBoxPosition: '',
        hdpuLoading: false
      });
    } else if (val == 'pickup') {
      this.setState({
        hdpuLoading: true
      });
      this.props.updateDeliveryOrPickup(2);
      this.props.updateConfirmBtnDisabled(true);
      setTimeout(() => {
        // 打开地图
        window.kaktusMap.openWidget({
          city_from: selectedItem.city.city,
          city_to: selectedItem.city.city,
          dimensions: {
            height: 10,
            width: 10,
            depth: 10
          },
          weight: 600
        });
        setTimeout(() => {
          this.setState({
            pickUpBoxPosition: 'relative',
            hdpuLoading: false
          });
        }, 3000);
      }, 2000);
    }
  };
  render() {
    const {
      hdpuLoading,
      pickUpBoxPosition,
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

        <div
          className={`pickup_box ${
            this.props.deliveryOrPickUp == 2 ? '' : 'hidden'
          }`}
        >
          <div className={`pickup_map_box pickup_map_box_${pickUpBoxPosition}`}>
            <div id="kaktusMap"></div>
          </div>
          <div className="pickup_infos">
            <div className="info_tit">
              <div className="tit_left">СДЭК</div>
              <div className="tit_right">{formatMoney(55)}</div>
            </div>
            <div className="infos"></div>
            <div className="info_btn_box">
              <button className="rc-btn rc-btn--sm rc-btn--two mr-0">
                <FormattedMessage id="payment.moreDetails" />
              </button>
              <button className="rc-btn rc-btn--sm rc-btn--one">
                <FormattedMessage id="edit" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomeDeliveryOrPickUp;
