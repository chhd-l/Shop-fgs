import React from 'react';
import { loadJS } from '@/utils/utils';
import translations from './translations';

class Adyen3DForm extends React.Component {
  static defaultProps = {
 
  };
  constructor(props) {
    super(props);
    this.state = {
        action:{}
    };
  }
  static getDerivedStateFromProps(props, state) {
    const {action} = props
    if (action !== state.action) {
      return {
        action,
      };
    }
  }
  initForm(action) {
    loadJS({
      url:
        'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          const AdyenCheckout = window.AdyenCheckout;
          // (1) Create an instance of AdyenCheckout
          const checkout = new AdyenCheckout({
            environment: 'test',
            originKey: process.env.REACT_APP_AdyenOriginKEY,
            locale: process.env.REACT_APP_Adyen_locale,
            translations
          });
        
          // (2). Create and mount the Component
          checkout.createFromAction(action).mount('#adyen-3d-form');
        }
      }
    });
  }
  render() {
    if(Object.keys(this.state.action).length>0){
        this.initForm(this.state.action);
    }
    return (
        <div  id="adyen-3d-form"></div>
    );
  }
}

export default Adyen3DForm;
