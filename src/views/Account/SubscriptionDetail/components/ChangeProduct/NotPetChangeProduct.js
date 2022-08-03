import React, { useEffect, useState, useContext } from 'react';
import { ChangeProductContext } from './index';
import { Modal, Button } from '@/components/Common';
import RelateProductList from './RecommendationListModal/RelateProductList';

const NotPetChangeProduct = () => {
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const ChangeProductValue = useContext(ChangeProductContext);
  const { subDetail, currentChangeProductIdx } = SubDetailHeaderValue;
  const { showModalArr, showModal } = ChangeProductValue;
  const subProduct = subDetail?.goodsInfo?.[currentChangeProductIdx] || {};
  return (
    <div className="not-pet-list-modal">
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
    </div>
  );
};

export default NotPetChangeProduct;
