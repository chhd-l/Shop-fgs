import { FormattedMessage } from 'react-intl-phraseapp';
import React, { useContext, useState } from 'react';
import FrequencySelection from '@/components/FrequencySelection';
import { SubGoodsInfosContext } from './index';
import DatePicker from 'react-datepicker';
import FrequencyMatch from '@/components/FrequencyMatch';
import { datePickerConfig, getZoneTime, formatDate } from '@/utils/utils';
import { GAForChangeProductBtn } from '@/utils/GA';
import cn from 'classnames';

const ChangeSelection = ({ el }) => {
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

  return (
    <>
      <div className="rc-card-content overflow-hidden">
        <strong
          style={{
            display: 'inline-block',
            width: '50%'
          }}
          className="whitespace-nowrap1"
        >
          {/* Shipping Method: */}
          <FormattedMessage
            id={isClub ? 'autoShipStarted' : 'autoShipStarted2'}
          />
        </strong>
        <div
          className="rc-card__meta order-Id text-left text-base	"
          style={{
            marginTop: '.625rem',
            display: 'inline-block',
            marginLeft: '1.625rem',
            fontSize: '1.25rem'
          }}
        >
          {formatDate({ date: el.createTime })}
        </div>
      </div>
      <div className="rc-card-content sub-frequency-wrap -my-2">
        {isIndv ? (
          <>
            <strong
              style={{
                display: 'inline-block',
                width: '50%',
                marginTop: '.625rem',
                float: 'left'
              }}
            >
              <FormattedMessage id="subscription.frequencyDelivery" />
              <FormattedMessage id="subscription.deliveryEvery" />
            </strong>
            <div
              className="rc-card__meta order-Id text-left text-base"
              style={{
                marginTop: '.625rem',
                display: 'inline-block',
                paddingLeft: '1.625rem',
                fontSize: '1.25rem',
                width: '50%',
                float: 'left'
              }}
            >
              <FrequencyMatch currentId={el.periodTypeId} />
              {/* 30 days */}
              {/* 30 daily rations Delivered every month */}
            </div>
          </>
        ) : (
          <div
            className="rc-card__meta order-Id text-left text-base"
            style={{
              marginTop: '.625rem',
              display: 'inline-block',
              marginLeft: '.625rem',

              fontSize: '1.25rem'
            }}
          >
            {el.promotions && (
              <FrequencySelection
                frequencyType={el.promotions}
                // selectionStyle={{ marginLeft: '0.625rem' }}
                // textStyle={{ display: 'inline-block', width: '50%' }}
                wrapStyle={{}}
                currentFrequencyId={el.periodTypeId}
                handleConfirm={(data) => {
                  if (el.periodTypeId !== data.id) {
                    el.periodTypeId = data.id;
                    // el.periodTypeValue = data.valueEn;
                    setState({ isDataChange: true });
                  }
                }}
                className="col-md-12 text-left"
                // textStyle={{ width: '50%' }}
                disabled={!isActive || isGift}
              />
            )}
          </div>
        )}
      </div>

      <div className="rc-card-content -mt-5 mb-1 overflow-hidden">
        <strong
          style={{
            display: 'inline-block',
            width: '50%'
          }}
          className="whitespace-nowrap"
        >
          <span className="iconfont icondata text-xl mr-2" />
          <FormattedMessage id="nextShipment" />:
        </strong>
        <div
          className="rc-card__meta order-Id"
          style={{
            marginTop: '.625rem',
            display: 'inline-block',
            marginLeft: '1.625rem',
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
        <div className="rc-card-content">
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
