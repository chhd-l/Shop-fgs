import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ADYEN_CREDIT_CARD_IMGURL_ENUM, CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import { loadJS } from '@/utils/utils';
import { getAdyenParam } from './utils';


class AdyenCreditCardForm extends React.Component {
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
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.panelStatus.paymentMethod;
  }
  get isOnepageCheckout() {
    return process.env.REACT_APP_ONEPAGE_CHECKOUT === 'true';
  }
  render() {
    const { adyenPayParam } = this.state;
    return (
      <div class="payment-method checkout--padding">
        {/* 支持卡的类型 Visa和master */}
        <p className="mb-2">
          <span className="logo-payment-card-list logo-credit-card ml-0">
            {ADYEN_CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
              <img
                key={idx}
                style={{ width: '50px' }}
                className="logo-payment-card mr-1"
                src={el}
              />
            ))}
          </span>
        </p>
        <div
          id="adyen-card-container"
          className={`payment-method__container ${
            !this.isOnepageCheckout || this.paymentMethodPanelStatus.isEdit
              ? ''
              : 'hidden'
          }`}
        />
        {this.isOnepageCheckout && this.paymentMethodPanelStatus.isCompleted && (
          <div className="border pb-2">
            <p>
              <span
                className="pull-right ui-cursor-pointer-pure mr-2"
                onClick={() => {
                  this.props.paymentStore.updatePanelStatus('paymentMethod', {
                    isPrepare: false,
                    isEdit: true,
                    isCompleted: false
                  });
                }}
              >
                <FormattedMessage id="edit" />
              </span>
            </p>
            <div className="row">
              <div className="col-6 col-sm-3 d-flex flex-column justify-content-center ">
                <img
                  className="PayCardImgFitScreen"
                  src={
                    CREDIT_CARD_IMG_ENUM[
                      adyenPayParam.adyenBrands.toUpperCase()
                    ] ||
                    'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                  }
                />
              </div>
              <div className="col-12 col-sm-9 d-flex flex-column justify-content-around">
                <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                  <div className="col-12 color-999">
                    <FormattedMessage id="name2" />
                    <br />
                    <span className="creditCompleteInfo">
                      {adyenPayParam.hasHolderName}
                    </span>
                  </div>
                </div>
                <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                  <div className="col-6 color-999">
                    <FormattedMessage id="payment.cardNumber2" />
                    <br />
                    <span className="creditCompleteInfo">
                      xxxx xxxx xxxx {/* todo */}
                      {/* {this.state.payosdata
                      ? this.state.payosdata.last_4_digits
                      : ''} */}
                    </span>
                  </div>
                  <div className="col-6 color-999">
                    <FormattedMessage id="payment.cardType" />
                    <br />
                    <span className="creditCompleteInfo">
                      {adyenPayParam.adyenName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <Terms
          sendIsReadPrivacyPolicy={this.sendIsReadPrivacyPolicy}
          sendIsShipTracking={this.sendIsShipTracking}
          sendIsNewsLetter={this.sendIsNewsLetter}
        /> */}
      </div>
    );
  }
}

export default AdyenCreditCardForm;
