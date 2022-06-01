import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { handleEmailShow } from '@/utils/utils';
import { getBanks } from '@/api/payment';

const Ideal = ({ billingJSX, updateBank }) => {
  const [bank, setBank] = useState('');
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    getBankList();
  }, []);

  const getBankList = () => {
    getBanks({
      allowedPaymentMethods: ['ideal'],
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      storeId: 123457929
    })
      .then((res) => {
        console.log('res', res);
        // setBankList()
      })
      .catch((err) => {});
  };

  const handleChange = (e) => {
    let val = e.target.value;
    setMobile(val);
    updateBank(val);
  };

  return (
    <>
      <div id="ideal-container">
        <div className="text-lg text-gray-500 font-medium mb-4 mt-6">
          Choose Your preferred bank
        </div>
        <select
          className="w-2/3 border-b-2 pt-2 pb-4 mb-4 border-gray-500"
          name="bank"
          value={bank}
          onChange={handleChange}
        >
          {bankList.length > 0 &&
            bankList.map((item) => (
              <>{/* <option key={} value={}>{}</option> */}</>
            ))}
        </select>
        <br />
        {/* <FormattedMessage id="swish.bref" /> */}
      </div>
      {billingJSX}
    </>
  );
};

export default Ideal;
