import React, { useState, useContext, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import FrequencySelection from '@/components/FrequencySelection';
import { ErrorMessage } from '@/components/Message';
import {
  changeSubscriptionGoods,
  checkSubscriptionAddressPickPoint,
  stockNoticeModify,
  queryStockNotice
} from '@/api/subscription';
import HandledSpec from '@/components/HandledSpec/index.tsx';
import HandledSpecSelect from '../HandledSpecSelect';
import InstockStatusComp from '@/components/InstockStatusComp';
import { formatMoney, getDeviceType } from '@/utils/utils';
import { EMAIL_REGEXP } from '@/utils/constant';
import find from 'lodash/find';
import { ChangeProductContext } from './index';
import { SubDetailHeaderContext } from '../SubDetailHeader';
import { inject, observer } from 'mobx-react';
import { QuantityPicker } from '@/components/Product';
import stores from '@/store';
import cn from 'classnames';
import { Button } from '@/components/Common';

const loginStore = stores.loginStore;

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
  const [userEmail, setUserEmail] = useState(loginStore?.userInfo?.email || '');
  const [correctEmail, setCorrectEmail] = useState(true);
  const [alreadyNotice, setAlreadyNotice] = useState(false);

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
    checkStockNotice(details);
  }, [details?.goodsInfos]);

  // check whether the current stock out notice has been alerted
  const checkStockNotice = async (details) => {
    const selectedSku = details?.sizeList?.filter((el) => el.selected)?.[0];
    if (selectedSku?.goodsInfoId && !selectedSku?.stock) {
      const params = {
        customerId: loginStore?.userInfo?.customerId || '',
        goodsId: details.goodsId || '',
        goodsInfoId: selectedSku?.goodsInfoId || '',
        storeId: window.__.env.REACT_APP_STOREID,
        fromAddress: '2' //2 sku out of stock
      };
      const res = await queryStockNotice(params);
      if (res.code === 'K-000000') {
        const { stockNotice, email } = res.context;
        setAlreadyNotice(stockNotice);
        email && setUserEmail(email);
      }
    }
  };

  const updatedPriceOrCode = ({ clickEvent }) => {
    if (clickEvent) {
      checkStockNotice(details);
    }
  };

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
  const doChangeSubscriptionGoods = async () => {
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
            skuId: el.goodsInfoVO?.goodsInfoId,
            subscribeNum: el.subscribeNum
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
      await checkSubscriptionAddressPickPoint(
        Object.assign({}, params, {
          goodsItems: params.addGoodsItems.map((p) =>
            Object.assign(p, {
              nextDeliveryTime:
                currentGoodsItems[currentChangeProductIdx].nextDeliveryTime
            })
          ),
          deliveryAddressId: subDetail.deliveryAddressId,
          paymentId: subDetail?.paymentId
        })
      );
      await changeSubscriptionGoods(params);
      await getDetail(({ goodsInfo }) => {
        changeSubDetail(goodsInfo, addGoodsItemsSku);
        // 需要把订阅详情请求回来再重置状态，不然用户一直点击会出现还没正常更替就重复点击有问题
        setChangeNowLoading(false);
        initMainProduct();
      });

      // checkSubscriptionAddressPickPoint(params)
      //   .then((r) => {
      //     changeSubscriptionGoods(params)
      //       .then((res) => {
      //         getDetail(({ goodsInfo }) => {
      //           changeSubDetail(goodsInfo, addGoodsItemsSku);
      //           // 需要把订阅详情请求回来再重置状态，不然用户一直点击会出现还没正常更替就重复点击有问题
      //           setChangeNowLoading(false);
      //           initMainProduct();
      //         });
      //       })
      //       .catch((err) => {
      //         setChangeNowLoading(false);
      //         changeErrorMsg(err && err.message);
      //       });
      //   })
      //   .catch((e) => {
      //     setChangeNowLoading(false);
      //     changeErrorMsg(e && e.message);
      //   });
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

  const handleEmailChange = (e) => {
    const emailVal = e.target.value;
    const emailVerify = EMAIL_REGEXP.test(emailVal);
    if (emailVerify !== correctEmail) setCorrectEmail(emailVerify);
    setUserEmail(emailVal);
  };

  const handleNotifyMe = async () => {
    let subscribeId = subDetail.subscribeId;
    const { goodsId = '', sizeList } = details;
    const goodsInfoId = sizeList?.filter((el) => el.selected)?.[0]?.goodsInfoId;
    // modify & add is same
    const param = {
      customerId: loginStore?.userInfo?.customerId || '',
      email: userEmail,
      goodsInfoIds: [goodsInfoId],
      goodsId,
      fromAddress: '2',
      subscribeId
    };
    const res = await stockNoticeModify(param);
    if (res.code === 'K-000000') {
      setAlreadyNotice(true);
    }
  };

  const handleModifyEmail = () => {
    setAlreadyNotice(false);
  };

  let seleced = quantity < stock && skuPromotions == 'club';
  let outOfStockStatus = quantity > stock;
  return (
    <React.Fragment>
      <ErrorMessage msg={errorMsgSureChange} />
      <div className="d-flex md:justify-between md:items-center">
        <div className="d-flex flex-col md:flex-row w-full md:w-auto items-center">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div
                className="text-base font-medium mb-2"
                style={{ maxWidth: '210px' }}
              >
                {details.goodsName}
              </div>
              <img
                src={details.goodsImg}
                className="h-24 object-contain w-auto"
                alt={details.goodsName}
              />
            </div>
            <div className="line-item-quantity text-lg-center ml-2 md:mx-6">
              <div className="text-left mb-2">
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
              </div>
            </div>
          </div>
          <div className="cart-and-ipay md:max-w-xs w-full md:w-auto">
            <div className="specAndQuantity rc-margin-bottom--xs text-left mt-6">
              {details.goodsInfos && (
                <>
                  <div className="rc-md-up">
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
                      canSelectedOutOfStock={true}
                      canSelectedWhenAllSpecDisabled={true}
                      updatedPriceOrCode={updatedPriceOrCode}
                    />
                    <InstockStatusComp
                      status={seleced}
                      className="subscription-stock"
                    />
                  </div>
                  <div className="rc-md-down relative">
                    <HandledSpecSelect
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
                      canSelectedOutOfStock={true}
                      canSelectedWhenAllSpecDisabled={true}
                    />
                    <div className="absolute bottom-4 right-12">
                      <InstockStatusComp
                        status={seleced}
                        className="subscription-stock"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <p
            className={cn(
              `frequency subscription-detail-frequency md:px-8 w-full md:w-auto mt-5 md:mt-0`,
              {
                'subscriptionDetail-choose-frequency': isMobile
              }
            )}
          >
            {skuPromotions != 0 && (
              <FrequencySelection
                frequencyType={skuPromotions}
                currentFrequencyId={form.frequencyId}
                className=""
                handleConfirm={handleSelectedItemChange}
              />
            )}
          </p>
          <strong
            className="w-full  md:w-auto mt-6"
            style={{ marginTop: '20px' }}
          >
            = {formatMoney(currentSubscriptionPrice * quantity)}
          </strong>
        </div>
      </div>
      {outOfStockStatus ? (
        <div className="mb-6 mt-5 md:mt-0 flex flex-col items-center md:justify-end md:items-end md:flex-row">
          <span className="text-base font-normal">
            <FormattedMessage
              id={
                alreadyNotice
                  ? 'subscription.backToStockInfoActivated'
                  : 'subscription.backToStockInfo'
              }
            />
          </span>
          <div
            className={`md:ml-4 ${
              correctEmail
                ? 'correct-format-input-box mt-3 md:mt-0'
                : 'active-input-box mt-3 md:mt-0'
            }`}
          >
            <input
              className={`email-input font-light text-base ${
                alreadyNotice ? ' w-60' : 'border-b-2 pb-1 md:w-80'
              }`}
              onChange={handleEmailChange}
              maxLength="50"
              disabled={alreadyNotice}
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
          {alreadyNotice ? (
            <Button
              size="small"
              className="md:ml-6 mt-3 md:mt-0"
              onClick={handleModifyEmail}
            >
              <FormattedMessage id="modifyEmail" />
            </Button>
          ) : null}
        </div>
      ) : null}
      <div className="d-flex for-mobile-colum for-pc-bettwen rc-button-link-group mt-3 md:mt-0 flex-col-reverse md:flex-row">
        <span
          className={cn(`text-plain rc-styled-link my-2 md:my-0 mt-5 md:mt-0`, {
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
        <div className="for-mobile-colum d-flex for-mobile-colum d-flex flex-col-reverse md:flex-row">
          <Button onClick={() => showProdutctDetail(0)} size="small">
            <FormattedMessage id="subscription.productDetails" />
          </Button>
          {outOfStockStatus && !alreadyNotice ? (
            <Button
              size="small"
              type="primary"
              disabled={!correctEmail || alreadyNotice}
              onClick={handleNotifyMe}
            >
              <FormattedMessage id="notifyMe" />
            </Button>
          ) : isNotInactive && !alreadyNotice ? (
            <Button
              size="small"
              type="primary"
              onClick={() => changePets(seleced)}
              loading={changeNowLoading}
              disabled={!isSpecAvailable || !seleced}
            >
              <FormattedMessage id="subscription.changeNow" />
            </Button>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default inject('configStore')(observer(injectIntl(ChooseSKU)));
