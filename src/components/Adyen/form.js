import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ADYEN_CREDIT_CARD_IMGURL_ENUM,
  ADYEN_CREDIT_CARD_BRANDS
} from '@/utils/constant';
import { loadJS } from '@/utils/utils';
import { getAdyenParam } from './utils';
import { inject, observer } from 'mobx-react';
import { addOrUpdatePaymentMethod } from '@/api/payment';
import translations from './translations';

@inject('loginStore', 'paymentStore')
@observer
class AdyenCreditCardForm extends React.Component {
  static defaultProps = {
    isCheckoutPage: false, // 是否为支付页
    showCancelBtn: false,
    isSaveToBackend: true,
    enableStoreDetails: false,
    isOnepageCheckout: false,
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
      AdyenFormData: {},
      isValid: false
    };
  }
  componentDidMount() {
    this.initForm();
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.paymentMethodPanelStatus;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  initForm() {
    const _this = this;
    loadJS({
      url:
        'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          //要有值
          const AdyenCheckout = window.AdyenCheckout;
          // (1) Create an instance of AdyenCheckout
          const checkout = new AdyenCheckout({
            environment: 'test',
            originKey: process.env.REACT_APP_AdyenOriginKEY,
            locale: process.env.REACT_APP_Adyen_locale,
            translations
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
              brands: ADYEN_CREDIT_CARD_BRANDS,
              onBrand: (state) => {
                _this.setState({
                  AdyenFormData: Object.assign(_this.state.AdyenFormData, {
                    adyenBrands: state.brand,
                    brand: state.brand,
                    brandImageUrl: state.brandImageUrl
                  })
                });
              },
              onChange: (state) => {
                console.log('adyen form state:', state);
                console.log('adyen form card:', card);
                let tmpValidSts;
                // 会员必须勾选保存按钮
                if (_this.props.enableStoreDetails) {
                  tmpValidSts = card.data.storePaymentMethod && state.isValid;
                } else {
                  tmpValidSts = state.isValid;
                }
                _this.setState({ isValid: tmpValidSts }, () => {
                  console.log('adyen form state.isValid:', state.isValid);
                });
                _this.props.updateClickPayBtnValidStatus(state.isValid);
                if (tmpValidSts) {
                  _this.setState({
                    AdyenFormData: Object.assign(
                      _this.state.AdyenFormData,
                      getAdyenParam(card.data)
                    )
                  });
                }
              }
            })
            .mount('#adyen-card-container');
          _this.props.updateInitStatus(true);
        }
      }
    });
  }
  handleSave = async () => {
    try {
      const { AdyenFormData } = this.state;
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
          accountName: this.userInfo ? this.userInfo.customerAccount : ''
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
            !this.props.isCheckoutPage ||
            !this.props.isOnepageCheckout ||
            this.isLogin ||
            this.paymentMethodPanelStatus.isEdit
              ? ''
              : 'hidden'
          }`}
        />
        <div className="overflow-hidden mt-3">
          <div className="text-right">
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
        {this.props.isOnepageCheckout &&
          !this.isLogin &&
          this.paymentMethodPanelStatus.isCompleted && (
            <div className="border pb-2">
              <p>
                <span
                  className="pull-right ui-cursor-pointer-pure mr-2"
                  onClick={() => {
                    this.props.paymentStore.updatePanelStatus2(
                      'paymentMethod',
                      {
                        isPrepare: false,
                        isEdit: true,
                        isCompleted: false
                      }
                    );
                  }}
                >
                  <FormattedMessage id="edit" />
                </span>
              </p>
            </div>
          )}
      </>
    );
  }
}

export default AdyenCreditCardForm;
