import React, { useEffect, useState, useContext } from 'react';
import {
  FormattedMessage,
  injectIntl,
  FormattedDate
} from 'react-intl-phraseapp';
import { useHistory } from 'react-router-dom';
import RecommendationList from './RecommendationList';
import { findPetProductForClub } from '@/api/subscription';
import { getRation, getClubLogo, formatMoney } from '@/utils/utils';
import Modal from '@/components/Modal';
import { ChangeProductContext } from '../index';
import { SubDetailHeaderContext } from '../../SubDetailHeader';
import ProductDailyRation from './ProductDailyRation';

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
    setCurrentGoodsItems,
    showProdutctDetail
  } = ChangeProductValue;
  let timer = null;
  let history = useHistory();

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
      // let mainProduct = undefined;
      // let otherProducts = []; //test

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
  const redirectTo = (url) => {
    history.push(url);
  };
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
        productDetail?.mainProduct ? 'has-data' : 'no-data'
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
          <div className="text-center  rc-padding-left--lg--desktop rc-padding-right--lg--desktop">
            <img
              className="m-auto"
              style={{ maxWidth: '100px' }}
              src={getClubLogo({})}
              alt="club icon"
            />
            <p
              className="text-center red mt-10"
              style={{ fontSize: '1.25rem' }}
            >
              <FormattedMessage
                values={{
                  petname: subDetail.petsInfo?.petsName,
                  productname:
                    subDetail.goodsInfo && subDetail.goodsInfo[0]?.goodsName
                }}
                id="subscription.noMoreRecommendation.HeaderTitle"
              />

              {/* The nutrition adapted to {subDetail.petsInfo?.petsName}’s specific
              needs is still maine coon adult, dry cat food */}
            </p>
            {/* <p className="text-sm">
              <FormattedMessage
                values={{
                  petname: subDetail.petsInfo?.petsName
                }}
                id="subscription.noMoreRecommendation.HeaderContent"
              />
               A Maine Coon like {subDetail.petsInfo?.petsName} has specific
              needs. for example, due to his large size and bone structure, it
              is essential to pay special attention to his general health and
              his joints. Depending on your pet preferences you can choose
              between wet food, dry food or Mixed. 
            </p> */}

            {/* <p className="text-center red" style={{ fontSize: '1.5rem' }}>
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
            </p> */}
            <div
              style={{ border: '1px solid #D7D7D7' }}
              className="rc-padding-x--sm--desktop mt-6"
            >
              <div className="d-flex align-items-center justify-content-center rc-padding-x--sm--desktop flex-col md:flex-row">
                <img
                  src={currentGoodsItem.goodsPic}
                  className="w-2/4 md:w-2/5 "
                />
                <div className="flex-1 rc-padding-left--sm--desktop">
                  <div className="red" style={{ fontSize: '1.5rem' }}>
                    {currentGoodsItem.goodsName}
                  </div>
                  <ProductDailyRation
                    // rations="test"
                    rations={
                      subDetail.goodsInfo && subDetail.goodsInfo[0]?.petsRation
                    }
                  />
                  <div className="text-center mt-4 card--product-contaner-price">
                    {/* Starting from */}
                    <FormattedMessage id="startingfrom" />

                    <span className="contaner-price__value">
                      {formatMoney(
                        subDetail.goodsInfo &&
                          subDetail.goodsInfo[0]?.goodsVO?.minSubscriptionPrice
                      )}
                    </span>
                  </div>
                  <button
                    class="text-sm  my-6 rc-btn rc-btn--two rc-btn--sm"
                    onClick={() => {
                      showProdutctDetail(subDetail.goodsInfo[0]?.spuNo);
                    }}
                  >
                    {/* View product */}
                    <FormattedMessage id="viewproduct" />
                  </button>
                  {/* <div>{currentGoodsItem.goodsSubtitle}</div> */}
                  {/* <div>{currentGoodsItem.specText}</div> */}
                </div>
              </div>
            </div>

            <div
              className="text-sm mt-6"
              style={{ border: '1px solid #D7D7D7' }}
            >
              <div className="red mt-8" style={{ fontSize: '1.375rem' }}>
                <FormattedMessage
                  values={{
                    petname: subDetail.petsInfo?.petsName
                  }}
                  id="subscription.noMoreRecommendation.FooterTitle"
                />
                {/* {subDetail.petsInfo?.petsName}’s needs have changed? */}
              </div>
              <div className="text-sm mt-2">
                <FormattedMessage
                  values={{
                    petname: subDetail.petsInfo?.petsName
                  }}
                  id="subscription.noMoreRecommendation.FooterContent"
                />
                {/* Create or update your pet’s profile to obtain the most precise
                recommendations */}
              </div>
              <button
                class="text-sm mt-6  rc-btn rc-btn--two rc-btn--sm"
                onClick={() =>
                  redirectTo(`/account/pets/petForm/${subDetail.petsId}`)
                }
              >
                <FormattedMessage id="subscription.noMoreRecommendation.updateBtn" />
                {/* Update your pet profile */}
              </button>
              <br />
              <a
                class="mt-4 mb-8 red text-sm rc-styled-link rc-btn--sm"
                onClick={() => redirectTo('/account/pets/petForm')}
              >
                <FormattedMessage id="subscription.noMoreRecommendation.createBtn" />
                {/* Create your pet profile */}
              </a>
            </div>
            <button
              class="text-sm mt-6 rc-btn rc-btn--one rc-btn--sm"
              onClick={() => {
                showModal();
              }}
            >
              <FormattedMessage id="subscription.noMoreRecommendation.backBtn" />
              {/* Back to my subscription */}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default injectIntl(RecommendationListModal);
