import React from 'react';
import {
  getDeviceType,
  formatDate,
  optimizeImage,
  judgeIsIndividual
} from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { IMG_DEFAULT } from '@/utils/constant';
import cn from 'classnames';

const OngoingOrder = ({ subDetail }) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const onGoingTradeLists = subDetail.onGoingTradeList
    ? Array.from(subDetail.onGoingTradeList, (ele) => {
        ele.tradeItems.forEach((el) => {
          el.spuName = judgeIsIndividual(el) ? (
            <FormattedMessage
              id="subscription.personalized"
              values={{ val1: el.petsName }}
            />
          ) : (
            el.spuName
          );
          el.quantityText = judgeIsIndividual(el) ? (
            el.specDetails
          ) : (
            <FormattedMessage
              id="order.quantityText"
              values={{
                specText: el.specDetails,
                buyCount: el.num
              }}
            />
          );
        });
        return ele;
      })
    : [];
  console.log('ongoingorder', onGoingTradeLists);
  return (
    <>
      {onGoingTradeLists.length > 0
        ? onGoingTradeLists.map((ele, i) => (
            <div
              className={cn(
                'card-container m-0 py-4 px-0 min-h-auto border-orange rc-margin-x--none align-items-center justify-content-start border rounded',
                isMobile ? 'flex-column' : 'row'
              )}
              key={i}
            >
              <div className="col-12 col-md-4 d-flex flex-column justify-content-start">
                {ele.tradeItems.map((item, idx) => (
                  <div className="d-flex flex-row align-items-center">
                    <div className="col-4">
                      <img
                        className="ord-list-img-fluid"
                        src={
                          optimizeImage({ originImageUrl: item.pic }) ||
                          IMG_DEFAULT
                        }
                        alt={item.spuName}
                        title={item.spuName}
                      />
                    </div>
                    <div className="flex flex-column col-8">
                      <span className="medium text-16 color-444">
                        {item.spuName}
                      </span>
                      <span
                        className="medium mt-2 ui-text-overflow-line1"
                        title={
                          judgeIsIndividual(item)
                            ? item.quantityText
                            : item.specDetails + 'x' + item.num
                        }
                      >
                        {item.quantityText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="col-12 col-md-2 flex flex-column"
                style={{ paddingLeft: isMobile ? '34%' : '' }}
              >
                <span className="medium text-16 color-444 ui-text-overflow-line1">
                  <FormattedMessage id="order.orderDate" />
                </span>
                <span className="medium mt-2 ui-text-overflow-line1">
                  {formatDate({ date: ele.tradeState.createTime })}
                </span>
              </div>
              <div
                className="col-12 col-md-3 flex flex-column"
                style={{
                  paddingLeft: isMobile ? '34%' : '',
                  marginTop: isMobile ? '14px' : ''
                }}
              >
                <span className="medium text-16 color-444 ui-text-overflow-line1">
                  <FormattedMessage id="order.orderStatus" />
                </span>
                <span
                  className="medium mt-2 ui-text-overflow-line1"
                  style={{ color: 'rgb(71, 183, 0)' }}
                  title={ele.tradeState.orderStatus}
                >
                  {ele.tradeState.orderStatus}
                </span>
              </div>
              <div
                className=" col-12 col-md-3"
                style={{ paddingLeft: isMobile ? '33%' : '' }}
              >
                <FormattedMessage id="orderDetail">
                  {(txt) => (
                    <Link
                      className="d-flex rc-padding-left--none rc-btn rc-btn--icon-label rc-padding-right--none subDetailDetailBtn btn--inverse text-wrap align-items-center"
                      to={`/account/orders/detail/${ele.id}`}
                    >
                      <em className="rc-iconography rc-icon rc-news--xs" />
                      <span
                        className="medium text-16 pull-right--desktop rc-styled-link"
                        style={{ borderBottom: '1px solid #d7d7d7' }}
                        title={txt}
                      >
                        {txt}
                      </span>
                    </Link>
                  )}
                </FormattedMessage>
              </div>
            </div>
          ))
        : null}
    </>
  );
};
export default OngoingOrder;
