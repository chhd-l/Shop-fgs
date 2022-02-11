import React, { useState, useEffect } from 'react';
import IMask from 'imask';

const Swish = ({ billingJSX, updateSwishPhone }) => {
  // const handleChange = (e) => {
  //   let val = e.target.value;
  //   setMobile(val);
  //   updateSwishPhone(val);
  // };
  // const [phone, setMobile] = useState('');

  // useEffect(() => {
  //   let element = document.getElementById('phoneNumber');
  //   let phoneReg = [{ mask: '(+46) 00 00 00 00 00' }];
  //   let maskOptions = {
  //     mask: phoneReg
  //   };
  //   IMask(element, maskOptions);
  // }, []);

  return (
    <>
      {/* <div id="swish-container">
        <div className="text-lg text-gray-500 font-medium mb-4 mt-6">
          Your phone number
        </div>
        <input
          type="text"
          autocomplete="off"
          id="phoneNumber"
          className="w-2/3 border-b-2 pt-2 pb-4 mb-4 border-gray-500"
          placeholder="+46"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <br />
        <FormattedMessage id="swish.bref" />
      </div> */}
      {billingJSX}
    </>
  );
};

export default Swish;
