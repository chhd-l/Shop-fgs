import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { filterOrderId } from '@/utils/utils';
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

const OrderHeaderInfo = ({ details, orderNumberForOMS }) => {
  return (
    <div className="col-12 border table-header rounded mt-3 md:mt-0">
      <div className="row pt-3 pb-2 px-1 md:px-4 md:pt-4 md:pb-3">
        {/* 订单号 */}
        <div className="col-12 col-md-3 text-left mb-2">
          <FormattedMessage id="order.orderNumber" />
          <br />
          <span className="medium">
            {filterOrderId({
              orderNo: details.id,
              orderNoForOMS: orderNumberForOMS
            })}
          </span>
        </div>
        {/* 订单状态 */}
        <div className="col-12 col-md-3 text-left mb-2">
          <FormattedMessage id="order.orderStatus" />
          <br />
          <span className="medium">{details.tradeState.orderStatus}</span>
        </div>
        {/* goodwill order flag */}
        {details.goodWillFlag === 1 && (
          <div className="col-12 col-md-3 text-left mb-2">
            <FormattedMessage id="order.goodwillOrder" />
          </div>
        )}
        {/* clinic信息 */}
        {window.__.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true' && (
          <div className="col-12 col-md-3 text-left mb-2">
            <FormattedMessage id="payment.clinicTitle3" />
            <br />
            <span
              className="medium ui-text-overflow-line2"
              title={details.clinicsName}
            >
              {details.clinicsName}
            </span>
          </div>
        )}
        {/* {this.returnOrExchangeBtnJSX()} */}
        {/* {this.cancelOrderBtnJSX()} */}
        {details?.appointmentNo ? (
          <div className="col-12 col-md-0 text-left mb-2 rc-md-down">
            {renderOperationBtns(details)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderHeaderInfo;
