import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import cn from 'classnames';
import { IMG_DEFAULT } from '@/utils/constant';
import { FrequencyMatch } from '@/components';
import { formatMoney } from '@/utils/utils';

interface Props {
  el: any; // product item details
  customContentDetail?: any; // custome JSX below product title, often used for felin's Appointment information
}

const ProductDetailItem = ({ el, customContentDetail }: Props) => {
  const isSubscription = el.goodsInfoFlag && el.goodsInfoFlag != 3;
  const renderPriceContent = () => {
    // 1.gift商品 2.是订阅状态并且是价格不一致 -> 才显示划线价
    const topContent =
      el.isGift || (isSubscription && el.salePrice !== el.subscriptionPrice)
        ? formatMoney(el.buyCount * el.salePrice)
        : null;
    // gift商品，不展示实际价格
    const endContent = el.isGift
      ? null
      : formatMoney(
          isSubscription
            ? el.buyCount * el.subscriptionPrice
            : el.buyCount * el.salePrice
        );
    return (
      <div className="line-item-total-price text-right text-nowrap">
        <p className="text-line-through">{topContent}</p>
        <p className="medium">{endContent}</p>
        {/* 订阅折扣的金额 */}
        {isSubscription ? (
          <p className="green">
            {formatMoney(
              el.buyCount * el.subscriptionPrice - el.buyCount * el.salePrice
            )}
          </p>
        ) : null}
      </div>
    );
  };
  return (
    <div className={cn('product-summary__products__item p-0 m-0')}>
      <div className="product-line-item">
        <div className="product-line-item-details d-flex flex-row">
          <div className="item-image">
            <LazyLoad>
              <img
                className="product-image"
                src={el.goodsInfoImg || el.goodsImg || IMG_DEFAULT}
                alt="product image"
              />
            </LazyLoad>
          </div>
          <div className="wrap-item-title flex justify-between">
            <div>
              <div className="item-title">
                <div
                  className="line-item-name ui-text-overflow-line2 text-break"
                  title={
                    el.displayGoodsName || el.goodsName || el.goods.goodsName
                  }
                >
                  <span className="font-medium">
                    {el.displayGoodsName || el.goodsName || el.goods.goodsName}
                  </span>
                  {el.logo}
                </div>
              </div>
              {/* 商品title下方展示什么：
            1felin，展示预约时间地点 
            2非felin，展示商品购买规格+数量；订阅周期 */}

              {customContentDetail ? (
                customContentDetail
              ) : (
                <div>
                  <p className="mb-0">
                    <FormattedMessage
                      id="quantityText"
                      values={{
                        specText: el.specText,
                        buyCount: el.goodsInfoFlag === 3 ? 1 : el.buyCount
                      }}
                    />
                  </p>
                  {el.goodsInfoFlag ? (
                    <p className="mb-0">
                      <FormattedMessage id="subscription.frequencyDelivery" />
                      <FormattedMessage id="subscription.deliveryEvery" />{' '}
                      <FrequencyMatch currentId={el.periodTypeId} />
                    </p>
                  ) : null}
                </div>
              )}
            </div>
            {renderPriceContent()}
          </div>
        </div>
        <div className="text-right">
          {el.isGift ? (
            <span
              className="text-center text-white rounded-full px-2 py-1 text-xs"
              style={{ backgroundColor: '#008900' }}
            >
              <FormattedMessage id="giftList" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailItem;
