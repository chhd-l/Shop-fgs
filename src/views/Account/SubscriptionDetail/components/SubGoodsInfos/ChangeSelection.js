import { FormattedMessage } from 'react-intl-phraseapp';
import React, { useContext, useState } from 'react';
import FrequencySelection from '@/components/FrequencySelection';
import { SubGoodsInfosContext } from './index';
import DatePicker from 'react-datepicker';
import FrequencyMatch from '@/components/FrequencyMatch';
import { datePickerConfig, getZoneTime, formatDate } from '@/utils/utils';
import { GAForChangeProductBtn } from '@/utils/GA';
import cn from 'classnames';

const ChangeSelection = ({ el, idx }) => {
  const SubGoodsInfosValue = useContext(SubGoodsInfosContext);
  const {
    setState,
    isIndv,
    isActive,
    onDateChange,
    getMinDate,
    isGift,
    subDetail,
    triggerShowChangeProduct,
    productListLoading
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
          <DatePicker
            className="receiveDate"
            placeholder="Select Date"
            dateFormat={datePickerConfig.format}
            locale={datePickerConfig.locale}
            minDate={getMinDate(el.nextDeliveryTime)}
            selected={
              !isActive
                ? ''
                : el.nextDeliveryTime
                ? getZoneTime(el.nextDeliveryTime)
                : new Date()
            }
            disabled={true}
            onChange={(date) => onDateChange(date)}
          />
        </div>
      </div>
      {el.canChangeProduct ? (
        <div className="rc-card-content px-3 md:px-0">
          <div className=" flex items-center">
            <span
              style={{
                width: 'auto',
                paddingTop: '6px'
              }}
              className={cn(
                `text-plain rc-styled-link ui-text-overflow-md-line1`,
                {
                  'ui-btn-loading': productListLoading
                }
              )}
              onClick={() => {
                setState({ currentChangeProductIdx: idx });
                GAForChangeProductBtn();
                if (!!subDetail.petsId) {
                  setState({
                    triggerShowChangeProduct: Object.assign(
                      {},
                      triggerShowChangeProduct,
                      {
                        firstShow: !triggerShowChangeProduct.firstShow,
                        goodsInfo: subDetail?.goodsInfo,
                        isShowModal: true
                      }
                    )
                  });
                } else {
                  setState({ triggerShowAddNewPet: true });
                }
              }}
            >
              <em
                className="iconfont iconrefresh font-bold mr-2"
                style={{
                  fontSize: '1.1rem',
                  color: 'rgb(58,180,29)'
                }}
              />
              <span>
                <FormattedMessage id="subscriptionDetail.changeProduct" />
              </span>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChangeSelection;
