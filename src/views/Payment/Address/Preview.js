import React from 'react';
import { inject } from 'mobx-react';
import { formatMoney, matchNamefromDict, getDictionary } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
@inject('configStore', 'paymentStore')
export default class AddressPreview extends React.Component {
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
    const { form, boldName, isLogin } = this.props;

    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore?.localAddressForm;

    return form ? (
      <div className="children-nomargin">
        {/* {JSON.stringify(form)} */}
        <p className={`${boldName ? 'medium' : ''}`}>
          {form.firstName + ' ' + form.lastName}
        </p>
        <p>{form.address1}</p>
        {localAddressForm['address2'] && form.address2 && (
          <p>{form.address2}</p>
        )}

        {/* 俄罗斯计算运费 */}
        {process.env.REACT_APP_COUNTRY == 'RU' ? (
          <>
            <p>{form.phoneNumber || form.consigneeNumber} </p>
            {/* 是否存在运费 */}
            {form?.calculation?.deliveryPrice &&
              form?.calculation?.minDeliveryTime && (
                <>
                  <p>
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
          </>
        ) : (
          <>
            <p>
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
