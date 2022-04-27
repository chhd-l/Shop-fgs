import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import stores from '@/store';
import LazyLoad from 'react-lazyload';
import { useLocalStore } from 'mobx-react';
import Selection from '@/components/Selection';
import DatePicker from 'react-datepicker';
import {
  getDeviceType,
  datePickerConfig,
  formatMoney,
  getZoneTime,
  formatDate,
  optimizeImage
} from '@/utils/utils';
import { getDeliveryDateAndTimeSlot } from '@/api/address';
import { IMG_DEFAULT } from '@/utils/constant';
import cn from 'classnames';
import PriceDetailsList from '../PriceDetailsList';

const Unspecified = 'Unspecified';

const NextDelivery = ({
  el,
  subDetail,
  getMinDate,
  setState,
  modalList,
  handleSaveChange,
  timeSlotArr,
  intl,
  slotTimeChanged
}) => {
  const showTimeSlot = window.__.env.REACT_APP_COUNTRY === 'jp';
  const isIndv = subDetail.subscriptionType
    ?.toLowerCase()
    .includes('individualization');
  const isActive = subDetail.subscribeStatus === 'ACTIVE';
  const { configStore } = useLocalStore(() => stores);
  const [promotionInputValue, setPromotionInputValue] = ''; //输入的促销码
  const [promotionDiscount, setPromotionDiscount] = useState(0);
  const [promotionDesc, setPromotionDesc] = useState('');
  const [isShowValidCode, setIsShowValidCode] = useState(false); //是否显示无效promotionCode
  const [isClickApply, setIsClickApply] = useState(false); //是否点击apply按钮
  const [discount, setDiscount] = useState([]); //促销码的折扣信息汇总
  const isNotInactive = subDetail.subscribeStatus !== 'INACTIVE';
  const handlerChange = (e) => {
    setPromotionInputValue(e.target.value);
  };
  const [deliveryDateList, setDeliveryDateList] = useState([]);
  const [timeSlotList, setTimeSlotList] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  // const [timeSlot, setTimeSlot] = useState('');

  useEffect(() => {
    if (!showTimeSlot) {
      return;
    }
    getDeliveryDateAndTimeSlotData();
  }, []);

  useEffect(() => {
    if (timeSlotArr.length) {
      initTimeSlot(timeSlotArr);
    }
  }, [timeSlotArr]);
  const initTimeSlot = (list) => {
    let deliveryDateMatched = false;
    let deliveryDateList = list.map((el) => {
      el.dateTimeInfos.unshift({
        name: Unspecified,
        value: Unspecified,
        startTime: Unspecified
      });
      el.dateTimeInfos.forEach((item) => {
        item.value = `${item.startTime}${
          item.endTime ? '-' + item.endTime : ''
        }`;
        item.name = `${item.startTime}${
          item.endTime ? '-' + item.endTime : ''
        }`;
      });
      if (el.date === subDetail.deliveryDate) {
        // list里面能匹配到delivery date
        deliveryDateMatched = true;
      }
      return { ...el, value: el.date, name: el.date };
    });
    if (!deliveryDateMatched) {
      // list里面没能匹配到delivery date，清空现有的deliveryDate
      subDetail.deliveryDate = '';
    }
    let timeSlotList = [];
    if (!subDetail.deliveryDate) {
      let deliveryDate = '';
      let timeSlot = '';
      // 没有deliveryDate并且没有timeSlot的时候，默认第一个deliveryDate
      // 没有deliveryDate并且有timeSlot的时候，需要去遍历所有timeslot做匹配并且回显当前的deliveryDate
      if (subDetail.timeSlot) {
        deliveryDateList.forEach((item) => {
          if (!deliveryDate) {
            let timeSlotArr = item.dateTimeInfos.find(
              (el) => `${el.startTime}-${el.endTime}` == subDetail.timeSlot
            );
            if (timeSlotArr) {
              timeSlot = subDetail.timeSlot;
              timeSlotList = item.dateTimeInfos;
              deliveryDate = item.date;
            }
          }
        });
      }
      if (!deliveryDate) {
        deliveryDate = deliveryDateList[0].date;
        // timeSlot = `${deliveryDateList[0]?.dateTimeInfos[0]?.startTime}-${deliveryDateList[0]?.dateTimeInfos[0]?.endTime}`;
      }
      if (!timeSlot) {
        timeSlot = Unspecified;
      }
      subDetail.timeSlot = timeSlot;
      subDetail.deliveryDate = deliveryDate;
    }
    // if (subDetail.timeSlot == Unspecified) {
    //   deliveryDateList[0]?.dateTimeInfos.unshift({
    //     name: Unspecified,
    //     value: Unspecified,
    //     startTime: Unspecified
    //   });
    // }
    if (!timeSlotList?.length) {
      timeSlotList =
        deliveryDateList.find((el) => el.value == subDetail.deliveryDate)
          ?.dateTimeInfos || deliveryDateList[0]?.dateTimeInfos;
      // ?.map((cel) => {
      //   return {
      //     ...cel,
      //     name: `${cel.startTime}-${cel.endTime}`,
      //     value: `${cel.startTime}-${cel.endTime}`
      //   };
      // });
    }

    setDeliveryDateList(deliveryDateList);
    setTimeSlotList(timeSlotList);
    // setTimeSlot(subDetail.timeSlot);
    setDeliveryDate(subDetail.deliveryDate);
  };
  const dateChange = (date) => {
    setState({
      modalType: 'changeDate',
      modalShow: true,
      currentModalObj: modalList.filter((el) => el.type === 'changeDate')[0],
      currentChangeDate: date,
      currentChangeItem: el.tradeItems.map((el) => {
        return {
          skuId: el.skuId
        };
      })
    });
  };
  const skipNext = (el) => {
    setState({
      modalType: 'skipNext',
      modalShow: true,
      currentModalObj: modalList.filter((el) => el.type === 'skipNext')[0],
      skipNextGoods: el.tradeItems.map((el) => {
        return {
          skuId: el.skuId
        };
      })
    });
  };
  const getDeliveryDateAndTimeSlotData = async () => {
    const res = await getDeliveryDateAndTimeSlot({
      cityNo: '',
      subscribeId: subDetail.subscribeId
    });
    if (res.context) {
      initTimeSlot(res.context.timeSlots);
      //test
      // setDeliveryDate(deliveryDateList[0].date);
      // setTimeSlot(`${deliveryDateList[0].dateTimeInfos[0].startTime}-${deliveryDateList[0].dateTimeInfos[0].endTime}`);
    }
  };

  // const ChangeTimeDeliveryDate = (data) => {
  //   setTimeSlot(Unspecified);
  //   let timeSlotList = deliveryDateList.find(
  //     (el) => el.value == data.value
  //   )?.dateTimeInfos;
  //   setTimeSlotList(timeSlotList);
  //   setDeliveryDate(data.name);
  // };
  const ChangeTimeslot = (data) => {
    if (showTimeSlot) {
      setState({
        modalType: 'changeTime',
        modalShow: true,
        currentModalObj: modalList.filter((el) => el.type === 'changeTime')[0],
        jpSlotTime: { ...subDetail, deliveryDate, timeSlot: data.name }
      });
      return false;
    }
    subDetail.deliveryDate = deliveryDate;
    subDetail.timeSlot = data.name;
    // setState({isDataChange:true})
    handleSaveChange(subDetail, true);
  };
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  return (
    <div className="card-container border rounded border-d7d7d7">
      <div className="card rc-margin-y--none ml-0 border-0">
        {isActive ? (
          <div
            className="flex items-center justify-between px-4 flex-wrap pt-1"
            style={{ background: '#f9f9f9' }}
          >
            <div className="mb-2 md:mb-0">
              <FormattedMessage id="nextShipmentOn" />
              :
              <br />
              <span
                style={{
                  color: '#e2001a',
                  fontWeight: '400'
                }}
              >
                {isNotInactive
                  ? formatDate({ date: el.tradeItems[0].nextDeliveryTime })
                  : ''}
              </span>
            </div>
            <div className="flex items-center mb-2  md:mb-0">
              {/* {showTimeSlot && deliveryDate && (
                <Selection
                  customCls="selection-with-border"
                  optionList={deliveryDateList}
                  selectedItemChange={(data) => ChangeTimeDeliveryDate(data)}
                  selectedItemData={{
                    value: deliveryDate
                  }}
                  // disabled={true}
                  customStyleType="none"
                  key={deliveryDate}
                  placeholder="please select"
                />
              )} */}
              <div
                className={cn('changeDate whitespace-nowrap mr-6 text-right')}
              >
                <span
                  className="iconfont icondata"
                  style={{
                    color: '#666'
                  }}
                />
                <span
                  style={{
                    color: '#666',
                    fontWeight: '400',
                    marginLeft: '5px',
                    borderBottom: '1px solid #666',
                    cursor: 'pointer'
                  }}
                >
                  <DatePicker
                    className="receiveDate subs-receiveDate for-mobile-pad-0"
                    placeholder="Select Date"
                    dateFormat={datePickerConfig.format}
                    locale={datePickerConfig.locale}
                    minDate={getMinDate(el.tradeItems[0].nextDeliveryTime)}
                    selected={
                      el.tradeItems
                        ? getZoneTime(el.tradeItems[0].nextDeliveryTime)
                        : new Date()
                    }
                    onChange={(date) => dateChange(date)}
                  />
                </span>
              </div>
              {showTimeSlot && subDetail.timeSlot && (
                <Selection
                  customCls="selection-with-border"
                  optionList={timeSlotList}
                  selectedItemChange={(data) => ChangeTimeslot(data)}
                  selectedItemData={{
                    value: subDetail.timeSlot
                  }}
                  customStyleType="none"
                  key={`${subDetail.timeSlot}`}
                  placeholder="please select"
                  slotTimeChanged={slotTimeChanged}
                  comfirmModal={true}
                />
              )}

              <div className="whitespace-nowrap">
                <span
                  className="iconfont iconskip font-bold mr-1"
                  style={{
                    color: '#666'
                  }}
                />
                <a
                  className="rc-styled-link ui-text-overflow-line1 whitespace-normal break-words"
                  onClick={(e) => skipNext(el)}
                >
                  <FormattedMessage id="skip" />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {el.tradeItems &&
        el.tradeItems.map((tradeItem, index) => {
          let showDiscountPrice = !isIndv;
          // 如果是日本 没有折扣 不显示折扣价
          if (
            window.__.env.REACT_APP_COUNTRY === 'jp' &&
            el.originalPrice === el.subscribePrice
          ) {
            showDiscountPrice = false;
          }
          return (
            <div
              className="row rc-margin-x--none row align-items-center"
              style={{
                padding: '1rem 0',
                borderBottom: '1px solid #d7d7d7'
              }}
              key={index}
            >
              <div className={`col-9 col-md-6 d-flex row align-items-center`}>
                <LazyLoad className="col-6 col-md-3">
                  <img
                    src={
                      optimizeImage({ originImageUrl: tradeItem.pic }) ||
                      IMG_DEFAULT
                    }
                    alt={tradeItem.skuName}
                  />
                </LazyLoad>
                <div style={{ display: `${isIndv ? 'none' : 'block'}` }}>
                  <h5
                    className="text-nowrap"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      overflowWrap: 'normal',
                      fontSize: '.875rem',
                      width: isMobile ? '100px' : 'auto'
                    }}
                  >
                    {tradeItem.skuName}
                  </h5>
                  <p
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: '8px',
                      fontSize: '.875rem'
                    }}
                  >
                    {tradeItem.specDetails}{' '}
                    {isMobile ? `x ${tradeItem.num}` : null}
                  </p>
                </div>
              </div>
              <div className={`${isMobile ? 'none' : 'col-4'} col-md-2`}>
                <p
                  style={{
                    textAlign: 'center',
                    marginBottom: '0',
                    fontWeight: '400'
                  }}
                >
                  x {tradeItem.num}
                </p>
              </div>
              <div className="col-3 col-md-4">
                <p style={{ textAlign: 'right', marginBottom: '0' }}>
                  <span className="red">
                    {formatMoney(
                      isIndv
                        ? el.tradePrice.goodsPrice
                        : tradeItem.subscriptionPrice
                    )}
                  </span>
                  {showDiscountPrice && (
                    <span
                      style={{
                        fontSize: '.75rem',
                        textDecoration: 'line-through',
                        marginLeft: '5px'
                      }}
                    >
                      {formatMoney(tradeItem.originalPrice)}
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      <div
        className="row rc-margin-x--none row align-items-center 3"
        style={{ padding: '1rem' }}
      >
        <div className={`col-12 col-md-6`}>
          <div
            className="footer"
            style={{
              marginTop: '.625rem',
              marginBottom: '.625rem',
              padding: '0 40px',
              display: 'none'
            }}
          >
            <span
              className="rc-input rc-input--inline rc-input--label"
              style={{
                width: isMobile ? '50%' : '170px',
                verticalAlign: 'middle'
              }}
            >
              <input
                className="rc-input__control"
                id="id-text2"
                type="text"
                name="text"
                placeholder={intl.messages.promotionCode}
                value={promotionInputValue}
                onChange={(e) => handlerChange(e)}
              />
              <label className="rc-input__label" htmlFor="id-text2" />
            </span>
            <button
              className={[
                'rc-btn',
                'rc-btn--sm',
                'rc-btn--two',
                isClickApply && 'ui-btn-loading ui-btn-loading-border-red'
              ].join(' ')}
              style={{ marginTop: '.625rem' }}
            >
              <FormattedMessage id="apply" />
            </button>
          </div>
        </div>
        <div className={`col-12 col-md-6`}>
          <div className="text-right">
            <PriceDetailsList
              data={{
                totalPrice: el?.tradePrice?.goodsPrice,
                taxFeePrice: el?.tradePrice?.taxFeePrice,
                subscriptionDiscountPrice:
                  el?.tradePrice?.subscriptionDiscountPrice,
                deliveryPrice: el?.tradePrice?.deliveryPrice,
                freeShippingDiscountPrice:
                  el.tradePrice.freeShippingDiscountPrice,
                freeShippingFlag: el.tradePrice.freeShippingFlag,
                promotionVOList: el?.tradePrice?.promotionVOList?.filter(
                  (e) => e.discountPrice
                ),
                serviceFeePrice: el?.tradePrice?.serviceFeePrice,
                loyaltyPointsPrice: el?.tradePrice?.loyaltyPoints
              }}
            />
            {/* 总价 */}
            <div className="row">
              <label className="col-8 text-left">
                <strong style={{ fontSize: '1.25rem', color: '#333' }}>
                  <FormattedMessage id="order.total" />
                </strong>{' '}
                <span style={{ fontSize: '.75rem' }}>
                  <FormattedMessage id="order.iVAIncluido" defaultMessage=" " />
                </span>
              </label>
              <div className="text-right col-4">
                <strong>{formatMoney(el.tradePrice.totalPrice)}</strong>
              </div>
            </div>
            {window.__.env.REACT_APP_COUNTRY === 'us' ? (
              <div className="row">
                <div className="col-1 col-md-3 hidden md:block" />
                <label className="col-12 col-md-9 text-sm ">
                  *Tax will be calculated when your order is processed
                </label>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default injectIntl(NextDelivery);
