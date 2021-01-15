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
import LazyLoad from 'react-lazyload';

@inject('loginStore', 'paymentStore')
@observer
class AdyenCreditCardForm extends React.Component {
  static defaultProps = {
    isCheckoutPage: false, // 是否为支付页
    showCancelBtn: false,
    showSaveBtn: true,
    enableStoreDetails: false, // 是否显示保存卡checkbox
    mustSaveForFutherPayments: true, // 是否必须勾选保存卡checkbox，true-只有勾选了之后保存卡按钮才可用
    isOnepageCheckout: false,
    updateClickPayBtnValidStatus: () => {},
    updateAdyenPayParam: () => {},
    refreshList: () => {},
    updateFormVisible: () => {},
    showErrorMsg: () => {},
    queryList: () => {},
    updateInitStatus: () => {},
    updateSelectedId: () => {},
    cardList: []
  };
  constructor(props) {
    super(props);
    this.state = {
      adyenFormData: {},
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
            environment: 'live',
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
                  adyenFormData: Object.assign(_this.state.adyenFormData, {
                    adyenBrands: state.brand,
                    brand: state.brand,
                    brandImageUrl: state.brandImageUrl
                  })
                });
              },
              onChange: (state) => {
                console.log('adyen form state:', state);
                console.log('adyen form card:', card);
                const {
                  enableStoreDetails,
                  mustSaveForFutherPayments
                } = _this.props;
                let tmpValidSts;
                if (enableStoreDetails && mustSaveForFutherPayments) {
                  tmpValidSts = card.data.storePaymentMethod && state.isValid;
                } else {
                  tmpValidSts = state.isValid;
                }
                _this.setState({ isValid: tmpValidSts }, () => {
                  console.log('adyen form state.isValid:', state.isValid);
                });
                _this.props.updateClickPayBtnValidStatus(tmpValidSts);
                if (tmpValidSts) {
                  _this.setState(
                    {
                      adyenFormData: Object.assign(
                        _this.state.adyenFormData,
                        getAdyenParam(card.data),
                        { storePaymentMethod: card.data.storePaymentMethod }
                      )
                    },
                    () => {
                      // _this.props.updateAdyenPayParam(_this.state.adyenFormData);
                    }
                  );
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
      // 如果勾选了保存信息按钮，则保存到后台，否则不需要保存信息到后台
      const { adyenFormData } = this.state;
      let tmpSelectedId = '';
      let decoAdyenFormData = Object.assign({}, adyenFormData);
      let currentCardEncryptedSecurityCode =
        adyenFormData.encryptedSecurityCode; //获取当前保存卡的encryptedSecurityCode
      if (adyenFormData.storePaymentMethod) {
        this.setState({ saveLoading: true });
        const res = await addOrUpdatePaymentMethod({
          customerId: this.userInfo ? this.userInfo.customerId : '',
          storeId: process.env.REACT_APP_STOREID,
          encryptedCardNumber: adyenFormData.encryptedCardNumber,
          encryptedExpiryMonth: adyenFormData.encryptedExpiryMonth,
          encryptedExpiryYear: adyenFormData.encryptedExpiryYear,
          encryptedSecurityCode: adyenFormData.encryptedSecurityCode,
          paymentType: 'ADYEN',
          holderName: adyenFormData.hasHolderName,
          accountName: this.userInfo ? this.userInfo.customerAccount : ''
        });
        tmpSelectedId = res.context.id;
        this.props.updateSelectedId(tmpSelectedId);
        this.props.paymentStore.updateFirstSavedCardCvv(tmpSelectedId);
        //把绑卡的encryptedSecurityCode传入
        await this.props.queryList({
          currentCardEncryptedSecurityCode,
          showListLoading: false
        });
        this.setState({ saveLoading: false });
        this.props.updateAdyenPayParam(decoAdyenFormData);
      } else {
        tmpSelectedId = new Date().getTime() + '';
        decoAdyenFormData = Object.assign(decoAdyenFormData, {
          id: tmpSelectedId
        });
        this.props.updateAdyenPayParam(decoAdyenFormData);
        this.props.updateSelectedId(tmpSelectedId);
      }

      this.isLogin && this.props.updateFormVisible(false);
    } catch (err) {
      this.props.showErrorMsg(err.message);
      this.setState({ saveLoading: false });
      throw new Error(err.message);
    }
  };
  handleClickCancel = () => {
    this.props.updateFormVisible(false);
    this.isLogin && this.props.queryList();
  };
  render() {
    const {
      isOnepageCheckout,
      isCheckoutPage,
      showCancelBtn,
      showSaveBtn,
      paymentStore,
      mustSaveForFutherPayments
    } = this.props;
    const { saveLoading, isValid } = this.state;
    return (
      <>
        {/* 支持卡的类型 Visa和master */}
        <p className="mb-2">
          <span className="logo-payment-card-list logo-credit-card ml-0">
            {ADYEN_CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
              <LazyLoad key={idx}>
                <img
                  style={{ width: '50px' }}
                  className="logo-payment-card mr-1"
                  src={el}
                  alt=""
                />
              </LazyLoad>
            ))}
          </span>
        </p>
        <div
          id="adyen-card-container"
          className={`payment-method__container ${
            !isCheckoutPage ||
            !isOnepageCheckout ||
            this.isLogin ||
            this.paymentMethodPanelStatus.isEdit
              ? ''
              : 'hidden'
          }`}
        />
        <div className="mt-3 d-flex justify-content-between row">
          <div
            className={`text-danger-2 col-12 ${
              showCancelBtn || showSaveBtn ? 'col-md-6' : ''
            }`}
            style={{
              marginTop: '-1rem',
              fontSize: '.8em'
            }}
          >
            {mustSaveForFutherPayments && (
              <>
                * <FormattedMessage id="checkboxIsRequiredForSubscription" />
              </>
            )}
          </div>
          {showCancelBtn || showSaveBtn ? (
            <div className="text-right col-12 col-md-6">
              {showCancelBtn && (
                <>
                  <span
                    className="rc-styled-link editPersonalInfoBtn"
                    name="contactInformation"
                    onClick={this.handleClickCancel}
                  >
                    <FormattedMessage id="cancel" />
                  </span>{' '}
                  <FormattedMessage id="or" />{' '}
                </>
              )}
              {showSaveBtn && (
                <button
                  className={`rc-btn rc-btn--one submitBtn editAddress ${
                    saveLoading ? 'ui-btn-loading' : ''
                  }`}
                  data-sav="false"
                  name="contactInformation"
                  type="submit"
                  disabled={!isValid}
                  onClick={this.handleSave}
                >
                  <FormattedMessage id="save" />
                </button>
              )}
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default AdyenCreditCardForm;
