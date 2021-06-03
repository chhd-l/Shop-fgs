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
import locales from '@/lang';
import Skeleton from 'react-skeleton-loader';
import Selection from '@/components/Selection';
import CitySearchSelection from '@/components/CitySearchSelection';
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
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Loading from '@/components/Loading';
import {
  getSystemConfig,
  getAddressSetting,
  getProvincesList,
  getRegionByCityId,
  getAddressBykeyWord,
  getCityList
} from '@/api';
import { shippingCalculation } from '@/api/cart';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import IMask from 'imask';
import './index.less';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
const CURRENT_LANGFILE = locales;
let tempolineCache = {};
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
  setMyMap = () => {
    dynamicLoadCss('https://static.kak2c.ru/kak2c.pvz-map.css');
    loadJS({
      url: 'https://static.kak2c.ru/kak2c.pvz-map.js',
      callback: function () {
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

        document.addEventListener('DOMContentLoaded', () => {
          //Инициализация виджета. Должна вызываться после полной отрисовки страницы.
          kaktusMap({
            domain: 'shop000000', //здесь нужно указать домен в системе kak2c
            host: '//app.kak2c.ru'
          });
        });

        //Пример подписки на события виджета
        document.addEventListener('kaktusEvent', function (event) {
          console.log(event.detail);
        });
      }
    });
  };
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
      </>
    );
  }
}

export default PickUp;
