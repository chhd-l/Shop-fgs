import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ADYEN_CREDIT_CARD_IMGURL_ENUM,
  CREDIT_CARD_IMG_ENUM
} from '@/utils/constant';
import { loadJS } from '@/utils/utils';
import { getAdyenParam } from './utils';
import { inject, observer } from 'mobx-react';
import { addOrUpdatePaymentMethod } from '@/api/payment';

@inject('loginStore', 'paymentStore')
@observer
class AdyenCreditCardForm extends React.Component {
  static defaultProps = {
    showCancelBtn: false,
    isSaveToBackend: true,
    enableStoreDetails: false,
    updateClickPayBtnValidStatus: () => {},
    updateAdyenPayParam: () => {},
    refreshList: () => {},
    updateFormVisible: () => {},
    showErrorMsg: () => {},
    queryList: () => {},
    updateInitStatus: () => {},
    updateSelectedId: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      AdyenFormData: null,
      normalFormData: { isDefault: false },
      curAddStatus: false,
      isValid: false
    };
  }
  componentDidMount() {
    this.initForm();
  }
  componentWillReceiveProps(props) {
    if (
      props.isAdd &&
      props.isAdd !== this.state.curAddStatus &&
      this.state.AdyenFormData
    ) {
      this.initForm();
    }
    this.setState({ curAddStatus: props.isAdd });
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.panelStatus.paymentMethod;
  }
  get isOnepageCheckout() {
    return process.env.REACT_APP_ONEPAGE_CHECKOUT === 'true';
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  initForm() {
    const _this = this;
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
              enableStoreDetails: _this.props.enableStoreDetails,
              styles: {},
              placeholders: {},
              showPayButton: false,
              brands: ['mc', 'visa', 'amex', 'cartebancaire'],
              onChange: (state) => {
                _this.setState({ isValid: state.isValid });
                _this.props.updateClickPayBtnValidStatus(state.isValid);
                if (state.isValid) {
                  _this.setState(
                    { AdyenFormData: getAdyenParam(card.data) },
                    () => {
                      debugger;
                    }
                  );
                }
              }
            })
            .mount('#adyen-card-container');
          _this.props.updateInitStatus(true);
        }
      }
    );
  }
  handleSave = async () => {
    try {
      const { AdyenFormData, normalFormData } = this.state;
      if (this.props.isSaveToBackend) {
        this.setState({ saveLoading: true });
        const res = await addOrUpdatePaymentMethod({
          customerId: this.userInfo ? this.userInfo.customerId : '',
          storeId: process.env.REACT_APP_STOREID,
          encryptedCardNumber: AdyenFormData.encryptedCardNumber,
          encryptedExpiryMonth: AdyenFormData.encryptedExpiryMonth,
          encryptedExpiryYear: AdyenFormData.encryptedExpiryYear,
          encryptedSecurityCode: AdyenFormData.encryptedSecurityCode,
          paymentType: 'ADYEN',
          holderName: AdyenFormData.hasHolderName,
          accountName: this.userInfo ? this.userInfo.customerAccount : '',
          isDefault: normalFormData.isDefault ? '1' : '0'
        });
        this.props.queryList();
        this.props.updateSelectedId(res.context.id);
        this.setState({ saveLoading: false });
      }
      this.props.updateFormVisible(false);
      this.props.updateAdyenPayParam(AdyenFormData);
    } catch (err) {
      this.props.showErrorMsg(err.message);
      this.setState({ saveLoading: false });
    }
  };
  render() {
    const { adyenPayParam, normalFormData } = this.state;
    return (
      <>
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
        <div className="overflow-hidden pb-1">
          <div className="text-right d-flex flex-wrap justify-content-between">
            <div
              className="rc-input rc-input--inline mr-0"
              style={{
                marginTop: '10px',
                textAlign: 'left'
              }}
            >
              <input
                type="checkbox"
                className="rc-input__checkbox"
                value={normalFormData.isDefault}
                checked={normalFormData.isDefault}
                onChange={(val) => {
                  this.setState({ normalFormData: val });
                }}
                id="adyen-credit-card-checkbox-isdefault"
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor="adyen-credit-card-checkbox-isdefault"
              >
                <FormattedMessage id="setDefaultPaymentMethod" />
              </label>
            </div>
            <div>
              {this.props.showCancelBtn && (
                <>
                  <a
                    className="rc-styled-link editPersonalInfoBtn"
                    name="contactInformation"
                    onClick={() => {
                      this.props.updateFormVisible(false);
                    }}
                  >
                    <FormattedMessage id="cancel" />
                  </a>{' '}
                  <FormattedMessage id="or" />{' '}
                </>
              )}

              <button
                className={`rc-btn rc-btn--one submitBtn editAddress ${
                  this.state.saveLoading ? 'ui-btn-loading' : ''
                }`}
                data-sav="false"
                name="contactInformation"
                type="submit"
                disabled={!this.state.isValid}
                onClick={this.handleSave}
              >
                <FormattedMessage id="save" />
              </button>
            </div>
          </div>
        </div>
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
      </>
    );
  }
}

export default AdyenCreditCardForm;
