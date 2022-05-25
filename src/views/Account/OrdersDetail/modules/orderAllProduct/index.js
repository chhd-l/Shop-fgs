import React from 'react';
import LazyLoad from 'react-lazyload';
import {
  filterOrderId,
  formatMoney,
  getClubLogo,
  judgeIsIndividual,
  optimizeImage
} from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';

//felin订单操作按钮显示
const renderOperationBtns = (details) => {
  return (
    <>
      {/*服务类产品评论*/}
      {details?.canReviewService ? (
        <button className="rc-btn rc-btn--sm rc-btn--one ord-list-operation-btn">
          <FormattedMessage id="writeReview">
            {(txt) => (
              <Link
                className="color-fff"
                to={`/account/productReviewService/${details.id}`}
                title={txt}
                alt={txt}
              >
                {txt}
              </Link>
            )}
          </FormattedMessage>
        </button>
      ) : null}
    </>
  );
};

const OrderAllProduct = ({ details }) => {
  console.log(333, details);
  return (
    <div className="order-list-container order__listing text-left">
      {details.tradeItems
        .concat(
          details?.gifts?.filter((item) => !item?.isHidden) || [],
          details?.subscriptionPlanGiftList?.filter(
            (item) => !item?.isHidden
          ) || []
        )
        .map((item, i) => (
          <div className="border-bottom px-2 py-3" key={i}>
            <div className="row align-items-center px-2 md:px-0">
              <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                <LazyLoad className="w-full">
                  <img
                    className="order-details-img-fluid w-100"
                    src={
                      optimizeImage({
                        originImageUrl: item.pic
                      }) ||
                      (item.isWelcomeBox
                        ? getClubLogo({
                            goodsInfoFlag: item.goodsInfoFlag
                          })
                        : IMG_DEFAULT)
                    }
                    alt={item.spuName}
                    title={item.spuName}
                  />
                </LazyLoad>
              </div>
              <div className="col-8 col-md-3">
                <span className="">
                  <span
                    className="medium ui-text-overflow-line2 text-break color-444"
                    title={item.spuName}
                  >
                    {item.spuName}
                  </span>
                  <span className="ui-text-overflow-line2">
                    {details?.appointmentNo ? (
                      <span className="rc-md-up">
                        {details.specialistType} – {details.appointmentTime}
                        <FormattedMessage id="min" /> –{details.appointmentType}
                      </span>
                    ) : (
                      <span className="rc-md-up">{item.specDetails}</span>
                    )}

                    <span className="rc-md-down">
                      {judgeIsIndividual(item) ? (
                        <span>{item.specDetails} x1</span>
                      ) : details?.appointmentNo ? (
                        <span className="rc-md-down">
                          {details.specialistType} – {details.appointmentTime}
                          <FormattedMessage id="min" /> –
                          {details.appointmentType}
                        </span>
                      ) : (
                        <FormattedMessage
                          id="quantityText"
                          values={{
                            specText: item?.specDetails || '',
                            buyCount: item.num
                          }}
                        />
                      )}
                    </span>
                  </span>
                  {item.subscriptionSourceList?.length ? (
                    <span>
                      <span className="iconfont mr-2 text-rc-red">
                        &#xe675;
                      </span>
                      <FormattedMessage id="subscription.numberFirstWordUpperCase" />
                      {item.subscriptionSourceList.map((el) => (
                        <p className="ui-text-overflow-line1">
                          <Link
                            to={`/account/subscription/order/detail/${el.subscribeId}`}
                            className="rc-styled-link medium mb-0"
                          >
                            {filterOrderId({
                              orderNo: el.subscribeId,
                              orderNoForOMS: details?.tradeOms?.orderNo
                            })}
                          </Link>
                        </p>
                      ))}
                    </span>
                  ) : null}
                  <span className="rc-md-down">
                    {details.subscriptionResponseVO &&
                    item.subscriptionStatus ? (
                      judgeIsIndividual(item) ? (
                        ''
                      ) : (
                        <>
                          <span className="red font-weight-normal">
                            {formatMoney(item.subscriptionPrice)}
                          </span>

                          <span className="text-line-through ml-2">
                            {formatMoney(item.originalPrice)}
                          </span>
                        </>
                      )
                    ) : (
                      formatMoney(item.originalPrice)
                    )}
                  </span>
                </span>
              </div>
              <div className="col-6 col-md-2 text-right md:text-left rc-md-up">
                {!details?.appointmentNo ? (
                  <FormattedMessage
                    id="xProduct"
                    values={{
                      val: judgeIsIndividual(item) ? 1 : item.num
                    }}
                  />
                ) : null}
              </div>
              <div
                className={`col-6 ${
                  details?.appointmentNo ? 'col-md-2' : 'col-md-3'
                } text-right md:text-left rc-md-up`}
              >
                {details.subscriptionResponseVO && item.subscriptionStatus ? (
                  judgeIsIndividual(item) ? (
                    ''
                  ) : window.__.env.REACT_APP_COUNTRY === 'jp' &&
                    item.subscriptionPrice === item.originalPrice ? (
                    <span className="ml-2">
                      {/* 日本的订阅折扣价和原价一样特别显示 */}
                      {formatMoney(item.originalPrice)}
                    </span>
                  ) : (
                    <>
                      <span className="red font-weight-normal">
                        {formatMoney(item.subscriptionPrice)}
                      </span>
                      <span className="text-line-through ml-2">
                        {formatMoney(item.originalPrice)}
                      </span>
                    </>
                  )
                ) : (
                  formatMoney(item.originalPrice)
                )}
              </div>
              <div
                className={`col-12 ${
                  details?.appointmentNo ? 'col-md-3' : 'col-md-2'
                } text-right md:text-left text-nowrap rc-md-up font-weight-normal d-flex justify-content-center flex-column`}
              >
                {details.subscriptionResponseVO && item.subscriptionStatus
                  ? formatMoney(
                      judgeIsIndividual(item)
                        ? details.tradePrice.goodsPrice
                        : item.subscriptionPrice * item.num
                    )
                  : details?.appointmentNo
                  ? renderOperationBtns(details)
                  : formatMoney(item.originalPrice * item.num)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderAllProduct;
