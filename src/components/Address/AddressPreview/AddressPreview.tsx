import React, { useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import {
  formatMoney,
  formatDate,
  formatJPDate,
  formatJPTime
} from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { DivWrapper } from './style';

const COUNTRY = window.__.env.REACT_APP_COUNTRY;

interface ListType {
  fieldKey: string;
  value: any;
}

interface Props {
  configStore?: any;
  data: any;
  nameCls?: string;
  pickupNameCls?: string;
}

/**
 * 地址信息预览
 * 1. pick up point时情况
 * 2. 俄罗斯单独处理，因为要显示运费
 * 3. 其他情况: city, region, state, county, country, postCode根据potal配置，排序及显示
 */
const AddressPreview = ({
  configStore,
  data,
  nameCls,
  pickupNameCls
}: Props) => {
  const {
    localAddressForm: { settings, fieldKeyEnableStatus }
  } = configStore;

  const {
    receiveType,
    pickupName,
    pickupPriceVisible = true,
    pickupPrice,
    workTime,
    minDeliveryTime,
    maxDeliveryTime,

    calculation,
    deliveryDate,
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
    buyerRemark,
    consigneeName,
    firstNameKatakana,
    lastNameKatakana,
    consigneeNumber,
    showDeliveryDateAndTimeSlot = true
  } = data;

  /**
   * 根据接口字段设置，进行排序/过滤，然后显示到页面
   * @param {*} list 需要排序的列表
   * @returns 排序后的列表
   */
  const handleSortAndFilter = (list: ListType[]) => {
    const ret = list
      .sort((a, b) => {
        const targetA = settings.find(
          (ele: ListType) => ele.fieldKey === a.fieldKey
        );
        const targetB = settings.find(
          (ele: ListType) => ele.fieldKey === b.fieldKey
        );
        return targetA?.sequence - targetB?.sequence;
      })
      .filter(
        (ele: ListType) =>
          !ele.fieldKey || (fieldKeyEnableStatus[ele.fieldKey] && ele.value)
      );
    return ret;
  };

  const arrangedList = useMemo(() => {
    const tmpList: ListType[] = [
      {
        fieldKey: 'city',
        value: city
      },
      {
        fieldKey: 'region',
        value: area
      },
      {
        fieldKey: 'state',
        value: province
      },
      {
        fieldKey: 'county',
        value: county
      },
      {
        fieldKey: 'postCode',
        value: postCode
      },
      { fieldKey: 'country', value: countryName }
    ];
    return handleSortAndFilter(tmpList);
  }, [city, area, province, county, postCode, countryName]);

  return (
    <DivWrapper>
      {receiveType === 'PICK_UP' ? (
        <>
          {pickupName ? (
            <p className={cn(pickupNameCls, 'preview-pickup-name')}>
              <span>{pickupName}</span>
              {pickupPriceVisible ? (
                <span>{formatMoney(pickupPrice)}</span>
              ) : null}
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
              <p className="preview_delivery_date pickup1">
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
          {window.__.env.REACT_APP_COUNTRY === 'ru' ? (
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
                    <p className="preview_delivery_date ru1">
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
                <p className="preview_delivery_date ru2">{newDeliveryDate}</p>
              )}

              {/* time slot */}
              {timeSlot && <p className="preview_time_slot">{timeSlot}</p>}
            </>
          ) : window.__.env.REACT_APP_COUNTRY === 'jp' ? (
            <>
              <div
                className="d-flex col-10 col-md-8 pl-1 pr-1"
                style={{ flexDirection: 'column' }}
              >
                <span>{consigneeName}</span>
                <span>
                  {firstNameKatakana} {lastNameKatakana}
                </span>
                <span>{COUNTRY == 'jp' ? '〒' + postCode : postCode}</span>
                <p>{[province, city, area, address1].join(', ')}</p>
                <p>{consigneeNumber}</p>
                <p className={`${showDeliveryDateAndTimeSlot ? '' : 'hidden'}`}>
                  {deliveryDate && timeSlot ? (
                    <>
                      {/* 格式化 delivery date 格式: 星期, 15 月份 */}
                      {deliveryDate !== 'Unspecified' && (
                        <>
                          <FormattedMessage id="Deliverytime" />
                          {formatJPDate(deliveryDate)}
                        </>
                      )}

                      {timeSlot == 'Unspecified' ? (
                        <FormattedMessage id="Unspecified" />
                      ) : (
                        formatJPTime(timeSlot)
                      )}
                    </>
                  ) : null}
                </p>
              </div>
              <p className="text-12 pl-1">
                <FormattedMessage
                  id="DeliverytimeContentSec"
                  values={{
                    val: localStorage.getItem('cutOffTime')
                  }}
                />
              </p>
            </>
          ) : (
            <>
              {name ? <p className={cn(nameCls)}>{name}</p> : null}
              {address1 ? <p>{address1}</p> : null}
              {fieldKeyEnableStatus['address2'] && address2 ? (
                <p>{address2}</p>
              ) : null}
              {arrangedList.length ? (
                window.__.env.REACT_APP_COUNTRY === 'se' ? (
                  <>
                    {/* se特殊处理显示字段顺序 */}
                    <p className={cn(`preview_postCode|city`)}>
                      {[postCode, city].join(' ')}
                    </p>
                    <p className={cn(`preview_country`)}>{countryName}</p>
                  </>
                ) : (
                  <p
                    className={cn(
                      `preview_${arrangedList.map((t) => t.fieldKey).join('|')}`
                    )}
                  >
                    {arrangedList.map((t) => t.value).join(', ')}
                  </p>
                )
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
