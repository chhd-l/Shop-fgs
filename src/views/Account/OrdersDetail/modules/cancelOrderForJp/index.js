import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import {
  CancelOrderModal,
  CancelOrderSuccessModal
} from '@/views/Account/OrdersDetail/modules';
import { cancelOrderForJapan } from '@/api/order';
import Modal from '@/components/Modal';

const CancelOrderForJp = ({ details, props, cancelSuccessCallback }) => {
  const [cancelJpOrderModalVisible, setCancelJpOrderModalVisible] =
    useState(false);
  const [
    cancelJpOrderSuccessModalVisible,
    setCancelJpOrderSuccessModalVisible
  ] = useState(false);
  const [cancelJpOrderLoading, setCancelJpOrderLoading] = useState(false);
  const [errModalVisible, setErrModalVisible] = useState(false);
  const [errModalText, setErrModalText] = useState('');

  //取消订单
  const handleCancelJpOrder = async () => {
    try {
      setCancelJpOrderLoading(true);
      await cancelOrderForJapan({ tid: details.id });
      setCancelJpOrderModalVisible(false);
      setCancelJpOrderLoading(false);
      setCancelJpOrderSuccessModalVisible(true);
    } catch (e) {
      setCancelJpOrderLoading(false);
      setCancelJpOrderModalVisible(false);
      setErrModalVisible(true);
      setErrModalText(e.message);
    }
  };

  //关闭cancel order success modal 重新请求数据刷新页面
  const closeSuccessModal = () => {
    setCancelJpOrderSuccessModalVisible(false);
    cancelSuccessCallback && cancelSuccessCallback();
  };

  return (
    <>
      {details.canCancelOrderForJP ? (
        <div className="w-full flex justify-center md:justify-end mt-4">
          <div className="flex items-center flex-col md:flex-row">
            <span
              className="rc-styled-link border-b border-gray-300 hover:border-rc-red mt-2"
              onClick={() => {
                setCancelJpOrderModalVisible(true);
              }}
            >
              <FormattedMessage id="order.cancelOrder" />
            </span>
            <span className="mx-2 mt-2">
              <FormattedMessage id="or" />
            </span>
            <button className="rc-btn rc-btn--one mt-2">
              <Link className="text-white" to={`/account/orders`}>
                <FormattedMessage id="Back to orders" />
              </Link>
            </button>
          </div>
        </div>
      ) : null}
      {/*jp order cancel success tip modal*/}
      <CancelOrderSuccessModal
        visible={cancelJpOrderSuccessModalVisible}
        close={() => closeSuccessModal()}
        handleClickConfirm={() => closeSuccessModal()}
      />
      {/*jp order cancellation confirmation*/}
      <CancelOrderModal
        visible={cancelJpOrderModalVisible}
        cancelJpOrderLoading={cancelJpOrderLoading}
        details={details}
        close={() => {
          setCancelJpOrderModalVisible(false);
        }}
        handleClickCancel={() => {
          setCancelJpOrderModalVisible(false);
          props.history.push('/account/orders');
        }}
        handleClickConfirm={() => handleCancelJpOrder()}
      />
      <Modal
        key="5"
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
};

export default CancelOrderForJp;
