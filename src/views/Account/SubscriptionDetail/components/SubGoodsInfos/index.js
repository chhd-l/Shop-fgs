import { getDeviceType, formatMoney, optimizeImage } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import React, { useEffect, useState, createContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { IMG_DEFAULT } from '@/utils/constant';
import ButtonBoxGift from './ButtonBoxGift';
import ButtonBox from './ButtonBox';
import ChangeSelection from './ChangeSelection';
import DailyRation from '../DailyRation';
import { ErrorMessage } from '@/components/Message';
import { QuantityPicker } from '@/components/Product';
import { DeleteItem } from '@/api/subscription';
import { GAForChangeProductBtn } from '@/utils/GA';
import { Button, Popover } from '@/components/Common';
import { getFoodType } from '@/lib/get-technology-or-breedsAttr';
import HandledSpecSelect from '../HandledSpecSelect';
import stores from '@/store';
import OssReceiveBackNotificationContent from '../../../../Details/components/OSSReceiveBackNotificationContent';

const loginStore = stores.loginStore;

export const SubGoodsInfosContext = createContext();

const SubGoodsInfos = ({
  triggerShowChangeProduct,
  getDetail,
  isDataChange,
  handleSaveChange,
  modalList,
  showErrMsg,
  subDetail,
  onDateChange,
  isGift,
  productListLoading,
  errMsgPage,
  setState,
  getMinDate,
  isShowClub,
  intl,
  configStore,
  showLoading
}) => {
  const isNotInactive = subDetail.subscribeStatus !== 'INACTIVE';
  const isActive = subDetail.subscribeStatus === 'ACTIVE';
  const isIndv = subDetail.subscriptionType === 'Individualization';
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const [skuLimitThreshold, setSkuLimitThreshold] = useState(1);
  const [isSpecAvailable, setIsSpecAvailable] = useState(false);
  const [renderAgin, setRenderAgin] = useState(true);

  useEffect(() => {
    setRenderAgin(!renderAgin);
  }, [subDetail]);

  useEffect(() => {
    setSkuLimitThreshold(configStore?.info?.skuLimitThreshold);
  }, [configStore?.info?.skuLimitThreshold]);

  //subscription info change
  const onSubChange = async () => {
    const subSkuStatus = subDetail.goodsInfo?.every(
      (el) => el.oldSkuId === el.skuId
    );
    const chooseSkuStock = subDetail.goodsInfo?.some((el) => !el.stock);
    console.log(chooseSkuStock, 'chooseSkuStock');
    let isDataChange = true;
    subDetail.goodsInfo.forEach((el) => {
      if (el.oldSkuId !== el.skuId && !el.stock) {
        isDataChange = false;
      }
    });
    setState({ isDataChange });
  };

  const updateConfirmTooltipVisible = (el, status) => {
    el.confirmTooltipVisible = status;
    setState({
      subDetail
    });
  };

  const deleteItem = async (id, parma) => {
    await DeleteItem(id, parma);
    getDetail();
  };

  const handleClickChangeProduct = (idx) => {
    setState({ currentChangeProductIdx: idx });
    GAForChangeProductBtn();
    const autoshipSubStatus =
      subDetail.subscriptionType?.toLowerCase() === 'autoship';
    if (!!subDetail.petsId || autoshipSubStatus) {
      setState({
        triggerShowChangeProduct: Object.assign({}, triggerShowChangeProduct, {
          firstShow: !triggerShowChangeProduct.firstShow,
          goodsInfo: subDetail?.goodsInfo,
          isShowModal: true,
          notPet: autoshipSubStatus ? true : false
        }),
        showLoading: true
      });
    } else {
      setState({ triggerShowAddNewPet: true });
    }
  };

  const matchGoods = (data, sizeList) => {
    console.info('data1', data);
    console.info('sizeList1', sizeList);
    subDetail.goodsInfo.forEach((el, i) => {
      if (el.spuId === sizeList?.[0]?.goodsId) {
        el.subscribePrice = data.currentSubscriptionPrice || data.selectPrice;
        el.originalPrice = data.currentUnitPrice;
      }
    });
  };

  const propsObj = {
    subDetail,
    isGift,
    isActive,
    getMinDate,
    modalList,
    setState,
    handleSaveChange,
    onDateChange,
    isDataChange,
    productListLoading,
    getDetail,
    showErrMsg,
    isIndv,
    triggerShowChangeProduct,
    isShowClub,
    handleClickChangeProduct
  };
  console.log(subDetail.goodsInfo, 'subDetail.goodsInfo21');
  return (
    // true?null:
    <SubGoodsInfosContext.Provider value={propsObj}>
      <div>
        {isMobile ? (
          <div className="mobileGoodsBox">
            {(subDetail.goodsInfo || []).map((el, index) => {
              let disCountPriceVisible = !isIndv; // 折扣商品如果没有折扣就不显示折扣价
              if (el.originalPrice === el.subscribePrice) {
                disCountPriceVisible = false;
              }
              return (
                <div
                  className={cn('goodsItem rc-card-content py-3', {
                    'mt-4': index
                  })}
                  style={{
                    border: '1px solid #d7d7d7',
                    position: 'relative'
                  }}
                  key={index}
                >
                  <div className="px-3 flex">
                    <div className="for-mobile-colum">
                      {/* <LazyLoad> */}
                      <img
                        src={
                          optimizeImage({ originImageUrl: el.goodsPic }) ||
                          IMG_DEFAULT
                        }
                        style={{ width: '100px' }}
                        alt={el.goodsName}
                      />
                    </div>
                    <div
                      className="v-center self-center	"
                      style={{ flex: '1', paddingLeft: '.625rem' }}
                    >
                      <h3
                        className="text-xl"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          overflowWrap: 'normal',
                          color: '#e2001a'
                        }}
                      >
                        {el.goodsName}
                      </h3>
                      {getFoodType(el) ? (
                        <p className="rc-card__meta rc-padding-bottom--xs ui-text-overflow-line2">
                          <FormattedMessage
                            id={`product.plp.foodtype.${getFoodType(el)}`}
                          />
                        </p>
                      ) : null}
                      {/* <p
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '8px'
                      }}
                    >
                      {!isIndv && el.specText}
                    </p> */}
                      {isShowClub && !!subDetail.petsId && (
                        <DailyRation rations={el.petsRation} type="mobile" />
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-end justify-between">
                      {!isIndv ? (
                        <HandledSpecSelect
                          details={el}
                          defaultSkuId={el.skuId}
                          // disabledGoodsInfoIds={subDetail.goodsInfo.map(
                          //   (g) => g.goodsInfoVO.goodsInfoId
                          // )}
                          onIsSpecAvailable={(status) => {
                            setIsSpecAvailable(status);
                          }}
                          setState={setState}
                          updatedSku={matchGoods}
                          updatedChangeSku={(skuInfo) => {
                            subDetail.goodsInfo[index].skuId =
                              skuInfo.goodsInfoId || '';
                            onSubChange();
                          }}
                          renderAgin={renderAgin}
                          canSelectedWhenAllSpecDisabled={true}
                          canSelectedOutOfStock={true}
                        />
                      ) : null}
                      <span
                        style={{ display: isIndv ? 'none' : 'inline-block' }}
                      >
                        <QuantityPicker
                          className={'inline-block align-middle	'}
                          max={skuLimitThreshold.skuMaxNum}
                          initQuantity={el.subscribeNum}
                          updateQuantity={(val) => {
                            subDetail.goodsInfo[index].subscribeNum = val;
                            onSubChange();
                          }}
                          showError={showErrMsg}
                        />
                      </span>
                    </div>
                    <div className="mt-3 mb-5">
                      <span
                        className="price"
                        style={{
                          display: 'inline-block',
                          fontSize: '1.25rem',
                          fontWeight: '400',
                          verticalAlign: 'middle',
                          marginLeft: '8px',
                          height: '25px'
                        }}
                      >
                        {formatMoney(el.subscribePrice * el.subscribeNum)}
                      </span>
                      {disCountPriceVisible && (
                        <span
                          className="price"
                          style={{
                            display: 'inline-block',
                            // fontSize: '1.25rem',
                            fontWeight: '400',
                            textDecoration: 'line-through',
                            verticalAlign: 'middle',
                            marginLeft: '8px',
                            height: '.6875rem',
                            color: '#aaa',
                            fontSize: '.875rem'
                          }}
                        >
                          {formatMoney(el.originalPrice * el.subscribeNum)}
                        </span>
                      )}
                    </div>
                    {subDetail?.canChangeProductAtGoodsLine ? (
                      <Button
                        className="w-full"
                        onClick={() => handleClickChangeProduct(index)}
                        loading={showLoading}
                      >
                        <FormattedMessage id="subscriptionDetail.changeProduct" />
                      </Button>
                    ) : null}
                  </div>

                  <div className="border-t">
                    <ChangeSelection
                      el={el}
                      intl={intl}
                      idx={index}
                      onChange={onSubChange}
                    />
                  </div>
                  {el.canDelete ? (
                    <div className="absolute right-2 top-2">
                      <Popover
                        display={el.confirmTooltipVisible}
                        confirm={() =>
                          deleteItem(el?.goodsInfoVO?.storeId, {
                            subscribeId: el?.subscribeId,
                            subscribeGoodsId: el?.subscribeGoodsId
                          })
                        }
                        updateChildDisplay={(status) =>
                          updateConfirmTooltipVisible(el, status)
                        }
                        content={
                          <FormattedMessage id="subscription.confirmDeleteProduct" />
                        }
                        okText={
                          <FormattedMessage id="subscription.confirmDeleteProduct.confirm" />
                        }
                        cancelText={
                          <FormattedMessage id="subscription.confirmDeleteProduct.cancel" />
                        }
                      >
                        <span
                          className="font-bold iconfont iconguan cursor-pointer hover:text-rc-red p-2"
                          onClick={() => {
                            updateConfirmTooltipVisible(el, true);
                          }}
                        />
                      </Popover>
                    </div>
                  ) : null}
                  {isGift && subDetail.subscribeStatus !== 'INACTIVE' ? (
                    <ButtonBoxGift />
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        <ErrorMessage msg={errMsgPage} />
        {isMobile ? null : (
          <div className="card-container mt-0 border-0">
            {(subDetail.goodsInfo || []).map((el, index) => {
              let showDiscountPrice = !isIndv;
              // 折扣商品如果没有折扣就不显示折扣价
              if (el.originalPrice === el.subscribePrice) {
                showDiscountPrice = false;
              }
              return (
                <div
                  className={cn(
                    'rc-margin-x--none border rounded border-d7d7d7 relative',
                    { 'mt-4': index }
                  )}
                  style={{
                    padding: '1rem 0 2rem 0'
                  }}
                  key={index}
                >
                  <div className="row align-items-center">
                    <div className="col-4 col-md-6">
                      <div
                        className="rc-layout-container rc-five-column direction-column "
                        style={{
                          // height: '160px',
                          paddingRight: '60px',
                          paddingTop: '0',
                          alignItems: 'center'
                        }}
                      >
                        <div
                          className="rc-column flex flex-row"
                          style={{
                            width: '90%',
                            padding: 0,
                            alignItems: 'center'
                          }}
                        >
                          <div className="w-cs-110 mr-3 object-cover">
                            {/* <LazyLoad> */}
                            <img
                              style={{ maxHeight: '100%' }}
                              src={
                                optimizeImage({
                                  originImageUrl: el.goodsPic
                                }) || IMG_DEFAULT
                              }
                              alt={el.goodsName}
                            />
                            {isShowClub && !!el.petsId && isNotInactive && (
                              <div
                                style={{
                                  position: 'relative',
                                  paddingLeft: '26px',
                                  width: '75%'
                                }}
                              >
                                <span
                                  style={{
                                    width: 'auto',
                                    paddingTop: '6px'
                                  }}
                                  className={`text-plain rc-styled-link ui-text-overflow-md-line1 `}
                                ></span>
                                <div
                                  style={{
                                    position: 'absolute',
                                    // left: '45%',
                                    left: '0',
                                    top: -4,
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <DailyRation
                                    rations={el.petsRation}
                                    type="pc"
                                  />
                                </div>
                              </div>
                            )}
                            {/* </LazyLoad> */}
                          </div>
                          <div
                            className="v-center"
                            style={{
                              width: '300px'
                            }}
                          >
                            <h5
                              className="text-xl"
                              style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                overflowWrap: 'normal',
                                color: '#e2001a'
                              }}
                            >
                              {el.goodsName}
                            </h5>
                            {getFoodType(el) ? (
                              <p className="rc-card__meta rc-padding-bottom--xs ui-text-overflow-line2">
                                <FormattedMessage
                                  id={`product.plp.foodtype.${getFoodType(el)}`}
                                />
                              </p>
                            ) : null}
                            {/* <p
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginBottom: '8px'
                            }}
                          >
                            {!isIndv && el.specText}
                          </p> */}
                            {!isIndv ? (
                              <HandledSpecSelect
                                details={el}
                                defaultSkuId={el.skuId}
                                // disabledGoodsInfoIds={subDetail.goodsInfo.map(
                                //   (g) => g.goodsInfoVO.goodsInfoId
                                // )}
                                onIsSpecAvailable={(status) => {
                                  setIsSpecAvailable(status);
                                }}
                                setState={setState}
                                updatedSku={matchGoods}
                                updatedChangeSku={(skuInfo) => {
                                  subDetail.goodsInfo[index].skuId =
                                    skuInfo.goodsInfoId || '';
                                  onSubChange();
                                }}
                                renderAgin={renderAgin}
                                canSelectedWhenAllSpecDisabled={true}
                                canSelectedOutOfStock={true}
                              />
                            ) : null}
                            <div className="mt-2">
                              <div style={{ whiteSpace: 'nowrap' }}>
                                <span
                                  style={{
                                    display: isIndv ? 'none' : 'inline-block'
                                  }}
                                >
                                  <QuantityPicker
                                    className={'inline-block align-middle	'}
                                    max={skuLimitThreshold.skuMaxNum}
                                    initQuantity={el.subscribeNum}
                                    updateQuantity={(val) => {
                                      subDetail.goodsInfo[index].subscribeNum =
                                        val;
                                      onSubChange();
                                    }}
                                    showError={showErrMsg}
                                  />
                                  {/* <span
                                  style={{
                                    display: 'inline-block',
                                    fontSize: '1.375rem',
                                    lineHeight: '40px',
                                    verticalAlign: 'middle'
                                  }}
                                >
                                  =
                                </span> */}
                                </span>

                                <span
                                  className="price"
                                  style={{
                                    display: 'inline-block',
                                    fontSize: '1.25rem',
                                    fontWeight: '400',
                                    verticalAlign: 'middle',
                                    marginLeft: '8px',
                                    height: '25px'
                                  }}
                                >
                                  {formatMoney(
                                    el.subscribePrice * el.subscribeNum
                                  )}
                                </span>
                                {showDiscountPrice && (
                                  <span
                                    className="price"
                                    style={{
                                      display: 'inline-block',
                                      // fontSize: '1.25rem',
                                      fontWeight: '400',
                                      textDecoration: 'line-through',
                                      verticalAlign: 'middle',
                                      marginLeft: '8px',
                                      height: '.6875rem',
                                      color: '#aaa',
                                      fontSize: '.875rem'
                                    }}
                                  >
                                    {formatMoney(
                                      el.originalPrice * el.subscribeNum
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-5">
                      <ChangeSelection
                        el={el}
                        intl={intl}
                        idx={index}
                        onChange={onSubChange}
                      />
                    </div>
                    <div className="w-11/12 mt-cs-16 pl-36">
                      {el?.goodsInfos.map((ele) => (
                        <OssReceiveBackNotificationContent
                          userInfo={loginStore.userInfo}
                          details={el}
                          defalutGoodsId={el.spuId}
                          isLogin={true}
                          selectedSpecItem={ele.selected && ele}
                          visible={ele.selected && !ele.stock}
                          className="border-t w-full px-0 flex items-center"
                        />
                      ))}
                      {subDetail?.canChangeProductAtGoodsLine ? (
                        <Button
                          data-auto-testid="subscriptionDetail-changeProduct"
                          className=" "
                          onClick={() => handleClickChangeProduct(index)}
                          loading={showLoading}
                        >
                          <FormattedMessage id="subscriptionDetail.changeProduct" />
                        </Button>
                      ) : null}
                    </div>

                    {el.canDelete ? (
                      <div className="absolute right-4 top-4">
                        <Popover
                          display={el.confirmTooltipVisible}
                          confirm={() => {
                            deleteItem(el?.goodsInfoVO?.storeId, {
                              subscribeId: el?.subscribeId,
                              subscribeGoodsId: el?.subscribeGoodsId
                            });
                          }}
                          updateChildDisplay={(status) => {
                            updateConfirmTooltipVisible(el, status);
                          }}
                          content={
                            <FormattedMessage id="subscription.confirmDeleteProduct" />
                          }
                          okText={
                            <FormattedMessage id="subscription.confirmDeleteProduct.confirm" />
                          }
                          cancelText={
                            <FormattedMessage id="subscription.confirmDeleteProduct.cancel" />
                          }
                        >
                          <span
                            className="font-bold iconfont iconguan cursor-pointer hover:text-rc-red"
                            onClick={() => {
                              updateConfirmTooltipVisible(el, true);
                            }}
                          />
                        </Popover>
                      </div>
                    ) : null}
                  </div>
                  {isGift && subDetail.subscribeStatus !== 'INACTIVE' ? (
                    <ButtonBoxGift />
                  ) : null}
                </div>
              );
            })}
          </div>
        )}

        {!isGift && <ButtonBox />}
      </div>
    </SubGoodsInfosContext.Provider>
  );
};

export default inject('configStore')(observer(SubGoodsInfos));
