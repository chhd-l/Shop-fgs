import React, { Fragment } from 'react';
import { sortPriceList, formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
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
      title: <FormattedMessage id="subscription.total" />
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
    ...promotionVOList.map((d) => ({
      title: d.marketingName,
      val: -d.discountPrice,
      visible: true,
      className: 'green',
      key: 'promotionCode'
    })),
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
      visible: loyaltyPointsPrice,
      className: 'green',
      key: 'pointDiscount'
    }
  ]).filter((el) => el.visible);
  return priceList.map((item, idx) =>
    item.rowHtml ? (
      item.rowHtml
    ) : (
      <div className={cn('row', item.className)} key={idx}>
        <label className="col-6 text-left ui-text-overflow-line1">
          {item.title}
        </label>
        <div className="col-6 text-right">
          <strong>
            {typeof item.val === 'number' ? formatMoney(item.val) : item.val}
          </strong>
        </div>
      </div>
    )
  );
};

export default inject('configStore')(observer(PriceDetailsList));
