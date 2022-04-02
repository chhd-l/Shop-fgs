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
          {subDetail.goodsInfo &&
            subDetail.goodsInfo.map((el, index) => (
              <div
                className="goodsItem rc-card-content"
                style={{
                  border: '1px solid #d7d7d7',
                  padding: '.75rem'
                }}
              >
                <div style={{ display: 'flex' }}>
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
                <div style={{ marginTop: '.9375rem' }}>
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
                    {!isIndv && (
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
                <div
                // className="col-4 col-md-5"
                // style={{ paddingLeft: '60px' }}
                >
                  <ChangeSelection el={el} intl={intl} />
                </div>
                {isGift && subDetail.subscribeStatus !== 'INACTIVE' ? (
                  <ButtonBoxGift />
                ) : null}
              </div>
            ))}
        </div>
        <ErrorMessage msg={errMsgPage} />
        <div className="card-container border rounded border-d7d7d7 mt-0 hidden md:block">
          {subDetail.goodsInfo &&
            subDetail.goodsInfo.map((el, index) => (
              <div
                className="rc-margin-x--none"
                style={{
                  padding: '1rem 0 1.5rem 0'
                }}
                key={index}
              >
                <div className=" row align-items-center">
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
                              {!isIndv && (
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
                  <div className="col-4 col-md-1" />
                  <div className="col-4 col-md-5" style={{ padding: 0 }}>
                    <ChangeSelection el={el} intl={intl} />
                  </div>
                </div>
                {isGift && subDetail.subscribeStatus !== 'INACTIVE' ? (
                  <ButtonBoxGift />
                ) : null}
              </div>
            ))}
        </div>
        {!isGift && <ButtonBox />}
      </div>
    </SubGoodsInfosContext.Provider>
  );
};

export default inject('configStore')(observer(SubGoodsInfos));
