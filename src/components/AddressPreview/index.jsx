import React from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { DivWrapper } from './style';

/**
 * 地址信息预览
 * 1. pick up point时情况
 * 2. 俄罗斯单独处理，因为要显示运费
 * 3. 其他情况: city, region, state, county, country, postCode根据potal配置，排序及显示
 */
const AddressPreview = ({ configStore, data, nameCls, pickupNameCls }) => {
  const {
    localAddressForm: { settings, fieldKeyEnableStatus }
  } = configStore;

  const {
    receiveType,
    pickupName,
    pickupPrice,
    workTime,
    minDeliveryTime,
    maxDeliveryTime,

    calculation,
    timeSlot,
    newDeliveryDate,

    name,
    phone,
    countryName,
    address1,
    address2,
    city,
    area,
    province,
    county,
    postCode,
    rfc,
    buyerRemark
  } = data;

  const tmpArr2 = [];
  settings
    .filter(
      (ele) =>
        fieldKeyEnableStatus[ele.fieldKey] &&
        ['city', 'region', 'state', 'county', 'country', 'postCode'].includes(
          ele.fieldKey
        )
    )
    .sort((a, b) => a.sequence - b.sequence)
    .forEach((item) => {
      const tmpMap = {
        city: city,
        region: area,
        state: province,
        county: county,
        country: countryName,
        postCode: postCode
      };
      if (tmpMap[item.fieldKey]) {
        tmpArr2.push({ fieldKey: item.fieldKey, value: tmpMap[item.fieldKey] });
      }
    });
  // 把他们对应的值，按照这个顺序，join

  return (
    <DivWrapper>
      {receiveType == 'PICK_UP' ? (
        <>
          {pickupName ? (
            <p className={cn(pickupNameCls, 'preview-pickup-name')}>
              <span>{pickupName}</span>
              <span>{pickupPrice}</span>
            </p>
          ) : null}
          {address1 ? (
            <p className="preview-pickup-address1">{address1}</p>
          ) : null}
          {workTime ? (
            <p className="preview-pickup-worktime">{workTime}</p>
          ) : null}
          {/* 是否存在运费 */}
          {minDeliveryTime && (
            <>
              <p className="preview_delivery_date">
                {minDeliveryTime == maxDeliveryTime ? (
                  <FormattedMessage
                    id="payment.deliveryDate2"
                    values={{
                      val: minDeliveryTime
                    }}
                  />
                ) : (
                  <FormattedMessage
                    id="payment.deliveryDate"
                    values={{
                      min: minDeliveryTime,
                      max: maxDeliveryTime
                    }}
                  />
                )}
              </p>
            </>
          )}
        </>
      ) : (
        <>
          {/* 俄罗斯计算运费 */}
          {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
            <>
              {name ? <p className={cn(nameCls)}>{name}</p> : null}
              {address1 ? <p>{address1}</p> : null}
              {fieldKeyEnableStatus['address2'] && address2 ? (
                <p>{address2}</p>
              ) : null}
              {phone ? <p>{phone}</p> : null}

              {/* 是否存在运费 */}
              {calculation?.deliveryPrice && calculation?.minDeliveryTime && (
                <>
                  <p className="preview_delivery_price">
                    <FormattedMessage id="payment.deliveryFee" />:{' '}
                    {formatMoney(calculation.deliveryPrice)}
                  </p>
                  {!timeSlot && calculation.minDeliveryTime && (
                    <p className="preview_delivery_date">
                      {calculation.minDeliveryTime ==
                      calculation?.maxDeliveryTime ? (
                        <FormattedMessage
                          id="payment.deliveryDate2"
                          values={{
                            val: calculation.minDeliveryTime
                          }}
                        />
                      ) : (
                        <FormattedMessage
                          id="payment.deliveryDate"
                          values={{
                            min: calculation.minDeliveryTime,
                            max: calculation.maxDeliveryTime
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
              {timeSlot && <p className="preview_time_slot">{timeSlot}</p>}
            </>
          ) : (
            <>
              {name ? <p className={cn(nameCls)}>{name}</p> : null}
              {address1 ? <p>{address1}</p> : null}
              {fieldKeyEnableStatus['address2'] && address2 ? (
                <p>{address2}</p>
              ) : null}
              {tmpArr2.length ? (
                <p
                  className={cn(
                    `preview_${tmpArr2.map((t) => t.fieldKey).join('|')}`
                  )}
                >
                  {tmpArr2.map((t) => t.value).join(', ')}
                </p>
              ) : null}
              {phone ? <p>{phone}</p> : null}
              {rfc ? <p>{rfc}</p> : null}
              {buyerRemark ? <p>{buyerRemark}</p> : null}
            </>
          )}
        </>
      )}
    </DivWrapper>
  );
};

export default inject('configStore')(observer(AddressPreview));
