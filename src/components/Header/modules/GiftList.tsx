import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { formatMoney, optimizeImage } from '@/utils/utils';
import React from 'react';
import LazyLoad from 'react-lazyload';

const GiftList = ({ data }: { data: any }) => {
  //不显示Leaflet的gift
  let listJsx = data?.isHidden ? (
    <></>
  ) : (
    <div className="minicart__product" key={data.goodsInfoId}>
      <div>
        <div className="product-summary__products__item pb-0">
          <div className="product-line-item">
            <div className="product-line-item-details d-flex flex-row">
              <div className="item-image">
                <LazyLoad>
                  <img
                    className="product-image"
                    src={optimizeImage({ originImageUrl: data.goodsInfoImg })}
                    alt={data.goodsInfoName}
                    title={data.goodsInfoName}
                  />
                </LazyLoad>
              </div>
              <div className="wrap-item-title">
                <div className="item-title">
                  <div
                    className="line-item-name ui-text-overflow-line2 text-break"
                    title={data.goodsInfoName}
                  >
                    <span className="light">{data.goodsInfoName}</span>
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <div className="line-item-total-price justify-content-start pull-left">
                    <div className="item-attributes">
                      <p className="line-item-attributes">
                        <FormattedMessage
                          id="minicart.quantityText"
                          values={{
                            specText: data.specText || '',
                            buyCount: data.buyCount
                          }}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="line-item-total-price justify-content-end pull-right priceBox">
                    <div className="item-total-07984de212e393df75a36856b6 price relative">
                      <div className="strike-through non-adjusted-price">
                        null
                      </div>
                      <b
                        className="pricing line-item-total-price-amount item-total-07984de212e393df75a36856b6 light"
                        style={{ color: '#666' }}
                      >
                        {formatMoney(data.salePrice * data.buyCount)}
                      </b>
                    </div>
                  </div>
                </div>
                {/* <p className="text-right red mb-0">Gift Promotion</p> */}
                <p className="text-right red mb-0">
                  <FormattedMessage id="giftList" />
                </p>
              </div>
            </div>
            <div className="item-options" />
            <div className="line-item-promo item-07984de212e393df75a36856b6" />
          </div>
        </div>
      </div>
    </div>
  );
  return listJsx;
};

export default GiftList;
