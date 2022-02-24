import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { filterOrderId } from '@/utils/utils';

const OrderHeaderInfo = ({
  details,
  orderNumberForOMS,
  renderOperationBtns
}) => {
  return (
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
      {details?.appointNo ? (
        <div className="col-12 col-md-0 text-left mb-2 rc-md-down">
          {renderOperationBtns}
        </div>
      ) : null}
    </div>
  );
};

export default OrderHeaderInfo;
