import React, { useEffect, useState, useContext } from 'react';
import { getClubLogo } from '@/utils/utils';
import { ChangeProductContext } from './index';
import { InstockStatusComp, GoodsDetailTabs } from '@/components';
import { SubDetailHeaderContext } from '../SubDetailHeader';

const GoodsDetails = () => {
  const ChangeProductValue = useContext(ChangeProductContext);
  const { details, goodsDetails } = ChangeProductValue;
  const productStock = details?.goodsInfos?.some((el) => el.stock);
  return (
    <div
      className="margin12 product_detail rc-padding-x--md"
      style={{ maxHeight: '60vh' }}
    >
      <div>
        <img
          className="m-auto"
          style={{ maxWidth: '100px' }}
          src={getClubLogo({})}
          alt="club icon"
        />
        <div className="rc-layout-container rc-five-column">
          <div className="rc-column  rc-header__center d-flex">
            {/* <LazyLoad> */}
            <img
              src={details.goodsImg}
              style={{ maxHeight: '12rem' }}
              alt={details.goodsName}
            />
            {/* </LazyLoad> */}
          </div>
          <div className="rc-column rc-double-width">
            <div className="title rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen rc-margin-top--md">
              {details.goodsName}
            </div>
            {/* <div className="sub_title">{details.goodsSubtitle}</div> */}
            <div>
              <div className="block">
                <p className="content rc-scroll--x mb-3">
                  {details.goodsSubtitle}
                </p>
              </div>
              <InstockStatusComp
                status={productStock}
                className="subscription-stock"
              />
            </div>
          </div>
        </div>
      </div>
      {goodsDetails?.goods?.goodsId && (
        <GoodsDetailTabs detailRes={goodsDetails} />
      )}
    </div>
  );
};

export default GoodsDetails;
