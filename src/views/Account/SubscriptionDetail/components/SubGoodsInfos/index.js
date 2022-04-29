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
import ConfirmTooltip from '@/components/ConfirmTooltip';
import { DeleteItem } from '@/api/subscription';
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
  configStore
}) => {
  const isNotInactive = subDetail.subscribeStatus !== 'INACTIVE';
  const isActive = subDetail.subscribeStatus === 'ACTIVE';
  const isIndv = subDetail.subscriptionType === 'Individualization';
  const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';
  const [skuLimitThreshold, setSkuLimitThreshold] = useState(1);

  useEffect(() => {
    setSkuLimitThreshold(configStore?.info?.skuLimitThreshold);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configStore?.info?.skuLimitThreshold]);

  //订阅数量更改
  const onQtyChange = async () => {
    try {
      setState({ isDataChange: true });
    } catch (err) {
      showErrMsg(err.message);
    }
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
    isShowClub
  };
  return (
    // true?null:
    <SubGoodsInfosContext.Provider value={propsObj}>
      <div>
        <div
          className="mobileGoodsBox"
          style={{ display: isMobile ? 'block' : 'none' }}
        >
          {(subDetail.goodsInfo || []).map((el, index) => {
            let disCountPriceVisible = !isIndv; // 如果是日本 并且折扣价为0 不显示
            if (
              window.__.env.REACT_APP_COUNTRY === 'jp' &&
              el.originalPrice === el.subscribePrice
            ) {
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
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        overflowWrap: 'normal',
                        color: '#e2001a'
                      }}
                    >
                      {el.goodsName}
                    </h3>
                    <p
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '8px'
                      }}
                    >
                      {!isIndv && el.specText}
                    </p>
                    {isShowClub && !!subDetail.petsId && (
                      <DailyRation rations={el.petsRation} />
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <div>
                    <span style={{ display: isIndv ? 'none' : 'inline-block' }}>
                      <QuantityPicker
                        className={'inline-block align-middle	'}
                        max={skuLimitThreshold.skuMaxNum}
                        initQuantity={el.subscribeNum}
                        updateQuantity={(val) => {
                          subDetail.goodsInfo[index].subscribeNum = val;
                          onQtyChange();
                        }}
                        showError={showErrMsg}
                      />
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '1.375rem',
                          lineHeight: '40px',
                          verticalAlign: 'middle'
                        }}
                      >
                        =
                      </span>
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
                </div>
                <div className="border-t">
                  <ChangeSelection el={el} intl={intl} idx={index} />
                </div>
                {el.canDelete ? (
                  <div className="absolute right-2 top-2">
                    <span
                      className="font-bold iconfont iconguan cursor-pointer hover:text-rc-red p-2"
                      onClick={() => {
                        updateConfirmTooltipVisible(el, true);
                      }}
                    />

                    <ConfirmTooltip
                      containerStyle={{ transform: 'translate(-89%, 105%)' }}
                      arrowStyle={{ left: '89%' }}
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
                    />
                  </div>
                ) : null}
                {isGift && subDetail.subscribeStatus !== 'INACTIVE' ? (
                  <ButtonBoxGift />
                ) : null}
              </div>
            );
          })}
        </div>
        <ErrorMessage msg={errMsgPage} />
        <div className="card-container mt-0 hidden md:block border-0">
          {(subDetail.goodsInfo || []).map((el, index) => {
            let showDiscountPrice = !isIndv;
            // 如果是日本 没有折扣 不显示折扣价
            if (
              window.__.env.REACT_APP_COUNTRY === 'jp' &&
              el.originalPrice === el.subscribePrice
            ) {
              showDiscountPrice = false;
            }
            return (
              <div
                className={cn(
                  'rc-margin-x--none border rounded border-d7d7d7 relative',
                  { 'mt-4': index }
                )}
                style={{
                  padding: '1rem 0 1.5rem 0'
                }}
                key={index}
              >
                <div className="row align-items-center">
                  <div className="col-4 col-md-6">
                    <div
                      className="rc-layout-container rc-five-column direction-column "
                      style={{
                        height: '160px',
                        paddingRight: '60px',
                        paddingTop: '0',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        className="rc-column flex flex-row"
                        style={{
                          width: '80%',
                          padding: 0,
                          alignItems: 'center'
                        }}
                      >
                        <div className="img-container mr-3">
                          {/* <LazyLoad> */}
                          <img
                            style={{ maxHeight: '100%' }}
                            src={
                              optimizeImage({ originImageUrl: el.goodsPic }) ||
                              IMG_DEFAULT
                            }
                            alt={el.goodsName}
                          />
                          {/* </LazyLoad> */}
                        </div>
                        <div
                          className="v-center"
                          style={{
                            width: '300px'
                          }}
                        >
                          <h5
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              overflowWrap: 'normal',
                              color: '#e2001a'
                            }}
                          >
                            {el.goodsName}
                          </h5>
                          <p
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginBottom: '8px'
                            }}
                          >
                            {!isIndv && el.specText}
                          </p>
                          <div>
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
                                    onQtyChange();
                                  }}
                                  showError={showErrMsg}
                                />
                                <span
                                  style={{
                                    display: 'inline-block',
                                    fontSize: '1.375rem',
                                    lineHeight: '40px',
                                    verticalAlign: 'middle'
                                  }}
                                >
                                  =
                                </span>
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
                            <DailyRation rations={el.petsRation} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-4 col-md-5">
                    <ChangeSelection el={el} intl={intl} idx={index} />
                  </div>
                  {el.canDelete ? (
                    <div className="absolute right-4 top-4">
                      <span
                        className="font-bold iconfont iconguan cursor-pointer hover:text-rc-red"
                        onClick={() => {
                          updateConfirmTooltipVisible(el, true);
                        }}
                      />

                      <ConfirmTooltip
                        containerStyle={{ transform: 'translate(-89%, 105%)' }}
                        arrowStyle={{ left: '89%' }}
                        display={el.confirmTooltipVisible}
                        confirm={() => {
                          deleteItem(el?.goodsInfoVO?.storeId, {
                            subscribeId: el?.subscribeId,
                            subscribeGoodsId: el?.subscribeGoodsId
                          });
                        }}
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
                      />
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
        {!isGift && <ButtonBox />}
      </div>
    </SubGoodsInfosContext.Provider>
  );
};

export default inject('configStore')(observer(SubGoodsInfos));
