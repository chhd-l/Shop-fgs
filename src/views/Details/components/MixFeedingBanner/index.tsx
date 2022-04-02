import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import FrequencyMatch from '@/components/FrequencyMatch';
import './index.less';

interface Props {
  originalProductInfo?: any;
  mixFeedingByProductInfo?: any;
  mixFeedingForm?: any;
  addMixFeedingToCart?: any;
  btnStatus?: any;
  mixFeedingBtnLoading?: any;
}

// 只有ru hub 才在用
const MixFeedingBanner = ({
  originalProductInfo,
  mixFeedingByProductInfo,
  mixFeedingForm,
  addMixFeedingToCart,
  btnStatus,
  mixFeedingBtnLoading
}: Props) => {
  const { imageSrc, goodsTitle, technology } = originalProductInfo;
  const { buyWay, frequencyId } = mixFeedingForm;
  const lowGoodsTitle =
    mixFeedingByProductInfo.goodsTitle
      ?.toLowerCase()
      ?.split(' ')
      .join('-')
      .replace('/', '') || '';
  const LinkDetail = `${lowGoodsTitle}-${mixFeedingByProductInfo.goodsNo}`;
  console.log(lowGoodsTitle, LinkDetail);
  return (
    <div className="mix-feeding-sticky-banner">
      <div className="goods-info-warp flex items-center p-3 border-red">
        <div className="goods-info-image mr-4">
          <img src={imageSrc} />
        </div>
        <div>
          <p className="text-sm mb-1">
            {technology.value
              ? technology.value === 'dry'
                ? 'сухой корм'
                : 'Корм консервированный'
              : ''}
          </p>
          <p className="mb-0 goods-info-title">{goodsTitle}</p>
        </div>
      </div>
      <span className="rc-icon rc-plus--xs rc-iconography mx-3"></span>
      <Link to={LinkDetail}>
        <div className="goods-info-warp flex items-center p-3 cursor-pointer">
          <div className="goods-info-image mr-4">
            <img src={mixFeedingByProductInfo.imageSrc} />
          </div>
          <div>
            <p className="text-sm mb-1">
              {technology.value
                ? technology.value === 'dry'
                  ? 'Корм консервированный'
                  : 'сухой корм'
                : ''}
            </p>
            <p className="mb-0 goods-info-title">
              {mixFeedingByProductInfo.goodsTitle}
            </p>
          </div>
        </div>
      </Link>
      <div className="ml-6">
        <p className="mb-1">Получать продукт каждые:</p>
        <p className="frequency-value">
          {buyWay === 0 ? <FormattedMessage id="deliveryOneTimeOnly" /> : null}
          {buyWay === 1 || buyWay === 2 ? (
            <>
              {' '}
              <FormattedMessage id="subscription.frequencyDelivery" />
              <FormattedMessage id="subscription.deliveryEvery" />
              &nbsp;
              <span>
                <FrequencyMatch currentId={frequencyId} />
              </span>
            </>
          ) : null}
        </p>
      </div>
      <button
        className={`ml-9 rc-btn rc-btn--two rc-btn--sm ${
          btnStatus ? '' : 'rc-btn-solid-disabled'
        } ${mixFeedingBtnLoading ? 'ui-btn-loading' : ''}`}
        onClick={addMixFeedingToCart}
      >
        Добавить комплект в корзину
      </button>
    </div>
  );
};

export default MixFeedingBanner;
