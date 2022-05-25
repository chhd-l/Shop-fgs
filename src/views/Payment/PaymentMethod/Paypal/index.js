import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { handleEmailShow } from '@/utils/utils';

const Paypal = ({
  billingJSX,
  isLogin,
  updatePaypalDetailsToAccount,
  updatePaypalMethodDefault,
  isCurrentBuyWaySubscription,
  paypalAccount
}) => {
  const [paypalDetailsChecked, setPaypalDetailsChecked] = useState(true);
  const [paypalMethodDefaultChecked, setPaypalMethodDefaultChecked] =
    useState(true);

  const paypalDetailsChange = () => {
    setPaypalDetailsChecked(!paypalDetailsChecked);
    updatePaypalDetailsToAccount &&
      updatePaypalDetailsToAccount(paypalDetailsChecked);
  };
  const paypalMethodDefaultChange = () => {
    setPaypalMethodDefaultChecked(!paypalMethodDefaultChecked);
    updatePaypalMethodDefault &&
      updatePaypalMethodDefault(paypalMethodDefaultChecked);
  };

  return (
    <>
      {isLogin && paypalAccount && isCurrentBuyWaySubscription ? (
        <>
          <div className="mb-4">
            <FormattedMessage id="Authorized with" />{' '}
            {handleEmailShow(paypalAccount)}
          </div>
        </>
      ) : (
        <>
          <div id="paypal-container">
            <FormattedMessage id="paypal.bref" />
          </div>
          {false && isLogin ? (
            <>
              <div className="rc-input rc-input--inline mw-100">
                <input
                  className="rc-input__checkbox"
                  id={`id-checkbox-paypal_details-label`}
                  name={`id-checkbox-paypal_details-label`}
                  type="checkbox"
                  onChange={paypalDetailsChange}
                  checked={paypalDetailsChecked}
                />
                <label
                  className="rc-input__label--inline"
                  htmlFor={`id-checkbox-paypal_details-label`}
                >
                  <FormattedMessage id="paypalDetailsLabel" />
                </label>
              </div>
              <div className="rc-input rc-input--inline mw-100">
                <input
                  className="rc-input__checkbox"
                  id={`id-checkbox-paypal_method_default-label`}
                  name={`id-checkbox-paypal_method_default-label`}
                  type="checkbox"
                  onChange={paypalMethodDefaultChange}
                  checked={paypalMethodDefaultChecked}
                />
                <label
                  className="rc-input__label--inline"
                  htmlFor={`id-checkbox-paypal_method_default-label`}
                >
                  <FormattedMessage id="paypalMethodDefaultLabel" />
                </label>
              </div>
            </>
          ) : null}
        </>
      )}
      {billingJSX}
    </>
  );
};

export default Paypal;
