import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import {
  ADYEN_CREDIT_CARD_IMGURL_ENUM,
  CREDIT_CARD_IMG_ENUM
} from '@/utils/constant';
import { loadJS } from '@/utils/utils';
import { getAdyenParam } from './utils';
import EditForm from './form';

@inject('loginStore')
@observer
class AdyenCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adyenPayParam: {}
    };
  }
  componentDidMount() {
    loadJS(
      'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      function () {
        if (!!window.AdyenCheckout) {
          //要有值
          const AdyenCheckout = window.AdyenCheckout;
          // (1) Create an instance of AdyenCheckout
          const checkout = new AdyenCheckout({
            environment: 'test',
            // originKey: process.env.REACT_APP_AdyenOriginKEY,
            originKey:
              'pub.v2.8015632026961356.aHR0cDovL2xvY2FsaG9zdDozMDAw.zvqpQJn9QpSEFqojja-ij4Wkuk7HojZp5rlJOhJ2fY4', // todo
            locale: process.env.REACT_APP_Adyen_locale
          });

          // (2). Create and mount the Component
          const card = checkout
            .create('card', {
              hasHolderName: true,
              holderNameRequired: true,
              enableStoreDetails: false,
              styles: {},
              placeholders: {},
              showPayButton: true,
              brands: ['mc', 'visa', 'amex', 'cartebancaire'],
              onSubmit: (state, component) => {
                if (state.isValid) {
                  //勾选条款验证
                  try {
                    if (!this.isOnepageCheckout) {
                      // this.isTestPolicy();
                      // this.isShipTrackingFun();
                      //this.isNewsLetterFun();
                    } else {
                      this.props.paymentStore.updatePanelStatus(
                        'paymentMethod',
                        {
                          isPrepare: false,
                          isEdit: false,
                          isCompleted: true
                        }
                      );
                    }
                    let adyenPayParam = getAdyenParam(card.data);
                    this.setState(
                      {
                        adyenPayParam
                      },
                      () => {
                        if (!this.isOnepageCheckout) {
                          // this.gotoAdyenCreditCardPay();
                        }
                      }
                    );
                  } catch (err) {
                    // this.showErrorMsg(err.message);
                  }
                }
              },
              onChange: (state, component) => {}
            })
            .mount('#adyen-card-container');
        }
      }
    );
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.panelStatus.paymentMethod;
  }
  get isOnepageCheckout() {
    return process.env.REACT_APP_ONEPAGE_CHECKOUT === 'true';
  }
  render() {
    return this.isLogin ? <EditForm /> : <EditForm />;
  }
}

export default AdyenCreditCard;
