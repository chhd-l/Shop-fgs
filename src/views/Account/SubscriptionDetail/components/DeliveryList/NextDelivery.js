import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import stores from '@/store';
import LazyLoad from 'react-lazyload';
import { useLocalStore } from 'mobx-react';
import DatePicker from 'react-datepicker';
import skipIcon from '../../images/skip.png';
import dateIcon from '../../images/date.png';
import {
  getDeviceType,
  getFormatDate,
  datePickerConfig,
  formatMoney,
  getZoneTime
} from '@/utils/utils';

const NextDelivery = ({
  el,
  subDetail,
  getMinDate,
  setState,
  modalList,
  intl
}) => {
  const isIndv = subDetail.subscriptionType?.toLowerCase().includes('indv');
  const isActive = subDetail.subscribeStatus === '0';
  const { configStore } = useLocalStore(() => stores);
  const [promotionInputValue, setPromotionInputValue] = ''; //输入的促销码
  const [promotionDiscount, setPromotionDiscount] = useState(0);
  const [promotionDesc, setPromotionDesc] = useState('');
  const [isShowValidCode, setIsShowValidCode] = useState(false); //是否显示无效promotionCode
  const [isClickApply, setIsClickApply] = useState(false); //是否点击apply按钮
  const [discount, setDiscount] = useState([]); //促销码的折扣信息汇总
  const isNotInactive =
    subDetail.subscribeStatus === '0' || subDetail.subscribeStatus === '1';
  const handlerChange = (e) => {
    setPromotionInputValue(e.target.value);
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
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  return (
    <div className="card-container">
      <div className="card rc-margin-y--none ml-0">
        <div
          className="card-header row rc-margin-x--none align-items-center pl-0 pr-0"
          style={{
            background: '#f9f9f9',
            height: '60px',
            padding: 0
          }}
        >
          {isActive ? (
            <div
              className={`${isMobile ? 'col-4' : 'col-md-3'}`}
              style={{
                padding: isMobile ? '0 0 0 .625rem' : '0 .9375rem 0 1.25rem'
              }}
            >
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
                  ? getFormatDate(
                      el.tradeItems[0].nextDeliveryTime.split(' ')[0]
                    )
                  : ''}
              </span>
            </div>
          ) : null}
          <div className={`${isMobile ? 'col-0' : 'col-md-5'}`} />
          <div
            className={`changeDate ${isMobile ? 'col-5' : 'col-md-3 pl-4'}`}
            style={{
              textAlign: 'right',
              padding: isMobile ? '0' : '0 1.25rem 0 .9375rem'
            }}
          >
            {isActive ? (
              <>
                <LazyLoad>
                  <img
                    alt="date Icon"
                    src={dateIcon}
                    style={{
                      width: '1.25rem',
                      display: 'inline'
                    }}
                  />
                </LazyLoad>
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
                    className="receiveDate subs-receiveDate"
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
              </>
            ) : null}
          </div>
          <div
            className={`${isMobile ? 'col-3' : 'col-md-1'}`}
            style={{
              padding: isMobile ? '0 0 0 .625rem' : '0'
            }}
          >
            {isActive ? (
              <>
                <LazyLoad>
                  <img
                    style={{
                      display: 'inline-block',
                      width: '1.25rem',
                      marginRight: '5px'
                    }}
                    alt="skip icon"
                    src={skipIcon}
                  />
                </LazyLoad>
                <a
                  className="rc-styled-link ui-text-overflow-line1"
                  style={{ width: '60px' }}
                  onClick={(e) => skipNext(el)}
                >
                  <FormattedMessage id="skip" />
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {el.tradeItems &&
        el.tradeItems.map((tradeItem, index) => (
          <div
            className="row rc-margin-x--none row align-items-center 2"
            style={{
              padding: '1rem 0',
              borderBottom: '1px solid #d7d7d7'
            }}
            key={index}
          >
            <div className={`${isMobile ? 'col-6' : 'col-4'} col-md-4`}>
              <div
                className="rc-layout-container rc-five-column"
                style={{
                  paddingRight: isMobile ? '0' : '60px',
                  paddingTop: '0'
                }}
              >
                <div
                  className="rc-column flex-layout"
                  style={{
                    width: '80%',
                    padding: 0
                  }}
                >
                  <LazyLoad>
                    <img
                      style={{
                        width: '70px',
                        margin: '0 .625rem'
                      }}
                      src={tradeItem.pic}
                      alt={tradeItem.skuName}
                    />
                  </LazyLoad>
                  <div
                    style={{
                      width: '200px',
                      paddingTop: '30px',
                      display: `${isIndv ? 'none' : 'block'}`
                    }}
                  >
                    <h5
                      className="text-nowrap"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        overflowWrap: 'normal',
                        fontSize: '.875rem',
                        width: isMobile ? '95px' : 'auto'
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
              </div>
            </div>
            <div className={`${isMobile ? 'none' : 'col-4'} col-md-4`}>
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
            <div className={`${isMobile ? 'col-6' : 'col-4'} col-md-4`}>
              <p
                style={{
                  textAlign: 'right',
                  paddingRight: '.625rem',
                  marginBottom: '0'
                }}
              >
                <span className="red">
                  {formatMoney(tradeItem.subscriptionPrice)}
                </span>
                <span
                  style={{
                    fontSize: '.75rem',
                    textDecoration: 'line-through',
                    marginLeft: '5px'
                  }}
                >
                  {formatMoney(tradeItem.originalPrice)}
                </span>
              </p>
            </div>
          </div>
        ))}
      <div
        className="row rc-margin-x--none row align-items-center 3"
        style={{
          padding: '1rem 0'
          // borderBottom: '1px solid #d7d7d7'
        }}
      >
        <div className={`col-12 col-md-6`}>
          <div
            className="footer"
            style={{
              marginTop: '.625rem',
              marginBottom: '.625rem',
              padding: '0 40px',
              display: 'none'
              // display:
              //   subDetail.subscribeStatus ===
              //   '0'
              //     ? 'block'
              //     : 'none'
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
            <div className="row">
              <div className="col-1 col-md-3" />
              <label className="col-5 text-left">
                <FormattedMessage id="subscription.total" />
              </label>
              <div className="col-5 col-md-3 text-right">
                <strong>{formatMoney(el.tradePrice.goodsPrice)}</strong>
              </div>
            </div>
            {el.tradePrice.subscriptionDiscountPrice ? (
              <div className="row">
                <div className="col-1 col-md-3" />
                <label className="green col-5 text-left">
                  <FormattedMessage id="promotion" />:
                </label>
                <div className="col-5 col-md-3 text-right green">
                  <strong>
                    -{formatMoney(el.tradePrice.subscriptionDiscountPrice)}
                  </strong>
                </div>
              </div>
            ) : null}
            {el.tradePrice.promotionVOList
              ?.filter((el) => el.discountPrice)
              ?.map((el) => (
                <div className="row">
                  <div className="col-1 col-md-3" />
                  <label className="green col-5 text-left">
                    {el.marketingName}:
                  </label>
                  <div className="col-5 col-md-3 text-right green">
                    <strong>-{formatMoney(el.discountPrice)}</strong>
                  </div>
                </div>
              ))}
            {!isShowValidCode &&
              discount.map((el, i) => (
                <div className="row" key={i}>
                  <div className="col-1 col-md-3" />
                  <label
                    className="red-text col-5"
                    style={{
                      flex: isMobile ? '1' : 'inherit'
                    }}
                  >
                    {promotionDesc}
                  </label>
                  <div
                    className="text-right red-text col-5 col-md-3"
                    style={{
                      position: 'relative',
                      flex: isMobile ? '1' : 'inherit'
                    }}
                  >
                    <strong>-{formatMoney(promotionDiscount)}</strong>
                    <span
                      style={{
                        position: 'absolute',
                        right: '-1.125rem',
                        fontSize: '1.375rem',
                        bottom: '5px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        discount.pop();
                        setState({
                          discount: discount
                        });
                      }}
                    >
                      x
                    </span>
                  </div>
                </div>
              ))}

            <div className="row">
              <div className="col-1 col-md-3" />
              <label className="col-5 text-left">
                <FormattedMessage id="subscription.shipping" />
              </label>
              <div className="text-right red-text col-5 col-md-3">
                <strong>{formatMoney(el.tradePrice.deliveryPrice)}</strong>
              </div>
            </div>

            {/* 运费折扣 */}
            {el.tradePrice.freeShippingFlag ? (
              <>
                <div className="row">
                  <div className="col-1 col-md-3" />
                  <label className="col-5 text-left">
                    <FormattedMessage id="payment.shippingDiscount" />
                  </label>
                  <div className="text-right col-5 col-md-3 green">
                    <strong>
                      {el.tradePrice.freeShippingDiscountPrice > 0 && '-'}
                      {formatMoney(el.tradePrice.freeShippingDiscountPrice)}
                    </strong>
                  </div>
                </div>
              </>
            ) : null}

            {/* 
            customTaxSettingOpenFlag 税额开关 0: 开, 1: 关
            enterPriceType 买入价格开关 0：含税，1：不含税
          */}
            {configStore?.customTaxSettingOpenFlag == 0 &&
            configStore?.enterPriceType == 1 ? (
              <div className="row">
                <div className="col-1 col-md-3" />
                <label className="col-5 text-left">
                  <FormattedMessage id="estimatedTax" />
                </label>
                <div className="text-right red-text col-5 col-md-3 components_next_delivery">
                  <strong>{formatMoney(el.tradePrice.taxFeePrice)}</strong>
                </div>
              </div>
            ) : null}

            {/* 总价 */}
            <div className="row">
              <div className="col-1 col-md-3" />
              <label className="col-5 text-left">
                <strong
                  style={{
                    fontSize: '1.25rem',
                    color: '#333'
                  }}
                >
                  <FormattedMessage id="order.total" />
                </strong>{' '}
                <span
                  style={{
                    fontSize: '.75rem'
                  }}
                >
                  <FormattedMessage id="order.iVAIncluido" defaultMessage=" " />
                </span>
              </label>
              <div className="text-right col-5 col-md-3">
                <strong>{formatMoney(el.tradePrice.totalPrice)}</strong>
              </div>
            </div>
            {window.__.env.REACT_APP_COUNTRY === 'us' ? (
              <div className="row">
                <div className="col-1 col-md-3" />
                <label className="col-9 text-left">
                  Tax will be calculated when your order is processed
                  {/* <strong
                    style={{
                      fontSize: '1.25rem',
                      color: '#333'
                    }}
                  >
                    <FormattedMessage id="order.total" />
                  </strong>{' '} */}
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
