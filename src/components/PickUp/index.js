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
      dataLoading: false
    };
  }
  componentDidMount() {}
  render() {
    const { dataLoading, formLoading } = this.state;
    return (
      <>
        {/* {formLoading ? (
          <Skeleton color="#f5f5f5" width="100%" height="10%" count={4} />
        ) : (
          <div
            className="row rc_form_box"
            style={{ display: isMobile ? 'block' : 'flex' }}
          ></div>
        )}

        {dataLoading ? <Loading /> : null} */}
        {/* <button class="rc-btn rc-btn--one" onClick={() => this.setMyMap()}>地图</button> */}

        <div className="row rc_form_box">
          <div className="col-md-6">
            <div className="form-group">
              <span className="rc-input rc-input--inline rc-full-width rc-input--full-width">
                <input
                  type="email"
                  className="rc-input__control emailShipping"
                  id="email"
                  alt="Fill city of delivery"
                  name="email"
                  placeholder="Fill city of delivery"
                  maxLength="50"
                />
              </span>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-flex justify-content-end mt-3 rc_btn_pick_up">
              <button className="rc-btn rc-btn--one">
                <FormattedMessage id="yes2" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PickUp;
