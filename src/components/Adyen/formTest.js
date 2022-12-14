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
import '@adyen/adyen-web/dist/adyen.css';
import { funcUrl } from '@/lib/url-utils';
import './form.less';
import Form from '../Address/Form';
let adyenFormData = {};
import { Input, Button, Modal } from '@/components/Common';

let indexT = 0;
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
    this.country = '';
    this.containerEl = React.createRef();
    this.applePayComponent = null;
  }
  componentDidMount() {
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
    // const tmp = await getPaymentConf();
    if (this.applePayComponent) {
      this.applePayComponent?.unmount?.();
    }
    console.info('this.applePayComponent', this.applePayComponent);
    let country =
      funcUrl({ name: 'country' }) || window.__.env.REACT_APP_COUNTRY || 'fr';
    // this.country = country
    console.info('countrycountry', country);
    this.setState(
      {
        adyenOriginKeyConf: {
          appId: 'MarsIncorporated_ROYALCANIN_FRANCE_D2C_SIT_TEST',
          environment: 'test',
          locale: `${country.toLocaleLowerCase()}_${country.toLocaleUpperCase()}`,
          openPlatformSecret: 'test_Y5XPLQLX2RBVZN5PZ7X4VKOEEE2OLBDF',
          pspItemCode: 'adyen_credit_card',
          pspName: 'ADYEN',
          publicKey: '123456'
        }
      },
      () => {
        this.initForm();
      }
    );
  }
  async initForm() {
    const {
      intl: { messages }
    } = this.props;
    let country =
      funcUrl({ name: 'country' }) || window.__.env.REACT_APP_COUNTRY || 'fr';

    const _this = this;
    const { translations } = packageTranslations({ messages });
    const { adyenOriginKeyConf } = this.state;
    let paymentMethodsResponse = {
      paymentMethods: [
        {
          brands: ['visa', 'mc'],
          details: [
            {
              key: 'encryptedCardNumber',
              type: 'cardToken'
            },
            {
              key: 'encryptedSecurityCode',
              type: 'cardToken'
            },
            {
              key: 'encryptedExpiryMonth',
              type: 'cardToken'
            },
            {
              key: 'encryptedExpiryYear',
              type: 'cardToken'
            },
            {
              key: 'holderName',
              optional: true,
              type: 'text'
            }
          ],
          name: 'Credit Card',
          type: 'scheme'
        },
        {
          configuration: {
            merchantId: '000000000204759',
            merchantName: 'MarsIncorporated_ApplePay_TEST'
          },
          details: [
            {
              key: 'applepay.token',
              type: 'applePayToken'
            }
          ],
          name: 'Apple Pay',
          type: 'applepay'
        }
      ]
    };
    console.log(paymentMethodsResponse, '==================');
    let session = {
      id: this.state.adyenFormData.sessionId, // Unique identifier for the payment session.
      sessionData: this.state.adyenFormData.sessionData // The payment session data.
    };
    console.info('sessionsession', session);
    if (this.containerEl.current) {
      const configuration = {
        ...session,
        environment: adyenOriginKeyConf?.environment,
        clientKey: adyenOriginKeyConf?.openPlatformSecret,
        locale: adyenOriginKeyConf?.locale || 'en-US',
        // 只有adyen本身不支持的语言时，自定义翻译才有用
        translations: {
          [adyenOriginKeyConf?.locale || 'en-US']: translations
        },
        allowAddedLocales: true,
        buttonType: 'buy',
        buttonColor: 'black',
        paymentMethodsResponse,
        onPaymentCompleted: (result, component) => {
          console.info(indexT, 'onPaymentCompleted', new Date(), result);
          console.info('......', component);
          indexT++;
        },
        onPaymentAuthorized: (onPaymentAuthorized) => {
          console.info(
            indexT,
            'onpaymentauthorized1111:',
            new Date(),
            onPaymentAuthorized
          );
          indexT++;
        },
        onChange: (state) => {
          console.info(indexT, 'onChangestate', new Date(), state);
          indexT++;
        },
        onSubmit: (state, dropin) => {
          console.info(indexT, 'onSubmitstate', new Date(), state);
          console.info('onSubmitdropin', dropin);
          indexT++;
        },
        onError: (error, component) => {
          console.error(
            indexT,
            new Date(),
            'onError===name',
            error.name,
            'onError===message',
            error.message,
            'onError===stack',
            error.stack,
            'onError===component',
            component
          );
          indexT++;
        }
      };
      const AdyenCheckout = (await import('@adyen/adyen-web')).default;
      console.info('configuration adyen', configuration);
      const checkout = await new AdyenCheckout(configuration);
      const applePayConfiguration = {
        // onValidateMerchant: (resolve, reject, validationURL) => {
        //   console.info('.....', resolve, reject, validationURL);
        //   // Your server uses the validation URL to request a session from the Apple Pay server.
        //   // Call resolve(MERCHANTSESSION) or reject() to complete merchant validation.
        //   validateMerchant(validationURL)
        //     .then((response) => {
        //       console.info('response', response);
        //       // Complete merchant validation with resolve(MERCHANTSESSION) after receiving an opaque merchant session object, MerchantSession
        //       resolve(response);
        //     })
        //     .catch((error) => {
        //       console.info('reject', error);
        //       // Complete merchant validation with reject() if any error occurs
        //       reject();
        //     });
        // },
        completePayment: (completePayment) => {
          console.info(indexT, 'completePayment:', new Date(), completePayment);
          indexT++;
        },
        onPaymentAuthorized: (onPaymentAuthorized) => {
          console.info(
            indexT,
            'onpaymentauthorized2222:',
            new Date(),
            onPaymentAuthorized
          );
          indexT++;
        },
        amount: {
          value: this.state.adyenFormData.amount || 3500,
          currency: this.state.adyenFormData.currency || 'USD'
        },
        onSelect: (activeComponent) => {
          console.info('....onSelect', activeComponent);
        },
        onAuthorized: (e) => {
          console.info('......onAuthorized', e.toString());
        },
        countryCode: country.toUpperCase()
        // configuration: {
        //   merchantName: 'MarsIncorporated_ROYALCANIN_NL_SIT_TEST',
        //   merchantIdentifier: 'merchant.com.royalcanin.fgs'
        // }
      };
      let that = this;
      console.info('applePayConfiguration applepay', applePayConfiguration);
      that.applePayComponent = checkout.create(
        'applepay',
        applePayConfiguration
      );
      that.applePayComponent
        .isAvailable()
        .then(() => {
          console.info('.......test');
          that.applePayComponent.mount('#applepay-container');
        })
        .catch((e) => {
          console.info('ApplePaySessionerror000000000', e);
          //Apple Pay is not available
        });
      // applePayComponent.mount('#applepay-container');

      //     applePayComponent
      //  .isAvailable()
      //  .then(() => {
      //      applePayComponent.mount("#applepay-container");
      //  })
      //  .catch(e => {
      //   console.info('.....err',e)
      //      //Apple Pay is not available
      //  });
      // const card = checkout
      //   .create('card', {
      //     brands: ADYEN_CREDIT_CARD_BRANDS,
      //     enableStoreDetails: _this.props.isShowEnableStoreDetails,
      //     hasHolderName: true,
      //     holderNameRequired: true,
      //     showPayButton: false,
      //     onBrand: (state) => {
      //       adyenFormData = Object.assign(adyenFormData, {
      //         adyenBrands: state.brand,
      //         brand: state.brand,
      //         brandImageUrl: state.brandImageUrl
      //       });
      //     },
      //     // onFieldValid: (state: any) => {
      //     //   updateFormData(
      //     //     Object.assign(CardListStore.formData || {}, {
      //     //       lastFourDigits: state.endDigits,
      //     //     })
      //     //   )
      //     // },
      //     onChange: (state) => {
      //       try {
      //         _this.getBrowserInfo(state);
      //         console.log('adyen form state:', state);
      //         console.log('adyen form card:', card);
      //         const {
      //           enableStoreDetails,
      //           isShowEnableStoreDetails,
      //           mustSaveForFutherPayments
      //         } = _this.props;
      //         let tmpValidSts;
      //         if (isShowEnableStoreDetails && mustSaveForFutherPayments) {
      //           tmpValidSts = card.data.storePaymentMethod && state.isValid;
      //         } else {
      //           tmpValidSts = state.isValid;
      //         }
      //         _this.setState({ isValid: tmpValidSts }, () => {
      //           console.log('adyen form state.isValid:', state.isValid);
      //         });
      //         _this.props.updateClickPayBtnValidStatus(tmpValidSts);
      //         if (tmpValidSts) {
      //           adyenFormData = Object.assign(
      //             adyenFormData,
      //             getAdyenParam(card.data),
      //             {
      //               storePaymentMethod: isShowEnableStoreDetails
      //                 ? card.data && card.data.storePaymentMethod
      //                 : mustSaveForFutherPayments
      //                 ? true
      //                 : false
      //             }
      //           );
      //         }
      //       } catch (err) {
      //         console.log('set adyen form err', err);
      //       }
      //     },
      //     onLoad: () => {
      //       console.log('adyen form loaded');
      //     }
      //   })
      //   .mount(this.containerEl.current);
    }
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
        <div className="sessionData">
          {/* <span>sessionData</span> */}
          <Input
            label="sessionData"
            value={this.state.adyenFormData.sessionData}
            onChange={(e) => {
              let newAdyenFormData = Object.assign(this.state.adyenFormData, {
                sessionData: e.target.value
              });
              this.setState({ adyenFormData: newAdyenFormData });
            }}
          />
        </div>
        <div className="sessionId">
          {/* <span>sessionId</span> */}
          <Input
            label="sessionId"
            value={this.state.adyenFormData.sessionId}
            onChange={(e) => {
              let newAdyenFormData = Object.assign(this.state.adyenFormData, {
                sessionId: e.target.value
              });
              this.setState({ adyenFormData: newAdyenFormData });
            }}
          />
        </div>
        <div className="currency">
          {/* <span>currency</span> */}
          <Input
            label="currency"
            value={this.state.adyenFormData.currency}
            onChange={(e) => {
              console.info('e', e);
              let newAdyenFormData = Object.assign(this.state.adyenFormData, {
                currency: e.target.value
              });
              console.info('newAdyenFormData', newAdyenFormData);
              this.setState({ adyenFormData: newAdyenFormData });
            }}
          />
        </div>
        <div className="amount">
          {/* <span>amount</span> */}
          <Input
            label="amount"
            value={this.state.adyenFormData.amount}
            onChange={(e) => {
              console.info('e', e);
              let newAdyenFormData = Object.assign(this.state.adyenFormData, {
                amount: e.target.value
              });
              console.info('newAdyenFormData', newAdyenFormData);
              this.setState({ adyenFormData: newAdyenFormData });
            }}
          />
        </div>
        <button
          className="rc-btn rc-btn--one bg-rc-red"
          onClick={() => {
            this.initAdyenConf();
          }}
        >
          init pay button
        </button>
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
          id="applepay-container"
          data-auto-testid="adyen-card-container"
          ref={this.containerEl}
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
              <div
                className="rc-input rc-input--inline w-100 mw-100"
                data-auto-testid="SetDefaultPayment"
              >
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
                    data-auto-testid="editPersonalInfoBtn"
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
                <Button
                  data-auto-testid="submitBtn"
                  className={`submitBtn editAddress`}
                  loading={saveLoading}
                  data-sav="false"
                  name="contactInformation"
                  type="primary"
                  htmlType="submit"
                  disabled={!isValid}
                  onClick={this.handleSave}
                >
                  <FormattedMessage id="save" />
                </Button>
              )}
            </div>
          ) : null}
        </div>
        {this.isLogin && cardList.length ? (
          <div className="text-right">
            <a
              href="javascript:;"
              className="rc-styled-link pt-1"
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
