import React from 'react';
import { sortPriceList, formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import PromotionCodeText from '../PromotionCodeText';
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
    freeShippingFlag
  },
  configStore
}) => {
  const priceList = sortPriceList([
    {
      key: 'totalPrice',
      val: totalPrice,
      visible: true,
      dataTestid: 'price_group_totolprice',
      title: <FormattedMessage id="total2" />
    },
    {
      key: 'consumptionTax',
      val: taxFeePrice,
      dataTestid: 'price_group_consumptiontax',
      visible: window.__.env.REACT_APP_COUNTRY === 'jp' && taxFeePrice > 0,
      title: <FormattedMessage id="order.consumptionTax" />
    },
    {
      key: 'subscriptionDiscountPrice',
      title: <FormattedMessage id="promotion" />,
      dataTestid: 'price_group_discountprice',
      val: -subscriptionDiscountPrice,
      visible: parseFloat(subscriptionDiscountPrice) > 0,
      className: 'green'
    },
    {
      key: 'promotionCode',
      dataTestid: 'price_group_promotioncode',
      rowHtml: promotionVOList?.map((el, i) => (
        <PromotionCodeText el={el} i={i} key={i} />
      )),
      visible: !isShowValidCode,
      className: 'green'
    },
    {
      key: 'deliveryPrice',
      title: <FormattedMessage id="cart.delivery" />,
      dataTestid: ' ',
      val: deliveryPrice || <FormattedMessage id="free" />,
      visible: true
    },
    {
      key: 'freeShippingDiscountPrice',
      title: <FormattedMessage id="payment.shippingDiscount" />,
      dataTestid: 'price_group_freeshipping_discountprice',
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
      dataTestid: 'price_group_estimatedtax',
      visible:
        configStore?.customTaxSettingOpenFlag &&
        configStore?.enterPriceType === 'NO_TAX'
    }
  ]).filter((el) => el.visible);
  return priceList.map((item, idx) =>
    item.rowHtml ? (
      item.rowHtml
    ) : (
      <div className={cn('row', item.className)} key={idx}>
        <div className="col-7">{item.title}</div>
        <div className="col-5 no-padding-left">
          <p
            className="text-right sub-total mb-4"
            data-testid={item.dataTestid}
          >
            {typeof item.val === 'number' ? formatMoney(item.val) : item.val}
          </p>
        </div>
      </div>
    )
  );
};

export default inject('configStore')(observer(PriceDetailsList));
