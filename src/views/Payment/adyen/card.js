import {
    makePayment,
    getOriginKey
  } from "./utils"

export const initAdyenPay = function(){
    // getOriginKey().then(originKey => {
    //         const AdyenCheckout = window.AdyenCheckout
    //         // 1. Create an instance of AdyenCheckout
    //         const checkout = new AdyenCheckout({
    //             environment: 'test',
    //             originKey: originKey // Mandatory. originKey from Customer Area
    //         });
    //         // 2. Create and mount the Component
    //         const card = checkout
    //             .create('card', {
    //                 // Optional Configuration
    //                 // hasHolderName: true,
        
    //                 // Optional. Customize the look and feel of the payment form
    //                 // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
    //                 styles: {},
        
    //                 // Optional. Define custom placeholders for the Card fields
    //                 // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
    //                 placeholders: {
    //                     // encryptedCardNumber: '9999 9999 9999 9999',
    //                     // encryptedExpiryDate: '01/22',
    //                     // encryptedSecurityCode : '123'
    //                 },
        
    //                 // Optionally show a Pay Button
    //                 showPayButton: true,
        
    //                 // Events
    //                 onSubmit: (state, component) => {
    //                     if (state.isValid) {
    //                         makePayment(card.data);
    //                     }
    //                 },
        
    //                 onChange: (state, component) => {
    //                     // state.data;
    //                     // state.isValid;
    //                 }
    //             })
    //             .mount('#card-container');
    //     });
    const AdyenCheckout = window.AdyenCheckout
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: 'test',
            originKey: "pub.v2.8015632026961356.aHR0cDovL2xvY2FsaG9zdDozMDAw.zvqpQJn9QpSEFqojja-ij4Wkuk7HojZp5rlJOhJ2fY4" // Mandatory. originKey from Customer Area
        });
        // 2. Create and mount the Component
        const card = checkout
            .create('card', {
                // Optional Configuration
                // hasHolderName: true,
    
                // Optional. Customize the look and feel of the payment form
                // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
                styles: {},
    
                // Optional. Define custom placeholders for the Card fields
                // https://docs.adyen.com/developers/checkout/api-integration/configure-secured-fields/styling-secured-fields
                placeholders: {
                    // encryptedCardNumber: '9999 9999 9999 9999',
                    // encryptedExpiryDate: '01/22',
                    // encryptedSecurityCode : '123'
                },
    
                // Optionally show a Pay Button
                showPayButton: true,
    
                // Events
                onSubmit: (state, component) => {
                    if (state.isValid) {
                        makePayment(card.data);
                    }
                },
    
                onChange: (state, component) => {
                    // state.data;
                    // state.isValid;
                }
            })
            .mount('#card-container');
}

