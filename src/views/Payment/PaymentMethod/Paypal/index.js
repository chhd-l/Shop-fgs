import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getPaymentMethod } from '@/api/payment';

const Paypal = ({
  billingJSX,
  isLogin,
  updatePaypalDetailsToAccount,
  updatePaypalMethodDefault
}) => {
  const [paypalSaved, setPaypalSaved] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('john ***@gamail.com');
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
  useEffect(() => {
    getPaymentMethod({}, true).then((res) => {
      const paypalCardIndex = res.context.findIndex(
        (item) => item.paymentItem === 'adyen_paypal'
      );
      if (paypalCardIndex > -1) {
        setPaypalSaved(true);
        setPaypalEmail(res.context[paypalCardIndex].email);
      } else {
        updatePaypalDetailsToAccount && updatePaypalDetailsToAccount(true);
        updatePaypalMethodDefault && updatePaypalMethodDefault(true);
      }
    });
  }, []);

  return (
    <>
      {paypalSaved ? (
        <>
          <div className="mb-4">
            <FormattedMessage id="Authorized with" /> {paypalEmail}
          </div>
        </>
      ) : (
        <>
          <div id="paypal-container">
            <FormattedMessage id="paypal.bref" />
          </div>
          {isLogin ? (
            <>
              <div className="rc-input rc-input--inline mw-100">
                <input
                  className="rc-input__checkbox"
                  id={`id-checkbox-paypal_details-label`}
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
