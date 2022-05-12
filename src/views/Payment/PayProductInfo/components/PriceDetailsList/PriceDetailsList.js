import React from 'react';
import { sortPriceList, formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import PromotionCodeText from '../promotionCodeText';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
const COUNTRY = window.__.env.REACT_APP_COUNTRY;

const PriceDetailsList = ({
  data: {
    totalPrice,
    taxFeePrice,
    subscriptionDiscountPrice,
    promotionVOList,
    isShowValidCode,
    deliveryPrice,
    freeShippingDiscountPrice,
    freeShippingFlag,
    installMentParam
  },
  configStore,
  checkoutStore,
  paymentStore
}) => {
  const { curPayWayInfo } = paymentStore;

  const priceList = sortPriceList([
    {
      key: 'totalPrice',
      val: totalPrice,
      visible: true,
      title: <FormattedMessage id="total2" />
    },
    // 日本税费显示, 仅显示不参与总价计算
    {
      key: 'consumptionTax',
      val: taxFeePrice,
      visible: window.__.env.REACT_APP_COUNTRY === 'jp' && taxFeePrice > 0,
      title: <FormattedMessage id="order.consumptionTax" />
    },
    // 订阅折扣
    {
      key: 'subscriptionDiscountPrice',
      title: <FormattedMessage id="promotion" />,
      val: -subscriptionDiscountPrice,
      visible: parseFloat(subscriptionDiscountPrice) > 0,
      className: 'green'
    },
    {
      key: 'promotionCode',
      rowHtml: promotionVOList?.map((el, i) => (
        <PromotionCodeText el={el} i={i} key={i} />
      )),
      visible: !isShowValidCode,
      className: 'green'
    },
    {
      key: 'deliveryPrice',
      title: <FormattedMessage id="cart.delivery" />,
      val: deliveryPrice || <FormattedMessage id="free" />,
      visible: true
    },
    // 运费折扣 俄罗斯
    {
      key: 'freeShippingDiscountPrice',
      title: <FormattedMessage id="payment.shippingDiscount" />,
      val:
        freeShippingDiscountPrice > 0
          ? -freeShippingDiscountPrice
          : freeShippingDiscountPrice,
      visible: freeShippingFlag,
      className: 'green'
    },
    {
      key: 'estimatedTax',
      title: <FormattedMessage id="estimatedTax" />,
      val: taxFeePrice > 0 ? taxFeePrice : '-',
      visible:
        configStore?.customTaxSettingOpenFlag &&
        configStore?.enterPriceType === 'NO_TAX'
    },
    {
      title: <FormattedMessage id="installMent.additionalFee" />,
      val: installMentParam?.additionalFee,
      className: 'red',
      visible: Boolean(installMentParam),
      key: 'installMentAdditionalFee'
    },
    {
      title: <FormattedMessage id="payment.serviceFee" />,
      val: checkoutStore.serviceFeePrice,
      visible:
        configStore?.info?.serviceFeeFlag &&
        COUNTRY == 'jp' &&
        (checkoutStore.serviceFeePrice === 0 ||
          checkoutStore.serviceFeePrice > 0) &&
        curPayWayInfo !== undefined //选择了支付方式才显示服务费
          ? true
          : false,
      key: 'serviceFee'
    },
    {
      title: <FormattedMessage id="payment.loyaltyPointsPrice" />,
      val: -checkoutStore.loyaltyPointsPrice,
      visible: checkoutStore.loyaltyPointsPrice,
      className: 'green',
      key: 'pointDiscount'
    }
  ]).filter((el) => el.visible);
  return priceList.map((item, idx) =>
    item.rowHtml ? (
      item.rowHtml
    ) : (
      <div
        key={idx}
        className={cn(`row leading-lines shipping-item`, item.className)}
      >
        <div className="col-7 start-lines">
          <p className="order-receipt-label order-shipping-cost">
            <span>{item.title}</span>
          </p>
        </div>
        <div className="col-5 end-lines">
          <p className="text-right">
            <span className="shipping-total-cost">
              <strong>
                {typeof item.val === 'number'
                  ? formatMoney(item.val)
                  : item.val}
              </strong>
            </span>
          </p>
        </div>
      </div>
    )
  );
};

export default inject(
  'configStore',
  'checkoutStore',
  'paymentStore'
)(observer(PriceDetailsList));
