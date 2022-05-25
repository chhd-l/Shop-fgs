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
  // 折扣价是否显示
  let freeShippingDiscountPriceVisible = freeShippingFlag;
  // 如果是日本 并且折扣价为0 不显示
  if (
    window.__.env.REACT_APP_COUNTRY === 'jp' &&
    freeShippingDiscountPrice === 0
  ) {
    freeShippingDiscountPriceVisible = false;
  }

  const priceList = sortPriceList([
    {
      key: 'totalPrice',
      val: totalPrice,
      visible: true,
      title: <FormattedMessage id="total" />
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
      visible: freeShippingDiscountPriceVisible,
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
  return (
    <div className="py-2 md:px-4">
      <div className="row mt-2 text-left">
        {priceList.map((item, idx) =>
          item.rowHtml ? (
            item.rowHtml
          ) : (
            <Fragment key={idx}>
              <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
              <div className={cn('col-6 col-md-2 mb-2', item.className)}>
                {item.title}
              </div>
              <div
                className={cn(
                  'col-6 col-md-3 text-right text-nowrap',
                  item.className
                )}
              >
                {typeof item.val === 'number'
                  ? formatMoney(item.val)
                  : item.val}
              </div>
            </Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default inject('configStore')(observer(PriceDetailsList));
