import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import cn from 'classnames';
import { IMG_DEFAULT } from '@/utils/constant';
import FrequencyMatch from '@/components/FrequencyMatch';
import { formatMoney } from '@/utils/utils';

interface Props {
  el: any; // product item details
  customContentDetail?: any; // custome JSX below product title, often used for felin's Appointment information
}

const ProductDetailItem = ({ el, customContentDetail }: Props) => {
  const isSubscription = el.goodsInfoFlag && el.goodsInfoFlag != 3;
  const renderPriceContent = () => {
    // 如果不是订阅状态 或者是订阅状态并且是价格一致不显示
    let topContent =
      !isSubscription || el.salePrice === el.subscriptionPrice ? null : (
        <>
          <span className="text-line-through">
            {formatMoney(el.buyCount * el.salePrice)}
          </span>
          <br />
        </>
      );
    const endContent = formatMoney(
      isSubscription
        ? el.buyCount * el.subscriptionPrice
        : el.buyCount * el.salePrice
    );
    return (
      <div className="line-item-total-price">
        {topContent}
        <span className="medium inline-block text-nowrap">{endContent}</span>
        {/* 订阅折扣的金额 */}
        {isSubscription ? (
          <span className="green inline-block text-nowrap">
            {formatMoney(
              el.buyCount * el.subscriptionPrice - el.buyCount * el.salePrice
            )}
          </span>
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
          <div className="wrap-item-title">
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
              <div
                className={`justify-content-between d-flex align-items-center`}
              >
                <div className="line-item-total-price" style={{ width: '77%' }}>
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

                {renderPriceContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailItem;
