import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import cn from 'classnames';
import LazyLoad from 'react-lazyload';
import { isMobile, formatMoney } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import {
  AddItemMember as AddCartItemMember,
  AddItemsVisitor as AddCartItemsVisitor
} from '@/framework/cart';
import { Button } from '@/components/Common';

interface Props {
  visible?: boolean;
  closeModal?: any;
  mixFeedingData?: any;
  goodsInfoFlag?: any;
  periodTypeId?: any;
  isLogin?: boolean;
  clinicStore?: any;
}

interface SKUProps {
  stock?: any;
  marketPrice?: any;
  subscriptionPrice?: any;
  specText?: any;
}

const AddCartSuccessMobile = ({
  visible,
  closeModal,
  mixFeedingData,
  goodsInfoFlag,
  periodTypeId,
  isLogin,
  clinicStore
}: Props) => {
  const History = useHistory();
  const [selectedSku, setSelectedSku] = useState<SKUProps | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setSelectedSku(
      mixFeedingData?.sizeList?.filter((el: any) => el.selected)[0]
    );
    console.log('mixFeedingData', mixFeedingData);
  }, [mixFeedingData]);
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
          <section className="rc-modal__content rc-scroll--y text-center">
            <div className="rc-margin-top--md text-center">
              <span className="iconfont iconchenggong font-medium text-4xl green" />

              <p className="green">
                <FormattedMessage id="addedtoCart" />
              </p>
              {mixFeedingData && selectedSku?.stock > 0 ? (
                <div className="rc-border-all rc-border-colour--interface product-info p-3 rc-padding-bottom--none--mobile">
                  <div className="text-left mb-2">
                    <strong>???????????? ?????????????? ?????????? ?????????? ??????????????????????:</strong>
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
                      <h4
                        className="rc-gamma rc-margin--none d-md-inline-block cart-item-md__tagging_title order-2 text-left"
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
                          <div className="text-left ml-1 text-capitalize">
                            <FormattedMessage
                              id="quantityText"
                              values={{
                                specText: selectedSku?.specText,
                                buyCount: 1
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="price singlePrice text-nowrap text-left"
                        style={{ fontSize: '1.375rem' }}
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
                  </div>
                  {/* <Link
                    className="rc-btn rc-btn--two my-3"
                    style={{ fontWeight: 400 }}
                    to="/cart"
                  > */}

                  <a
                    className={`rc-btn rc-btn--two my-3 ${
                      loading ? 'ui-btn-loading' : ''
                    }`}
                    style={{ fontWeight: 400, color: '#e2001a' }}
                    onClick={async (e) => {
                      setLoading(true);
                      e.preventDefault();
                      try {
                        mixFeedingData.goodsInfoFlag = goodsInfoFlag;
                        mixFeedingData.periodTypeId = periodTypeId;
                        const param = {
                          product: mixFeedingData
                        };
                        isLogin
                          ? await AddCartItemMember({
                              param: {
                                goodsInfoId: mixFeedingData.product.goodsInfoId,
                                goodsNum: mixFeedingData.product.quantity,
                                goodsCategory: '',
                                goodsInfoFlag:
                                  mixFeedingData.product.goodsInfoFlag,
                                periodTypeId:
                                  mixFeedingData.product.periodTypeId,
                                recommendationId: clinicStore.linkClinicId,
                                recommendationName: clinicStore.linkClinicName
                              },
                              showPCMiniCartPop: false
                            })
                          : await AddCartItemsVisitor({
                              cartItemList: [
                                Object.assign(mixFeedingData, {
                                  selected: true,
                                  recommendationId: clinicStore.linkClinicId,
                                  recommendationName: clinicStore.linkClinicName
                                })
                              ],
                              showPCMiniCartPop: false
                            });
                        History.push('/cart');
                      } catch {
                        setLoading(false);
                      }
                    }}
                  >
                    <FormattedMessage id="goToCart" />
                  </a>
                  {/* </Link> */}
                </div>
              ) : null}

              <DistributeHubLinkOrATag
                href=""
                to="/"
                style={{ color: '#666', fontWeight: 400 }}
              >
                <FormattedMessage id="continueMyPurchases" />
              </DistributeHubLinkOrATag>
              <p>
                <FormattedMessage id="or" />
              </p>
            </div>
            <Link to="/cart">
              <Button type="primary" style={{ fontWeight: 400 }}>
                <FormattedMessage id="goToCart" />
              </Button>
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
export default inject('clinicStore')(observer(AddCartSuccessMobile));
