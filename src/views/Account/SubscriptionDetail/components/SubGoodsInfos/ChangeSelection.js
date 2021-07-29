import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import React, { useContext } from 'react';
import FrequencySelection from '@/components/FrequencySelection/index.tsx';
import LazyLoad from 'react-lazyload';
import { SubGoodsInfosContext } from './index';
import DatePicker from 'react-datepicker';
import dateIcon from '../../images/date.png';
import { getFormatDate, datePickerConfig, getZoneTime } from '@/utils/utils';
const ChangeSelection = ({ el }) => {
  const SubGoodsInfosValue = useContext(SubGoodsInfosContext);
  const {
    setState,
    isIndv,
    isActive,
    onDateChange,
    getMinDate,
    isGift
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
  return (
    <>
      <div className="rc-card-content">
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
              <FormattedMessage id="subscription.frequency" />:
            </strong>
            <div
              className="rc-card__meta order-Id text-left"
              style={{
                marginTop: '.625rem',
                display: 'inline-block',
                paddingLeft: '.625rem',
                fontSize: '1.25rem',
                width: '50%',
                float: 'left'
              }}
            >
              30 daily rations Delivered every month
            </div>
          </>
        ) : (
          <div
            className="rc-card__meta order-Id text-left"
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
                currentFrequencyId={el.periodTypeId}
                handleConfirm={(data) => {
                  if (el.periodTypeId !== data.id) {
                    el.periodTypeId = data.id;
                    // el.periodTypeValue = data.valueEn;
                    setState({ isDataChange: true });
                  }
                }}
                className="col-md-12"
                disabled={!isActive || isGift}
              />
            )}
          </div>
        )}
      </div>
      <div className="rc-card-content">
        <strong
          style={{
            display: 'inline-block',
            width: '50%'
          }}
        >
          {/* Shipping Method: */}
          <FormattedMessage id="autoShipStarted" />
        </strong>
        <div
          className="rc-card__meta order-Id text-left"
          style={{
            marginTop: '.625rem',
            display: 'inline-block',
            marginLeft: '.625rem',
            fontSize: '1.25rem'
          }}
        >
          {getFormatDate(el.createTime.split(' ')[0])}
        </div>
      </div>
      <div className="rc-card-content">
        <strong
          style={{
            display: 'inline-block',
            width: '50%'
          }}
        >
          <LazyLoad>
            <img
              alt="delete icon"
              src={dateIcon}
              style={{
                display: 'inline-block',
                width: '1.25rem',
                verticalAlign: 'middle',
                marginRight: '8px'
              }}
            />
          </LazyLoad>
          <FormattedMessage id="nextShipment" />:
        </strong>
        <div
          className="rc-card__meta order-Id"
          style={{
            marginTop: '.625rem',
            display: 'inline-block',
            marginLeft: '.625rem',
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
    </>
  );
};

export default ChangeSelection;
