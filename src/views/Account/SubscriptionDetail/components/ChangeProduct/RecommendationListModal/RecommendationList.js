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
const RecommendationList = ({ productDetail, goMoreProducts }) => {
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const ChangeProductValue = useContext(ChangeProductContext);
  const { productListLoading } = SubDetailHeaderValue;
  const { showProdutctDetail, errMsg } = ChangeProductValue;
  const boxWidth =
    productDetail.otherProducts.length > 0
      ? productDetail.otherProducts.length * 280
      : 280;
  return (
    <>
      <ErrorMessage msg={errMsg} />
      {!!productDetail.mainProduct && (
        <>
          <div className="m-auto w-11/12 md:w-3/6">
            <img
              className="m-auto w-32"
              style={{ maxWidth: '168px' }}
              src={getClubLogo({})}
              alt="club icon"
            />
            <h4 className="red text-center mb-3 mt-6 text">
              <FormattedMessage id="subscription.productRecommendation" />
            </h4>
            <p className="mb-3 text-center">
              <FormattedMessage id="subscription.productRecommendationTip" />
            </p>
          </div>
          <div className="md:w-1/2 m-auto w-3/4">
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
                    className={`rc-btn rc-btn--two rc-btn--sm ${
                      productListLoading ? 'ui-btn-loading' : ''
                    } `}
                  >
                    <FormattedMessage id="seeTheProduct" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5  text-center">
            <span
              onClick={goMoreProducts}
              className="red text-base md:text-lg font-medium cursor-pointer"
            >
              <FormattedMessage id="subscription.viewMoreProducts" />
              <svg
                style={{ color: '#767676', display: 'inline' }}
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
            </span>
          </div>
        </>
      )}
      {!!productDetail.otherProducts && (
        <>
          <p className="text-center mt-6 md:mt-12 mb-3 red text-lg md:text-2xl">
            <FormattedMessage id="productFinder.otherProductsToConsider" />
          </p>
          <div className="rc-scroll--x pb-4 px-1 md:px-40">
            <div className="d-flex" style={{ width: boxWidth }}>
              {productDetail?.otherProducts?.map((ele, i) => (
                <div
                  className={`border rounded pt-3 pb-3 pl-2 pr-2 md:pl-0 md:pr-0 w-72 ${
                    i ? 'ml-3' : ''
                  }`}
                  key={ele.id}
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
                    <header className="rc-text--center px-1">
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
                        className={`rc-btn rc-btn--two rc-btn--sm ${
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
