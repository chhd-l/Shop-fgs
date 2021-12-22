import React, { useState, useEffect } from 'react';
import { loadJS, dynamicLoadCss } from '@/utils/utils';

const Swish2 = ({ billingJSX }) => {
  useEffect(() => {
    dynamicLoadCss(
      'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.css'
    );
    loadJS({
      url: 'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          console.log('render adyen form start');
          //要有值
          const AdyenCheckout = window.AdyenCheckout;
          // (1) Create an instance of AdyenCheckout
          const checkout = new AdyenCheckout({
            environment: 'test',
            originKey:
              'pub.v2.8015632026961356.aHR0cDovL2xvY2FsaG9zdDozMDAw.zvqpQJn9QpSEFqojja-ij4Wkuk7HojZp5rlJOhJ2fY4'
          });
          checkout.create('swish').mount('#swish-container');
        }
      }
    });
  }, []);

  return (
    <>
      <div id="swish-container"></div>
      {billingJSX}
    </>
  );
};
export default Swish2;
