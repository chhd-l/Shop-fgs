import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { ADYEN_CREDIT_CARD_BRANDS } from '@/utils/constant';
import { loadJS, dynamicLoadCss } from '@/utils/utils';
import { getAdyenParam } from './utils';
import { inject, observer } from 'mobx-react';
import { addOrUpdatePaymentMethod } from '@/api/payment';
import LazyLoad from 'react-lazyload';
import { myAccountActionPushEvent } from '@/utils/GA';
import getPaymentConf from '@/lib/get-payment-conf';
import packageTranslations from './translations';

let adyenFormData = {};

@inject('loginStore', 'paymentStore')
@observer
class AdyenCreditCardForm extends React.Component {
  static defaultProps = {
    isCheckoutPage: false, // 是否为支付页
    showCancelBtn: false,
    showSaveBtn: true,
    showSetAsDefaultCheckobx: false, // 是否显示设置为默认checkbox
    isShowEnableStoreDetails: false, // 是否显示保存卡checkbox
    enableStoreDetails: false, // 是否保存卡到后台checkbox
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
    cardList: [],
    supportPaymentMethodsVisible: true // 是否显示支持的支付方式图片
  };
  constructor(props) {
    super(props);
    this.state = {
      adyenFormData: { isDefault: 0 },
      isValid: false,
      adyenOriginKeyConf: null
    };
  }
  componentDidMount() {
    this.initAdyenConf();
    this.setState({
      adyenFormData: Object.assign(adyenFormData, {
        isDefault: 0
      })
    });
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
  getBrowserInfo(state) {
    this.props.paymentStore.setBrowserInfo(state.data.browserInfo);
  }
  async initAdyenConf() {
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    const tmp = await getPaymentConf();

    this.setState(
      {
        adyenOriginKeyConf: tmp.filter(
          (t) => t.pspItemCode === curPayWayInfo?.code
        )[0]
      },
      () => {
        this.initForm();
      }
    );
  }
  initForm() {
    const {
      intl: { messages }
    } = this.props;
    const _this = this;
    const { translations } = packageTranslations({ messages });
    const { adyenOriginKeyConf } = this.state;
    dynamicLoadCss(
      'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.css'
    );
    console.log({ adyenOriginKeyConf });
    loadJS({
      url: 'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout && adyenOriginKeyConf) {
          console.log('render adyen form start');
          //要有值
          const AdyenCheckout = window.AdyenCheckout;
          // (1) Create an instance of AdyenCheckout
          const checkout = new AdyenCheckout({
            environment: adyenOriginKeyConf?.environment,
            originKey: adyenOriginKeyConf?.openPlatformSecret,
            locale: adyenOriginKeyConf?.locale || 'en-US',
            // 只有adyen本身不支持的语言时，自定义翻译才有用
            translations: {
              [adyenOriginKeyConf?.locale || 'en-US']: translations
            },
            allowAddedLocales: true
          });

          // (2). Create and mount the Component
          const card = checkout
            .create('card', {
              hasHolderName: true,
              holderNameRequired: true,
              // enableStoreDetails: _this.props.enableStoreDetails,
              enableStoreDetails: _this.props.isShowEnableStoreDetails,
              styles: {},
              placeholders: {},
              showPayButton: false,
              brands: ADYEN_CREDIT_CARD_BRANDS,
              onLoad: () => {
                console.log('adyen form loaded');
              },
              onBrand: (state) => {
                adyenFormData = Object.assign(adyenFormData, {
                  adyenBrands: state.brand,
                  brand: state.brand,
                  brandImageUrl: state.brandImageUrl
                });
              },
              onChange: (state) => {
                try {
                  _this.getBrowserInfo(state);
                  console.log('adyen form state:', state);
                  console.log('adyen form card:', card);
                  const {
                    enableStoreDetails,
                    isShowEnableStoreDetails,
                    mustSaveForFutherPayments
                  } = _this.props;
                  let tmpValidSts;
                  if (isShowEnableStoreDetails && mustSaveForFutherPayments) {
                    tmpValidSts = card.data.storePaymentMethod && state.isValid;
                  } else {
                    tmpValidSts = state.isValid;
                  }
                  _this.setState({ isValid: tmpValidSts }, () => {
                    console.log('adyen form state.isValid:', state.isValid);
                  });
                  _this.props.updateClickPayBtnValidStatus(tmpValidSts);
                  if (tmpValidSts) {
                    adyenFormData = Object.assign(
                      adyenFormData,
                      getAdyenParam(card.data),
                      {
                        storePaymentMethod: isShowEnableStoreDetails
                          ? card.data && card.data.storePaymentMethod
                          : mustSaveForFutherPayments
                          ? true
                          : false
                      }
                    );
                  }
                } catch (err) {
                  console.log('set adyen form err', err);
                }
              }
            })
            .mount('#adyen-card-container');
          _this.props.updateInitStatus(true);
        }
      }
    });
  }
  handleSavePromise = async () => {
    try {
      // 如果勾选了保存信息按钮，则保存到后台，否则不需要保存信息到后台
      // const { adyenFormData } = this.state;
      let tmpSelectedId = '';
      let decoAdyenFormData = Object.assign({}, adyenFormData);
      let currentCardEncryptedSecurityCode =
        adyenFormData.encryptedSecurityCode; //获取当前保存卡的encryptedSecurityCode
      if (adyenFormData.storePaymentMethod) {
        // let nameReg = /[0-9]/
        // if(nameReg.test(adyenFormData.hasHolderName)) {
        //   this.props.showErrorMsg(this.props.intl.messages.nameInvalid)
        //   return
        // }
        this.setState({ saveLoading: true });
        const res = await addOrUpdatePaymentMethod({
          storeId: window.__.env.REACT_APP_STOREID,
          customerId: this.userInfo ? this.userInfo.customerId : '',
          encryptedCardNumber: adyenFormData.encryptedCardNumber,
          encryptedExpiryMonth: adyenFormData.encryptedExpiryMonth,
          encryptedExpiryYear: adyenFormData.encryptedExpiryYear,
          encryptedSecurityCode: adyenFormData.encryptedSecurityCode,
          holderName: adyenFormData.hasHolderName,
          isDefault: adyenFormData.isDefault ? 1 : 0,
          pspName: 'ADYEN'
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
        this.props.updateAdyenPayParam(
          Object.assign(res.context, decoAdyenFormData)
        );
      } else {
        tmpSelectedId = new Date().getTime() + '';
        decoAdyenFormData = Object.assign(decoAdyenFormData, {
          id: tmpSelectedId
        });
        this.props.updateAdyenPayParam(decoAdyenFormData);
        setTimeout(() => this.props.updateSelectedId(tmpSelectedId), 200);
      }
      myAccountActionPushEvent('Add payment Method');
      this.isLogin && this.props.updateFormVisible(false);
    } catch (err) {
      this.props.showErrorMsg(err.message);
      throw new Error(err.message);
    }
  };
  handleSave = async () => {
    try {
      await this.handleSavePromise();
    } catch (err) {
      this.props.showErrorMsg(err.message);
      this.setState({ saveLoading: false });
    }
  };
  handleClickCancel = () => {
    this.props.updateFormVisible(false);
    this.isLogin && this.props.queryList();
  };
  handleDefaultChange = (e) => {
    this.setState({
      adyenFormData: Object.assign(adyenFormData, {
        isDefault: Boolean(!adyenFormData.isDefault)
      })
    });
  };
  render() {
    const {
      isOnepageCheckout,
      isCheckoutPage,
      showCancelBtn,
      showSaveBtn,
      paymentStore,
      mustSaveForFutherPayments,
      cardList,
      isShowEnableStoreDetails,
      showSetAsDefaultCheckobx,
      supportPaymentMethodsVisible
    } = this.props;
    const { saveLoading, isValid } = this.state;
    const { supportPaymentMethods } = paymentStore;
    return (
      <div>
        {/* 支持卡的类型 Visa和master */}
        {supportPaymentMethodsVisible && supportPaymentMethods.length > 0 && (
          <p className="mb-2">
            <span className="logo-payment-card-list logo-credit-card ml-0">
              {supportPaymentMethods.map((el, idx) => (
                <LazyLoad key={idx}>
                  <img
                    style={{ width: '50px' }}
                    className="logo-payment-card mr-1"
                    src={el.imgUrl}
                    alt={el.cardType}
                  />
                </LazyLoad>
              ))}
            </span>
          </p>
        )}
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
            className={`col-12 ${
              showCancelBtn || showSaveBtn ? 'col-md-6' : ''
            }`}
          >
            {isShowEnableStoreDetails && mustSaveForFutherPayments && (
              <span
                className="text-danger-2"
                style={{
                  marginTop: '-1rem',
                  fontSize: '.8em'
                }}
              >
                * <FormattedMessage id="checkboxIsRequiredForSubscription" />
              </span>
            )}
            {showSetAsDefaultCheckobx ? (
              <div className="rc-input rc-input--inline w-100 mw-100">
                <input
                  id="addr-default-checkbox"
                  type="checkbox"
                  className="rc-input__checkbox"
                  onChange={this.handleDefaultChange}
                  value={Boolean(adyenFormData.isDefault)}
                  checked={Boolean(adyenFormData.isDefault)}
                  autoComplete="new-password"
                />
                <label
                  className={`rc-input__label--inline text-break`}
                  htmlFor="addr-default-checkbox"
                >
                  <FormattedMessage id="setDefaultPaymentMethod" />
                </label>
              </div>
            ) : null}
          </div>
          {showCancelBtn || showSaveBtn ? (
            <div className="text-right col-12 col-md-6">
              {showCancelBtn && (
                <span>
                  <span
                    className="rc-styled-link editPersonalInfoBtn"
                    name="contactInformation"
                    onClick={this.handleClickCancel}
                  >
                    <FormattedMessage id="cancel" />
                  </span>{' '}
                  <span>
                    <FormattedMessage id="or" />{' '}
                  </span>
                </span>
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
        {this.isLogin && cardList.length ? (
          <div className="text-right">
            <a
              href="javascript:;"
              className="rc-styled-link"
              onClick={this.handleClickCancel}
            >
              <FormattedMessage id="BacktoSavedPayments" />
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AdyenCreditCardForm;
// export default injectIntl(AdyenCreditCardForm, { forwardRef: true });
