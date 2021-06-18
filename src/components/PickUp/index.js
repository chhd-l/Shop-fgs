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
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import SearchSelection from '@/components/SearchSelection';
import {
  getDictionary,
  validData,
  datePickerConfig,
  getFormatDate,
  getZoneTime,
  dynamicLoadCss,
  loadJS,
  getDeviceType
} from '@/utils/utils';
import Loading from '@/components/Loading';
import { getSystemConfig, getAddressBykeyWord } from '@/api';
import './index.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
@inject('configStore')
@injectIntl
@observer
class PickUp extends React.Component {
  static defaultProps = {
    isLogin: false
  };
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: false,
      pickUpBtnLoading: false
    };
  }
  componentDidMount() {}
  handleChange = (e) => {
    let val = e.currentTarget?.value;
    if (val == 'Pick up delivery') {
      openKaktusWidget();
      document.addEventListener('DOMContentLoaded', () => {
        kaktusMap({
          domain: 'shop4995727',
          // domain: 'shop000000',
          host: 'https://app.kak2c.ru'
        });
      });

      document.addEventListener('kaktusEvent', function (event) {
        console.log(event.detail);
      });
    }
  };
  render() {
    return (
      <>
        <div
          className="row rc_form_box"
          style={{ display: isMobile ? 'block' : 'flex' }}
        >
          <div className="col-md-7">
            <div className="form-group rc-full-width rc-input--full-width">
              <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                <input
                  type="text"
                  className="rc-input__control fillcity_of_delivery"
                  id="text"
                  alt="Fill city of delivery"
                  name="text"
                  placeholder="Fill city of delivery"
                  maxLength="50"
                />
              </span>
            </div>
            {/* Home delivery */}
            <div className="rc_radio_box rc-full-width rc-input--full-width">
              <div className="rc-input rc-input--inline">
                <input
                  className="rc-input__radio"
                  value="Home delivery"
                  id="homeDelivery"
                  type="radio"
                  name="homeDeliveryOrPickUp"
                  onChange={this.handleChange}
                />
                <label
                  className="rc-input__label--inline"
                  htmlFor="homeDelivery"
                >
                  <FormattedMessage id="payment.homeDelivery" />
                </label>
                <div className="delivery_date_price">200 Rub</div>
              </div>
              <div className="need_delivery_date">From 1 to 3 working days</div>
            </div>
            {/* pickUp delivery */}
            <div className="rc_radio_box rc-full-width rc-input--full-width">
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
                  <FormattedMessage id="payment.pickUpDelivery" />
                </label>
                <div className="delivery_date_price">200 Rub</div>
              </div>
              <div className="need_delivery_date">From 1 to 3 working days</div>
            </div>
          </div>
        </div>

        <div className="row pickup_map_box">
          <div id="kaktusMap"></div>
        </div>
        {/* <div className="col-md-12">
  <div className="d-flex justify-content-end mt-3 rc_btn_pick_up">
    <button className={`rc-btn rc-btn--one rc_btn_pick_up ${this.state.pickUpBtnLoading ? 'ui-btn-loading' : ''}`}>
      <FormattedMessage id="yes2" />
    </button>
  </div>
</div> */}
      </>
    );
  }
}

export default PickUp;
