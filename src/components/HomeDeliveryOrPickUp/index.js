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
      PickupCity: ''
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
      // this.props.updateConfirmBtnDisabled(false);
    });
  }
  componentDidUpdate(newPros, newState) {
    console.log(newPros, newState);
  }
  resetPara = () => {
    this.setState({
      pickUpBoxPosition: ''
    });
  };
  handleChange = (e) => {
    let val = e.currentTarget?.value;
    if (val == 'pickup') {
      this.setState({
        hdpuLoading: true
      });
      // 打开地图
      window.kaktusMap.openWidget({
        city_from: 'Москва',
        city_to: 'Санкт-Петербург',
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
      this.props.updateDeliveryOrPickup(2);
    } else {
      this.props.updateDeliveryOrPickup(1);
      this.props.updateConfirmBtnDisabled(false);
      this.setState({
        pickUpBoxPosition: '',
        hdpuLoading: false
      });
    }
  };
  handlePickupCityInputChange = async (data) => {
    let res = null;
    this.setState({
      hdpuLoading: true
    });
    try {
      res = await getPickupCityInfo(data);
      if (res.context?.tariffs) {
        // type: 'COURIER'=> home delivery、'PVZ'=> pickup
        let obj = res.context.tariffs;
        let hdpu = [];
        obj.forEach((v, i) => {
          let type = v.type;
          if (type == 'COURIER' || type == 'PVZ') {
            type == 'COURIER' ? (v.type = 'homeDelivery') : (v.type = 'pickup');
            hdpu.push(v);
          }
        });
        this.setState({
          homeAndPickup: hdpu
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
  render() {
    const {
      PickupCity,
      hdpuLoading,
      pickUpBoxPosition,
      homeAndPickup
    } = this.state;
    console.log('666 intlMessages: ', this.props.intlMessages);
    return (
      <>
        {hdpuLoading ? <Loading /> : null}
        <div
          className="row rc_form_box"
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
                    this.handlePickupCityInputChange(data)
                  }
                  key="pickupCity"
                  defaultValue={PickupCity}
                  value={PickupCity}
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
                        type="radio"
                        name="homeDeliveryOrPickUp"
                        onChange={this.handleChange}
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

            {/* pickUp delivery */}
            {/* <div className="rc_radio_box rc-full-width rc-input--full-width">
              <div className="rc-input rc-input--inline">
                <input
                  className="rc-input__radio"
                  value="Pick up delivery"
                  id="pickUpDelivery"
                  type="radio"
                  name="homeDeliveryOrPickUp"
                  onChange={this.handleChange}
                />
                <label
                  className="rc-input__label--inline"
                  htmlFor="pickUpDelivery"
                >
                  <FormattedMessage id="payment.pickupDelivery" />
                </label>
                <div className="delivery_date_price">200 Rub</div>
              </div>
              <div className="need_delivery_date">From 1 to 3 working days</div>
            </div> */}
          </div>
        </div>

        {this.props.deliveryOrPickUp == 2 && (
          <div className={`pickup_map_box pickup_map_box_${pickUpBoxPosition}`}>
            <div id="kaktusMap"></div>
          </div>
        )}
      </>
    );
  }
}

export default HomeDeliveryOrPickUp;
