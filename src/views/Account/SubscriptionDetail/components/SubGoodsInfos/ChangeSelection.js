import { FormattedMessage } from 'react-intl-phraseapp';
import React, { useContext, useState } from 'react';
import { FrequencySelection, FrequencyMatch } from '@/components';
import { SubGoodsInfosContext } from './index';
import { getZoneTime, formatDate } from '@/utils/utils';
import { GAForChangeProductBtn } from '@/utils/GA';
import { DatePickerComponent } from '@/components/Common';
import cn from 'classnames';

const ChangeSelection = ({ el, idx }) => {
  const SubGoodsInfosValue = useContext(SubGoodsInfosContext);
  const {
    setState,
    isIndv,
    isActive,
    getMinDate,
    isGift,
    subDetail,
    triggerShowChangeProduct,
    productListLoading,
    handleClickChangeProduct
  } = SubGoodsInfosValue;

  switch (el.goodsInfoFlag) {
    case 0:
      el.promotions = 'one-off';
      break;
    case 1:
      el.promotions = 'autoship';
      break;
    case 2:
      el.promotions = 'club';
      break;
  }
  const isClub = el.promotions?.toLowerCase().includes('club');

  const girdConf = ['col-span-5 md:col-span-6', 'col-span-7 md:col-span-6'];
  console.log(el.promotions, 'ooo');
  return (
    <>
      <div className="rc-card-content overflow-hidden grid grid-cols-12 items-center px-3 md:px-0 mt-3 md:mt-0 mb-2 gap-1">
        <span className={cn('leading-normal', girdConf[0])}>
          {/* Shipping Method: */}
          <FormattedMessage
            id={isClub ? 'autoShipStarted' : 'autoShipStarted2'}
          />
        </span>
        <div
          className={cn(
            'rc-card__meta order-Id text-left text-base',
            girdConf[1]
          )}
          style={{
            fontSize: '1.25rem'
          }}
        >
          {formatDate({ date: el.createTime })}
        </div>
      </div>
      <div className="rc-card-content sub-frequency-wrap grid grid-cols-12 items-center px-3 md:px-0 gap-1">
        {isIndv ? (
          <>
            <span className={cn(girdConf[0])}>
              <FormattedMessage id="subscription.frequencyDelivery" />
              <FormattedMessage id="subscription.deliveryEvery" />
            </span>
            <div
              className={cn(
                'rc-card__meta order-Id text-left text-base',
                girdConf[1]
              )}
              style={{
                fontSize: '1.25rem'
              }}
            >
              <FrequencyMatch currentId={el.periodTypeId} />
              {/* 30 days */}
              {/* 30 daily rations Delivered every month */}
            </div>
          </>
        ) : (
          <div
            className="rc-card__meta order-Id text-left text-base	col-span-12"
            style={{
              fontSize: '1.25rem'
            }}
          >
            {el.promotions && (
              <FrequencySelection
                frequencyType={el.promotions}
                wrapStyle={{}}
                currentFrequencyId={el.periodTypeId}
                handleConfirm={(data) => {
                  if (el.periodTypeId !== data.id) {
                    el.periodTypeId = data.id;
                    // el.periodTypeValue = data.valueEn;
                    setState({ isDataChange: true });
                  }
                }}
                childrenGridCls={girdConf}
                disabled={!isActive || isGift}
                // selectionStyle={{ marginLeft: '.3rem' }}
              />
            )}
          </div>
        )}
      </div>

      <div className="rc-card-content mb-1 overflow-hidden grid grid-cols-12 items-center px-3 md:px-0 gap-1">
        <span
          style={{
            lineHeight: 1
          }}
          className={cn('whitespace-nowrap1 flex items-center', girdConf[0])}
        >
          <span className="iconfont icondata text-lg mr-2" />
          <FormattedMessage id="nextShipment" />:
        </span>
        <div
          className={cn('rc-card__meta order-Id', girdConf[1])}
          style={{
            fontSize: '1.25rem'
          }}
        >
          <DatePickerComponent
            className="receiveDate"
            minDate={getMinDate(el.nextDeliveryTime)}
            selected={
              !isActive
                ? ''
                : el.nextDeliveryTime
                ? getZoneTime(el.nextDeliveryTime)
                : new Date()
            }
            disabled={true}
          />
        </div>
      </div>
    </>
  );
};

export default ChangeSelection;
