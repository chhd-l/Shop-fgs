import React, { useEffect, useState, useContext, createContext } from 'react';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import { unique, getParaByName } from '@/utils/utils';
import stores from '@/store';
import { useLocalStore } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import RecommendationListModal from './RecommendationListModal';
import GoodsDetails from './GoodsDetails';
import { getDetailsBySpuNo } from '@/api/details';
import Modal from '@/components/Modal';
import ChooseSKU from './ChooseSKU';
export const ChangeProductContext = createContext();
import { SubDetailHeaderContext } from '../SubDetailHeader';
import { getFrequencyDict } from '@/utils/utils';
const ChangeProduct = () => {
  const { configStore } = useLocalStore(() => stores);
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const {
    setState,
    subDetail,
    isClub,
    triggerShowChangeProduct
  } = SubDetailHeaderValue;
  const [showModalArr, setShowModalArr] = useState([false, false, false]);
  const [errMsg, setErrMsg] = useState('');
  const [currentGoodsItems, setCurrentGoodsItems] = useState([]);
  const [frequencyList, setFrequencyList] = useState([]);
  const showModal = (num) => {
    let newArr = [false, false, false];
    //如果不传数字，默认全部关闭
    if (num !== undefined) {
      newArr = showModalArr.map((el, i) => i == num);
    }
    setShowModalArr(newArr);
  };
  const [goodsDetails, setGoodsDetails] = useState({});
  const [mainProductDetails, setMainProductDetails] = useState(null); //推荐主商品的详情数据
  const [specList, setSpecList] = useState([]);
  const [details, setDetails] = useState({});
  const [
    recommendationVisibleLoading,
    setRecommendationVisibleLoading
  ] = useState(true);
  const [currentSubscriptionPrice, setCurrentSubscriptionPrice] = useState(
    null
  );
  const [currentUnitPrice, setCurrentUnitPrice] = useState({});
  const [currentSubscriptionStatus, setCurrentSubscriptionStatus] = useState(
    {}
  );
  const [form, setForm] = useState({
    buyWay: 1, //0 - once/ 1 - frequency
    frequencyVal: '',
    frequencyName: '',
    frequencyId: -1
  });
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    (async () => {
      await getFrequencyDict().then((res) => {
        let frequencyListOptions = res.map((ele) => {
          ele && delete ele.value;
          return {
            value: ele.id,
            ...ele
          };
        });
        setFrequencyList(frequencyListOptions);
      });
    })();
  }, []);
  const productDetailsInit = (res, cb) => {
    try {
      let goodsRes = (res && res.context && res.context.goods) || {
        context: {}
      };
      let frequencyDictRes = frequencyList.filter((el) => {
        if (goodsRes.promotions && goodsRes.promotions.includes('club')) {
          return el.goodsInfoFlag === 2;
        } else {
          return el.goodsInfoFlag === 1;
        }
      });
      let defaultSubscriptionFrequencyId =
        goodsRes.promotions && goodsRes.promotions.includes('club')
          ? configStore.info.storeVO.defaultSubscriptionClubFrequencyId
          : configStore.info.storeVO.defaultSubscriptionFrequencyId;
      let newForm = Object.assign(form, {
        frequencyId:
          goodsRes.defaultFrequencyId ||
          defaultSubscriptionFrequencyId ||
          (frequencyDictRes[0] && frequencyDictRes[0].id) ||
          ''
      });
      setForm(newForm);

      let petType = 'Cat';
      let foodType = 'Dry';
      if (res && res.context?.goodsAttributesValueRelList) {
        res.context.goodsAttributesValueRelList.forEach((item, idx) => {
          if (item.goodsAttributeName == 'Lifestages') {
            petType =
              item.goodsAttributeValue.split('_') &&
              item.goodsAttributeValue.split('_')[1];
          }
          if (item.goodsAttributeName == 'Technology') {
            foodType = item.goodsAttributeValue;
          }
        });
      }
      let sizeList = [];
      let goodsInfos = res.context.goodsInfos || [];
      if (res && res.context && res.context.goodsSpecDetails) {
        let specList = res.context.goodsSpecs || [];
        let foodFllType = `${foodType} ${petType} Food`;
        let specDetailList = res.context.goodsSpecDetails;
        specList.map((sItem, index) => {
          sItem.chidren = specDetailList.filter((sdItem, i) => {
            if (index === 0) {
              let filterproducts = goodsInfos.filter((goodEl) =>
                goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
              );
              sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
              sdItem.isEmpty = filterproducts.every((item) => item.stock === 0);
              sdItem.isClub = filterproducts.every(
                (item) =>
                  // item.promotions=='club'&&
                  item.subscriptionStatus === 1 && item.subscriptionPrice > 0
              );
              console.info('sdItem.isEmpty', sdItem.isEmpty);

              // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
            }
            return sdItem.specId === sItem.specId;
          });
          let defaultSelcetdSku = -1;
          if (defaultSelcetdSku > -1) {
            // 默认选择该sku
            if (
              !sItem.chidren[defaultSelcetdSku].isEmpty &&
              sItem.chidren[defaultSelcetdSku]?.isClub
            ) {
              // 如果是sku进来的，需要默认当前sku被选择
              sItem.chidren[defaultSelcetdSku].selected = true;
            }
          } else {
            if (
              process.env.REACT_APP_COUNTRY === 'DE' &&
              sItem.chidren.length > 1 &&
              !sItem.chidren[1].isEmpty &&
              sItem.chidren[1].isClub
            ) {
              sItem.chidren[1].selected = true;
            } else if (
              sItem.chidren.length > 1 &&
              !sItem.chidren[1].isEmpty &&
              sItem.chidren[1].isClub
            ) {
              sItem.chidren[1].selected = true;
            } else {
              for (let i = 0; i < sItem.chidren.length; i++) {
                if (sItem.chidren[i].isEmpty || !sItem.chidren[i].isClub) {
                } else {
                  sItem.chidren[i].selected = true;
                  break;
                }
              }
            }
          }

          return sItem;
        });
        sizeList = goodsInfos.map((g, i) => {
          // g = Object.assign({}, g, { selected: false });
          g = Object.assign({}, g, {
            selected: i === 0
          });
          if (g.selected && !g.subscriptionStatus) {
            let newForm = form;
            newForm.buyWay = 0;
            setForm(newForm);
          }
          return g;
        });

        const goodSize = specList.map((item) =>
          item.chidren.find((good) => good.selected)
        )?.[0]?.detailName;
        let newImages = [];
        newImages = res.context.goodsInfos;
        setSpecList(specList);
        let newDetails = Object.assign({}, details, res.context.goods, {
          promotions: res.context.goods?.promotions?.toLowerCase(),
          sizeList,
          goodsInfos: res.context.goodsInfos,
          goodsSpecDetails: res.context.goodsSpecDetails,
          goodsSpecs: res.context.goodsSpecs,
          goodsAttributesValueRelList: res.context.goodsAttributesValueRelList
        });
        setDetails(newDetails);
        setGoodsDetails(res.context);
        setImages(newImages);
        //  todo
        matchGoods();
      } else {
        let sizeList = [];
        let foodFllType = `${foodType} ${petType} Food`;
        let goodsInfos = res.context.goodsInfos || [];
        sizeList = goodsInfos.map((g, i) => {
          g = Object.assign({}, g, {
            selected: i === 0
          });
          if (g.selected && !g.subscriptionStatus) {
            let newForm = form;
            newForm.buyWay = 0;
            setForm(newForm);
          }
          return g;
        });

        let newImages = [];
        newImages = res.context.goodsInfos;
        let newDetails = Object.assign({}, details, res.context.goods, {
          promotions: res.context.goods?.promotions?.toLowerCase(),
          sizeList,
          goodsInfos: res.context.goodsInfos,
          goodsSpecDetails: res.context.goodsSpecDetails,
          goodsSpecs: res.context.goodsSpecs,
          goodsAttributesValueRelList: res.context.goodsAttributesValueRelList
        });
        setDetails(newDetails);
        setImages(newImages);
        // 设置完了之后才能重新bundle  todo
        bundleMatchGoods({ details: newDetails });
        // 没有规格的情况
        // this.setState({
        //   errMsg: <FormattedMessage id="details.errMsg" />
        // });
      }
      cb && cb(res);
    } catch (err) {
      console.info('.....', err);
    }
  };

  const matchGoods = () => {
    let newCurrentSubscriptionPrice = currentSubscriptionPrice;
    let newCurrentSubscriptionStatus = currentSubscriptionStatus;
    let selectedArr = [];
    let idArr = [];
    specList.map((el) => {
      if (el.chidren.filter((item) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item) => item.selected)[0]);
      }
      return el;
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    //marketprice需要取sku的（goodsinfo是sku），不然有时候spu（goods里面）会没值
    let currentUnitPrice = details?.goodsInfos?.[0]?.marketPrice;
    details.sizeList?.map((item, i) => {
      let specTextArr = [];
      for (let specItem of specList) {
        for (let specDetailItem of specItem.chidren) {
          if (
            item.mockSpecIds.includes(specDetailItem.specId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            specTextArr.push(specDetailItem.detailName);
          }
        }
      }
      item.specText = specTextArr.join(' ');
      if (unique(item.mockSpecDetailIds).sort().join(',') === idArr.join(',')) {
        item.selected = true;
        currentUnitPrice = item.salePrice;
        newCurrentSubscriptionPrice = item.subscriptionPrice;
        newCurrentSubscriptionStatus = item.subscriptionStatus; //subscriptionStatus 是否订阅商品
        stock = item.stock;
      } else {
        item.selected = false;
      }

      return item;
    });
    // setDetails(details)
    setStock(stock);
    setCurrentUnitPrice(currentUnitPrice);
    setCurrentSubscriptionPrice(newCurrentSubscriptionPrice);
    setCurrentSubscriptionStatus(newCurrentSubscriptionStatus);
  };
  const bundleMatchGoods = ({ details }) => {
    let currentUnitPrice = details.goodsInfos[0].salePrice;
    let currentSubscriptionPrice = details.goodsInfos[0].subscriptionPrice;
    let currentSubscriptionStatus = details.goodsInfos[0].subscriptionStatus;
    stock = details.goodsInfos[0].stock;
    details.sizeList[0].selected = true;
    setDetails(details);
    setStock(stock);
    setCurrentUnitPrice(currentUnitPrice);
    setCurrentSubscriptionPrice(currentSubscriptionPrice);
    setCurrentSubscriptionStatus(currentSubscriptionStatus);
  };
  const queryProductDetails = async ({ id, cb, mainProductDetails }) => {
    if (mainProductDetails) {
      productDetailsInit(mainProductDetails, cb);
      return;
    }
    if (!id) {
      cb && cb();
      return;
    }
    setState({ productListLoading: true });
    // getDetailsBySpuNo('MKT00006')
    getDetailsBySpuNo(id)
      .then((res) => {
        productDetailsInit(res, cb);
      })
      .catch((e) => {
        console.log(e);
        setErrMsg(e.message || <FormattedMessage id="details.errMsg2" />);
      })
      .finally(() => {
        setRecommendationVisibleLoading(false);
        setState({
          productListLoading: false
        });
      });
  };
  const initMainProduct = () => {
    queryProductDetails({ mainProductDetails }); // 需要重置顶部推荐框
    showModal(); // 关闭所有弹窗
  };
  const showProdutctDetail = (id) => {
    queryProductDetails({
      id,
      cb: () => {
        showModal(1);
      }
    });
  };
  const propsObj = {
    specList,
    setSpecList,
    matchGoods,
    goodsDetails,
    details,
    showProdutctDetail,
    setDetails,
    currentSubscriptionPrice,
    setCurrentSubscriptionPrice,
    form,
    initMainProduct,
    setForm,
    stock,
    setMainProductDetails,
    queryProductDetails,
    setStock,
    showModalArr,
    images,
    currentGoodsItems,
    setCurrentGoodsItems,
    setImages,
    showModal,
    errMsg,
    setErrMsg
  };
  return (
    <>
      <ChangeProductContext.Provider value={propsObj}>
        <RecommendationListModal />
        <div className="product-detail-modal">
          <Modal
            headerVisible={true}
            footerVisible={true}
            visible={showModalArr[1]}
            cancelBtnText={
              <FormattedMessage id="subscription.seeOtherRecommendation" />
            }
            confirmBtnText={
              <FormattedMessage id="subscription.chooseThisProduct" />
            }
            modalTitle={''}
            cancel={() => {
              showModal(0);
            }}
            hanldeClickConfirm={() => {
              showModal(2);
            }}
            close={() => {
              initMainProduct();
            }}
          >
            <GoodsDetails />
          </Modal>
        </div>
        <div className="choose-product-modal-wrap">
          <Modal
            headerVisible={true}
            footerVisible={false}
            visible={showModalArr[2]}
            modalTitle=""
            close={() => {
              initMainProduct();
            }}
          >
            <h4 className="red text-center mb-3 mt-3">
              <FormattedMessage id="subscription.productRecommendation" />
            </h4>
            <p className="text-center">
              <FormattedMessage id="subscription.chooseOption" />
            </p>
            <div
              style={{ padding: '.9375rem' }}
              className="rc-outline-light rc-padding-y--sm"
            >
              {/* <div className="rc-outline-light rc-padding-y--sm rc-padding-x--sm rc-margin-x--sm"> */}
              <ChooseSKU />
            </div>
          </Modal>
        </div>
        {subDetail.petsId &&
          isClub &&
          triggerShowChangeProduct.showBox &&
          (recommendationVisibleLoading ? (
            <div className="mt-4 1111" style={{ width: '100%' }}>
              <Skeleton color="#f5f5f5" width="100%" height="30%" count={2} />
            </div>
          ) : (
            <div className="recommendatio-wrap  rc-margin-bottom--sm rc-padding--sm">
              <p className="recommendatio-wrap-title">
                <FormattedMessage id="subscriptionDetail.newProduct" />
              </p>
              <div className="rc-outline-light rc-padding--sm recommendatio-wrap-content">
                <ChooseSKU />
              </div>
            </div>
          ))}
      </ChangeProductContext.Provider>
    </>
  );
};
export default ChangeProduct;
