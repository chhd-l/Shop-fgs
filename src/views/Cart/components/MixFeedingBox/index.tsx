import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import cn from 'classnames';
import LazyLoad from 'react-lazyload';
import {
  getDeviceType,
  formatMoney,
  addToUnloginCartData,
  addToLoginCartData
} from '@/utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const MixFeedingBox = function ({
  mixFeedingData,
  goodsInfoFlag,
  periodTypeId,
  isLogin,
  update,
  beforeUpdate
}) {
  const History = useHistory();
  const Intl = useIntl();
  const [selectedSku, setSelectedSku] = useState(null);
  const [quantity, setQuantity] = useState(mixFeedingData.quantity);
  const [isInStock, setIsInStock] = useState(true);

  const hanldeAmountChange = (type) => {
    if (!type) return;
    let res;
    if (type === 'minus') {
      if (quantity <= 1) {
        res = 1;
      } else {
        res = quantity - 1;
      }
    } else {
      res = (quantity || 0) + 1;
      if (quantity >= window.__.env.REACT_APP_LIMITED_NUM) {
        res = window.__.env.REACT_APP_LIMITED_NUM;
      }
    }
    setQuantity(res);
  };

  const handleAmountInput = (e) => {
    // this.setState({ checkOutErrMsg: '' });
    const quantityMinLimit = 1;
    const val = e.target.value;
    if (val === '') {
      setQuantity(val);
    } else {
      let tmp = parseInt(val);
      if (isNaN(tmp)) {
        tmp = 1;
      }
      if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit;
      }
      if (tmp > window.__.env.REACT_APP_LIMITED_NUM) {
        tmp = window.__.env.REACT_APP_LIMITED_NUM;
      }
      setQuantity(tmp);
    }
  };
  const updateInstockStatus = () => {
    setIsInStock(quantity <= selectedSku.stock);
  };

  useEffect(() => {
    if (quantity && selectedSku) {
      updateInstockStatus();
    }
  }, [quantity]);
  useEffect(() => {
    console.log('mixFeedingData', mixFeedingData);
  });

  useEffect(() => {
    setSelectedSku(mixFeedingData?.sizeList?.filter((el) => el.selected)[0]);
    setQuantity(mixFeedingData.quantity);
  }, [mixFeedingData]);

  useEffect(() => {
    if (selectedSku) {
      updateInstockStatus();
    }
  }, [selectedSku]);
  return (
    <div>
      {mixFeedingData ? (
        <div
          className="rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile"
          style={{ borderColor: '#ee8b10' }}
        >
          <div className="text-left mb-2">
            <strong>Вашему питомцу могут также понравиться:</strong>
          </div>
          <div className="d-flex">
            <div
              className="product-info__img mr-2"
              style={{ overflow: 'hidden', width: '100px' }}
            >
              <LazyLoad>
                <img
                  className="w-100"
                  src={mixFeedingData.goodsImg}
                  alt={mixFeedingData.goodsName}
                  title={mixFeedingData.goodsName}
                />
              </LazyLoad>
            </div>
            <div
              className="product-info__desc ui-text-overflow-line2 ui-text-overflow-md-line1 relative"
              style={{ flex: 1 }}
            >
              <Link
                className="ui-cursor-pointer rc-margin-top--xs rc-padding-right--sm  align-items-md-center flex-column flex-md-row"
                to={`/${mixFeedingData.goodsName
                  .toLowerCase()
                  .split(' ')
                  .join('-')
                  .replace('/', '')}-${mixFeedingData.goods.goodsNo}`}
                style={{ marginTop: '0' }}
              >
                <div className="d-flex">
                  <h4
                    className="rc-gamma rc-margin--none ui-text-overflow-line2 ui-text-overflow-md-line1 d-md-inline-block text-left"
                    style={{ flex: 1 }}
                    title={mixFeedingData.goodsName}
                  >
                    {mixFeedingData.goodsName}
                  </h4>
                </div>
              </Link>
              <div className="d-flex">
                <div className="align-left flex" style={{ flex: 1 }}>
                  <div className="stock__wrapper">
                    <div className="stock">
                      <label
                        className={[
                          'availability',
                          mixFeedingData.addedFlag && isInStock
                            ? 'instock'
                            : 'outofstock'
                        ].join(' ')}
                      >
                        <span className="title-select">
                          {/* <FormattedMessage id="details.availability" /> : */}
                        </span>
                      </label>
                      <span
                        className="availability-msg"
                        style={{ display: 'inline-block' }}
                      >
                        <div
                          className={[
                            mixFeedingData.addedFlag && isInStock
                              ? ''
                              : 'out-stock'
                          ].join(' ')}
                        >
                          {mixFeedingData.addedFlag && isInStock ? (
                            <FormattedMessage id="details.inStock" />
                          ) : mixFeedingData.addedFlag ? (
                            <FormattedMessage id="details.outStock" />
                          ) : (
                            <FormattedMessage id="details.OffShelves" />
                          )}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="price singlePrice text-nowrap text-left mr-4"
                  style={{ fontSize: '1.5rem' }}
                >
                  <strong>
                    {formatMoney(
                      !goodsInfoFlag
                        ? selectedSku?.marketPrice
                        : selectedSku?.subscriptionPrice
                    )}
                  </strong>
                </div>
              </div>
              <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
                <div
                  style={{
                    maxWidth: '250px',
                    width: isMobile ? '9rem' : 'inherit'
                  }}
                >
                  <div id="choose-select" className="spec-choose-select">
                    <div data-attr="size" className="swatch">
                      <div className="cart-and-ipay">
                        <div className="rc-swatch __select-size">
                          {mixFeedingData.goodsSpecs &&
                            mixFeedingData.goodsSpecs.map((sItem, i) => (
                              <div key={i} className="overflow-hidden">
                                <div className="text-left ml-1 text-capitalize rc-margin-bottom--xs">
                                  {sItem.specName}:
                                </div>
                                {sItem.chidren
                                  .filter((el) => el.selected)
                                  .map((sdItem, i2) => (
                                    <div
                                      style={{ display: 'initial' }}
                                      className={`rc-swatch__item selected`}
                                      key={i2}
                                    >
                                      <span key={i2}>{sdItem.detailName}</span>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart-quantity-container">
                  <div className="product-card-footer product-card-price d-flex">
                    <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-padding-right--xs mr-auto">
                      <div className="rc-margin-bottom--xs">
                        <FormattedMessage id="quantity" />:{' '}
                      </div>
                      <div className="rc-quantity d-flex">
                        <span
                          className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                          onClick={() => {
                            hanldeAmountChange('minus');
                          }}
                        />
                        <input
                          className="rc-quantity__input"
                          value={quantity}
                          min="1"
                          max="10"
                          onChange={(e) => handleAmountInput(e)}
                        />
                        <span
                          className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                          data-quantity-error-msg="Вы не можете заказать больше 10"
                          onClick={() => {
                            hanldeAmountChange('plus');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    className={`rc-btn rc-btn--two mt-4 ${
                      !isInStock ? 'rc-btn-solid-disabled' : ''
                    }`}
                    style={{ fontWeight: 400, color: '#e2001a' }}
                    onClick={async (e) => {
                      if (!isInStock) {
                        return false;
                      }
                      beforeUpdate();
                      e.preventDefault();
                      let copyData = { ...mixFeedingData };
                      copyData.goodsInfoFlag = goodsInfoFlag;
                      copyData.periodTypeId = periodTypeId;
                      copyData.quantity = quantity;
                      console.log('copyData', copyData);
                      const param = {
                        product: copyData,
                        intl: Intl
                      };
                      isLogin
                        ? await addToLoginCartData(param)
                        : await addToUnloginCartData(param);
                      update();
                    }}
                  >
                    <FormattedMessage id="goToCart" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MixFeedingBox;
