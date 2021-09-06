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
    let weekArr = [
      this.getIntlMsg('payment.Sunday'),
      this.getIntlMsg('payment.Monday'),
      this.getIntlMsg('payment.Tuesday'),
      this.getIntlMsg('payment.Wednesday'),
      this.getIntlMsg('payment.Thursday'),
      this.getIntlMsg('payment.Friday'),
      this.getIntlMsg('payment.Saturday')
    ];
    return weekArr[day];
  };
  // 月份
  getMonth = (num) => {
    num = Number(num);
    let monthArr = [
      '0',
      this.getIntlMsg('payment.January'),
      this.getIntlMsg('payment.February'),
      this.getIntlMsg('payment.March'),
      this.getIntlMsg('payment.April'),
      this.getIntlMsg('payment.May'),
      this.getIntlMsg('payment.June'),
      this.getIntlMsg('payment.July'),
      this.getIntlMsg('payment.August'),
      this.getIntlMsg('payment.September'),
      this.getIntlMsg('payment.October'),
      this.getIntlMsg('payment.November'),
      this.getIntlMsg('payment.December')
    ];
    return monthArr[num];
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

    // console.log('666 >>> preview form: ', form);
    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore.localAddressForm;

    let newDeliveryDate = '';
    if (form?.deliveryDate) {
      newDeliveryDate = this.getFormatDeliveryDateStr(form.deliveryDate);
    }

    return form ? (
      <div className="children-nomargin">
        {form.receiveType == 'PICK_UP' ? (
          <>
            <p
              className="preview_pickup_title font-weight-bold"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem'
              }}
            >
              <span className="preview_pickup_name">{form.pickupName}</span>
              {form?.pickupPrice && (
                <span className="preview_pickup_price">
                  {formatMoney(form.pickupPrice)}
                </span>
              )}
            </p>
            {/* 是否存在运费 */}
            {form?.item?.minDeliveryTime && (
              <>
                <p className="preview_delivery_date">
                  {form.item.minDeliveryTime == form.item.maxDeliveryTime ? (
                    <FormattedMessage
                      id="payment.deliveryDate2"
                      values={{
                        val: form.item.minDeliveryTime
                      }}
                    />
                  ) : (
                    <FormattedMessage
                      id="payment.deliveryDate"
                      values={{
                        min: form.item.minDeliveryTime,
                        max: form.item.maxDeliveryTime
                      }}
                    />
                  )}
                </p>
              </>
            )}
            <p className="preview_pickup_address">{form.address1}</p>
            <p className="preview_pickup_worktime">{form.workTime}</p>
          </>
        ) : (
          <>
            <p className={`font-weight-bold ${boldName ? 'medium' : ''}`}>
              {form.firstName + ' ' + form.lastName}
            </p>
            <p className="preview_address">{form.address1}</p>
            {localAddressForm['address2'] && form.address2 && (
              <p>{form.address2}</p>
            )}
            {/* 俄罗斯计算运费 */}
            {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
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
                        {formatMoney(form.calculation.deliveryPrice)}
                      </p>
                      {!form.timeSlot && form.calculation.minDeliveryTime && (
                        <p className="preview_delivery_date">
                          {form.calculation.minDeliveryTime ==
                          form?.calculation?.maxDeliveryTime ? (
                            <FormattedMessage
                              id="payment.deliveryDate2"
                              values={{
                                val: form.calculation.minDeliveryTime
                              }}
                            />
                          ) : (
                            <FormattedMessage
                              id="payment.deliveryDate"
                              values={{
                                min: form.calculation.minDeliveryTime,
                                max: form.calculation.maxDeliveryTime
                              }}
                            />
                          )}
                        </p>
                      )}
                    </>
                  )}

                {/* delivery date */}
                {newDeliveryDate && (
                  <p className="preview_delivery_date">{newDeliveryDate}</p>
                )}

                {/* time slot */}
                {form.timeSlot && (
                  <p className="preview_time_slot">{form.timeSlot}</p>
                )}
              </>
            ) : (
              <>
                <p className="preview_infos">
                  {window.__.env.REACT_APP_COUNTRY == 'us' ? null : (
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
          </>
        )}
      </div>
    ) : null;
  }
}
export default AddressPreview;
