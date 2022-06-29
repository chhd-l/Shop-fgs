import React, { useEffect, useState, useContext, createContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import stores from '@/store';
import { useLocalStore } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import RecommendationListModal from './RecommendationListModal';
import GoodsDetails from './GoodsDetails';
import { getDetailsBySpuNo } from '@/api/details';
import { stockNoticeModify, queryStockNotice } from '@/api/subscription';
import Modal from '@/components/Modal';
import ChooseSKU from './ChooseSKU';
import { SubDetailHeaderContext } from '../SubDetailHeader';
import { getFrequencyDict } from '@/utils/utils';
import { EMAIL_REGEXP } from '@/utils/constant';
import cn from 'classnames';

export const ChangeProductContext = createContext();
const loginStore = stores.loginStore;

const ChangeProduct = () => {
  const { configStore } = useLocalStore(() => stores);
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const {
    setState,
    subDetail,
    isShowClub,
    triggerShowChangeProduct
  } = SubDetailHeaderValue;
  const [showModalArr, setShowModalArr] = useState([false, false, false]);
  const [errMsg, setErrMsg] = useState('');
  const [currentGoodsItems, setCurrentGoodsItems] = useState([]);
  const [frequencyList, setFrequencyList] = useState([]);
  const [alreadyNotice, setAlreadyNotice] = useState(false);
  const [correctEmail, setCorrectEmail] = useState(true);
  const [userEmail, setUserEmail] = useState(loginStore?.userInfo?.email || '');

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
  const [details, setDetails] = useState({});
  const [renderDetailAgin, setRenderDetailAgin] = useState(true);
  const [
    recommendationVisibleLoading,
    setRecommendationVisibleLoading
  ] = useState(true);
  const [form, setForm] = useState({
    buyWay: 1, //0 - once/ 1 - frequency
    frequencyVal: '',
    frequencyName: '',
    frequencyId: -1
  });
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
          ? configStore.info.storeVO?.defaultSubscriptionClubFrequencyId
          : configStore.info.storeVO?.defaultSubscriptionFrequencyId;
      let newForm = Object.assign(form, {
        frequencyId:
          goodsRes.defaultFrequencyId ||
          defaultSubscriptionFrequencyId ||
          (frequencyDictRes[0] && frequencyDictRes[0].id) ||
          ''
      });
      setForm(newForm);
      let newDetails = Object.assign({}, res.context.goods, {
        promotions: res.context.goods?.promotions?.toLowerCase(),
        goodsInfos: res.context.goodsInfos,
        // sizeList: [],
        goodsSpecDetails: res.context.goodsSpecDetails,
        goodsSpecs: res.context.goodsSpecs,
        goodsAttributesValueRelList: res.context.goodsAttributesValueRelList
      });
      setDetails(newDetails);
      setGoodsDetails(res.context);
      cb && cb(res);
    } catch (err) {
      console.info('.....', err);
    }
  };
  useEffect(() => {
    setRenderDetailAgin(!renderDetailAgin); // box和弹窗goodsno一致的时候，规格筛选不能重新渲染，强制变化后渲染
  }, [goodsDetails]); // 获取详情数据后重置

  useEffect(() => {
    if (showModalArr[1] && details) {
      checkGoodsNotice(details);
    }
  }, [showModalArr, details]);

  // check whether the current spu stock out notice has been alerted
  const checkGoodsNotice = async (details) => {
    const productStock = details?.goodsInfos?.some((el) => el.stock);
    const goodsId = details.goodsId || '';
    if (!productStock && goodsId) {
      const params = {
        customerId: loginStore?.userInfo?.customerId || '',
        goodsId: details.goodsId,
        storeId: window.__.env.REACT_APP_STOREID,
        fromAddress: '1'
      };
      const res = await queryStockNotice(params);
      if (res.code === 'K-000000') {
        setAlreadyNotice(res.context?.stockNotice);
      }
    }
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
    // getDetailsBySpuNo('2554')
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
    goodsDetails,
    renderDetailAgin,
    details,
    showProdutctDetail,
    setDetails,
    form,
    initMainProduct,
    setForm,
    mainProductDetails,
    setMainProductDetails,
    queryProductDetails,
    showModalArr,
    currentGoodsItems,
    setCurrentGoodsItems,
    showModal,
    errMsg,
    setErrMsg
  };

  const handleEmailChange = (e) => {
    const emailVal = e.target.value;
    const emailVerify = EMAIL_REGEXP.test(emailVal);
    if (emailVerify !== correctEmail) setCorrectEmail(emailVerify);
    setUserEmail(emailVal);
  };

  const handleModifyEmail = () => {
    setAlreadyNotice(false);
  };

  const handleNotifyMe = async () => {
    let subscribeId = subDetail.subscribeId;
    const { goods = {}, goodsInfos = [] } = goodsDetails;
    const goodsInfoIds = goodsInfos?.map((el) => el.goodsInfoId);
    console.log(goodsInfoIds, 'goodsInfoIds==');
    // modify & add is same
    const param = {
      customerId: loginStore?.userInfo?.customerId || '',
      email: userEmail,
      goodsInfoIds,
      goodsId: goods.goodsId || '',
      fromAddress: '1', //1:spu out of stock
      subscribeId
    };
    console.log(param, 'pa');
    const res = await stockNoticeModify(param);
    console.log(res, 'resres==');
    if (true) {
      setAlreadyNotice(true);
    }
  };

  const modalFooterContent = () => {
    const productStock = goodsDetails?.goodsInfos?.some((el) => el.stock);

    return (
      <div className="">
        {!productStock ? (
          <div className=" mb-4 flex flex-col items-center md:items-start">
            <div className="text-base font-normal mb-2">
              <FormattedMessage
                id={
                  alreadyNotice
                    ? 'subscription.backToStockInfoActivated'
                    : 'subscription.backToStockInfo'
                }
              />
            </div>
            <div className="flex items-center flex-col md:flex-row">
              <div
                className={`${
                  correctEmail
                    ? 'correct-format-input-box mb-3 md:mb-0'
                    : 'active-input-box mb-3 md:mb-0'
                }`}
              >
                <input
                  className={`email-input pl-2  font-light text-base ${
                    alreadyNotice ? '' : 'border-b-2 pb-1 w-80'
                  }`}
                  onChange={handleEmailChange}
                  maxLength="50"
                  value={userEmail}
                />
                {correctEmail ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute right-1 top-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : null}
              </div>
              {!productStock && !alreadyNotice ? (
                <button
                  className={cn(`rc-btn rc-btn--one rc-btn--sm md:ml-4 ml-0`, {
                    'rc-btn-solid-disabled': !correctEmail || alreadyNotice
                  })}
                  disabled={!correctEmail || alreadyNotice}
                  onClick={handleNotifyMe}
                >
                  <FormattedMessage id="notifyMe" />
                </button>
              ) : null}
              {alreadyNotice ? (
                <button
                  className="rc-btn rc-btn--two rc-btn--sm ml-6"
                  onClick={handleModifyEmail}
                >
                  <FormattedMessage id="modifyEmail" />
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="text-center">
          <button
            id="modalFooterCancel"
            type="button"
            className="btn btn-outline-primary rc-btn--sm mr-6"
            data-dismiss="modal"
            onClick={() => showModal(0)}
          >
            <FormattedMessage id="subscription.seeOtherRecommendation" />
          </button>
          {productStock && (
            <button
              id="modalFooterConfirm"
              type="button"
              className={`btn btn-primary rc-btn--sm`}
              data-dismiss="modal"
              onClick={() => showModal(2)}
            >
              <FormattedMessage id="subscription.chooseThisProduct" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <ChangeProductContext.Provider value={propsObj}>
        <RecommendationListModal />
        <div className="product-detail-modal">
          <Modal
            headerVisible={true}
            footerVisible={true}
            // cancelBtnVisible={false}
            visible={showModalArr[1]}
            // cancelBtnText={
            //   <FormattedMessage id="subscription.seeOtherRecommendation" />
            // }
            // confirmBtnText={
            //   <FormattedMessage id="subscription.chooseThisProduct" />
            // }
            modalTitle={''}
            cancel={() => {
              showModal(0);
            }}
            // hanldeClickConfirm={() => {
            //   showModal(2);
            // }}
            close={() => {
              initMainProduct();
            }}
            footerContentChildren={modalFooterContent()}
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
          isShowClub &&
          triggerShowChangeProduct.showBox &&
          (recommendationVisibleLoading ? (
            <div className="mt-4 1111" style={{ width: '100%' }}>
              <Skeleton color="#f5f5f5" width="100%" height="30%" count={2} />
            </div>
          ) : (
            <div className="recommendatio-wrap rc-padding--sm my-4 md:mt-0">
              <p className="recommendatio-wrap-title">
                <FormattedMessage id="subscriptionDetail.newProduct" />
              </p>
              <div className="rc-outline-light px-3 md:px-6 py-2 md:py-4 recommendatio-wrap-content">
                <ChooseSKU />
              </div>
            </div>
          ))}
      </ChangeProductContext.Provider>
    </>
  );
};
export default ChangeProduct;
