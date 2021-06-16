import React from 'react';
import { inject, observer } from 'mobx-react';
import { formatMoney, matchNamefromDict, getDictionary } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl';

const sessionItemRoyal = window.__.sessionItemRoyal;
@inject('configStore', 'paymentStore')
@injectIntl
@observer
class AddressPreview extends React.Component {
  static defaultProps = { form: null, countryListDict: [], boldName: true };
  constructor(props) {
    super(props);
    this.state = { countryList: [] };
  }

  componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  // 对应的国际化字符串
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };
  // 星期
  getWeekDay = (day) => {
    let weekday = '';
    switch (day) {
      case 1:
        weekday = this.getIntlMsg('payment.Monday');
        break;
      case 2:
        weekday = this.getIntlMsg('payment.Tuesday');
        break;
      case 3:
        weekday = this.getIntlMsg('payment.Wednesday');
        break;
      case 4:
        weekday = this.getIntlMsg('payment.Thursday');
        break;
      case 5:
        weekday = this.getIntlMsg('payment.Friday');
        break;
      case 6:
        weekday = this.getIntlMsg('payment.Saturday');
        break;
      case 0:
        weekday = this.getIntlMsg('payment.Sunday');
        break;
      default:
        weekday = '';
        break;
    }
    return weekday;
  };
  // 月份
  getMonth = (num) => {
    let month = '';
    num = Number(num);
    switch (num) {
      case 1:
        month = this.getIntlMsg('payment.January');
        break;
      case 2:
        month = this.getIntlMsg('payment.February');
        break;
      case 3:
        month = this.getIntlMsg('payment.March');
        break;
      case 4:
        month = this.getIntlMsg('payment.April');
        break;
      case 5:
        month = this.getIntlMsg('payment.May');
        break;
      case 6:
        month = this.getIntlMsg('payment.June');
        break;
      case 7:
        month = this.getIntlMsg('payment.July');
        break;
      case 8:
        month = this.getIntlMsg('payment.August');
        break;
      case 9:
        month = this.getIntlMsg('payment.September');
        break;
      case 10:
        month = this.getIntlMsg('payment.October');
        break;
      case 11:
        month = this.getIntlMsg('payment.November');
        break;
      case 12:
        month = this.getIntlMsg('payment.December');
        break;
      default:
        month = '';
        break;
    }
    return month;
  };
  // delivery date 格式转换: 星期, 15 月份
  getFormatDeliveryDateStr = (date) => {
    // 获取明天几号
    let mdate = new Date();
    let tomorrow = mdate.getDate() + 1;
    // 获取星期
    var week = new Date(date).getDay();
    let weekday = this.getWeekDay(week);
    // 获取月份
    let ymd = date.split('-');
    let month = this.getMonth(ymd[1]);

    // 判断是否有 ‘明天’ 的日期
    let thisday = Number(ymd[2]);
    let daystr = '';
    if (tomorrow == thisday) {
      daystr = this.getIntlMsg('payment.tomorrow');
    } else {
      daystr = weekday;
    }
    return daystr + ', ' + ymd[2] + ' ' + month;
  };
  render() {
    const { form, boldName, isLogin } = this.props;

    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore.localAddressForm;

    let newDeliveryDate = '';
    if (form?.deliveryDate) {
      newDeliveryDate = this.getFormatDeliveryDateStr(form.deliveryDate);
    }

    return form ? (
      <div className="children-nomargin">
        {/* {JSON.stringify(form)} */}
        <p className={`${boldName ? 'medium' : ''}`}>
          {form.firstName + ' ' + form.lastName}
        </p>
        <p className="preview_address">{form.address1}</p>
        {localAddressForm['address2'] && form.address2 && (
          <p>{form.address2}</p>
        )}

        {/* 俄罗斯计算运费 */}
        {process.env.REACT_APP_COUNTRY == 'RU' ? (
          <>
            <p className="preview_phone_number">
              {form.phoneNumber || form.consigneeNumber}{' '}
            </p>

            {/* 是否存在运费 */}
            {form?.calculation?.deliveryPrice &&
              form?.calculation?.minDeliveryTime && (
                <>
                  <p className="preview_delivery_price">
                    <FormattedMessage id="payment.deliveryFee" />:{' '}
                    {formatMoney(form?.calculation?.deliveryPrice)}
                  </p>
                  {form?.calculation?.minDeliveryTime && (
                    <>
                      {form?.calculation?.minDeliveryTime ==
                      form?.calculation?.maxDeliveryTime ? (
                        <FormattedMessage
                          id="payment.deliveryDate2"
                          values={{
                            val: form?.calculation?.minDeliveryTime
                          }}
                        />
                      ) : (
                        <FormattedMessage
                          id="payment.deliveryDate"
                          values={{
                            min: form?.calculation?.minDeliveryTime,
                            max: form?.calculation?.maxDeliveryTime
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              )}

            {/* delivery date */}
            {newDeliveryDate && (
              <p className="preview_delivery_date">{newDeliveryDate}</p>
            )}

            {/* time slot */}
            {form?.timeSlot && (
              <p className="preview_time_slot">{form.timeSlot}</p>
            )}
          </>
        ) : (
          <>
            <p className="preview_infos">
              {process.env.REACT_APP_COUNTRY == 'US' ? null : (
                <>
                  <span>
                    {matchNamefromDict(
                      this.state.countryList,
                      form.country || form.countryId
                    )}{' '}
                  </span>
                </>
              )}

              {/* 城市 */}
              {localAddressForm['city'] && (
                <span>
                  {form.city}
                  {', '}
                </span>
              )}

              {/* 区域 */}
              {localAddressForm['region'] && (
                <span>
                  {form.area}
                  {', '}
                </span>
              )}

              {/* 省份 */}
              {localAddressForm['state'] && <span>{form.province} </span>}

              {/* 邮编 */}
              {localAddressForm['postCode'] && <span>{form.postCode}</span>}
            </p>
            <p>{form.phoneNumber || form.consigneeNumber} </p>
          </>
        )}
      </div>
    ) : null;
  }
}
export default AddressPreview;
