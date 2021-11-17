import React from 'react';
import { getDeviceType } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { IMG_DEFAULT } from '@/utils/constant';
import './index.less';

const OngoingOrder = ({ subDetail }) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const onGoingTradeLists = subDetail.onGoingTradeList
    ? subDetail.onGoingTradeList
    : [];
  console.log('ongoingorder', onGoingTradeLists);
  return (
    <>
      {onGoingTradeLists.length > 0
        ? onGoingTradeLists.map((ele) => (
            <div
              className={`card-container rc-margin-x--none align-items-center justify-content-start ${
                isMobile ? 'flex-column' : 'row'
              }`}
              style={{
                padding: '1rem 0',
                minHeight: 'auto',
                margin: 0,
                borderColor: 'orange'
              }}
            >
              <div className="col-12 col-md-4 d-flex flex-column justify-content-start align-items-center">
                {ele.tradeItems.map((item, idx) => (
                  <div className="d-flex flex-row align-items-center">
                    <div className="col-4">
                      <img
                        className="ord-list-img-fluid"
                        src={item.pic || IMG_DEFAULT}
                        alt={item.skuName}
                        title={item.skuName}
                      />
                    </div>
                    <div className="flex flex-column">
                      <span className="medium text-bold color-444">
                        {item.skuName}
                      </span>
                      <span className="medium mt-2 ui-text-overflow-line1">
                        <FormattedMessage
                          id="order.quantityText"
                          values={{
                            specText: item.specDetails,
                            buyCount: item.num
                          }}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="col-12 col-md-2 flex flex-column"
                style={{ paddingLeft: isMobile ? '34%' : '' }}
              >
                <span className="medium text-bold color-444 ui-text-overflow-line1">
                  <FormattedMessage id="order.orderDate" />
                </span>
                <span className="medium mt-2 ui-text-overflow-line1">
                  {getFormatDate(ele.tradeState.createTime.substr(0, 10))}
                </span>
              </div>
              <div
                className="col-12 col-md-3 flex flex-column"
                style={{
                  paddingLeft: isMobile ? '34%' : '',
                  marginTop: isMobile ? '14px' : ''
                }}
              >
                <span className="medium text-bold color-444 ui-text-overflow-line1">
                  <FormattedMessage id="order.orderStatus" />
                </span>
                <span className="medium text-green mt-2 ui-text-overflow-line1">
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
                      className="d-flex rc-padding-left--none rc-btn rc-btn--icon-label rc-padding-right--none subDetailDetailBtn btn--inverse rc-btn--inverse text-wrap align-items-center"
                      to={`/account/orders/detail/${ele.id}`}
                    >
                      <em className="rc-iconography rc-icon rc-news--xs" />
                      <span
                        className="medium text-underline text-bold pull-right--desktop rc-styled-link"
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
