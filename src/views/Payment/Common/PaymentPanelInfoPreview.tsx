import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { AddressPreview } from '../Address';
import { PayInfoPreview } from './index';

const hideBillingAddr = Boolean(
  +window.__.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
);

interface Props {
  paymentStore: any;
  checkoutStore: any;
  rest: Aa;
}

interface Aa {
  email: any;
  billingAddress: any;
  adyenPayParam: any;
  payosdata: any;
  selectedCardInfo: any;
  tid: any;
  cyberPayParam: any;
  isFromFelin: any;
  convenienceStore: any;
  subForm: any;
}

/**
 * 渲染pay panel预览信息
 * 不同情况预览不同规则
 */
const PaymentPanelInfoPreview = ({
  paymentStore: { curPayWayInfo },
  checkoutStore,
  ...rest
}: Props) => {
  let {
    // @ts-ignore
    email,
    // @ts-ignore
    billingAddress: form,
    // @ts-ignore
    adyenPayParam,
    // @ts-ignore
    payosdata,
    // @ts-ignore
    selectedCardInfo,
    // @ts-ignore
    tid,
    // @ts-ignore
    cyberPayParam,
    // @ts-ignore
    isFromFelin,
    // @ts-ignore
    convenienceStore,
    // @ts-ignore
    subForm
  } = rest;

  //this.props.paymentStore.saveBillingAddressInfo(form)

  let paymentMethod;
  if (adyenPayParam) {
    paymentMethod = adyenPayParam;
  }
  if (cyberPayParam) {
    paymentMethod = cyberPayParam;
  }
  if (selectedCardInfo) {
    paymentMethod = selectedCardInfo;
  }

  let lastFourDeco;
  let brandDeco;
  let holderNameDeco;
  let expirationDate;
  if (paymentMethod) {
    lastFourDeco = paymentMethod.lastFourDigits;
    brandDeco = paymentMethod.paymentVendor;
    holderNameDeco = paymentMethod.holderName;
    expirationDate = paymentMethod.expirationDate;
  } else if (payosdata && payosdata.vendor) {
    lastFourDeco = payosdata.last_4_digits;
    brandDeco = payosdata.vendor;
    holderNameDeco = payosdata.holder_name;
  }

  return (
    <div className="ml-custom mr-custom mb-3">
      <div className="row">
        <PayInfoPreview
          selectDiscountWay={checkoutStore.selectDiscountWay}
          convenienceStore={convenienceStore}
          email={email}
          cardData={{
            holderNameDeco,
            brandDeco,
            lastFourDeco,
            expirationDate
          }}
          paymentTypeCode={curPayWayInfo?.code}
          buyWay={subForm.buyWay}
        />
        {!tid && !hideBillingAddr && !isFromFelin && (
          <div className="col-12 col-md-6 mt-2 md:mt-0 visitor_address_preview">
            <AddressPreview
              form={form}
              boldName={false}
              titleJSX={
                <p className="mb-0 medium">
                  <FormattedMessage id="billingAddress" />
                </p>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default inject(
  'paymentStore',
  'checkoutStore'
)(observer(PaymentPanelInfoPreview));
