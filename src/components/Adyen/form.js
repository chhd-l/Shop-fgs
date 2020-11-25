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
    updateSelectedId: () => {}
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
                _this.props.updateClickPayBtnValidStatus(state.isValid);
                if (tmpValidSts) {
                  _this.setState({
                    adyenFormData: Object.assign(
                      _this.state.adyenFormData,
                      getAdyenParam(card.data),
                      { storePaymentMethod: card.data.storePaymentMethod }
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
      debugger;
      // 如果勾选了保存信息按钮，则保存到后台，否则不需要保存信息到后台
      const { adyenFormData } = this.state;
      let tmpSelectedId = '';
      let decoAdyenFormData = Object.assign({}, adyenFormData);
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
        this.props.queryList();
        this.setState({ saveLoading: false });
      } else {
        tmpSelectedId = new Date().getTime() + '';
        decoAdyenFormData = Object.assign(decoAdyenFormData, {
          id: tmpSelectedId
        });
      }
      // 会员不保存情况下 怎么处理
      this.props.updateFormVisible(false);
      this.props.updateAdyenPayParam(decoAdyenFormData);
      this.props.updateSelectedId(tmpSelectedId);
    } catch (err) {
      this.props.showErrorMsg(err.message);
      this.setState({ saveLoading: false });
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
      paymentStore
    } = this.props;
    const { saveLoading, isValid } = this.state;
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
                alt=""
              />
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
        <div className="overflow-hidden mt-3">
          <div className="text-right">
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
          </div>
        </div>
        {isOnepageCheckout &&
          !this.isLogin &&
          this.paymentMethodPanelStatus.isCompleted && (
            <div className="border pb-2">
              <p>
                <span
                  className="pull-right ui-cursor-pointer-pure mr-2"
                  onClick={() => {
                    paymentStore.updatePanelStatus2('paymentMethod', {
                      isPrepare: false,
                      isEdit: true,
                      isCompleted: false
                    });
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
