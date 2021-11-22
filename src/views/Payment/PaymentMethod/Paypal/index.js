import React, { useEffect } from 'react';
import { loadJS } from '@/utils/utils';

const Paypal = ({ billingJSX }) => {
  useEffect(() => {
    const paypalConfiguration = {
      environment: 'test',
      countryCode: 'NL',
      style: {
        // Optional configuration for PayPal Smart Payment Buttons.
        layout: 'vertical',
        color: 'silver',
        shape: 'pill',
        label: 'paypal'
      },
      amount: {
        currency: 'EUR',
        value: 1000
      },
      // merchantId: '6QA2KXJ22RHGA',
      // intent: 'capture',
      onShippingChange: function (data, actions) {},
      onInit: function (data, actions) {},
      onClick: function () {
        debugger;
        // onClick is called when the button is clicked.
      },
      onSubmit: function (data, actions) {},
      blockPayPalCreditButton: true
    };
    loadJS({
      url:
        'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.7.0/adyen.js',
      // url:
      //   './adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          const AdyenCheckout = window.AdyenCheckout;
          const checkout = new AdyenCheckout({
            environment: window.__.env.REACT_APP_Adyen_ENV,
            originKey: window.__.env.REACT_APP_AdyenOriginKEY,
            //originKey: 'pub.v2.8216371315420132.aHR0cDovL2xvY2FsaG9zdDozMDAw._3aFyWK4TyKTSDr7VunTXRCwDnQmdtVFF57Kfrl2YgI',
            locale: window.__.env.REACT_APP_Adyen_locale
          });
          checkout
            .create('paypal', paypalConfiguration)
            .mount('#paypal-container');
        }
      }
    });
    // loadJS({
    //   url:
    //     'https://www.paypal.com/sdk/js?client-id=test&currency=USD',
    //   callback: function () {
    //     // Render the PayPal button into #paypal-button-container
    //     paypal.Buttons({

    //       // Set up the transaction
    //       createOrder: function (data, actions) {
    //         return actions.order.create({
    //           purchase_units: [{
    //             amount: {
    //               value: '88.44'
    //             }
    //           }]
    //         });
    //       },

    //       // Finalize the transaction
    //       onApprove: function (data, actions) {
    //         return actions.order.capture().then(function (orderData) {
    //           // Successful capture! For demo purposes:
    //           console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
    //           var transaction = orderData.purchase_units[0].payments.captures[0];
    //           alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

    //           // Replace the above to show a success message within this page, e.g.
    //           // const element = document.getElementById('paypal-button-container');
    //           // element.innerHTML = '';
    //           // element.innerHTML = '<h3>Thank you for your payment!</h3>';
    //           // Or go to another URL:  actions.redirect('thank_you.html');
    //         });
    //       }
    //     }).render('#paypal-container');
    //   }
    // });
  }, []);
  return (
    <>
      <div id="paypal-container"></div>
      {/* <div id="paypal-button-container"></div> */}
      {billingJSX}
    </>
  );
};

export default Paypal;
