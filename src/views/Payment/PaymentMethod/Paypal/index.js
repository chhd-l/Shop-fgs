import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

const Paypal = ({ billingJSX }) => {
  return (
    <>
      <div id="paypal-container">
        <FormattedMessage id="paypal.bref" />
      </div>
      {billingJSX}
    </>
  );
};

export default Paypal;
