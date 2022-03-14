import React, { useEffect, useState, useContext } from 'react';
import {
  FormattedMessage,
  injectIntl,
  FormattedDate
} from 'react-intl-phraseapp';
import { ErrorMessage } from '@/components/Message';
import { getClubLogo, formatMoney } from '@/utils/utils';
import ProductDailyRation from './ProductDailyRation';
import { ChangeProductContext } from '../index';
import { SubDetailHeaderContext } from '../../SubDetailHeader';
const RecommendationList = ({ productDetail }) => {
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const ChangeProductValue = useContext(ChangeProductContext);
  const { productListLoading } = SubDetailHeaderValue;
  const { showProdutctDetail, errMsg } = ChangeProductValue;
  console.info('productDetailproductDetailproductDetail', productDetail);
  return (
    <>
      <ErrorMessage msg={errMsg} />
      {!!productDetail.mainProduct && (
        <>
          <div className="p-f-result-box">
            <img
              className="m-auto"
              style={{ maxWidth: '200px' }}
              src={getClubLogo({})}
              alt="club icon"
            />
            <h4 className="red text-center mb-3 mt-3">
              <FormattedMessage id="subscription.productRecommendation" />
            </h4>
            <p className=" text-center">
              <FormattedMessage id="subscription.productRecommendationTip" />
            </p>
          </div>
          <div className="p-f-result-box">
            <div className="border rounded row pt-3 pb-3">
              <div className="col-12 col-md-6">
                {/* LazyLoad在弹窗有点问题，显示不出来图片 */}
                {/* <LazyLoad style={{ height: '100%', width: '100%' }}> */}
                <img
                  src={
                    productDetail.mainProduct?.goodsImg ||
                    productDetail.mainProduct?.goodsInfos?.sort(
                      (a, b) => a.marketPrice - b.marketPrice
                    )[0]?.goodsInfoImg
                  }
                  className="p-img"
                  alt={productDetail.mainProduct?.goodsName}
                />
                {/* </LazyLoad> */}
              </div>
              <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                <header className="rc-text--center">
                  <h3
                    className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen"
                    title={productDetail.mainProduct?.goodsName}
                  >
                    {productDetail.mainProduct?.goodsName}
                  </h3>
                </header>
                <div
                  className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                  title={productDetail.mainProduct?.subTitle}
                >
                  {productDetail.mainProduct?.subTitle}
                </div>
                <ProductDailyRation
                  rations={productDetail.mainProduct?.petsRation}
                />
                <div className="text-center mt-2 card--product-contaner-price">
                  {productDetail.mainProduct?.toPrice ? (
                    <FormattedMessage
                      id="pirceRange"
                      values={{
                        fromPrice: (
                          <span className="contaner-price__value">
                            {formatMoney(productDetail.mainProduct?.fromPrice)}
                          </span>
                        ),
                        toPrice: (
                          <span className="contaner-price__value">
                            {formatMoney(productDetail.mainProduct?.toPrice)}
                          </span>
                        )
                      }}
                    />
                  ) : (
                    <span className="contaner-price__value">
                      {formatMoney(productDetail.mainProduct?.fromPrice)}
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-center mt-3 testtest">
                  <span
                    onClick={() => {
                      showProdutctDetail(productDetail.mainProduct?.spuCode);
                    }}
                    className={`rc-btn rc-btn--one rc-btn--sm ${
                      productListLoading ? 'ui-btn-loading' : ''
                    } `}
                  >
                    <FormattedMessage id="seeTheProduct" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!!productDetail.otherProducts && (
        <>
          <p className="text-center rc-margin-top--xs">
            <FormattedMessage id="productFinder.otherProductsToConsider" />
          </p>
          <div className="rc-scroll--x pb-4 rc-padding-x--xl">
            <div className="d-flex">
              {productDetail?.otherProducts?.map((ele, i) => (
                <div
                  className={`border rounded pt-3 pb-3 pl-2 pr-2 md:pl-0 md:pr-0 ${
                    i ? 'ml-2' : ''
                  }`}
                  key={ele.id}
                  style={{ flex: 1 }}
                >
                  <div className="mb-3 p-f-product-img">
                    {/* <LazyLoad style={{ height: '100%', width: '100%' }}> */}
                    <img
                      src={
                        ele.goodsImg ||
                        ele.goodsInfos?.sort(
                          (a, b) => a.marketPrice - b.marketPrice
                        )[0]?.goodsInfoImg
                      }
                      style={{ maxHeight: '12rem', margin: '0 auto' }}
                      className="p-img"
                      alt={ele.goodsName}
                    />
                    {/* </LazyLoad> */}
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <header className="rc-text--center">
                      <h3
                        className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen p-f-product-title"
                        title={ele.goodsName}
                      >
                        {ele.goodsName}
                      </h3>
                    </header>
                    <div
                      className="ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen"
                      title={ele.subTitle}
                    >
                      {ele.subTitle}
                    </div>
                    <ProductDailyRation rations={ele?.petsRation} />
                    <div className="text-center mt-2 card--product-contaner-price">
                      {ele?.toPrice ? (
                        <FormattedMessage
                          id="pirceRange"
                          values={{
                            fromPrice: (
                              <span className="contaner-price__value">
                                {formatMoney(ele?.fromPrice)}
                              </span>
                            ),
                            toPrice: (
                              <span className="contaner-price__value">
                                {formatMoney(ele?.toPrice)}
                              </span>
                            )
                          }}
                        />
                      ) : (
                        <span className="contaner-price__value">
                          {formatMoney(ele?.fromPrice)}
                        </span>
                      )}
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <span
                        onClick={() => {
                          showProdutctDetail(ele.spuCode);
                        }}
                        className={`rc-btn rc-btn--one rc-btn--sm ${
                          productListLoading ? 'ui-btn-loading' : ''
                        }`}
                      >
                        <FormattedMessage id="seeTheProduct" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <p className="details-infos d-flex">
        <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
        <FormattedMessage id="recommendProductTip" />
      </p>
    </>
  );
};
export default RecommendationList;
