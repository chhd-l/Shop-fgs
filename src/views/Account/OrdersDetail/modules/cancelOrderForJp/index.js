import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import {
  CancelOrderModal,
  CancelOrderSuccessModal
} from '@/views/Account/OrdersDetail/modules';
import { cancelOrderForJapan } from '@/api/order';

const CancelOrderForJp = ({ details, welcomeGiftLists, props }) => {
  const [cancelJpOrderModalVisible, setCancelJpOrderModalVisible] =
    useState(false);
  const [
    cancelJpOrderSuccessModalVisible,
    setCancelJpOrderSuccessModalVisible
  ] = useState(false);
  const [cancelJpOrderLoading, setCancelJpOrderLoading] = useState(false);

  const handleCancelJpOrder = async () => {
    try {
      setCancelJpOrderLoading(true);
      await cancelOrderForJapan({ tid: details.id });
      setCancelJpOrderModalVisible(false);
      setCancelJpOrderLoading(false);
      setCancelJpOrderSuccessModalVisible(true);
    } catch (e) {
      setCancelJpOrderLoading(false);
    }
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
        close={() => {
          setCancelJpOrderSuccessModalVisible(false);
        }}
        handleClickConfirm={() => {
          setCancelJpOrderSuccessModalVisible(false);
        }}
      />
      {/*jp order cancellation confirmation*/}
      <CancelOrderModal
        visible={cancelJpOrderModalVisible}
        cancelJpOrderLoading={cancelJpOrderLoading}
        details={details}
        welcomeGiftLists={welcomeGiftLists}
        close={() => {
          setCancelJpOrderModalVisible(false);
        }}
        handleClickCancel={() => {
          setCancelJpOrderModalVisible(false);
          props.history.push('/account/orders');
        }}
        handleClickConfirm={() => handleCancelJpOrder()}
      />
    </>
  );
};

export default CancelOrderForJp;
