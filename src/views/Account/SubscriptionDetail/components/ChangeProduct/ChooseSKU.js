import React, { useState, useContext, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import FrequencySelection from '@/components/FrequencySelection';
import { ErrorMessage } from '@/components/Message';
import { changeSubscriptionGoods } from '@/api/subscription';
import HandledSpec from '@/components/HandledSpec/index.tsx';
import { formatMoney, getDeviceType } from '@/utils/utils';
import find from 'lodash/find';
import { ChangeProductContext } from './index';
import { SubDetailHeaderContext } from '../SubDetailHeader';
import { inject, observer } from 'mobx-react';
import { QuantityPicker } from '@/components/Product';
import cn from 'classnames';

const ChooseSKU = ({ intl, configStore, ...restProps }) => {
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const quantityMinLimit = 1;
  const [changeNowLoading, setChangeNowLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [errorMsgSureChange, setErrorMsgSureChange] = useState('');
  let selected = false;
  const ChangeProductValue = useContext(ChangeProductContext);
  const SubDetailHeaderValue = useContext(SubDetailHeaderContext);
  const [skuLimitThreshold, setSkuLimitThreshold] = useState(null);
  const [isSpecAvailable, setIsSpecAvailable] = useState(false);

  useEffect(() => {
    setSkuLimitThreshold(configStore?.info?.skuLimitThreshold);
  }, configStore?.info?.skuLimitThreshold);

  const {
    productListLoading,
    setState,
    getDetail,
    subDetail,
    triggerShowChangeProduct,
    currentChangeProductIdx
  } = SubDetailHeaderValue;
  const {
    renderDetailAgin,
    details,
    setDetails,
    mainProductDetails,
    showModal,
    showProdutctDetail,
    setForm,
    initMainProduct,
    form,
    setCurrentGoodsItems,
    currentGoodsItems
  } = ChangeProductValue;
  const [currentSubscriptionPrice, setCurrentSubscriptionPrice] =
    useState(null);
  const [currentSubscriptionStatus, setCurrentSubscriptionStatus] = useState(
    {}
  );
  const [skuPromotions, setSkuPromotions] = useState(0);
  const [stock, setStock] = useState(0);
  const [firstIn, setFirstIn] = useState(true);
  const [mainSizeList, setMainSizeList] = useState([]);
  let timer = null;

  useEffect(() => {
    setSkuPromotions(0);
  }, [details?.goodsInfos]);
  const isNotInactive = subDetail.subscribeStatus !== 'INACTIVE';
  const matchGoods = (data, sizeList) => {
    let newDetails = Object.assign(details, {
      sizeList
    });

    // 兼容打开弹窗之后，重置黄色box不存在sizeList情况
    if (sizeList && firstIn) {
      setFirstIn(false);
      setMainSizeList(sizeList);
    }
    console.info('data', data);
    console.info('sizeList', sizeList);
    setSkuPromotions(data.skuPromotions);
    setStock(data.stock);
    setCurrentSubscriptionPrice(
      data.currentSubscriptionPrice || data.selectPrice
    );
    setCurrentSubscriptionStatus(data.currentSubscriptionStatus);
    setDetails(newDetails);
  };
  const changePets = (selected) => {
    if (!selected) {
      return;
    }
    setState({ currentChangeProductIdx: 0 }); // 此部分只会在当产品只有一个时出现，所以idx直接置为0
    setChangeNowLoading(true);
    doChangeSubscriptionGoods();
  };
  const handleSelectedItemChange = (data) => {
    let newForm = {};
    newForm.frequencyVal = data.value;
    newForm.frequencyName = data.name;
    newForm.frequencyId = data.id;
    setForm(newForm);
  };
  const doChangeSubscriptionGoods = () => {
    try {
      let { sizeList } = details;
      if (
        !sizeList &&
        details.goodsNo == mainProductDetails?.context?.goods?.goodsNo
      ) {
        sizeList = mainSizeList;
      }
      let currentSelectedSize = sizeList[0];
      if (details?.goodsSpecDetails) {
        currentSelectedSize = find(sizeList, (s) => s.selected);
      }
      let buyWay = parseInt(form.buyWay);
      let goodsInfoFlag =
        buyWay && details.promotions?.includes('club') ? 2 : buyWay;
      let subscribeId = subDetail.subscribeId;
      let addGoodsItemsSku = currentSelectedSize.goodsInfoId;
      if (!addGoodsItemsSku) {
        console.info('err:请选择目标商品替换');
        return;
      }
      let addGoodsItems = {
        skuId: currentSelectedSize.goodsInfoId,
        subscribeNum: quantity,
        goodsInfoFlag: 2,
        periodTypeId: form.frequencyId
        // productFinderFlag: currentSelectedSize.productFinderFlag
      };

      const deleteGoodsItems = currentGoodsItems
        .filter((c, i) => i === currentChangeProductIdx)
        .map((el) => {
          return {
            subscribeId,
            skuId: el.goodsInfoVO?.goodsInfoId
          };
        });
      let isTheSamePro = deleteGoodsItems.find(
        (el) => el?.skuId == currentSelectedSize?.goodsInfoId
      );
      if (isTheSamePro?.skuId) {
        //替换的skuid一致，不能正常提交
        changeErrorMsg(intl.messages['subscription.thesameProd']);
        setChangeNowLoading(false);
        return;
      }
      if (buyWay) {
        addGoodsItems.periodTypeId = form.frequencyId;
      }
      const params = {
        subscribeId,
        addGoodsItems: [addGoodsItems],
        deleteGoodsItems
      };
      changeSubscriptionGoods(params)
        .then((res) => {
          getDetail(({ goodsInfo }) => {
            changeSubDetail(goodsInfo, addGoodsItemsSku);
            // 需要把订阅详情请求回来再重置状态，不然用户一直点击会出现还没正常更替就重复点击有问题
            setChangeNowLoading(false);
            initMainProduct();
          });
        })
        .catch((err) => {
          setChangeNowLoading(false);
          changeErrorMsg(err && err.message);
        });
    } catch (err) {
      changeErrorMsg(err && err.message);

      setChangeNowLoading(false);
    }
  };
  const changeSubDetail = (goodsInfo, skuid) => {
    let el = goodsInfo?.find((e) => e.skuId == skuid);
    // setState({triggerShowChangeProduct:Object.assign(
    //   {},
    //   triggerShowChangeProduct,
    //   {
    //     goodsInfo: [el],
    //   })})
    setCurrentGoodsItems([el]);
  };
  const changeErrorMsg = (errMsg) => {
    setErrorMsgSureChange(errMsg);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setErrorMsgSureChange('');
    }, 1000);
  };
  let seleced = quantity < stock && skuPromotions == 'club';

  return (
    <React.Fragment>
      <ErrorMessage msg={errorMsgSureChange} />
      <div className="d-flex md:justify-between md:items-center">
        <div className="d-flex flex-col md:flex-row w-full md:w-auto items-center">
          <div className="d-flex rc-margin-right--xs items-center">
            <img
              src={details.goodsImg}
              style={{ height: '4rem' }}
              alt={details.goodsName}
            />
            <div className="rc-margin-left--xs" style={{ maxWidth: '200px' }}>
              <div>{details.goodsName}</div>
              {/* <div>{details.goodsSubtitle}</div> */}
            </div>
          </div>
          <div className="line-item-quantity text-lg-center rc-margin-right--xs rc-margin-left--xs">
            <div className="text-left ml-1 font_size12 pad_b_5">
              <FormattedMessage id="amount" />:
            </div>
            <div className="d-flex rc-align-children--space-between">
              <div className="Quantity">
                <div className="quantity d-flex justify-content-between align-items-center">
                  <input
                    type="hidden"
                    id="invalid-quantity"
                    value="Пожалуйста, введите правильный номер."
                    name="invalid-quantity"
                  />
                  <QuantityPicker
                    min={quantityMinLimit}
                    max={skuLimitThreshold?.skuMaxNum}
                    initQuantity={quantity}
                    updateQuantity={(val) => {
                      setQuantity(val);
                    }}
                  />
                </div>
              </div>
              <strong className="rc-md-down">
                = {formatMoney(currentSubscriptionPrice * quantity)}
              </strong>
            </div>
          </div>
          <div className="cart-and-ipay rc-margin-right--xs rc-margin-left--xs -mb-5 md:-mb-0">
            <div className="specAndQuantity rc-margin-bottom--xs ">
              {details.goodsInfos && (
                <HandledSpec
                  renderAgin={renderDetailAgin}
                  details={details}
                  disabledGoodsInfoIds={subDetail.goodsInfo.map(
                    (g) => g.goodsInfoVO.goodsInfoId
                  )}
                  onIsSpecAvailable={(status) => {
                    setIsSpecAvailable(status);
                  }}
                  setState={setState}
                  updatedSku={matchGoods}
                />
              )}
            </div>
          </div>
          <p
            className={cn(`frequency rc-margin-right--xs rc-margin-left--xs`, {
              'subscriptionDetail-choose-frequency': isMobile
            })}
          >
            {skuPromotions != 0 && (
              <FrequencySelection
                childrenGridCls={['col-span-6', 'col-span-6']}
                frequencyType={skuPromotions}
                currentFrequencyId={form.frequencyId}
                handleConfirm={handleSelectedItemChange}
              />
            )}
          </p>
        </div>
        <strong className="rc-md-up" style={{ marginTop: '20px' }}>
          = {formatMoney(currentSubscriptionPrice * quantity)}
        </strong>
      </div>
      <div className="d-flex for-mobile-colum for-pc-bettwen rc-button-link-group mt-3 md:mt-0">
        <span
          className={cn(`text-plain rc-styled-link my-2 md:my-0`, {
            'ui-btn-loading': productListLoading
          })}
          onClick={() => {
            setState({
              triggerShowChangeProduct: Object.assign(
                {},
                triggerShowChangeProduct,
                {
                  firstShow: !triggerShowChangeProduct.firstShow,
                  goodsInfo: [...subDetail.goodsInfo],
                  isShowModal: true
                }
              )
            });
          }}
        >
          <FormattedMessage id="subscription.seeOtherRecommendation" />
        </span>
        <div className="for-mobile-colum d-flex">
          <button
            onClick={() => showProdutctDetail(0)}
            className="rc-btn rc-btn--two rc-btn--sm"
          >
            <FormattedMessage id="subscription.productDetails" />
          </button>
          {isNotInactive && (
            <button
              onClick={() => changePets(seleced)}
              className={cn(`rc-btn rc-btn--one rc-btn--sm`, {
                'rc-btn-solid-disabled': !seleced,
                'ui-btn-loading': changeNowLoading
              })}
              disabled={!isSpecAvailable}
            >
              <FormattedMessage id="subscription.changeNow" />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default inject('configStore')(observer(injectIntl(ChooseSKU)));
