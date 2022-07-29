import React, { useEffect, useState, useContext } from 'react';
import { getClubLogo } from '@/utils/utils';
import GoodsDetailTabs from '@/components/GoodsDetailTabs';
import { ChangeProductContext } from './index';
import InstockStatusComp from '@/components/InstockStatusComp';
import { SubDetailHeaderContext } from '../SubDetailHeader';
import { Modal, Button } from '@/components/Common';
import RelateProductList from './RecommendationListModal/RelateProductList';

const NotPetChangeProduct = () => {
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const ChangeProductValue = useContext(ChangeProductContext);
  const {
    productListLoading,
    setState,
    getDetail,
    subDetail,
    triggerShowChangeProduct,
    currentChangeProductIdx
  } = SubDetailHeaderValue;
  const {
    setMainProductDetails,
    showModalArr,
    showModal,
    initMainProduct,
    queryProductDetails,
    currentGoodsItems,
    setCurrentGoodsItems,
    showProdutctDetail
  } = ChangeProductValue;
  // console.log(subDetail?.goodsInfo?.[currentChangeProductIdx],currentChangeProductIdx, 3333)
  const subProduct = subDetail?.goodsInfo?.[currentChangeProductIdx] || {};
  console.log(subProduct, currentChangeProductIdx, 3333);
  return (
    <Modal
      headerVisible={true}
      footerVisible={false}
      visible={showModalArr[3]}
      modalTitle={''}
      close={() => {
        showModal();
      }}
    >
      {Object.keys(subProduct).length ? (
        <RelateProductList mainProduct={subProduct} />
      ) : null}
    </Modal>
  );
};

export default NotPetChangeProduct;
