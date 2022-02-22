import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PetModal from '../PetModal';
import PetItem from './PetItem';
import { usePetLists } from '@/framework/pet';
import { PanelContainer } from '../Common';
import { toJS } from 'mobx';
import { searchNextConfirmPanel, isPrevReady } from '../modules/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;

const SelectPet = ({
  checkoutStore,
  loginStore,
  paymentStore,
  recommend_data,
  isRepay
}) => {
  const { isLogin } = loginStore;
  const { autoAuditFlag, petFlag, AuditData, loginCartData } = checkoutStore;
  const { bindPetPanelStatus } = paymentStore;
  const {} = usePetLists({ loginStore, paymentStore });
  const computedAuditData = isLogin
    ? AuditData.map((el) => ({
        ...el,
        goodsInfoImg: el.goodsInfoImg,
        petName: el.petName,
        buyCount: el.buyCount,
        specText: el.specText
      }))
    : AuditData.map((el) => {
        const selectedSizeItem = el.sizeList.filter((item) => item.selected)[0];
        return {
          ...el,
          goodsInfoImg: selectedSizeItem.goodsInfoImg,
          petName: el?.petForm?.petName,
          buyCount: el.quantity,
          specText: selectedSizeItem.specText || ''
        };
      });
  const isShowBindPet =
    autoAuditFlag && petFlag && computedAuditData.length > 0;

  const [petModalVisible, setPetModalVisible] = useState(false);
  const [currentProIndex, setCurrentProIndex] = useState(-1);
  const [isAdd, setIsAdd] = useState(0);

  const handleClickConfirm = () => {
    confirmToNextPanel();
  };
  const curKey = 'bindPet';
  const confirmToNextPanel = () => {
    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey
    });

    paymentStore.setStsToCompleted({ key: curKey });
    paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
  };

  const openNew = () => {
    setIsAdd(1);
    openPetModal();
  };

  const openPetModal = () => {
    setPetModalVisible(true);
  };

  const closeNew = () => {
    setIsAdd(2);
    openPetModal();
  };

  const closePetModal = () => {
    if (isAdd === 2) {
      setIsAdd(0);
    }
    setPetModalVisible(false);
  };

  const petComfirm = (data) => {
    if (!isLogin) {
      AuditData[currentProIndex].petForm = data;
    } else {
      let handledData;
      AuditData.map((el, i) => {
        if (i === currentProIndex) {
          if (sessionItemRoyal.get('recommend_product')) {
            handledData = recommend_data.map((recomEl) => {
              if (recomEl.goodsInfoId === el.goodsInfoId) {
                recomEl.petsId = data.value;
                recomEl.petsName = data.name;
                el.petsId = data.value;
                el.petName = data.name;
              }
              return recomEl;
            });
          } else {
            handledData = loginCartData.map((loginEl) => {
              if (loginEl.goodsInfoId === el.goodsInfoId) {
                loginEl.petsId = data.value;
                loginEl.petsName = data.name;
                el.petsId = data.value;
                el.petName = data.name;
              }
              return loginEl;
            });
          }
        }
        return el;
      });
      if (sessionItemRoyal.get('recommend_product')) {
        updateRecommendData(handledData);
      } else {
        checkoutStore.setLoginCartData(handledData);
      }
    }
    closePetModal();
  };

  return (
    <>
      {!isRepay && isShowBindPet ? (
        <>
          <PanelContainer
            panelStatus={bindPetPanelStatus}
            titleConf={{
              className: 'px-5',
              icon: {
                defaultIcon: <span className="iconfont iconPets text-lg" />,
                highlighIcon: (
                  <span className="iconfont iconPets text-lg text-red" />
                )
              },
              text: {
                title: <FormattedMessage id="payment.selectPetProfile" />
              },
              onEdit: () => {}
            }}
            containerConf={{ className: 'px-0' }}
            previewJSX={<div></div>}
          >
            <div className="ml-custom mr-custom mt-2 mb-4 border px-4">
              {computedAuditData.map((el, i) => {
                return (
                  <PetItem
                    key={i}
                    className={cn({
                      'border-t': i
                    })}
                    item={el}
                    idx={i}
                  />
                );
              })}
              <div className="flex justify-end mb-6">
                <button
                  className="rc-btn rc-btn--one submitBtn"
                  name="petSelectSubmit"
                  type="submit"
                  onClick={handleClickConfirm}
                  // disabled={isValid && formAddressValid ? false : true}
                >
                  <FormattedMessage id="save" />
                </button>
              </div>
            </div>
          </PanelContainer>
        </>
      ) : null}
      <PetModal
        visible={petModalVisible}
        isAdd={isAdd}
        openNew={openNew}
        closeNew={closeNew}
        confirm={petComfirm}
        close={closePetModal}
      />
    </>
  );
};

export default inject(
  'checkoutStore',
  'loginStore',
  'paymentStore'
)(observer(SelectPet));
