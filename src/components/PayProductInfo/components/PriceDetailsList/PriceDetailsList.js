import React from 'react';
import { sortPriceList, formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import PromotionCodeText from '@/views/Payment/PayProductInfo/components/promotionCodeText';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
const COUNTRY = window.__.env.REACT_APP_COUNTRY;

const PriceDetailsList = ({
  data: {
    totalPrice,
    taxFeePrice,
    subscriptionDiscountPrice,
    promotionVOList,
    deliveryPrice,
    freeShippingDiscountPrice,
    freeShippingFlag,
    installMentAdditionalFee,
    isShowInstallMent,
    serviceFeePrice,
    loyaltyPointsPrice
  },
  configStore
}) => {
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
      visible: true,
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
      val: installMentAdditionalFee,
      className: 'red',
      visible: isShowInstallMent,
      key: 'installMentAdditionalFee'
    },
    {
      title: <FormattedMessage id="payment.serviceFee" />,
      val: serviceFeePrice,
      visible:
        configStore?.info?.serviceFeeFlag &&
        COUNTRY == 'jp' &&
        Number(serviceFeePrice) >= 0
          ? true
          : false,
      key: 'serviceFee'
    },
    {
      title: <FormattedMessage id="payment.loyaltyPointsPrice" />,
      val: -loyaltyPointsPrice,
      className: 'green',
      visible: loyaltyPointsPrice,
      key: 'pointDiscount'
    }
  ]).filter((el) => el.visible);
  return priceList.map((item, idx) =>
    item.rowHtml ? (
      item.rowHtml
    ) : (
      <div
        className={cn('row leading-lines subtotal-item', item.className)}
        key={idx}
      >
        <div className="col-8 start-lines">
          <p className="order-receipt-label">
            <span>{item.title}</span>
          </p>
        </div>
        <div className="col-4 end-lines">
          <p className="text-right">
            <span className="sub-total">
              {typeof item.val === 'number' ? formatMoney(item.val) : item.val}
            </span>
          </p>
        </div>
      </div>
    )
  );
};

export default inject('configStore')(observer(PriceDetailsList));
