import React, { useEffect, useState, useContext } from 'react';
import {
  FormattedMessage,
  injectIntl,
  FormattedDate
} from 'react-intl-phraseapp';
import RecommendationList from './RecommendationList';
import { findPetProductForClub } from '@/api/subscription';
import { getRation, getClubLogo } from '@/utils/utils';
import Modal from '@/components/Modal';
import { ChangeProductContext } from '../index';
import { SubDetailHeaderContext } from '../../SubDetailHeader';
const RecommendationListModal = ({ intl }) => {
  const [productDetail, setProductDetail] = useState({});
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const ChangeProductValue = useContext(ChangeProductContext);
  const { triggerShowChangeProduct, setState, productListLoading, subDetail } =
    SubDetailHeaderValue;
  const {
    setMainProductDetails,
    showModalArr,
    showModal,
    initMainProduct,
    queryProductDetails,
    currentGoodsItems,
    setCurrentGoodsItems
  } = ChangeProductValue;
  let timer = null;
  const queryProductList = async (els, cb) => {
    try {
      setState({ productListLoading: true });
      if (els) {
        setCurrentGoodsItems([...els]);
      }
      if (productDetail?.mainProduct) {
        cb && cb();
        return;
      }
      let { petsId } = subDetail;
      if (!petsId) {
        return;
      }
      let res = await findPetProductForClub({ petsId, apiTree: 'club_V2' });
      let mainProduct = res.context.mainProduct;
      let otherProducts = res.context.otherProducts;
      // let mainProduct =  undefined
      // let otherProducts = [] //test

      let currentItems =
        (currentGoodsItems?.length ? currentGoodsItems : els) || []; // 存在setCurrentGoodsItems异步还没赋值成功造成currentGoodsItems没值
      if (mainProduct) {
        let theSameProduct = currentItems.find(
          (el) => mainProduct?.spuCode == el?.spuNo
        );
        if (theSameProduct?.spuNo) {
          // 如果主商品有同样的spu，需要直接不展示所有推荐商品
          // setProductDetail({});
          setState({
            triggerShowChangeProduct: Object.assign(
              {},
              triggerShowChangeProduct,
              {
                showBox: false
              }
            )
          });
          cb && cb({});
          return;
        }
        let currentSpus = currentItems?.map((el) => el.spuNo);
        let newOtherProducts =
          otherProducts?.filter((item) => !currentSpus.includes(item.spuNo)) ||
          [];
        otherProducts = [...newOtherProducts];
        let productArr = [mainProduct, ...otherProducts];
        let spuNoList = productArr?.map((el) => el.spuCode);
        let rationsParams = { petsId, spuNoList };
        try {
          let rationRes = await getRation(rationsParams);
          let rations = rationRes?.context?.rationResponseItems;
          rations?.forEach((ration) => {
            if (mainProduct.spuCode == ration.mainItem) {
              mainProduct.petsRation = `${Math.round(ration.weight)}${
                ration.weightUnit
              }/${intl.messages['day-unit']}`;
            }
            otherProducts?.map((el) => {
              if (el.spuCode == ration.mainItem) {
                el.petsRation = `${Math.round(ration.weight)}${
                  ration.weightUnit
                }/${intl.messages['day-unit']}`;
              }
            });
          });
        } catch (err) {
          console.info('ration err', err);
        }
      }
      let newProductDetail = {
        otherProducts,
        mainProduct
      };
      setProductDetail(newProductDetail);
      cb && cb({ newProductDetail });
    } catch (err) {
      console.info('....', err);
      showErrMsgs(err && err.message, 'errMsgPage');
    } finally {
      setState({ productListLoading: false });
    }
  };
  const showErrMsgs = (msg, errorMsgKey = 'errorMsg') => {
    setState({
      [errorMsgKey]: msg
    });
    clearTimeout(timer);
    timer = setTimeout(() => {
      setState({
        [errorMsgKey]: ''
      });
    }, 3000);
  };
  useEffect(() => {
    showChangeProduct(triggerShowChangeProduct);
  }, [triggerShowChangeProduct.firstShow]);
  const showChangeProduct = async ({ goodsInfo, isShowModal }) => {
    if (!goodsInfo || productDetail.mainProduct?.spuCode) {
      showModal(0);
      return;
    }
    if (isShowModal) {
      queryProductList(goodsInfo, () => {
        showModal(0);
      });
    } else {
      queryProductList(goodsInfo, ({ newProductDetail }) => {
        // 查详情
        let id =
          productDetail?.mainProduct?.spuCode ||
          newProductDetail?.mainProduct?.spuCode;
        if (id) {
          queryProductDetails({
            id,
            cb: (res) => {
              // 保存mainproduct推荐的商品详情
              if (res) {
                setMainProductDetails(res);
              }
            }
          });
        } else {
          // 没有推荐商品的时候直接隐藏被动更换商品
          let newTriggerShowChangeProduct = Object.assign(
            {},
            triggerShowChangeProduct,
            {
              showBox: false
            }
          );
          setState({ triggerShowChangeProduct: newTriggerShowChangeProduct });
        }
      });
    }
  };
  const currentGoodsItem = currentGoodsItems[0] || {};
  return (
    <div
      className={`change-product-modal ${
        productDetail?.mainProduct ? 'has-data' : ''
      }`}
    >
      <Modal
        headerVisible={true}
        footerVisible={false}
        visible={showModalArr[0]}
        modalTitle={''}
        close={() => {
          initMainProduct();
        }}
      >
        {productDetail?.mainProduct ? (
          <RecommendationList productDetail={productDetail} />
        ) : (
          // <div></div>
          <div className="text-center  rc-padding-left--lg--desktop rc-padding-right--lg--desktop">
            <img
              className="m-auto"
              style={{ maxWidth: '100px' }}
              src={getClubLogo({})}
              alt="club icon"
            />
            <p className="text-center red" style={{ fontSize: '1.5rem' }}>
              <FormattedMessage id="switchProductTip1" />{' '}
              {subDetail.petsInfo?.petsName}{' '}
              {window.__.env.REACT_APP_COUNTRY != 'tr' && (
                <FormattedMessage id="switchProductTip2" />
              )}
              {window.__.env.REACT_APP_COUNTRY != 'tr' && ' '}
              {window.__.env.REACT_APP_COUNTRY != 'tr' &&
                (subDetail.petsInfo?.petsSex ? (
                  <FormattedMessage id="switchProductTip.his" />
                ) : (
                  <FormattedMessage id="switchProductTip.her" />
                ))}
              {window.__.env.REACT_APP_COUNTRY != 'tr' && ' '}
              <FormattedMessage id="switchProductTip3" />!
            </p>
            <div className="d-flex align-items-center justify-content-center rc-padding-left--lg--desktop rc-padding-right--lg--desktop">
              <img src={currentGoodsItem.goodsPic} style={{ width: '40%' }} />
              <div>
                <div className="red" style={{ fontSize: '1.5rem' }}>
                  {currentGoodsItem.goodsName}
                </div>
                {/* <div>{currentGoodsItem.goodsSubtitle}</div> */}
                <div>{currentGoodsItem.specText}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default injectIntl(RecommendationListModal);
