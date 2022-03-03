import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { filterOrderId } from '@/utils/utils';
import { Link } from 'react-router-dom';
import { cancelOrder, returnFindByTid } from '@/api/order';
import Modal from '@/components/Modal';

const sessionItemRoyal = window.__.sessionItemRoyal;

const cancelOrderBtnJSX = ({ details, props }) => {
  const [cancelOrderModalVisible, setCancelOrderModalVisible] = useState(false);
  const [cancelOrderLoading, setCancelOrderLoading] = useState(false);
  const [operateSuccessModalVisible, setOperateSuccessModalVisible] = false;
  const [errModalText, setErrModalText] = useState('');
  const [errModalVisible, setErrModalVisible] = false;

  const handleCancelOrder = () => {
    setCancelOrderLoading(true);
    cancelOrder(details.id)
      .then((res) => {
        setCancelOrderLoading(false);
        setCancelOrderModalVisible(false);
        setOperateSuccessModalVisible(true);
        this.init();
      })
      .catch((err) => {
        setCancelOrderLoading(false);
        setCancelOrderModalVisible(false);
        setErrModalText(err.message.toString());
        setErrModalVisible(true);
      });
  };

  let ret = <span />;
  if (details.canCancelOrder) {
    ret = (
      <>
        <a
          className="color-999 ui-cursor-pointer"
          title="More"
          data-tooltip-placement="bottom"
          data-tooltip="bottom-tooltip"
        >
          •••
        </a>
        <div id="bottom-tooltip" className="rc-tooltip text-left px-1">
          <div
            className="p-1 ui-cursor-pointer"
            onClick={() => {
              setCancelOrderModalVisible(true);
            }}
          >
            <FormattedMessage id="order.cancelOrder" />
          </div>
        </div>
        <Modal
          key="1"
          visible={cancelOrderModalVisible}
          confirmLoading={cancelOrderLoading}
          modalText={<FormattedMessage id="order.confirmCancelOrderInfo" />}
          close={() => {
            setCancelOrderModalVisible(false);
          }}
          hanldeClickConfirm={() => handleCancelOrder()}
        />
        <Modal
          key="2"
          visible={operateSuccessModalVisible}
          modalText={<FormattedMessage id="operateSuccessfully" />}
          close={() => {
            setOperateSuccessModalVisible(false);
          }}
          hanldeClickConfirm={() => {
            props.history.push('/account/orders');
          }}
        />
        <Modal
          key="3"
          visible={errModalVisible}
          modalText={errModalText}
          close={() => {
            setErrModalVisible(false);
          }}
          hanldeClickConfirm={() => {
            setErrModalVisible(false);
          }}
        />
      </>
    );
  }
  return ret;
};

const returnOrExchangeBtnJSX = ({ details, props }) => {
  const [returnOrExchangeLoading, setReturnOrExchangeLoading] = useState(false);
  const [returnOrExchangeModalVisible, setReturnOrExchangeModalVisible] =
    useState(false);

  const handleItemClick = async (afterSaleType) => {
    // 退单都完成了，才可继续退单
    setReturnOrExchangeLoading(true);
    let res = await returnFindByTid(details.id);
    let unloadItem = find(
      res.context,
      (ele) =>
        ele.returnFlowState === 'INIT' ||
        ele.returnFlowState === 'AUDIT' ||
        ele.returnFlowState === 'DELIVERED' ||
        ele.returnFlowState === 'RECEIVED'
    );
    if (unloadItem) {
      setReturnOrExchangeLoading(false);
      setReturnOrExchangeModalVisible(false);
    } else {
      sessionItemRoyal.set('rc-after-sale-type', afterSaleType);
      props.history.push(`/account/orders-aftersale/${details.id}`);
    }
  };

  let ret = <span />;
  if (details.canReturnOrExchange) {
    return (
      <>
        <a
          className="color-999 ui-cursor-pointer"
          title="More"
          data-tooltip-placement="bottom"
          data-tooltip="bottom-tooltip"
        >
          •••
        </a>
        <div id="bottom-tooltip" className="rc-tooltip text-left px-1">
          <div
            className={`border-bottom p-1 ui-cursor-pointer ${
              returnOrExchangeLoading
                ? 'ui-btn-loading ui-btn-loading-border-red'
                : ''
            }`}
            onClick={() => handleItemClick('exchange')}
          >
            <FormattedMessage id="order.return" />
          </div>
          <div
            className={`p-1 ui-cursor-pointer ${
              returnOrExchangeLoading
                ? 'ui-btn-loading ui-btn-loading-border-red'
                : ''
            }`}
            onClick={() => handleItemClick('return')}
          >
            <FormattedMessage id="order.exchange" />
          </div>
        </div>
        <Modal
          key="4"
          visible={returnOrExchangeModalVisible}
          modalText={<FormattedMessage id="order.refundErrorInfo" />}
          close={() => {
            setReturnOrExchangeModalVisible(false);
          }}
          hanldeClickConfirm={() => {
            setReturnOrExchangeModalVisible(false);
          }}
        />
      </>
    );
  }
  return ret;
};

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

const OrderHeaderInfo = ({ details, props }) => {
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
              orderNoForOMS: details.tradeOms?.orderNo
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
        {/* {returnOrExchangeBtnJSX({details,props})} */}
        {/* {this.cancelOrderBtnJSX({details,props})} */}
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
