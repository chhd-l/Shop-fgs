import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  formatMoney,
  matchNamefromDict,
  getDictionary,
  formatDate
} from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';

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
  render() {
    const { form, boldName } = this.props;
    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore.localAddressForm;
    let newDeliveryDate = formatDate({
      date: form?.deliveryDate,
      formatOption: { weekday: 'long', day: '2-digit', month: 'long' }
    });

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
            <p className="preview_pickup_address">{form.address1}</p>
            <p className="preview_pickup_worktime">{form.workTime}</p>
            {/* 是否存在运费 */}
            {form?.minDeliveryTime && (
              <>
                <p className="preview_delivery_date">
                  {form.minDeliveryTime == form.maxDeliveryTime ? (
                    <FormattedMessage
                      id="payment.deliveryDate2"
                      values={{
                        val: form.minDeliveryTime
                      }}
                    />
                  ) : (
                    <FormattedMessage
                      id="payment.deliveryDate"
                      values={{
                        min: form.minDeliveryTime,
                        max: form.maxDeliveryTime
                      }}
                    />
                  )}
                </p>
              </>
            )}
          </>
        ) : (
          <>
            {!sessionItemRoyal.get('from-felin') ? (
              <p className={`font-weight-bold ${boldName ? 'medium' : ''}`}>
                {form.firstName + ' ' + form.lastName}
              </p>
            ) : null}
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
                  {window.__.env.REACT_APP_COUNTRY == 'us' ||
                  window.__.env.REACT_APP_COUNTRY == 'uk' ? null : (
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

                  {/* uk的街道 */}
                  {localAddressForm['county'] && (
                    <span>
                      {form.county}
                      {', '}
                    </span>
                  )}

                  {/* 国家 */}
                  {window.__.env.REACT_APP_COUNTRY == 'uk' ? (
                    <>
                      <span>
                        {matchNamefromDict(
                          this.state.countryList,
                          form.country || form.countryId
                        )}{' '}
                      </span>
                    </>
                  ) : null}

                  {/* 邮编 */}
                  {localAddressForm['postCode'] && <span>{form.postCode}</span>}
                </p>
                {!sessionItemRoyal.get('from-felin') ? (
                  <p>{form.phoneNumber || form.consigneeNumber} </p>
                ) : null}
              </>
            )}
          </>
        )}
      </div>
    ) : null;
  }
}
export default AddressPreview;
