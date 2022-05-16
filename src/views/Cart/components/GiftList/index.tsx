import React from 'react';
import OneOffSelection from '../OneOffSelection';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { getDeviceType } from '@/utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const GiftList = ({ pitem }: { pitem: any }) => {
  const listJsx = pitem?.isHidden?<></>:(
    <div className="product-info">
      <div
        className={`rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile
            ${'has-margin-bottom'}`}
      >
        <div
          className="rc-input rc-input--inline position-absolute hidden"
          style={{ left: '1%' }}
        >
          <input
            type="checkbox"
            className="rc-input__checkbox"
            checked={pitem.selected}
            name="selected"
          />
          <label className="rc-input__label--inline">&nbsp;</label>
        </div>
        <div className="d-flex">
          <div
            className="product-info__img mr-2"
            style={{ overflow: 'hidden' }}
          >
            <LazyLoad>
              <img
                className="w-100"
                src={pitem.goodsInfoImg}
                alt={pitem.goodsInfoName}
                title={pitem.goodsInfoName}
              />
            </LazyLoad>
          </div>
          <div
            className="product-info__desc ui-text-overflow-line2 ui-text-overflow-md-line1 relative"
            style={{ flex: 1 }}
          >
            <Link
              className="ui-cursor-pointer rc-margin-top--xs rc-padding-right--sm  align-items-md-center flex-column flex-md-row"
              to={`/${pitem.goodsInfoName
                .toLowerCase()
                .split(' ')
                .join('-')
                .replace('/', '')}`}
              // -${pitem.goods.goodsNo}
              style={{ marginTop: '0' }}
            >
              <h4
                className="rc-gamma rc-margin--none ui-text-overflow-line2 ui-text-overflow-md-line1 d-md-inline-block cart-item-md__tagging_title order-2"
                title={pitem.goodsInfoName}
              >
                {pitem.goodsInfoName}
              </h4>
              {pitem.taggingForImage?.taggingImgUrl ? (
                <LazyLoad className="order-1 md:order-3">
                  <img
                    src={pitem.taggingForImage?.taggingImgUrl}
                    className="cart-item__tagging_image ml-2"
                    alt="tagging image"
                  />
                </LazyLoad>
              ) : null}
            </Link>
            <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
              <div
                style={{
                  maxWidth: '250px',
                  width: isMobile ? '9rem' : 'inherit'
                }}
              >
                <div className="align-left flex">
                  <div className="stock" style={{ margin: '.5rem 0 -.4rem' }}>
                    <label
                      className={[
                        'availability',
                        pitem.addedFlag && pitem.buyCount <= pitem.stock
                          ? 'instock'
                          : 'outofstock'
                      ].join(' ')}
                    >
                      <span className="title-select"></span>
                    </label>
                    <span
                      className="availability-msg"
                      style={{ display: 'inline-block' }}
                    >
                      <div
                        className={[
                          pitem.addedFlag && pitem.buyCount <= pitem.stock
                            ? ''
                            : 'out-stock'
                        ].join(' ')}
                      >
                        {pitem.addedFlag && pitem.buyCount <= pitem.stock ? (
                          <FormattedMessage id="details.inStock" />
                        ) : pitem.addedFlag ? (
                          <FormattedMessage id="details.outStock" />
                        ) : (
                          <FormattedMessage id="details.OffShelves" />
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="cart-quantity-container">
                <div className="product-card-footer product-card-price d-flex">
                  <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                    <div>
                      <FormattedMessage id="quantity" />:{' '}
                    </div>
                    <div className="rc-quantity d-flex rc-content-v-middle">
                      <input
                        className="rc-quantity__input"
                        value={pitem.buyCount}
                        min="1"
                        max="10"
                        disabled
                        name="buyCount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`buyMethodBox ${
            pitem.subscriptionStatus && pitem.subscriptionPrice
              ? 'rc-column'
              : ''
          }`}
        >
          <div className="rc-column">
            <OneOffSelection isGift={false} pitem={pitem} isLogin={true} />
          </div>
        </div>
      </div>
    </div>
  );
  return listJsx
};

export default GiftList;
