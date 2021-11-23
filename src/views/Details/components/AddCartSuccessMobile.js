import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import cn from 'classnames';
import LazyLoad from 'react-lazyload';
import { getDeviceType } from '@/utils/utils';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const AddCartSuccessMobile = ({ visible, closeModal, mixFeedingData }) => {
  console.log('mixFeedingData,', mixFeedingData);
  if (!mixFeedingData) {
    mixFeedingData = {};
  }
  return (
    <>
      <aside role="modal" className={cn('rc-modal', { 'rc-hidden': !visible })}>
        <div className="rc-modal__container">
          <header className="rc-modal__header">
            <button
              className="rc-btn rc-icon rc-btn--icon-label rc-modal__close rc-close--xs rc-iconography"
              onClick={closeModal}
            >
              <FormattedMessage id="close" />
            </button>
          </header>
          <section
            className="rc-modal__content rc-scroll--y"
            style={{ textAlign: 'center' }}
          >
            <div className="rc-margin-top--md" style={{ textAlign: 'center' }}>
              <svg
                t="1607498763458"
                className="icon"
                style={{
                  width: '35px',
                  height: '35px',
                  marginBottom: '1.25rem'
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2968"
                width="200"
                height="200"
              >
                <path
                  d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM512 960c-249.6 0-448-204.8-448-448 0-249.6 204.8-448 448-448 249.6 0 448 198.4 448 448C960 761.6 761.6 960 512 960zM691.2 339.2 454.4 576 332.8 454.4c-19.2-19.2-51.2-19.2-76.8 0C243.2 480 243.2 512 262.4 531.2l153.6 153.6c19.2 19.2 51.2 19.2 70.4 0l51.2-51.2 224-224c19.2-19.2 25.6-51.2 0-70.4C742.4 320 710.4 320 691.2 339.2z"
                  p-id="2969"
                  fill="#47b800"
                />
              </svg>
              <p style={{ color: '#5cae2a' }}>
                <FormattedMessage id="addedtoCart" />
              </p>

              <div className="rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile">
                <div className="text-left mb-2">
                  <strong>Общая стоимость Общая стоимость:</strong>
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
                    {/* <Link
                  className="ui-cursor-pointer rc-margin-top--xs rc-padding-right--sm  align-items-md-center flex-column flex-md-row"
                  to={`/${mixFeedingData.goodsName
                    ?.toLowerCase()
                    .split(' ')
                    .join('-')
                    .replace('/', '')}-${mixFeedingData.goods?.goodsNo}`}
                  style={{ marginTop: '0' }}
                > */}
                    <h4
                      className="rc-gamma rc-margin--none ui-text-overflow-line2 ui-text-overflow-md-line1 d-md-inline-block cart-item-md__tagging_title order-2 text-left"
                      title={mixFeedingData.goodsName}
                    >
                      {mixFeedingData.goodsName}
                    </h4>
                    {/* </Link> */}
                    <div className="product-edit rc-margin-top--sm--mobile rc-margin-bottom--xs rc-padding--none rc-margin-top--xs d-flex flex-column flex-sm-row justify-content-between">
                      <div
                        style={{
                          maxWidth: '250px',
                          width: isMobile ? '9rem' : 'inherit'
                        }}
                      >
                        {/* <div className="productGoodsSubtitle">
                    {mixFeedingData.goods.goodsSubtitle}
                  </div> */}
                        <div className="align-left flex">
                          <div
                            className="stock"
                            style={{ margin: '.5rem 0 -.4rem' }}
                          >
                            <label
                              className={[
                                'availability',
                                mixFeedingData.addedFlag &&
                                mixFeedingData.buyCount <= mixFeedingData.stock
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
                                  mixFeedingData.addedFlag &&
                                  mixFeedingData.buyCount <=
                                    mixFeedingData.stock
                                    ? ''
                                    : 'out-stock'
                                ].join(' ')}
                              >
                                {mixFeedingData.addedFlag &&
                                mixFeedingData.buyCount <=
                                  mixFeedingData.stock ? (
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
                    </div>
                  </div>
                </div>
              </div>

              <DistributeHubLinkOrATag
                href=""
                to="/home"
                style={{ color: '#666', fontWeight: 400 }}
              >
                <FormattedMessage id="continueMyPurchases" />
              </DistributeHubLinkOrATag>
              <p>
                <FormattedMessage id="or" />
              </p>
            </div>
            <Link
              className="rc-btn rc-btn--one"
              style={{ fontWeight: 400 }}
              to="/cart"
            >
              <FormattedMessage id="goToCart" />
            </Link>
          </section>
        </div>
      </aside>
      <div
        className={cn('rc-shade', { 'rc-hidden': !visible })}
        onClick={closeModal}
      />
    </>
  );
};
export default AddCartSuccessMobile;
