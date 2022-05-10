import React from 'react';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import { formatMoney } from '@/utils/utils';

const GiftList = ({ pitem }: { pitem: any }) => {
  //Leaflet的gift不显示
  let listJsx = pitem?.isHidden ? <></> : (
    <div className="product-summary__products__item">
      <div className="product-line-item">
        <div className="product-line-item-details d-flex flex-row">
          <div className="item-image">
            <LazyLoad>
              <img
                className="product-image"
                src={pitem.goodsInfoImg || IMG_DEFAULT}
                alt={pitem.goodsInfoName}
              />
            </LazyLoad>
          </div>
          <div className="wrap-item-title">
            <div className="item-title">
              <div
                className="line-item-name ui-text-overflow-line2 text-break"
                title={pitem.goodsInfoName}
              >
                <span className="light">{pitem.goodsInfoName}</span>
                {/* {pitem?.goods?.promotions &&
                pitem?.goodsInfoFlag > 0 &&
                pitem.goods.promotions.includes('club') ? (
                  <img
                    className="clubLogo"
                    src={getClubLogo({})}
                    alt="club logo"
                  />
                ) : null} */}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="line-item-total-price" style={{ width: '77%' }}>
                <p className="mb-0">
                  <FormattedMessage
                    id="quantityText"
                    values={{
                      specText: pitem.specText || '',
                      buyCount: pitem.buyCount
                    }}
                  />
                </p>
              </div>
              <div className="line-item-total-price text-nowrap">
                <span>{formatMoney(pitem.buyCount * pitem.salePrice)}</span>
              </div>
            </div>
            {/* <p className="text-right red mb-0">Gift Promotion</p> */}
            <p className="text-right red mb-0">
              <FormattedMessage id="giftList" />
            </p>
          </div>
        </div>
      </div>
      <div className="item-options" />
    </div>
  )
  return listJsx
};

export default GiftList;
