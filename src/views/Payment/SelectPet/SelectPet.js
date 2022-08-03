import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PetItem from './PetItem';
import PetItemDone from './PetItemDone';
import { usePetLists } from '@/framework/pet';
import { PanelContainer } from '../Common';
import { toJS } from 'mobx';
import { searchNextConfirmPanel, isPrevReady } from '../modules/utils';
import { Button } from '@/components/Common';

const curKey = 'bindPet';

const SelectPet = ({ checkoutStore, loginStore, paymentStore, isRepay }) => {
  const { isLogin } = loginStore;
  const { isShowBindPet, cartData, loginCartData } = checkoutStore;
  const { bindPetPanelStatus, setPetSelectedIds } = paymentStore;
  usePetLists({ loginStore, paymentStore });
  const computedAuditData = (isLogin ? loginCartData : cartData).map((el) => ({
    ...el,
    goodsInfoImg: el.goodsInfoImg,
    petName: el.petName,
    buyCount: el.buyCount,
    specText: el.specText
  }));
  useEffect(() => {
    const tmpArr = new Array(computedAuditData.length);
    tmpArr.fill(-1);
    setPetSelectedIds(tmpArr);
  }, [computedAuditData.length]);

  const [showBindPetPanel, setShowBindPetPanel] = useState(false);

  // 管理panel status
  const handleClickConfirm = () => {
    // 下一个最近的未complete的panel
    const nextConfirmPanel = searchNextConfirmPanel({
      list: toJS(paymentStore.panelStatus),
      curKey
    });

    paymentStore.setStsToCompleted({ key: curKey });
    paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
  };

  const handleEditPanel = () => {
    paymentStore.setStsToEdit({
      key: curKey,
      hideOthers: true
    });
    paymentStore.setStsToCompleted({
      key: 'deliveryAddr',
      onlyGa: true
    });
  };

  useEffect(() => {
    const sts = !isRepay && isShowBindPet;
    setShowBindPetPanel(sts);
    if (!sts) {
      const isReadyPrev = isPrevReady({
        list: toJS(paymentStore.panelStatus),
        curKey
      });
      let nextConfirmPanel;
      if (isShowBindPet) {
        nextConfirmPanel = searchNextConfirmPanel({
          list: toJS(paymentStore.panelStatus),
          curKey
        });
        paymentStore.setStsToCompleted({ key: curKey });
      }

      isReadyPrev && paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
    }
  }, [isRepay, isShowBindPet]);

  return (
    <>
      {showBindPetPanel ? (
        <>
          <PanelContainer
            panelStatus={toJS(bindPetPanelStatus)}
            titleConf={{
              className: 'px-5',
              icon: {
                defaultIcon: (
                  <span className="iconfont iconPets text-xl mr-2" />
                ),
                highlighIcon: (
                  <span className="iconfont iconPets text-xl mr-2 text-red" />
                )
              },
              text: {
                title: <FormattedMessage id="payment.selectPetProfile" />
              },
              onEdit: handleEditPanel
            }}
            containerConf={{ className: 'px-0' }}
            previewJSX={
              <div className="px-5 mt-4 grid grid-cols-12">
                {computedAuditData.map((el, i) => (
                  <PetItemDone key={i} item={el} idx={i} />
                ))}
              </div>
            }
          >
            <div className="ml-custom mr-custom mt-2 mb-4 border px-4">
              {computedAuditData.map((el, i) => (
                <PetItem
                  key={i}
                  className={cn({
                    'border-t': i
                  })}
                  item={el}
                  idx={i}
                />
              ))}
              <div className="flex justify-end mb-6">
                <Button
                  type="primary"
                  className="submitBtn"
                  name="petSelectSubmit"
                  htmlType="submit"
                  onClick={handleClickConfirm}
                  // disabled={isValid && formAddressValid ? false : true}
                >
                  <FormattedMessage id="save" />
                </Button>
              </div>
            </div>
          </PanelContainer>
        </>
      ) : null}
    </>
  );
};

export default inject(
  'checkoutStore',
  'loginStore',
  'paymentStore'
)(observer(SelectPet));
