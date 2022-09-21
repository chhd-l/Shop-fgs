import React from 'react';
import { PanelContainer, PaymentPanelInfoPreview } from '../../Common';
import { inject, observer } from 'mobx-react';
import { radioTypes } from '../paymentMethodsConstant';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import {
  PayUCreditCard,
  AdyenCreditCard,
  Paypal,
  Swish,
  Cod,
  OxxoConfirm,
  AdyenCommonPay,
  CyberPayment,
  ConvenienceStore,
  Pos,
  Cash,
  Moto,
  Ideal
} from '../index';

const chooseRadioType = () => {
  return radioTypes[window.__.env.REACT_APP_COUNTRY] || radioTypes['default'];
};

const SupportPaymentMethodsPic = ({ supportPaymentMethods }) => (
  <div>
    <span className="logo-payment-card-list logo-credit-card">
      {supportPaymentMethods.map((el, idx) => (
        <LazyLoad key={idx}>
          {el.imgHtml ? (
            <span
              dangerouslySetInnerHTML={{
                __html: el.imgHtml
              }}
            />
          ) : (
            <img
              className={`logo-payment-card mr-1  max-h-8 ${
                el.cardType.toLowerCase() === 'moto'
                  ? 'w-14'
                  : el.cardType.toLowerCase() === 'paypal'
                  ? 'w-7 md:w-20'
                  : 'w-7 md:w-10'
              }`}
              src={el.imgUrl}
              alt={el.cardType}
            />
          )}
        </LazyLoad>
      ))}
    </span>
  </div>
);

@inject('paymentStoreNew', 'checkoutStore')
@observer
class Cover extends React.Component {
  componentDidMount() {}
  get paymentMethodPanelStatus() {
    return this.props.paymentStoreNew.paymentMethodPanelStatus;
  }

  get isSkipPaymentPanel() {
    // todo
    return false;
  }

  handleClickPaymentPanelEdit = () => {
    // todo
  };

  handlePaymentTypeChange = (paymentTypeCode) => {
    const {
      paymentStoreNew: { serCurPayWayVal },
      checkoutStore: { setInputPoint }
    } = this.props;
    serCurPayWayVal(paymentTypeCode);
    setInputPoint('');
    // todo 这是干嘛的
    // openPromotionBox();
    // this.setState({ email: '', convenienceStore: '' }, () => {
    //   this.onPaymentTypeValChange();
    // });
  };

  render() {
    const { paymentMethodPanelStatus } = this;
    const {
      paymentStoreNew: { payWayNameArr, curPayWayInfo, subForm }
    } = this.props;

    //支付方式圆形单选框
    const InputCirclePaymentMethods = () => {
      return (
        <div className={`ml-custom mr-custom`}>
          {payWayNameArr.map((item, i) => (
            <div className={`rc-input rc-input--inline`} key={i}>
              <input
                className="rc-input__radio"
                id={`payment-info-${item.id}`}
                value={item.code}
                type="radio"
                name="payment-info"
                onChange={(e) => this.handlePaymentTypeChange(e.target.value)}
                checked={curPayWayInfo?.code === item.code}
                autoComplete="new-password"
              />
              <label
                className="rc-input__label--inline"
                htmlFor={`payment-info-${item.id}`}
              >
                <FormattedMessage id={item.code} />
              </label>
            </div>
          ))}
        </div>
      );
    };

    const HorizontalLinePaymentMethods = () => {
      return payWayNameArr.map((item, index) => (
        <div
          className={cn(
            'flex justify-between items-center text-grey-400 w-full border rounded-md pl-5 pr-2 py-2 my-4 cursor-pointer',
            curPayWayInfo?.code === item.code
              ? 'border-green'
              : 'border-gray-300'
          )}
          key={index}
          onClick={() => this.handlePaymentTypeChange(item.code)}
        >
          <div className="text-sm md:text-lg">
            <FormattedMessage id={item.code} />
          </div>
          {/* adyenCard 支持卡的类型logo */}
          {item?.payPspItemCardTypeVOList.length > 0 && (
            <SupportPaymentMethodsPic
              supportPaymentMethods={item.payPspItemCardTypeVOList}
            />
          )}
        </div>
      ));
    };

    return (
      <PanelContainer
        panelStatus={paymentMethodPanelStatus}
        containerConf={{
          className: cn('px-0', {
            hidden: this.isSkipPaymentPanel,
            'pb-0': !paymentMethodPanelStatus.isPrepare
          }),
          id: 'J_checkout_panel_paymentMethod'
        }}
        titleConf={{
          className: 'mx-10',
          icon: {
            defaultIcon: (
              <em
                className={`rc-icon rc-payment--sm rc-iconography inlineblock origin-left paymentIconTransform`}
              />
            ),
            highlighIcon: (
              <em
                className={`rc-icon rc-payment--sm rc-brand1 inlineblock origin-left paymentIconTransform`}
              />
            )
          },
          text: {
            title: <FormattedMessage id="payment.paymentInformation" />
          },
          onEdit: this.handleClickPaymentPanelEdit
        }}
        previewJSX={<PaymentPanelInfoPreview {...this.state} />}
      >
        <div className={`pb-3`}>
          {/* 支付方式选择 */}
          {chooseRadioType() === 'circle' && payWayNameArr.length > 1 && (
            <InputCirclePaymentMethods />
          )}
          {chooseRadioType() === 'box' && <HorizontalLinePaymentMethods />}

          {/* 展示选择了的具体支付方式详情 */}
          <>
            {curPayWayInfo?.code === 'adyen_credit_card' && (
              <>
                <AdyenCreditCard
                  {...this.props}
                  // ref={this.adyenCardRef}
                  showErrorMsg={this.showErrorMsg}
                  updateAdyenPayParam={this.updateAdyenPayParam}
                  updateFormValidStatus={this.updateValidStatus.bind(this, {
                    key: 'adyenCard'
                  })}
                  billingJSX={this.renderBillingJSX({
                    type: 'adyenCard'
                  })}
                  supportPaymentMethodsVisibleAtForm={false}
                  supportPoint={isSupportPoint(this.isLogin)}
                />
              </>
            )}
          </>
        </div>
      </PanelContainer>
    );
  }
}

export default Cover;
